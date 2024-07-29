let funcInput;
let xScaleInput;
let yScaleInput;
let func = "sin(x)";
let points = [];
let tickGap = 40;
let xScale = 50;
let yScale = 50;
let newFunc = "sin(x)";
let newXScale;
let newYScale;

function setup() {
  createCanvas(600, 600);
  background(30);

  // Create a container for input elements
  let container = createDiv();
  container.class('input-container');

  // Function input elements
  let funcInputLabel = createDiv("y =");
  funcInputLabel.parent(container);

  funcInput = createInput();
  funcInput.size(140);
  funcInput.parent(container);
  funcInput.value(func);

 // Create "Update Function" button
  let updateFuncButton = createButton("Update Function");
  updateFuncButton.parent(container);
  updateFuncButton.mousePressed(applyNewFunction);


  let gap1 = createDiv(" ");
  gap1.parent(container)

  // Axis labels
  let AxisLabel = createDiv("Axis:");
  AxisLabel.parent(container);

  let gap2 = createDiv(" ");
  gap2.parent(container)
  
  let XscaleLabel = createDiv("∆X =");
  XscaleLabel.parent(container);
  xScaleInput = createInput();
  xScaleInput.size(45);
  xScaleInput.parent(container);
  xScaleInput.value(xScale);

  // Create "Update X Scale" button
  let updateXScaleButton = createButton("Update X Scale");
  updateXScaleButton.parent(container);
  updateXScaleButton.mousePressed(applyNewXScale);

  let gap = createDiv(" ");
  gap.parent(container)
  

  let YscaleLabel = createDiv("∆Y =");
  YscaleLabel.parent(container);
  yScaleInput = createInput();
  yScaleInput.size(45);
  yScaleInput.parent(container);
  yScaleInput.value(yScale);

  // Create "Update Y Scale" button
  let updateYScaleButton = createButton("Update Y Scale");
  updateYScaleButton.parent(container);
  updateYScaleButton.mousePressed(applyNewYScale);



}

function draw() {
  background(30);
  drawAxes();
  drawGraph();
}

function drawAxes() {
  stroke(255);
  strokeWeight(2);
  line(0, height / 2, width, height / 2);
  line(width / 2, 0, width / 2, height);

  drawAxisTicks();
}

function drawGraph() {
  noFill();
  beginShape();
  stroke(0, 255, 255);
  strokeWeight(3);
  let x = -(width / 2) * ((width / 8) / xScale);
  while (x < (width / 2) * ((width / 8) / xScale)) {
    let useRadians = newFunc && (newFunc.includes('sin') || newFunc.includes('cos') || newFunc.includes('tan'));
    let xValue = useRadians ? x * (Math.PI / 180) : x;
    let y = evaluateFunction(x);
    vertex(xValue * xScale + width / 2, -y * yScale + height / 2);
    x += 0.05;
  }
  endShape();
}

function applyNewFunction() {
  newFunc = funcInput.value();
  points = [];
}

function applyNewXScale() {
  newXScale = parseFloat(xScaleInput.value());
  xScale = newXScale;
}

function applyNewYScale() {
  newYScale = parseFloat(yScaleInput.value());
  yScale = newYScale;
}

function evaluateFunction(x) {
  let equation = newFunc ? newFunc.replace(/x/g, `(${x.toFixed(2)})`).replace(/sgn\(([^)]+)\)/g, 'Math.sign($1)') : func.replace(/x/g, `(${x.toFixed(2)})`).replace(/sgn\(([^)]+)\)/g, 'Math.sign($1)');
  try {
    return eval(equation);
  } catch (error) {
    return 0;
  }
}

function drawAxisTicks() {
  textSize(12);
  textAlign(CENTER, CENTER);
  stroke(255);
  
  for (let x = 0; x < width / 2 + 1; x += xScale) {
    line(x + width / 2, height / 2 - 5, x + width / 2, height / 2 + 5);
    text(x / xScale, x + width / 2, height / 2 + 20);

    if (x !== 0) {
      line(-x + width / 2, height / 2 - 5, -x + width / 2, height / 2 + 5);
      text(-x / xScale, -x + width / 2, height / 2 + 20);
    }
  }

  for (let y = 0; y < height / 2 + 1; y += yScale) {
    line(width / 2 - 5, -y + height / 2, width / 2 + 5, -y + height / 2);
    text(y / yScale, width / 2 + 20, -y + height / 2);

    if (y !== 0) {
      line(width / 2 - 5, y + height / 2, width / 2 + 5, y + height / 2);
      text(-y / yScale, width / 2 + 20, y + height / 2);
    }
  }
}
