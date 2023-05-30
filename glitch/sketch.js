let feed;
let xspace = 4;
let yspace = 4;

function preload() {
    feed = createCapture(VIDEO);
    feed.hide();
}

function setup() {
    createCanvas(640, 480);
    noFill();
    strokeWeight(1);
    stroke(255);
}

function draw() {
    background(0);
    //image(feed,0,0);
    feed.loadPixels();

    for (let e = 0; e < height / yspace; e++) {
        let y = height * 0.125 + e * yspace * 0.75;
        beginShape();
        for (let i = 0; i < width / xspace; i++) {
            let x = width * 0.125 + i * xspace * 0.75;
            let yoff = sin(frameCount * 0.1 + x * 0.01) * 20; // frameCount%yspace;

            let index = (y * width + x) * 4;
            let brightness =
                (feed.pixels[index] +
                    feed.pixels[index + 1] +
                    feed.pixels[index + 2]) /
                3;
            let offset = map(brightness, 0, 255, 0, 10);
            let tempy = y + offset + yoff;

            curveVertex(x, tempy);
        }
        endShape();
    }
}
