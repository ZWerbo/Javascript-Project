import Pukeman from "./Pukeman.js";
import Enemy from "./Enemy.js";
import MovingDirection from "./MovingDirection.js";
 export default class TileMap {
    constructor(tileSize) {
        this.tileSize = tileSize;
        this.pukebackground = new Image();
        this.pukebackground.src = 'images/pukerbackground.png'

        this.wall = new Image();
        this.wall.src = "images/pukeblock.png"
        // console.log(this.wall);

        this.wall2 = new Image();
        this.wall2.src = "images/pukeblock2.png"

        this.food = new Image();
        this.food.src = "images/food.png"

        this.vomitAnimationTimerDefault = 30;
        this.vomitAnimationTimer = this.vomitAnimationTimerDefault;
    }


    //1-2 are walls 
    //5 is food 
    // 0 is background
    ///4 pukeman
    //7 enemy 

    map = [
        [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,7,1],
        [2,0,0,5,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,1],
        [2,0,0,0,0,0,0,0,0,0,7,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,1],
        [2,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,1],
        [2,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,1],
        [2,0,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [2,7,0,0,0,0,0,5,0,0,0,0,0,4,0,0,0,0,0,0,0,7,0,0,0,0,1],
        [2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1],
        [2,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1],
        [2,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1],
        [2,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,5,0,0,0,0,1],
        [1,0,0,0,0,5,0,1,0,0,0,0,7,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2,2,2,1,1,1,1],
    ];
    



    draw(ctx) {
        for(let row = 0; row < this.map.length; row++) {
            for(let column=0; column < this.map[row].length; column++ ) {
                let tile = this.map[row][column];
                if(tile===1) {
                    this.drawWall(ctx, column, row, this.tileSize)
                } else if(tile === 0) {
                    this.drawBackground(ctx, column, row, this.tileSize);
                } else if(tile === 2) {
                    this.drawWall2(ctx, column, row, this.tileSize);
                }else if(tile === 5) {
                    this.drawFood(ctx, column, row, this.tileSize)
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

    drawWall2(ctx, column, row, size) {
        ctx.drawImage(this.wall2,column * this.tileSize,row * this.tileSize, size, size) ;
    }

    drawFood(ctx, column, row, size) {
        ctx.drawImage(this.food, column * this.tileSize, row * this.tileSize, size, size);
    }

    setCanvasSize(canvas) {
        canvas.width = this.map[0].length * this.tileSize;
        canvas.height = this.map.length * this.tileSize;
    };


    getPukeman(velocity){
        for(let row = 0; row < this.map.length; row++) {
            for(let col = 0; col < this.map[row].length; col++) {
                let tile = this.map[row][col];
                if(tile === 4) {
                    this.map[row][col] = 0;
                    return new Pukeman(col * this.tileSize, row * this.tileSize, this.tileSize, velocity, this);
                }
            }
        }
    }


    // getEnemies(velocity) {
    //     const enemies = [];
    //     for(let row = 0; row < this.map.length; row++) {
    //         for(let col = 0; col < this.map[row].length; col++) {
    //             const tile = this.map[row][col];
    //             if(tile === 7) {
    //                 this.map[row][col] = 0;
    //                 enemies.push(new Enemy(col * this.tileSize, row * this.tileSize, this.tileSize, velocity, this))
    //             }
    //         }
    //     }
    //     return enemies; 
    // }

    getEnemies(velocity) {
        const enemies = [];
    
        for (let row = 0; row < this.map.length; row++) {
          for (let column = 0; column < this.map[row].length; column++) {
            const tile = this.map[row][column];
            if (tile === 7) {
              this.map[row][column] = 0;
              enemies.push(
                new Enemy(
                  column * this.tileSize,
                  row * this.tileSize,
                  this.tileSize,
                  velocity,
                  this
                )
              );
            }
          }
        }
        return enemies;
      }



    

    didCollideWithEnvironment(x, y, direction) {
        if (direction == null) {
          return;
        }
    
        if (Number.isInteger(x / this.tileSize) && Number.isInteger(y / this.tileSize)
        ) {
          let column = 0;
          let row = 0;
          let nextColumn = 0;
          let nextRow = 0;
    
          switch (direction) {
            case MovingDirection.right:
              nextColumn = x + this.tileSize;
              column = nextColumn / this.tileSize;
              row = y / this.tileSize;
              break;
            case MovingDirection.left:
              nextColumn = x - this.tileSize;
              column = nextColumn / this.tileSize;
              row = y / this.tileSize;
              break;
            case MovingDirection.up:
              nextRow = y - this.tileSize;
              row = nextRow / this.tileSize;
              column = x / this.tileSize;
              break;
            case MovingDirection.down:
              nextRow = y + this.tileSize;
              row = nextRow / this.tileSize;
              column = x / this.tileSize;
              break;
          }
          const tile = this.map[row][column];
          if (tile === 1 || tile === 2) {
            return true;
          }
        }
        return false;
      }

      eatFood(x, y) {
        const row = y /this.tileSize;
        const column = x / this.tileSize;
        if(Number.isInteger(row) && Number.isInteger(column)) {
            if(this.map[row][column] === 5) {
                this.map[row][column] = 0;
                return true;
            }
        }
        return false; 
      }


}

// module.exports = TileMap;