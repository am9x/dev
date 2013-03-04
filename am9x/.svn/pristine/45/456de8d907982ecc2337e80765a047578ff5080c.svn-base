//for jqmwb
//5/2待办：css3排版，应用嵌套，分栏布局等
var am9wb={
  appkey  : "3574169146",
  statuses:[],
  since:"",
  fld_refreshHintInterval:1,
  fld_roll :"no",
  fld_hint:"no",
  statuses_add:function(data){
    var _self = this;
    this.since = data[0].id;
   // $.each(data,function(i,x){
      _self.statuses = data.concat(_self.statuses);
   // })
    //this.statuses = data;
    console.log("=====",data)

    
  },
  statuses_get:function(id){
    var res;
    $.each(this.statuses, function (i, x) {
      if(x.id==id){
        res=x;
        return false;
      }
      if((x.retweeted_status) && (x.retweeted_status.id==id)){
        res=x.retweeted_status;
        return false;
      }
    });
    return res
  }
};

function wbquery_friends_timeline(callback,since){

}


/*
*/