import p5 from "p5";

const app = p => {
  p.setup = _ => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.background(0);

    p.translate(p.width / 2, p.height);
    drawBranch(p.TWO_PI, -200, 20, 50);
  };

  p.draw = _ => {};

  function drawBranch(degrees, offsetY, branchThickness, color) {
    p.rotate(degrees);
    p.stroke(color);
    p.strokeWeight(branchThickness);
    p.line(0, 0, 0, offsetY);
    p.translate(0, offsetY);
    if (offsetY < -4) {
      p.push();
      drawBranch(
        p.PI / 6,
        offsetY * 0.81,
        branchThickness * 0.71,
        (color = color * 1.13)
      );
      p.pop();
      p.push();
      drawBranch(
        p.PI / -6,
        offsetY * 0.67,
        branchThickness * 0.71,
        (color = color * 1.13)
      );
      p.pop();
    }
    if (offsetY > -4) {
      p.fill(196, p.random(255), p.random(55));
      p.random(100) >= 90 ? p.ellipse(0, 0, 3, 3) : void(0);
    }
  }
};

const appInstance = new p5(app);
