let graph_as_txt;
let graph;
let node_to_move = null;
let combinations_of_odd_pairs = [];
let best_combinations = [];

function preload(){
  graph_as_txt = loadStrings("nøtterøy/graph.txt");
  node_coords_txt = loadStrings("nøtterøy/node_coords.txt");
}


function setup(){
  //Creating and positioning the canvas
  let cnv = createCanvas(windowWidth * 0.98, windowHeight * 0.8);
  cnv.position((windowWidth - width) / 2, (windowHeight - height) / 2);

  //creating the graph
  graph = new Graph(graph_as_txt, node_coords_txt);
  console.log("Sum all edges: ", graph.sum_of_all_edges);

  //Find a path in the now eulerian graph that covers all edges in shortest possible way.
  let shortest_path = graph.shortest_path("a").map(node => node.tag);
  console.log(shortest_path);
}

function draw(){
  background(51);
  graph.show();

  if(node_to_move){
    node_to_move.x = mouseX;
    node_to_move.y = mouseY;
    console.log(node_to_move.x, node_to_move.y);
  }
}

function mousePressed(){
  let node = move_node();
  if(node){
    node_to_move = node;
  }
}


function move_node() {
  //check if mouse is over node
  for(let node of graph.nodes){
    if(dist(node.x, node.y, mouseX, mouseY) < node.radius){
      return node;
    }
  }
  return null;
}

function mouseReleased(){
  node_to_move = null;
}



