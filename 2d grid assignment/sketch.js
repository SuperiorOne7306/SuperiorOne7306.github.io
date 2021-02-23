// 2D Grid Assignment (Game Name: Hungry Cube)
// Michael Blushke
// Feb 8, 2021

let grid;
let rows;
let cols;
let cellWidth;
let cellHeight;
let cubeFacing = "down";
let cubeX = 15;
let cubeY = 0;
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
  //during game
  if (isAlive) {
    moveCube();

    displayGrid();
  }

  //menu
  else {
    showScore();
    startButton();
    showInstructions();
  }
}

function keyPressed() {
  //wasd controls
  if (key === "w") {
    cubeFacing = "up";
  }
  else if (key === "a") {
    cubeFacing = "left";
  }
  else if (key === "s") {
    cubeFacing = "down";
  }
  else if (key === "d") {
    cubeFacing = "right";
  }
  console.log(cubeFacing);
}

function displayGrid() {
  rectMode(CORNER);
  for (let y=0; y<rows; y++) {
    for (let x=0; x<cols; x++) {
      //empty
      if (grid[y][x] === 0) {
        fill("white");
      }
      //cube
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

function showCube() {
  //display cube in grid
  grid[cubeY][cubeX] = 1;
}

function moveCube() {
  //detect if its time to move
  if (!moved) {
    if (millis() >= lastMove + moveSpeed) {
      moved = true;
    }
  }
  if (moved) {
    lastPosition = [cubeY, cubeX];
    if (cubeFacing === "down") {
      cubeY += 1;
    }
    else if (cubeFacing === "up") {
      cubeY -= 1;
    }
    else if (cubeFacing === "left") {
      cubeX -= 1;
    }
    else if (cubeFacing === "right") {
      cubeX += 1;
    }
    grid[lastPosition[0]][lastPosition[1]] = 0;
    gameLost();
    if (isAlive) {
      if (grid[cubeY][cubeX] === 9) {
        moveSpeed -= moveSpeed / 10;
        pointCounter += 1;
        spawnFood();
      }
      showCube();
      lastMove = millis();
      moved = false;
    }
    
  }
}

function gameLost() {
  if (cubeX < 0 || cubeX >= 30 || cubeY < 0 || cubeY >= 30) {
    isAlive = false;
  }
}

function spawnFood() {
  grid[Math.floor(random(1,29))][Math.floor(random(1,29))] = 9;
}


function showScore() {
  //show the score they got
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
      cubeX = 15;
      cubeY = 0;
      cubeFacing = "down";  
      pointCounter = 0;
      moveSpeed = 200; 
    }
  }
}
  
function showInstructions() {
  textSize(15);
  text("Use WASD to move. Eat as much food as you can without hitting the boundaries!", width/2, height/1.15);
}