var x = 10;
var y = 10;
var w = 10;
var h = 30;

class SevenSegment{
  constructor(){
    this.listOfSeqs = [];
    for(var i = 0; i < 7; i++){
      this.listOfSeqs.push(new Segment(i));
    }
  }

  getListOfSeqs(){
    return this.listOfSeqs;
  }

}
