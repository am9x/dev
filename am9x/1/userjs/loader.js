//loader
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

}
Loader.prototype._onUpdate = function(o,items){
/*每次grab获取以后触发
1,根据deep判断是否要将Items推入Pool
2,根据store判断是否要将某Iten推入Pool
*/
  var _self = this;
  //isMember
  var newitems  = $.grep(items, function(x, i){
    var isMember = _self.store.isMember(x.uid)
    return (!isMember);
  });
  _self.store.addChildren(id,newitems);
  _self.onUpdate(o.uid,newitems);
  //isItemLoaded
  var unloaditems  = $.grep(items, function(x, i){
    var isloaded = _self.store.isItemLoaded(x.uid)
    return (!isloaded);
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
  var _self = this;
  if(_self.pool.length>0){
    var curItem = this.pool.shift();
  //if(o.deep>0){
    loadBilateral(o.uid,function(items){
      _self._onUpdate(o,items)
    })
  //}
  }
  else{
    _self.onLoad();
  }
}
