let font;
let word = "DESIGN";
let glitchIndex = 0;
let glitchTimer = 0;
let glitchInterval = 1000;
let letterDisplayDuration = 1000;
let colors = ["red", "blue", "yellow", 255];
let animationStage = 0;
let stageStartTime;

function preload() {
  font = loadFont("Design_Project2_2025_02_28_03_31_50/SchibstedGrotesk-ExtraBold.ttf");
}

function setup() {
  let canvas = createCanvas(600, 600);
  canvas.parent('p5-container');  
  textFont(font);
  textAlign(CENTER, CENTER);
  // if (!font) {
  //   console.error("Font not loaded yet!");
  // }
  stageStartTime = millis();
}


function draw() {
  let elapsedTime = millis() - stageStartTime;
  
  
  if (animationStage == 0) {
    
    runDistortionEffect();
    
    if (elapsedTime >= 5000) {  
      animationStage = 1;
      stageStartTime = millis();
    }
  } else if (animationStage === 1) {
    runZoomEffect();
    if (elapsedTime >= 10000) {  
      animationStage = 2;
      glitchIndex = 0;
      glitchTimer = millis();
      stageStartTime = millis();
    }
  }else if (animationStage == 2) {
    //I tried to make this stage the first one but it's not working, i'm frustrated don't know why
    runGlitchEffect();
    
  }
}

function runGlitchEffect() {
  background(0)
  let letter = word.charAt(glitchIndex);
  textSize(width);
  for (let i = 0; i < colors.length; i++) {
    if (i === 3) textSize(width - 50);
    push();
    translate(width / 2 + i, height / 3 + 10);
    let elapsed = millis() - glitchTimer;
    if (elapsed < letterDisplayDuration) {
      let xOffset = random(-10, 10);
      let yOffset = random(-10, 10);
      fill(colors[i]);
      noStroke()
      text(letter, xOffset, yOffset);
    }
    pop();
  }
  if (millis() - glitchTimer >= glitchInterval) {
    glitchIndex = (glitchIndex + 1);
    glitchTimer = millis();
    
  }
}

let angle = 0;
let words = ["DESIGN", "DESIGN", "DESIGN", "DESIGN"];
let distortFactor = 40; // INTENSEEE!!
let colors2 = ["red", "blue", "yellow"];
let colorIndex = 0;
let colorChangeInterval = 2000;
let lastColorChange = 0;

function runDistortionEffect() {
  background(255);
  console.log("Switching to Stage 2");
  let textCenterX = 0;
  let textCenterY = height / 4;

  if (millis() - lastColorChange > colorChangeInterval) {
    colorIndex = (colorIndex + 1) % colors2.length;
    lastColorChange = millis();
    
  }

  for (let i = 0; i < words.length; i++) {
    let yOffset2 = i * 150;
    let textSizeValue = 200;
    let textPoints = font.textToPoints(words[i], textCenterX - textSizeValue / 2, textCenterY + yOffset2, textSizeValue, { sampleFactor: 1 });
  if (textPoints.length === 0) {
      console.error("textToPoints() failed, no points generated!");
      return;
    }

    noFill();
    stroke(colors2[colorIndex]);
    strokeWeight(3);

    for (let p of textPoints) {
      let dx = p.x - textCenterX;
      let dy = p.y - textCenterY;
      let distance = sqrt(dx * dx + dy * dy);
      let distortion = sin(angle + distance * 0.01) * distortFactor;

      let distortedX = p.x + distortion * 2;
      let distortedY = p.y + distortion * 2;
      point(distortedX, distortedY);
    }
  }
  
  angle += 0.2;
}


let size = 50; // Initial text size
let maxSize = 300; // Maximum zoom size
let startTime;
let duration = 10000; // waktu
let zoomWords = [];
let wordInterval = 1000; 
let lastWordTime = 0;
// don't know why but this one make me spent the most time
function runZoomEffect() {
  background("white");
  let textCenterX = width / 1.6;
  let textCenterY = height / 3;
  let elapsedTime = millis() - stageStartTime;
  if (elapsedTime > 10000) {
    zoomWords = [];
  }
  if (millis() - lastWordTime > wordInterval) {
    lastWordTime = millis();
    zoomWords.push({ size: 50, alpha: 255, createdTime: millis(), color: colors[colorIndex] });
    colorIndex = (colorIndex + 1) % colors.length;
  }
  for (let i = zoomWords.length - 1; i >= 0; i--) {
    let word = zoomWords[i];
    let wordElapsed = millis() - word.createdTime;
    word.size = map(wordElapsed, 0, 10000, 50, maxSize);
    word.alpha = map(wordElapsed, 0, 10000, 255, 0);
    let wordPoints = font.textToPoints("DESIGN", textCenterX - word.size * 2.5, textCenterY, word.size, { sampleFactor: 1 });
    noFill();// to make the distortion
    stroke(word.color);
    strokeWeight(2);
    for (let p of wordPoints) {
      let dx = p.x - textCenterX + 50;
      let dy = p.y - textCenterY + 120;
      let distance = sqrt(dx * dx + dy * dy);
      let maxDistortion = 500;
      let distortionFactor = map(distance, 0, width / 2, 0, maxDistortion);
      let angle = atan2(dy, dx);
      let distortedX = p.x + cos(angle) * distortionFactor * (word.size / maxSize) * 2.5;
      let distortedY = p.y + sin(angle) * distortionFactor * (word.size / maxSize) * 2.5;
      point(distortedX, distortedY);
    }
    if (word.alpha <= 0) {
      zoomWords.splice(i, 1);
    }
  }
}
