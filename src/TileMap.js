
export default class TileMap {
    constructor(tileSize) {
        this.tileSize = tileSize;
        this.pukebackground = new Image();
        this.pukebackground.src = '../images/pukerbackground.png'

        this.wall = new Image();
        this.wall.src = "../images/pukeblock.png"
    }



    map = [
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,1],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,1],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,1],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,1],
        [0,0,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1],
        [0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1],
        [0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1],
        [0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1],
    ];
    



    draw(ctx) {
        for(let row = 0; row < this.map.length; row++) {
            for(let column=0; column < this.map[row].length; column++ ) {
                let tile = this.map[row][column];
                if(tile===1) {
                    this.drawWall(ctx, column, row, this.tileSize)
                } else if(tile === 0) {
                    this.drawBackground(ctx, column, row, this.tileSize);
                }

                // ctx.strokeStyle = "black";
                // ctx.strokeRect(column * this.tileSize, row * this.tileSize, column * this.tileSize, this.tileSize, this.tileSize )
            }

        }
    };


    drawBackground(ctx, column, row, size) {
        ctx.drawImage(this.pukebackground,column * this.tileSize, row * this.tileSize, size, size )
    }


    drawWall(ctx, column, row, size){
        ctx.drawImage(this.wall,column * this.tileSize,row * this.tileSize, size, size) ;

    }

    setCanvasSize(canvas) {
        canvas.width = this.map[0].length * this.tileSize;
        canvas.height = this.map.length * this.tileSize;
    };

    // getPacman(velocity){
    //     for(let row = 0; row < this.map.length; row++) {
    //         for(let col = 0; col < this.map[row].length; col++) {
    //             let tile = this.map[row][col];
    //             if(tile === 4) {
    //                 this.map[row][col] = 0;
    //                 return new Pacman(col * this.tileSize, row * this.tileSize, this.tileSize,velocity)
    //             }
    //         }
    //     }
    // }



}