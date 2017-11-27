import p5 from "p5";

const appBack = p => {
  let shootingStarSpeed = 1;
  let shootingStarSpeedTrail = -50;
  let shootingStarPosY;

  let startColor;
  let endColor;

  p.setup = _ => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    startColor = p.color(96, 64, 119);
    endColor = p.color(8, 1, 10);
    shootingStarPosY = p.random(p.height);

    drawSky();
    // p.translate(p.width / 2, p.height + 10);
    // drawBranch(p.TWO_PI, -200, 80, [25, 14, 4]);
  };

  p.draw = _ => {
    if (shootingStarSpeedTrail > p.width + 10) {
      shootingStarPosY = p.random(p.height);
      shootingStarSpeed = 1;
      shootingStarSpeedTrail = -50;
    }
    p.noStroke();
    p.fill(226, 197, 247);
    p.ellipse(
      (shootingStarSpeed = shootingStarSpeed + 2),
      shootingStarPosY,
      94,
      2
    );

    const lerpValue = p.map(shootingStarPosY, 0, p.height, 0, 1);
    const exactBackgroundColor = p.lerpColor(startColor, endColor, lerpValue);
    p.fill(exactBackgroundColor);
    p.ellipse(
      (shootingStarSpeedTrail = shootingStarSpeedTrail + 2),
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

    p.translate(p.width / 2, p.height - 20);
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
