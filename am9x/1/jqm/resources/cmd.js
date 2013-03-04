function cmd_pagePostsList_refresh(){

    WB2.anyWhere(function(W){
        var qo=    {
      source  : am9wb.appkey,
      count:10
    };
    if(am9wb.since)qo.since_id=am9wb.since;
    console.log(qo);
    W.parseCMD("/statuses/friends_timeline.json", 
      function(data){
        console.log("callbackW",data);
        if(data.statuses.length>0){
          am9wb.statuses_add(data.statuses);
          $('#pagePostsList [data-icon="refresh"] .ui-btn-text').text("刷新");
          paintPostsList(data.statuses)
        }
      },
      qo,
      {
          method: 'get'
      }
    )
  })
}
function cmd_setInterval(){
      if (am9wb.hint_handle) clearInterval(am9wb.hint_handle)
      if (am9wb.roll_handle ) clearInterval(am9wb.roll_handle )
  if( am9wb.fld_hint=="yes"){
     am9wb.hint_handle = setInterval(cmd_pagePostsList_refreshHint,am9wb.fld_refreshHintInterval*60*1000);
  }else{

  }
  if( am9wb.fld_roll=="yes"){
    am9wb.roll_handle = setInterval( cmd_pagePostsList_refresh,am9wb.fld_refreshHintInterval*60*1000);
  }
  else{

  }
}
function cmd_pagePostsList_refreshHint(since){
    WB2.anyWhere(function(W){
    W.parseCMD("/statuses/friends_timeline.json", 
      function(data){
        console.log("====statuses/friends_timeline callbackW",data);
        //am9wb.statuses_add(data.statuses);
        //alert(data.statuses.length);
        $('#pagePostsList [data-icon="refresh"] .ui-btn-text').text("刷新("+data.statuses.length+")");
        //paintPostsList(am9wb.statuses)
      },
      {
        source  : am9wb.appkey ,
        count:10,
        since_id:since||am9wb.since
      },
      {
          method: 'get'
      }
    )
  })
}

function cmd_pagePostDetail_loadstatus(){
  var post=am9wb.statuses_get(am9wb.statusId);
  console.log("cmd_pagePostDetail_loadstatus",post)
  var postDetail = $("#postDetail");
    postDetail.empty();
  var html= getPostHtml2(post);
  $('<li>'+html+'</li>').appendTo(postDetail);
  console.log("---",postDetail,html);
  postDetail.listview('refresh');
}