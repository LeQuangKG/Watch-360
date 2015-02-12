// JavaScript Document
function Slider(button, beg, end, div){
	var my = this;
	this.beg = beg;
	this.end = end;
	this.button = button;
	this.div = div;
	this.x = null;
	this.obj = null;
	this.isMouseDown = false;
	this.change = (my.end-my.beg)/30;
	this.changeStyle = function(x,dx){
		my.button.style.left = x-38 + 'px';
		my.obj.index = parseInt(x/my.change);
		my.obj.imgDiv.style.backgroundImage = 'url('+my.obj.img[my.obj.index].src+')';
		
	};
	this.checkLimit = function(x){
		if(x < my.beg) x = my.beg;
		if(x > my.end) x = my.end;
		return x;
	};
	this.MouseMove = function(e){
		if(my.isMouseDown==true){
			var x;
			e.preventDefault();
			if(e.clientX) x = e.clientX;
			else x = e.changedTouches[0].clientX;
			var dx = x - my.x;
			x = my.checkLimit(x);			
			my.changeStyle(x,dx);
		}
	};
	this.MouseDown = function(e){
		my.isMouseDown = true;
		if(e.clientX) my.x = e.clientX;
		else my.x = e.changedTouches[0].clientX;
		x = my.checkLimit(my.x);
		my.changeStyle(my.x,null);
	};
	this.MouseUp = function(){
		//alert('up');
		my.isMouseDown = false;
	};
	this.init = function(obj){
		my.obj = obj;
		document.body.addEventListener('touchmove',function(){e.preventDefault();},false);
		my.div.addEventListener('mousedown',my.MouseDown,false);
		my.div.addEventListener('mousemove',my.MouseMove,false);
		document.body.addEventListener('mouseup',my.MouseUp,false);
		my.div.addEventListener('touchstart',my.MouseDown,false);
		my.div.addEventListener('touchmove',my.MouseMove,false);
		my.div.addEventListener('touchend',my.MouseUp,false);
	}
}