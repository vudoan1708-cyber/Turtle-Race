p5.disableFriendlyErrors = true; // disables FES
let rows;
let gp,
    gp2,
    gp3,
    gp4;
let btn;
let angle = 0;
let d = 120;
let HealthBar = 100;
let bossHealthBar = 200;
let turtles = [];
let obstacles = [];
let bouncingObstacles = [];
let gear = [];
let Glovebonuses = [];
let bgObjects = [];
let bgRoadLines = [];
let energy = [];

let hole = [];
let hearts = [];
let flags = [];
let roadEn = [];
let destination;
let myTurtle;
let bossTurtle;
let number = [1, 2, 3, 4, 5];

//skills
let punch = [];

// let currentLoc = 0;
let raceStart = true, // to prevent the elements from keeping running forwards more than once
    stopStop = true, // to get rid of the default velocity = 0
    startGame = false,
    slowDownActivate = false,
    keyIsAvailable = false,
    maxCollection = false,
    pushPunch = true,
    lose = false,
    healthBarEmpty = false,
    instruction = false,
    aboutMe = false,
    inspiration = false,
    reference = false,
    anim = false,
    bossForwards = false,
    finishBoss = false,
    loading = true,
    touchScreen = false,
    mobileResize = false,
    Race = false,
    durationCount = true,
    stopGame = false;

let level = 1; // levels in game
let mode = 0; // modes in game including game menu
let collection = 0;
let countBonus = 0;
let counter = 3;
let counterLv = 0;
let imgShowTime = 0;
let scaleCounter = 0;
let animLineIn = 0;
let countTime = 0;
let alpha = 0;
let bossRushCounter = 0;
let punchBossTime = 0;
let inGameInsCounter = 0;
let counterHover = 0;
let loadingCounter = 0;
let numImg = 89; // 89 images,
let numSounds = 9; // 8 sounds and 1 song
let volume = 1;

let mappingScale;
let mappingHealthBar;
let mappingTransparent;

//assets: image
let treeBG;
let carImg = [];
let animbossTurtle = [];
let animMyTurtle = [];
let animTurtles = [];

let numFrames = 25;
let currentFrame = 0;
let gearImg;
let boxingGloveImg;
let energyImg;
let heartImg;
let startImg;
let startFlagImg;


//assets: songs & sound effects
let intro,
    punchSound,
    punchFinishSound,
    energyPickedSound,
    heartPickedSound,
    punchPickedSound,
    startCarSound,
    raceStartSound,
    carCrashSound;

// menu images
let turtleImg = [];

let duration = 0,
    punchCount = 0,
    endingCnt = 0;

let highestScore = null;

let instructionText = ["You will WIN when:", // 0
    ".Your Turtle comes FIRST in the race", // 1
    ".Or Other Turtles get ELIMINATED by being pushed towards to the gears", // 2
    "You will LOSE when:", // 3
    ".Other Turtles come FIRST in the race", // 4
    ".Or Your Turtle gets ELIMINATED by being pushed towards to the gears", // 5
    ".You let Your Turtle OFF the race path", // 6
    "Use UP ARROW and DOWN ARROW / touch on the UPPER HALF", // 7
    "and LOWER HALF of the LEFT HAND SIDE OF THE SCREEN to move the turtle.",
    "You can also press NUMBER 1-5 / touch on A PATH of the RIGHT HAND SIDE OF THE SCREEN", // 8
    "everytime Your Turtle collects A PUNCH SKILL to use it",
    "The Energy Boost is A MUST to keep up the speed"   
]; // 9

let aboutMeText = ["My name is Vu Doan, a Digital Media student at UWE Bristol, England", // 0
    "My date of birth is 17th of August, 1998, and I am Leo :))", // 1
    "I like to play guitar, love music in general, have a passion with 3D and a mere joy for coding", // 2
    "vudoan1708@gmail.com", // 3
    "https://vudoan.vercel.app/", // 4
]; // 5

let inspirationText = ["The game was originally inspired by so many racing game I've played in a 3D platform", // 0
    "But instead of transports or vehicles, I wanted to use an animal to imply animal abuse awareness", // 1
    "And also to say to myself", // 2
    "'It's Okay To Be Slow, Just Don't Give Up'"
]; // 3

let referenceText = ["Images:", // 0
    "Boxing Glove:", // 1 
    "https://www.kisspng.com/png-boxing-glove-clip-art-boxing-gloves-733280/", // 2
    "Car:", // 3
    "https://www.clipartmax.com/middle/m2i8H7b1A0N4b1d3_race-car-top-down-clipart-png-car-top-of-view/", // 4
    "https://www.pinclipart.com/pindetail/iioooiR_car-red-vehicle-car-top-view-clipart-png/", // 5
    "https://www.uihere.com/free-cliparts/car-clip-art-race-cars-clipart-1063142", // 6
    "Songs and Sound Effects:", // 7
    "Intro Song:", // 8
    "http://freemusicarchive.org/music/Checkie_Brown_1005/hey/Mary_Roose_CB_36", // 9
]; // 10

function MediaLoader() {
    loadingCounter++;
    if (loadingCounter == (numImg + numSounds)) {
        intro.loop();
        intro.setVolume(volume);
        loading = false;
    }
}

// get the highest score from the database
async function getHighestScore() {
	const response = await fetch('/score/');
    highestScore = await response.json();
    if (highestScore?.length === 0) {
        highestScore = [{ duration: 1000 }];
    }
	return highestScore;
}

async function updateScoreBoard() {
    const data = {
        duration
    };

    // create options
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };

    const response = await fetch('/score/', options);
    await response.json();
}

async function setup() {
    await getHighestScore();
    
    createCanvas(1200, 600).parent("canvasHolder");
    
    gp = createGraphics(1200, 600); // to use tint()
    gp.background(200, 200, 100, 0); // make gp bg transparent

    gp2 = createGraphics(1200, 600); // to use tint()
    gp2.background(200, 200, 100, 0); // make gp bg transparent

    gp3 = createGraphics(1200, 600); // to use tint()
    gp3.background(200, 200, 100, 0); // make gp bg transparent

    gp4 = createGraphics(1200, 600); // to use tint()
    gp4.background(200, 200, 100, 0); // make gp bg transparent


    // loading songs and sounds
    intro = loadSound("assets/sounds/Mary Roose.mp3", MediaLoader);
    punchSound = loadSound("assets/sounds/punch.mp3", MediaLoader);
    punchFinishSound = loadSound("assets/sounds/punchKill.mp3", MediaLoader);
    energyPickedSound = loadSound("assets/sounds/energyPicked.mp3", MediaLoader);
    startCarSound = loadSound("assets/sounds/StartCar.mp3", MediaLoader);
    raceStartSound = loadSound("assets/sounds/raceStart.mp3", MediaLoader);
    heartPickedSound = loadSound("assets/sounds/heart.mp3", MediaLoader);
    carCrashSound = loadSound("assets/sounds/carCrash.mp3", MediaLoader);
    punchPickedSound = loadSound("assets/sounds/punchPicked.mp3", MediaLoader);
    energyPickedSound.setVolume(0.2);
    heartPickedSound.setVolume(0.3);
    carCrashSound.setVolume(0.4);
    // end loading songs and sounds


    // loading images
    treeBG = loadImage("assets/img/trees.png", MediaLoader);
    gearImg = loadImage("assets/img/gear.png", MediaLoader);
    boxingGloveImg = loadImage("assets/img/boxingGlove.png", MediaLoader);
    energyImg = loadImage("assets/img/energy.png", MediaLoader);
    heartImg = loadImage("assets/img/Heart_Logo_Texture.png", MediaLoader);
    startImg = loadImage("assets/img/start.png", MediaLoader);
    startFlagImg = loadImage("assets/img/start_flags.png", MediaLoader);

    for (let a = 0; a < 4; a++) {
        turtleImg[a] = loadImage("assets/img/turtle" + a + ".png", MediaLoader);
    }
    for (let i = 0; i < 3; i++) {
        carImg[i] = loadImage("assets/img/car" + i + ".png", MediaLoader);
    }

    for (let j = 0; j < numFrames; j++) {
        if (j < 10) {
            animMyTurtle[j] = loadImage("assets/img/animTurtles/animated turtle_10" + j + ".png", MediaLoader);
        } else animMyTurtle[j] = loadImage("assets/img/animTurtles/animated turtle_1" + j + ".png", MediaLoader);
    }

    for (let k = 0; k < numFrames; k++) {
        if (k < 10) {
            animTurtles[k] = loadImage("assets/img/animTurtles2/animated turtle2_10" + k + ".png", MediaLoader);
        } else animTurtles[k] = loadImage("assets/img/animTurtles2/animated turtle2_1" + k + ".png", MediaLoader);
    }

    for (let l = 0; l < numFrames; l++) {
        if (l < 10) {
            animbossTurtle[l] = loadImage("assets/img/animBoss/boss_turtle_10" + l + ".png", MediaLoader);
        } else animbossTurtle[l] = loadImage("assets/img/animBoss/boss_turtle_1" + l + ".png", MediaLoader);
    }
    // end loading images

    angleMode(DEGREES);
    rows = height / d;
    myTurtle = new MyTurtle();
    bossTurtle = new BossTurtle();
    destination = new Destination();
    start = new Start();
    btn = new Button();
    for (r = 0; r < rows; r++) {
        roadEn[r] = new RoadLinesEn(r);
    }
    // initiate punch skill with first five elements so it won't get error after being spliced
    for (let j = 0; j < rows; j++) {
        punch[j] = new PunchBackwards(j);
    }

    for (let f = 0; f < rows; f++) {
        flags[f] = new Flags(f);
    }

    // turtles
    for (let i = 0; i < rows - 1; i++) { // draw turtle once
        turtles[i] = new Turtles(i);

    }

    // bouncing box
    for (let box = 0; box < rows; box++) { // draw boucing box once 
        bouncingObstacles[box] = new BouncingBox(box);
    }

    //gears
    for (let g = 0; g < rows; g++) {
        gear[g] = new Gear(g);
    }
}

function gameMenu() {
    textFont("Georgia");
    // instruction
    if (instruction) {
        push();
        mappingScale = map(scaleCounter, 0, 100, 0, 1);
        fill(0, 200);
        noStroke();
        translate(width / 2, height / 2);
        rectMode(CENTER);
        scale(mappingScale, mappingScale);
        rect(0, 0, width, height);
        fill(100);
        rect(0, 0, width - d, height - d);
        if (scaleCounter < 100) {
            scaleCounter += 20;
        }
        pop();

        push();
        mappingTransparent = map(scaleCounter, 0, 100, 0, 255);
        fill(255, mappingTransparent);
        textAlign(CENTER);
        if (!mobileResize) {
            textSize(30);
        } else textSize(20);
        text(instructionText[0], width / 5, height / 5.25);
        textAlign(LEFT);
        if (!mobileResize) {
            textSize(20);
        } else textSize(15);
        text(instructionText[1], width / 4.5, height / 4.25);
        text(instructionText[2], width / 4.5, height / 3.5);
        textAlign(CENTER);
        if (!mobileResize) {
            textSize(30);
        } else textSize(20);
        text(instructionText[3], width / 5, height / 2.5);
        textAlign(LEFT);
        if (!mobileResize) {
            textSize(20);
        } else textSize(15);
        text(instructionText[4], width / 4.5, height / 2.2);
        text(instructionText[5], width / 4.5, height / 2);
        text(instructionText[6], width / 4.5, height / 1.85);
        textAlign(CENTER);
        text(instructionText[9], width / 2, height / 1.25);
        if (!mobileResize) {
            textSize(18);
        } else textSize(10);
        text(instructionText[7], width / 2, height / 1.5);
        text(instructionText[8], width / 2, height / 1.4);
        pop();
        if (!anim) { // scale animation for close
            push();

            fill(200);
            // ellipseMode(CENTER);
            ellipse(width - 40, 32, 60, 60); // close button
            fill(0, 200);
            translate(width - 40, 50);
            textAlign(CENTER);
            textSize(50);
            text("X", 0, 0);
            pop();


        } else { // scale animation for close
            mappingScale = map(sin(frameCount * 20), -1, 1, 0, 1);
            textAlign(CENTER);
            push();
            fill(200);
            // ellipseMode(CENTER);
            ellipse(width - 40, 32, 60, 60);
            fill(0, 200);
            translate(width - 40, 50);
            scale(mappingScale, mappingScale);

            textSize(50);
            text("X", 0, 0);
            pop();
        }
        // about me
    } else if (aboutMe) {
        push();
        mappingScale = map(scaleCounter, 0, 100, 0, 1);
        fill(0, 200);
        noStroke();
        translate(width / 2, height / 2);
        rectMode(CENTER);
        scale(mappingScale, mappingScale);
        rect(0, 0, width, height);
        fill(100);
        rect(0, 0, width - d, height - d);
        if (scaleCounter < 100) {
            scaleCounter += 20;
        }
        pop();

        push();
        mappingTransparent = map(scaleCounter, 0, 100, 0, 255);
        fill(255, mappingTransparent);
        textAlign(CENTER);
        if (!mobileResize) {
            textSize(25);
        } else textSize(18);
        text(aboutMeText[0], width / 2, height / 4.5);
        text(aboutMeText[1], width / 2, height / 3.25);
        text(aboutMeText[2], width / 2, height / 2.5);
        text(aboutMeText[3], width / 2, height / 1.5);  
        text(aboutMeText[4], width / 2, height / 1.32);
        text(aboutMeText[5], width / 2, height / 1.2);

        pop();
        if (!anim) { // scale animation for close
            push();

            fill(200);
            // ellipseMode(CENTER);
            ellipse(width - 40, 32, 60, 60); // close button
            fill(0, 200);
            translate(width - 40, 50);
            textAlign(CENTER);
            textSize(50);
            text("X", 0, 0);
            pop();


        } else { // scale animation for close
            mappingScale = map(sin(frameCount * 20), -1, 1, 0, 1);
            textAlign(CENTER);

            push();
            fill(200);
            // ellipseMode(CENTER);
            ellipse(width - 40, 32, 60, 60);
            fill(0, 200);
            translate(width - 40, 50);
            scale(mappingScale, mappingScale);
            textSize(50);
            text("X", 0, 0);
            pop();
        }

        // inspiration
    } else if (inspiration) {
        push();
        mappingScale = map(scaleCounter, 0, 100, 0, 1);
        fill(0, 200);
        noStroke();
        translate(width / 2, height / 2);
        rectMode(CENTER);
        scale(mappingScale, mappingScale);
        rect(0, 0, width, height);
        fill(100);
        rect(0, 0, width - d, height - d);
        if (scaleCounter < 100) {
            scaleCounter += 20;
        }
        pop();

        push();
        mappingTransparent = map(scaleCounter, 0, 100, 0, 255);
        fill(255, mappingTransparent);
        textAlign(CENTER);
        if (!mobileResize) {
            textSize(25);
        } else textSize(15);

        text(inspirationText[0], width / 2, height / 4.5);
        text(inspirationText[1], width / 2, height / 3.25);
        text(inspirationText[2], width / 2, height / 2.5);
        if (!mobileResize) {
            textSize(30);
        } else textSize(20);
        text(inspirationText[3], width / 2, height / 1.5);

        pop();
        if (!anim) { // scale animation for close
            push();

            fill(200);
            // ellipseMode(CENTER);
            ellipse(width - 40, 32, 60, 60); // close button
            fill(0, 200);
            translate(width - 40, 50);
            textAlign(CENTER);
            textSize(50);
            text("X", 0, 0);
            pop();


        } else { // scale animation for close
            mappingScale = map(sin(frameCount * 20), -1, 1, 0, 1);
            textAlign(CENTER);

            push();
            fill(200);
            // ellipseMode(CENTER);
            ellipse(width - 40, 32, 60, 60);
            fill(0, 200);
            translate(width - 40, 50);
            scale(mappingScale, mappingScale);
            textSize(50);
            text("X", 0, 0);
            pop();
        }
    } else if (reference) {
        push();
        mappingScale = map(scaleCounter, 0, 100, 0, 1);
        fill(0, 200);
        noStroke();
        translate(width / 2, height / 2);
        rectMode(CENTER);
        scale(mappingScale, mappingScale);
        rect(0, 0, width, height);
        fill(100);
        rect(0, 0, width - d, height - d);
        if (scaleCounter < 100) {
            scaleCounter += 20;
        }
        pop();

        push();
        mappingTransparent = map(scaleCounter, 0, 100, 0, 255);
        fill(255, mappingTransparent);
        textAlign(CENTER);
        // title
        if (!mobileResize) {
            textSize(25);
        } else textSize(20);
        
        text(referenceText[0], width / 4, height / 5); // images
        text(referenceText[7], width / 4, height / 1.8); // songs and sounds
        // image section
        textAlign(LEFT);
        text(referenceText[1], d - 25, height / 4); // glove
        text(referenceText[3], d - 25, height / 2.75); // car
        if (!mobileResize) {
            textSize(15);
        } else textSize(10);
        
        text(referenceText[2], d - 25, height / 3.4);
        text(referenceText[4], d - 25, height / 2.5);
        text(referenceText[5], d - 25, height / 2.28);
        text(referenceText[6], d - 25, height / 2.1);

        // songs and sounds section
        textAlign(LEFT);
        if (!mobileResize) {
            textSize(25);
        } else textSize(20);
        text(referenceText[8], d - 25, height / 1.52); // intro

        if (!mobileResize) {
            textSize(15);
        } else textSize(10);
        text(referenceText[9], d - 25, height / 1.45);
        pop();
        if (!anim) { // scale animation for close
            push();

            fill(200);
            // ellipseMode(CENTER);
            ellipse(width - 40, 32, 60, 60); // close button
            fill(0, 200);
            translate(width - 40, 50);
            textAlign(CENTER);
            textSize(50);
            text("X", 0, 0);
            pop();


        } else { // scale animation for close
            mappingScale = map(sin(frameCount * 20), -1, 1, 0, 1);
            textAlign(CENTER);

            push();
            fill(200);
            // ellipseMode(CENTER);
            ellipse(width - 40, 32, 60, 60);
            fill(0, 200);
            translate(width - 40, 50);
            scale(mappingScale, mappingScale);
            textSize(50);
            text("X", 0, 0);
            pop();
        }
    }
}

function inGameInstruction() {
    if (level == 2) {
        if (counterLv == 6) {
            if (frameCount % 60 == 0) {
                inGameInsCounter++;
            }
        }
        if (inGameInsCounter > 3 && inGameInsCounter < 10) {
            btn.instructionInGame();
        }
    }
}

function gamePlay() {
    if (mode == 0) {
        background(200, 200, 100);
        let d = 300;
        if (animLineIn < 100) {
            animLineIn++;
        }

        push();
        stroke(255);
        strokeWeight(5);

        // game menu elements
        btn.showInstruction();
        btn.showAboutMe();
        btn.showInspiration();
        btn.showRef();

        // above
        let mappingLineOutUp = map(animLineIn, 0, 100, d, d / 6);
        line(width / 2, d, width / 2, mappingLineOutUp);
        let mappingLineDn = map(animLineIn, 0, 100, 0, width / 2 - 1.25 * d);
        line(width - width / 2.2, 0, width - width / 2.2, mappingLineDn);
        line(width / 2.2, 0, width / 2.2, mappingLineDn);


        // below
        let mappingLineOutDn = map(animLineIn, 0, 100, d, height - 40);
        line(width / 2, d, width / 2, mappingLineOutDn);
        let mappingLineUp = map(animLineIn, 0, 100, height, d);
        line(width - width / 2.2, height, width - width / 2.2, mappingLineUp);
        line(width / 2.2, height, width / 2.2, mappingLineUp);

        // left
        let mappingLineLeft = map(animLineIn, 0, 100, width / 2, d);
        line(width / 2, height / 2, mappingLineLeft, height / 2);
        let mappingLineInRight = map(animLineIn, 0, 100, 0, width / 2);
        line(0, height - height / 2.5, mappingLineInRight, height - height / 2.5);
        line(0, height / 2.5, mappingLineInRight, height / 2.5);

        // right 
        let mappingLineRight = map(animLineIn, 0, 100, width / 2, width - d);
        line(width / 2, height / 2, mappingLineRight, height / 2);
        let mappingLineInLeft = map(animLineIn, 0, 100, width, width / 2);
        line(width, height - height / 2.5, mappingLineInLeft, height - height / 2.5);
        line(width, height / 2.5, mappingLineInLeft, height / 2.5);

        // images
        imageMode(CENTER);
        if (countTime < 300) {
            countTime++;

        }
        // left
        let mappingTint = map(countTime, 100, 200, 0, 255);
        push();

        gp.tint(255, mappingTint);
        gp.image(turtleImg[1], width / 2 - 150, height / 2 - 150, d, d);
        translate(width / 2 - 1.25 * d, height / 2);
        image(gp, 0, 0);
        pop();
        // top
        if (countTime >= 120) {
            let mappingTint3 = map(countTime, 120, 170, 0, 255);
            push();
            gp3.tint(255, mappingTint3);
            gp3.image(turtleImg[2], width / 2 - 150, height / 2 - 150, d, d);
            translate(width / 2, height / 2 - d);
            image(gp3, 0, 0);
            pop();
        }
        // right
        if (countTime >= 130) {
            let mappingTint2 = map(countTime, 130, 180, 0, 255);
            push();
            gp2.tint(255, mappingTint2);
            gp2.image(turtleImg[0], width / 2 - 150, height / 2 - 150, d, d);
            translate(width / 2 + 1.25 * d, height / 2);
            image(gp2, 0, 0);
            pop();
        }
        // bottom
        if (countTime >= 140) {
            let mappingTint4 = map(countTime, 140, 190, 0, 255);
            push();
            gp4.tint(255, mappingTint4);
            gp4.image(turtleImg[3], width / 2 - 150, height / 2 - 150, d, d);
            translate(width / 2, height / 2 + d);
            image(gp4, 0, 0);
            pop();
        }

        btn.show(); // race button
        if (!instruction && !aboutMe && !inspiration && !reference) {
            btn.hovered();
            btn.clicking();
        }

        pop();
        gameMenu();
        btn.hoveredClose();
    } else if (mode == 1) {
        if (volume > 0.3) {
            volume -= 0.1;
        }
        intro.setVolume(volume);
        if (level == 1) {
            background(255);
            background(121, 121, 40, 200);
            displayRoadEn();
            start.show();
            for (let i = 0; i < rows; i++) {
                push();
                fill(255);
                strokeWeight(3);
                line(0, i * d, width, i * d);
                textAlign(CENTER);
                textFont("Georgia");
                textSize(50);
                text(number[i], d + 20, (i * d) + 70);

                pop();
            }
            displayBoucingBox();
            if (startGame) { // when spacebar is hit, game is ready to play

                drawRoad();
                displayRoad();

                // drawHole();
                // displayHole();
                for (r = roadEn.length - 1; r >= 0; r--) {
                    roadEn[r].move();
                }
                start.move();
                start.update();
                for (let f = 0; f < flags.length; f++) {
                    flags[f].move();
                }
                displayDestination();

                drawBonuses();
                displayBonuses();

                displayPunch();
                drawObstacle();
                displayObstacles();
                displayGear();

                drawEnergy();
                displayEnergy();

                drawBgObjects();
                displayBgObjects();
            }
            drawStaminaBar();
            displayThumbnail();
            displayFlags();
            displayTurtles();
            if (healthBarEmpty) {
                HealthBar = 0;
                push();
                fill(51, 100);
                rectMode(CENTER);
                rect(width / 2, height / 2, 600, 300);
                fill(255, 220);
                textAlign(CENTER);
                textFont("Georgia");
                textSize(100);
                text("YOU LOST", width / 2, height / 2 + 25);
                textSize(45);
                text("Best: " + highestScore?.[0]?.duration + ' seconds', width / 2, height / 2 - 100);
                textSize(25);
                text("Press F5 to restart", width / 2, height / 2 + 100);
                pop();
                setTimeout(noLoop, 2000);
            }

            endGame();
            raceCount();

        } else if (level == 2) {

            raceCount();

            // level changing process
            if (counterLv < 6) {

                // change background
                background(255);
                background(121, 121, 40, 200);
            }

            // background changing animation
            if (alpha < 200) {
                alpha++;
            } else alpha = 200;
            let mappingAlpha = map(alpha, 0, 200, 255, 0);
            background(255);
            background(121, 121, 40, 200); // yellow
            background(0, mappingAlpha);
            drawRoad();
            displayRoad();
            for (let i = 0; i < rows; i++) {
                push();
                fill(255);
                strokeWeight(3);
                line(0, i * d, width, i * d);
                textAlign(CENTER);
                textFont("Georgia");
                textSize(50);
                text(number[i], d + 20, (i * d) + 70);

                pop();
            }
            displayBoucingBox();
            displayDestination();

            drawBonuses();
            displayBonuses();


            // drawPunch(); // punch skill is drawn 
            displayPunch();
            drawObstacle();
            displayObstacles();
            displayGear();

            drawEnergy();
            displayEnergy();

            drawBgObjects();
            displayBgObjects();

            // boss appears
            bossTurtle.show();
            bossTurtle.show_bossHealthBar();
            bossTurtle.rushForwards();
            drawStaminaBar();
            displayThumbnail();
            displayTurtles();
            if (healthBarEmpty) {
                HealthBar = 0;
                push();
                fill(51, 100);
                rectMode(CENTER);
                rect(width / 2, height / 2, 600, 300);
                fill(255, 220);
                textAlign(CENTER);
                textFont("Georgia");
                textSize(100);
                text("YOU LOST", width / 2, height / 2 + 25);
                textSize(45);
                text("Best: " + highestScore?.[0]?.duration + ' seconds', width / 2, height / 2 - 100);
                textSize(25);
                text("Press F5 to restart", width / 2, height / 2 + 100);
                pop();
                setTimeout(noLoop, 2000);
            }
            inGameInstruction();
            endGame();
        }
    } else if (mode == 2) {
        if (counterLv < 6) {
            background(255);
            background(121, 121, 40, 200);
        }

        if (alpha < 200) {
            alpha++;
        } else alpha = 200;
        let mappingAlpha = map(alpha, 0, 200, 255, 0);
        background(255, 210, 211); // light pink
        background(0, mappingAlpha);
        drawRoad();
        displayRoad();
        for (let i = 0; i < rows; i++) {
            push();
            fill(255);
            strokeWeight(3);
            line(0, i * d, width, i * d);
            textAlign(CENTER);
            textFont("Georgia");
            textSize(50);
            text(number[i], d + 20, (i * d) + 70);

            pop();
        }
        displayBoucingBox();
        displayDestination();

        drawBonuses();
        displayBonuses();


        // drawPunch(); // punch skill is drawn 
        displayPunch();
        drawObstacle();
        displayObstacles();
        displayGear();

        drawEnergy();
        displayEnergy();

        drawBgObjects();
        displayBgObjects();
    }
}

function raceCount() {
    if (frameCount % 60 == 0) {
        counter--;
    }

    if (counter > 0) {
        push();
        fill(51, 200);
        stroke(255);
        strokeWeight(5);
        rectMode(CENTER);
        rect(width / 2, height / 2, height - 200, height - 100);
        pop()
        // traffic lights counter
        push();
        fill(51, 200);
        strokeWeight(4);
        translate(width / 2, height - height / 3);
        ellipse(0, 0, d - 60, d - 60);
        ellipse(-d, 0, d - 60, d - 60);
        ellipse(d, 0, d - 60, d - 60);
        if (counter == 3) {
            fill(255, 0, 0);
            ellipse(-d, 0, d - 60, d - 60);
        } else if (counter == 2) {
            fill(255, 255, 0);
            ellipse(0, 0, d - 60, d - 60);
        } else if (counter == 1) {
            fill(0, 255, 0);
            ellipse(d, 0, d - 60, d - 60);
        }
        pop();

        push();
        // text for race count
        textAlign(CENTER);
        textFont("Georgia");
        fill(255, 255, 0, 100);
        textSize(45);
        text("RACE STARTS IN", width / 2, height / 2 - 100);
        fill(255);
        textSize(80);
        text(counter, width / 2, height / 2);
        pop();
    } else {
        counter = 0;
        if (raceStart) {

            raceStartSound.play();

            for (let i = 0; i < turtles.length; i++) {

                turtles[i].move();
            }


            myTurtle.move();
        }
        raceStart = false;
        startGame = true; // start drawing all the game elements when game starts

        playDuration();
    }
}

function playDuration() {
    if (durationCount) {

        // start counting duration players take to win first level (in seconds)
        if (frameCount % 60 == 0) {
            duration++;
        }
    }
}

function mouseReleased() {
    if (mode == 0) {
        if (!instruction && !aboutMe && !inspiration && !reference) {
            if (countTime >= 150) {
                if (btn.clicked()) {
                    btn.show();
                    mode = 1;
                }
            }
        }
    }
}

function mousePressed() {
    if (btn.clickedGameEnter()) {
        Race = true;
        mobileResize = false;
        touchScreen = false;
    }
    if (mode == 0) {
        if (countTime >= 150) {
            btn.clicking();
        }

        //instruction
        if (btn.clickedInstruction()) {
            instruction = true;
            aboutMe = false;
            inspiration = false;
            reference = false;
        } else if (btn.close()) {
            // if (instruction) {
            instruction = false;
            aboutMe = false;
            inspiration = false;
            reference = false;
            scaleCounter = 0;
        }

        // about me
        else if (btn.clickedAboutMe()) {
            aboutMe = true;
            instruction = false;
            inspiration = false;
            reference = false;
        } else if (btn.close()) {
            aboutMe = false;
            instruction = false;
            inspiration = false;
            reference = false;
            scaleCounter = 0;
        }

        // inspiration
        else if (btn.clickedInspiration()) {
            inspiration = true;
            aboutMe = false;
            instruction = false;
            reference = false;
        } else if (btn.close()) {
            inspiration = false;
            aboutMe = false;
            instruction = false;
            reference = false;
            scaleCounter = 0;
        }

        // reference
        else if (btn.clickedRef()) {
            reference = true;
            inspiration = false;
            aboutMe = false;
            instruction = false;
        } else if (btn.close()) {
            reference = false;
            inspiration = false;
            aboutMe = false;
            instruction = false;
            scaleCounter = 0;
        }
    }
}


function draw() {
    currentFrame = (currentFrame + 1) % numFrames; // loop throught image array
    
    background(51);
    if (loading) {
        let w = 600 * loadingCounter / (numImg + numSounds);
        mappingScale = map(w, 0, 600, 0, 100);
        push();
        textAlign(CENTER);
        textSize(25);
        if (loadingCounter < numImg) {
            textFont("Georgia");
            text("Loading... " + int(mappingScale), width / 2, height / 2 + 50);
        } else {
            text("It may take a while to load sound package for the first time..." + int(mappingScale), width / 2, height / 2 + 50);
            textSize(20);
            text("If it's taking too long, try hitting F5 to refresh the page...", width / 2, height / 2 + 90);
        }
        // translate(width / 2, height / 2);
        // rectMode(CENTER);
        stroke(255);
        strokeWeight(4);
        noFill();
        rect(width / 2 - 300, height / 2 - 25, 600, 50);
        fill(255, 100);
        noStroke();
        rect(width / 2 - 300, height / 2 - 25, w, 50);

        pop();
    } else {
        btn.showGameEnter();
        if (Race) {
            gamePlay();

            if (stopGame) noLoop();
        }
    }
}

function displayDestination() {
    if (level == 1) {
        destination.show();
        destination.move();
        destination.predict();
    } else if (level == 2) {
        destination.show();
        destination.move();
        destination.predict();
    }

}

function endGame() {
    for (let g = 0; g < gear.length; g++) {
        if (myTurtle.lose(gear[g])) {
            // console.log("END GAME");
            // HealthBar = 0;
            push();
            fill(51, 100);
            rectMode(CENTER);
            rect(width / 2, height / 2, 600, 300);
            fill(255, 220);
            textAlign(CENTER);
            textFont("Georgia");
            textSize(100);
            text("YOU LOST", width / 2, height / 2 + 25);
            textSize(45);
            text("Best: " + highestScore?.[0]?.duration + ' seconds', width / 2, height / 2 - 100);
            textSize(25);
            text("Press F5 to restart", width / 2, height / 2 + 100);
            pop();
            setTimeout(noLoop, 500);
        }
        // other turtles lose
        for (let i = turtles.length - 1; i >= 0; i--) {
            if (turtles.length > 0) {
                if (turtles[i].lose(gear[g])) {
                    turtles.splice(i, 1);
                    punchFinishSound.play();
                }
            }
        }

        // lv 2 transition process
        if (level == 1) {
            if (turtles.length == 0) {

                if (frameCount % 60 == 0) {
                    counterLv++;
                    // }
                }
                if (counterLv < 6) {
                    push();
                    fill(51, 100);
                    rectMode(CENTER);
                    rect(width / 2, height / 2, 1000, 350);
                    fill(255);
                    textAlign(CENTER);
                    textFont("Georgia");
                    textSize(40);
                    text('Duration: ' + duration + ' seconds', width / 2, height / 2 - 70);
                    textSize(30);
                    text('And Have Punched Other Turtles ' + punchCount + ' times', width / 2, height / 2 + 120);
                    textSize(80);
                    text("BOSS IS COMING!!!", width / 2, height / 2 + 25);
                    pop();
                } else if (counterLv == 6) {
                    destination.x = random(50000, 100000);
                    counterLv = 6;
                    level = 2;
                }
            }
        }
    }
}

function displayRoadEn() {
    for (r = roadEn.length - 1; r >= 0; r--) {
        roadEn[r].show();
    }
}

function drawObstacle() {
    let car = random(carImg);
    if (frameCount % 90 == 0) {
        if (random(1) < 0.4) {
            obstacles.push(new Obs(car));
        }
    }
}

function displayObstacles() {
    for (let a = obstacles.length - 1; a >= 0; a--) {
        obstacles[a].show();
        obstacles[a].move();
        obstacles[a].update();
        if (obstacles[a].hits(myTurtle)) { // if an obstacle hits turtle
            obstacles.splice(a, 1); // that obstacle disappears
            carCrashSound.play();
            myTurtle.x -= 80; // turtle is pushed back for 80px
            if (HealthBar > 0) {
                HealthBar -= 20;
                healthBarEmpty = false;
            }
        } else if (obstacles[a].offScreen()) { // or if it's off screen
            obstacles.splice(a, 1); // make it disappear
        }
        if (HealthBar <= 0) {
            HealthBar = 0;
            healthBarEmpty = true;
        }
    }
}

function displayBoucingBox() {
    for (let box = 0; box < bouncingObstacles.length; box++) {
        bouncingObstacles[box].show();
        // bouncingObstacles[box].update();
        if (bouncingObstacles[box].collide(myTurtle)) {
            myTurtle.myspeed *= -0.63;
        }
    }
}

function displayFlags() {
    for (f = flags.length - 1; f >= 0; f--) {
        flags[f].show();
        flags[f].update();

        if (flags[f].disappear()) {
            flags.splice(f, 1);
        }
    }
}

function displayGear() {

    for (let g = 0; g < gear.length; g++) {
        // gear[g].show();
        gear[g].move();
        gear[g].update();
        gear[g].spinning();
    }

}

function drawHeart() {
    if (HealthBar < 100) {
        if (random(1) < 0.0025) {
            hearts.push(new Heart());
        }
    }
}

function displayHeart() {
    for (let heart = hearts.length - 1; heart >= 0; heart--) {
        hearts[heart].show();
        hearts[heart].move();
        hearts[heart].update();
        if (myTurtle.pickUps(hearts[heart])) {
            hearts.splice(heart, 1);
            heartPickedSound.play();
            if (HealthBar < 100) {
                HealthBar += 5;
            }
        }
        if (HealthBar >= 100) {
            HealthBar = 100;
        }
        if (HealthBar == 0) {
            HealthBar = 0; // to make sure health bar won't go up after losing
        }
    }
}

function displayPunch() {
    for (let j = punch.length - 1; j >= 0; j--) {
        punch[j].show();
        punch[j].update();
        // console.log("SKILL SHOWN");
        if (punch[j].offScreen()) {
            // delete every item left in the array 
            // for better access to the order of the new item
            punch.splice(j, 5);
        }

        // if hits myTurtle
        if (punch[j].hits(myTurtle)) {
            punch.splice(j, 5);
            punchSound.play();
            myTurtle.myspeed -= 1.75;
            if (HealthBar > 0) {
                HealthBar -= 10;
                healthBarEmpty = false;
            }
            // console.log(HealthBar);
        }
        if (HealthBar <= 0) {
            HealthBar = 0;
            healthBarEmpty = true;
        }
        // lv 2
        // check collision with boss turtle
        if (level == 2) {
            if (punch[j].hurt(bossTurtle)) {
                punch.splice(j, 5);
                punchSound.play();
                if (bossHealthBar > 0) {
                    bossHealthBar -= 5;
                    // console.log(bossHealthBar);
                }
            }
            if (bossHealthBar <= 0) {
                if (!finishBoss) {
                    punchFinishSound.play();
                    finishBoss = true;

                    // stop counting duration
                    durationCount = false;
                }
                bossTurtle.lose();
                bossHealthBar = 0;
                setTimeout(resetGameDisplay, 2200);
            }
        }
    }


    // if (punch.length > 20) {
    //     punch.length = 0;
    //     console.log("RESET: " + punch.length);
    // }
}

async function resetGameDisplay() {
    // stop the game loop
    noLoop();

    push();
        fill(51, 100);
        rectMode(CENTER);
        rect(width / 2, height / 2, 600, 350);
        fill(255);
        textAlign(CENTER);
        textFont("Georgia");
        textSize(100);
        text("YOU WON", width / 2, height / 2 + 25);
        textSize(45);
        text("Best: " + highestScore?.[0]?.duration + ' seconds', width / 2, height / 2 - 100);

        // check if there is data from the database
        if (highestScore !== undefined || highestScore !== null) {
            // and if the current duration is less than the highest score duration (new duration record)
            if (duration < highestScore?.[0]?.duration) {

                if (endingCnt < 1) {

                    endingCnt++;

                    await updateScoreBoard();
                }

                // change fill colour
                fill(0, 255, 0, 200);
            } else fill(255, 0, 0, 200);
        }
        text("Duration: " + duration + ' seconds', width / 2, height / 2 + 100);
    pop();
}

function displayThumbnail() {
    push();
    //thumbnail
    fill(0);
    textAlign(CENTER);
    textFont("Georgia");
    textSize(20);
    text("X" + countBonus, width / 2 - d, 20);
    image(boxingGloveImg, width / 2 - d - 50, 0, 30, 20);

    //thumbnail
    fill(0);
    textAlign(CENTER);
    textFont("Georgia");
    textSize(20);
    text("X", width / 2 + 65, 20);
    // thumbnail
    image(energyImg, width / 2 + 80, 0, 15, 30);
    pop();
}

// function drawSpikes() {
//     for (let s = 0; s < rows; s++) {

//     }
// }

function drawBonuses() {

    drawHeart();
    displayHeart();

    for (let b = 0; b < rows; b++) {
        // if (frameCount % 20 == 0) {
        if (random(1) < 0.001) {
            Glovebonuses.push(new GlovesBonuses(b));
        }
        // }
        if (Glovebonuses.length > 10) {
            if (random(1) < 0.00002) {
                Glovebonuses.push(new GlovesBonuses(b));
            }
        }
    }
}

function displayBonuses() {
    for (let b = Glovebonuses.length - 1; b >= 0; b--) {
        Glovebonuses[b].show();
        Glovebonuses[b].move();
        Glovebonuses[b].update();
        if (Glovebonuses[b].collected(myTurtle)) { // if collected

            // push 5 more bonus items to the array
            for (let j = 0; j < rows; j++) {
                punch.push(new PunchBackwards(j));
                // console.log(punch);
            }
            if (countBonus < 5) {
                countBonus++;
            }
            Glovebonuses.splice(b, 1); // gets spliced  
            punchPickedSound.play();
            keyIsAvailable = true; // choose keys to use skills
        }
    }
}

function displayTurtles() {
    for (let i = turtles.length - 1; i >= 0; i--) {
        if (level == 1) {
            turtles[i].show();
            turtles[i].update();
            if (turtles[i].push(myTurtle)) {
                myTurtle.speed *= -0.5;
            }
            for (let j = punch.length - 1; j >= 0; j--) {
                if (turtles[i].getHit(punch[j])) {
                    punchCount++;
                    punchSound.play();
                    punch.splice(j, 5);
                    turtles[i].x -= 50;
                }
            }
            pushPunch = true;

            for (let b = Glovebonuses.length - 1; b >= 0; b--) {
                if (turtles[i].get(Glovebonuses[b])) { // if other turtles get the bonus
                    for (let j = 0; j < rows; j++) {
                        punch.push(new PunchBackwards(j));
                        // console.log(punch);
                    }
                    Glovebonuses.splice(b, 1);
                    punch[0].move(); // skill will be set on myTurtle way
                }
            }

            // other turtles win
            if (turtles[i].touch(destination)) {
                if (lose) {
                    push();
                    fill(51, 100);
                    rectMode(CENTER);
                    rect(width / 2, height / 2, 600, 300);
                    fill(255);
                    textAlign(CENTER);
                    textFont("Georgia");
                    textSize(100);
                    text("YOU LOST", width / 2, height / 2 + 25);
                    textSize(45);
                    text("Best: " + highestScore?.[0]?.duration + ' seconds', width / 2, height / 2 - 100);
                    textSize(25);
                    text("Press F5 to restart", width / 2, height / 2 + 100);
                    pop();
                    setTimeout(noLoop, 3000);
                }
            } else lose = false;
        }
    }

    myTurtle.show();
    myTurtle.update();
    myTurtle.showHealthBar();
    // lv 2 transition
    if (myTurtle.touch(destination)) {
        if (level == 1) {
            if (frameCount % 60 == 0) {
                counterLv++;
            }
            if (counterLv < 6) {
                if (!lose) {
                    push();
                    fill(51, 100);
                    rectMode(CENTER);
                    rect(width / 2, height / 2, 1000, 350);
                    fill(255);
                    textAlign(CENTER);
                    textFont("Georgia");
                    textSize(40);
                    text('Duration: ' + duration + ' seconds', width / 2, height / 2 - 70);
                    textSize(30);
                    text('And Have Punched Other Turtles ' + punchCount + ' times', width / 2, height / 2 + 120);
                    textSize(80);
                    text("BOSS IS COMING!!!", width / 2, height / 2 + 25);
                    pop();
                }
            } else if (counterLv == 6) {
                destination.x = random(50000, 100000);
                counterLv = 6;
                level = 2;
            }
        } else if (level == 2) {

            if (!lose) {
                setTimeout(resetGameDisplay, 2200);
            }

        }
    } else lose = true;

    // boss comes first
    if (level == 2) {
        if (bossTurtle.touch(destination)) {
            if (lose) {
                push();
                fill(51, 100);
                rectMode(CENTER);
                rect(width / 2, height / 2, 600, 300);
                fill(255);
                textAlign(CENTER);
                textFont("Georgia");
                textSize(100);
                text("YOU LOST", width / 2, height / 2 + 25);
                textSize(45);
                text("Best: " + highestScore?.[0]?.duration + ' seconds', width / 2, height / 2 - 100);
                textSize(25);
                text("Press F5 to restart", width / 2, height / 2 + 100);
                pop();
                setTimeout(noLoop, 3000);
            }
        } else lose = false;
    }



    // boss attack
    if (level == 2) {

        if (bossTurtle.wound(myTurtle)) {
            // console.log("WOUND");
            if (HealthBar > 0) {
                HealthBar -= 0.2;
                healthBarEmpty = false;
            } else {
                HealthBar = 0;
                healthBarEmpty = true;
                lose = true;
            }

        }
    }

}

function drawBgObjects() {
    for (let j = 0; j < rows; j++) {
        if (random(1) < 0.01) {
            bgObjects.push(new BGObject(j));
        }
    }



}

function displayBgObjects() {
    for (let j = bgObjects.length - 1; j >= 0; j--) {
        bgObjects[j].show();
        bgObjects[j].move();
        bgObjects[j].update();

        if (bgObjects[j].offScreen()) {
            bgObjects.splice(j, 1);
        }

    }
}

function drawRoad() {
    // draw road lines in a patterned way in every 3 secs
    if (frameCount % 180 == 0) {
        for (let r = 0; r < rows; r++) {
            bgRoadLines.push(new RoadLines(r));
        }
    }
}

function displayRoad() {
    for (let r = bgRoadLines.length - 1; r >= 0; r--) {
        bgRoadLines[r].show();
        bgRoadLines[r].move();
        // bgRoadLines[r].update();

        if (bgRoadLines[r].offScreen()) {
            bgRoadLines.splice(r, 1);
            // console.log("SWIPED");
        }
    }
}

function drawEnergy() {
    // creating energy constantly for every 1/3 sec
    if (frameCount % 20 == 0) {
        energy.push(new Energy());
    }
}

function displayEnergy() {
    for (let e = energy.length - 1; e >= 0; e--) {
        energy[e].show();
        energy[e].move();

        if (energy[e].offScreen()) {
            energy.splice(e, 1);
            // console.log("Disappear");
        }

        if (energy[e].collected(myTurtle)) {
            energy.splice(e, 1);
            energyPickedSound.play();
            myTurtle.speedUp();
            if (!maxCollection) { // if false
                collection++; // keep counting up
                // console.log(collection);

            }

        } else {
            myTurtle.myspeed -= 0.0005;
        }
    }
}

function drawStaminaBar() {
    let mappingValue = map(collection, 0, 10, 0, 110);
    push();
    //bar
    translate(width / 2 - 60, 0);
    // rectMode(CENTER);
    fill(255, 100);
    strokeWeight(2.5);
    rect(0, 0, 110, 25);
    fill(0, 255, 50);
    rect(0, 0, mappingValue, 25);
    pop();

    if (collection >= 10) { // if count upto maximum
        maxCollection = true; // stop counting
        let mapAlpha = map(sin(frameCount * 3), -1, 1, 0, 255);
        push();
        stroke(255);
        strokeWeight(3);
        fill(100, 100, 100, mapAlpha);
        textAlign(CENTER);
        textSize(17);
        textFont("Georgia");
        if (!touchScreen) {
            text("SPACE BAR", width / 2 - 5, 20);
        } else {
            text("PRESS ME", width / 2 - 5, 20);
        }
        pop();
    }
}

function keyPressed() {
    if (!touchScreen || !mobileResize) {
        if (key == " ") {
                if (collection >= 10) {
                    maxCollection = true;
                    startCarSound.play();
                    myTurtle.myspeed += 1.5;
                    collection = 0;
                }
                maxCollection = false;
            
        }

        if (keyCode === UP_ARROW) {
            myTurtle.controls(-1);
        }

        if (keyCode === DOWN_ARROW) {
            myTurtle.controls(1);
        }

        if (punch.length >= 5) {
            if (keyIsAvailable) {
                if (countBonus > 0) {
                    // hit key from 1 - 5 to show skills
                    if (key == "1") {
                        // if a bonus is collected
                        punch[0].move();
                        countBonus--;
                    } else if (key == "2") {
                        // if a bonus is collected
                        punch[1].move();
                        countBonus--;
                    } else if (key == "3") {
                        // if a bonus is collected
                        punch[2].move();
                        countBonus--;
                    } else if (key == "4") {
                        // if a bonus is collected
                        punch[3].move();
                        countBonus--;
                    } else if (key == "5") {
                        // if a bonus is collected
                        punch[4].move();
                        countBonus--;
                    }
                }
            }
        } else {
            keyIsAvailable = false;
        }
    }
}

function touchStarted() {
    if (btn.clickedGameEnter()) {
        Race = true;
        touchScreen = true;
        mobileResize = true;
    }
    if (touchScreen || mobileResize) {
        if (mode == 0) {
            if (!instruction && !aboutMe && !inspiration && !reference) {
                if (countTime >= 150) {
                    if (btn.clicked()) {
                        mode = 1; 
                    }
                }
            }
            //instruction
            if (btn.clickedInstruction()) {
                instruction = true;
                aboutMe = false;
                inspiration = false;
                reference = false;
            } else if (btn.close()) {
                // if (instruction) {
                instruction = false;
                aboutMe = false;
                inspiration = false;
                reference = false;
                scaleCounter = 0;
            }

            // about me
            else if (btn.clickedAboutMe()) {
                aboutMe = true;
                instruction = false;
                inspiration = false;
                reference = false;
            } else if (btn.close()) {
                aboutMe = false;
                instruction = false;
                inspiration = false;
                reference = false;
                scaleCounter = 0;
            }

            // inspiration
            else if (btn.clickedInspiration()) {
                inspiration = true;
                aboutMe = false;
                instruction = false;
                reference = false;
            } else if (btn.close()) {
                inspiration = false;
                aboutMe = false;
                instruction = false;
                reference = false;
                scaleCounter = 0;
            }

            // reference
            else if (btn.clickedRef()) {
                reference = true;
                inspiration = false;
                aboutMe = false;
                instruction = false;
            } else if (btn.close()) {
                reference = false;
                inspiration = false;
                aboutMe = false;
                instruction = false;
                scaleCounter = 0;
            }
        }
        if (mode == 1) {
            // touch half of the screen on the left to move myTurtle
            if (mouseX > 0 && mouseX < width / 2 - 60) {
                if (mouseY > 0 && mouseY < height / 2) {
                    myTurtle.controls(-1);
                }
            }
    
            if (mouseX > 0 && mouseX < width / 2 - 60) {
                if (mouseY > height / 2 && mouseY < height) {
                    myTurtle.controls(1);
                }
            }
    
            // touch energy boost
            else if (mouseX > width / 2 - 60 && mouseX < width / 2 + 50) {
                if (mouseY > 0 && mouseY < 25) {
                    if (collection >= 10) {
                        maxCollection = true;
                        startCarSound.play();
                        myTurtle.myspeed += 1.5;
                        collection = 0;
                    }
                    maxCollection = false;
                }
            }
    
            // touch the other half to use skills
            if (punch.length >= 5) {
                if (keyIsAvailable) {
                    if (countBonus > 0) {
                        if (mouseX > width / 2 + 50 && mouseX < width) { // touch on the other half of the screen to set skills
                            if (mouseY > 0 && mouseY < d) {
                                // if a bonus is collected
                                punch[0].move();
                                countBonus--;
                            }
                        } if (mouseX > width / 2 + 50 && mouseX < width) { // touch on the other half of the screen to set skills
                            if (mouseY > d && mouseY < d * 2) {
                                // if a bonus is collected
                                punch[1].move();
                                countBonus--;
                            }
                        } if (mouseX > width / 2 + 50 && mouseX < width) { // touch on the other half of the screen to set skills
                            if (mouseY > d * 2 && mouseY < d * 3) {
                                // if a bonus is collected
                                punch[2].move();
                                countBonus--;
                            }
                        } if (mouseX > width / 2 + 50 && mouseX < width) { // touch on the other half of the screen to set skills
                            if (mouseY > d * 3 && mouseY < d * 4) {
                                // if a bonus is collected
                                punch[3].move();
                                countBonus--;
                            }
                        } if (mouseX > width / 2 + 50 && mouseX < width) { // touch on the other half of the screen to set skills
                            if (mouseY > d * 4 && mouseY < height / rows * 5) {
                                // if a bonus is collected
                                punch[4].move();
                                countBonus--;
                            }
                        }
                    }
                }
            } else {
                keyIsAvailable = false;
            }
        }
    }
}