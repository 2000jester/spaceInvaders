var canvas 	= document.getElementById('canvas'),
	context = canvas.getContext('2d');
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
var CW = canvas.width,
	CH = canvas.height,
	STATE_LOAD = 0,
	STATE_MENU = 1,
	STATE_MAIN = 2;

var program_state = STATE_LOAD;

var sfm = Date.now(), efm = Date.now();
function getdt()
{
	efm = sfm;
	sfm = Date.now();
	var FPS = 1000;
	var dt = (sfm - efm) / FPS;
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
		context.fillStyle = "dimgrey";
		context.fillRect(this.x - this.endWidth/2, this.y, this.endWidth, this.height);
		context.fillStyle = "sandybrown";
		context.fillRect(this.x - this.endWidth/2, this.y, this.startWidth, this.height);
		context.restore();
	},
	update: function()
	{
		if(this.startWidth >= this.endWidth)
		{
			context.fillStyle = "sandybrown";
			context.fillRect(this.x - this.endWidth/2, this.y, this.endWidth, this.height);
		}
		else
		{
			this.startWidth += speed;
		}
	}
};

var loading_timer = 280 / (speed * 60);
function runLoad(deltaTime)
{
	loading_timer -= deltaTime;
	if(loading_timer <= 0)
		program_state = STATE_MENU;

	context.fillStyle = "grey";
	context.fillRect(0, 0, CW, CH);

	loading_bar.draw();
	loading_bar.update();
	draw_text(CW/2, CH/4, "36px Comic Sans MS", "black", "STATE_LOAD");
	draw_text(CW/2, CH/3, "36px Comic Sans MS", "black", Math.round(loading_timer));
}

function runMain()
{
	context.fillStyle = "black";
	context.fillRect(0, 0, CW, CH);

	draw_text(CW/2, CH/2, "36px Comic Sans MS", "green", "STATE MAIN");


}

function runMenu()
{
	context.fillStyle = "black";
	context.fillRect(0, 0, CW, CH);

	draw_text(CW/2, CH/2, "36px Comic Sans MS", "green", "STATE_MENU");
	window.addEventListener("keydown", function(e) {
	if(e.keyCode == 38)
		program_state = STATE_MAIN;
}, false);
}

function run()
{
	var deltaTime = getdt();
	switch(program_state)
	{
		case STATE_LOAD:
		{
			runLoad(deltaTime);
			break;
		}
		case STATE_MENU:
		{
			runMenu();
			break;
		}
		case STATE_MAIN:
		{
			runMain();
			break;
		}
	}
}



//ANIMATION CODE, must not be modified
(function()
	{
		var onEachFrame;
		if(window.requestAnimationFrame)
		{
			onEachFrame = function(cb)
			{
				var _cb = function()
				{
					cb();
					window.requestAnimationFrame(_cb);
				}
				_cb();
			};
		}
		else if(window.mozRequestAnimationFrame)
		{
			onEachFrame = function(cb)
			{
				var _cb = function()
				{
					cb();
					window.mozRequestAnimationFrame(_cb);
				}
				_cb();
			};
		}
		else
		{
			onEachFrame = function(cb)
			{
				window.setInterval(cb, 1000 / 60);
			};
		}
		window.onEachFrame = onEachFrame;
	})();
	window.onEachFrame(run);
