function imageCopy(ctx,dataURL){
  //var img=$('<img src="'+dataURL+'">test</img>').appendTo("header")[0];
  var img = new Image();
  img.onload=function(e){
    console.log("img load",e,this);
    console.log(img);
    ctx.drawImage(img,0,0)
  }
  img.src=dataURL;
}