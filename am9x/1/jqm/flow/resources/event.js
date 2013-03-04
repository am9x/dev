$(document).ready(function (x) {
  if(location.hash.match(/^#access_token/)){
  location.href = location.href.match(/(.+)#access_token/)[1];
  return
  }



  $('#fld_roll, #fld_hint, #fld_refreshHintInterval').live("change",function(){
      am9wb[this.id] = this.value;
      console.log(am9wb);
  });

  

  $('#pageLogin').live("pageshow",function(){
   sessionStorage.redirect_url="/jqm/flow"
   console.log(am9wb)
  });
  
  $('#pageSetup').live("pagehide",function(){
    cmd_setInterval();
  });
  
  
  cmd_xhrloadStart()
  cmd_uishowStart();
 // cmd_setInterval();
})