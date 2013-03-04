function Wtr(domNode,title){
  window.wtr_sn = window.wtr_sn || 0;
  //window.wtr_list = window.wtr_list || {};
  window.wtr_sn ++;
  this.id = "wtr_" + window.wtr_sn;
  this.title = title || this.id;
  //window.wtr_list[this.id] = this;
  this.domNode = domNode;     //dojo.create("div",{},parentNode,"last");
  this.viewDiv = dojo.create("div",{width:"100%",height:"100%"},domNode,"first");
  this.styleSheet  = null;
  this.transformState = {
  } 
  this.styleState = {
  }       
  this.domNode.wtr = this;
  this.viewDiv.wtr = this;
  this.init();
}
Wtr.prototype.init = function(){
  this.transformState={
    translateX:"0px",
    translateY:"0px",
    translateZ:"0px",
    rotateX:"0deg",
    rotateY:"0deg",
    rotateZ:"0deg"    
  } 
  this.styleSheet = dojo.create("style",{},document.head,"first").sheet;
  this.styleSheet.insertRule("." + this.id + "{box-sizing:border-box;-webkit-transform-style: preserve-3d;  width:100%;height:100%;     -webkit-transition: -webkit-transform 0.5s;position:absolute}");
  this.styleSheet.insertRule("." + this.id + ">.viewDiv" + "{ box-sizing:border-box; -webkit-transform-style: preserve-3d;  -webkit-transition: -webkit-transform 5s;width:100%;height:100%;background-image:url('gr.jpg');position:absolute;  opacity: 1;}");
  this.styleSheet.insertRule("." + this.id + "{display:block;}");   
  this.styleSheet.insertRule( " ." + this.id + ">.viewDiv" + "{display:block;}");   
  dojo.addClass(this.domNode,this.id);
  dojo.addClass(this.viewDiv,"viewDiv");
  var _self = this;
  dojo.connect(_self.viewDiv,"onclick",function(evt){
    _self.onSelect();
     dojo.stopEvent(evt)
  });
  _self.onCreate();
}
Wtr.prototype.onCreate = function(){

}
Wtr.prototype.onSelect = function(){
/*
  var _self = this;
  console.log("_onSelect prototype");
   dojo.query(".actViewDiv").forEach(function(x){
      dojo.removeClass(x,"actViewDiv")
    });
    dojo.addClass(_self.viewDiv,"actViewDiv");
    if(_self.onSelect) _self.onSelect()
    */
}
Wtr.prototype.render =function(transformState,styleState){
  var _self = this;
   _self.transformState = transformState || _self.transformState;
   _self.styleState = styleState || _self.styleState;
  console.log(_self.transformState);
  var _cssBase="-webkit-transform:";
  var _cssView="-webkit-transform:";
  for (x in _self.transformState){
    if(x.match(/^translate/)){
      _cssBase += x+"("+ _self.transformState[x] + ") ";
    }
    else{
      _cssView += x+"("+ _self.transformState[x] + ") ";
    }
    this.styleSheet.deleteRule(0);
    this.styleSheet.deleteRule(0);
    this.styleSheet.insertRule("." + this.id + "{" + _cssBase + " !important}",0);   
    this.styleSheet.insertRule( " ." + this.id + ">.viewDiv" + "{" + _cssView + " !important}",0); 
    dojo.style(_self.viewDiv,_self.styleState)
console.log("this.styleSheet",this.styleSheet)    ;

  }
}
Wtr.prototype.transform = function(tag,value){
console.log("transform ",tag,value)
  var _self=this;
  if (_self.transformState[tag] == undefined){
    _self.transformState[tag] = value;
  }
  else{
    var op = _self.transformState[tag].match(/([-.\d]+)(\w+)/) ;
    var np = value.match(/([-.\d]+)(\w+)/);
    _self.transformState[tag] = (np[1]*1 + op[1]*1) +op[2];//现有值+新值+单位
  }
  _self.render();
}
