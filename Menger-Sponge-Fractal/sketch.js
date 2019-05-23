var a = 1;
var b;
var sponge = [];

function setup() {
  let cnv = createCanvas(400, 400, WEBGL);
  let can_x = (windowWidth - width) / 2;
  var can_y = (windowHeight - height) / 2;
  cnv.position(can_x, can_y);
  b = new Box(0, 0, 0, 200);
  sponge.push(b);
}

function draw() {
  background(51);

  rotateX(a);
  rotateY(a * 0.4);
  rotateZ(a * 0.1);
  for (var i = 0; i < sponge.length; i++) {
    sponge[i].show();
  }
  a += 0.01;
}

function mousePressed() {
  var next = [];
  for (var i = 0; i < sponge.length; i++) {
    var b = sponge[i];
    var newBoxes = b.generate();
    next = next.concat(newBoxes);
  }
  sponge = next;
}
