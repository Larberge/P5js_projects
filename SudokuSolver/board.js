class Board{
  constructor(filename){
    this.boxes = makebordFromFile(filename);
  }

  makebordFromFile(filename){
    result = []
    pretxt = loadStrings(filename);
    console.log(pretxt);
    return pretxt;

  }

  solve(){

  }


}
