class Destination {
    constructor() {
        this.x = random(50000, 100000);
        // this.x = 5000;
        this.y = 0;
        this.w = 20;
        this.h = height;
    }

    show() {
        push();
        fill(255, 255, 0);
        rect(this.x, this.y, this.w, this.h);

        pop();
    }

    move() {
        this.x -= 5;
    }
    predict() {
        if (this.x > 0) {
            let mappingDist = map(this.x, 0, 50000, 0, 100);
            push();
            fill(255, 255, 0);
            textAlign(CENTER);
            textSize(23);
            textFont("Georgia");
            text(int(mappingDist) + " %", width - 50, height / 2);

            pop();
        }
    }
}
class Start {
    constructor() {
        this.x = d - 55;
        this.y = 0;
        this.w = 50;
        this.h = 600;
        this.speed = 0;
    }

    show() {
        image(startImg, this.x, this.y, this.w, this.h);
    }

    move() {
        this.speed -= 0.05;

    }

    update() {
        this.x += this.speed;

    }
}
