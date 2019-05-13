var board;
var upper_board;
var lower_board;

var card_deck = [];

function setup() {
  board = select("#brd");
  upper_board = select("#up_brd");
  lower_board = select("#low_brd");

  for (let i = 0; i < 6; i++) {
    let card = createDiv("");
    card.class("card");
    card.parent(upper_board);
    card_deck.push(card);
  }
}

function draw() {}
