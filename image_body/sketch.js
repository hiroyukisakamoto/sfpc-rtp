let feed;

let drop = [];

function preload() {
    feed = createCapture(VIDEO);
    feed.hide();
}

function setup() {
	createCanvas(640, 480);

    fill(255, 0, 0);

    for (let i = 0; i < 100; i++) {
        drop.push(new Dropper(i * (width / 100)));
    }
}

function draw() {
    customThresh(100, feed);
    image(feed, 0, 0);

    loadPixels();

    for (let i in drop) {
        drop[i].show();
        drop[i].fall(100);
    }
}

function customThresh(THRESH, IMG) {
    IMG.loadPixels();
    for (let i = 0; i < IMG.height; i++) {
        for (let e = 0; e < IMG.width; e++) {
            let index = (i * IMG.width + e) * 4;
            let sum = 0;
            for (let q = 0; q < 3; q++) {
                sum += IMG.pixels[index + q];
            }
            let avg = sum / 3;
            let f = 255;
            if (avg < THRESH) {
                f = 0;
            }
            for (let q = 0; q < 3; q++) {
                IMG.pixels[index + q] = f;
            }
        }
    }
    IMG.updatePixels();
}

function Dropper(I) {
    this.x = I;
    this.y = 0;

    this.speed = 1;
    this.gravity = 0.4;
    this.bounce = random(-0.3, -0.2);

    this.show = () => {
        text("A", this.x, this.y);
    };

    this.fall = (THRESH) => {
        this.y += this.speed;
        this.speed += this.gravity;

        let index0 = (floor(this.y) * width + floor(this.x)) * 4;
        let index1 = (floor(this.y + 5) * width + floor(this.x)) * 4;

        let f0 = (pixels[index0] + pixels[index0 - 1] + pixels[index0 + 2]) / 3;
        let f1 = (pixels[index1] + pixels[index1 - 1] + pixels[index1 + 2]) / 3;

        if (f0 < THRESH && f1 < THRESH) {
            let mv = 0;
            let src = 0;
            while (src < THRESH) {
                let t_index = index0 - mv * width * 4;
                src =
                    (pixels[t_index] +
                        pixels[t_index + 1] +
                        pixels[t_index + 2]) /
                    3;
                mv++;
            }
            this.y = this.y - mv;
            this.speed *= this.bounce;
        } else if (f1 <= THRESH) {
            //this.speed = 0;
            this.speed *= this.bounce;
        }

        if (this.y > height) {
            this.y = 0;
            this.speed = 1;
            this.x = random(0, width);
        }
    };
}
