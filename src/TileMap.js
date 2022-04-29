import Pukeman from "./Pukeman.js";
import Enemy from "./Enemy.js";
import MovingDirection from "./MovingDirection.js";
 export default class TileMap {
    constructor(tileSize, mapNum) {
        this.tileSize = tileSize;
        this.pukebackground = new Image();
        this.pukebackground.src = 'images/pukerbackground.png'
        this.mapNum = mapNum

        this.wall = new Image();
        this.wall.src = "images/pukeblock.png"
        // console.log(this.wall);

        this.wall2 = new Image();
        this.wall2.src = "images/pukeblock2.png"

        this.food = new Image();
        this.food.src = "images/food.png"

        this.vomit = new Image();
        this.vomit.src = "images/vomit.png"


        this.vomitAnimationTimerDefault = 30;
        this.vomitAnimationTimer = this.vomitAnimationTimerDefault;

        this.vomitOnBoard = false; 

        this.win1 = false; 
    }



    

    map1 = [
        [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,0,7,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,1],
        [2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,1],
        [2,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,7,0,0,0,0,0,0,1],
        [2,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,1],
        [2,0,1,1,1,1,1,1,1,1,0,0,0,5,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [2,0,0,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,2,2,2,0,0,0,0,1],
        [2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1],
        [2,1,1,1,0,7,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1],
        [2,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1],
        [2,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2,2,2,1,1,1,1],
    ];


    map2 = [
      [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,1,1,1,1,1,1,1,1,1,1,1],
      [1,5,7,1,1,1,1,1,1,0,0,7,0,0,0,0,0,0,1,7,0,0,0,0,0,5,1],
      [2,0,0,1,0,0,0,0,0,0,0,0,0,2,0,0,0,1,1,0,0,2,1,0,1,1,1],
      [2,0,0,1,0,1,1,1,1,0,0,1,0,2,0,0,0,1,1,1,0,0,0,0,0,0,1],
      [2,1,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,1,0,2,0,0,1],
      [2,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,1,0,0,0,0,2,0,0,1],
      [2,0,1,1,1,1,1,1,1,1,0,0,0,5,2,0,0,0,0,0,1,0,0,2,7,0,1],
      [2,7,0,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,1,1],
      [2,0,0,0,2,2,2,2,0,0,0,0,0,0,0,0,1,0,1,0,0,1,0,0,0,0,1],
      [2,1,1,1,0,0,0,0,0,1,0,0,0,1,0,0,1,0,0,0,0,0,0,0,1,0,1],
      [2,1,1,1,0,0,0,0,0,0,0,1,0,0,0,0,1,0,1,0,0,0,0,0,0,0,1],
      [2,0,0,0,7,1,0,1,0,0,0,1,0,0,1,0,1,0,0,0,0,2,2,2,2,0,1],
      [1,5,0,0,0,0,0,1,0,1,1,1,1,0,0,0,0,0,0,0,0,0,7,0,0,5,1],
      [1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2,2,2,1,1,1,1],
  ];
    
  maps = [this.map1, this.map2]



    draw(ctx) {
        for(let row = 0; row < this.maps[this.mapNum].length; row++) {
            for(let column=0; column < this.maps[this.mapNum][row].length; column++ ) {
                let tile = this.maps[this.mapNum][row][column];
                if(tile===1) {
                    this.drawWall(ctx, column, row, this.tileSize)
                } else if(tile === 0) {
                    this.drawBackground(ctx, column, row, this.tileSize);
                } else if(tile === 2) {
                    this.drawWall2(ctx, column, row, this.tileSize);
                }else if(tile === 5) {
                    this.drawFood(ctx, column, row, this.tileSize)
                }else if(tile === 8) {
                  this.drawVomit(ctx, column, row, this.tileSize)
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

    drawVomit(ctx, column, row, size) {
      ctx.drawImage(this.vomit, column * this.tileSize, row * this.tileSize, size, size);
    }

    setCanvasSize(canvas) {
        canvas.width = this.maps[this.mapNum][0].length * this.tileSize;
        canvas.height = this.maps[this.mapNum].length * this.tileSize;
    };


    getPukeman(velocity){
        for(let row = 0; row < this.maps[this.mapNum].length; row++) {
            for(let col = 0; col < this.maps[this.mapNum][row].length; col++) {
                let tile = this.maps[this.mapNum][row][col];
                if(tile === 4) {
                    this.maps[this.mapNum][row][col] = 0;
                    return new Pukeman(col * this.tileSize, row * this.tileSize, this.tileSize, velocity, this);
                }
            }
        }
    }

    didWin() {
      return (this.maps[this.mapNum].flat().filter((tile) => tile === 5).length === 0)
    }
    

    getEnemies(velocity) {
        const enemies = [];
    
        for (let row = 0; row < this.maps[this.mapNum].length; row++) {
          for (let column = 0; column < this.maps[this.mapNum][row].length; column++) {
            const tile = this.maps[this.mapNum][row][column];
            if (tile === 7) {
              this.maps[this.mapNum][row][column] = 0;
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
          const tile = this.maps[this.mapNum][row][column];
          if (tile === 1 || tile === 2) {
            return true;
          }
        }
        return false;
      }



      didCollideWithEnvironmentEnemy(x, y, direction) {
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
          const tile = this.maps[this.mapNum][row][column];
            if (tile === 1 || tile === 2 || tile === 8) {
              return true;
            }
        }
        return false;
      }







      eatFood(x, y) {
        const row = y /this.tileSize;
        const column = x / this.tileSize;
        if(Number.isInteger(row) && Number.isInteger(column)) {
            if(this.maps[this.mapNum][row][column] === 5) {
                this.maps[this.mapNum][row][column] = 0;
                return true;
            }
        }
        return false; 
      }


      // async
       vomitSquare(x, y) {
        //  debugger
        let row = Math.floor(y /this.tileSize);
        let column = Math.floor(x / this.tileSize);
        if(Number.isInteger(row) && Number.isInteger(column)) {
            if(this.maps[this.mapNum][row][column] === 0) {
              this.maps[this.mapNum][row][column] = 8;
              this.vomitOnBoard= true;

              // this.vomitMove(row, column)
            }
            
          }



          // // whil
          // let i = 0;
          // while(i < 4) {
          // // for(let i = 0; i < 4; i++) {
          //   console.log(i);
          //   this.sleep(3000)
          // }
          // await setTimeout(this.vomitMove(row, column), 3000)
          // setTimeout(column++, 3000)
          // setTimeout(i++, 3000);
          // i++
          // setTimeout
          // While ((x + i) < board.width) && (y + i) < board.height)
          // this.vomitMove(row, column)
          // this.vomitMove(row, column)
        }

      // sleep= (milliseconds) => {
      //   return new Promise(resolve => setTimeout(resolve, milliseconds))
      // }

      vomitMove(x, y) {
          if(this.maps[this.mapNum][x][y] === 8 && this.vomitOnBoard === true) {
              this.maps[this.mapNum][x][y + 1] = 8
              this.maps[this.mapNum][x][y] = 0
          
          }
 


        // while(i < 3) {
        //     if(this.maps[this.mapNum][x][y] === 8 && this.vomitOnBoard === true) {
        //       // console.log('something2')
        //       if(this.maps[this.mapNum][x][y + 1] === 0){
        //         console.log(i)
        //         this.maps[this.mapNum][x][y + 1] = 8;
        //         this.maps[this.mapNum][x][y] = 0
        //         i++;

        //        } 
        //        else {
        //           break;
        //       }
        //     }


        //   // }
        // }
      }



}

// module.exports = TileMap;