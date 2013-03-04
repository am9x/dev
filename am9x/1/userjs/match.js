//tree
/*
数据结构
1，items 记录所有用户{1022233445:{nick:william,img:http://sdfsdf.fff.com/1.gif}}
2，源和目的各维护一个树
3，通过Page.js抓取下级关注
3，源和目的一旦有叶子添加就去对方匹配
4，匹配时需要加锁

*/
function touch(fromUid,ToUid,deep){
  var items={};
  var fromTree={};
  var toTree={}
  loadBilateral(fromUid,function(items){
  });
  loadBilateral(toUid,function(items){
  });

}
function getTree(uid,curdeep){
  //
  function getChildren(uid){
    loadBilateral(uid,function(items){
    //
    });
  }
}
function Tree(uid,deep){
/*
未来读写线程管理:
1，全部使用回调才能达到非阻塞
2，初步可实现写操作一定要独占
3，多个读操作可以共享
*/
  this.root={uid:uid};
  this.pool=[];
  this.pool.push{uid:uid,deep:deep,parentID:uid};
  
}
Tree.prototype.createthread=function(){
  var u = this.pool.shift();
  loadBilateral(u.uid,function(children){
    //
    if(u.deep>0){
      $.each(children,function(i,x){
        this.pool.push{x:uid,deep:u.deep-1,parentID:u.uid};
      });
    }
  });
  
}
Tree.prototype.isLeaf=function(roof){

}
Tree.prototype.addToRoof=function(roof,arr){
}
