class PongGame{
  constructor(){
    this.player1 = new Player(1);
    this.player2s = []; //new Player(2);
    this.deadPlayer2s = [];
    for(let i = 0; i < 100; i++){
      this.player2s.push(new Player(2));
    }
    this.ball = new Ball();
  }

  ply(){
    this.ball.show();
    this.ball.update();
    this.player1.show();
    this.player1.hitBall(this.ball);
    this.player1.didHit(this.ball);
    for(let i = this.player2s.length-1; i>= 0; i--){
      this.player2s[i].show();
      this.player2s[i].hitBall(this.ball);
      this.player2s[i].didHit(this.ball);
      if(!this.player2s[i].alive && !this.deadPlayer2s.includes(this.player2s[i])){
        this.deadPlayer2s.push(this.player2s[i]);
      }
      if(this.deadPlayer2s.length == this.player2s.length){
        this.nextGen();
        this.restart();


      }
    }
    this.movePlayers();
    //this.updateScore();

    if(frameCount % 100){
      this.ball.speed += 0.005;
    }

    this.drawMidLine();
    // if(this.ball.isOut()){
    //   this.restart();
    // }
  }

  updateScore(){
    fill(0, 102, 153);
    textSize(32);
    text(this.player1.score, 10, 40);
    text(this.player2.score, width-32, 40);
  }

  restart(){
    this.ball.restart();
    this.player1.restart();
    for(let p2 of this.player2s){
      p2.restart();
    }
  }

  movePlayers(){
    for(let p2 of this.player2s){
      p2.think(this.ball);
    }
    // if(keyIsDown(UP_ARROW)){
    //   this.player2.update("up");
    // }
    // if(keyIsDown(DOWN_ARROW)){
    //   this.player2.update("down");
    // }
    if(keyIsDown(87)){
      this.player1.update("up");
    }
    if(keyIsDown(83)){
      this.player1.update("down");
    }
  }

  drawMidLine(){
    let y1 = 0;
    for(let i = 0; i < height/10; i++){
      if(i%2==0){
        stroke(255);
        line(width/2,y1,width/2,y1+40)
        y1+=80;
      }
    }
  }



//ga functions:
  nextGen(){
    this.calcFitness();
    let newP2s = this.generateNewP2s(this.deadPlayer2s);
    this.player2s = newP2s.slice();
    this.deadPlayer2s = [];
  }


  calcFitness(){
    for (let i = 0; i < this.deadPlayer2s.length; i++) {
      this.deadPlayer2s[i].score = pow(this.deadPlayer2s[i].score, 2);
    }
    let sum = 0;
    for (let i = 0; i < this.deadPlayer2s.length; i++) {
      sum += this.deadPlayer2s[i].score;
    }
    // Divide by the sum
    for (let i = 0; i < this.deadPlayer2s.length; i++) {
      this.deadPlayer2s[i].fitness = this.deadPlayer2s[i].score / sum;
    }
  }

  generateNewP2s(){
    let newP2s = [];
    for (let i = 0; i < this.player2s.length; i++) {
      // Select a bird based on fitness
      let p2 = this.poolSelection(this.deadPlayer2s);
      newP2s[i] = p2;
    }
    return newP2s;
  }

  poolSelection(deadP2s) {
    // Start at 0
    let index = 0;
    // Pick a random number between 0 and 1
    let r = random(1);
    // Keep subtracting probabilities until you get less than zero
    // Higher probabilities will be more likely to be fixed since they will
    // subtract a larger number towards zero
    while (r > 0) {
      r -= deadP2s[index].fitness;
      // And move on to the next
      index += 1;
    }
    // Go back one
    index -= 1;
    // Make sure it's a copy!
    // (this includes mutation)
    return deadP2s[index].copy();
  }


}
