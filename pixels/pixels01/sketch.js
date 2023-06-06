function setup() {
    const ww = 700;
    createCanvas(ww, ww);
}

function draw() {
    stroke(255, 255, 255);
    strokeWeight(0.3);

    for (let x = 0; x <= width; x += random(7, 10)) {
        for (let y = 0; y <= height; y += 10) {
            push();

            translate(x, y);
            rotate(random(-0.1, 0.1));
            let rN = random(100);

            if (rN > 0) {
                fill(36, 49, 87);
            }
            if (rN > 50) {
                fill(27, 33, 50);
            }
            if (rN > 55 && rN < 65) {
                fill(194, 196, 199);
            }
            if (rN > 80 && rN < 90) {
                fill(117, 172, 184);
            }
            if (rN > 90 && rN < 100) {
                fill(160, 40, 66);
            }
            rect(0, 0, random(7, 10), random(7, 15));
            pop();
        }
    }
    for (let a = 50; a <= width; a += random(0, 100)) {
        for (let b = 50; b <= height; b += 100) {
            push();
            translate(a, b);
            rotate(random(-0.1, 0.1));
            fill(222, 209, 122);

            rect(0, 0, random(7, 10), random(7, 15));
            pop();
        }
    }

    for (let c = 60; c <= width; c += 100) {
        for (let d = 60; d <= height; d += random(100, 200)) {
            push();
            translate(c, d);
            rotate(random(-0.1, 0.1));
            fill(164, 129, 187);

            rect(0, 0, random(7, 10), random(7, 15));
            pop();
        }
    }
    for (let e = 70; e <= width; e += 70) {
        for (let f = 70; f <= height; f += random(200, 300)) {
            push();
            translate(e, f);
            rotate(random(-0.1, 0.1));
            fill(221, 99, 62);

            rect(0, 0, random(7, 10), random(7, 15));
            pop();
        }
    }
    for (let g = 80; g <= width; g += random(200, 300)) {
        for (let h = 70; h <= height; h += 80) {
            push();
            translate(g, h);
            rotate(random(-0.1, 0.1));
            fill(134, 192, 170);

            rect(0, 0, random(7, 10), random(7, 15));
            pop();
        }
    }
}
