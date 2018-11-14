var c = 0;
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
        let box = new Box(parseInt(preBoard[j][k]), x, y);
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
          // j = 1000;
          // i = 0;
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
    this.adjustBoxOptions();
    this.solveGrids();
    this.solveRows();
    this.solveCols();
    c++;
    // if(c == 10){
    //   noLoop();
    // }
  }

  solveGrids(){
    for(let gridNum = 0; gridNum < 9; gridNum++){
      let boxesInGrid = this.getBoxesInGrid(gridNum);
      let numbersInGrid = this.getNumbersInGrid(gridNum);
      for(let n = 1; n < 10; n++){
        let boxesThatCanHoldN = [];
        if(! numbersInGrid.includes(n)){
          for(let box of boxesInGrid){
            if(box.options.includes(n)){
              boxesThatCanHoldN.push(box);
            }
          }
        }

        if(boxesThatCanHoldN.length == 1){
          boxesThatCanHoldN[0].number = n;
          boxesThatCanHoldN[0].options = [];
          boxesThatCanHoldN[0].bc = color(255,255,0,100); //yellow
        }
      }
    this.adjustBoxOptions();
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
            this.boxes[i][j].bc = color(0,255,255,100); //tercoise
          }
        }
      }
      this.adjustBoxOptions();
    }
  }

  solveCols(){
    let oneToNine = [1,2,3,4,5,6,7,8,9];
    for(let colNum = 0; colNum < this.boxes[0].length; colNum++){
      let numbersInCol = this.getNumbersInCol(colNum);
      let boxesInCol = this.getBoxesInCol(colNum);
      if(numbersInCol.length < 9){
        let numbersToCheck = oneToNine.filter(num => ! numbersInCol.includes(num));
        for(let n of numbersToCheck){
          let boxesThatCanHoldN = [];
          for(let box of boxesInCol){
            if(box.options.includes(n)){
              boxesThatCanHoldN.push(box);
            }
          }
          if(boxesThatCanHoldN.length == 1){
            boxesThatCanHoldN[0].number = n;
            boxesThatCanHoldN[0].options = [];
            boxesThatCanHoldN[0].bc = color(0,0,255,100);
          }
        }
      }
      this.adjustBoxOptions();
    }
  }

  getBoxesInCol(colNum){
    let result = [];
    for(let row of this.boxes){
      result.push(row[colNum]);
    }
    return result;
  }

  getBoxesInRow(rowNum){
    return this.boxes[rowNum];
  }

  getBoxesInGrid(gridNum){
    let iMax = null; let iMin = null;
    let jMax = null; let jMin = null;
    switch (gridNum) {
      case 0: iMin = 0; iMax = 2; jMin = 0; jMax = 2; break;
      case 1: iMin = 0; iMax = 2; jMin = 3; jMax = 5; break;
      case 2: iMin = 0; iMax = 2; jMin = 6; jMax = 8; break;
      case 3: iMin = 3; iMax = 5; jMin = 0; jMax = 2; break;
      case 4: iMin = 3; iMax = 5; jMin = 3; jMax = 5; break;
      case 5: iMin = 3; iMax = 5; jMin = 6; jMax = 8; break;
      case 6: iMin = 6; iMax = 8; jMin = 0; jMax = 2; break;
      case 7: iMin = 6; iMax = 8; jMin = 3; jMax = 5; break;
      case 8: iMin = 6; iMax = 8; jMin = 6; jMax = 8; break;
    }
    let result = [];
    for(let i = iMin; i <= iMax; i++){
      for(let j = jMin; j <= jMax; j++){
        result.push(this.boxes[i][j]);
      }
    }
    return result;
  }

  getNumbersInRow(rowNum){ //rowNum from 0-8;
    let result = [];
    for(let box of this.boxes[rowNum]){
      result.push(box.number);
    }
    result = result.filter(num => num != 0 );
    return result;
  }

  getNumbersInCol(colNum){
    let result = [];
    for(let i = 0; i< this.boxes.length; i++){
      result.push(this.boxes[i][colNum].number);
    }
    result = result.filter(num => num != 0 );
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
    result = result.filter(num => num != 0 );
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
    this.number = integer; //must be integer, not stringrepresentation
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

  setOptions(){ //only used to initialize!!!
    if(this.number == 0){ this.options = [1,2,3,4,5,6,7,8,9]; }
  }


  show(){
    let offSetW = (width/16) /2;
    let offSetH = (height/16) / 2;
    fill(this.bc);
    rect(this.x,this.y, this.w, this.h);
    fill(0);
    textSize(22);
    if(this.number != 0){
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
      let result = this.options.filter(num => ! listOfAllNeighbours.includes(num));
      if(this.options.toString() != result.toString()){
        this.options = result;
        returnVal = true;
      }
      if(this.options.length == 1){
        this.bc = color(0,255,0,100);
        this.number = this.options[0];
        this.options = [];
      }
    }
    return returnVal;

  }

}
