let scale = 0.0015;
let rectSize = 25;
let ring = [];
let rings = 9;

function setup() {
    const ww = windowWidth / 3;
    createCanvas(ww, ww);
    stroke(140, 200, 215);
    strokeWeight(3);
    frameRate(60);

    for (t = 0; t < rings; t++) {
        ring.push(new CubeRing(t));
    }
}

function draw() {
    background(5, 180);
    for (t = 0; t < rings; t++) {
        ring[t].show();
    }
}

function CubeRing(N) {
    this.cubeArr = [];
    this.count = 0;
    this.start = N * random(50, 150);
    this.x = random(width * 0.5, width * 0.6);
    this.XZ = random(0.02, 0.04);
    this.YZ = random(0.02, 0.04);
    this.XY = random(0.02, 0.04);
    this.orbitX = random(-0.01, -0.007);
    this.orbitY = random(0.001, 0.01);
    this.orbitZ = random(0.01, 0.02); //random(0.003,0.006);

    this.show = () => {
        push();
        translate(this.x, 100);
        if (frameCount > this.start) {
            this.count++;

            for (p = 0; p < this.cubeArr.length; p++) {
                this.cubeArr[p].show();
                this.cubeArr[p].rotateXZ(this.XZ);
                this.cubeArr[p].rotateYZ(this.YZ);
                this.cubeArr[p].rotateXY(this.XY);
                this.cubeArr[p].orbit(this.orbitX, this.orbitY, this.orbitZ);
            }
            if (this.count % 15 === 0) {
                this.cubeArr.push(new CubeObj(100, -300, 250));
            }
            if (this.cubeArr.length > 15) {
                this.cubeArr.pop();
            }
        }
        pop();
    };
}

function CubeObj(X, Y, Z) {
    this.pos = {
        x: X,
        y: Y,
        z: Z,
    };

    this.vertex = [];

    for (xx = -1; xx <= 1; xx += 2) {
        for (yy = -1; yy <= 1; yy += 2) {
            for (zz = -1; zz <= 1; zz += 2) {
                this.vertex.push({
                    x: xx,
                    y: yy,
                    z: zz,
                });
            }
        }
    }

    this.line = [
        { p1: 0, p2: 1 },
        { p1: 1, p2: 3 },
        { p1: 3, p2: 2 },
        { p1: 2, p2: 0 },
        { p1: 0, p2: 4 },
        { p1: 1, p2: 5 },
        { p1: 2, p2: 6 },
        { p1: 3, p2: 7 },
        { p1: 4, p2: 5 },
        { p1: 5, p2: 7 },
        { p1: 7, p2: 6 },
        { p1: 6, p2: 4 },
    ];

    this.show = () => {
        for (i = 0; i < this.line.length; i++) {
            this.drawLine(this.line[i].p1, this.line[i].p2);
        }
    };

    this.drawLine = (P1, P2) => {
        let s1 = 1 / (1 + this.pos.z * scale);
        let scaledX1 = (this.pos.x + this.vertex[P1].x * rectSize) * s1;
        let scaledY1 = (this.pos.y + this.vertex[P1].y * rectSize) * s1;

        let s2 = 1 / (1 + this.pos.z * scale);
        let scaledX2 = (this.pos.x + this.vertex[P2].x * rectSize) * s2;
        let scaledY2 = (this.pos.y + this.vertex[P2].y * rectSize) * s2;
        //strokeWeight(10*s1/2);
        line(scaledX1, scaledY1, scaledX2, scaledY2);
    };

    this.rotateXY = (ANG) => {
        for (q = 0; q < this.vertex.length; q++) {
            let tempX = this.vertex[q].x;
            let tempY = this.vertex[q].y;

            let dist = sqrt(pow(tempX, 2) + pow(tempY, 2));
            let ang = atan2(tempX, tempY) + ANG;

            this.vertex[q].x = sin(ang) * dist;
            this.vertex[q].y = cos(ang) * dist;
        }
    };
    this.rotateXZ = (ANG) => {
        for (q = 0; q < this.vertex.length; q++) {
            let tempX = this.vertex[q].x;
            let tempZ = this.vertex[q].z;

            let dist = sqrt(pow(tempX, 2) + pow(tempZ, 2));
            let ang = atan2(tempX, tempZ) + ANG;

            this.vertex[q].x = sin(ang) * dist;
            this.vertex[q].z = cos(ang) * dist;
        }
    };
    this.rotateYZ = (ANG) => {
        for (q = 0; q < this.vertex.length; q++) {
            let tempY = this.vertex[q].y;
            let tempZ = this.vertex[q].z;

            let dist = sqrt(pow(tempY, 2) + pow(tempZ, 2));
            let ang = atan2(tempY, tempZ) + ANG;

            this.vertex[q].y = sin(ang) * dist;
            this.vertex[q].z = cos(ang) * dist;
        }
    };

    this.translate = (X, Y, Z) => {
        this.pos.x += X;
        this.pos.y += Y;
        this.pos.z += Z;
    };

    this.orbit = (ANG1, ANG2, ANG3) => {
        let distA = sqrt(pow(this.pos.x, 2) + pow(this.pos.y, 2));
        let angA = atan2(this.pos.x, this.pos.y) + ANG1;
        this.pos.x = sin(angA) * distA;
        this.pos.y = cos(angA) * distA;

        let distB = sqrt(pow(this.pos.x, 2) + pow(this.pos.z, 2));
        let angB = atan2(this.pos.x, this.pos.z) + ANG2;
        this.pos.x = sin(angB) * distB;
        this.pos.z = cos(angB) * distB;

        let distC = sqrt(pow(this.pos.y, 2) + pow(this.pos.z, 2));
        let angC = atan2(this.pos.y, this.pos.z) + ANG3;
        this.pos.y = sin(angC) * distC;
        this.pos.z = cos(angC) * distC;
    };
}
