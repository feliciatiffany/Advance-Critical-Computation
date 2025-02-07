let angle=0
function setup() {
  createCanvas(600, 600);
  // canvas.parent('p5-container');
  rectMode(CENTER);
  
}

function draw() {
  background(0);

  for (let i = 50; i < mouseX; i += 50) {
    for (let j = 50; j < mouseY; j += 50) {
      
      //for color
      noFill()
      stroke(mouseX - j, j, mouseY - i)
      strokeWeight(2)
      
      //for distance to center and size
      let distance =dist(mouseX,mouseY,j+width/2,i+height/2)
      let r=distance/5
      
      //make rect and circle and rotate
      if (mouseX%2==0){
        push()
        translate(i, j)
        rotate(-angle)
        rect(0, 0,r, r)
        pop()
        
        push()
        translate(i, j)
        rotate(angle)
        rect(0, 0,r, r)
        pop()
      }else{
        push()
        translate(i, j)
        circle(0, 0, r)
        pop()
      
      }
     
      
      
      
      angle+=0.0003
      
    }
  }

}