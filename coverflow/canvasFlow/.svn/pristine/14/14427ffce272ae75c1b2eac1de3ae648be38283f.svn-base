/**
 * @author am9
 */



function Card(url,width,height,reflection){
	this.url = url;
	this.w = width;
	this.h = height;
	this.r = reflection;
	this.isLoaded = false;
	this.canvas = null;
	this.onLoad = null;
	this.position = {w:width,h:height,t:0,l:0}
};
Card.prototype.load=function(){
	//console.debug("Card.prototype.load",this);
	var _self =this;
    var cvs = document.createElement("canvas");
    cvs.width = _self.w;
    cvs.height = _self.h;
    //document.body.appendChild(cvs);
    _self.canvas = cvs;
    var ctx = cvs.getContext('2d');
    this.drawloading(ctx);
    
    var img = new Image();
	img.onload = function(){
		var w = _self.w;
		var h = _self.h*(1-_self.r);
		var r = _self.h*(_self.r);
		//console.debug("img.onload== ",w,h,r);
		ctx.save();
		ctx.clearRect(0,0,_self.w,_self.h);
		ctx.drawImage(img,0,0,w,h);

		ctx.save()
		ctx.shadowOffsetX = 2;
		ctx.shadowOffsetY = 2;
		ctx.shadowBlur = 4;
		ctx.shadowColor = "rgba(99, 22, 22, 1)";
		ctx.fillStyle = "#eeeeee";
		ctx.font = "10px Verdana";	
		ctx.fillText(_self.url, 10, h-5);	
		ctx.restore()
		
		ctx.translate(0,h);
		ctx.globalCompositeOperation="xor";
		var lingrad = ctx.createLinearGradient(0,-r,0,r);
		lingrad.addColorStop(0, 'rgba(0,0,0,0)');
		lingrad.addColorStop(0.9, 'rgba(0,0,0,255)');
		ctx.fillStyle = lingrad;
		ctx.fillRect(0,0,w,r);
		
		ctx.transform(1, 0, 0, -1, 0, h);
		ctx.drawImage(img,0,0,w,h);
		
		ctx.restore();
		
		_self.isLoaded = true;
		_self.onLoad.callback(_self)
	}
	img.src = _self.url;
}

Card.prototype.drawloading = function(ctx){

	ctx.save();
	ctx.font = "40px Times New Roman";
	ctx.strokeRect(5,5,this.canvas.width-10, this.canvas.height-10);
	ctx.fillText("Loading",100,100);
	ctx.restore();
}

function Flow(canvas,urls,reflection,num){
	var r= reflection || 0.33;
	var an = num ||2;
	an = an*2+1;
	this.card_h = canvas.height*0.9;
	this.card_w = canvas.width/an * 2.5;
	this.card_r = reflection ;
	this.urls=urls;
	this.canvas=canvas;
	this.player = {start:0, n:an, actions:[], isLocked:false}
	var _self = this;
	this.cards=dojo.map(urls,function(xurl){
		var obj=new Card(xurl, _self.card_w, _self.card_h, _self.card_r);
		return obj
	})
}
Flow.prototype.init = function (){
	var _self = this;
	var _p = this.player;
	var _cvs = _self.canvas;
	//console.debug("Flow.prototype.init ",this);
	for(var i = 0; i < _p.n+1; i++){
		var card = _self.cards[i];
		var df = new dojo.Deferred(); // onload callback
		df.addCallback(function(x){
			_self.paint();
		});
		card.onLoad = df;
		card.load();
		_self.setPositionAg(i,card,0)
	}
	dojo.connect(_cvs,"onclick",function(e){
		//console.log("click",e,e.target);
		//console.log(e.pageX - _cvs.offsetLeft,e.pageY - _cvs.offsetTop)		
		var card=_self.getclickedCard(e);
		var i = dojo.indexOf(_self.cards, card);
		_self.active(i);
		//console.log("getcard",card);
		//console.log("getcard",i);
	})
	
	_self.paint();
}
Flow.prototype.getclickedCard=function(e){
	var _p = this.player;
	var _cvs = this.canvas;
	var x = e.pageX - _cvs.offsetLeft;
	var y = e.pageY - _cvs.offsetTop;
		//console.log(x,y)

	var xRes;
	for(var i= _p.cardsByZ.length-1; i>=0; i--){
		var card=_p.cardsByZ[i];
		var ps=card.position;
		if(x>ps.l && x < ps.l+ps.w && y > ps.t && y < ps.t+ps.h){
			return card;
		}
	}
	//console.log("position",card.position)
}

Flow.prototype.setPositionAg = function(n,card,diff){
	var m = this.player.n;
	var xm = this.canvas.width;
	var ym = this.canvas.height;
	var ag=(Math.PI) * (1+(n-diff)/(m-1));
	var x = Math.cos(ag)*xm * 0.5 * 0.8;
	var ln = -1.3; //viewer line under the circle
	var d = (-1 - ln)/(Math.sin(ag)-ln);

	card.position.h = card.h * d;
	card.position.w = card.w * d;
	
	card.position.t =  card.position.h * 0.6 ;
	card.position.l = x - card.position.w/2;
	
	card.position.l = xm/2 + card.position.l;
	card.position.t = ym*(1-card.r) - card.position.t ;
	
	
	//console.debug(n);console.dir(card.position)
}
Flow.prototype.getActiveIndex=function(){
	var _self=this;
	var _p = this.player;
	var xRes = _p.start + (_p.n - 1)/2;
		//console.log("getActiveIndex",xRes)
	return xRes

}
Flow.prototype.doActive=function(n){
	var _self=this;
	var _p = this.player;
	var diff = n-this.getActiveIndex();
	//console.log("active:",n,",shift:",diff);
	this.doShift(diff);
	
}
Flow.prototype.active = function(n){
	var _p = this.player;
	var _self=this;
	if(_p.isLocked){
		//_p.actions.push(n);
		_p.actions.push(function(){
			_self.doActive(n);
		})
	}
	else{	
		this.doActive(n);
	}
}
Flow.prototype.shift = function(n){
	var _p = this.player;
	var _self=this;
	if(_p.isLocked){
		//_p.actions.push(n);
		_p.actions.push(function(){
			_self.doShift(n);
		})
	}
	else{	
		this.doShift(n);
	}
}
Flow.prototype.doShift= function(n){
	var _self=this;
	var _p = this.player;
	var stepm = 40;
	var step = 0;
	_p.isLocked = true;
	var timmer=window.setInterval(function(){
		step ++;
		for(var i=-1; i <_p.n+1; i++){
			var card = _self.cards[i+_p.start];
			if(card) _self.setPositionAg(i, card,n*step/stepm)
		}
		_self.paint();
		if(step == stepm){
			window.clearInterval(timmer);
			//console.debug("Shift Stopped");
			//_self.player.cards.splice(0,n);
			_p.start+=n;
			//console.debug("_p.start,n",_p.start,n)
			for(var i=0; i <_p.n+1; i++){
				var card = _self.cards[i+_p.start];
				if(card) _self.setPositionAg(i, card,0)
			};
			_self.paint();
			if(_p.actions.length>0){
				var action=_p.actions.pop();
				action();
				//_self.doShift(_p.actions.pop())
			}
			else{
				_p.isLocked = false;
			}
			
		}		
	},20);
	
}
Flow.prototype.paint = function(){
	//console.log("paint,",this.player)
	var _self = this;
	var _p = _self.player;
	//var cardsByZ = dojo.map(_p.cards,function(card){
	//	return card;
	//});
	var cardsByZ=[];
	for(var i=-1; i <_p.n+1; i++){
		var card = _self.cards[i+_p.start];
		if(card){
			cardsByZ.push(card);
			if (card.canvas ==null){
				var df = new dojo.Deferred();
				df.addCallback(function(x){
					//	_self.paint();
				});
				card.onLoad = df;
				card.load();
			}			
		}
	}
	cardsByZ.sort(function(a,b){
		return a.position.h > b.position.h?1:-1
		//return Math.abs(a.position.l) < Math.abs(b.position.l)?1:-1
	});
	_p.cardsByZ=cardsByZ;
	var ctx = _self.canvas.getContext('2d');
	ctx.clearRect(0,0,_self.canvas.width,_self.canvas.height);
	dojo.forEach(cardsByZ,function(card){
		var p = card.position;
		ctx.drawImage(card.canvas, p.l, p.t, p.w, p.h); 
	})
}
