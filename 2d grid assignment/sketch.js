// 2D Grid Assignment (Game Name: Hungry Cube)
// Michael Blushke
// Feb 8, 2021

let grid;
let rows;
let cols;
let cellWidth;
let cellHeight;
let snakeFacing = "down";
let snakeX = 15;
let snakeY = 0;
let moved = false;
let lastMove = 0;
let moveSpeed = 200;
let lastPosition;
let isAlive = false;
let pointCounter = 0;
let buttonWidth;
let buttonHeight;

function setup() {
  createCanvas(700, 700);

  grid = createEmptyGrid(30, 30);

  rows = grid.length;
  cols = grid[0].length;
  cellWidth = width / cols;
  cellHeight = height / rows;

  spawnFood();
  textAlign(CENTER, CENTER);
  buttonWidth = width/5;
  buttonHeight = height/10;
}

function draw() {
  background(220);
  if (isAlive) {
    moveSnake();

    displayGrid();
  }

  else {
    showScore();
    startButton();
    showInstructions();
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
  rectMode(CORNER);
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

function showSnake() {
  grid[snakeY][snakeX] = 1;
}

function moveSnake() {
  if (!moved) {
    if (millis() >= lastMove + moveSpeed) {
      moved = true;
    }
  }
  if (moved) {
    lastPosition = [snakeY, snakeX];
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
    grid[lastPosition[0]][lastPosition[1]] = 0;
    gameLost();
    if (isAlive) {
      if (grid[snakeY][snakeX] === 9) {
        moveSpeed -= moveSpeed / 10;
        pointCounter += 1;
        spawnFood();
      }
      showSnake();
      lastMove = millis();
      moved = false;
    }
    
  }
}

function gameLost() {
  if (snakeX < 0 || snakeX >= 30 || snakeY < 0 || snakeY >= 30) {
    isAlive = false;
  }
}

function spawnFood() {
  grid[Math.floor(random(1,29))][Math.floor(random(1,29))] = 9;
}


function showScore() {
  //show the time they got only if they played
  if (!isAlive) {
    fill("black");
    textSize(25);
    text("Your Score: " + pointCounter, width/2, height/3);
  }
}

function startButton() {
  //display start button
  rectMode(CENTER);
  fill("white");
  rect(width/2, height/1.5, buttonWidth, buttonHeight);
  textSize(25);
  fill("black");
  text("START", width/2, height/1.5);
}
  
function mousePressed() {
  //check if start button is pressed
  if (mouseX > width/2 - buttonWidth/2 && mouseX < width/2 + buttonWidth/2 && 
      mouseY > height/1.5 - buttonHeight/2 && mouseY < height/1.5 + buttonHeight/2) {
    if (!isAlive) {
      isAlive = true; 
      snakeX = 15;
      snakeY = 0;
      snakeFacing = "down";  
      pointCounter = 0;
      moveSpeed = 200; 
    }
  }
}
  
function showInstructions() {
  textSize(15);
  text("Use WASD to move. Eat as much food as you can without hitting the boundaries!", width/2, height/1.15);
}