class Edge {
    constructor(list_of_two_nodes, weight) {
        this.between_nodes = list_of_two_nodes;
        this.weight = weight;
        this.color = ('#ff00ffbb');
        this.original = true;
        this.visited = false;
    }

    show(){
        //line
        strokeWeight(5);
        stroke(this.color);
        line(this.between_nodes[0].x, this.between_nodes[0].y,
            this.between_nodes[1].x, this.between_nodes[1].y);
       
        //text
        fill(255);
        noStroke();
        textSize(16);
        text(this.weight, 
            (this.between_nodes[1].x + this.between_nodes[0].x)/2,
            (this.between_nodes[1].y + this.between_nodes[0].y)/2
            );
    }
}