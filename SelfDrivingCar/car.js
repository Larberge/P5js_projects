class Car{
    constructor(){
        this.w = 40;
        this.h = 22;
        this.pos = createVector(
            random(width / 4, width - width / 4),  //X
            random(height / 4, height - height / 4) //Y
            );
        this.dir = createVector();


    }


    doTrack(track){
        return;
    }


    show(){
        fill(255)
        rectMode(CENTER); // Set rectMode to CENTER
        rect(this.pos.x, this.pos.y, this.w, this.h);
    }


    move(){
        if (keyIsDown(LEFT_ARROW)) {
            this.dir.x -= 5;
        }
        if (keyIsDown(RIGHT_ARROW)) {
            this.dir.x += 5;
        }
        if (keyIsDown(UP_ARROW)) {
            this.dir.y -= 5;
        }
        if (keyIsDown(DOWN_ARROW)) {
            this.dir.y += 5;
        }
        this.pos.add(this.dir);
        this.dir = createVector();
    }




}