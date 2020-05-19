class TetrisObject {
    constructor() {
        this.isActive = false;
        this.boxes = [];
    }

    show(){
        for(let box of this.boxes){
            box.show();
        }
    }

    canFall(){
        for(let box of this.boxes){
            if(! box.canFall()){
                return false;
            }
        }
        return true;
    }

    fall(){
        if(this.canFall()){
            for(let box of this.boxes){
                box.fall()
            }
        }
    }
  }
  
class O_block extends TetrisObject {
    constructor() {
        super();
        this.name = 'O-block';

        for(let k = -2; k < 0; k++){
            for(let i = 4; i < 6; i++){
                this.boxes.push(new Box(i*width/10, k*height/20, "#fee23e"))
            }
        }
    }


    //this square tetris object actually dont need to be rotated since its shape stays the same.
    rotate(){
        this.boxes[0].x += this.boxes[0].w;
        this.boxes[1].y += this.boxes[1].h;
        this.boxes[2].y -= this.boxes[2].h;
        this.boxes[3].x -= this.boxes[3].w;
        this.boxes = [this.boxes[2], this.boxes[0], this.boxes[3], this.boxes[1]];


    }
}


class I_block extends TetrisObject {
    constructor() {
        super();
        this.name = 'O-block';
        this.isStaight = false;
        this.isUp = true;

        for(let k = 3; k < 7; k++){
            this.boxes.push(new Box(k*width/10, height/20, "#00ffef"))
            }
        }

    //this square tetris object actually dont need to be rotated since its shape stays the same.
    rotate(){
        if(this.canFall()){
            if (!this.isStaight && this.isUp){
                this.boxes[0].x += this.boxes[0].w;
                this.boxes[0].y -= this.boxes[0].h;
    
                this.boxes[2].x -= this.boxes[2].w;
                this.boxes[2].y += this.boxes[2].h;
    
                this.boxes[3].x -= 2*this.boxes[3].w;
                this.boxes[3].y += 2*this.boxes[3].h;
    
                this.isStaight = true;
                this.isUp = true;
    
            }else if(this.isStaight && this.isUp){
                this.boxes[0].x += this.boxes[0].w;
                this.boxes[0].y += this.boxes[0].h;
    
                this.boxes[2].x -= this.boxes[2].w;
                this.boxes[2].y -= this.boxes[2].h;
    
                this.boxes[3].x -= 2*this.boxes[3].w;
                this.boxes[3].y -= 2*this.boxes[3].h;
                
                this.isStaight = false;
                this.isUp = false;
    
            }else if(!this.isStaight && !this.isUp){
                this.boxes[0].x -= this.boxes[0].w;
                this.boxes[0].y += this.boxes[0].h;
    
                this.boxes[2].x += this.boxes[2].w;
                this.boxes[2].y -= this.boxes[2].h;
    
                this.boxes[3].x += 2*this.boxes[3].w;
                this.boxes[3].y -= 2*this.boxes[3].h;
    
                this.isStaight = true;
                this.isUp = false;
    
            }else{
                this.boxes[0].x -= this.boxes[0].w;
                this.boxes[0].y -= this.boxes[0].h;
    
                this.boxes[2].x += this.boxes[2].w;
                this.boxes[2].y += this.boxes[2].h;
    
                this.boxes[3].x += 2*this.boxes[3].w;
                this.boxes[3].y += 2*this.boxes[3].h;
    
                this.isStaight = false;
                this.isUp = true;
            }
        }
    }
}