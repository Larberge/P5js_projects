var cover;
var container;
var timer;
var interval;
var timeInSec = 3600;
var startSound;
var halfWaySound;
var finishedSound;
var airHorn;

function preload() {
  startSound = loadSound("./sounds/readyToRuble.mp3");
  halfWaySound = loadSound("./sounds/airhornwreckingballclip.mp3");
  finishedSound = loadSound("./sounds/congratulations.mp3");
  airHorn = loadSound("./sounds/airHorn_1.mp3");
}

function setup() {
  cover = select("#cover");
  cover.mousePressed(function() {
    click();
  });
  container = select("#cnt");
  timer = select("#timer");
  timer.html(formatTime(timeInSec));
}

function incrementTimer() {
  timeInSec--;
  timer.html(formatTime(timeInSec));
  changeBC();
  if (timeInSec == 0) {
    finishedSound.play();
    clearInterval(interval);
    cover.html("K.O!");
    cover.addClass("visible");
  }
  if (timeInSec % 60 == 0) {
    airHorn.play();
    cover.addClass("shake");
    setTimeout(removeCover, 2000);
  }
  if (timeInSec == 1800) {
    halfWaySound.play();
  }
}

function formatTime(sec) {
  let m = floor(sec / 60);
  let s = sec % 60;
  return nf(m, 2) + ":" + nf(s, 2);
}

function changeBC() {
  let r = random(20, 240);
  let g = random(20, 240);
  let b = random(20, 240);
  let col = color(r, g, b);
  container.style("background-color", col);
}

function click() {
  interval = setInterval(incrementTimer, 1000);
  startSound.play();
  cover.removeClass("visible");
  cover.html("SHOTS!!");
}

function removeCover() {
  cover.removeClass("shake");
}
