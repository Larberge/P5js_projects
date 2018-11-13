var dots = [];
var order = [];
var numberOfDots = 11;
var popSize = 500;
var population = [];
var fitness = [];
var bestDist = Infinity;
var bestPath;
var bestOfCurrentPop;
var totalFitnessSum = 0;
var count = 0;

function setup(){
  createCanvas(400,400);
  createDots();
  createFirstPopulation();
}

function draw(){
  calcFitness();
  normalizeFitness();
  drawDots()
  drawPathBeeingEvaluated();
  drawBestPath();
  makeNewPopulation();
}

function createDots(){
  for(var i = 0; i < numberOfDots; i++){
    let v = createVector(random(width), random(height));
    dots.push(v);
    order[i] = i;
  }
}

function createFirstPopulation(){
  for(var j = 0; j < popSize; j++){
    population[j] = shuffle(order).slice();
  }
}

function calcDist(listOfDots, Order){
  let sum = 0;
  for(var i = 0; i < numberOfDots-1; i++){
    let d = dist(listOfDots[Order[i]].x,   listOfDots[Order[i]].y,
                 listOfDots[Order[i+1]].x, listOfDots[Order[i+1]].y
               );
    sum += d;
  }
  return sum;
}

function swap(list, indexA, indexB){
  let temp = list[indexA];
  list[indexA] = list[indexB];
  list[indexB] = temp;
}

function drawPathBeeingEvaluated(){
  stroke(200);
  strokeWeight(1);
  noFill();
  beginShape();
  for(var i = 0; i < numberOfDots; i++){
    vertex(dots[bestOfCurrentPop[i]].x, dots[bestOfCurrentPop[i]].y);
  }
  endShape();
}

function drawDots(){
  background(0);
  fill(255)
  for(var i = 0; i < numberOfDots; i++){
    ellipse(dots[i].x,dots[i].y, 15,15);
  }
}

function drawBestPath(){
  stroke(255,0,255);
  strokeWeight(3);
  noFill();
  beginShape();
  for(var i = 0; i < numberOfDots; i++){
    vertex(dots[bestPath[i]].x, dots[bestPath[i]].y);
  }
  endShape();
}

function calcFitness(){
  var bestDistOfThisPop = Infinity;
  for(var i = 0; i < popSize; i++){
    let d = calcDist(dots, population[i]);
    if(d<bestDist){
      bestDist = d;
      console.log(bestDist);
      bestPath = population[i];
    }
    if(d < bestDistOfThisPop){
      bestDistOfThisPop = d;
      bestOfCurrentPop = population[i];
    }
    fitness[i] = 1/(d);
    totalFitnessSum += fitness[i];
  }
}

function normalizeFitness(){
  for(var i = 0; i < fitness.length; i++){
    fitness[i] /= totalFitnessSum;
  }
}

function makeNewPopulation(){
  var newPopulation =[];
  for(var i = 0; i < popSize; i++){
    var popPart1 = pickOne(population, fitness);
    var popPart2 = pickOne(population, fitness);
    var popPart = crossOver(popPart1, popPart2);
    mutate(popPart);
    newPopulation[i] = popPart;
  }
  population = newPopulation;
}

function pickOne(list, prob){
  var index = 0;
  let r = random(1);
  while(r > 0){
    r -= prob[index];
    index++;
  }
  index--;
  if(index >= list.length){
    index = list.length-1;
  }
  return list[index].slice();
}

function mutate(list){
  let mutationRate = setMutationRate();
  var loopNum = list.length / 100 * mutationRate;
  if(loopNum < 2){loopNum = 2}; //Minimum two mutations
  for(var i = 0; i < loopNum; i++){
    var indexA = floor(random(list.length));
    var indexB = (indexA +1) % numberOfDots; //floor(random(list.length));
    swap(list, indexA, indexB);
  }
  count++;
}

function crossOver(listA, listB){
  let start = floor(random(listA.length));
  var newList = listA.slice(start);
  for(var i = 0; i < listB.length; i++){
    let dot = listB[i];
    if(!newList.includes(dot)){
      newList.push(dot);
    }
  }
  return newList;

}

function setMutationRate(){
  let mt = 10
  let totalNUm = fac(numberOfDots);
  let oneP = totalNUm/100 * 1;
  let twoP = totalNUm/100 * 2;
  let threeyP = totalNUm/100 * 3;
  let fourP = totalNUm/100 * 4;
  let fiveP = totalNUm/100 * 5;
  let sixP = totalNUm/100 * 6;

  if(count < oneP) {
    mt = 100;
  }
  else if(count >= oneP && count < twoP){
    mt = 90;
  }
  else if(count >= twoP && count < threeyP){
    mt = 75;
  }
  else if(count >= threeyP && count < fourP){
    mt = 50;
  }
  else if(count >= fourP && count < fiveP){
    mt = 25;
  }
  else if(count >= fiveP && count < sixP){
    mt = 15;
  }
  return mt;
}

function fac(n){
    return(n<2)?1:fac(n-1)*n;
}
