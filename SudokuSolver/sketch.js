var canvas;
var board;



function setup(){
  canvas = createCanvas(400,400);
  canvas.position(windowWidth/2 - width/2, windowHeight/2 - height/2);
  board = new Board("../easy.txt");
}

function draw(){
  background(0);

}
