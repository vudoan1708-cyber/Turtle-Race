class Energy {
    constructor() {
        this.size = 40;
        this.x = width;
        this.y = this.size / 2 + 10;

    }

    show() {
        // push();
        // fill(0, 255, 0);
        // rect(this.x, this.y, this.size, this.size);  
        // pop();   
        image(energyImg, this.x, this.y, this.size, this.size * 1.5);   
    }

    move() {
        this.x -= 5;
    }

    offScreen() {
        return (this.x + this.size < 0);
    }

    collected(myTurtle) {
        let d4 = dist(this.x, this.y, myTurtle.x, myTurtle.y);
        if (d4 < (this.size + myTurtle.size) / 2) {
            return true;
        } else {
            return false;
        }
    }
}