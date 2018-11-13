var canvas;
var board;
var pretxt;
var txt;

function preload() {
  pretxt = loadStrings("easy.txt");
}

function setup(){
  canvas = createCanvas(400,400);
  canvas.position(windowWidth/2 - width/2, windowHeight/2 - height/2);
  board = new Board(pretxt);

}

function draw(){
  canvas.position(windowWidth/2 - width/2, windowHeight/2 - height/2);
  board.solve();
  if(board.isFinished()){
    noLoop();
  }
  board.show();
}
