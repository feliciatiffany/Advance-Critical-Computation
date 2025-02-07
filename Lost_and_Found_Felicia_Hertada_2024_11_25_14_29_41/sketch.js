/*
My Name.: Felicia Hertada
My partner’s name : Ireen
The object description : A rectangle white container that vertically opens upward. When you open the container, there are small rectangular divider/section along the edges of the bottom part of the container. Inside those containers are each different colors of watercolor paint. The colors go in the order of the rainbow. 
*/

//2D primitives
//fill() and blendMode()
//Translate(), Rotate(), Push(), Pop()

function setup() {
  let canvas = createCanvas(400, 400);
  canvas.parent('p5-container1');  
  background(220);
}


function draw() {
  background(242, 162, 141);
  
  let c1=color(251,250,245);//white color
  angleMode(DEGREES);
  
  fill(c1);
  //noStroke();
  
  rect (50,280,300,60);//below
  quad(50, 280, 80, 280, 95, 260,95, 220);//left
  rect (95,220,210,40);//above
  quad(320, 280, 350, 280, 305, 220,305, 260);//right
  
  //the inside
  push()
  blendMode(MULTIPLY);
  
  translate(200,240)
  
  fill (251, 91, 68)//red
  quad (-135,40,-95,40,-70,0,-105,0)
  
  fill (252, 149, 72)//orange
  quad (-95,40,-50,40,-35,0,-70,0)
  
  fill (242, 206, 63)//yellow
  quad (-50,40,0,40,0,0,-35,0,)
  
  fill (136, 187, 100)//green
  quad (0,40,50,40,35,0,0,0)
  
  fill (4, 145, 208)//blue
  quad (50,40,95,40,70,0,35,0)
  
  fill (109, 69, 139)//purple
  quad (95,40,135,40,105,0,70,0)
  pop()
  
  //the lid
  fill(c1)
  rect (95,100,210,120);
  quad (95,100,305,100,320,75,80,75)
  
  //brush (trying out rotate)
  translate (330,120)
  rotate (30)
  push()
  fill (247, 227, 219)
  rect (0,0,12,130)
  noStroke()
  fill (51) 

  ellipse (6,135,15,25,8)
  triangle (-1,140, 11,145,6,160)
  pop()

}