//test.js
//loader
function test(){
function Loader(uid,deep,store){
  this.uid = uid;
  this.deep = deep;
  this.pool=[];
  var o = {uid:uid,deep:deep}
  this.pool.push(o);
  this.store = store;
}
Loader.prototype.onLoad = function(items){
//扩展接口

}
Loader.prototype.onUpdate = function(id,items){
//扩展接口
  return items;
}
Loader.prototype._onUpdate = function(o,items){
/*每次grab获取以后触发
1,根据deep判断是否要将Items推入Pool
2,根据store判断是否要将某Iten推入Pool
*/
console.log(now(),">>_onUpdate",o,{items:items})
  var _self = this;
  //isMember
  var newitems  = $.grep(items, function(x, i){
    var isMember = _self.store.isMember(x.uid)
    return (!isMember);
  });
  _self.store.addChildren(o.uid,newitems);
  var unloaditems = _self.onUpdate(o.uid,newitems);
  //isItemLoaded
  unloaditems  = $.grep(unloaditems, function(x, i){
    var isloaded = _self.store.isItemLoaded(x.uid);
    var ismatched = _self.store.isItemMatched(x.uid);
    var res = ((isloaded==false) && (ismatched == false))
    return (res);
  });
  //pool.push
  if(o.deep>0){
    $.each(unloaditems,function(i,x){
      var item={uid:x.uid,deep:(o.deep-1)}
      _self.pool.push(item);
    })
  }  
  _self.grab();
}
Loader.prototype.grab=function(){
//need improve check loaded matched
  var _self = this;
  if(_self.pool.length>0){
    var curItem = this.pool.shift();
    console.log(now(),"===grab>curItem",_self.pool.length,curItem)
  //if(o.deep>0){
    loadBilateral(curItem.uid,function(items){
      _self._onUpdate(curItem,items)
    })
  //}
  }
  else{
    _self.onLoad();
  }
}



//Store

Store = function(){
  this.hashTable = {}
}
Store.prototype.onAdd = function(id,data){

}
Store.prototype.add = function(id,data){
  this.hashTable[id] = data;
  this.hashTable[id].loaded = false;
  this.hashTable[id].matched = false;
  this.hashTable[id].children = [];
  this.onAdd(id,data);
}
Store.prototype.isMember = function(uid){
  return (this.hashTable[uid] !==undefined)
}
Store.prototype.getMember = function(uid){
  return this.hashTable[uid];
}
Store.prototype.isItemMatched = function(uid){
  var item = this.getMember(uid);
  if (item ==undefined){
    return false;
  }
  else{
    return item.matched
  }
}
Store.prototype.isItemLoaded = function(uid){
  var item = this.getMember(uid);
  if (item ==undefined){
    return false;
  }
  else{
    return item.loaded
  }
}
Store.prototype.getPath =function(id){
  var path = [];
  var _self = this;
  for(var i=id;i!==undefined;){
    var item = _self.getMember(i);
    path.push(item.fnick);
    i = item.parent;
  }
  return path;
}
Store.prototype.addChildren = function(id,items){
  var _self = this;
  var curItem = _self.hashTable[id];
  //console.log("Store.prototype.addChildren",_self);
  curItem.loaded = true;
  $.each(items,function(i,x){
    if(!(_self.isMember(x.uid))){
      curItem.children.push(x.uid);
      x.parent = id;
      _self.add(x.uid,x);
    }
  })
}

//relationv2.js
//page
function loadBilateral(uid,callback){
/*get bilateral from user then call callback
'1,get all follows
'2,get all fans
'3,match then return
*/
  var follows = [];
  var fans = [];
  var bilaterals =[];
  PageSpider("http://weibo.com/"+uid+"/follow",function(items){
    follows=items;
    //console.log("follows",follows);
    checkLoadThenCompare();
  });
  PageSpider("http://weibo.com/"+uid+"/fans",function(items){
    fans=items;
    //console.log("follows",fans);
    checkLoadThenCompare();
  });  
  function checkLoadThenCompare(){
    if(follows.length>0 && fans.length>0){
      //console.log("Compare");
      bilaterals = objkeywords(follows,fans);
      //console.log(now(),"bilaterals",{bilaterals:bilaterals})
      callback(bilaterals);
    }
  }  
}
function objkeywords(arr1,arr2){
  var keywords = [];
  $.each(arr1,function(i,w){
    $.each(arr2,function(j,n){
      if(w.uid == n.uid){
        keywords.push(w);
      }
    })
  })
  return keywords;
}
function PageSpider(url,callback){
//'get all pages to items
  var items=[];
  function onePage(pageNo){
  //console.log("pageNo,",pageNo)
    $.ajaxSetup({
      timeout:3000,
      success:function(html){
        var itemsp = matchToObj(html);
        //console.log(pageNo,itemsp);
        items = $.merge( items, itemsp );
        //console.log(pageNo,",items:",items.length)
        //var hasNext=html.match("下一页");
        var hasNext=(pageNo<5)&&(html.match("下一页"));
        //console.log("hasNext",hasNext)
        if(hasNext){
          onePage(pageNo+=1);
        }
        else{
          callback( items);
        }
      },
      error:function(err){
        console.log("error",url+"?page="+pageNo,err)
        onePage(pageNo);//callback();
      }
    });
    var pageUrl=url+"?page="+pageNo;
    //console.log(pageUrl)
    $.ajax(pageUrl);
  }
  onePage(1);

}
gdebug={};

function matchToObj(html){
gdebug=html;
  var items=[];    
  var lis=html.match(/<li class=..clearfix S_line1..+?\/li>/g);
  if(lis){
    $.each(lis,function(i,x){
      var _match=x.match(/uid=(\d+)&fnick=(.+?)&sex=[m,f]/);
      var _p=x.match(/<img usercard.+?src=..(.+?).">/);
      _p = '"'+_p[1]+'"';
      _p = eval(_p);
      var _g=x.match(/互相关注/);
      _g =!(_g==null);
      var _entry={uid:_match[1],fnick:_match[2],img:_p,got:_g};
      items.push(_entry);
    })
  }
  //console.debug(res);
  return items;
}
function now(){
  var n = new Date();
  return (n.toLocaleTimeString()+ " " +n.getMilliseconds())
}

//loadBilateral("1878047853")
  dt1 = now();
  var id1 = "3156070095";
  var fnick1 = "可爱豆豆的妈";
  store1=new Store();
  store1.add(id1,{uid:id1,fnick:fnick1});
  matchedpath=[];
  //console.debug("test. store.add ",store)
  loader1 = new Loader(id1,1,store1);
  loader1.onLoad=function(){
    console.log(now(),"=====Done=====",dt1)
  }
  store2=new Store();
  store2.add("1116409355",{uid:"1116409355",fnick:"Am9x"})
  //console.debug("test. store.add ",store)
  loader2 = new Loader("1116409355",1,store2);
  loader2.onLoad=function(){
    console.log(now(),"=====Done=====",dt1)
  }
  store1.onAdd = function(id,data){
    if(store2.isMember(id)){
      var item1 = store1.getMember(id);
      item1.matched = true;
      var item2 = store2.getMember(id);
      item2.matched = true;
      var path = store1.getPath(id).reverse().concat(store2.getPath(id)).join(" -> ");
      console.log(now(),"===path===:",path)
      matchedpath.push(path);
    }
  }
  store2.onAdd = function(id,data){
    if(store1.isMember(id)){
      var item1 = store1.getMember(id);
      item1.matched = true;
      var item2 = store2.getMember(id);
      item2.matched = true;
      var path = store1.getPath(id).reverse().concat(store2.getPath(id)).join(" -> ");
      console.log(now(),"===path===:",path)
      matchedpath.push(path);
    }
  }  
  loader1.grab();
  loader2.grab();
}
function loadjs(jsurl,callback){  
  var hd = document.getElementsByTagName('head')[0];  
   var js = document.createElement('script');  
   js.setAttribute('type', 'text/javascript');  
   js.onload=function(evt,data){console.log("dataload",evt,data);callback()};
   js.src=jsurl;
   hd.appendChild(js);  
}
loadjs("http://www.w3school.com.cn/jquery/jquery.js",function(){
  //loadBilateral("1878047853")
  test()
})//E:\MyDocs\Project\am9x\1\userjs