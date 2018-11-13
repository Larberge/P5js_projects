var SevSeq;
var digits =[[1,1,1,1,1,1,0],
            [0,1,1,0,0,0,0],
            [1,1,0,1,1,0,1],
            [1,1,1,1,0,0,1],
            [0,1,1,0,0,1,1],
            [1,0,1,1,0,1,1],
            [1,0,1,1,1,1,1],
            [1,1,1,0,0,0,0],
            [1,1,1,1,1,1,1],
            [1,1,1,1,0,1,1],
            [1,1,1,0,1,1,1],
            [0,0,1,1,1,1,1],
            [1,0,0,1,1,1,0],
            [0,1,1,1,1,0,1],
            [1,0,0,1,1,1,1],
            [1,0,0,0,1,1,1]];

function setup(){
  createCanvas(400,400);
  SevSeq = new SevenSegment();
  frameRate(3);
}

var i = 0;
function draw(){
  list = digits[i%16]
  background(0);
  for(var j = 0; j<list.length; j++){
    if(list[j] == 1){
      SevSeq.getListOfSeqs()[j].turnOn();
    }
    else{
      SevSeq.getListOfSeqs()[j].turnOff();
    }
  }
  i++;
}
