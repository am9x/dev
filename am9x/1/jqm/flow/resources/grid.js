function loadbi(dom){
    WB2.anyWhere(function(W){
    W.parseCMD("/friendships/friends/bilateral.json", 
      function(data){
        console.log("callbackW",data);
        paint(dom,data.users)
      //  am9wb.statuses_add(data.statuses);
      //  paintPostsList(am9wb.statuses)
      },
      {
        source  : "2140610257" ,
        uid:$(dom).attr("uid"),
        count:16
      },
      {
          method: 'get'
      }
    )
  })
}
function paint(dom,users){
//console.log(dom,users);
console.log(">>>paint",dom.uid,dom)
  var html=[];//["<ul>"];
   $.each(users,function(i,x){
  //  console.log(i,x);
    html.push('<div class=li uid='+x.id+'  style=background-image:url("'+x.avatar_large+'")></div>');
   })
   //html.push("</ul>");
   $(html.join(" ")).appendTo($(dom))
}

$(document).ready(function () {
  $(".main").live("click",function(e){
   loadbi(e.target);
  console.log(this,e,e.target);
  });
      loadbi($(".main")[0])
})