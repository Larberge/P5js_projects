class Card {
  constructor() {
    this.x = 500;
    this.y = 100;
    this.h = 150;
    this.w = 100;
    this.flipMe = false;
    this.isFlipped = false;
    this.angle = 0;
    this.img = loadImage("./imgs/2C.png");
  }

  show() {
    push();
    translate(-width / 2 + 75, -height / 2 + 100);
    if (this.flipMe && !this.isFlipped) {
      rotateY(this.angle);
      this.angle += 2;
      console.log(this.angle);
      if (this.angle % 180 == 0) {
        this.flipMe = false;
        // this.isFlipped = true;
      }
    }
    texture(this.img);
    rect(0, 0, this.w, this.h, 20);
    pop();
  }

  mousePressed() {
    console.log("hei");
    if (
      mouseX > this.x - this.w &&
      mouseX < this.x + this.w &&
      mouseY > this.y - this.h &&
      mouseY < this.y + this.h
    ) {
      this.flip();
      console.log("filp");
    }
  }

  flip() {
    this.flipMe = true;
  }
}
