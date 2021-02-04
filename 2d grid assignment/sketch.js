// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let snakeFacing = "down";
let snakeX = 15;
let snakeY = 15;
let moved = false;
let lastMove = 0;
let moveTime = 200;
let theSnake = [];
let snakeCopy;
let snakeCopy2;

function setup() {
  createCanvas(700, 700);

  grid = createEmptyGrid(30, 30);

  rows = grid.length;
  cols = grid[0].length;
  cellWidth = width / cols;
  cellHeight = height / rows;

  theSnake.push[snakeY, snakeX, snakeFacing]
}

function draw() {
  background(220);
  
  moveSnake();
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

function keyPressed() {
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
      //empty
      if (grid[y][x] === 0) {
        fill("white");
      }
      //snake head
      else if (grid[y][x] === 1) {
        fill("blue");
      }
      //snake body
      else if (grid[y][x] === 2) {
        fill("green");
      }
      //food
      else if (grid[y][x] === 9) {
        fill("black");
      }
      //display
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
  theSnake[0] = snakeCopy
  grid[theSnake[0][0]][theSnake[0][1]] = 1;
  for (let i=1; i<theSnake.length-1; i++) {
    snakeCopy.push(theSnake[i]);
    theSnake[i] = snakeCopy[0];
    grid[theSnake]
    snakeCopy.splice(0, 1);
  }
  grid[oldY][oldX] = 2;
  }

function moveSnake() {
  if (!moved) {
    if (millis() >= lastMove + moveTime) {
      moved = true
    }
  }
  if (moved) {
    oldX = snakeX;
    oldY = snakeY;
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
    lastMove = millis();
    moved = false;
  }
}