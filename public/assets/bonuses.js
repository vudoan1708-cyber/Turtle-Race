class GlovesBonuses {
    constructor(b) {
        this.b = b;
        this.size = 60;
        this.x = width;
        this.y = (b * d) + this.size / 2;
        this.speed = 0;
        this.alpha = 255;
        
    }

    show() {

        push();
        noFill();
        strokeWeight(5);
        stroke(0, 255, 0, this.alpha);
        rect(this.x, this.y, this.size + this.size / 2, this.size);
        this.alpha--;
        pop();
        
        image(boxingGloveImg, this.x, this.y, this.size + this.size / 2, this.size);
    }


    move() {
        this.speed -= 0.05;
    }

    update() {
        this.x += this.speed;
    }

    collected(myTurtle) {
        let d2 = dist(this.x, this.y, myTurtle.x, myTurtle.y);
        if (d2 < (this.size + myTurtle.size) / 2) {
            return true;
        }
        else {
            return false;
        }
    }
    used(turtles) {
        let d3 = dist(this.x, this.y, turtles.x, turtles.y);
        if (d3 < (this.size + turtles.size) / 2) {
            return true;
        }
        else {
            return false;
        }
    }
}

class Heart {
    constructor() {
        this.size = 70;
        this.x = width;
        this.y = this.size / 2;
        this.speed = 0;

    }

    show() {

        image(heartImg, this.x, this.y, this.size, this.size);
    }

    move() {
        this.speed -= 0.05;
    }

    update() {
        this.x += this.speed;

    }
}
