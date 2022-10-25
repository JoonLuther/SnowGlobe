/*
* Snow Globe Sketch
* 1/31/22
* For Kosie
*/

var snowParticles = [];
var skyImages = ['sky1.jpg','sky2.jpg','sky3.jpg','sky4.jpg','sky5.jpg']
var bck;
var mtn;
var snowDensity = Math.floor(Math.random() * (2000-100) + 100);
var maxSpeed = 3;
var minSpeed = 0.75;
var maxSize = 7;
var minSize = 3;
var maxXVariation = 1;
var snowChance = Math.floor(Math.random() * (100-75) + 75);
var imgOffset = 200;
let img;
var mtn1Img = 'Mountain1.png';
var mtn2Img = 'Mountain2.png';


function setup() {
	
	createCanvas(windowWidth, windowHeight);
  img = loadImage('globe2.png');
	height = windowHeight;
	width = windowWidth;
	particle = new snowParticle(width/2,0,20,20);
	bck = new backgroundScroll(skyImages[Math.floor(Math.random() * (5-0) + 0)],0,1);
	mtn = new backgroundScroll(mtn1Img,1,0.5);
	mtn2 = new backgroundScroll(mtn2Img,1,1);
	
}

function draw() {
	background(100);
	bck.scroll();
	mtn.scroll();
	mtn2.scroll();
	
	if(Math.floor(Math.random() * (100-0) + 0) <= snowChance) {
		snowParticles.push(new snowParticle(Math.random() * (width - (width/4)) + (width/4), 0, Math.random() * (maxSize - minSize) + minSize, Math.random() * (maxSpeed - minSpeed) + minSpeed));
	}
	
	for(i = 0; i < snowParticles.length; i++) {
		snowParticles[i].render();
		snowParticles[i].update();
		if(snowParticles[i].y > windowHeight) {
			snowParticles.splice(i,1);
		}
	}
	
	ellipse(windowWidth/2,windowHeight-(windowHeight/5),windowWidth/2,windowHeight/4);
	img.resize(windowWidth,windowHeight);
	image(img, 0, 0);
	
}

function backgroundScroll(imageUsed,scrollMode,speed){
	
	this.imageUsed = loadImage(imageUsed);
	this.scrollMode = scrollMode;
	this.y1;
	this.y2;
	this.x1;
	this.x2;
	if(this.scrollMode == 0) {
		this.y1 = 0 - imgOffset;
		this.y2 = 0 + windowHeight - imgOffset;
		this.x1 = 0;
		this.x2 = 0;
	} else {
		this.y1 = 0;
		this.y2 = 0;
		this.x1 = 0 - imgOffset;
		this.x2 = 0 + windowWidth - imgOffset;
	}
	this.speed = speed;
	
	this.scroll = function() {
			this.imageUsed.resize(windowWidth,windowHeight);
			image(this.imageUsed, this.x1, this.y1);
			this.imageUsed.resize(windowWidth,windowHeight);
			image(this.imageUsed, this.x2, this.y2);
		if(this.scrollMode == 0) {
			this.y1+=this.speed;
			this.y2+=this.speed;
		} else {
			this.x1+=this.speed;
			this.x2+=this.speed;
		}
		this.reset();
	}
	
	this.reset = function() {
		if(this.scrollMode == 0) {
			if(this.y1 == 0) {
				if(this.y2 > 0) {
					this.y2 = 0 - this.imageUsed.height;
				}
			}
			if(this.y2 == 0) {
				if(this.y1 > 0) {
					this.y1 = 0 - this.imageUsed.height;
				}
			}
		} else {
			if(this.x1 == 0) {
				if(windowWidth + this.x2 > windowWidth) {
					this.x2 = 0 - windowWidth;
				}
			}
			if(this.x2 == 0) {
				if(windowWidth + this.x1 > windowWidth) {
					this.x1 = 0 - windowWidth;
				}
			}
		}
	}
}

function snowParticle(x,y,size,speed) {
	this.x = x;
	this.y = y;
	this.size = size;
	this.speed = speed;
	this.xVar = Math.random() * (maxXVariation +1) - 1;
	
	this.render = function() {
		ellipse(this.x,this.y,this.size,this.size);
		noStroke();
	}
	
	this.update = function() {
		this.y+=this.speed;
		this.x+= this.xVar;
	}
}
