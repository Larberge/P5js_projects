var board;
var canvasSize;
var canvas;
var header;


function setup(){
  canvasSize = windowWidth / 2.5;
  canvas = createCanvas(canvasSize, canvasSize);
  canvas.position(windowWidth/2 - canvasSize/2, windowHeight/2 - canvasSize/2)
  canvas.style("padding","15px");


  header = select('#headline');
  header.position(windowWidth/2 - header.width/2,0);


  board = new Board();
}

function draw(){
  board.show();
  updateAllHTMLelementsPosition();
}


function updateAllHTMLelementsPosition(){
  canvas.position(windowWidth/2 - canvasSize/2, windowHeight/2 - canvasSize/2)
  header.position(windowWidth/2 - header.width/2,0);

}
