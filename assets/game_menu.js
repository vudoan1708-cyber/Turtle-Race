class Button {
    constructor() {
        this.size = d * 2.25;
        this.wIns = d * 5;
        this.hIns = d;
        this.x = width / 3 - 100;
        this.y = height / 2.5 - 20;
    }

    show() {
        ellipseMode(CENTER);
        push();
        translate(width / 2, height / 2);
        ellipse(0, 0, this.size);
        noFill();
        stroke(0);
        strokeWeight(10);
        ellipse(0, 0, this.size / 1.25);
        pop();
    }

    instructionInGame() {
        push();
        fill(0, 150);
        rect(0, 0, width, height);
        noFill();
        strokeWeight(4);
        stroke(255, 0, 0);
        textFont("Georgia");
        textSize(25);
        strokeWeight(2);
        rect(d + 40, 0, 80, height);
        if (mobileResize) {
            text("SAFE AREA", width - width / 4 - 20, (d * 4) + 80);
            rect(width - width / 4 - 25, d * 4, d + 25, d);
        } else {
            text("SAFE AREA", width - width / 4 - d - 15, (d * 4) + 80);
            rect(width - width / 4 - d - 20, d * 4, d + 25, d);
        }
        textAlign(CENTER);
        text("SAFE", d + 78, height / 2 - 50);
        text("AREA", d + 78, height / 2);
        pop();
    }

    hovered() {
        let d = dist(mouseX, mouseY, width / 2, height / 2);
        if (d < (this.size / 1.25) / 2) {
            if (countTime >= 150) {
                if (!mouseIsPressed) {
                    push();
                    fill(255, 0, 0);
                    ellipse(width / 2, height / 2, this.size / 1.25);
                    // stroke(255);
                    // strokeWeight(4);
                    textAlign(CENTER);
                    textFont("Georgia");
                    if (mobileResize) {
                        textSize(50);
                    } else textSize(60);
                    text("Let's", width / 2, height / 2 - 20);
                    text("Race", width / 2, height / 2 + 50);
                    pop();
                }

            }

        } else {
            if (countTime >= 150) {
                mappingTransparent = map(sin(frameCount * 10), -1, 1, 0, 255);

                push();
                fill(0, mappingTransparent);
                textAlign(CENTER);
                textFont("Georgia");
                if (mobileResize) {
                    textSize(50);
                } else textSize(60);
                text("Let's", width / 2, height / 2 - 20);
                text("Race", width / 2, height / 2 + 50);
                pop();
            }

        }
    }

    clicked() {
        let d = dist(mouseX, mouseY, width / 2, height / 2);
        if (d < (this.size / 1.25) / 2) {
            return true;
        } else return false;
    }

    clicking() {
        let d = dist(mouseX, mouseY, width / 2, height / 2);
        if (d < this.size / 2) {
            if (mouseIsPressed) {
                push();
                translate(width / 2, height / 2);
                scale(0.5, 0.5);
                noFill();

                ellipse(0, 0, this.size);
                stroke(0);
                strokeWeight(10);
                ellipse(0, 0, this.size / 1.25);
                pop();
            }

        } else return false;
    }

    showInstruction() {
        // let mappingTransparent1 = map(countTime, 160, 180, 0, 100);
        mappingTransparent = map(countTime, 160, 180, 0, 255);
        if (countTime >= 160) {
            push();
            fill(0, 255, 0, 100);
            rect(0, 0, width / 2 - 50, height / 2 - 50);
            fill(0, mappingTransparent);
            textAlign(CENTER);
            textFont("Georgia");
            if (mobileResize) {
                textSize(40);
                text("How To Play", width / 5, height / 2 - 200);
            } else {
                textSize(80);
                text("How To Play", width / 5, height / 2 - 100);
            }
            pop();
        }
    }
    // to decide kind of electronic devices
    showGameEnter() {
        let dHov = dist(mouseX, mouseY, width / 2, height / 2);
        push();
        if (dHov < 100) {
            fill(0, 100);
            translate(width / 2, height / 2);
            ellipse(0, 0, 250);
            fill(255, 0, 0, 150);
            ellipse(0, 0, 200);
            stroke(0);
            strokeWeight(10);
            textAlign(CENTER);
            textFont("Georgia");
            textSize(20);
            text("ENTER THE RACE", 0, 0);
        } else {
            fill(0, 100);
            translate(width / 2, height / 2);
            ellipse(0, 0, 250);
            fill(255, 150);
            ellipse(0, 0, 200);
            stroke(0);
            strokeWeight(3);
            textAlign(CENTER);
            textFont("Georgia");
            textSize(20);
            text("ENTER THE RACE", 0, 0);
        }
        pop();
    }

    clickedGameEnter() {
        let d = dist(mouseX, mouseY, width / 2, height / 2);
        if (!Race) {
            if (d < 100) {
                return true;
            } else return false;
        }
    }
    clickedInstruction() {
        if (countTime >= 160) {
            if (mouseX < width / 2 - 50 && mouseX > 0) {
                if (mouseY < height / 2 - 50 && mouseY > 0) {
                    return true;
                }
            } else return false;
        }

    }

    hoveredClose() {
        if (countTime >= 160) {
            let d2 = dist(mouseX, mouseY, width - 40, 32);
            if (d2 < 30) {
                anim = true;
            } else anim = false;
        }
    }

    close() {
        if (countTime >= 160) {
            let d2 = dist(mouseX, mouseY, width - 40, 32);
            if (d2 < 30) {
                return true;
            } else return false;
        }
    }

    showAboutMe() {
        mappingTransparent = map(countTime, 170, 190, 0, 255);
        if (countTime >= 170) {
            push();
            fill(0, 0, 250, 100);
            rect(width / 2 + 50, 0, width, height / 2 - 50);
            fill(0, mappingTransparent);
            textAlign(CENTER);
            textFont("Georgia");
            if (mobileResize) {
                textSize(40);
                text("About Me", width - width / 5, height / 2 - 200);
            } else {
                textSize(80);
                text("About Me", width - width / 5, height / 2 - 100);
            }
            pop();
        }

    }

    clickedAboutMe() {
        if (countTime >= 170) {
            // actual board
            if (mouseX < width && mouseX > width / 2 + 50) {
                if (mouseY < height / 2 - 50 && mouseY > 0) {
                    return true;
                }
            } else return false;
        }

    }

    showInspiration() {
        mappingTransparent = map(countTime, 180, 200, 0, 255);
        if (countTime >= 180) {
            push();
            fill(100, 0, 0, 100);
            rect(0, height - height / 2.5 - 10, width / 2 - 50, height - 50);
            fill(0, mappingTransparent);
            textAlign(CENTER);
            textFont("Georgia");
            if (mobileResize) {
                textSize(40);
                text("My Inspiration", width / 5 + 10, height - height / 2 + 200);
            } else {
                textSize(80);
                text("My Inspiration", width / 5 + 10, height - height / 2 + 150);
            }
            pop();
        }
    }

    clickedInspiration() {
        if (countTime >= 180) {
            // actual board
            if (mouseX < width / 2 - 50 && mouseX > 0) {
                if (mouseY < height - 50 && mouseY > height - height / 2.5 - 10) {
                    return true;
                }
            } else return false;
        }
    }

    showRef() {
        mappingTransparent = map(countTime, 190, 210, 0, 255);
        if (countTime >= 190) {
            push();
            fill(0, 0, 100, 100);
            rect(width / 2 + 50, height - height / 2.5 - 10, width, height - 50);
            fill(0, mappingTransparent);
            textAlign(CENTER);
            textFont("Georgia");
            if (mobileResize) {
                textSize(40);
                text("Reference", width - width / 5, height - height / 2 + 200);
            } else {
                textSize(80);
                text("Reference", width - width / 5, height - height / 2 + 150);
            }
            pop();
        }
    }

    clickedRef() {
        if (countTime >= 190) {
            // actual board
            if (mouseX < width && mouseX > width / 2 + 50) {
                if (mouseY < height - 50 && mouseY > height - height / 2.5 - 10) {
                    return true;
                }
            } else return false;
        }
    }
}