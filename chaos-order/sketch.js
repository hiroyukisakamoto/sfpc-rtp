let rectSize;
let seed;

function setup() {
    const ww = windowWidth / 3;
    createCanvas(ww, ww);
    noStroke();
    frameRate(10);

    rectSize = width / 12;
}
function draw() {
    background(20);
    seed = map(mouseX, 0, width, 0, TWO_PI);

    for (a = 0; a < 2; a++) {
        for (s = 0; s < 2; s++) {
            let n = a * 2 + s;

            push();
            translate(width / 2, height / 2);
            rotate(n * TWO_PI * 0.25);
            quadrant(0, 0);
            pop();
        }
    }
}

function quadrant(X, Y) {
    for (i = 0; i < 6; i++) {
        for (e = 0; e < 6; e++) {
            let x = X + i * rectSize;
            let y = Y + e * rectSize;

            let k = i * 6 + e + 1;

            let r1 = seed + k * mouseY * 0.01;

            let xoff = map(noise(k), 0, 1, -0.05, 0.05);
            let yoff = map(noise(k), 0, 1, -0.05, 0.05);

            bracket(x, y, xoff, yoff, 0, 0, r1, 0);
            bracket(x, y, -xoff, -yoff, 0.12, 0.12, r1, PI + 0.33);
        }
    }
}

function bracket(X, Y, XOFF1, YOFF1, XOFF2, YOFF2, R1, R2) {
    coord = [
        { x: -0.5, y: -0.5 },
        { x: 0, y: -0.5 },
        { x: 0, y: -0.25 },
        { x: -0.25, y: -0.25 },
        { x: -0.25, y: 0.25 },
        { x: 0, y: 0.25 },
        { x: 0, y: 0.5 },
        { x: -0.5, y: 0.5 },
    ];

    for (q = 0; q < coord.length; q++) {
        coord[q].x = coord[q].x + XOFF1;
        coord[q].y = coord[q].y + YOFF1;
    }

    for (q = 0; q < coord.length; q++) {
        coord[q].x = coord[q].x + XOFF2;
        coord[q].y = coord[q].y + YOFF2;
    }

    for (q = 0; q < coord.length; q++) {
        tempX = coord[q].x;
        tempY = coord[q].y;

        let dist = sqrt(pow(tempX, 2) + pow(tempY, 2));

        let ang = atan2(tempX, tempY) + R2 + R1;

        coord[q].x = sin(ang) * dist;
        coord[q].y = cos(ang) * dist;
    }

    for (q = 0; q < coord.length; q++) {
        coord[q].x = coord[q].x + 0.5;
        coord[q].y = coord[q].y + 0.5;
    }

    fill(254, 254, 253);
    beginShape();

    for (q = 0; q < coord.length; q++) {
        let q2 = q + 1;
        // there must be a better way of returning q2 to zero ( % ? )
        if (q2 == coord.length) {
            q2 = 0;
        }

        lineCollide(
            X,
            Y,
            coord[q].x * rectSize * 1.25 - rectSize * 0.125,
            coord[q].y * rectSize * 1.25 - rectSize * 0.125,
            coord[q2].x * rectSize * 1.25 - rectSize * 0.125,
            coord[q2].y * rectSize * 1.25 - rectSize * 0.125
        );
    }

    endShape(CLOSE);
}

function lineCollide(X, Y, X1, Y1, X2, Y2) {
    let xDiff = X2 - X1;
    let yDiff = Y2 - Y1;
    let len = sqrt(pow(xDiff, 2) + pow(yDiff, 2));

    let xStep = xDiff / len;
    let yStep = yDiff / len;

    let Xpos = X + X1;
    let Ypos = Y + Y1;

    for (p = 1; p <= len; p++) {
        Xpos += xStep;
        Ypos += yStep;

        let actX = Xpos;
        let actY = Ypos;

        if (Xpos < X - 1) {
            actX = X - 1;
        }
        if (Xpos > X + rectSize + 1) {
            actX = X + rectSize + 1;
        }
        if (Ypos < Y - 1) {
            actY = Y - 1;
        }
        if (Ypos > Y + rectSize + 1) {
            actY = Y + rectSize + 1;
        }
        vertex(actX, actY);
    }
}
