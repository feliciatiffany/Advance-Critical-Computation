let video;
let label = "Waiting...";
let classifier;
let handpose;
let predictions = [];
let videoWidth = 640;
let videoHeight = 480;
let waveCenterX = 0;
let waveCenterY = 0;

// Multiple waves
let waves = [];
let waveDuration = 2000; // 2 seconds


//diver
let diverDrops = [];
let lastDiverDropTime = 0;
const DIVER_DROP_INTERVAL = 50;
const MAX_DIVER_DROPS = 50;
let diverStormIntensity = 1.5;

//international 


function preload() {
  classifier = ml5.imageClassifier(
    "https://teachablemachine.withgoogle.com/models/9YlKw6pZA/model.json"
  );
}

function setup() {
  let canvas = createCanvas(windowWidth, (windowWidth / videoWidth) * videoHeight);

    canvas.parent("canvas-frame"); 
   
  
  video = createCapture(VIDEO);
  video.size(videoWidth, videoHeight);
  video.hide();

  handpose = ml5.handpose(video, () => {
    console.log("Handpose model ready!");
  });

  handpose.on("predict", (results) => {
    predictions = results;
  });

  classifyVideo();
}

function draw() {
  background(0);

  let aspectRatio = videoWidth / videoHeight;
  let newWidth = width;
  let newHeight = width / aspectRatio;
  let videoX = 0;
  let videoY = (height - newHeight) / 2;

  // Mirror video
  push();
  translate(videoX + newWidth, videoY);
  scale(-1, 1);
  image(video, 0, 0, newWidth, newHeight);
  pop();

  drawHand(videoX, videoY, newWidth, newHeight); // in other js file

  //tone monochrome -- maximize the color of the wave
  loadPixels();
  for (let i = 0; i < pixels.length; i += 4) {
    let r = pixels[i];
    let g = pixels[i + 1];
    let b = pixels[i + 2];

    // 🎞️ Convert to grayscale
    let brightness = 0.3 * r + 0.7 * g + 0.1 * b;

    pixels[i] = brightness;
    pixels[i + 1] = brightness;
    pixels[i + 2] = brightness;
  }
  updatePixels();

  // Active wave graphics -- for 2 second stay graphics
  for (let i = waves.length - 1; i >= 0; i--) {
    let wave = waves[i];
    if (millis() - wave.timestamp > waveDuration) {
      waves.splice(i, 1); // remove expired
    } else {
      image(wave.pg, 0, 0);
    }
  }

  // Draw label
  textSize(32);
  textAlign(CENTER, CENTER);
  fill(255);
  text(label, width / 2, height - 40);
}

function classifyVideo() {
  classifier.classify(video, gotResults);
}

function gotResults(error, results) {
  if (error) {
    console.error(error);
    return;
  }

  label = results[0].label;
  console.log("Detected label:", label);

  const validLabels = ["ASL", "Diver's Out of Air", "International International (Domestic Violence)", "Universal Distress"];
  if (
    label.toLowerCase().trim() === "asl" &&
    predictions.length > 0 &&
    predictions[0].landmarks.length >= 1
  ) {
    let [x, y] = predictions[0].landmarks[4];
    let adjustedX = width - x;
    let adjustedY = y;

    let pg = createGraphics(width, height);
    pg.clear();

    let aslWave = new ASLWave(pg, adjustedX, adjustedY);
    aslWave.draw(); //in other js file

    waves.push({
      pg: pg,
      x: adjustedX,
      y: adjustedY,
      timestamp: millis(),
    });
  } else if (
    label.toLowerCase().trim() === "Diver's Out of Air" &&
    predictions.length > 0 &&
    predictions[0].landmarks.length >= 1
  ) {
    let pg = createGraphics(width, height);

    // Get hand points
    let handPoints = predictions[0].landmarks.map(([x, y]) => {
      return createVector(
        width - map(x, 0, videoWidth, 0, width),
        map(y, 0, videoHeight, 0, height)
      );
    });

    // Run the diver storm effect
    diverStorm(pg, handPoints);

    // Add to waves array
    waves.push({
      pg: pg,
      timestamp: millis(),
    });
  } else if (
    label.toLowerCase().trim() === "International (Domestic Violence)" &&
    predictions.length > 0 &&
    predictions[0].landmarks.length >= 1
  ) {
    let [x, y] = predictions[0].landmarks[9]; // Using landmark 9 
    let adjustedX = width - x; // Mirroring the x-coordinate
    let adjustedY = y;

    let pg = createGraphics(width, height);
    pg.clear();

    let signal = new InternationalSignal(pg, adjustedX, adjustedY);
    signal.draw();

    waves.push({
      pg: pg,
      x: adjustedX,
      y: adjustedY,
      timestamp: millis(),
    });
  } else if (
    label.toLowerCase().trim() === "Universal Distress" &&
    predictions.length > 0 &&
    predictions[0].landmarks.length >= 1
  ) {
    let [x, y] = predictions[0].landmarks[9]; 
    let adjustedX = width - x; // mirror
    let adjustedY = y;

    let pg = createGraphics(width, height);
    pg.clear();

    let universal = new UniversalSignal(pg, adjustedX, adjustedY);
    universal.draw();

    waves.push({
      pg: pg,
      x: adjustedX,
      y: adjustedY,
      timestamp: millis(),
    });
  } 

  classifyVideo();
}
