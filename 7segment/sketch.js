//a variable ment to hold a SevenSegment-object
var SevSeq;

//A list og list.
//The inner list refers to number in hex.
//The first one is zero (every segment is 1 exept the one in
//the midle which is off.)
var digits = [
  [1, 1, 1, 1, 1, 1, 0],
  [0, 1, 1, 0, 0, 0, 0],
  [1, 1, 0, 1, 1, 0, 1],
  [1, 1, 1, 1, 0, 0, 1],
  [0, 1, 1, 0, 0, 1, 1],
  [1, 0, 1, 1, 0, 1, 1],
  [1, 0, 1, 1, 1, 1, 1],
  [1, 1, 1, 0, 0, 0, 0],
  [1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 0, 1, 1],
  [1, 1, 1, 0, 1, 1, 1],
  [0, 0, 1, 1, 1, 1, 1],
  [1, 0, 0, 1, 1, 1, 0],
  [0, 1, 1, 1, 1, 0, 1],
  [1, 0, 0, 1, 1, 1, 1],
  [1, 0, 0, 0, 1, 1, 1]
];

//Setting up the sketch with a canvas and creating a
//SevenSegments object.
//Reducing the framerate to 3 so the animation is slower.
function setup() {
  var cnv = createCanvas(800, 450);
  let can_x = (windowWidth - width) / 2;
  var can_y = (windowHeight - height) / 2;
  cnv.position(can_x, can_y);
  SevSeq = new SevenSegment();
  frameRate(3);
}

//The drawing-loop
//Sets "seg" to one of the lists in digits according to
//the index whitch allways is 0-16.
//Sets the background of the cancas to black.
//then looping through the list and turning on/off th
//segments in the global SevenSegment-object.
var i = 0;
function draw() {
  let index = i % 16;
  let list = digits[index];
  background(0);
  for (var j = 0; j < list.length; j++) {
    if (list[j] == 1) {
      SevSeq.getListOfSeqs()[j].turnOn();
    } else {
      SevSeq.getListOfSeqs()[j].turnOff();
    }
  }
  i++;
}
