var x = 10;
var y = 10;
var w = 10;
var h = 30;

//A SevenSegment has 7 segments.
//The segments are stored in a list
class SevenSegment {
  constructor() {
    this.listOfSeqs = [];
    for (var i = 0; i < 7; i++) {
      this.listOfSeqs.push(new Segment(i));
    }
  }

  //returns the list of segments
  getListOfSeqs() {
    return this.listOfSeqs;
  }
}
