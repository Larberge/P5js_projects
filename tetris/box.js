class Box{
    constructor(x, y, color){
        this.w = width/10;
        this.h = height/20;
        this.x = x;
        this.y = y;
        this.color = color;
    }


    show(){
        fill(this.color);
        strokeWeight(2);
        stroke(255)
        rect(this.x, this.y, this.w, this.h);
    }

    canFall(){
        return this.y < height-this.h;
    }

    fall(){
        this.y += this.h;
    }

}