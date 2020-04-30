let all_x_values = [];
let all_y_values = [];

//y = Ax + B
let a;
let b;

//Learning rate and optimizer
const lr = 0.5;
const optimizer = tf.train.sgd(lr);

function setup() {
  cnv = createCanvas(windowWidth*0.98, windowHeight*0.8);
  cnv.position(windowWidth/2 - width/2, windowHeight/2 - height/2);
  a = tf.variable(tf.scalar(random(1)));
  b = tf.variable(tf.scalar(random(1)));
}

function draw() {

  //tf.tidy() for memory management
  tf.tidy( () => {
    if(all_x_values.length > 0){
      optimizer.minimize( () => loss(predict(all_x_values), tf.tensor1d(all_y_values))); //, true, [a, b]);
    }
  })
  
  background(153);
  stroke(0,0,255,100);
  strokeWeight(8);
  for (let i = 0; i < all_y_values.length; i++){
    const pt_x = map(all_x_values[i], 0, 1, 0, width);
    const pt_y = map(all_y_values[i], 0, 1, height, 0);
    point(pt_x, pt_y);
  }
  
  let xs = [0, 1]
  let y_tensors = tf.tidy( () => predict(xs));
  let ys = y_tensors.dataSync();
  y_tensors.dispose();

  let x1 = map(xs[0], 0, 1, 0, width);
  let x2 = map(xs[1], 0, 1, 0, width);
  let y1 = map(ys[0], 0, 1, height, 0);
  let y2 = map(ys[1],0, 1, height, 0);

  stroke(255)
  strokeWeight(2);
  line(x1, y1, x2, y2);

  console.log(tf.memory().numTensors);
  
}

//The pred agrument are the y-values from the predecit function
//The labels are the acctual y-values
//pred and labels has to be tensors
function loss(pred, labels){
  return pred.sub(labels).square().mean();
}

function predict(x_values){
  const x_tensors = tf.tensor1d(x_values);
  const y_tensors = x_tensors.mul(a).add(b);
  return y_tensors;
}

function mousePressed(){
  const x = map(mouseX, 0, width, 0, 1);
  const y = map(mouseY, 0, height, 1, 0);
  all_x_values.push(x);
  all_y_values.push(y);
}