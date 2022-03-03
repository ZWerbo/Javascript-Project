import Pukeman from "./Pukeman.js";
import TileMap from "./TileMap.js";
// import Pukeman from "./Pukeman.js";
// import bulletController from "./BulletController.js";
import Vomit from "./Vomit.js";

const tileSize = 32;
const velocity = 2;
// const velocityS = 3;
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
let tileMap  = new TileMap(tileSize);
let pukeman = tileMap.getPukeman(velocity);
let enemies = tileMap.getEnemies(velocity);
// let vomit = [new Vomit(8,8,0)];
let gameOver = false; 
let gameWin = false;
let firstBeat = false; 

// let bulletController = new bulletController(canvas)

const gameOverSound = new Audio('sounds/yourdead.m4a')
const gameWinSound = new Audio('sounds/winSound.m4a')



function gameLoop() {
    if(tileMap.win1 === true) {
        tileMap.map = tileMap.map2
    }
    tileMap.draw(ctx);
    pukeman.draw(ctx, pausePuke());
    enemies.forEach((enemy) => enemy.draw(ctx, pause(), pukeman))
    // vomit.forEach(vom => {vom.draw})
    checkGameOver();
    checkGameWin();
    drawGameEnd();
    resetGameLoop(); 
    
}


// Probably new, if game looped is triggered 
function resetGameLoop() {
    if(gameOver === true) {
        setTimeout(restart, 2700)
        // location.reload()
    }
}

function checkGameWin() {
    if(!gameWin) {
        gameWin = tileMap.didWin();
        if(gameWin) {
            gameWinSound.play();
            firstBeat = true;
            tileMap = true;
            // tileMap.map = tileMap.map2
         
            setTimeout(loadNext, 10000)

        } 
    }

}


function loadNext() {
    // tileMap.map = tileMap.map2
    // gameLoop();
    location.reload()
  
}

//my idea would be if you win then we make the map equal to the next map and reload the page. 

function drawGameEnd() {
    if(gameWin) {
        let text = " YOU WIN! but at what cost...." 
      
        ctx.font = "78px slabsregular"
        ctx.fillStyle = "yellow"
        // ctx.color = "yellow"
        ctx.fillText(text, 10, canvas.height / 2);

     
        
    }
}

function restart() {
    location.reload()
}

function checkGameOver(){
    // let gameOver = null;
    if(!gameOver) {
        gameOver = isGameOver();
        if(gameOver) {
            gameOverSound.play();
            firstBeat = false; 
        }
    }
}

function isGameOver() {
    return enemies.some(enemy => enemy.collideWith(pukeman));
    // return enemy.collideWith(pukeman);
}

function pause(){
    return !pukeman.madeFirstMove || gameWin
    // return !pukeman.madeFirstMove || gameOver
    //     return;   
    // }
    // return gameOver;
}
function pausePuke() {
    return gameOver || gameWin;
}

// funciton pauseWin() {
//     return gameWin
// }


tileMap.setCanvasSize(canvas);



setInterval(gameLoop, 1000 / 75)






