var cnv;
var all_numbers = [];
var num_of_numbers = 100;
let ms_to_sleep = 100;

function setup() {
  cnv = createCanvas(windowWidth*0.98, windowHeight*0.8);
  cnv.position(windowWidth/2 - width/2, windowHeight/2 - height/2);
  background(153);
  for(let i = 0; i<num_of_numbers; i++){
    all_numbers.push(int(random(height*0.2,height*0.8)));
  }
  quickSort(all_numbers, 0, all_numbers.length -1);
}


//The draw runs in a loop, once per frame.
//This will be the loop in the quick-sort algorithm.
function draw(){
  background(153);
  stroke(53);
  fill(255);
  for(let i = 0; i<num_of_numbers; i++){
    rect(i * width/num_of_numbers, height-all_numbers[i], width/num_of_numbers, all_numbers[i]);
  }
}

// low  --> Starting index,  high  --> Ending index
async function quickSort(arr, low, high){
  if(low >= high) return;
  let index = await partition(arr, low, high);
  await Promise.all([quickSort(arr, low, index-1), quickSort(arr, index+1, high)]);
}


//the arr will be a array of objects
async function partition(arr, start, end){
  let pivot_index = start;
  let pivot_value = arr[start];
  for(let i = end; i > start; i--){
    //if smaller
    if(arr[i] < pivot_value){
      await swap(arr, i, start);
      pivot_index++;
      i++;
    }
    if(i == pivot_index){
      break;
    }
  }
  return pivot_index;
}

async function swap(arr, index, start){
  await sleep(ms_to_sleep);
  let value = arr.splice(index, 1)[0]
  arr.splice(start, 0, value);
}

function sleep(ms){
  return new Promise(resolve => setTimeout(resolve, ms));
}





function windowResized() {
  resizeCanvas(windowWidth*0.8, windowHeight*0.8)
}