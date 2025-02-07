
//START GAME PAGE : beginning of everything// 
function showStartPage() {
  background(220);
  
  // for the song I have to use if function to keep it from restarting again everytime it loops. Got help from my friend
    if (gameoversong.isPlaying()) {
    gameoversong.stop()
    }
    if (!calmsong.isPlaying()) {
    calmsong.play()
    }if (endsong.isPlaying()) {
    endsong.stop()
    }
  
  
  image(opening, 0, 0,600,400);
  
//typing animation learn from //https://editor.p5js.org/pippinbarr/sketches/bjxEfpiwS
//I modify for every string and also put on modification for it to fit every page and time
  
  currentString = title.substring(0, currentCharacterstart);
  
  push();
  textSize(20);
  textFont(pixelboldFont);
  fill(255);
  textAlign(CENTER, CENTER);
  text(currentString, 300, 95);
  pop();
  
  currentCharacterstart += 0.1; //adjust speed with this
  
  if (currentCharacterstart > title.length) {
    currentCharacterstart = title.length;
    currentString = 0;
    
  }
}
// introduction page
function showIntro(){
  background ('#1F1F1F')
  image(introImage,0,0,600,400)
  
  //this using the same one like the opening
  //I actually want to make the paragraph under it also have the animation but I find it hard to do the paragraph. Can't figure out how in this short time so I skip it
  currentString = introText.substring(0, currentIntro);
  
  push();
  textSize(27);
  textFont(pixelboldFont);
  fill(255);
  textAlign(CENTER, CENTER);
  text(currentString, 320, 105);
  pop();
  
  currentIntro += 0.1;
  
  if (currentCharacter > introText.length) {
    currentIntro = introText.length;
    currentString = 0;
    
  }
  
  firstFrame++;
  if (firstFrame >= 700) {
    firstFrame = 0; // Reset frame counter
    gameState = "play"; // Switch to quiz state after 5 seconds
  }
}

//MAZE BEGIN, yey whole game start
function playGame() {
  background('#1F1F1F');
   
  //stop other song
    if (upbeatsong.isPlaying){
      upbeatsong.stop()
    } if (codesong.isPlaying){
      codesong.stop()
    } if (quizsong.isPlaying){
      quizsong.stop()
    } if (!calmsong.isPlaying()) {
    calmsong.play()
    }
  
  //go to final maze if enemy 0. (clarification it's actually not enemy but the sunflower. I just used the variable name already)
  if (numEnemies == 0) {
    finishedmaze.render()
    finishedplayer.render()
    finishedplayer.move()
  } else {
    // Render the maze
    maze.render()
    
    // Update and display the player
    player.render()
    player.move()
    
    // ipdate and display enemies, check for collision with player
    for (let i = enemies.length - 1; i >= 0; i--) {
      let enemy = enemies[i];
      enemy.render();
      
      if (frameCount % 50==0){
         enemy.move();
      }
      
      
      // check collision with player, learn it from the fishes challenge game in class
      //this goes to class player
      if (player.collidesWith(enemy)) {
        enemies.splice(i, 1); // Remove enemy with splice, need to restart enemy array in restart
        numEnemies--; // Decrease the enemy count
        // gameState = "second stage start";
        gameState = stage[i];
        stage.splice(i, 1)
        // gameState = "end game"
      }
    }
  }

  // Increment the enemy move counter
  enemyMoveCounter++;
}

//this is the winning page
function showEndPage() {
  // background("YELLOW");
  // textSize(20);
  // textAlign(CENTER);
  // fill(0);
  // text("You win the game", width / 2, height / 2);
  // text("Press R to Play Again", width / 2, height / 2 + 30);
  firstFrame++;
  if (firstFrame < 350) {
    image(ending1,0,0,600,400)
  } else {
     image(ending2,0,0,600,400)
  }
   if (calmsong.isPlaying()) {
    calmsong.stop()
    }if (!endsong.isPlaying()) {
    endsong.play()
    }
}

// Reset game state, kinda have hard time figure this one out
function resetGame() {
//restarting the whole game, I just copy paste the whole declaration without let and erase some things that might not be useful
  gameState = "start";
  player.pos_x = maze.cellSize / 2;
  player.pos_y = maze.cellSize / 2;
  finishedplayer.pos_x = maze.cellSize / 2;
  finishedplayer.pos_y = maze.cellSize / 2;
  enemies = [];
  numEnemies=3
  for (let i = 0; i < numEnemies; i++) {
    let pos = maze.getRandomEmptyPosition();
    enemies.push(new Enemy(pos.x, pos.y));
  }
  stage = ["first stage start","second stage start","third stage start"]
  
currentCharacter=0
currentCharacterstart=0;
currentIntro=0
  
currentQuestion = 0;
feedback = "";
showNextQuestion = false; // Flag to show the next question after feedback
firstFrame=0
  

//SECOND STAGE - CONCERT
balls = [];
concertOver = false;
timer = 20; // 30-second survival timer
concertStarted = false;
concertWon = false; // Track if player won this round

//THIRD - CODE 
currentCode = 0;
showNextCode = false;
codeFeedback = "";

calmsong.stop()
    
  
}

//display game over if player lose in one of the stages
function gameOver() {
  background(255, 100, 100);
  // textSize(20);
  // textAlign(CENTER);
  // fill(0);
  // text("YOU LOSE", width / 2, height / 2);
  // text("Press R to Restart", width / 2, height / 2 + 30);
  if (upbeatsong.isPlaying){
      upbeatsong.stop()
    } if (codesong.isPlaying){
      codesong.stop()
    } if (quizsong.isPlaying){
      quizsong.stop()
    } if (!gameoversong.isPlaying()) {
      calmsong.stop()
      gameoversong.play()
    }
  image(gameover,0,0,600,400)
  
}

// PLAYER CLASS with the cute sprite
class Player {
  constructor(x, y) {
    this.pos_x = x;
    this.pos_y = y;
    this.size = maze.cellSize / 2;
    this.cellSize = maze.cellSize;
    this.moveDelay = 10; // Slows down player movement
    this.moveCounter = 0; // Counter for player movement delay
    this.sprite_left = [left1, left2, left3, left4]
    this.sprite_right = [right1,right2, right3, right4]
    this.sprite_front = [front1,front2,front3,front4]
    this.sprite_behind = [behind1,behind2,behind3,behind4]
    this.currentSprites = this.sprite_front; //face front at first
    this.img_counter = 0;
  
   
  }

  render() {
//     fill(0, 255, 0);
//     ellipse(this.pos_x, this.pos_y, this.size);
    
    //I get a hint on how to use different group of sprite when facing different dirrection from chatgpt. I figure out I need to save current sprite and can use [] for this
    image(this.currentSprites[this.img_counter], this.pos_x-15, this.pos_y-16,30,33)
  }

  move() {
    this.moveCounter++; // Increment the move counter



    // Only move if the delay threshold is reached
    if (this.moveCounter >= this.moveDelay) {
      let newX = this.pos_x;
      let newY = this.pos_y;
       

      // Change direction and update position based on arrow keys
      if (keyIsDown(38)) { // Up arrow
        newY -= this.cellSize;
        this.currentSprites = this.sprite_behind;
      
      } else if (keyIsDown(40)) { // Down arrow
        newY += this.cellSize;
        this.currentSprites = this.sprite_front;
       
      } else if (keyIsDown(37)) { // Left arrow
        newX -= this.cellSize;
        this.currentSprites = this.sprite_left;
        
      } else if (keyIsDown(39)) { // Right arrow
        newX += this.cellSize;
        this.currentSprites = this.sprite_right;
       
      }
      
//Check if the new position is within bounds and not a wall
      // refer to this assignment https://editor.p5js.org/feliciatiffany/sketches/02r6mHOqX and learn here https://www.youtube.com/watch?v=eHZXvR6NDLo 
      // it's a similar concept with the bouncing ball but I also combine with the iswall that I learn from chatgpt. Will explain this in the maze function
      
      if (maze.isWithinBounds(newX, newY) && !maze.isWall(newX, newY)) {
        this.pos_x = newX;
        this.pos_y = newY;

        // Animate the sprite only when the player actually moves
        this.img_counter++;
        if (this.img_counter >= this.currentSprites.length) {
          this.img_counter = 0; // Loop back to the first frame
        }
      }

      this.moveCounter = 0; // Reset the move counter
    }

   
  }

  collidesWith(enemy) {
    return dist(this.pos_x, this.pos_y, enemy.pos_x, enemy.pos_y) < this.size;
  }
}

//ENEMY    //solved : (why the other 2 enemy don't move?now all:))
// similar with player but random automatic move
class Enemy {
  constructor(x, y) {
    this.pos_x = x;
    this.pos_y = y;
    this.size = maze.cellSize / 2;
  }

  render() {
    // fill(255, 0, 0);
    // ellipse(this.pos_x, this.pos_y, this.size);
    image(sun2,this.pos_x-8,this.pos_y-8,this.size+7,this.size+7)
  }

  move() {
    let direction = floor(random(4));
    let newX = this.pos_x;
    let newY = this.pos_y;

    if (direction == 0){
      newX -= maze.cellSize; 
      // console.log('moving left')
    } // left
    if (direction == 1){
      newX += maze.cellSize; 
      // console.log('moving right')
    } // right
    if (direction == 2){
      newY -= maze.cellSize;
      // console.log('moving up')
    }  // up
    if (direction == 3){
      newY += maze.cellSize
       // console.log('moving down')
    }  // down

    
    if (maze.isWithinBounds(newX, newY) && !maze.isWall(newX, newY)) {
      this.pos_x = newX;
      this.pos_y = newY;
    }
  }
}


//MAKE MAZE (done)
class Maze {
  //this maze is quite complicated as I was at first planning to make something like this https://www.youtube.com/watch?v=jQFYh3nRfSQ. However I realized it will be complicated so I want to draw the maze myself. I ask chatgpt what function I can use for this because it's to hard to search for it from the whole p5js reference.And here it is the crazy list of array grid. 
  
  constructor(rows, cols,) {
    this.rows = rows;
    this.cols = cols;
    this.cellSize = width / cols;
    this.beginningMaze= beginningMaze;
    this.grid = [
      [0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 0, 0, 0, 1, 1],
      [1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1],
      [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0],
      [1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1],
      [1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1],
      [1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1],
      [1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1],
      [0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1],
      [0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1],
      [0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1],
      [1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1],
      [1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 0, 0, 1, 0],
      [1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 0],
      [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 0, 0, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0],
      [1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0],
      [1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 1, 1, 0, 0, 0, 1, 1, 0, 1, 0, 1, 1],
      [1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1]
    ];
  }

  render(){
    for (let i = 0; i < this.grid.length; i++) {
      for (let j = 0; j < this.grid[i].length; j++) {
        if (this.grid[i][j] == 1) {
          fill(100);
          rect(j * this.cellSize, i * this.cellSize, this.cellSize, this.cellSize);
        }
      }
    }
    image (this.beginningMaze,0,0,600,400)
  }

  //return true or false if it's inside the canvas
  isWithinBounds(x, y) {
    return x >= 0 && x < width && y >= 0 && y < height;
  }
  
  //return true or false if , 
  // there's also another story when I'm so confuse when building this and talking with the professor about making the player and enemy move smooth by manipulating the wall. But in the end it's not possible because the cell size is not an odd but even number(hard to explain). But that's 0.2 have something to do with it but I forgot what it is hehe. I don't want to change it anymore to prevent error
  
  isWall(x, y) {
    let col = floor(x / this.cellSize+0.2);//search the exact num of col the player/enemy
    let row = floor(y / this.cellSize+0.2);//for the row
    return this.grid[row][col] == 1; //return true if it's wall. 1 is wall. 0 is empty
  }
  
//WHERE ENEMY START RANDOM
  getRandomEmptyPosition() {
    let x, y, col, row;
    do {
      col = floor(random(this.cols));
      row = floor(random(this.rows));
    } while (this.grid[row][col] !== 0); // Ensure it's an empty cell

    x = col * this.cellSize + this.cellSize / 2; //position it. I'm making it in the center of cell
    y = row * this.cellSize + this.cellSize / 2;
    return { x, y };
  }
}

// the same concept with class maze but with just few closed path in the maze
class finishedMaze {
  constructor(rows, cols) {
    this.rows = rows;
    this.cols = cols;
    this.cellSize = width / cols;
    this.maze = finishMaze
    this.grid = [
      [0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 0, 0, 0, 1, 1],
      [1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1],
      [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1],
      [1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1],
      [1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1],
      [1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1],
      [0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1],
      [0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0],
      [1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1],
      [1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1],
      [1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 0, 0, 1, 0],
      [1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0],
      [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 0, 0, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0],
      [1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0],
      [1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 1, 1, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1]
    ];
  }

  render() {
    for (let i = 0; i < this.grid.length; i++) {
      for (let j = 0; j < this.grid[i].length; j++) {
        if (this.grid[i][j] == 1) {
          fill(100);
          rect(j * this.cellSize, i * this.cellSize, this.cellSize, this.cellSize);
        }
      }
    }
    image(this.maze,0,0,600,400)
    
  }

  //return true or false if it's inside the canvas
  isWithinBounds(x, y) {
    return x >= 0 && x < width && y >= 0 && y < height;
  }
  //return true or false if 
  isWall(x, y) {
    let col = floor(x / this.cellSize);//search the exact num of col the player/enemy
    let row = floor(y / this.cellSize);//for the row
    return this.grid[row][col] == 1; //return true if it's wall. 1 is wall. 0 is empty
  }
  
}

//same like class player but will check the whole collision with wall and within bound with the finish maze
class finishedPlayer {
  constructor(x, y) {
    this.pos_x = x;
    this.pos_y = y;
    this.size = finishedmaze.cellSize / 2;
    this.cellSize = finishedmaze.cellSize;
    this.sprite_left = [left1, left2, left3, left4]
    this.sprite_right = [right1,right2, right3, right4]
    this.sprite_front = [front1,front2,front3,front4]
    this.sprite_behind = [behind1,behind2,behind3,behind4]
    this.currentSprites = this.sprite_front; //face front at first
    this.img_counter = 0;
    this.moveDelay = 10; // Slows down player movement
    this.moveCounter = 0; // Counter for player movement delay
  }

  render() {
    //     fill(0, 255, 0);
//     ellipse(this.pos_x, this.pos_y, this.size);
    image(this.currentSprites[this.img_counter], this.pos_x-15, this.pos_y-16,30,33)
  }

  move() {
    this.moveCounter++; // Increment the move counter

    // Only move if the delay threshold is reached
    if (this.moveCounter >= this.moveDelay) {
      let newX = this.pos_x;
      let newY = this.pos_y;
       

      // Change direction and update position based on arrow keys
      if (keyIsDown(38)) { // Up arrow
        newY -= this.cellSize;
        this.currentSprites = this.sprite_behind;
      
      } else if (keyIsDown(40)) { // Down arrow
        newY += this.cellSize;
        this.currentSprites = this.sprite_front;
       
      } else if (keyIsDown(37)) { // Left arrow
        newX -= this.cellSize;
        this.currentSprites = this.sprite_left;
        
      } else if (keyIsDown(39)) { // Right arrow
        newX += this.cellSize;
        this.currentSprites = this.sprite_right;
       
      }
// Check if the new position is within bounds and not a wall
      if (finishedmaze.isWithinBounds(newX, newY) && !finishedmaze.isWall(newX, newY)) {
        this.pos_x = newX;
        this.pos_y = newY;

        // Animate the sprite only when the player actually moves
        this.img_counter++;
        if (this.img_counter >= this.currentSprites.length) {
          this.img_counter = 0; // Loop back to the first frame
        }
      }

      this.moveCounter = 0; // Reset the move counter
       if (this.pos_x==590&& this.pos_y ==350){
        gameState = "end game";
      }
    }
  }
}
    

