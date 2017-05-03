var enemy = function(){
  this.x = null;
  this.y = null;
  this.width = null;
  this.height = null;
  this.radius = null;

  this.row = null;
  this.column = null;
  this.stage = null;
}

enemy.prototype.init = function(x,y,width,height,radius,group,column,row,stage){
  this.x = x
  this.y = y
  this.width = width
  this.height = height
  this.radius = radius

  this.row = row
  this.column = column
  this.stage = stages
}
