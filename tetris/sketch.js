let cnv;

let tetrisObjects = [] //list of object to come
let activeTetrisObject; //The current falling tetris object
let fallenTetrisObjects = [];
let boxSize;

function setup() {
  cnv = createCanvas(400, 800);
  cnv.position(windowWidth/2 - width/2, (windowHeight - height)/2);
  background(51);
  boxSize = width / 10;


  let O = new O_block();
  let I = new I_block();
  tetrisObjects.push(I);

  frameRate(1);

}

function draw() {
  background(51);
  for(let to of tetrisObjects){
    to.show();
    to.fall();
    to.rotate();
  }
}