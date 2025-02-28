let urup;
let urupTextArray = [];
let aksaraTextArray = [];
let snakePoints = [];
let fontSize = 200;
let animationSpeed = 2;
let progress = 0;
let phase = 0;
let urupPoints = [];
let aksaraPoints = [];
let currentPoints = [];
let delayCounter = 0;
let delayTime = 100; // Delay before the second word appears

function preload() {
  urup = loadFont("Urup_Project_2_2025_02_28_03_26_55/futura medium bt.ttf");
  aksara = loadFont("Urup_Project_2_2025_02_28_03_26_55/Nawatura.ttf");
}

function setup() {
  let canvas = createCanvas(600, 600);
  canvas.parent('p5-container');  
  textFont(urup);
  textSize(0);

  urupPoints = urup.textToPoints("urup", width / 6, height / 1.9, fontSize, {
    sampleFactor: 0.5,
  });
  aksaraPoints = aksara.textToPoints("ꦲꦸꦫꦸꦥ꧀", width/11, height / 2, 160, {
    sampleFactor: 0.5,
  });

  currentPoints = urupPoints;
  startPhase(currentPoints);
}

function startPhase(points) {
  snakePoints = [];
  progress = 0;
  let charSegments = {};
  let charIndex = 0;
  
  for (let i = 0; i < points.length; i++) {
    if (!charSegments[charIndex]) {
      charSegments[charIndex] = random(TWO_PI); // Assign a unique direction to each character
    }
    
    let angle = charSegments[charIndex];
    let distance = random(300, 600);
    let startX = points[i].x + cos(angle) * distance;
    let startY = points[i].y + sin(angle) * distance;
    
    snakePoints.push({
      x: startX,
      y: startY,
      targetX: points[i].x,
      targetY: points[i].y,
    });
    
    if ((i + 1) % (points.length / 2) === 0) { // Change direction per character
      charIndex++;
    }
  }
}

function draw() {
  background(20);
  noStroke();

  if (progress < snakePoints.length) {
    progress += animationSpeed;
  }

  for (let i = 0; i < progress; i++) {
    let pt = snakePoints[i];
    pt.x = lerp(pt.x, pt.targetX, 0.05);
    pt.y = lerp(pt.y, pt.targetY, 0.05);
    
    let fireColor = color(random(200, 255), random(50, 100), random(0, 50));
    fill(fireColor);
    ellipse(pt.x, pt.y, random(5, 10), random(5, 10));
  }
  
  if (progress >= snakePoints.length && phase === 0) {
    delayCounter++;
    if (delayCounter > delayTime) {
      phase = 1;
      currentPoints = aksaraPoints;
      
      startPhase(currentPoints);
    }
  }
}
