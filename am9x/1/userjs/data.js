//data.js
/*
数据类型
items放置所有细目
tree放置从属关系
*/
Store = function(){
  this.hashTable = {}
}
Store.prototype.add = function(id,data){
  this.hashTable[id] = data;
  this.hashTable[id].loaded = false;
  this.hashTable[id].children = [];
}
Store.prototype.isMember = function(uid){
  return (this.hashTable[uid] !==undefined)
}
Store.prototype.getMember = function(uid){
  return this.hashTable[uid];
}
Store.prototype.isItemLoaded = function(uid){
  var item = this.getMember(uid);
  if (item ==undefined){
    return false;
  }
  else{
    return item.loaded
  }
}
Store.prototype.addChildren = function(id,items){
  var _self = this;
  $.each(items,function(i,x){
    if(!(_self.isMember(x.uid))){
      this.hashTable[id].children.push(x.uid);
      this.add(x.uid,x);
    }
  })
}

