var canvas;
var board;
var pretxt;
var txt;

function preload() {
  pretxt = loadStrings("hard.txt");
}

function setup(){
  canvas = createCanvas(400,400);
  canvas.position(windowWidth/2 - width/2, windowHeight/2 - height/2);
  board = new Board(pretxt);

}

let count = 0
function draw(){
  canvas.position(windowWidth/2 - width/2, windowHeight/2 - height/2);
  board.solve();
  if(board.isFinished()){
    noLoop();
  }

  //just for debug
      // if(count == 20){
      //   for(let array of board.boxes){
      //     for(let box of array){
      //       if(box.number == 0){
      //         console.log(box.options);
      //       }
      //     }
      //   }
      //   noLoop();
      // }

  board.show();
  count++;
}
