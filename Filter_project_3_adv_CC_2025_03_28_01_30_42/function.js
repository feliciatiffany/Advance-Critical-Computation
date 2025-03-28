//test hand show-- the dots
function drawHand(videoX, videoY, newWidth, newHeight) {
  if (predictions.length > 0) {
    let hand = predictions[0];
    for (let i = 0; i < hand.landmarks.length; i++) {
      let [x, y] = hand.landmarks[i];

      // map and mirror the X/Y - hard to find the exact poin and sometimes look off lol
      let adjustedX = videoX + newWidth - map(x, 0, video.width, 0, newWidth);
      let adjustedY = videoY + map(y, 0, video.height, 0, newHeight);

      fill(0, 255, 0);
      noStroke();
      circle(adjustedX, adjustedY, 10);

      
    }
  }
}

//ASL graphics see this link https://editor.p5js.org/feliciatiffany/sketches/kaCJ8K41i
class ASLWave {
  constructor(pg, centerX, centerY) {
    this.pg = pg;
    this.centerX = centerX;
    this.centerY = centerY;
    this.angleOffset = 0;

    this.numWaves = 100;
    this.numCurves = 200;
    this.maxRadius = 200;
  }

  draw() {
    let pg = this.pg;
    pg.push();
    pg.translate(this.centerX, this.centerY);
    pg.colorMode(HSB, 360, 100, 100, 100);
    pg.noFill();

    for (let i = 0; i < this.numWaves; i++) {
      let radius = map(i, 0, this.numWaves, 10, this.maxRadius);
      let colorOffset = map(i, 0, this.numWaves, 180, 240);
      let waveAmplitude = map(i, 0, this.numWaves, 5, 50);
      let waveFrequency = map(i, 0, this.numWaves, 0.3, 2.7);
      let phaseShift = sin(this.angleOffset * 0.3 + i * 0.2) * 20;

      pg.beginShape();
      for (let j = 0; j < this.numCurves; j++) {
        let angle = map(j, 0, this.numCurves, 0, TWO_PI);
        let randomOffset =
          noise(i * 0.05, j * 0.02, frameCount * 0.005) * waveAmplitude;
        let waveOffset =
          sin(angle * waveFrequency + this.angleOffset) * waveAmplitude +
          randomOffset +
          phaseShift;

        let x = cos(angle) * (radius + waveOffset);
        let y = sin(angle) * (radius + waveOffset);

        let alpha = map(radius, 0, this.maxRadius, 100, 5);
        pg.stroke(colorOffset, 60, 90, alpha);
        pg.strokeWeight(map(radius, 0, this.maxRadius, 2, 0.3));
        pg.curveVertex(x, y);
      }
      pg.endShape(CLOSE);
    }

    this.angleOffset += 0.045;
    pg.pop();
  }
}


//diver graphics- i don't know why but using class doesn't work. My speculation is because there's buffers and object instances. Like every time graphics load, it didn't keep the frame from before, or like the coordinate is isolated inside function so the rain or branches didn't go outside the dots. Got help from chat.gpt because this one is the hardest haha . see this original link https://editor.p5js.org/feliciatiffany/sketches/cM0PMl2OT

function diverStorm(pg, handPoints) {
  pg.colorMode(HSB, 360, 100, 100, 100);
  pg.clear();
  
  //  drop from each dots
  if (millis() - lastDiverDropTime > DIVER_DROP_INTERVAL) {
    for (let pt of handPoints) {
      if (random() < 0.3 && diverDrops.length < MAX_DIVER_DROPS) {
        diverDrops.push(createDiverDrop(pt.x, pt.y));
        lastDiverDropTime = millis();
      }
    }
  }

  // process, or like update
  for (let i = diverDrops.length - 1; i >= 0; i--) {
    updateDiverDrop(diverDrops[i]);
    drawDiverDrop(pg, diverDrops[i]);
    
    // remove
    if (isDiverDropDead(diverDrops[i])) {
      diverDrops.splice(i, 1);
    }
  }
}

// for the storm
function createDiverDrop(x, y) {
  return {
    pos: createVector(x, y),
    vel: createVector(random(-0.5, 0.5), random(5, 15)),
    acc: createVector(0, 0),
    segments: [],
    branches: [],
    lifetime: 0,
    maxLife: random(500, 1500),
    hue: random(200, 240),
    length: random(10, 40),
    thickness: random(0.3, 2),
    angle: 0,
    angleVel: random(-0.05, 0.05),
    wiggle: random(1, 3),
    branchInterval: floor(random(10, 40))
  };
}

function updateDiverDrop(drop) {
  drop.lifetime++;
  
  // going down
  drop.acc.add(createVector(
    (noise(drop.pos.x * 0.01, frameCount * 0.01) - 0.5) * 0.3 * diverStormIntensity,
    0.3 * diverStormIntensity
  ));
  
  drop.vel.add(drop.acc);
  drop.vel.limit(15 * diverStormIntensity);
  drop.pos.add(drop.vel);
  drop.acc.mult(0);
  
  //  trail
  drop.segments.push(createVector(drop.pos.x, drop.pos.y));
  if (drop.segments.length > 8) drop.segments.shift();
  
  //  branches
  if (drop.lifetime % drop.branchInterval === 0 && random() < 0.2 * diverStormIntensity) {
    drop.branches.push({
      pos: drop.pos.copy(),
      vel: createVector(random(-0.3, 0.3), random(3, 8)),
      acc: createVector(0, 0.1),
      angle: drop.angle + random(-PI/6, PI/6),
      length: drop.length * random(0.2, 0.5),
      life: floor(random(15, 60)),
      segments: []
    });
  }
  
  // update branches
  for (let i = drop.branches.length - 1; i >= 0; i--) {
    let b = drop.branches[i];
    b.vel.add(b.acc);
    b.pos.add(b.vel);
    b.segments.push(createVector(b.pos.x, b.pos.y));
    if (b.segments.length > 5) b.segments.shift();
    b.life--;
    if (b.life <= 0) drop.branches.splice(i, 1);
  }
}

function drawDiverDrop(pg, drop) {
  // main drop trail
  pg.beginShape();
  for (let i = 0; i < drop.segments.length; i++) {
    let seg = drop.segments[i];
    let interp = i / drop.segments.length;
    pg.stroke(
      constrain(drop.hue + i * 0.5, 200, 240),
      map(interp, 0, 1, 60, 40),
      90,
      70 * interp
    );
    pg.strokeWeight(drop.thickness * interp * 0.8);
    pg.curveVertex(
      seg.x + sin(frameCount * 0.05 + i) * drop.wiggle,
      seg.y
    );
  }
  pg.endShape();
  
  // Branches
  for (let b of drop.branches) {
    // Branch trail
    pg.beginShape();
    for (let i = 0; i < b.segments.length; i++) {
      let seg = b.segments[i];
      pg.stroke(
        drop.hue + 10, 
        50, 
        80, 
        map(i/b.segments.length, 0, 1, 60, 0)
      );
      pg.strokeWeight(drop.thickness * 0.5 * (i/b.segments.length));
      pg.curveVertex(seg.x, seg.y);
    }
    pg.endShape();
    
    // Branch line
    pg.stroke(drop.hue + 10, 50, 80, map(b.life, 60, 0, 60, 0));
    pg.strokeWeight(drop.thickness * 0.5);
    pg.line(
      b.pos.x,
      b.pos.y,
      b.pos.x + cos(b.angle) * b.length,
      b.pos.y + sin(b.angle) * b.length
    );
  }
  
  // Drop head
  pg.noStroke();
  pg.fill(drop.hue, 40, 90, 20);
  pg.ellipse(drop.pos.x, drop.pos.y, drop.thickness * 6);
}

function isDiverDropDead(drop) {
  return drop.pos.y > height + 100 || 
         drop.pos.x < -100 || 
         drop.pos.x > width + 100 ||
         drop.lifetime > drop.maxLife;
}


//international signal . link for more https://editor.p5js.org/feliciatiffany/sketches/kLOmaiCgn
class InternationalSignal {
  constructor(pg, centerX, centerY) {
    this.pg = pg;
    this.centerX = centerX;
    this.centerY = centerY;
    this.angleOffset = 0;

    this.numRings = 100;
    this.numSpokes = 120;
    this.maxRadius = 200;
  }

  draw() {
    let pg = this.pg;
    pg.push();
    pg.translate(this.centerX, this.centerY);
    pg.colorMode(HSB, 360, 100, 100, 100);
    pg.noFill();

    for (let i = 0; i < this.numRings; i++) {
      let radius = map(i, 0, this.numRings, 0, this.maxRadius);
      let colorOffset = map(i, 0, this.numRings, 260, 320);

      for (let j = 0; j < this.numSpokes; j++) {
        let angle = map(j, 0, this.numSpokes, 0, TWO_PI) + this.angleOffset * (i * 0.1);
        let spiralEffect = sin(this.angleOffset * 0.2 + i * 0.2) * 10;

        let x1 = cos(angle) * (radius + spiralEffect);
        let y1 = sin(angle) * (radius + spiralEffect);
        let x2 = cos(angle) * (radius + 20 + spiralEffect);
        let y2 = sin(angle) * (radius + 20 + spiralEffect);

        let flicker = sin(frameCount * 0.1 + j * 0.1) * 50 + 50;
        pg.stroke(colorOffset, flicker, 100, map(radius, 0, this.maxRadius, 100, 0));
        pg.strokeWeight(map(radius, 0, this.maxRadius, 3, 1));
        pg.line(x1, y1, x2, y2);
      }
    }

    this.angleOffset += 0.1;
    pg.pop();
  }
}

//universal, dying in the sea. see this link https://editor.p5js.org/feliciatiffany/sketches/XQBI68VkP

class UniversalSignal {
  constructor(pg, centerX, centerY) {
    this.pg = pg;
    this.centerX = centerX;
    this.centerY = centerY;
    this.angleOffset = 0;

    // parameters
    this.numFlames = 80;
    this.numPoints = 100;
    this.maxRadius = 20;
    this.rotationSpeed = 0.15;
    this.flameIntensity = 1.2;
  }

  draw() {
    let pg = this.pg;
    pg.push();
    pg.translate(this.centerX, this.centerY);
    pg.colorMode(HSB, 360, 100, 100, 100);
    pg.noFill();

    for (let i = 0; i < this.numFlames; i++) {
      let radius = map(i, 0, this.numFlames, 10, this.maxRadius);
      let colorOffset = map(i, 0, this.numFlames, 0, 50) % 360; 

      let flameAmplitude = map(i, 0, this.numFlames, 20, 100) * this.flameIntensity;
      let flameFrequency = map(i, 0, this.numFlames, 1, 20);
      let phaseShift = sin(this.angleOffset * 0.8 + i * 0.7) * 50;

      pg.beginShape();
      for (let j = 0; j < this.numPoints; j++) {
        let angle = map(j, 0, this.numPoints, 0, TWO_PI);
        
        let randomOffset = noise(i * 0.3, j * 0.1, frameCount * 0.04) * flameAmplitude;
        let flameOffset = sin(angle * flameFrequency + this.angleOffset) * flameAmplitude + randomOffset + phaseShift;
        let x = cos(angle) * (radius + flameOffset);
        let y = sin(angle) * (radius + flameOffset);

        let upwardIntensity = map(abs(sin(angle)), 0, 1, 1, 3);
        let spikeFactor = map(abs(sin(angle)), 0, 1, 1, 5);
        let alpha = map(radius, 0, this.maxRadius, 150, 10) * upwardIntensity;
        
        pg.stroke(colorOffset, 100, 100, alpha);
        pg.strokeWeight(map(radius, 0, this.maxRadius, 3, 1) * upwardIntensity);

        if (abs(sin(angle)) > 0.9) {
          y -= random(0, 15) * spikeFactor;
        }

        pg.curveVertex(x, y);
      }
      pg.endShape(CLOSE);
    }

    this.angleOffset += this.rotationSpeed;
    pg.pop();
  }

  
  setIntensity(intensity) {
    this.flameIntensity = constrain(intensity, 0.5, 3);
  }
}