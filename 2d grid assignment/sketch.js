// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let snakeFacing = "down";
let snakeX = 15;
let snakeY = 15;

function setup() {
  createCanvas(700, 700);

  grid = createEmptyGrid(30, 30);

  rows = grid.length;
  cols = grid[0].length;
  cellWidth = width / cols;
  cellHeight = height / rows;
}

function draw() {
  background(220);
  
  //moveSnake();
  snakeInGrid();

  displayGrid();
}

function mousePressed() {
  let x = Math.floor(mouseX / cellWidth);
  let y = Math.floor(mouseY / cellHeight);

  if (grid[y][x] === 1) {
    grid[y][x] = 0;
  }
  else if (grid[y][x] === 0) {
    grid[y][x] = 1;
  }
}

function keyIsPressed() {
  if (key === "w") {
    snakeFacing = "up";
  }
  else if (key === "a") {
    snakeFacing = "left";
  }
  else if (key === "s") {
    snakeFacing = "down";
  }
  else if (key === "d") {
    snakeFacing = "right";
  }
  console.log(snakeFacing);
}

function displayGrid() {
  for (let y=0; y<rows; y++) {
    for (let x=0; x<cols; x++) {
      if (grid[y][x] === 0) {
        fill("white");
      }
      else if (grid[y][x] === 1){
        fill("green");
      }
      else if (grid[y][x] === 9) {
        fill("black")
      }


      rect(x*cellWidth, y*cellHeight, cellWidth, cellHeight);
    }
  }
}

function createEmptyGrid(cols, rows) {
  let emptyGrid = [];
  for (let y=0; y<rows; y++) {
    emptyGrid.push([]);
    for (let x=0; x<cols; x++) {
      emptyGrid[y].push(0);
    }
  }
  return emptyGrid;
}

function snakeInGrid() {
  grid[snakeY][snakeX] = 1;
}

function moveSnake() {
  if (snakeFacing === "down") {
    snakeY += 1;
  }
  else if (snakeFacing === "up") {
    snakeY -= 1;
  }
  else if (snakeFacing === "left") {
    snakeX -= 1;
  }
  else if (snakeFacing === "right") {
    snakeX += 1;
  }
}