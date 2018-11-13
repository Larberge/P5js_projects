var game1;


function setup(){
  createCanvas(800,400);
  game1 = new PongGame();
}

function draw(){
  //frameRate(20);
  background(0);
  game1.ply();


}
