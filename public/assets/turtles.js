class Turtles {
    constructor(i) {
        this.i = i;
        this.size = 60;
        this.x = 0;
        this.y = ((i + 1) * d) + this.size / 2;
        this.speed = 0;

    }

    show() {
        // push();
        // fill(255);
        // rect(this.x, this.y, this.size, this.size);
        // pop();

        // imageMode(CENTER);
        image(animTurtles[(currentFrame + 1) % numFrames], this.x, this.y, this.size * 1.5, this.size);
    }

    move() {
        this.speed = 9;
    }

    getHit(punch) {
        let d7 = dist(this.x, this.y, punch.x, punch.y);
        if (d7 < (this.size + punch.size) / 2) {
            return true;
        } else return false;
    }

    push(myTurtle) {
        let d1 = dist(this.x, this.y, myTurtle.x, myTurtle.y);
        if (d1 < (this.size + myTurtle.size) / 2) {
            return true;
        } else {
            return false;
        }
    }

    get(bonuses) {
        let d2 = dist(this.x, this.y, bonuses.x, bonuses.y);
        if (d2 < (this.size + bonuses.size) / 2) {
            return true;
        } else {
            return false;
        }
    }
    lose(gear) {
        if (this.y < 0 || this.y + this.size > height || this.x < gear.x + gear.size) {
            return true;
        } else return false;
    }
    update() {
        this.x += this.speed;
        if (this.x + this.size > width / 2) {
            this.speed = 0;
        }
    }


    touch(destination) {
        if (this.x + this.size > destination.x + destination.w) {
            return true;
        } else return false;
    }
}

class MyTurtle {
    constructor() {
        this.x = 0;
        this.size = 60;
        this.y = this.size / 2;
        this.myspeed = 0;
    }

    show() {
        image(animMyTurtle[(currentFrame + 1) % numFrames], this.x, this.y, this.size * 1.5, this.size);

    }

    showHealthBar() {
        mappingHealthBar = map(HealthBar, 0, 100, 0, this.size)
        push();
        translate(this.x, this.y);
        // rectMode(CENTER);
        fill(255, 100);
        rect(30, 0, this.size / 3, this.size);
        fill(255, 0, 0);
        rect(30, 0, this.size / 3, mappingHealthBar);
        textAlign(CENTER);
        textFont("Georgia");
        textSize(30);
        fill(0);
        rotate(90);
        text(int(HealthBar), 30, this.size / 2 - 10);
        pop();
    }

    move() {
        this.myspeed = 8;
    }


    controls(dir) {

        this.y += dir * d;
    }


    update() {
        this.x += this.myspeed;
        if (stopStop) {
            if (this.x + this.size > width / 2) {
                this.myspeed = 0;
                stopStop = false;
                // slowDownActivate = true;
                // after stopping at the centre of canvas, turtle will slow down
                this.myspeed -= 1;
            }
        }



    }

    speedUp() {
        this.myspeed += 0.2;
        // if (this.x + this.size > width - width / 4) {
        //     this.myspeed *= -0.5;
        //     // return this.x = width - this.size - 10;
        // }
    }

    pickUps(hearts) {
        let d9 = dist(this.x, this.y, hearts.x, hearts.y);
        if (d9 < (this.size + hearts.size) / 2) {
            return true;
        } else return false;
    }

    lose(gear) {
        if (this.y < 0 || this.y + this.size > height || this.x < gear.x + gear.size) {
            // if (this.x < 0) {
            return true;
            // }
        }
        return false;
    }

    touch(destination) {
        if (this.x + this.size > destination.x + destination.w) {
            return true;
        } else return false;
    }
}


class BossTurtle {
    constructor() {
        this.h = height;
        this.w = this.h * 1.25;
        this.x = d;
        this.y = 0;
    }

    show() {
        image(animbossTurtle[(currentFrame + 1) % numFrames], this.x, this.y, this.w, this.h);
    }

    show_bossHealthBar() {
        mappingHealthBar = map(bossHealthBar, 0, 200, this.y + 10, this.h - 20);
        push();
        stroke(0);
        strokeWeight(3);
        fill(255, 200); // white
        rect((this.x + this.w) / 2.5, this.y + 10, 100, this.h - 20);
        fill(255, 100, 50, 250); // orange
        rect((this.x + this.w) / 2.5, this.y + 10, 100, mappingHealthBar);


        pop();
    }
    wound(myTurtle) {
        if (myTurtle.x < (this.x + this.w) - d && myTurtle.x + myTurtle.size > this.x - d) {
            if (myTurtle.y < (this.y + this.h) - 100 && myTurtle.y + myTurtle.size > this.y - 100) {
                return true;
            } else return false;
        }
        // let distance = dist(this.x, this.y, myTurtle.x, myTurtle.y);
        // if (distance < (this.w + myTurtle.size) / 2) {
        //     return true;
        // } else return false;
    }

    rushForwards() {
        if (bossHealthBar > 100) {
            if (frameCount % 1800 == 0) { // every 30 secs
                bossRushCounter++;
            }
        } else {
            if (frameCount % 900 == 0) { // every 15 secs
                bossRushCounter++;
            }
        }
        
        if (bossForwards) {
            if (this.x < width / 3) { // if x pos of the boss turtle is < than width / 3
                this.x++; // rush forwards
            } else bossForwards = false;
        }
        if (bossRushCounter == 1) {
            bossForwards = true;
        }
        // else if (bossRushCounter == 2) { // otherwise, if it's larger
        //     if (this.x > d) { // and x pos is larger than d
        //         this.x--; // rush back immediately
        //     }
        // }
        else if (this.x > d) { // and x pos is larger than d
            if (!bossForwards) {
                this.x--; // rush back immediately
            }
        }


        if (this.x == d) {
            bossRushCounter = 0;
            punchBossTime = 0;
        }
    }

    lose() {
        this.x--;
    }

    touch(destination) {
        if (this.x + this.w > destination.x + destination.w) {
            return true;
        }
        return false;
    }
}