var container;
var info_container;
var canvas;
var canvasMargin;

var card_deck = [];

var angle;

function setup() {
  angle = 0;
  container = select("#cont");
  info_container = select("#info_cont");
  canvasMargin = container.width * 0.01;
  canvasSetup();

  let card = new Card(100, 100);
  card_deck.push(card);
  angleMode(DEGREES);
  rectMode(CENTER);
}

function draw() {
  push();
  translate(-width / 2, -height / 2);
  background(0, 100, 0, 100);
  fill(0, 200, 0, 100);
  rect(width / 7 / 2, height / 2, width / 7, height);
  rect(width - width / 7 / 2, height / 2, width / 7, height);
  pop();

  fill(255);
  line(0, -height / 2, 0, height / 2);
  card_deck.forEach(card => card.show());
}

function canvasSetup() {
  canvasMargin = container.width * 0.01;
  canvas = createCanvas(
    container.width - 2 * canvasMargin,
    container.height - info_container.height - 2 * canvasMargin,
    WEBGL
  );
  canvas.parent(container);
  canvas.position(
    container.position().x + canvasMargin,
    container.position().y + info_container.height + canvasMargin
  );
}

function windowResized() {
  canvas.height = container.width - 2 * canvasMargin;
  canvas.width = container.height - info_container.height - 2 * canvasMargin;
}

function mousePressed() {
  card_deck.forEach(card => card.mousePressed());
}
