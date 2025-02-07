//LONG DECLARATION HERE


// main_game.js
let opening, beginningMaze, finishMaze, introImage, left1, left2, left3, left4, right1,right2, right3, right4, front1,front2,front3,front4,behind1,behind2,behind3,behind4
let quiz_1, quiz_2, quiz_3, quiz_4, quiz_5;
let upbeatsong, calmsong, quizsong,codesong, ghiblisong, taylorsong
let code_1,code_2,code_3,code_4,code_5
let stage1_opening,stage2_opening,stage3_opening,stage1_opening2,stage2_opening2,stage3_opening2,stage1_ending,stage2_ending,stage3_ending,concertbackground,gameover


//IMAGE, font, sound
function preload() {
  opening = loadImage('Image/opening.png');
  beginningMaze = loadImage('Image/beginning_maze.png')
  finishMaze = loadImage('Image/finish_maze.png')
  introImage= loadImage('Image/intro.png')
  stage1_opening = loadImage('Image/stage1_opening.png')
  stage2_opening = loadImage('Image/stage2_opening.png')
  stage3_opening = loadImage('Image/stage3_opening.png')
  stage1_opening2 = loadImage('Image/stage1_opening2.png')
  stage2_opening2 = loadImage('Image/stage2_opening2.png')
  stage3_opening2 = loadImage('Image/stage3_opening2.png')
  stage1_ending = loadImage('Image/stage1_ending.png')
  stage2_ending = loadImage('Image/stage2_ending.png')
  stage3_ending = loadImage('Image/stage3_ending.png')
  gameover= loadImage('Image/game over.png')
  concertbackground= loadImage('Image/concert.png')
  ending1= loadImage('Image/ending1.png')
  ending2= loadImage('Image/ending2.png')
  
  
  //CHARACTER SPRITE
  left1 = loadImage('Image/_left1.png')
  left2 = loadImage('Image/_left2.png')
  left3 = loadImage('Image/_left3.png')
  left4 = loadImage('Image/_left4.png')
  right1 = loadImage('Image/_right1.png')
  right2 = loadImage('Image/_right2.png')
  right3 = loadImage('Image/_right3.png')
  right4 = loadImage('Image/_right4.png')
  front1 = loadImage('Image/_front1.png')
  front2 = loadImage('Image/_front2.png')
  front3 = loadImage('Image/_front3.png')
  front4 = loadImage('Image/_front4.png')
  behind1 = loadImage('Image/_behind1.png')
  behind2 = loadImage('Image/_behind2.png')
  behind3 = loadImage('Image/_behind3.png')
  behind4 = loadImage('Image/_behind4.png')
  
  // STAGE QUIZ
  quiz_1 = loadImage('Image/quiz_1.png')
  quiz_2 = loadImage('Image/quiz_2.png')
  quiz_3 = loadImage('Image/quiz_3.png')
  quiz_4 = loadImage('Image/quiz_4.png')
  quiz_5 = loadImage('Image/quiz_5.png')
  
  //CODE
  code_1 = loadImage('Image/code1.png')
  code_2 = loadImage('Image/code2.png')
  code_3 = loadImage('Image/code3.png')
  code_4 = loadImage('Image/code4.png')
  code_5 = loadImage('Image/code5.png')
  
  sun1 = loadImage('Image/sun1.png')
  sun2 = loadImage('Image/sun2.png')
  ball1 = loadImage('Image/ball1.png')
  ball2 = loadImage('Image/ball2.png')
  
  upbeatsong = loadSound('Image/upbeatsong.ogg')
  calmsong = loadSound('Image/calmsong.mp3')
  quizsong = loadSound('Image/quizsong.mp3')
  codesong = loadSound('Image/codesong.ogg')
  endsong = loadSound('Image/endsong.mp3')
  ghiblisong = loadSound('Image/ghiblisong.mp3')
  taylorsong = loadSound('Image/taylorsong.mp3')
  gameoversong = loadSound('Image/gameoversong.mp3')
  
  pixelboldFont = loadFont ('font/SF Pixelate Bold.ttf')
  pixelFont = loadFont ('font/SF Pixelate.ttf')
  consolaFont = loadFont ('font/CONSOLA.TTF')
}

//STRING 
let currentCharacter = 0;
let currentCharacterstart=0;
let currentIntro = 0;
let currentString = 0;
let title = 'THE PAINTED PATH'
let introText = `Hi, I'm Sunney.`;


//Gamestate
let gameState = "start";  // "start" for the beginning page, "play" for the game, "end" for the collision page
let stage = ["first stage start","second stage start","third stage start"]

//PLAYER
let player;
let finishedplayer;


//MAZE
let maze; 
let finishedmaze;


//FOR ENEMY
let enemies = [];
let numEnemies = 3;
let enemyMoveDelay = 10; // Slows down enemy movement
let enemyMoveCounter = 0;


//first stage 
let questions = [quiz_1,quiz_2,quiz_3,quiz_4,quiz_5]
let correctAnswer=[1,0,0,2,0]
//     { question:quiz_1, correctAnswer: 1 },
//     { question:quiz_2, correctAnswer: 0 },
//     { question:quiz_3, correctAnswer: 0 },
//     { question:quiz_4, correctAnswer: 2 },
//     { question:quiz_5, correctAnswer: 1 }
// ];


let currentQuestion = 0;
let feedback = ""; // Feedback message, correct/incorrect
let showNextQuestion = false; // Flag to show the next question after feedback
let firstFrame=0

//SECOND STAGE - CONCERT

let playerConcert;
let balls = [];
let concertOver = false;
let timer = 20; // 30-second survival timer
let concertStarted = false;
let concertWon = false; // Track if player won this round

//THIRD - CODE 

// same concept like the other quiz but I will put the submit box on the dot dot _____

//question generated example
let codeQuestions = [code_1,code_2,code_3,code_4,code_5]
let codeAnswer =["output","draw","/main","cout","32"]

let currentCode = 0;
let inputBox;
let codeFeedback = ""; // feedback message, correct/incorrect
let showNextCode = false;

//I just setup for the class, and input box for stage 3

function setup() {
  //MAIN STAGE
  createCanvas(600, 400);
  canvas.parent('p5-container'); 
  maze = new Maze(20, 30); 
  finishedmaze = new finishedMaze(20, 30); 
  player = new Player(maze.cellSize / 2, maze.cellSize / 2); // Start at top left
  finishedplayer = new finishedPlayer(finishedmaze.cellSize / 2, finishedmaze.cellSize / 2); 
  
  
  
  for (let i = 0; i < 3; i++) {
    let pos = maze.getRandomEmptyPosition();
    enemies.push(new Enemy(pos.x, pos.y));
  }

  
  //SECOND- CONCERT STAGE
  playerConcert = new PlayerConcert()

  //THIRD
  inputBox = createInput();
  inputBox.hide();
}

//for the draw I just set up if function for each page of the game. So I can just change the game state for every page
function draw() {

  
  if (gameState == "start") {
    showStartPage();
  } else if (gameState=="intro"){
    showIntro()
  } else if (gameState == "play") {
    playGame();
  } else if (gameState == "end game") {
    showEndPage();
  } else if (gameState == "game over"){
    gameOver()
  } else if (gameState == "first stage start"){
    openingQuiz()
  } else if(gameState=="opening first stage"){
    startQuiz()   
  }else if (gameState == "first stage"){
    quiz()
  } else if (gameState == "second stage start"){
    openingConcert()
  } else if(gameState=="opening second stage"){
    startConcert()   
  } else if (gameState == "second stage"){
    concert()
  } else if (gameState == "third stage start"){
    openingCode()
  } else if(gameState=="opening third stage"){
    startCode()   
  }else if (gameState == "third stage"){
    code()
  }
}


//all the interaction. Each stage have different interaction so that player didn't change to other page 
function keyPressed() {
  if (gameState=="intro"&& keyCode==32){
    gameState = "play"
  }
  
  if (gameState == "start" && keyCode == 32) {
    gameState = "intro";
  }
  if ((gameState == "end game"||gameState=="game over") && keyCode == 82) {
    resetGame();
    gameState = "start"
     
  }
  if (gameState=="first stage start"&& keyCode==32){
    gameState = "opening first stage"
  }else if (gameState=="opening first stage"&& keyCode==32){
    gameState = "first stage"
  }
  
  if (gameState=="second stage start"&& keyCode==32){
    gameState = "opening second stage"
  }else if (gameState=="opening second stage"&& keyCode==32){
    gameState = "second stage"
  }
  if (gameState=="third stage start"&& keyCode==32){
    gameState = "opening third stage"
  }else if (gameState=="opening third stage"&& keyCode==32){
    gameState = "third stage"
  }

  
  //QUIZ
  if (gameState == "first stage" && currentQuestion <= questions.length) {
    if (keyCode == LEFT_ARROW) {
      checkAnswer(0); 
    } else if (keyCode == DOWN_ARROW) {
      checkAnswer(1); 
    } else if (keyCode == RIGHT_ARROW) {
      checkAnswer(2); 
    }
  }
  
  //CODE QUIZ
   if (gameState=="third stage" && currentCode <= codeQuestions.length && keyCode == ENTER) {
    checkCode ()
  }
}

