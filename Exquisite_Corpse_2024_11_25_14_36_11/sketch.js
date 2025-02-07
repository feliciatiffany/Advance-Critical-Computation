function setup() {
  createCanvas(400, 600);
  // canvas.parent('p5-container');
  angleMode()
}

function draw() {
  background('#E3D5CE');
  
  //DASHED LINE
  push()
  stroke('#D7A799'); 
  strokeWeight(2); 

  drawDashedLine(0, 220, 400, 220, 10, 10); // Dashed line at y = 220
  drawDashedLine(0, 400, 400, 400, 10, 10); // Dashed line at y = 400
  pop()
  
  
  //LOWER
  //Tail
  push()
  beginShape();
  noStroke()
  fill('#3E425A')
  vertex(110, 350);
  vertex(112, 370);
  vertex(110, 380);
  vertex(100, 400);
  vertex(90,430)
  vertex(90,450)
  vertex(95,470)
  vertex(100,480)
  vertex(115,500)
  vertex(130,500)
  vertex(130,545)
  vertex(110,540)
  vertex(90,530)
  vertex(75,510)
  vertex(65,490)
  vertex(60,470)
  vertex(62,450)
  vertex(65,430)
  vertex(68,420)
  vertex(70,400)
  vertex(72,380)
  vertex(75,370)
  vertex(77,360)
  
  endShape(CLOSE)
  pop()
  
  push()
  tail (95,362,37,37,'#373C54')
  tail (95, 349, 31, 31,'#555B78')
  tail (94, 336, 29, 29,'#71748F')
  tail (89, 324, 26, 26,'#777B8E')
  tail (83, 313, 22, 22,'#748494')
  tail (75, 305, 17, 17,'#81909D')
  tail (67, 298, 12, 12,'#ABB0BB')
  tail (50, 291, 4, 4,'#B1C1C6')
  tail (54, 293, 6, 6,'#B1C1C6')
  tail (60, 295, 8, 8,'#B1C1C6')
  pop()
  
  

  push()
  noStroke()
  translate (50,350)
  rotate (-20.5)
  noFill()
  arc(0,0, 120, 120,0,HALF_PI)
  pop()
  
  push()
  noStroke()
  translate (20,345)
  rotate (-20)
  noFill()
  arc(0,0, 120, 120,0,HALF_PI)
  pop()
  
  //shirt inside
  push()
  beginShape();
  noStroke()
  fill('#B1C1C6')
  vertex(200, 240);
  vertex(170, 270);
  vertex(180, 395);
  vertex(270, 395);
  vertex(250,330)
  vertex(235, 240);
  
  endShape (CLOSE)
  
  push()
  pattern(197,240,39,10)
  pattern(190,250,10,150)
  pattern(210,245,10,150)
  pattern(230,245,10,150)
  pattern(180,385,50,10)
  pop()
  
  pop()
  
  push()
  beginShape();
  noStroke()
  fill('#3E425A')
  vertex(130,500)
  vertex(130,490)
  vertex(132, 480);
  vertex(140, 470);
  vertex(150, 465);
  vertex(160, 455);
  vertex(170, 440);
  vertex(170, 395);
  vertex(250,395)
  vertex(255,450)
  vertex(260,470)
  vertex(265,490)
  vertex(250,520)
  vertex(245,525)
  vertex(235,535)
  vertex(220,550)
  vertex(180,550)
  vertex(150,547)
  vertex(130,545)
  
  
  
  endShape(CLOSE)
  pop()
  
  //BODY
  push()
  beginShape();
  
  fill('#21253C')
  vertex(200, 240);
  vertex(160, 260);
  vertex(140, 420);
  vertex(170, 420);
  vertex(170,390)
  vertex(170,380)
  vertex(170, 420);
  vertex(165,480)
  vertex(190,480)
  vertex(190,350)
  vertex(180,300)
  vertex(200, 240);
  
  endShape (CLOSE)
  pop()
  
  push()
  beginShape();
  
  fill('#21253C')
  vertex(235, 240);
  vertex(255, 260);
  vertex(280, 420);
  vertex(250, 420);
  vertex(250,390)
  vertex(250,380)
  vertex(250, 420);
  vertex(255,480)
  vertex(230,480)
  vertex(230,350)
  vertex(240,300)
  vertex(235, 240);
  
  endShape (CLOSE)
  pop()
  
  //HEAD
  

  //sunray
  push()
  fill ('#ABB0BB')
  beginShape();
  
  vertex(155, 110);
  vertex(155, 95);
  vertex(140, 80);
  vertex(135, 35);
  vertex(150,65)
  vertex(160,75)
  vertex(180,80)
  vertex(195,95)
  vertex(205,80)
  vertex(210,60)
  vertex(230,40)
  vertex(220,60)
  vertex(230,90)
  vertex(245,105)
  
  vertex(290,95)
  vertex(310,90)
  vertex(280,110)
  vertex(270,130)
  vertex(265,150)
  
  vertex(300,175)
  vertex(320,190)
  vertex(280,180)
  
  vertex(250,205)
  vertex(255,215)
  vertex(270,220)
  vertex(290,235)
  vertex(305,240)
  vertex(290,240)
  vertex(270,230)
  vertex(210,215)
  vertex(180,225)
  
  vertex(150,280)
  vertex(150,240)
  vertex(155,210)
  vertex(160,195)
  
  vertex(145,190)
  vertex(135,200)
  vertex(120,240)
  vertex(125,210)
  vertex(120,190)
  vertex(130,160)
  
  vertex(120,140)
  vertex(105,130)
  vertex(80,140)
  vertex(100,125)
  vertex(135,115)
  vertex(150,115)

  endShape(CLOSE);
  noStroke()
  fill ('#ABB0BB')
  ellipse (210,155,100,110);
  pop()
  
  //neck
  push()
  beginShape();
  noStroke()
  fill('#B3C3C8')
  vertex(205, 190);
  vertex(210, 220);
  vertex(200, 240);
  vertex(235, 240);
  vertex(220,220)
  vertex(225,190)
  
  endShape (CLOSE)
  pop()
  
  //Round part
  ellipse (210,155,83,90);
  
  //blush
  push()
  noStroke()
  fill('#3E425A')
  translate (185,165)
  rotate (-20)
  ellipse(0, 0, 10, 20);
  pop()
  
  push()
  noStroke()
  fill('#3E425A')
  translate (235,165)
  rotate (20)
  ellipse(0, 0, 10, 20);
  pop()
  
  //eyes
  push()
  noStroke()
  fill('black')
  ellipse(225, 150, 7, 10);
  pop()
  
  push()
  noStroke()
  fill('black')
  ellipse(200, 150, 7, 10);
  pop()
  
  //eyebrow
  push()
  translate (199,146)
  rotate (-19.7)
  noFill();
  strokeWeight(3);
  arc(0, 0, 8, 2, PI, 0);
  pop()
  
  push()
  translate (224,146)
  rotate (-19.7)
  noFill();
  strokeWeight(3);
  arc(0, 0, 8, 2, PI, 0);
  pop()
  
  //smile
  push()
  translate (210,170)
  rotate (91)
  noFill();
  strokeWeight(3);
  arc(0, 0, 8, 7, PI, 0);
  pop()
  
  //long eyebrow
  push()
  noStroke()
  fill('#E1C2B8')
  translate (195,135)
  rotate (20)
  ellipse(0, 0, 3, 25);
  pop()
  
  push()
  noStroke()
  fill('#E1C2B8')
  translate (230,135)
  rotate (-20)
  ellipse(0, 0, 3, 25);
  pop()
  
  
  
  
}

function drawDashedLine(x1, y1, x2, y2, dashLength, gapLength) {
  let currentX = x1;
  
  while (currentX < x2) {
    
    line(currentX, y1, currentX + dashLength, y1);
    currentX += dashLength + gapLength;
  }
}

function tail (x,y,w,h,color){
  noStroke()
  fill(color)
  ellipse(x, y, w, h);
}

function pattern (x,y,w,h){
  fill('#1B1C27')
  rect(x,y,w,h)
}