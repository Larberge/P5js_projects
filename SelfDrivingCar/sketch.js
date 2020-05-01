let car;
let track;


function setup() {
  //Creating and positioning the canvas
  let cnv = createCanvas(windowWidth*0.98, windowHeight*0.8);
  cnv.position(windowWidth/2 - width/2, windowHeight/2 - height/2);
  

  car = new Car();
  track = new Track();
  car.doTrack(track);
  
  
}

function draw() {
  background(51);
  // put drawing code here
}