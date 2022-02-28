export default class Vomit{
    constructor(x, y, speed, damage) {
        this.x = x; 
        this.y = y;
        this.speed = speed;
        this.damgage = damage;

        this.width = 10;
        this.height = 10;
        this.color = "green"
    }

    draw(ctx) {
        ctx.fillstyle = this.color;
        this.y -= this.speed
    }
}