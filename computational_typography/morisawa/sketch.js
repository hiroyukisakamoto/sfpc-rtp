var letters = [];
var font;
var fontSize = 900;
var textTyped = "モリサワ";

let a = 0.0;

function preload() {
    const url =
        "https://fonts.gstatic.com/ea/notosansjapanese/v6/NotoSansJP-Bold.otf";
    font = loadFont(url);
}

function setup() {
    const ww = 700;
    createCanvas(ww, ww);
    background(255);
    textSize(width / 4);
    textStyle(BOLD);
    textAlign(CENTER, TOP);
    textFont(font);
    noStroke();
    // noLoop();
}

function draw() {
    let inc = TWO_PI / 25.0;
    let time = millis() / 50;
    // fill('rgba(255,255,255,0.1)');
    // rect(0, 0, width, height);
    push();
    translate(width / 2, height);
    if (time * 1.94 < height) {
        // rotate(time);
        scale(sin(a), time / (height * 0.5));
        noFill();
        strokeWeight(1);
        stroke("rgba(0, 0, 0, 0.15)");
        text(textTyped, 0, -time * 2);
        a = a + inc;
    } else if (height <= time * 2) {
        fill(0);
        noStroke();
        text(textTyped, 0, -height - 60);
        // noLoop();
    }
    pop();
    // console.log(sin(a));
    // createLetters();
}
