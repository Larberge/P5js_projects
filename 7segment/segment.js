var yRel = 50;
var hRel = 120;
var wRel = 15;
var xRel = 200 - hRel /2;

class Segment {
  constructor(type) {
    this.type = type;
    switch(type){
      case 0: this.x = xRel; this.y = yRel; this.w = hRel; this.h = wRel; break;
      case 1: this.x = xRel+hRel; this.y = yRel+wRel; this.w = wRel; this.h = hRel; break;
      case 2: this.x = xRel+hRel; this.y = yRel+2*wRel+hRel; this.w = wRel; this.h = hRel; break;
      case 3: this.x = xRel; this.y = yRel+wRel*2+2*hRel; this.w = hRel; this.h = wRel; break;
      case 4: this.x = xRel-wRel; this.y = yRel+2*wRel+hRel; this.w = wRel; this.h = hRel; break;
      case 5: this.x = xRel-wRel; this.y = yRel+wRel; this.w = wRel; this.h = hRel; break;
      case 6: this.x = xRel; this.y = yRel+wRel+hRel; this.w = hRel; this.h = wRel; break;
    }
  }

  turnOn(){
    fill(255,0,0);
    stroke(0,255,0);
    strokeWeight(1);
    rect(this.x,this.y,this.w,this.h);
  }

  turnOff(){
    fill(50,0,0);
    stroke(0,50,0);
    strokeWeight(1);
    rect(this.x,this.y,this.w,this.h);
  }

}
