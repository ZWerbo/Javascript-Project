import MovingDirection from "./MovingDirection.js";
import Vomit from "./Vomit.js";
// import bulletController from "./BulletController.js";
export default class Pukeman {
    constructor(x, y, tileSize, velocity, tileMap) {
        this.x = x;
        this.y = y;
        this.tileSize = tileSize;
        this.velocity = velocity;
        this.tileMap = tileMap;

    

        this.currentMovingDirection = null;
        this.requestedMovingDirection = null;

        this.pukemanAnimationTimerDefault = 12;
        this.pukemanAnimationTimer = null;

        this.pukemanRotation = this.Rotation.right;

        // this.hungrySound = new Audio('sounds/hungry.m4a');

        this.vomitActive = false;
        this.vomitDotAboutToExpire = false;

        this.madeFirstMove = false;

        this.shootPressed = false;



        document.addEventListener("keydown", this.keydown); 
        document.addEventListener("keyup", this.keyup)

        this.loadPukemanImages();  //maybe make it private; 

    } 

    Rotation = {
        right: 0,
        down: 1,
        left: 2,
        up: 3,
    }

    draw(ctx, pausePuke){
        //this won't pause it!!
        if(!pausePuke) {
            this.move();
            this.animate();
        }
        this.eatFood();
        // this.shoot()
        // this.vomit();

        const size = this.tileSize/2;

        ctx.save();
        ctx.translate(this.x + size, this.y + size); //finding x/y in new way 
        ctx.rotate((this.pukemanRotation * 90 * Math.PI / 180))
        ctx.drawImage(this.pukemanImages[this.pukemanImageIndex], -size, -size, this.tileSize, this.tileSize)
        ctx.restore()
        
        
        // ctx.drawImage(
        //     this.pukemanImages[this.pukemanImageIndex],
        //     this.x,
        //     this.y,
        //     this.tileSize,
        //     this.tileSize
        //   );
    }
    // shoot() {
    //     if(this.shootPressed) {
    //         console.log("shoot");
    //         const speed = 5; 
    //         const delay = 3;
    //         const damage = 1;
    //         const bulletX = this.x + this.tileSize / 2;
    //         const bulletY = this.y;
    //         this.bulletController.shoot(bulletX,bulletY,speed, damage, delay)
    //     }
    // }

    loadPukemanImages() {
        const pukemanImage1 = new Image();
        pukemanImage1.src = "images/pukeman0.png";

        const pukemanImage2 = new Image();
        pukemanImage2.src = "images/pukeman1.png";

        const pukemanImage3 = new Image();
        pukemanImage3.src = "images/pukeman2.png";
        
        const pukemanImage4 = new Image();
        pukemanImage4.src = "images/pukeman0.png";


        this.pukemanImages = [
            pukemanImage1, 
            pukemanImage2, 
            pukemanImage3,
            pukemanImage4
        ];


        this.pukemanImageIndex = 0;

    }

    keydown=(event)=>{
        //up
        if(event.keyCode == 38){
            if(this.currentMovingDirection === MovingDirection.down) 
                this.currentMovingDirection = MovingDirection.up;
                this.requestedMovingDirection = MovingDirection.up;
            
        }
        //down
        if(event.keyCode == 40){
            if(this.currentMovingDirection === MovingDirection.up) 
                this.currentMovingDirection = MovingDirection.down;
                this.requestedMovingDirection = MovingDirection.down;
            
        }
        //left
        if(event.keyCode == 37){
            if(this.currentMovingDirection === MovingDirection.right) 
                this.currentMovingDirection = MovingDirection.left;
                this.requestedMovingDirection = MovingDirection.left;
            
        }
        //right 
        if(event.keyCode == 39){
            if(this.currentMovingDirection === MovingDirection.left) 
                this.currentMovingDirection = MovingDirection.right;
                this.requestedMovingDirection = MovingDirection.right;
            
        }
        //space 
        if(event.keyCode === 32) {
            this.shootPressed = true; 
            // console.log('shoot')
        }
    }

    keyup=(event)=>{
        if(event.keyCode === 32) {
            this.shootPressed = false; 
        }
    }

    shoot() {
        if(this.shootPressed) {
            new Vomit(this.x, this.y, 3, 1);
        }
    }


    //in Move the this.tileMap.didCollideWithEnvirontment breaks my guy 
     
    move(){
        if(this.currentMovingDirection !== this.requestedMovingDirection) {
            if(Number.isInteger(this.x / this.tileSize) &&
               Number.isInteger(this.y / this.tileSize)
            ) {
                if(!this.tileMap.didCollideWithEnvironment(
                    this.x, 
                    this.y, 
                    this.requestedMovingDirection
                    )
                )
                this.currentMovingDirection = this.requestedMovingDirection;
            }
        }


        if(this.tileMap.didCollideWithEnvironment(this.x, this.y, this.currentMovingDirection)) 
        {
            this.pukemanAnimationTimer = null;
            this.pukemanImageIndex = 0;
            return;
        }
        else if(this.currentMovingDirection != null && this.pukemanAnimationTimer == null) 
        {
            this.pukemanAnimationTimer = this.pukemanAnimationTimerDefault;
        }

        switch(this.currentMovingDirection) {
            case MovingDirection.up:
                this.y -= this.velocity;
                this.pukemanRotation = this.Rotation.up;
                this.madeFirstMove = true;
                break;
            case MovingDirection.down: 
                this.y += this.velocity;
                this.pukemanRotation = this.Rotation.down;
                this.madeFirstMove = true;
                break
            case MovingDirection.left:
                this.x -= this.velocity;
                this.pukemanRotation = this.Rotation.left;
                this.madeFirstMove = true;
                break;
            case MovingDirection.right:
                this.x += this.velocity;
                this.pukemanRotation = this.Rotation.right;
                this.madeFirstMove = true;
                break
        }
    }

    
    animate() {
        if(this.pukemanAnimationTimer == null) {
            return;
        }

        this.pukemanAnimationTimer--;
        if(this.pukemanAnimationTimer === 0) {
            this.pukemanAnimationTimer = this.pukemanAnimationTimerDefault;
            this.pukemanImageIndex++;
            if(this.pukemanImageIndex == this.pukemanImages.length)
                this.pukemanImageIndex = 0;

        }
    }


    vomit() {
        const speed = 5
        const delay = 7
        const damage = 1
        const vomitX = this.x + this.tileSize / 2;
        const vomitY = this.y + this.tileSize / 2;
        this.vomitActive = true;
        this.vomitDotAboutToExpire = false; 


        // so a game plan for vomit would be to call it once food is eating
        // it would have a timer. 
        // it would render dots that go with the where he is facing.
        // I would ideally like it if it was a never ending stream for the allotted time. like a second delay or something
        //could build it out to use space though, then sync it to a time. 

        //think about it with asteroids 

    }

    eatFood() {
        if(this.tileMap.eatFood(this.x, this.y)) {
            this.hungrySound.play();
            // this.vomit();
            //need a vomit funciton here probably.
            //play sound
        }
    }

    
}

// module.exports = Pukeman;






