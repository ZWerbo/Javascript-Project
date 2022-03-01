import Pukeman from "./Pukeman.js";
import TileMap from "./TileMap.js";
// import Pukeman from "./Pukeman.js";

const tileSize = 32;
const velocity = 2;
// const velocityS = 3;

const canvas = document.getElementById("gameCanvas")
const ctx = canvas.getContext("2d");
let tileMap  = new TileMap(tileSize);
let pukeman = tileMap.getPukeman(velocity);
let enemies = tileMap.getEnemies(velocity);
let gameOver = false; 
let gameWin = false;

const gameOverSound = new Audio('sounds/yourdead.m4a')



function gameLoop() {
    tileMap.draw(ctx);
    pukeman.draw(ctx, pausePuke());
    enemies.forEach((enemy) => enemy.draw(ctx, pause(), pukeman))
    checkGameOver();
    resetGameLoop(); 

}

// Probably new, if game looped is triggered 
function resetGameLoop() {
    if(gameOver === true) {
        setTimeout(restart, 2700)
        // location.reload()
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
        }
    }
}

function isGameOver() {
    return enemies.some(enemy => enemy.collideWith(pukeman));
    // return enemy.collideWith(pukeman);
}

function pause(){
    return !pukeman.madeFirstMove 
    // return !pukeman.madeFirstMove || gameOver
    //     return;   
    // }
    // return gameOver;
}
function pausePuke() {
    return gameOver;
}


tileMap.setCanvasSize(canvas);



setInterval(gameLoop, 1000 / 75)