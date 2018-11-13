class Board{
  constructor(filename, boxes = null){
    if(boxes == null){ this.boxes = this.makebordFromFile(filename);}
    else{ this.boxes = boxes; }
    this.adjustBoxOptions();
  }

  makebordFromFile(preboard){
    let result = [];
    let preBoard = []
    let pretxt = preboard;
    for(let i = 0; i < pretxt.length; i++){
      preBoard.push(pretxt[i].split(""));
    }
    let x = 0;
    let y = 0;
    for(let j = 0; j < preBoard.length; j++){
      let subResult = [];
      for(let k = 0; k < preBoard[j].length; k++){
        let box = new Box(preBoard[j][k], x, y);
        box.setGridNum(j,k);
        x += width/9
        subResult.push(box);
      }
      x = 0;
      y += height/9;
      result.push(subResult);
    }
    for(let j = 0; j < result.length; j++){
      for(let k = 0; k < result[j].length; k++){
        result[j][k].setBC(j,k);
        result[j][k].setOptions();
      }
    }
    return result;
  }


  adjustBoxOptions(){
    for(let i = 0; i<this.boxes.length; i++){
      let rowNums = this.getNumbersInRow(i);
      for(let j = 0; j < this.boxes[i].length; j++){
        let colNums = this.getNumbersInCol(j);
        let gridNums = this.getNumbersInGrid(i,j);
        let neightBours = concat(rowNums, colNums);
        neightBours = concat(neightBours, gridNums);
        this.boxes[i][j].adjustOptios(neightBours);
      }
    }
  }

  solve(){

  }

  getNumbersInRow(rowNum){ //rowNum from 0-8;
    let result = [];
    for(let box of this.boxes[rowNum]){
      result.push(box.number);
    }
    return result;
  }

  getNumbersInCol(colNum){
    let result = [];
    for(let i = 0; i< this.boxes.length; i++){
      result.push(this.boxes[i][colNum].number);
    }
    return result;
  }

  getNumbersInGrid(gridNum){
    let result = [];
    for(let array of this.boxes){
      for(let box of array){
        if(box.gridNum == gridNum){
        result.push(box.number);
        }
      }
    }
    return result;
  }



  show(){
    for(let j = 0; j < this.boxes.length; j++){
      for(let k = 0; k < this.boxes[j].length; k++){
        this.boxes[j][k].show();
      }
    }
  }
}



class Box{
  constructor(integer, x, y){
    this.bc = null; //backgroundColor
    this.x = x;
    this.y = y;
    this.w = width/9 -1;
    this.h = height/9 -1;
    this.number = integer;
    this.options = [];
    this.gridNum = null;
  }


  setBC(i, j){ //set the backgroundColor
    if( ( i <= 2 && (j<=2 || j>=6)) ||
        ( j>2 && j < 6 && i>2 && i<6) ||
        ( i >5 && (j<=2 || j>=6))   ){
      this.bc = color(240);
    }
    else{
      this.bc = color(150); }
  }

  setOptions(){
    if(this.number == 0){ this.options = [1,2,3,4,5,6,7,8,9]; }
  }


  show(){
    let offSetW = (width/16) /2;
    let offSetH = (height/16) / 2;
    fill(this.bc);
    rect(this.x,this.y, this.w, this.h);
    fill(0);
    textSize(22);
    if(this.number == 0){
      text("", this.x +offSetW, this.y + offSetH, this.w, this.h);
    }
    else{
      text(this.number, this.x +offSetW, this.y + offSetH, this.w, this.h);
    }
  }

  setGridNum(j, k){
    if( j <= 2 && k <= 2){this.gridNum = 0;}
    if( j <= 2 && k <= 5 && this.gridNum == null){this.gridNum = 1;}
    if( j <= 2 && k <= 8 && this.gridNum == null){this.gridNum = 2;}
    if( j <= 5 && k <= 2 && this.gridNum == null){this.gridNum = 3;}
    if( j <= 5 && k <= 5 && this.gridNum == null){this.gridNum = 4;}
    if( j <= 5 && k <= 8 && this.gridNum == null){this.gridNum = 5;}
    if( j <= 8 && k <= 2 && this.gridNum == null){this.gridNum = 6;}
    if( j <= 8 && k <= 5 && this.gridNum == null){this.gridNum = 7;}
    if( j <= 8 && k <= 8 && this.gridNum == null){this.gridNum = 8;}
  }

  adjustOptios(listOfAllNeighbours){
    if(this.number == 0){
      let result = this.options.filter(num => ! listOfAllNeighbours.map(Number).includes(num));
      this.options = result;
      // if(this.options.length == 1){
      //   this.number = this.options[0];
      // }
    }

  }

}
