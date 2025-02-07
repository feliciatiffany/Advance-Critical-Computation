let rotation = 0;
let presentTime=42192 * 1000;  //1000 to make it milliseconds and the time is based on this https://climateclock.world/
let pastTime = 4000000 *1000
let futureTime = 0
let currentTime; // Current time in miliseconds

let past
let present
let future


function setup() {
  createCanvas(600, 600);
   past =false; //for the condition of if statement
   present=true;
  future=false;
  
  currentTime = presentTime


}

function draw() {
  background(0);
   //STARS
  drawStars();
  
  push()
  fill('#FFFFFFff');
  textSize(18);
  textAlign (CENTER);
  text ('CLIMATE CLOCK',300,50)
  pop()
  
   push();
  
  //to change the color of button when pressed
  if (past) {
    fill('rgba(0,135,163,0.61)');
  } else {
    fill(70, 130, 180);
  }
  rect(100, 505, 100, 35, 10, 10, 10, 10);
 
  if (present) {               
    fill('rgba(0,135,163,0.61)');
  } else {
   fill(70, 130, 180);
  }
  rect(240, 505, 120, 35, 10, 10, 10, 10);
  
  if(future) {
    fill('rgba(0,135,163,0.61)');
  } else {
   fill(70, 130, 180);
  }
  rect(400, 505, 100, 35, 10, 10, 10, 10);
  
  fill('#FFFFFFff');
  textSize(18);
  textAlign (CENTER);
  text('Past', 150, 530);
  text('Present', 300, 530);
  text('Future', 450, 530);
   pop();
  
  
  //TIME 
  push()
  let seconds = floor(currentTime / 1000);
  let milliseconds = floor (currentTime % 1000);
  let hours    = floor (seconds / 8760);
  let minutes = floor((seconds % 8760) / 24);
  let remainingSeconds = seconds % 24;
  
  let timeString = nf (hours,2) + ' Years ' +nf(minutes, 2) + ' Days ' + nf(remainingSeconds, 2)+' : '+ nf (milliseconds,3);
  

  // Display the time
  fill(255); 
  textSize(30);
  textAlign(CENTER)
  text(timeString, width / 2, height / 6);

  // Update current time to move backward
   if (currentTime > 0) {
    currentTime -= deltaTime ;
  }
 pop()
  
  if (present) {
    
  translate(width / 2, height / 2); 
  rotate(rotation); 
  push()
  drawPresentEarth()
   // rotation
  let rotationSpeed = TWO_PI / 120; 
  rotation += rotationSpeed;

  if (rotation > TWO_PI) {
    rotation = 0;
  }
  pop()
}
  
  
  // to call the function of each condition(change the earth, time, and rotate the earth) 
  
  if (past) {
    
  translate(width / 2, height / 2); 
  rotate(rotation); 
  push()
  drawPastEarth()
   // rotation
  let rotationSpeed = TWO_PI / 120; 
  rotation += rotationSpeed;

  if (rotation > TWO_PI) {
    rotation = 0;
  }
  pop()
}
  
  if (future) {
    
  translate(width / 2, height / 2); 
  rotate(rotation); 
  push()
  drawfutureEarth()
   // rotation
  let rotationSpeed = TWO_PI / 120; 
  rotation += rotationSpeed;

  if (rotation > TWO_PI) {
    rotation = 0;
  }
  pop()
}
 

  
  

}

function mousePressed(){
  //past
  if (mouseX>100 && mouseX<200 && mouseY>505 && mouseY<540) { 
   
    if (!past) {
      past = true;
       present = false;
      future = false;
      
      currentTime = pastTime; 
    }
  }
  
  //present
  if (mouseX>240 && mouseX<360 && mouseY>505 && mouseY<540) { 
   
    if (!present) {
      present = true;
      past = false;
      future = false;
      currentTime = presentTime; 
    }
  }
  
  
  
  //future
  if (mouseX>400 && mouseX<500 && mouseY>505 && mouseY<540) { 
  
    if (!future) {
      future = true;
       present = false;
      past = false;
      
    currentTime = futureTime; 
    }
  }
}

function drawPresentEarth() {
  
  
  // ocean
  fill(70, 130, 180);  // Ocean blue
  stroke(0);           // Black border
  strokeWeight(2);
  ellipse(0, 0, 300, 300);

  // continent
  noStroke();
  fill(34, 139, 34);   

  //I got help from chatGPT to generate this many random shape of landmass
  //landmass
  beginShape();
  vertex(-50, -40);
  vertex(-30, -60);
  vertex(-20, -40);
  vertex(-10, -50);
  vertex(0, -30);
  vertex(-40, -10);
  vertex(-70, -30);
  endShape(CLOSE);
  
  beginShape();
  vertex(-90, 10);
  vertex(-60, 90);
  vertex(-100, 110);
  vertex(-130, 50);
  vertex(-110, 20);
  endShape(CLOSE);
  
  beginShape();
  vertex(50, -80);
  vertex(120, -50);
  vertex(110, -100);
  vertex(110, -70);
  vertex(100, -20);
  vertex(50, -30);
  endShape(CLOSE);
  
  //landmass
  beginShape();
  vertex(20, 0);
  vertex(50, 40);
  vertex(40, 60);
  vertex(10, 50);
  vertex(0, 20);
  endShape(CLOSE);

  beginShape();
  vertex(30, 10);
  vertex(100, 80);
  vertex(80, 120);
  vertex(20, 100);
  vertex(0, 50);
  endShape(CLOSE);
  
  beginShape();
  vertex(60, 70);
  vertex(80, 80);
  vertex(50, 100);
  vertex(30, 80);
  endShape(CLOSE);
  
  
  beginShape();
  vertex(-100, -80);
  vertex(-60, -100);
  vertex(-20, -90);
  vertex(-40, -70);
  vertex(-80, -50);
  vertex(-110, -60);
  endShape(CLOSE);

  beginShape();
  vertex(0, 0);
  vertex(20, 20);
  vertex(10, 40);
  vertex(-10, 30);
  vertex(-20, 10);
  endShape(CLOSE);
  
  
  beginShape();
  vertex(40, 60);
  vertex(50, 70);
  vertex(30, 80);
  vertex(20, 60);
  endShape(CLOSE);
  
  beginShape();
  vertex(-60, -20);
  vertex(-40, 40);
  vertex(-70, 60);
  vertex(-90, 30);
  vertex(-80, 0);
  endShape(CLOSE);
  
  beginShape();
  vertex(30, -60);
  vertex(70, -40);
  vertex(80, -80);
  vertex(90, -50);
  vertex(60, -20);
  vertex(30, -30);
  endShape(CLOSE);
 
  
  fill(240); // White for glaciers
  // Large glacier
  beginShape();
  vertex(50, -130);
  vertex(80, -110);
  vertex(100, -140);
  vertex(70, -150);
  endShape(CLOSE);

  
  beginShape();
  vertex(90, 80);
  vertex(120, 90);
  vertex(130, 110);
  vertex(100, 100);
  endShape(CLOSE);

  
  beginShape();
  vertex(-140, 50);
  vertex(-110, 70);
  vertex(-120, 90);
  vertex(-150, 60);
  endShape(CLOSE);
  

  beginShape();
  vertex(-30, 20);
  vertex(-10, 10);
  vertex(10, 30);
  vertex(-20, 40);
  endShape(CLOSE);
 
  
 
}

function drawPastEarth() {
  
  
  // ocean
  fill(70, 130, 180);  // Ocean blue
  stroke(0);           // Black border
  strokeWeight(2);
  ellipse(0, 0, 300, 300);

  // continent
  noStroke();
  fill(34, 139, 34);   

  //landmass
  beginShape();
  vertex(-50, -40);
  vertex(-30, -60);
  vertex(-20, -40);
  vertex(-10, -50);
  vertex(0, -30);
  vertex(-40, -10);
  vertex(-70, -30);
  endShape(CLOSE);
  
  beginShape();
  vertex(-90, 10);
  vertex(-60, 90);
  vertex(-100, 110);
  vertex(-130, 50);
  vertex(-110, 20);
  endShape(CLOSE);
  
  beginShape();
  vertex(50, -80);
  vertex(120, -50);
  vertex(110, -100);
  vertex(110, -70);
  vertex(100, -20);
  vertex(50, -30);
  endShape(CLOSE);
  
  //landmass
  beginShape();
  vertex(20, 0);
  vertex(50, 40);
  vertex(40, 60);
  vertex(10, 50);
  vertex(0, 20);
  endShape(CLOSE);

  beginShape();
  vertex(30, 10);
  vertex(100, 80);
  vertex(80, 120);
  vertex(20, 100);
  vertex(0, 50);
  endShape(CLOSE);
  
  beginShape();
  vertex(60, 70);
  vertex(80, 80);
  vertex(50, 100);
  vertex(30, 80);
  endShape(CLOSE);
  
  
  beginShape();
  vertex(-100, -80);
  vertex(-60, -100);
  vertex(-20, -90);
  vertex(-40, -70);
  vertex(-80, -50);
  vertex(-110, -60);
  endShape(CLOSE);

  beginShape();
  vertex(0, 0);
  vertex(20, 20);
  vertex(10, 40);
  vertex(-10, 30);
  vertex(-20, 10);
  endShape(CLOSE);
  
  
  beginShape();
  vertex(40, 60);
  vertex(50, 70);
  vertex(30, 80);
  vertex(20, 60);
  endShape(CLOSE);
  
  beginShape();
  vertex(-60, -20);
  vertex(-40, 40);
  vertex(-70, 60);
  vertex(-90, 30);
  vertex(-80, 0);
  endShape(CLOSE);
  
  beginShape();
  vertex(30, -60);
  vertex(70, -40);
  vertex(80, -80);
  vertex(90, -50);
  vertex(60, -20);
  vertex(30, -30);
  endShape(CLOSE);
 
  fill(240); // White for glaciers
  beginShape();
  vertex(-120, -100);
  vertex(-90, -90);
  vertex(-50, -120);
  vertex(0, -130);
  vertex(-70, -150);
  vertex(-130, -120);
  endShape(CLOSE);


  beginShape();
  vertex(-140, 50);
  vertex(-100, 70);
  vertex(-50, 100);
  vertex(-120, 130);
  vertex(-160, 90);
  endShape(CLOSE);

  beginShape();
  vertex(90, 80);
  vertex(120, 90);
  vertex(130, 120);
  vertex(150, 90);
  vertex(110, 150);
  endShape(CLOSE);

  
  beginShape();
  vertex(-30, 0);
  vertex(10, 10);
  vertex(50, 0);
  vertex(30, -30);
  vertex(-10, -20);
  endShape(CLOSE);

  beginShape();
  vertex(-120, -100);
  vertex(-90, -90);
  vertex(-70, -120);
  vertex(-100, -130);
  endShape(CLOSE);

  beginShape();
  vertex(50, -130);
  vertex(80, -110);
  vertex(100, -140);
  vertex(70, -150);
  endShape(CLOSE);

  beginShape();
  vertex(90, 80);
  vertex(120, 90);
  vertex(130, 110);
  vertex(100, 100);
  endShape(CLOSE);

  beginShape();
  vertex(-140, 50);
  vertex(-110, 70);
  vertex(-120, 90);
  vertex(-150, 60);
  endShape(CLOSE);
  
  beginShape();
  vertex(-30, 20);
  vertex(-10, 10);
  vertex(10, 30);
  vertex(-20, 40);
  endShape(CLOSE);
 
}

function drawfutureEarth(){
  fill(80, 80, 80); // Dark gray color for water (lifeless oceans)
  ellipse(0, 0, 300, 300);
  
  
  fill(139, 69, 19); // Brown color for dead land
  
  beginShape();
  vertex(-50, -40);
  vertex(-30, -60);
  vertex(-20, -40);
  vertex(-10, -50);
  vertex(0, -30);
  vertex(-40, -10);
  vertex(-70, -30);
  endShape(CLOSE);
  
  beginShape();
  vertex(-90, 10);
  vertex(-60, 90);
  vertex(-100, 110);
  vertex(-130, 50);
  vertex(-110, 20);
  endShape(CLOSE);
  
  beginShape();
  vertex(50, -80);
  vertex(120, -50);
  vertex(110, -100);
  vertex(110, -70);
  vertex(100, -20);
  vertex(50, -30);
  endShape(CLOSE);
  
  //landmass
  beginShape();
  vertex(20, 0);
  vertex(50, 40);
  vertex(40, 60);
  vertex(10, 50);
  vertex(0, 20);
  endShape(CLOSE);

  beginShape();
  vertex(30, 10);
  vertex(100, 80);
  vertex(80, 120);
  vertex(20, 100);
  vertex(0, 50);
  endShape(CLOSE);
  
  beginShape();
  vertex(60, 70);
  vertex(80, 80);
  vertex(50, 100);
  vertex(30, 80);
  endShape(CLOSE);
  
  
  beginShape();
  vertex(-100, -80);
  vertex(-60, -100);
  vertex(-20, -90);
  vertex(-40, -70);
  vertex(-80, -50);
  vertex(-110, -60);
  endShape(CLOSE);

  beginShape();
  vertex(0, 0);
  vertex(20, 20);
  vertex(10, 40);
  vertex(-10, 30);
  vertex(-20, 10);
  endShape(CLOSE);
  
  
  beginShape();
  vertex(40, 60);
  vertex(50, 70);
  vertex(30, 80);
  vertex(20, 60);
  endShape(CLOSE);
  
  beginShape();
  vertex(-60, -20);
  vertex(-40, 40);
  vertex(-70, 60);
  vertex(-90, 30);
  vertex(-80, 0);
  endShape(CLOSE);
  
  beginShape();
  vertex(30, -60);
  vertex(70, -40);
  vertex(80, -80);
  vertex(90, -50);
  vertex(60, -20);
  vertex(30, -30);
  endShape(CLOSE);
  
  beginShape();
  vertex(-50, -50);
  vertex(-40, -60);
  vertex(-20, -70);
  vertex(0, -60);
  vertex(20, -50);
  vertex(10, -30);
  vertex(-10, -40);
  endShape(CLOSE);

  beginShape();
  vertex(80, 20);
  vertex(100, 30);
  vertex(90, 50);
  vertex(70, 40);
  endShape(CLOSE);



  noFill();
  stroke(150, 0, 0, 80); // Reddish haze
  strokeWeight(5);
  ellipse(0, 0, 330, 330); // Outer glow
  ellipse(0, 0, 360, 360); // Second layer of glow

}

function drawStars() {
  fill(255); // Star color (white)
  //I got help from chatGPT to randomize this star placement 
  noStroke();
  ellipse(50, 50, 3, 3);
  ellipse(100, 80, 2, 2);
  ellipse(150, 120, 4, 4);
  ellipse(200, 60, 2, 2);
  ellipse(250, 150, 3, 3);
  ellipse(300, 100, 4, 4);
  ellipse(350, 30, 2, 2);
  ellipse(50, 300, 3, 3);
  ellipse(200, 350, 4, 4);
  ellipse(350, 250, 3, 3);
  ellipse(400, 100, 2, 2);
  ellipse(450, 200, 3, 3);
  ellipse(500, 150, 4, 4);
  ellipse(550, 300, 2, 2);
  ellipse(600, 250, 3, 3);
  ellipse(550, 50, 4, 4);
  ellipse(500, 30, 2, 2);
  ellipse(100, 550, 3, 3);
  ellipse(300, 500, 4, 4);
  ellipse(600, 450, 3, 3);
  ellipse(50, 500, 2, 2);
  ellipse(400, 550, 3, 3);
  ellipse(550, 550, 4, 4);
}
