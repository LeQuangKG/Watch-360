/*
*/
function Move360(div,imgFolder,imgCount,style){
	var my = this;
	this.div = div;
	this.imgFolder = imgFolder;
	this.imgCount = imgCount;
	this.img = [];
	this.imgDiv = null;
	this.index = 0;
	this.style = style;
	this.x; this.dx; this.timer;
	this.init = function(){
		for(var i=0; i< my.imgCount; i++){
			my.img[i] = new Image();
			my.img[i].src = my.imgFolder+i+'.jpg';
		}
		my.imgDiv = document.createElement('div');
		my.imgDiv.className = my.style;
		my.imgDiv.style.backgroundImage = 'url('+my.img[0].src+')';
		my.div.appendChild(my.imgDiv);
	};
	
	this.AutoRotate = function(){
		if(my.index>=my.imgCount-1) my.index = 0;
		else my.index = my.index + 1;
		my.imgDiv.style.backgroundImage = 'url('+my.img[my.index].src+')';
		my.timer = setTimeout(my.AutoRotate,60,my);
	};

	this.TouchStart = function(e){
		clearTimeout(my.timer);
		my.x = e.changedTouches[0].clientX;
	
	};
	this.TouchMove = function(e){
		e.preventDefault();
		var x = e.changedTouches[0].clientX;
		my.dx = x - my.x;
		my.x = x;
		// Move left
		if(my.dx > 3){
			my.index = my.index - 1;
			if(my.index<0) my.index = my.imgCount;
		}
		if(my.dx < -3){
			my.index = my.index + 1;
			if(my.index>my.imgCount) my.index = 0;
		} 
		my.imgDiv.style.backgroundImage = 'url('+my.img[my.index].src+')';
	};
	
	this.TouchEnd = function(){
		//my.timer = setTimeout(my.AutoRotate,1000,my);
	};
	
	this.init();
	
}

window.onload = function(){
	var div = document.body;
	var button = document.getElementById('button');
	var div1 = document.getElementById('slider');
	var beg = 38;
	var end = 958;
	var style = 'imgDiv'; 
	var imgFolder = 'img/';
	var imgCount = 30;
	var rotate = new Move360(div,imgFolder,imgCount,style);
	var slider = new Slider(button, beg, end, div1);
	slider.init(rotate);
} 