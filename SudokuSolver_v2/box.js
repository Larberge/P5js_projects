class Box {
    constructor(x_pos, y_pos, width, num){
        this.x = x_pos;
        this.y = y_pos;
        this.grid_num;
        this.side_len = width;
        this.solved = true;
        this.options = [];
        this.color = "#0000ee22"
        this.num = parseInt(num);
        if(isNaN(this.num) || this.num == 0){
            this.num = 0;
            this.solved = false;
            this.color = "#ffffff"
            this.options = [1,2,3,4,5,6,7,8,9]
        }        
    }

    show(){
        strokeWeight(1);
        stroke(51);
        fill(this.color)
        rect(this.x, this.y, this.side_len, this.side_len);
        textAlign(CENTER, CENTER);
        textSize(32);
        fill(0)
        if(this.num == 0){
            text(" ", this.x - this.side_len/2, this. y);
        }else{
            text(this.num, this.x + this.side_len/2, this. y + this.side_len/2);
        }
    }

    calc_grid_num(x, y){
        if(x < 3){
            if(y < 3){
                return 0
            }else if(y < 6){
                return 3
            }else{
                return 6
            }
        }else if(x < 6){
            if(y < 3){
                return 1
            }else if(y < 6){
                return 4
            }else{
                return 7
            }
        }else{
            if(y < 3){
                return 2
            }else if(y < 6){
                return 5
            }else{
                return 8
            }
        }
    }

    set_grid_num(x, y) {
       this.grid_num = this.calc_grid_num(x, y); 
    }

    was_found(){
        // console.log("Number found!!")
        // console.log(this);
        this.num = this.options[0];
        this.options = [];
        this.solved = true;
        this.color = "#00FF00";
    }

    set_num(num){
        this.options = [num];
        this.was_found();
    }
}