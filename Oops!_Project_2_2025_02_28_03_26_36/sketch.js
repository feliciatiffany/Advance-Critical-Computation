let oops;
let oopsTextArray = [];
let movingDots = []; //array for the point text
let particles = 0; //array for the particles
let startTime=0;

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vx = random(-2, 2); //random right or left
    this.vy = random(-2, 2); //random up and down
    this.lifetime = 500; //timing for how long
  }
  update() {
    //movement of particle
    this.x += this.vx;
    this.y += this.vy;
    this.lifetime -= 1;
  }
  show() {
    //drawing the ellipse based on update
    noStroke();
    fill(255, this.lifetime); // lifetime for transparancy
    ellipse(this.x, this.y, 5);
  }

  isDead() {
    return this.lifetime < 0;
    
  }
}

function preload() {
  oops = loadFont("Oops!_Project_2_2025_02_28_03_26_36/Rubik.ttf");
}

function setup() {
  let canvas = createCanvas(600, 600);
  canvas.parent('p5-container');  
  textFont(oops);

  startTime = millis();
  oopsTextArray = oops.textToPoints("Oops!", width / 8, height / 1.7, 150, {
    sampleFactor: 0.3,
  });
  //   For particle
}

function draw() {
  background(0, 20); //FADING BACKGROUND
  fill('white');
  noStroke();
  
  let elapsedTime = millis() - startTime; //for time at the beginning
  if (elapsedTime < 5000) {
    for (let i = 0; i < oopsTextArray.length; i++) {
    let pt = oopsTextArray[i];
   
      //reference https://www.youtube.com/watch?v=JLAc9hMtcxk
      let offsetY = sin(frameCount * 0.04 + i * 0.2) * 2;
      //(fastest, shape wave, height of wave )
      ellipse(pt.x+offsetY, pt.y + offsetY, 7, 7);
    
  }

  } else {
    //   emit particle from each points of text
    for (let i = 0; i < oopsTextArray.length; i++) {
      movingDots.push(new Particle(oopsTextArray[i].x, oopsTextArray[i].y));
      // movingDots.push({
      //   x: oopsTextArray[i].x,
      //   y: oopsTextArray[i].y
      // });
    }

    //Update and display the particle
    for (let i = 0; i < oopsTextArray.length; i++) {
      movingDots[i].update();
      movingDots[i].show();

      if (movingDots[i].isDead()) {
        movingDots.splice(i, 1);
      }
    }
    
  }
  
  
}
