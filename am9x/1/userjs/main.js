//main
function main(lid,rid,deep){
  //var users = new Items();
  var matchedPath=[];
  function getPath(id){
    
  }
  var ltree = new Tree(lid,deep);
  var rtree = new Tree(rid,deep);
  ltree.onAdd = function(item){
    //如果在对方树里面则匹配path成功
    //如果不在本树里面则添加
    //如果deep未超过则再添加到loadPool
    var id = item.uid;
    if(!this.isMember(id)){
      this.add(id,item);
    }
    if(rtree.isMember(id)){
      var path=getPath(id);
      matchedPath.push(path);
    }
  }
  function loadtotree(uid,tree,deep){
  
  }
  

}