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
    console.log("follows",follows);
    checkLoadThenCompare();
  });
  PageSpider("http://weibo.com/"+uid+"/fans",function(items){
    fans=items;
    console.log("follows",fans);
    checkLoadThenCompare();
  });  
  function checkLoadThenCompare(){
    if(follows.length>0 && fans.length>0){
      console.log("Compare");
      bilaterals = objkeywords(follows,fans);
      console.log("bilaterals",bilaterals)
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
  console.log("pageNo,",pageNo)
    $.ajaxSetup({
      timeout:2500,
      success:function(html){
        var itemsp = matchToObj(html);
        //console.log(pageNo,itemsp);
        items = $.merge( items, itemsp );
        console.log(pageNo,",items:",items.length)
        var hasNext=html.match("下一页");
        //console.log("hasNext",hasNext)
        if(hasNext){
          onePage(pageNo+=1);
        }
        else{
          callback( items);
        }
      },
      error:function(err){
        console.log("error",err)
        callback();
      }
    });
    var pageUrl=url+"?page="+pageNo;
    console.log(pageUrl)
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
function loadjs(jsurl,callback){  
  var hd = document.getElementsByTagName('head')[0];  
   var js = document.createElement('script');  
   js.setAttribute('type', 'text/javascript');  
   js.onload=function(evt,data){console.log("dataload",evt,data);callback()};
   js.src=jsurl;
   hd.appendChild(js);  
}
loadjs("http://www.w3school.com.cn/jquery/jquery.js",function(){
  loadBilateral("1878047853")
})