var cnv;
var numbers = [];
var numbersCount = 100;
let arrayLength;

function setup() {
  cnv = createCanvas(windowWidth*0.98, windowHeight*0.8);
  cnv.position(windowWidth/2 - width/2, windowHeight/2 - height/2);
  background(153);
  for(let i = 0; i < numbersCount; i++){
    let num = {
      height: int(random(height*0.2,height*0.8)),
      color: color("#eeeeee")
    }
    numbers.push(num);
  }
  arrayLength = numbers.length;
  frameRate(10);
}


//The draw runs in a loop, once per frame.
//uses the draw-function as the while- and the for-loop in bubble sort.
//It functions as the for loop by incrementing i for each iteration and reseting when end of arrat is reached

let i = 0
function draw(){
  background(153);
  stroke(53);

  if(numbers[i].height > numbers[i+1].height){
    numbers[i].color = "#2222ee";
    let temp = numbers[i];
    numbers[i] = numbers[i+1];
    numbers[i+1] = temp;
    console.log("SWAP!");
  }else{
    numbers[i+1].color = "#2222ee";
    numbers[i].color = "#eeeeee";
  }

  for(let num of numbers){
    fill(num.color);
    rect(numbers.indexOf(num) * width/numbersCount, height-num.height, width/numbersCount, num.height);
  }
  
  i++;
  if(i == arrayLength-1){
    numbers[i].color = "#2222ee";
    i = 0;
    arrayLength--;
  }

  if(arrayLength == 1){
    console.log("DONE!");
    for(let num of numbers){
      num.color = "#22ee22";
      fill(num.color);
      rect(numbers.indexOf(num) * width/numbersCount, height-num.height, width/numbersCount, num.height);
    }
    noLoop();
  }

}


//The bubblesort algorithm
// function bubbleSort(arrayOfNumbes){
//   let arrayLength = arrayOfNumbes.length;
//   let swapped = true;
//   while(swapped){
//     swapped = false;
//     for(let i = 0; i < arrayLength - 1; i++){
//       if(arrayOfNumbes[i] > arrayOfNumbes[i+1]){
//         let temp = arrayOfNumbes[i];
//         arrayOfNumbes[i] = arrayOfNumbes[i+1];
//         arrayOfNumbes[i+1] = temp;
//         swapped = true;
//       }
//     }
//   }
// }


function windowResized() {
  resizeCanvas(windowWidth*0.8, windowHeight*0.8)
}