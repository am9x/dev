function loadbi(_uid,xcallback){//ids
    WB2.anyWhere(function(W){
    W.parseCMD("/friendships/friends/bilateral/ids.json", 
      function(data){
        //console.log("callbackW",data);
        xcallback(data);
      //  am9wb.statuses_add(data.statuses);
      //  paintPostsList(am9wb.statuses)
      },
      {
        source  : "2140610257" ,
        uid:_uid,
        count:max_count
      },
      {
          method: 'get'
      }
    )
  })
}
var g_bi_list={};
var g_pool=[];
g_pool.push({uid:"1116409355",level:1});
var c=0
var max_level=3;
var max_count=10;
function addto_bi(uid,ids){
  g_bi_list[uid]=ids
}
function processData(uid,data,curlevel){
console.log("processData",uid,data,curlevel);
  var ids=data.ids;
  g_bi_list[uid]=data.ids;
  if(curlevel<max_level){
    $.each(ids,function(i,x){
      if(g_bi_list[x] == undefined){
        var u = {uid:x,level:curlevel+1};
        g_pool.push(u);
      }
   })
  }
  
}
function grab(){
  console.log(">>g_pool.length:",g_pool.length)
  var u = g_pool.pop();

  //console.log("g_bi_list",g_bi_list)
  if (u!==undefined ){
  c++;
  console.log(">>No.",c,",Grab:",u)
    var uid = u.uid;
    var curlevel = u.level;
    loadbi(uid,function(data){
      processData(uid,data,curlevel);
      grab();
    })
  }
}
function paint(dom,ids){
//console.log(dom,users);
console.log(">>>paint",dom.uid,dom)
  var html=[];//["<ul>"];
   $.each(ids,function(i,x){
  //  console.log(i,x);
    html.push('<div class=li uid='+x+'  >'+x+'</div>');
   })
   //html.push("</ul>");
   $(html.join(" ")).appendTo($(dom))
}

$(document).ready(function () {
  $(".main").live("click",function(e){
    var dom = e.target;
   loadbi($(dom).attr("uid"),function(data){
     paint(dom,data.ids)
   });
  console.log(this,e,e.target);
  });
     // loadbi($(".main")[0])
})