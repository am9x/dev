function RLC_imgdata_decode(ic2){
  var c_flag=256*256*256*256; 
  console.log("ic2",ic2.length);
  var ic1=[];
  var bf;
  var ct;
  while(ic2.length>0){
    bf=ic2.shift();
    if(bf==c_flag){
      ct = ic2.shift();
      bf = ic2.shift();
      for(var i=1;i<=ct;i++){
        ic1.push(bf);
      }
    }
    else{
      ic1.push(bf);
    }
  }
  console.log("ic1",ic1.length);
  var idata=[];
  var color={};
  while(ic1.length>0){
    bf=ic1.shift();
    color.a=(bf)%(256);
    bf = (bf-color.a)/256;
    color.b=(bf)%(256);
    bf = (bf-color.b)/256;
    color.g=(bf)%(256);
    bf = (bf-color.g)/256;
    color.r=(bf)%(256);
    idata.push(color.r);
    idata.push(color.g);
    idata.push(color.b);
    idata.push(color.a);
  }
  delete color;
  console.log("idata",idata.length);
  return idata;
}
function RLC_imgdata_encode(idata){
  var c_flag=256*256*256*256; 
  console.log("idata",idata.length);
  var tsum;
  var ic1=[];
  for(var i=0;i<idata.length;i+=4){
    tsum=0;tp=1;
    tsum += idata[i+3] + idata[i+2]*256 + idata[i+1]*256*256 + idata[i]*256*256*256;
    ic1.push(tsum);
  };

  console.log("ic1",ic1.length);
  var ic2=[];
  ic1.push(c_flag);
  var bf;
  var ct=1;
  var bflast = ic1.shift();
  while(ic1.length>0){
    bf = ic1.shift();
    if(bf==bflast){
      ct++;
    }
    else{
      if(ct>1){
        ic2.push(c_flag);
        ic2.push(ct);
        ic2.push(bflast);
        ct=1;
        bflast=bf;
      }
      else{
        ic2.push(bflast);
        bflast=bf; 
      }
    }
  }
  console.log("ic2",ic2.length);
 // console.log(ic1)
 // console.log(ic2)
  return ic2
}