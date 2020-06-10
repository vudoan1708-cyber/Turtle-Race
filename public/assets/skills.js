class PunchBackwards {
    constructor(j) {
        this.j = j;
        this.x = width + 20;
        this.size = 70;
        this.y = (j * d) + this.size / 2.75;
        this.speed = 0;
        this.alpha = 255;
    }

    show() {
        push();
        // fill(0, 255, 0);
        noFill();
        strokeWeight(5);
        stroke(255, 0, 0, this.alpha);
        this.alpha--;
        rect(this.x, this.y, this.size + this.size / 2, this.size);
        pop();
        
        image(boxingGloveImg, this.x, this.y, this.size + this.size / 2, this.size);
    }

    move() {
        this.speed -= 5;
    }

    update() {
        this.x += this.speed;
    }

    offScreen() {

        if (this.x + this.size < 0) {
            return true;
        } else return false;
    }

    hits(myTurtle) {
        let d6 = dist(this.x, this.y, myTurtle.x, myTurtle.y);
        if (d6 < (this.size + myTurtle.size) / 2) {
            return true;
        } else return false;
    }

    hurt(bossTurtle) {
        let d7 = dist(this.x, this.y, bossTurtle.x, bossTurtle.y);
        if (d7 < (this.size + bossTurtle.w) - d) {
            return true;
        } else return false;
    }
}