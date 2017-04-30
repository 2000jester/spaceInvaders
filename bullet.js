var Bullet = function(tag){
  this.x = player.x
  this.y = player.y
  this.radius = player.radius / 20
  this.speed = 6;
  this.alive = true;
  if(tag == "player"){
    this.color = "limegreen"
  } else if (tag == "enemy"){
    this.color = "red"
  }
  this.tag = tag
}

Bullet.prototype.draw = function(){
  context.beginPath()
  context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
  context.fillStyle = this.color
  context.fill()
  context.closePath()
}
