
class Rute{
  constructor(x,y,w,h){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.c = color(255);
  }
  setBC(col){
    this.c = col
  }
  show(){
    fill(this.c);
    rect(this.x,this.y,this.w,this.h);
  }

}

class Board{
  constructor(){
    this.rutes = this.makeBoard();
  }

  makeBoard(){
    let result = []
    let x = 0;
    let y = 0;
    let bc_1 = color(200);
    let bc_2 = color(50);
    let w = floor(width/8) -1;
    let h = floor(height/8) -1;

    for(let i = 0; i < 8; i++){
      for(let j = 0; j < 8; j++){
        var r = new Rute(x,y,w,h)
        if(i%2 == j%2){
          r.setBC(bc_1);
        }
        else{
          r.setBC(bc_2);
        }
        result.push(r);
        x += w;
      }
      y += h;
      x = 0;
    }
    return result
  }

  show(){
    for(let i = 0; i < this.rutes.length; i++){
      //console.log(this.rutes[i]);
      this.rutes[i].show();
    }
  }


}
