var numOfCards = 12; //must be an even number
var nums = [];
var cards = [];
var flippedCards = [];
var finishedCards = [];
var flipCount = 0;
var flipElement;
var scoreCount = 0;
var scoreElement;
var startCoverTextElement;
var endCoverTextElement;
var endCoverUnderTextElement;
var container;


//setting up the game
function setup(){
  //getting objects from html-file and stores the in variables.
  //Using select() which is a funtion from the P5.js-lib.
  flipElement = select("#current-flips");
  scoreElement = select("#current-score");
  startCoverTextElement = select("#start-text");
  endCoverTextElement = select("#end-text");
  endCoverUnderTextElement = select("#end-under-text");
  container = select('#cnt');


  //Adding mousepressed-event to start- and end-cover.
  startCoverTextElement.mousePressed( function() {clickToStart()});
  endCoverTextElement.mousePressed( function() {clickToReStart()});


  //selecting numOfCards/2 random numbers,
  //and stores each twice in a list (nums).
  for(let k=0; k < numOfCards/2; k++){
    let num = Math.round(random(1,36));
    while(nums.includes(num)){
      num = Math.round(random(1,36));
    }
    nums.push(num,num);
  }
  nums = shuffle(nums); //shuffels the list of numbers

  //Creating cards as P5-div-elements and setting the container as parent.
  //Each card is then again set to parant to two div-elements, front and back.
  //Then Front and Back each get their own img-element as child.
  //Back-img is always the same. Front-img uses the num-list (which is now randomized)
  //to select an imgsrc.

  for(let i = 0; i < numOfCards; i++){
    let card = createDiv("");
    card.class("card");
    card.mousePressed(function(){flipCard(this)});

      let back = createDiv("");
      back.parent(card);

          let backImg = createImg("./imgs/backImg.jpg");
          backImg.addClass("card card-back")
          backImg.parent(back);

      let front = createDiv("");
      front.parent(card);

          let frontImg = createImg("./imgs/"+nums[nums.length-1]+".png");
          frontImg.addClass("card card-front");
          frontImg.parent(front);
          nums.pop();

    card.parent(container);
    cards.push(card);
  }
}



//The function that runs each time a card gets clicked on.
function flipCard(card){
  //First, checks if the game is finished, if not; go on.
  if(! isFinished()){
    //check if there is already two cards that are flipped. If so, these cards
    //are not a match and will be flipped back.
    if(flippedCards.length == 2){
      flipBack();
    }

    //Else, meaning there is only one or zero cards that are already flipped,
    //check if the card beeing clicked on is already flipped, if not; flipp the
    //card aswell as updating the flipcount.
    //Each flipped card will be added to the flippedCards list, that holds
    //all the cards that are flipped so the picture is shown. When
    //a card gets flipped back, it will be removed from this list. This means
    //flippedCards will at all times maximun hold two card.
    else if(! cardIsFlipped(card)){
      card.addClass("visible");
      flippedCards.push(card);
      flipCount++;
      flipElement.html(flipCount);

      //Then, if there's now two cards that are flipped; check for matchp.
      //If match; run matchFound();
      if(flippedCards.length == 2){
        if(isMatch()){
          macthFound();
        }
      }
    }
  }

  //Every time a card is clicked, we also checks if the game is finished.
  //If so, we set the endcover to visible and the game-over/victory text
  //will be shown.
  if(isFinished()){
    endCoverTextElement.addClass("visible");
    console.log("done");
  }
}

//Checking fro a match by compearing the outerHTML
function isMatch(){
  let card1 = flippedCards[0].child()[1];
  let card2 = flippedCards[flippedCards.length-1].child()[1];
  return card1.outerHTML === card2.outerHTML;
}

//When a match is found, the two flippedCards will be added to the
//finishedCards-list. The flipppedCards-list the will be emptied, so they dont
//get considert again later.
function macthFound(){
  finishedCards = finishedCards.concat(flippedCards);
  flippedCards = [];
  updateScore();
}

//Update the variable holding the score, aswell as the p5-div-element
//showing the score.
//this is called when a match is found.
function updateScore(){
  scoreCount++;
  scoreElement.html(scoreCount);
}

//Flippes the cards back by remoing the class "visivle" from the p5-div-element.
//This is called when there are two cards flipped but no match.
function flipBack(){
  for(let i = flippedCards.length-1; i>=0; i--){
    flippedCards[i].removeClass("visible");
    flippedCards.pop();
  }
}

//checks if the card-argument is flipped, by checking if the p5-div-element
//has a class "visible", if so return true.
//The function is called in flipCard() when a card gets clicked on.
function cardIsFlipped(card){
  let classList = card.class().split(" ");
  return classList.includes("visible");
}

//Checks if the game is finised by compearing the length of finishedCards to
//numOfCards. Returns true if equal.
function isFinished(){
  return finishedCards.length == numOfCards;
}

//The function that runs when the startcover is clicked on. It remove
//the class visible from the p5-div-element so it disapears.
function clickToStart(){
  startCoverTextElement.removeClass("visible");
  // startTimer();
}

////The function that runs when the endcover is clicked on. It removes
//the class visible from the p5-div-element so it disapears.
//Also runs the resetGame()-function so the game will start over.
function clickToReStart(){
  endCoverTextElement.removeClass("visible");
  resetGame();
}

// function startTimer(){
//   //something here
// }


//Resets the game by setting the values of the variables back to deafult.
//Removes all child-element from the container. The runs the setup-functon
//and the game will start all over with new cards.
function resetGame(){
  flipCount = 0;
  scoreCount = 0;
  scoreElement.html("0");
  flipElement.html("0");
  nums = [];
  cards = [];
  finishedCards = [];

  //removing child-elements from dom-objekt "container";
  let numOfItr = container.child().length - numOfCards;
  let startI = container.child().length -1;
  for(let i = startI; i >= numOfItr; i--){
    container.child()[i].remove();
  }
  //Setting up the game
  setup();
}
