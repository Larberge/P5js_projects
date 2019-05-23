var zoomLvl = 1;
var globalCenterX = 0;
var globalCenterY = 0;
var startTimeLine = false;

//the map API
var curl =
  "https://api.mapbox.com/styles/v1/mapbox/dark-v9/static/0,0," +
  zoomLvl +
  "," +
  globalCenterX +
  "," +
  globalCenterY +
  "/1024x512?access_token=pk.eyJ1IjoibGFyYmVyZ2UiLCJhIjoiY2puOHdhNmNiMGw1ZjNxcGl6OTZ2YWI0NCJ9.aRKhEujkGrhTXAQ0lDlLBA";
var mapImage;
var earthquakes;
var xPos;
var limA = 1000;
var limB = 2000;
var eqs = [];
var firstDate; // = eqs[eqs.length-1][3];
var lastDate; //= eqs[0][3];
var dateNum;
var date;

//loading image and earthquake data
function preload() {
  mapImage = loadImage(curl);
  earthquakes = loadStrings(
    "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.csv"
  );
}

function setup() {
  createCanvas(1024, 512);
  let cx = mercX(globalCenterX); //centerpoint of the map
  let cy = mercY(globalCenterY);
  for (var i = 1; i < earthquakes.length; i++) {
    let earthquakeData = earthquakes[i].split(/,/);
    let x = mercX(toRad(earthquakeData[2])) - cx;
    let y = mercY(toRad(earthquakeData[1])) - cy;
    let mag = earthquakeData[4];
    let magMax = sqrt(pow(10, 10));
    mag = sqrt(pow(10, mag));
    let d = map(mag, 0, magMax, 0, 1000);
    let timeStr = earthquakeData[0].split("T")[0].replace(/-/g, "/");
    let date = new Date(timeStr);
    eqs.push([x, y, d, date]);
  }
  firstDate = eqs[eqs.length - 1][3];
  lastDate = eqs[0][3];
  dateNum = eqs.length - 1;
  date = eqs[eqs.length - 1][3];

  translate(width / 2, height / 2);
  imageMode(CENTER);
  image(mapImage, globalCenterX, globalCenterY);
  xPos = -width / 2 + 20;
  //drawing the earthquakes with diameter relative to magnitude.
  for (var i = 0; i < eqs.length; i++) {
    fill(0, 255, 100, 200);
    stroke(0, 255, 100, 200);
    ellipse(eqs[i][0], eqs[i][1], eqs[i][2], eqs[i][2]);
  }
}

function keyPressed() {
  if (keyCode === ENTER) {
    startTimeLine = true;
  }
}

function draw() {
  keyPressed();
  drawTimeLine();
  if (startTimeLine) {
    translate(width / 2, height / 2);
    imageMode(CENTER);
    image(mapImage, globalCenterX, globalCenterY);
    drawTimeLine();
    let parLineLength = (width / 2 - 20 - (-width / 2 + 20)) / 30;
    let timeMillis = performance.now();
    if (timeMillis > limA && timeMillis < limB) {
      while (true) {
        if (eqs[dateNum][3] == date) {
          fill(0, 255, 100, 200);
          stroke(0, 255, 100, 200);
          ellipse(
            eqs[dateNum][0],
            eqs[dateNum][1],
            eqs[dateNum][2],
            eqs[dateNum][2]
          );
          dateNum -= 1;
        } else {
          date = eqs[dateNum][3];
          break;
        }
      }
      xPos += parLineLength;
      let temp = limB;
      limB += 1000;
      limA = temp;
    }
    if (xPos >= width / 2 - 30) {
      xPos = width / 2 - 30;
      startTimeLine = false;
    }
  }
}

//projection longitude to corresponding x-coordinate
function mercX(long) {
  let a = (256 / PI) * pow(2, zoomLvl);
  let b = long + PI;
  return a * b;
}

//projection latitude to corresponding y-coordinate
function mercY(lat) {
  let a = (256 / PI) * pow(2, zoomLvl);
  let b = tan(PI / 4 + lat / 2);
  let c = PI - log(b); //log is by default = ln
  return a * c;
}

//radians = degrees × π / 180°
function toRad(degrees) {
  return (degrees * Math.PI) / 180;
}

function drawTimeLine() {
  translate(width / 2, height / 2);
  let yPos = height / 2 + -30;
  strokeWeight(25);
  stroke(0, 0, 0, 200);
  line(-width / 2 + 20, height / 2 + -30, width / 2 - 20, height / 2 + -30);
  strokeWeight(10);
  stroke(200, 0, 50, 200);
  line(-width / 2 + 20, height / 2 + -30, width / 2 - 20, height / 2 + -30);
  noStroke();
  rect(xPos, yPos - 10, 10, 20);
}
