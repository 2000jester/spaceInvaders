///////////////////////////////////////////////////////
var canvas = document.getElementById("canvas")       //
var context = canvas.getContext("2d")                //
canvas.width = window.innerWidth                     //
canvas.height = window.innerHeight                   //
document.body.style.margin = "auto"                  //
var CW = canvas.width,                               //
	CH = canvas.height                                 //
///////////////////////////////////////////////////////

function drawBG(color){
  context.fillStyle = color
  context.fillRect(0,0,canvas.width,canvas.height)
}

function drawLives(){
  var lives = document.createElement('img');
  lives.src = 'images/lives.png';
  var offset = 10
  for(i=0;i<player.lives;i++){
    context.drawImage(lives,offset,canvas.height - 20,25,20)
    offset = (offset + 25) + 5
  }
}

//LOAD BAR SHIT
//
//
var previousTime = Date.now(), currentTime = Date.now();
function getdt()
{
	previousTime = currentTime;
	currentTime = Date.now();
	var FPS = 1000;
	var dt = (currentTime - previousTime) / FPS;
	if(dt > 1)
		dt = 1;
	return dt;
}

function draw_text(x, y, font, col, text)
{
	context.save();
	context.font = font;
	context.fillStyle = col;
	context.textAlign = 'center';
	context.fillText(text, x, y);
	context.restore();
}
var speed = 1
var loading_bar = {
	x: CW/2,
	y: CH/2,
	height: 10,
	startWidth: 10,
	endWidth: 280,
	draw: function()
	{
		context.save();
		context.fillStyle = "indigo";
		context.fillRect(this.x - this.endWidth/2, this.y, this.endWidth, this.height);
		context.fillStyle = "limegreen";
		context.fillRect(this.x - this.endWidth/2, this.y, this.startWidth, this.height);
		context.restore();
	},
	update: function()
	{
		if(this.startWidth >= this.endWidth)
		{
			context.fillStyle = "limegreen";
			context.fillRect(this.x - this.endWidth/2, this.y, this.endWidth, this.height);
		}
		else
		{
			this.startWidth += speed;
		}
	}
};
var loading_timer = 280 / (speed * 60);

function bulletBrickCollision(){
  for(i = 0;  i < bullets.length; i++){
    for(b = 0; b < amountBlock; b++){
      if(
        bullets[i].x > blocks[b].x &&
        bullets[i].x < blocks[b].x + blocks[b].width &&
        bullets[i].y > blocks[b].y &&
        bullets[i].y < blocks[b].y + blocks[b].height){
          //console.log(bullets)
          bullets.splice(i,1)
          //console.log(bullets)
          break;
      }
    }
  }
}

//BLOCK Math
var amountBlock = canvas.width / 300
amountBlock = Math.round(amountBlock)
var blockOffset = (canvas.width / amountBlock) / 2
var blockArrayOffset = blockOffset
//console.log(amountBlock)
//console.log(blockArrayOffset)

for(i = 0;i < amountBlock;i++){
  blocks.push(new Block())
  blocks[i].y = canvas.height - 150
  blocks[i].x = blockArrayOffset
  blockArrayOffset = blocks[i].x + blockOffset + blocks[i].width
}

//State
var STATE_MENU = 0
var STATE_LOAD = 1
var STATE_MAIN = 2

var pState = STATE_MENU

//CONSTRUCTORS
var player = new Player()
var map = new Map(canvas.width, canvas.height, canvas.width / 14, canvas.height / 10)
console.log(map)

//run menu function
//
//
function runMenu(){

  Inputmanager.update()

  //DRAW FUNCTIONS
  drawBG("white")

  //logo
  var logo = document.createElement('img');
  logo.src = 'images/logo.png';
  context.drawImage(logo, (canvas.width / 2) - 100, (canvas.height / 2) - 150, 200, 100)

  //press enter text
  context.fillStyle = "black"
  context.font = "arial 60px"
  context.fillText("PRESS ENTER TO START", (canvas.width / 2) - 60, (canvas.height / 2))

  if(Inputmanager.keyDown(Keys.ENTER)){
    pState = STATE_LOAD
  }
}

//run load function
//
//
function runLoad(deltaTime){
  Inputmanager.update()

  loading_timer -= deltaTime;
  if(loading_timer <= 0)
  pState = STATE_MAIN;

  context.fillStyle = "black";
  context.fillRect(0, 0, CW, CH);

  loading_bar.draw();
  loading_bar.update();
  draw_text(CW/2, CH/4 + 100, "36px arial", "white", "LOADING");
  //draw_text(CW/2, CH/3, "36px Comic Sans MS", "black", Math.round(loading_timer));
}


//run main function
//
//
function runMain(){
  //DRAW FUNCTIONS
  drawBG("black")
  player.draw()
  drawLives()

  //UPDATE FUNCTIONS
  Inputmanager.update()
  player.update()
  bulletBrickCollision()

  //ARRAY LOOPS
  //Bullet update
  for(i = 0; i < bullets.length; i++){
    bullets[i].draw()
    bullets[i].y -= bullets[i].speed
    if(bullets[i].y < 0){
      bullets.splice(i,1)
    }

  }

  //Block
  for(i=0;i<blocks.length;i++){
    blocks[i].draw()
  }

	if (Inputmanager.keyDown(Keys.SHIFT)) {
		for (var x = 0; x < map.width; x++) {
			for (var y = 0; y < map.height; y++) {
				var n = map.nodes[x][y];
				context.fillStyle = (n.block ? "red" : "blue");
				context.fillRect(n.position.x - 5, n.position.y - 5, 10, 10);
			}
		}
	}
}

function run(){
  var deltaTime = getdt();
  switch(pState){
    case STATE_MENU:
    {
      runMenu()
      break;
    }
    case STATE_LOAD:
    {
      runLoad(deltaTime)
      break;
    }
    case STATE_MAIN:
    {
      runMain()
      break;
    }
  }
}

// Black Magic Code //
(function() {
  var onEachFrame;
  if (window.requestAnimationFrame) {
    onEachFrame = function(cb) {
      var _cb = function() { cb(); window.requestAnimationFrame(_cb); }
      _cb();
    };
  } else if (window.mozRequestAnimationFrame) {
    onEachFrame = function(cb) {
      var _cb = function() { cb(); window.mozRequestAnimationFrame(_cb); }
      _cb();
    };
  } else {
    onEachFrame = function(cb) {
      setInterval(cb, 60);
    }
  }

  window.onEachFrame = onEachFrame;
})();

window.onEachFrame(run);

/*function collisionDetection() {
  for(c = 0; c < brickColCount; c++)
  {
    for(r = 0; r < brickRowCount; r++)
    {
      var b = bricks[c][r];
      if(b.status == 1)
      {
        if(	ball.x > b.x &&
          ball.x < b.x+brickWidth &&
          ball.y > b.y &&
          ball.y < b.y+brickHeight)
          {
            ball.dy *= -1;
            b.status = 0;
            score += 1;
          }
        }
      }
    }
  }*/
