import p5 from "p5";

const appBack = p => {
  let shootingStarSpeed = 1;
  let shootingStarSpeedTrail = -50;
  let shootingStarPosY;

  let startColor;
  let endColor;

  let stars = [];

  const showMoon = _ => {
    p.noStroke();
    p.fill(252, 246, 234);
    p.ellipse(150, 150, 180, 180);
  }

  class Star {
    constructor(size, color, posx, posy) {
      this.size = size;
      this.color = color;
      this.posx = posx;
      this.posy = posy;
    }

    show() {
      p.noStroke();
      p.fill(this.color);
      p.ellipse(this.posx, this.posy, this.size);
    }

  }

  p.setup = _ => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    startColor = p.color(96, 64, 119);
    endColor = p.color(8, 1, 10);
    shootingStarPosY = p.random(p.height / 3);

    drawSky();

    for (let i = 0; i < 250; i++) {
      let starPosY = p.random(p.height / 1.56);
      let starColor = [252, 246, 234, 100]; 
      if (i > 400) {
        starColor = [252, 246, 234, 0.8];
      }           
      let starSize = p.random(1, 4);
      let starPosX = p.random(p.width);
      stars.push(new Star(starSize, starColor, starPosX, starPosY));
    }

    showMoon();

  };

  p.draw = _ => {
    stars.forEach(star => {
      // star.twinkle();
      star.show();
    });

    p.noStroke();
    p.fill(226, 197, 247);
    p.ellipse(
      (shootingStarSpeed = shootingStarSpeed + 0.1),
      shootingStarPosY,
      94,
      2
    );

    const lerpValue = p.map(shootingStarPosY, 0, p.height, 0, 1);
    const exactBackgroundColor = p.lerpColor(startColor, endColor, lerpValue);
    p.fill(exactBackgroundColor);
    p.ellipse(
      (shootingStarSpeedTrail = shootingStarSpeedTrail + 0.1),
      shootingStarPosY,
      64,
      2
    );
  };

  function drawSky() {
    p.strokeWeight(2);
    for (let i = 0; i < p.height; i++) {
      const lerpValue = p.map(i, 0, p.height, 0, 1);
      const middleColor = p.lerpColor(startColor, endColor, lerpValue);
      p.stroke(middleColor);
      p.line(0, i, p.width, i);
    }
  }

  p.windowResized = _ => p.resizeCanvas(p.windowWidth, p.windowHeight);
};

const appFront = p => {
  p.setup = _ => {
    let canvas = p.createCanvas(p.windowWidth, p.windowHeight);

    p.translate(p.width / 2, p.height);
    drawBranch(p.TWO_PI, -200, 80, [25, 14, 4]);
  };

  function drawBranch(degrees, offsetY, branchThickness, color) {
    p.rotate(degrees);
    p.stroke(color);
    p.strokeWeight(branchThickness);
    p.line(0, 0, 0, offsetY);
    p.translate(0, offsetY);
    if (offsetY < -4) {
      p.push();
      drawBranch(
        p.PI / 5,
        offsetY * 0.81,
        branchThickness * 0.61,
        (color = [color[0] * 1.13, color[1] * 1.13, color[2] * 1.13])
      );
      p.pop();
      p.push();
      drawBranch(
        p.PI / -6,
        offsetY * 0.67,
        branchThickness * 0.71,
        (color = [color[0] * 1.13, color[1] * 1.13, color[2] * 1.13])
      );
      p.pop();
    }
    if (offsetY > -4) {
      p.fill(196, p.random(255), p.random(55));
      p.random(100) >= 80 ? p.ellipse(0, 0, p.random(1, 4)) : void 0;
    }
  }
};

const appInstanceBack = new p5(appBack);
const appInstanceFront = new p5(appFront);
