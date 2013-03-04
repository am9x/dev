function getPostHtml(post,isRepost){
  var x=post;
  //console.log("==x",x)
    var html=[
      (isRepost)?'<div class="repostAvatar"></div>':'<div class="avatar"  style=background-image:url("'+(x.user.profile_image_url||x.user.avatar_large)+'") ></div>',
      '<div class="coner_rt ">',
        (x.reposts_count)?('转发:'+x.reposts_count):"",
        (x.comments_count)?(' 评论:'+x.comments_count):"",
      '</div>',
      '<div class="flex" id="post_'+x.id+'">',
        '<h1>'+x.user.name+':  </h1>',
        '<div class="text">'+x.text+'</div>',
        '<footer>'+ x.created_at+'来自:'+x.source+'</footer>',
      '</div>',
      (x.thumbnail_pic)?'<div class=right><div class="postpic" style=background-image:url("'+x.thumbnail_pic+'")></div></div>':""
      ].join("");
    html =  '<div class="'+ ((isRepost)?"repost":"post") +'">'+html+'</div>'+( (x.retweeted_status)?getPostHtml(x.retweeted_status,true):"");
    //console.log("getPostHtml",html)
      return html;
}
function getPostHtml2(post,isRepost){
  var x=post;
  //console.log("==x",x)
    var html=[
      (isRepost)?'<div class="repostAvatar"></div>':'<div class="avatar"  style=background-image:url("'+(x.user.profile_image_url||x.user.avatar_large)+'") ></div>',
      '<div class="coner_rt">',
        (x.reposts_count)?('转发:'+x.reposts_count):"",
        (x.comments_count)?(' 评论:'+x.comments_count):"",
      '</div>',
      '<div class="flex" id="post_'+x.id+'">',
        '<h1>'+x.user.name+':  </h1>',
        '<div class="text">'+x.text+'</div>',
        '<footer>'+ x.created_at+'来自:'+x.source+'</footer>',
      '</div>',
      (x.bmiddle_pic)?'<img src="'+x.bmiddle_pic+'"></img>':""
      ].join("");
    html =  '<div class="'+ ((isRepost)?"repost":"post") +'">'+html+'</div>'+( (x.retweeted_status)?getPostHtml(x.retweeted_status,true):"");
    //console.log("getPostHtml",html)
      return html;
}

function paintPost(x){
  var postsList = $("#postsList");
   $(".plane").each(function(i,x){
          x.className="plane p"+(1+i)
        }) 
  var html="";
  
  //$("#shape .plane").remove();
  //$("#slider-0").attr("max",yl.length);
  //$("#slider-0").slider("refresh");
 // $.each(statuses,function(i,x){
    html += '<div class="plane" >' + getPostHtml(x) + '</div>'
    var plane=$(html).prependTo("#shape");
    //plane.attr(x)
    setTimeout(function(){plane.addClass('p0')},10)
    //    console.log(plane);
 // })


}