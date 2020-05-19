let cnv;
let create_btn;

let car;
let track;
let create_track_mode = false;

let points = [];

function setup() {
  //Creating and positioning the canvas
  let cnv = createCanvas(windowWidth*0.98, windowHeight*0.8);
  cnv.position(windowWidth/2 - width/2, windowHeight/2 - height/2);

  create_btn = createButton('Create track');
  create_btn.position(
    windowWidth - windowWidth*0.99, 
    windowHeight - windowHeight*0.9 - ( windowHeight * (create_btn.height / windowHeight)
  ));

  set_inner_btn = createButton('Set as inner');
  set_inner_btn.position(
    windowWidth - windowWidth*0.99 + create_btn.width, 
    windowHeight - windowHeight*0.9 - ( windowHeight * (create_btn.height / windowHeight)
  ));
  set_inner_btn.style("display", "none");

  set_outer_btn = createButton('Set as outer');
  set_outer_btn.position(
    windowWidth - windowWidth*0.99 + create_btn.width + set_inner_btn.width, 
    windowHeight - windowHeight*0.9 - ( windowHeight * (create_btn.height / windowHeight)
  ));
  set_outer_btn.style("display", "none");

  reset = createButton('Reset');
  reset.position(
    windowWidth - windowWidth*0.99 + create_btn.width + set_inner_btn.width + set_outer_btn.width, 
    windowHeight - windowHeight*0.9 - ( windowHeight * (create_btn.height / windowHeight)
  ));
  reset.style("display", "none");

  create_btn.mousePressed(function (){
    create_track_mode = !create_track_mode;
    if(create_track_mode){
      create_btn.elt.innerText = "Go back";
      set_inner_btn.style("display", "block");
      set_outer_btn.style("display", "block");
      reset.style("display", "block");
    }else{
      create_btn.elt.innerText = "Create track";
      set_outer_btn.style("display", "none");
      set_inner_btn.style("display", "none");
    }
  });
  
  
  car = new Car();
  track = new Track();
  car.doTrack(track);
}

function draw() {
  background(51);
  
  if(create_track_mode){

    fill(244);
    ellipse(width/2, height/2, 50, 50);

    beginShape()
    noFill()
    for(let p of points){
      (p.x, p.y);
    }
    endShape(CLOSE);

  }else{

    car.move();
    car.show();
    track.show();

  }
}

function mousePressed(){
  if(create_track_mode){
    let point = {
      x: mouseX,
      y: mouseY
    }
    points.push(point);
  }
}

