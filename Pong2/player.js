
class Player{
  constructor(type,dna){
    this.w = 20;
    this.h = 100;
    this.y = height/2 - this.h/2;
    this.speed = 5;
    if(type == 1){
      this.x = 0;
    }else if(type == 2){
        this.x =width - this.w;
        if(dna){
          this.dna = dna.copy();
          this.dna.mutate(mutate);
        }else{this.dna =  new NeuralNetwork(4, 8, 2);}
    }
    this.type = type;
    this.buff = true;
    this.score = 0;
    this.alive = true;
    this.score = 0;
    this.fitness = 0;

  }
  show(){
    fill(255);
    stroke(0,255,0);
    strokeWeight(2);
    if(!this.alive){fill(100,0,0,10); noStroke();}
    rect(this.x, this.y, this.w,this.h);
    if(this.alive){
      this.score++;
    }

  }

  think(ball) {
    if (ball != null) {
      // Create the inputs to the neural network
      let inputs = [];
      // x position of the ball
      inputs[0] = map(ball.pos.x, ball.d/2, width-ball.d/2, 0, 1);
      // angle of the ball
      inputs[1] = map(ball.angle, 0, 2*PI, 0, 1);
      // y position of the ball
      inputs[2] = map(ball.pos.y, 0, height, 0, 1);
      // this players y position
      inputs[3] = map(this.y+this.h/2, this.h/2, height-this.h/2, 0, 1);
      // the balls speed
      let action = this.dna.predict(inputs);
      // Decide to jump or not!
      if (action[1] < action[0] && abs(action[1]-action[2]) < 0.3 ){
        //stand still
      }else if(action[1] < action[0]){
        this.update('up');
      }else{
        this.update('down')
      }
    }
  }

  moveUp(){
    this.y -= this.speed;
  }
  moveDown(){
    this.y += this.speed
  }

  update(key){
    if(key == 'up'){
      if(this.y == 0){
        this.y = 0;
      }else {
        this.moveUp();
      }
    }else if(key == "down"){
      if(this.y == height-this.h){
        this.y = height-this.h;
      }else {
        this.moveDown();
      }
    }
  }

  willHit(ball){
    if(ball.pos.y >= this.y && ball.pos.y <= (this.y+this.h)){
      return true;
    }
    return false;
  }

  didHit(ball){
    if(this.type == 2 && this.alive){
      if(ball.pos.x+ball.d/2 >= width-this.w){
        if(!this.willHit(ball)){
          this.alive = false;
        }
      }
    }
  }

  copy() {
    return new Player(2,this.dna);
  }


  hitBall(ball){
    if( (ball.pos.x-ball.d/2 <= this.w || ball.pos.x+ball.d/2 >= width-this.w) && this.buff && this.alive) {
      if(this.type == 2 && this.willHit(ball)){
        if(ball.angle >= PI/2 && ball.angle <= PI){
          ball.angle = 2*PI - ball.angle;
        }
        if(ball.angle >= 0 && ball.angle < PI/2){
          ball.angle = 2*PI - ball.angle;
        }
        this.buff = false;

      }else if(this.type == 1){// && this.willHit(ball)){
        if(ball.angle >= (PI + PI/2) && ball.angle <= 2*PI){
          ball.angle = 2*PI - ball.angle;
        }
        if(ball.angle >= PI && ball.angle <= (PI+PI/2)){
          ball.angle = 2*PI - ball.angle;
        }
      }
    }
    if( (ball.pos.x-ball.d/2) > this.w  && (ball.pos.x+ball.d/2) < width-this.w){
      this.buff = true;
    }
  }

  restart(){
    this.y = height/2 - this.h/2;
  }


}


function mutate(x) {
  if (random(1) < 0.1) {
    let offset = randomGaussian() * 0.5;
    let newx = x + offset;
    return newx;
  } else {
    return x;
  }
}
