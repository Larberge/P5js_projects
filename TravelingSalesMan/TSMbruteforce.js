var dots = [];
numberOfDots = 7;
var bestDist;
var bestPath;

function setup() {
  createCanvas(400, 400);
  for (var i = 0; i < numberOfDots; i++) {
    let v = createVector(random(width), random(height));
    dots.push(v);
  }
  bestDist = calcDist(dots);
  bestPath = dots.slice();
  console.log(bestDist);
}

function draw() {
  background(0);
  fill(255);
  for (var i = 0; i < numberOfDots; i++) {
    ellipse(dots[i].x, dots[i].y, 15, 15);
  }

  stroke(200);
  strokeWeight(1);
  noFill();
  beginShape();
  for (var i = 0; i < numberOfDots; i++) {
    vertex(dots[i].x, dots[i].y);
  }
  endShape();

  swap(dots, floor(random(numberOfDots)), floor(random(numberOfDots)));
  let d = calcDist(dots);
  if (d < bestDist) {
    bestDist = d;
    bestPath = dots.slice();
    console.log(bestDist);
  }

  stroke(255, 0, 255);
  strokeWeight(3);
  noFill();
  beginShape();
  for (var i = 0; i < numberOfDots; i++) {
    vertex(bestPath[i].x, bestPath[i].y);
  }
  endShape();
}

function swap(list, i, j) {
  let temp = list[i];
  list[i] = list[j];
  list[j] = temp;
}

function calcDist(listOfDots) {
  let sum = 0;
  for (var i = 0; i < numberOfDots - 1; i++) {
    let d = dist(
      listOfDots[i].x,
      listOfDots[i].y,
      listOfDots[i + 1].x,
      listOfDots[i + 1].y
    );
    sum += d;
  }
  return sum;
}
