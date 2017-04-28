var Block = function(){
  this.x = 0
  this.y = 0
  this.width = 100
  this.height = 20
  this.alive = true;
  this.color = "indigo"
}

Block.prototype.draw = function(){
  context.fillStyle = this.color
  context.fillRect(this.x, this.y, this.width, this.height)
}
