//the reflection and (first and final) sketch in other sketch files


let totoroColor='#666666';
let eyeOpen = true; 
let isRed = false; 

function setup() {
  let canvas=createCanvas(400, 400);
  canvas.parent('p5-container'); 
  color1 =(random(0,255));
  color2 =(random(0,255));
  color3 =(random(0,255));
 
}

function draw() {
  background(color1,color2, color3);
  ellipse (200,200, mouseX, mouseY);
  
 
  translate (width/2,height/2)
  
  // Totoro's body
  noStroke()
  fill(totoroColor);
  ellipse(0,0, mouseX+20, mouseY); // Body
  

  // Totoro's eyes
  fill(255);
 

  if (eyeOpen) {
    ellipse(-mouseX/5+10, -40, 40, 40); // Left eye
  ellipse(mouseX/5-10, -40, 40, 40); // Right eye
    fill(0);  // Black pupils
     ellipse(-mouseX/5+10, -40, 20, 20); // Left pupil
  ellipse(mouseX/5-10,-40, 20,20); // Right pupil
  } else {
    // If eyes are closed, draw lines instead
    fill(0);  // Black lines for closed eyes
    rect(-50, -40, 30, 5);  // Left eye closed
    rect(20, -40, 30, 5);  // Right eye closed
  }
  // Pupils
  fill(0);
 

 
  // Totoro's tummy
  fill(255);
  ellipse(0,90, mouseX/2, mouseY/2-70); // Tummy

   // Totoro's nose
  fill(0);
  ellipse(0, 0, 20, 15); // Nose

  // Totoro's ears
  fill(totoroColor);
  triangle(-mouseX/3, -80, -mouseX/5, -150, -mouseX/5+40, -80); // Left ear
  triangle(mouseX/3, -80, mouseX/5, -150, mouseX/5-40, -80); // Right ear
  
  
}  

function keyPressed(){
  if (key === 'B' || key === 'b') {
    eyeOpen = !eyeOpen; 
  }
}

function mousePressed() {
  if (isRed) {
  totoroColor='#666666';;
  } else {
    totoroColor = '#FF0000'; }
  isRed = !isRed;
}
  
