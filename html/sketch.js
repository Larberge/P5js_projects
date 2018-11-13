var canvas;
var canvasBg;
var h1;
var p1;
var b1;
var b2;
var p2;
var p3;
var slider
var txttxtInput;
var output;

function setup(){
  h1 = createElement("h1", "Header created from javascript");
  h1.position(10, 190);

  p1 = createP("This is created from javascript as a paragraph");
  p1.position(10, 270);

  b1 = createButton("Change color of canvas");
  b1.position(10, 320);
  b1.mousePressed(changeCanvasColor);
  //b1.mouseMoved(changeCanvasColor);
  b1.style("background-color", "pink")

  canvas = createCanvas(200, 95);
  canvas.position(10, 341);
  canvasBg = color(0);

  slider = createSlider(10, 100, 47);
  slider.position(240, 360);

  txtInput = createInput("Your name here");
  txtInput.position(10, 450);
  txtInput.changed(setOutput);

  output = createP("");
  output.position(190, 435);

  p2 = createP("Random number between [-10,10]:");
  p2.position(10,480);

  b2 = createButton("Create random number");
  b2.position(10, 523);
  b2.mousePressed(createRanNum);

  p3 = createP("0");
  p3.style("background-color", color(0,255,0))
  p3.style("padding", "5px")
  p3.position(170,505)
}


function createRanNum(){
  let ran = floor(random(-10,10));
  p3.html(ran)
}


function changeCanvasColor(){
  let r1 = floor(random(0,255));
  let r2 = floor(random(0,255));
  let r3 = floor(random(0,255));
  canvasBg = color(r1,r2,r3);
}


function setOutput(){
  if(keyCode === 13){
    output.html(txtInput.value());
  }
}


function draw(){
  //clear(); //makes background transparent
  background(canvasBg);
  fill(255);
  ellipse(100,50,slider.value());
}
