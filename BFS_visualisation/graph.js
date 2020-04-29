class Graph {
  constructor(n, e, nodePairs) {
    this.numOfNodes = n;
    this.numOfEdges = e;
    this.nodePairs = nodePairs;
    this.nodes = [];
    this.createNodes();
  }

  createNodes() {
    for (let i = 0; i < this.numOfNodes; i++) {
      let node = new Node(i, random(50, 250), height / 2 - 200);
      this.nodes.push(node);
    }
    for (let k = 0; k < this.nodePairs.length; k += 2) {
      let edge = new Edge(
        this.nodes[this.nodePairs[k]],
        this.nodes[this.nodePairs[k + 1]]
      );
      this.nodes[this.nodePairs[k]].edges.push(edge);
    }
    for (let j = 0; j < this.nodes.length; j++) {
      for (let h = 0; h < this.nodes[j].edges.length; h++) {
        this.nodes[j].neighbours.push(this.nodes[j].edges[h].stopNode);
      }
    }
    console.log(this.nodes[1]);

    this.positionNodes();
  }

  show() {
    for (let i = 0; i < this.nodes.length; i++) {
      this.nodes[i].show();
    }
  }

  positionNodes() {
    let x = width / 2;
    let y = height / 2 - 200;
    for (let i = 0; i < this.nodes.length; i++) {
      switch (i) {
        case 0:
          this.nodes[i].x = x;
          this.nodes[i].y = y;
          break;
        case 1:
          this.nodes[i].x = x / 2;
          this.nodes[i].y = y + 50;
          break;
        case 2:
          this.nodes[i].x = x + x / 2;
          this.nodes[i].y = y + 50;
          break;
        case 3:
          this.nodes[i].x = x - x / 2 + x / 4;
          this.nodes[i].y = y + 150;
          break;
        case 4:
          this.nodes[i].x = x - x / 2 - x / 4;
          this.nodes[i].y = y + 175;
          break;
        case 5:
          this.nodes[i].x = x + x / 2 + x / 4;
          this.nodes[i].y = y + 120;
          break;
        case 6:
          this.nodes[i].x = x + x / 2 - x / 4;
          this.nodes[i].y = y + 200;
          break;
        case 7:
          this.nodes[i].x = x - x / 2 + x / 4 - x / 8;
          this.nodes[i].y = y + 300;
          break;
        case 8:
          this.nodes[i].x = x - x / 2 + x / 4 + x / 8;
          this.nodes[i].y = y + 350;
          break;
        case 9:
          this.nodes[i].x = x - x / 2 - x / 4;
          this.nodes[i].y = y + 350;
          break;
        case 10:
          break;
      }
    }
  }
}

class Node {
  constructor(tag, x = 0, y = 0) {
    this.tag = tag;
    this.x = x;
    this.y = y;
    this.r = 40;
    this.color = 220;
    this.edges = [];
    this.neighbours = [];
  }

  show() {
    fill(this.color);
    ellipse(this.x, this.y, this.r);
    for (let edge of this.edges) {
      edge.show();
    }
  }
}

class Edge {
  constructor(startNode, stopNode) {
    this.startNode = startNode;
    this.stopNode = stopNode;
    this.color = 255;
  }

  show() {
    fill(this.color);
    stroke(255);
    strokeWeight(2);
    line(this.startNode.x, this.startNode.y, this.stopNode.x, this.stopNode.y);
  }
}
