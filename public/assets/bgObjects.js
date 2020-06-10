class BGObject {
    constructor(j) {
        this.j = j;
        this.size = 100;
        this.x = width;
        this.y = (j * d) + 20;
        this.speed = 0;
    }

    show() {
        // fill(255);
        // rect(this.x, this.y, this.size, - this.size / 2);
        image(treeBG, this.x, this.y, this.size, - this.size / 2);
        // image(grassBGImg, this.x, this.y1_grass, width, this.size_grass);
    }


    move() {
        this.speed -= 0.05;
    }

    update() {
        this.x += this.speed;
    }


    block(myTurtle) {
        if (this.x < myTurtle.x + myTurtle.size && this.x + this.size > myTurtle.x) {
            if (this.y < myTurtle.y + myTurtle.size && this.y + this.size > myTurtle.y) {
                return true;

            }           
        } else {
            return false;
        }
    }
    offScreen() {
        return (this.x + this.size < 0); 
    }
}


class RoadLines {
    constructor(r) {
        this.r = r;
        this.x = width;
        this.y = (r * d) + 60;
        this.size = 50;
        // this.speed = 0;
    }

    show() {
        push();
        noStroke();
        // stroke(255);
        // strokeWeight(5);
        fill(51, 200);
        rect(this.x, this.y, this.size, this.size / 5);
        pop();
    }


    move() {
        // this.speed -= 0.05;
        this.x -= 10;
    }

    // update() {
    //     this.x += this.speed;
    // }
    offScreen() {
        return (this.x + this.size < 0) ;
    }
}


class Flags {
    constructor(f) {
        this.f = f;
        this.x = d - 20;
        this.y = (f * d) + 55;
        this.size = d;
        this.speed = 0;
    }

    show() {
        image(startFlagImg, this.x, this.y, this.size, this.size);
        // fill(0);
        // rect(this.x, this.y, this.size, this.size);
    }

    move() {
        this.speed -= 0.05;

    }

    update() {
        this.x += this.speed;
    }

    disappear() {
        if (this.x + this.size < 0) {
            return true;
        } else return false;
    }
}

class RoadLinesEn {
    constructor(r) {
        this.r = r;
        this.x = width - width / 3;
        // this.x0 = width - width / 1.2;
        this.y = (r * d) + 60;
        this.size = 50;
        this.speed = 0;
    }

    show() {
        push();
        noStroke();
        // stroke(255);
        // strokeWeight(5);
        fill(51, 200);
        rect(this.x, this.y, this.size, this.size / 5);
        // rect(this.x0, this.y, this.size, this.size / 5);
        pop();
    }

    move() {
        this.x -= 8;
        // this.x0 -= 3;
    }
}