let inputDir = { x: 0, y: 0 };
const foodSound = new Audio("../food.mp3");
const gameOverSound = new Audio("../gameover.mp3");
const moveSound = new Audio("../move.mp3");
const musicSound = new Audio("../music.mp3");
let speed = 7;
let score = 0;
let lastPaintTime = 0;
let snakearray = [{ x: 13, y: 15 }];
let food = { x: 6, y: 10 };

function main(ctime) {
  window.requestAnimationFrame(main);
  if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
    return;
  }
  lastPaintTime = ctime;
  gameEngine();
}
function isCollide(sarr) {
  //   if you bump into yourself

  for (let i = 1; i < snakearray.length; i++) {
    if (sarr[i].x === sarr[0].x && sarr[i].y === sarr[0].y) {
      console.log("yourself");
      return true;
    }
  }
  // if you bump into the wall
  if (sarr[0].x >= 18 || sarr[0].x <= 0 || sarr[0].y >= 18 || sarr[0].y <= 0) {
    console.log("wall");
    return true;
  }
}
function gameEngine() {
  // Updating the snake array & Food
  if (isCollide(snakearray)) {
    score = 0;
    // gameOverSound.play();
    // musicSound.pause();
    inputDir = { x: 0, y: 0 };
    alert("game over press any key to play again");
    // musicSound.play();
    snakearray = [{ x: 13, y: 15 }];
  }
  //if you have eaten the food ,increament the score and regenrate the food
  if (snakearray[0].y === food.y && snakearray[0].x === food.x) {
    foodSound.play();
    score++;
    if (score > hiscoreval) {
      hiscoreval = score;
      localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
      hiscoreBox.innerHTML = "HiScore =" + hiscoreval;
    }
    scoreBox.innerHTML = "Score =" + score;
    snakearray.unshift({
      x: snakearray[0].x + inputDir.x,
      y: snakearray[0].y + inputDir.y,
    });
    let a = 2;
    let b = 16;
    food = {
      x: Math.round(a + (b - a) * Math.random()),
      y: Math.round(a + (b - a) * Math.random()),
    };
  }

  //moving snake
  for (let i = snakearray.length - 2; i >= 0; i--) {
    snakearray[i + 1] = { ...snakearray[i] };
  }
  snakearray[0].x += inputDir.x;
  snakearray[0].y += inputDir.y;
  // display the snake
  board.innerHTML = "";
  snakearray.forEach((e, index) => {
    snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;
    if (index == 0) {
      snakeElement.classList.add("head");
    } else {
      snakeElement.classList.add("snake");
    }
    board.appendChild(snakeElement);
  });
  //   display the food
  foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add("food");
  board.appendChild(foodElement);
}

let hiscore = localStorage.getItem("hiscore");
if (hiscore === null) {
  let hiscoreval = 0;
  localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
} else {
  hiscoreval = JSON.parse(hiscore);
  hiscoreBox.innerHTML = "HiScore =" + hiscore;
}

window.addEventListener("keydown", (e) => {
  inputDir = { x: 0, y: 1 }; //start game
  moveSound.play();
  switch (e.key) {
    case "ArrowUp":
      inputDir.x = 0;
      inputDir.y = -1;
      break;
    case "ArrowDown":
      inputDir.x = 0;
      inputDir.y = 1;
      break;
    case "ArrowLeft":
      inputDir.x = -1;
      inputDir.y = 0;
      break;
    case "ArrowRight":
      inputDir.x = 1;
      inputDir.y = 0;
      break;
    default:
      break;
  }
});
window.requestAnimationFrame(main);
