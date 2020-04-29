class Graph{
    constructor(txt_file, node_txt_file){
        this.nodes = [];
        this.edges = [];
        this.odd_ordered_nodes = [];
        this.combinations_of_odd_pairs = [];
        this.best_combinations_of_odd_pairs = [];
        this.best_way = {path: [], score: Infinity};
        this.sum_of_all_edges = 0;
        this.setup(txt_file, node_txt_file);
    }

    show(){
        for(let edge of this.edges){
            edge.show();
        }
        for(let node of this.nodes){
            node.show();
        }
        
    }

    //Sets up neightbours for each node
    setup(txt_file, node_txt_file){
        //creating the graph from the txt file
        let used_node_tags = [];
        for(let edge_string of txt_file){
            let edge_as_list = edge_string.split(" ");
            let alpha;
            let beta;
            if(used_node_tags.includes(edge_as_list[0])){
                alpha = this.nodes.filter(n => n.tag == edge_as_list[0])[0];
                alpha.order += 1;
            }else{
                alpha = new Node(edge_as_list[0], 1);
                this.nodes.push(alpha);
                used_node_tags.push(edge_as_list[0]);
            }
            if(used_node_tags.includes(edge_as_list[1])){
                beta = this.nodes.filter(n => n.tag == edge_as_list[1])[0];
                beta.order += 1;
            }else{
                beta = new Node(edge_as_list[1], 1);
                this.nodes.push(beta);
                used_node_tags.push(edge_as_list[1]);
            }
            let alpha_beta_edge = new Edge([alpha, beta], parseFloat(edge_as_list[2]));
            this.edges.push(alpha_beta_edge);
        }

        // Setting the coords of each node
        for(let node_string of node_txt_file){
            let node_data = node_string.split(" ");
            let node = this.get_node_by_tag(node_data[0]);
            node.x = parseFloat(node_data[1]);
            node.y = parseFloat(node_data[2]);
        }

        //Setting each node neighbours
        for(let node of this.nodes){
            let neighbours = [];
            for(let edge of this.edges){
                if(edge.between_nodes.includes(node)){
                    let index =  edge.between_nodes.indexOf(node);
                    if(index == 1){
                        neighbours.push(edge.between_nodes[0]);
                    }else{
                        neighbours.push(edge.between_nodes[1]);  
                    }
                }
            }
            node.neighbours = neighbours;
        }

        //Getting the nodes of odd order
        for(let node of this.nodes){
            if(node.order % 2 != 0){
                this.odd_ordered_nodes.push(node);
            }
        }

        // Combination of splitting nodes into pairs: n!/(2^(n/2)*(n/2)!)
        // Getting all the combinations of pairs of odd nodes
        for (let i = 0; i < this.odd_ordered_nodes.length - 1; i++) {
            for (let j = i + 1; j < this.odd_ordered_nodes.length; j++) {
                let odd_combo = {
                    start: this.odd_ordered_nodes[i],
                    end: this.odd_ordered_nodes[j],
                    best_way: this.find_best_path(this.odd_ordered_nodes[i], this.odd_ordered_nodes[j])[1]
                }
                this.combinations_of_odd_pairs.push(odd_combo);
                this.best_way = {path: [], score: Infinity} //Resetting
            }
        }

        //Sorting combinations
        this.combinations_of_odd_pairs.sort((a, b) => (a.best_way.score > b.best_way.score) ? 1 : -1);
        
        //picking best pairs of odd nodes
        let used_nodes = []
        // first make sure the nodes of order 1 is included.
        for(let combo of this.combinations_of_odd_pairs){
            if( (combo.start.order == 1 || combo.end.order == 1) && combo.best_way.path.length == 2){
                this.best_combinations_of_odd_pairs.push(combo);
                used_nodes.push(combo.start, combo.end);
            }
        }
        //then complete rest
        for(let combo of this.combinations_of_odd_pairs){
            if(!(used_nodes.includes(combo.start) || used_nodes.includes(combo.end))){
                this.best_combinations_of_odd_pairs.push(combo);
                used_nodes.push(combo.start, combo.end);
            }
        }

        //add new edges based on best combinations to create an eulerian graph.
        for(let combo of this.best_combinations_of_odd_pairs){
            for(let i = 0; i < combo.best_way.path.length - 1; i++){
                let node_one = combo.best_way.path[i];
                let node_two = combo.best_way.path[i+1]
                let new_edge = new Edge([node_one, node_two], this.weight_between_nodes(node_one, node_two));
                new_edge.color = "#ffff00aa";
                new_edge.original = false;
                this.edges.push(new_edge);
            }
        }

        //Calculates the total weight of all edges
        for(let edge of this.edges){
            this.sum_of_all_edges += edge.weight;
        }
    }

    //Returning the node with matching tag
    get_node_by_tag(tag){
        for(let node of this.nodes){
            if(node.tag == tag){
                return node;
            }
        }
    }

    weight_between_nodes(node_a, node_b){
        for(let edge of this.edges){
            if(edge.between_nodes.includes(node_a) && edge.between_nodes.includes(node_b)){
                return edge.weight;
            }
        }
    }

    //finds the best path between two nodes
    find_best_path(start_node, goal_node, pre_nodes = []){
        let come_form = pre_nodes;
        let score = Infinity;
        come_form.push(start_node);
        let index = come_form.indexOf(start_node);
        for(let node of start_node.neighbours){
            come_form.splice(index+1, Infinity);
            if(!come_form.includes(node)){
                let new_score;
                if(node == goal_node){
                    new_score = this.weight_between_nodes(start_node, goal_node);
                    let path_score = 0;
                    let path_to_evaluate = come_form.slice();
                    path_to_evaluate.push(goal_node);
                    for(let i = 0; i < path_to_evaluate.length - 1; i++){
                        path_score += this.weight_between_nodes(path_to_evaluate[i], path_to_evaluate[i+1]);
                    }
                    if(path_score < this.best_way.score){
                        this.best_way.score = path_score;
                        this.best_way.path = path_to_evaluate.slice();
                    }
                }else{
                    new_score = this.weight_between_nodes(start_node, node) + this.find_best_path(node, goal_node, come_form)[0];
                }
                score = (new_score < score ? new_score : score);
            }
        }
        return [score, this.best_way];
    }

    //returns the total score of a path between two nodes
    score_of_path(refrence_node, path_of_nodes){
        let result = 0;
        for(let i = 0; i < path_of_nodes.length - 1; i++){
            result += (i == 0) ? this.weight_between_nodes(refrence_node, path_of_nodes[0]) : this.weight_between_nodes(path_of_nodes[i], path_of_nodes[i+1]);
        }
        return result;
    }

    //resets the edges to not visited
    reset_edges(){
        for(let edge of this.edges){
            edge.visited = false;
        }
    }

    //the graph must be eulerian to use this
    shortest_path(tag){
        let refrence_node = this.nodes.filter(n => n.tag == tag)[0]
        let best_result;
        let result = [refrence_node];
        let cur_node = refrence_node;
        for(let i = 0; i < 1000; i++){
            while(true){
                let possible_ways_to_go = this.edges.filter(edge => edge.between_nodes.includes(cur_node) && !edge.visited);
                if(possible_ways_to_go.length == 0 & this.edges.filter(edge => !edge.visited).length == 0){
                    if( !best_result || this.score_of_path(refrence_node, result) < this.score_of_path(refrence_node, best_result)){
                        best_result = result;
                    }
                    break;
                }else if(possible_ways_to_go.length == 0){
                    this.reset_edges();
                    result = [refrence_node];
                    cur_node = refrence_node;
                }else{
                    let choosen_edge = random(possible_ways_to_go);
                    choosen_edge.visited = true;
                    cur_node = choosen_edge.between_nodes.filter(node => node!= cur_node)[0];
                    result.push(cur_node);
                }
            }
            this.reset_edges();
            result = [refrence_node];
            cur_node = refrence_node;
        }
        console.log("Sum of best path: ", this.score_of_path(refrence_node, best_result));
        return best_result;
    }
}