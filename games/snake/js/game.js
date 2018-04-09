var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");

canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);

var bgReady = false;
var gameReady = false;
var bgImage = new Image();
bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = "images/background.png";

var snakeReady = false;
var snakeImage = new Image();
//var s = new snek();
snakeImage.onload = function () {
	snakeReady = true;
	
};
snakeImage.src = "images/snake.png";

var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function () {
	monsterReady = true;
};
monsterImage.src = "images/monster.png";

var siz = 32;
var meX = 16;
var meY = 15;

class snek{
	
	
	constructor() {
        this.head = null;
        this.length = 0;
		this.speed = 32;
    }
	

	
}

var snake = {
	speed: 32
};
var monster = {};
var monstersCaught = 0;

var keysDown = {};

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);


var reset = function () {
	snake.x = siz*5;// canvas.width / 2;
	snake.y = siz*5;//canvas.height / 2;


	monster.x = siz + parseInt(Math.random() * 14) * siz;
	monster.y = siz + parseInt(Math.random() * 13) * siz;
};

var dir = 0;
var wDir = 0;
var keyInput = function(){
	if ((37 in keysDown || 65 in keysDown) && dir != 2) { 
		wDir = 1;
	}
	if ((39 in keysDown || 68 in keysDown) && dir != 1) { 
		wDir = 2;
	}	
	if ((38 in keysDown || 87 in keysDown) && dir != 4) {
		wDir = 3;
	}
	if ((40 in keysDown || 83 in keysDown) && dir != 3) { 
		wDir = 4;
	}
}


var update = function (modifier) {
	dir = wDir;
	switch(dir){
		case 1:
			if (snake.x > siz) snake.x -= snake.speed * modifier;
			break;
		case 2:
			if (snake.x < meX*siz - siz*2) snake.x += snake.speed * modifier;
			break;
		case 3:
			if (snake.y > siz) snake.y -= snake.speed * modifier;
			break;
		case 4:
			if (snake.y < meY*siz - siz*2) snake.y += snake.speed * modifier;
			break;
		default:
		
	}

	if (
		snake.x <= (monster.x + 32)
		&& monster.x <= (snake.x + 32)
		&& snake.y <= (monster.y + 32)
		&& monster.y <= (snake.y + 32)
	) {
		++monstersCaught;
		reset();
	}
};


var render = function () {
	if (bgReady) ctx.drawImage(bgImage, 0, 0);
	if (snakeReady) ctx.drawImage(snakeImage, snake.x, snake.y);
	if (monsterReady)ctx.drawImage(monsterImage, monster.x, monster.y);

	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("Goblins caught: " + monstersCaught, 32, 0);
	
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText(snake.x + " " + snake.y, 32, siz*14);
};

var dMsg = "";


var interval = 250;
var main = function () {
	var now = Date.now();
	var delta = now - then;

	if (gameReady) keyInput();
	
	if (!gameReady){
		render();
		if (delta >= interval) gameReady = true;
	}else if (delta >= interval){
		update(1 + parseInt(((delta - interval) / interval)));
		render();
		then = now;
	}
	requestAnimationFrame(main);
	
};



var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

var then = Date.now();
reset();
main();