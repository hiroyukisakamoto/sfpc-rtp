function setup() {
    const ww = windowWidth / 3;
    createCanvas(ww, ww);
    noStroke();
    fill(30);
}

function draw() {
    background(241, 236, 233);
    let light = color(214, 212, 215);
    let dark = color(61, 61, 61);

    let hSpace = (height - 20) / 26;
    let wSpace = width / 13;

    let y = hSpace / 2 + 10.5;
    let count = 0;

    while (y < height) {
        let inset = wSpace / 2;

        if (count % 2 != 0) {
            inset = wSpace;
        }
        let x = inset;

        let tempH = sqrt(pow(y - (height - mouseY), 2)) * 0.18 + 3;
        if (tempH > hSpace) {
            tempH = hSpace;
        }

        while (x < width - inset / 2) {
            let step = (x / wSpace) * 2.5 + count + 9 + frameCount * 0.5;
            let tempFill = lerpColor(
                dark,
                light,
                map(sin(step * 0.15), -1, 1, 0, 1)
            );
            fill(tempFill);
            ellipse(x, y, hSpace, tempH);
            x += wSpace;
        }
        y += tempH;
        count++;
    }
}
