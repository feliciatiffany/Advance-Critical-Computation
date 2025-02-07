let circles = [];
let days = [
  'Friday, 11 Oct 2024', 
  'Saturday, 12 Oct 2024', 
  'Sunday,13 Oct 2024', 
  'Monday,14 Oct 2024', 
  'Tuesday,15 Oct 2024', 
  'Wednesday,16 Oct 2024', 
  'Thursday,17 Oct 2024'];
let quotes =[
  'Fear is normal and we can’t be fearless. \n  Dance with fear and use it \n \n - Trevor Ragan | TEDxCedarRapids ', 
  'Stop Studying. Start Learning \n \n - Justin Sung | TEDxUOA', 
  'Embrace being Lost and Your Values might change overtime \n \n - Vanessa Lau', 
  'Bahagia itu adalah ketika kita bisa \n menemukan kesenangan di hal yang biasa-biasa aja \n \n - How to Slow Down and Rest - Maudy Ayunda’s Booklist', 
  'Spain has the best Tomatoes for growing in the worst place \n \n - True Beauty - Ep 13 - Minute 59.25', 
  'fck insecure insecurean mann \n - My Friend, Eci', 
  'What “self-improvement” is really about: \n prioritizing better values, \n choosing better things to give a fuck about \n \n - The Subtle Art of Not Giving a F*ck - Mark Manson ']

let showDays = false;
let currentDay = '';
let currentQuote = '';
let backButton;
let fanyquote;

function setup() {
  createCanvas(600, 600);
  // canvas.parent('p5-container');s
  background(0);
  
  // Create 7 simple circles -- 
  for (let i = 0; i < 7; i++) {
    noStroke()
    let bubble = {
      x: random(width), 
      y: random(height), 
      size: random(100, 200),
      dx: random(1, 3), 
      dy: random(1, 3),
      
      color: color(random(255), random(255), random(255), 150), 
      decorations: []
    }
    
    
    circles.push(bubble); //I just learn this method, code to push the circle object into the circles array
  }

  
}

function draw() {
  if (!showDays) {
    background("white")
    //text in middle
    push()
    fill('#FDB7B9')
    textSize(20);
    textAlign(CENTER, CENTER);
    text("What is today's quote of the day?",300,285);
    textSize(17);
    fill('#C17779')
    text("(Pick one bubble)",300,315);
    pop()
    
    for (let i = 0; i < circles.length; i++) {
      let c = circles[i];
      
      // draw normal circles
      fill(c.color);
      circle(c.x, c.y, c.size);
      
      // move circles around
      c.x += c.dx;
      c.y += c.dy;
      
      // bounce off walls
      if (c.x > width || c.x < 0) c.dx *= -1;
      if (c.y > height || c.y < 0) c.dy *= -1;
      //learn here https://www.youtube.com/watch?v=eHZXvR6NDLo
    }
    
  } else {
    // Show the new slide with days of the week
    background('white');
    fill('#FDB7B9')
    textSize(30);
    textAlign(CENTER, CENTER);
    text(currentDay, width / 2, 220);
    
    
    fill('#C17779')
    textSize(20);
    textAlign(CENTER, CENTER);
    text(currentQuote, width / 2, 320);
    
    // Display the back button
    drawBackButton();
  }
}

function mousePressed() {
  //for button
  if (showDays && mouseX > 260 && mouseX <  340 && mouseY > 400 && mouseY   < 430) {
    //console.log("Back button clicked");
    showDays = false;
    return;
  }
  
  // circle is clicked
  for (let i = 0; i < circles.length; i++) {
    let c = circles[i];
    let d = dist(mouseX, mouseY, c.x, c.y);
    
    if (d < c.size / 2) {
      showDays = true;
      fanyquote = int(random(days.length))
      currentDay = days[fanyquote]
      currentQuote = quotes[fanyquote]
     
    }
  }
}

function drawBackButton() {
  // Draw the back button as a rectangle with text
  fill("#FDB7B9"); 
  rect(260,400,80,30,3);
  
  
  fill('white');
  noStroke()
  textSize(20);
  textAlign(CENTER, CENTER);
  text('Back', 260,400,80,30);
  
}
