function Particle(
  x = Math.random() * window.innerWidth,
  y = Math.random() * window.innerHeight,
  rayon = 1,
  ctx
) {
  this.ctx = ctx
  this.x = x;
  this.y = y;
  this.rayon = rayon;
  this.angle = Math.random() * 360;
  this.speed = Math.floor((Math.random() * 2)) + 1;
}
Particle.prototype.draw = function () {
  this.ctx.beginPath()
  this.ctx.arc(this.x, this.y, this.rayon, 0, Math.PI * 2)
  this.ctx.fill()
}
Particle.prototype.move = function () {
  this.ctx.fillStyle = `rgb(150, 150, 150)`
  this.x += this.speed * Math.cos(this.angle * Math.PI / 180);
  this.y += this.speed * Math.sin(this.angle * Math.PI / 180);
  this.draw()
}