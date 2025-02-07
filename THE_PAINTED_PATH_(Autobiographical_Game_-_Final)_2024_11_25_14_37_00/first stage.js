//SIMPLEST STAGE, inspired by game quizzis, kahoot, etc

//Simple opening display and song
function openingQuiz(){
  image (stage1_opening,0,0, 600,400)
  
  if (calmsong.isPlaying()) {
    calmsong.pause()
  }if (!quizsong.isPlaying()){
    quizsong.play()
  }
  
  firstFrame++;
  if (firstFrame >= 500) {
    firstFrame = 0; 
    gameState = "opening first stage"; 
  }
}

//a lot of jumping through gameState
function startQuiz (){
  image (stage1_opening2,0,0,600,400)
  firstFrame++;
  if (firstFrame >= 300) {
    firstFrame = 0;
    gameState = "first stage";
  }

}

//real quiz start
function quiz() {
  background(255);
  
  //list of quizzes
  if (currentQuestion < questions.length) {
    displayQuestion();
  } else {
    displayEndScreen(); // show end screen after finished all, this will lead to the main game again
   
  }
  
  // FEEDBACK
  if (feedback) {
    textSize(18);
    fill(255);
    textFont(pixelFont)
    textAlign(CENTER)
    text(feedback, 300, 290);
  }
}

// QUESTION
function displayQuestion() {
    
  // image(questions[currentQuestion].question, 0, 0, 600, 400);
  //there's problem with this code and I can't figure out how. So I have to display one by one instead:(((
  
  if (currentQuestion ==0){
    image(quiz_1, 0, 0, 600, 400);
  }else if(currentQuestion ==1){
      if (quizsong.isPlaying()) {
        quizsong.pause()
      }if (!ghiblisong.isPlaying()){
        ghiblisong.play()
      }
    image(quiz_2, 0, 0, 600, 400);
  }else if(currentQuestion ==2){
      if (ghiblisong.isPlaying()){
        ghiblisong.stop()
        quizsong.play()
      }
    image(quiz_3, 0, 0, 600, 400);
  }else if(currentQuestion ==3){
    image(quiz_4, 0, 0, 600, 400);
  }else if(currentQuestion ==4){
    image(quiz_5, 0, 0, 600, 400);
      if (quizsong.isPlaying()) {
        quizsong.pause()
      }if (!taylorsong.isPlaying()){
        taylorsong.play()
      }
  } 
  
} //array current start from 0 to 4

// Check if the answer is correct, check with the array of correct answer choices 0/1/2
function checkAnswer(choice) {
  let correctChoice = correctAnswer[currentQuestion];
  if (choice == correctChoice) {
    feedback = "Correct!";
  } else {
    feedback = "Wrong! Please Try Again" ;
    //QUIT DIRECTLY AFTER , go to windows redirect
    setTimeout(gameState = "game over", 1500);
  }

  showNextQuestion = true;
  setTimeout(nextQuestion, 1500); // feedback for 1.5 seconds only
}

// next question
function nextQuestion() {
  feedback = ""; // Clear string
  if (showNextQuestion) {
    currentQuestion++;
    showNextQuestion = false;
  }
}

// display end screen
function displayEndScreen() {
   if (taylorsong.isPlaying()){
        taylorsong.stop()
        quizsong.play()
      }
  image(stage1_ending,0,0,600,400)
  
  firstFrame++;
  if (firstFrame >= 200) {
    firstFrame = 0; // Reset frame counter
    gameState = "play"; // Switch to quiz state after 5 seconds
  }
}

