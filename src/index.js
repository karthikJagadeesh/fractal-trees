import p5 from "p5";

const app = p => {
  p.setup = _ => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.background(0);

    p.translate(p.width / 2, p.height);
    drawBranch(p.TWO_PI, -200, 20);
  };

  p.draw = _ => {};

  function drawBranch(degrees, offsetY, branchThickness) {   
    p.rotate(degrees);
    p.stroke(p.random(255), p.random(255), p.random(255));
    p.strokeWeight(branchThickness);
    p.line(0, 0, 0, offsetY);
    p.translate(0, offsetY);
    if (offsetY < -4) {
      p.push();
      drawBranch(p.PI / 6, offsetY * 0.67, branchThickness * 0.71);
      p.pop();
      p.push();
      drawBranch(p.PI / -6, offsetY * 0.67, branchThickness * 0.71);
      p.pop();
    }
  }
};

const appInstance = new p5(app);
