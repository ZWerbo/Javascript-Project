// export default class Vomit{
//     constructor(x, y, speed, damage) {
//         this.x = x; 
//         this.y = y;
//         this.speed = speed;
//         this.damgage = damage;

//         this.width = 10;
//         this.height = 10;
//         this.color = "green"
//     }

//     draw(ctx) {
//         ctx.fillstyle = this.color;
//         this.y -= this.speed
//     }
// }

export default class Vomit {
constructor(x, y, velocity) {
    this.x = x;
    this.y = y;
    this.velocity = velocity;
    this.radius = 2

    // this.color = this.colors[Math.floor(Math.random() * this.colors.length)];
  }

  draw() {
      c.beginPath()
      c.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
      c.fillStyle = 'brown'
      c.fill()
      c.closePath()
  }


  update() {
      this.draw()
      this.x += this.velocity
      this.y += this.velocity
  }




//   draw(ctx) {
//     ctx.fillStyle = this.color;
//     // this.y -= this.speed;
//     ctx.fillRect(this.x, this.y, this.width, this.height);
//   }
}