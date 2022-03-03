--------- **PukeMan** ---------
===============================

**Game Description**  
--------------------- 
Pukeman Chug a lugs across the board in search of spoiled food(politely). Eat all the spoiled food on the board and you win. After eating spoiled food you gain the ability to vomit(in place). The enemies(which can kill you for no reason) don't like vomit(ew) and walk around it. Use this to your advantage!

Play here https://zwerbo.github.io/Javascript-Project/

At its essence the game is adjacent to pacman in gameplay. The user has the ablity to use the arrows keys to navigate the game board. If you collide with the stick figures then you lose and the game resets. If you collide with food you eat it(taking it off the board) and you will know since a sound will play. Eat all the food and the game is over, you win, and the game resets. 

**Developing**  
--------------
For the development of this game I used a canvas API to render a tile map.I customized the tile map with rather crude drawings for the game. The idea being to have a shlocky aesthetic(like an early 2000s web game). I also used multiple images to animate the Pukeman character in the game. Most of it was created using Javascript and its logic with very few outside resources(no sprites or such) and then it had some CSS stylings.  


**Features**  
------------
  
The hardest aspect of this was getting the characters moving. Once I had a board rendered I had to figure out the logic of not allowing the pukeman to move through certain tiles. This is important for making the game harder and making sure he never runs off the canvas(which happened at the begginning). I had to write a move funciton for Pukeman(connected to keystrokes) that checked if the coordinate of the tile moving to existed. I had to write another function that would check if the requested move would collide with a tile I didn't want Pukeman to go through it. If it came back true we would not allow the movement! 

**Code Snippets**  
-----------------
Here are some code snippets that demonstrate problem solving!


This code within the move function checks to see if Pukeman collided with the environment then sets the animation to the first image!    
  
``
    if(this.tileMap.didCollideWithEnvironment(this.x, this.y, this.currentMovingDirection)) 
        {
            this.pukemanAnimationTimer = null;
            this.pukemanImageIndex = 0;
            return;
        }
``  



I thought this was a nice flourish and attention to detail. 


**Future Features**
-------------------
In the future I would like to add vomit movement(which I partly achieved, I just could not figure out how to slow down a loop). 
Also would like to load new levels, giving the user the ability to play through the game farther. This is a bit trickier due to how the game loads, but I will figure it out. 
