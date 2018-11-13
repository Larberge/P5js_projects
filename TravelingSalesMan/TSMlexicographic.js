var dots = [];
var order = [];
var numberOfDots = 7;
//if numberOfDots is greater than 12, numberOfSolutions must
//be larg int.
var numberOfSolutions;
var bestDist;
var bestOrder;
var count;


function setup(){
  createCanvas(400,400);
  for(var i = 0; i < numberOfDots; i++){
    let v = createVector(random(width), random(height));
    dots.push(v);
    order[i] = i;
  }
  count = 0;
  numberOfSolutions = fac(numberOfDots);
  bestDist = calcDist(dots, order);
  bestPath = order.slice();
}

function draw(){
  drawDots()
  drawPathBeeingEvaluated();

  let d = calcDist(dots, order);
  if(d<bestDist){
    bestDist = d;
    bestPath = order.slice();
    console.log(bestDist);
  }

  drawBestPath();
  swap();
  drawPrecent();
}


function calcDist(listOfDots, order){
  let sum = 0;
  for(var i = 0; i < numberOfDots-1; i++){
    let d = dist(listOfDots[order[i]].x,   listOfDots[order[i]].y,
                 listOfDots[order[i+1]].x, listOfDots[order[i+1]].y
               );
    sum += d;
  }
  return sum;
}

//sawpping lexicographicly
function swap(){
  //Step 1: Find the largest x such that P[x]<P[x+1].
  var x = -1;
  for(var i = 0; i < order.length-1; i++){
    if(order[i] < order[i+1]){
      x = i;
    }
  }
  if(x == -1){
    noLoop();
    console.log("Done!");
  }
  //Step 2: Find the largest y such that P[x] < P[y]
  var y = -1;
  for(var i = 0; i < order.length; i++){
    if(order[x] < order[i]){
      y = i;
    }
  }

  //Step 3: Swap P[x] and P[y]
  let temp = order[x];
  order[x] = order[y];
  order[y] = temp;

  //Step 4: Reverse P[x+1, n]
  let endList = order.splice(x+1);
  endList.reverse();
  order = order.concat(endList);
  count++;
}

function fac(n){
    return(n<2)?1:fac(n-1)*n;
}

function drawPathBeeingEvaluated(){
  stroke(200);
  strokeWeight(1);
  noFill();
  beginShape();
  for(var i = 0; i < numberOfDots; i++){
    vertex(dots[order[i]].x,dots[order[i]].y);
  }
  endShape();
}

function drawDots(){
  background(0);
  fill(255)
  for(var i = 0; i < numberOfDots; i++){
    ellipse(dots[i].x,dots[i].y, 15,15);
  }
}

function drawBestPath(){
  stroke(255,0,255);
  strokeWeight(3);
  noFill();
  beginShape();
  for(var i = 0; i < numberOfDots; i++){
    vertex(dots[bestPath[i]].x, dots[bestPath[i]].y);
  }
  endShape();
}

function drawPrecent(){
  textSize(16);
  let percent = 100*(count/numberOfSolutions);
  text(nf(percent,0,5) +"%", 10, height-10);
}
