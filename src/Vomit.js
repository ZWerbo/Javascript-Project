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
constructor(x, y, speed, damage) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.damage = damage;

    this.width = 5;
    this.height = 15;
    this.color = "red";
    // this.color = this.colors[Math.floor(Math.random() * this.colors.length)];
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    this.y -= this.speed;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}