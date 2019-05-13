//Rutene i banen er objekter (spots). Spot er en vanlig rute (også superklassen),
//mens blockspot er et hinder. StartSpot og Stopspot er vanlige ruter, men
//med henholdsvis rød og grønn bakgrunn.
//Det er også flere spots som f.eks waterspot og forestspot
//som er lik de andre bare med mer "motstand". Det koster mer å gå gjennom
//spots med større motstand.

class Spot {
  constructor(i, j) {
    this.x = j; //x,y tilsvarer posisjonene
    this.y = i;
    this.f = 0; //f er summen av g oh h
    this.g = 0; //g er verdien fra start til denne spotten
    this.h = 0; //h er en antatte avstanden fra denne spotten til mål
    this.cost = 0; //hvor mye det "koster" å passere denne spotten
    this.neighbors = []; //liste med alle nabospots
    this.previous = undefined; //lagrer den beste forrige noden. Brukes når pathe skal visualiseres
  }

  //funksjon for å legge til naboene til et hvert spot.
  //if-setningene er for å sikre at det blir riktig for kanter- og hjørnespots
  addNeighBors(grid) {
    if (this.x < grid[0].length - 1) {
      this.neighbors.push(grid[this.y][this.x + 1]);
    }
    if (this.x > 0) {
      this.neighbors.push(grid[this.y][this.x - 1]);
    }
    if (this.y < grid.length - 1) {
      this.neighbors.push(grid[this.y + 1][this.x]);
    }
    if (this.y > 0) {
      this.neighbors.push(grid[this.y - 1][this.x]);
    }
  }

  //For å endre farge på spot, for å vise at det har blitt besøkt eller gjenstår
  //å evaluere
  setColor(clr) {
    fill(clr);
    stroke(0);
    rect(this.x * w, this.y * h, w - 1, h - 1);
  }

  setCross(w, h, string) {
    textSize(w);
    fill(0);
    text(string, this.x * w + w / 6, (this.y + 1) * h - h / 4);
  }

  //visningsfunksjon
  show(w, h) {
    fill(255);
    stroke(0);
    rect(this.x * w, this.y * h, w - 1, h - 1);
  }
}

//startspot, helt lik spot men med litt annen visningsfunksjon
class startSpot extends Spot {
  constructor(i, j) {
    super(i, j);
  }
  show(w, h) {
    fill(0, 255, 0);
    stroke(0);
    rect(this.x * w, this.y * h, w - 1, h - 1);
  }
}

//stopspot, helt lik spot men med litt annen visningsfunksjon
class stopSpot extends Spot {
  constructor(i, j) {
    super(i, j);
  }
  show(w, h) {
    fill(255, 0, 0);
    stroke(0);
    rect(this.x * w, this.y * h, w - 1, h - 1);
  }
}

//blockspot, helt lik spot men med litt annen visningsfunksjon
class blockSpot extends Spot {
  constructor(i, j) {
    super(i, j);
  }
  show(w, h) {
    fill(50, 50, 50);
    stroke(0);
    rect(this.x * w, this.y * h, w - 1, h - 1);
  }
}

class waterSpot extends Spot {
  constructor(i, j) {
    super(i, j);
    this.cost = 100;
  }
  show(w, h) {
    fill(77, 77, 255);
    stroke(0);
    rect(this.x * w, this.y * h, w - 1, h - 1);
  }
}

class mountainSpot extends Spot {
  constructor(i, j) {
    super(i, j);
    this.cost = 50;
  }
  show(w, h) {
    fill(166, 166, 166);
    stroke(0);
    rect(this.x * w, this.y * h, w - 1, h - 1);
  }
}

class forestSpot extends Spot {
  constructor(i, j) {
    super(i, j);
    this.cost = 10;
  }
  show(w, h) {
    fill(0, 128, 0);
    stroke(0);
    rect(this.x * w, this.y * h, w - 1, h - 1);
  }
}

class grassSpot extends Spot {
  constructor(i, j) {
    super(i, j);
    this.cost = 5;
  }
  show(w, h) {
    fill(128, 255, 128);
    stroke(0);
    rect(this.x * w, this.y * h, w - 1, h - 1);
  }
}

class roadSpot extends Spot {
  constructor(i, j) {
    super(i, j);
    this.cost = 1;
  }
  show(w, h) {
    fill(191, 128, 64);
    stroke(0);
    rect(this.x * w, this.y * h, w - 1, h - 1);
  }
}
