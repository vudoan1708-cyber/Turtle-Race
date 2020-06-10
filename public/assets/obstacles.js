class Obs {
    constructor(car) {
        this.size = 60;
        this.x = width;
        this.y = this.size / 2;
        this.speed = 0;
        this.car = car;
    }

    show() {
        // push();
        // fill(255);
        // rect(this.x, this.y, this.size, this.size);
        // pop();
        image(this.car, this.x, this.y, this.size * 2, this.size);
    }


    move() {
        this.speed -= 0.05;
    }

    update() {
        this.x += this.speed;
    }

    // collision check
    hits(myTurtle) {
        let d = dist(myTurtle.x, myTurtle.y, this.x, this.y);
        if (d < (myTurtle.size + this.size) / 2) {
            return true;
        }
        else {
            return false;
        }
    }

    offScreen() {
        if (this.x + this.size < 0) {
            return true;
        }
        else {
            return false;
        }
    }
}

class BouncingBox {
    constructor(box) {
        this.box = box;
        this.size = 60;
        this.x = width - width / 4;

        this.y = (box * d) + this.size / 2;
        this.speed = 0;
    }


    show() {
        push();
        fill(0);
        if (mobileResize) {
            rect(this.x + 100, this.y, this.size / 6, this.size);
        } else rect(this.x, this.y, this.size / 6, this.size);
        pop();
    }


    
    // move() {
    //     this.speed = 10;
    // }

    // update() {
    //     this.x += this.speed;
    //     if (this.x > width - width / 4) {
    //         this.speed = 0;
    //         this.x = width - width / 4;
    //     }
    // }

    collide(myTurtle) {
        let d5;
        if (mobileResize) {
            d5 = dist(this.x + 100, this.y, myTurtle.x, myTurtle.y);
        } else d5 = dist(this.x, this.y, myTurtle.x, myTurtle.y);
        
        if (d5 < (this.size + myTurtle.size) / 2) {
            return true;
        } else {
            return false;
        }
    }
}

class Gear {
    constructor(g) {
        this.g = g;
        this.x = -d;
        this.size = 80;
        this.y = (g * d) + this.size / 1.5;
        
        this.speed = 0;
    }
    move() {
        this.speed = 2.5;
    }

    
    update() {
        this.x += this.speed;
        if (this.x > 0) {
            this.speed = 0;
            this.x = 0;
        }
    }
    spinning() {
        push();
        translate(this.x + 40, this.y); //translate the origin of rotation to the corner of the image
        rotate(angle);
        // rectMode(CENTER);
        // rect(0, 0, this.size, this.size);
        imageMode(CENTER); // image will now, rotate around its centre
        image(gearImg, 0, 0, this.size, this.size);
        

        angle = angle + 1;
        pop();
    }
}
