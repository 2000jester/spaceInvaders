var Player = function(){
  this.x = (canvas.width / 2) - (25/2)
  this.y = canvas.height - 60
  this.width = 25
  this.height = 25
  this.radius = 40
  this.speed = 5
  this.color = "limegreen"
  this.bulletTime = 400
  this.lastBullet = 0
  this.lives = 5
}

Player.prototype.draw = function(){
  var player = document.createElement('img');
  player.src = 'images/player.png';
  context.drawImage(player, this.x - (this.radius), this.y - 10, 80, 40)
  /*context.beginPath()
  context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
  context.fillStyle = this.color
  context.fill()
  context.closePath()*/
}

Player.prototype.shoot = function(){
  if(Date.now() > this.lastBullet){
    bullets.push(new Bullet("player"))
    this.lastBullet = Date.now() + this.bulletTime
  }
}

Player.prototype.update = function(){
  //Movement x axis
  if(this.x - (this.radius/2) > 0){
    if(Inputmanager.keyDown(Keys.A)){
      this.x = this.x - this.speed
    }
  }
  if(this.x + (this.radius/2)< canvas.width){
    if(Inputmanager.keyDown(Keys.D)){
      this.x = this.x + this.speed
    }
  }

  if(this.lives > 5){
    this.lives = 5
  }

  if(this.lives < 0){
    this.lives = 0
  }

  //shoot
  if(Inputmanager.keyDown(Keys.SPACE)){
    this.shoot()
  }
}
