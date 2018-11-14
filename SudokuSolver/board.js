class Board{
  constructor(filename, boxes = null){
    if(boxes == null){ this.boxes = this.makebordFromFile(filename);}
    else{ this.boxes = boxes; }
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
    let returnVal = false;
    for(let i = 0; i<this.boxes.length; i++){
      for(let j = 0; j < this.boxes[i].length; j++){
        let gridNum = this.boxes[i][j].gridNum;
        let neightBours = this.getAllNeightBours(i,j, gridNum);
        let val = this.boxes[i][j].adjustOptios(neightBours);
        if(val){
          returnVal = val;
        }
      }
    }
    return returnVal;
  }

  getAllNeightBours(i,j, gridNum){
    let result = this.getNumbersInRow(i);
    result = concat(result, this.getNumbersInCol(j));
    result = concat(result, this.getNumbersInGrid(gridNum));
    return result;

  }



  solve(){
    let stillEasyOnceToFind = this.adjustBoxOptions(); //false if no more easy once to find
    if(! stillEasyOnceToFind){
      this.solveRows();
      this.solveCols();
      //this.solveGrids();


    }
  }

  solveRows(){
    for(let i = 0; i < this.boxes.length; i++){
      let rowNums = this.getNumbersInRow(i);
      for(let n = 1; n < 10; n++){
        if(! rowNums.includes(n)){
          let count = 0;
          let boxesToHoldN = [];
          for(let j = 0; j < this.boxes[i].length; j++){
            if(this.boxes[i][j].options.includes(n)){
              count++;
              boxesToHoldN.push([i,j]);
            }
          }
          if(boxesToHoldN.length == 1){
            let i = boxesToHoldN[0][0];
            let j = boxesToHoldN[0][1];
            this.boxes[i][j].number = n;
            this.boxes[i][j].options = [];
            this.adjustBoxOptions();
          }
        }
      }
    }
  }

  solveCols(){
    for(let i = 0; i < this.boxes.length; i++){
      let colNums = this.getNumbersInCol(i);
      for(let n = 1; n < 10; n++){
        if(! colNums.includes(n)){
          let count = 0;
          let boxesToHoldN = [];
          for(let j = 0; j < this.boxes.length; j++){
            if(this.boxes[j][i].options.includes(n)){
              count++;
              boxesToHoldN.push([i,j]);
            }
          }
          if(boxesToHoldN.length == 1){
            let i = boxesToHoldN[0][0];
            let j = boxesToHoldN[0][1];
            this.boxes[i][j].number = n;
            this.boxes[i][j].options = [];
            this.adjustBoxOptions();
          }
        }
      }
    }
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

  isFinished(){
    for(let array of this.boxes){
      for(let box of array){
        if(box.number == 0){
          return false
        }
      }
    }
    return true;
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
    let returnVal = false;
    if(this.number == 0){
      let result = this.options.filter(num => ! listOfAllNeighbours.map(Number).includes(num));
      if(this.options.toString() != result.toString()){
        this.options = result;

        returnVal = true;
      }
      //console.log(this.options);
      if(this.options.length == 1){
        this.bc = color(0,255,0,100);
        this.number = this.options[0];
      }
    }
    //console.log(returnVal, "<---");
    return returnVal;

  }

}
