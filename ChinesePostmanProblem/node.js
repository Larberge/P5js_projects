class Node {
    constructor(tag, order = 0, x_cor = random(width*0.2, width*0.8), y_cor = random(height*0.2, height*0.8)){
        this.tag = tag;
        this.neighbours = [];
        this.order = order;
        this.x = x_cor;
        this.y = y_cor;
        this.radius = 15;
    }

    show(){
        fill(0,230,0,230);
        circle(this.x, this.y, this.radius*2);
        textAlign(CENTER, CENTER);
        textSize(24);
        fill(255)
        noStroke()
        text(this.tag.toUpperCase(), this.x, this.y);
    }

    add_outbound_nodes(list_of_nodes){
        this.outbound_nodes = list_of_nodes;
    }
}