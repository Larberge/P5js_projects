
class Ball{
  constructor(){
    this.d = 25;
    this.pos = createVector(width/2,height/2);
    this.speed = 5;
    let r1 = random(PI/4, 3*PI/4);
    let r2 = random(5*PI/4,7*PI/4);
    if(random(1)<0.5){this.angle = r1;}
    else{this.angle = r2;}
    this.buff = true;
  }

  show(){
    fill(255);
    stroke(255,0,0);
    strokeWeight(2);
    ellipse(this.pos.x,this.pos.y,this.d);
  }

  isOut(){
    if(this.pos.x > width+this.d || this.pos.x < -this.d){
      return true;
    }
    return false;
  }

  restart(){
    this.pos = createVector(width/2,height/2);
    let r1 = random(PI/4, 3*PI/4);
    let r2 = random(5*PI/4,7*PI/4);
    if(random(1)<0.5){this.angle = r1;}
    else{this.angle = r2;}
    this.speed = 5;
  }

  update(){
    this.pos.x += Math.sin(this.angle)*this.speed;
    this.pos.y += Math.cos(this.angle)*this.speed;
    if(this.pos.y <= this.d/2 && this.buff) {
      if(this.angle >= PI/2 && this.angle < PI){
        this.angle = PI - this.angle;
      }
      if(this.angle >= PI && this.angle < (PI+PI/2)){
        this.angle = 2*PI-(this.angle-PI);
      }
      this.buff = false;
    }
    else if(this.pos.y >= height-this.d/2 && this.buff){
      if(this.angle>= (PI+PI/2) && this.angle<2*PI){
        this.angle = 3*PI - this.angle;
      }
      if(this.angle >= 0 && this.angle < PI/2){
        this.angle = PI-this.angle;
      }
      this.buff = false;
    }
    if(this.pos.y > 0 && this.pos.y < height){
      this.buff = true;
    }
  }


}
