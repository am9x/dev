$(document).ready(function (x) {
  if(location.hash.match(/^#access_token/)){
  location.href = location.href.match(/(.+)#access_token/)[1];
  return
  }
  
  $("#pagePostDetail").bind("pageshow",function(obj,op){
    console.log("#pagePostDetail.pageshow:",am9wb.statusId);      
    cmd_pagePostDetail_loadstatus();
  })
  

  
  $(".flex" ).live("vclick", function(evt,op){
        am9wb.statusId=this.id.replace(/post_/,"");
        console.log("click am9wb.statusId:",am9wb.statusId);
        $.mobile.changePage( "#pagePostDetail", { transition: "pop",reverse :true} );
  });
  
  $('#pagePostsList [data-icon="refresh"]').live("vclick",function(){
      cmd_pagePostsList_refresh();
  });
  
  $('#pagePostsDetail [data-icon="refresh"]').live("vclick",function(){
      cmd_pagePostDetail_loadstatus();
  });
  

  $('#fld_roll, #fld_hint, #fld_refreshHintInterval').live("change",function(){
      am9wb[this.id] = this.value;
      console.log(am9wb);
  });

  

  $('#pageSetup').live("pageshow",function(){
    $('#fld_refreshHintInterval').attr("value",am9wb.fld_refreshHintInterval);
    $('#fld_roll').attr("value",am9wb.fld_roll);
    $('#fld_hint').attr("value",am9wb.fld_hint);
    console.log(am9wb)
  });
  
  $('#pageSetup').live("pagehide",function(){
    cmd_setInterval();
  });
  
  
  cmd_pagePostsList_refresh();
  cmd_setInterval();
})