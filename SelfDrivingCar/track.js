class Track{
    constructor(){
        this.inner_circle = [];
        this.outer_circle = [];
        this.width_of_track = width/12;
        this.setup();
    }



    setup(trac_txt = null){

    }

    show(){
        stroke(255);
        for(let l of this.outer_circle){
            line(l.x1, l.y1, l.x2, l.y2);
        }
        for(let l of this.inner_circle){
            line(l.x1, l.y1, l.x2, l.y2);
        }

    }






}