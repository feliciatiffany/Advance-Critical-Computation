//opening scene
function openingCode(){
  image (stage3_opening,0,0, 600,400)
   if (calmsong.isPlaying()) {
    calmsong.pause()
  }if (!codesong.isPlaying()){
    codesong.play()
  }
  firstFrame++;
  if (firstFrame >= 500) {
    firstFrame = 0; // Reset frame counter
    gameState = "opening third stage"; // Switch to quiz state after 5 seconds
  }
}

//the instruction
function startCode (){
  image (stage3_opening2,0,0, 600,400)
  firstFrame++;
  if (firstFrame >= 500) {
    firstFrame = 0; // Reset frame counter
    gameState = "third stage"; // Switch to quiz state after 5 seconds
  }
//   background (0)
//   fill(255);
//   textSize(24);
//   text("Answer CODE", width / 2, height / 2 - 40);
  
  firstFrame++;
  if (firstFrame >= 200) {
    firstFrame = 0; // Reset frame counter
    gameState = "third stage"; // Switch to quiz state after 5 seconds
  }

}

//where the main function of this game. and for displaying feedback
function code() {
  background(200);
  
  if (currentCode < codeQuestions.length) {
    displayCode();
    
  } else {
    displayEndCode();
  }

  // feedback the answer
  if (codeFeedback) {
    fill(255);
    textSize(20);
    textFont(pixelboldFont)
    text(codeFeedback, width / 2, 80);
  }
}

// display the current question with different input box position
function displayCode() {
//   fill(0);
//   textSize(24);
//   text(codeQuestions[currentCode].question, width / 2, height / 4);
  
//       //CODE STAGE
  // input box for typing answers, this will be displayed in the ____ empty word
  // console.log (mouseX,mouseY)
  if (currentCode ==0){
    image(code_1, 0, 0, 600, 400);
    inputBox.show();
    inputBox.position(292, 140);
    inputBox.size(100)
  }else if(currentCode ==1){
    image(code_2, 0, 0, 600, 400);
    inputBox.show();
    inputBox.position(240, 199);
    inputBox.size(60)
  }else if(currentCode ==2){
    image(code_3, 0, 0, 600, 400);
    inputBox.show();
    inputBox.position(115, 257);
    inputBox.size(60)
  }else if(currentCode ==3){
    image(code_4, 0, 0, 600, 400);
    inputBox.show();
    inputBox.position(175, 210);
    inputBox.size(70)
  }else if(currentCode ==4){
    image(code_5, 0, 0, 600, 400);
    inputBox.show();
    inputBox.position(256, 235);
    inputBox.size(75)
  }
  
    
  
  
}

// showing player input box and check answer, similar like the quiz game but checking the character for each string
function checkCode() {
  inputBox.hide();
  let userCode = inputBox.value().trim(); // trim user answer, like space etc
  let correctCode = codeAnswer[currentCode];

  //I learn this function from chatgpt because I realize when playing it that people might use uppercase
  if (userCode.toLowerCase() == correctCode.toLowerCase()) {
    codeFeedback = "Correct!";
  } else {
    codeFeedback = "Wrong! The correct answer was: " + correctCode;
    gameState = "game over"
  }

  inputBox.value(""); // Clear input box
  showNextCode = true;
  setTimeout(nextCode, 1500); // Show feedback for 1.5 seconds. So sad I learn this almost at the end of writing the code because I could just use this in every function with firstframe. 
}

// Move to the next question or end the quiz
function nextCode() {
  codeFeedback = ""; // Clear feedback
  if (showNextCode) {
    currentCode++;
    showNextCode = false;
  }
}

//  end screen after winning
function displayEndCode() {
  inputBox.hide();
  // textSize(24);
  // fill(0);
  // text("All questions correct! Returning to main stage...", width / 2, height / 2 - 20);
  image (stage3_ending,0,0,600,400)
  
    firstFrame++;

  if (firstFrame >= 200) {
    firstFrame = 0; // Reset frame counter
    gameState = "play"; // Switch to quiz state after 5 seconds
  }

}


