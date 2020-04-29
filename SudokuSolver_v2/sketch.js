var main_board;

function preload(){
  data = loadStrings("boards/board_2.txt");
}

function create_board(cnv_width){
  box_width = cnv_width/data[0].length;
  var board = [];
  var y_pos = 0
  for (let row_num in data){
    var x_pos = 0
    let row = []
    for(let col_num in data[row_num]){
      let box = new Box(x_pos, y_pos, box_width, data[row_num][col_num]);
      box.set_grid_num(x_pos/box_width, y_pos/box_width);
      row.push(box);
      x_pos += box_width;
    }
    board.push(row);
    y_pos += box_width;
  }
  return board;
}

function show_board(board, cnv_width){
  for(let row in board){
    for(let col in board[row]){
      board[row][col].show()
    }
  }
  strokeWeight(5);
  line(cnv_width/3, 0, cnv_width/3, cnv_width)
  line(cnv_width/3 * 2, 0, cnv_width/3 * 2, cnv_width)
  line(0, cnv_width/3, cnv_width, cnv_width/3)
  line(0, cnv_width/3 * 2, cnv_width, cnv_width/3 * 2)
}

function solve_board(board){
  simple_simplyfy_options(board);
  simple_place_number(board);
  advanced_solve_board(board)
  console.log(board);
}

function simple_place_number(board){
  let found_number = true;
  while(found_number){
    found_number = false
    //if box only has one options  
    for(let row of board){
      for(let box of row){
        if(! box.solved && box.options.length == 1){
          box.was_found();
          found_number = true;
        }
      }
    }

    let nums = [1,2,3,4,5,6,7,8,9];
    //if number only has one option in row
    for(let row of board){
      let num_not_in_row = nums.filter(x => ! row.map(b => b.num).includes(x));
      for(let num of num_not_in_row){
        let optional_boxes = [];
        for(let box of row){
          if(box.options.includes(num) && !box.solved){
            optional_boxes.push(box);
          }
        }
        if(optional_boxes.length == 1){
          optional_boxes[0].set_num(num);
          found_number = true;
        }
      }
    }

    //if number only has one option in col
    for(let i = 0; i < 9; i++){
      let num_not_in_col = nums.filter(x => !board.map(r => r[i].num).flat().includes(x));
      for(let num of num_not_in_col){
        let optional_boxes = [];
        for(let row of board){
          if(row[i].options.includes(num) && !row[i].solved){
            optional_boxes.push(row[i]);
          }
        }
        if(optional_boxes.length == 1){
          optional_boxes[0].set_num(num);
          found_number = true;
        }
      }
    }

    //if number only has one option in grid
    for(let i = 0; i < 9; i++){
      let num_not_in_grid = nums.filter(x => !board.map(r => r.filter(b => b.grid_num == i)).flat().map(b => b.num).includes(x))
      for(let num of num_not_in_grid){
        let optional_boxes = [];
        for(let row of board){
          for(let box of row){
            if(box.grid_num == i && box.options.includes(num) && !box.solved){
              optional_boxes.push(box);
            }
          }
        }
        if(optional_boxes.length == 1){
          optional_boxes[0].set_num(num);
          found_number = true;
        }
      }
    }
  }
}

function simple_simplyfy_options(board){
  //check rows
  for(let row of board){
    for(let box of row){
      if(! box.solved){
        let num_in_same_row = row.map(box => box.num).filter(x => x != 0);
        box. options = box.options.filter(x => !num_in_same_row.includes(x))
      }
    }
  }
  //check cols
  for(let i = 0; i < 9; i++){
    let col_of_numbers = []
    for(let row of board){
      col_of_numbers.push(row[i].num);
    }
    col_of_numbers = col_of_numbers.filter(x => x != 0)
    for(let row of board){
      row[i].options = row[i].options.filter(x => !col_of_numbers.includes(x))
    }
  }

  //check 3x3
  for(let i = 0; i < 9; i++){
    let num_in_grid = board.map(r => r.filter(b => b.grid_num == i && b.num != 0)).filter(r => r.length > 0).flat().map(b => b.num);
    for(let row of board){
      for(let box of row){
        if(box.grid_num == i && !box.solved){
          box.options = box.options.filter(x => !num_in_grid.includes(x));
        }
      }
    }
  }
}

function advanced_solve_board(board){
  //recursive
  let boxes_beeing_cecked = []
  for(let row of board){
    for(let box of row){
      // place a number from options
      // try simple solve
      // validate
      // if good, check if done, if not good, step back and try other option and do again
      // if good and not done, go to next box
    }
  }
}

function setup() {
  var cnv = createCanvas(450,450);
  main_board = create_board(width, height);
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  cnv.position(x, y);
}

// function draw() {
//   background(230);
//   show_board(main_board, width);
//   solve_board(main_board);
//   show_board(main_board, width);
//   noLoop();
// }

function mouseClicked() {
  background(230);
  solve_board(main_board);
  show_board(main_board, width);
}