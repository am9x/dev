//taskpool
//
function TaskPool(pool,handle){
  this.pool = pool|[];
  this.handle = handle;
  this.busy=false;
  
}
TaskPool.add=function(items){
 // this.pool.push(items);
 
}
TaskPool.begin = function(){
  var item = this.pool.pop();
  if (item !== null){
    this.handle(item,function(){
  
    })
  }

}
