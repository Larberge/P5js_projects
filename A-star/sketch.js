var cols; //antall kolonner
var rows; //antall rader
var grid = new Array(); //array of arrays(rader med colonner)
var openSet = []; //vil inneholde alle spots som skal evalueres
var closedSet = []; //vil inneholde alle spots som har blitt evaluert
var start; //settes lik startspot
var end; //settes lik stopSpot
var w, h;
var world = "board-2-3.txt";
var pretxt;
var txt = [];
var path = []; //Vil inneholde spotsene som medgår i den raskeste pathen

//Henter inn textdocumentet før selve programmet kjører
function preload() {
  pretxt = loadStrings(world);
}

//Setup. Lager en liste med liste av textdokumentet. Lager canvas.
//justerer rows og cols ut i fra antall elementer i textArryen.
//Justerer w og h, høyde og brekke på hver rute(spot).
//Lager banen(grid)
function setup() {
  for (var i = 0; i < pretxt.length; i++) {
    txt.push(pretxt[i].split(""));
  }
  var cnv = createCanvas(800, 450);
  let can_x = (windowWidth - width) / 2;
  var can_y = (windowHeight - height) / 2;
  cnv.position(can_x, can_y);

  rows = txt[1].length;
  cols = txt.length;
  w = width / rows;
  h = height / cols;
  makeNewGrid(); //Lager banen fra text
  openSet.push(start); //legger til startspoten som første til å bli evaluert
}

//Draw tilsvarer while-loopen i A* algoritmen.
function draw() {
  //Looper gjennom openset slik at current spot (spoten som skal evalueres)
  //hele tiden er den antatt beste spotten.
  if (openSet.length > 0) {
    var winner = 0;
    for (var i = 0; i < openSet.length; i++) {
      if (openSet[i].f < openSet[winner].f) {
        //.g for dikstra, .f for A*
        winner = i; //
      }
    }
    var current = openSet[winner]; //openSet[winner] for A* openSet[0] for BFS

    //Hvis curret er lik end, har vi funnet en path og kan stoppe.
    //Lager en path ved at spotsene har lagret en previous spot.
    if (current === end) {
      var temp = current;
      path.push(temp);
      while (temp.previous) {
        path.push(temp.previous);
        temp = temp.previous;
      }
      console.log("DONE!");
      noLoop();
    }

    //Fjerner curret fra Opensett da den skal til å evalueres og trener ikke
    //evaluers igjen. Legges derfor til i closedSet.
    removeFromArray(openSet, current);
    closedSet.push(current);

    //Looper gjennom current sine naboer som ikke har blitt sett på og som ikke
    //er hindringer, og oppdaterer g-verdien til disse (avstanden fra start).
    var neighbors = current.neighbors;
    for (var i = 0; i < neighbors.length; i++) {
      var neighbor = neighbors[i];
      if (!closedSet.includes(neighbor) && !(neighbor instanceof blockSpot)) {
        var tempG = current.g + neighbor.cost; //plusser på det det koster å "gå" igjennom denne spotten
        if (openSet.includes(neighbor)) {
          if (tempG < neighbor.g) {
            neighbor.g = tempG;
          }
        } else {
          neighbor.g = tempG;
          openSet.push(neighbor); //legger til nabo til opensett, slik at
        } // dens naboer kan evalueres senere.
        neighbor.h = heuristic(neighbor, end);
        neighbor.f = neighbor.g + neighbor.h;
        neighbor.previous = current;
      }
    }
  } else {
    Console.log("No solution..");
    noLoop();
  }

  //Loop for å vise hver spot
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j].show(w, h);
    }
  }

  //loop for å sette fargen på spotsene som har blitt besøkt
  for (var i = 0; i < closedSet.length; i++) {
    closedSet[i].setCross(w, h, "[]");
    //closedSet[i].setColor(color(255,0,0,50));
  }

  //loop for å sette farge på spotsene som er i opensett, som skal evalueres.
  for (var i = 0; i < openSet.length; i++) {
    openSet[i].setCross(w, h, "o");
    //openSet[i].setColor(color(0,255,0,50));
  }

  //Loop for å sette farge på pathen som den finner som best.
  for (var i = 1; i < path.length - 1; i++) {
    path[i].setCross(w, h, "x");
    path[i].setColor(color(255, 255, 0));
  }
}

//For å kalkulere h, antatt avstand fra a til b, hvor b er mål.
function heuristic(a, b) {
  var d = dist(a.x, a.y, b.x, b.y);
  //var d = abs(a.x-b.x) + abs(a.y-b.y);
  return d;
}

//for å fjerne et element fra liste. .remove kan medføre feil.. derfor
//loopes det baklengs og bruker splice.
function removeFromArray(arr, elt) {
  for (var i = arr.length - 1; i >= 0; i--) {
    if (arr[i] === elt) {
      arr.splice(i, 1);
    }
  }
}

//Funksjon for å lage mapet.
function makeNewGrid() {
  //Lager først en tom liste mend cols antall tomme lister med rows tomme plasser.
  for (var i = 0; i < cols; i++) {
    grid[i] = new Array(rows);
  }

  //Looper gjennom textArryet som er laget fra txtfilen, og fyller grid med spot
  //objekter.
  for (var i = 0; i < grid.length; i++) {
    for (var j = 0; j < grid[i].length; j++) {
      switch (txt[i][j]) {
        case ".":
          grid[i][j] = new Spot(i, j);
          break;
        case "#":
          grid[i][j] = new blockSpot(i, j);
          break;
        case "A":
          grid[i][j] = new startSpot(i, j);
          start = grid[i][j];
          break;
        case "B":
          grid[i][j] = new stopSpot(i, j);
          end = grid[i][j];
          break;
        case "m":
          grid[i][j] = new mountainSpot(i, j);
          break;
        case "f":
          grid[i][j] = new forestSpot(i, j);
          break;
        case "w":
          grid[i][j] = new waterSpot(i, j);
          break;
        case "g":
          grid[i][j] = new grassSpot(i, j);
          break;
        case "r":
          grid[i][j] = new roadSpot(i, j);
          break;
      }
    }
  }

  //Hver spot får lagt til naboer.
  for (var i = 0; i < grid.length; i++) {
    for (var j = 0; j < grid[i].length; j++) {
      grid[i][j].addNeighBors(grid);
    }
  }
}
