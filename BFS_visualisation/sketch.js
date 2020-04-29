var canvas;
var graph;
var numOfNodes = 10;
var numOfEdges = 8;
var edges = [0, 1, 0, 2, 1, 3, 1, 4, 2, 5, 2, 6, 3, 7, 3, 8, 4, 9];
var openList = [];
var closedList = [];

function setup() {
  canvas = createCanvas(300, 500);
  canvas.position(windowWidth / 2 - width / 2, 30);
  graph = new Graph(numOfNodes, numOfEdges, edges);
  background(0, 200);
  openList.push(graph.nodes[0]);
}

function draw() {
  if (openList.length == 0) {
    noLoop();
  }
  frameRate(1);
  graph.show();
  let node = openList[0];
  node.color = 0;
  console.log(node);
  let arr = node.neighbours.filter(function(n) {
    return !closedList.includes(n);
  });
  openList = openList.concat(arr);
  closedList.push(node);
  openList.splice(0, 1);
  openList.forEach(n => (n.color = 100));
  node.color = 0;
}

function BFS(graph) {
  let closedList = [];
  let openList = [graph.nodes[0]];
  while (openList.length > 0) {
    console.log(openList);
    let node = openList[0];
    let arr = node.neighbours.filter(function(n) {
      return !closedList.includes(n);
    });
    openList = openList.concat(arr);
    closedList.push(node);
    openList.splice(0, 1);
  }
  return closedList;
}
