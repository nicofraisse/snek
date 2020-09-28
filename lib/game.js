import { Snake } from './snake'
import { Food } from './food'
import { coordToIndex } from './helpers'

class Game {
  constructor() {
    // Must be same width and height to work properly
    this.gameWidth = 10;
    this.gameHeight = 10;
    this.intendedDirection = 'right';
    this.thereMayBeFood = false;
    this.snakeSize = 1;
    this.gameSpeed = 200;
  }

  listenToControls() {
    document.addEventListener('keydown', (event) => {
      switch(event.keyCode) {
        case 37:
          this.intendedDirection = "left"
          break;
        case 38:
          this.intendedDirection = "up"
          break;
        case 39:
          this.intendedDirection = "right"
          break;
        case 40:
          this.intendedDirection = "down"
          break;
      }
    });
  }

  play() {
    this.drawGrid(this.gameWidth, this.gameHeight)
    setTimeout(() => {
      const snake = new Snake()
      const food = new Food()
      setTimeout(() => {
        food.findAGoodSpot(this.gameWidth, this.gameHeight, snake.body)
        this.thereMayBeFood = true
      }, 2500)
      this.listenToControls()
      this.gameInterval = setInterval(() => this.nextStep(snake, this.intendedDirection, food), this.gameSpeed)
    }, 1000)
  }

  nextStep(snake, intendedDirection, food) {
    const newSnakeBody = snake.move(this.gameWidth, this.gameHeight, intendedDirection)
    const headX = newSnakeBody[newSnakeBody.length - 1].x
    const headY = newSnakeBody[newSnakeBody.length - 1].y
    if (headX === food.x && headY === food.y) {
      snake.grow()
      this.snakeSize++
      food.findAGoodSpot(this.gameWidth, this.gameHeight, snake.body)
    }
    this.drawSnakeAndFood(newSnakeBody, food)
    this.checkForDeath(snake)
    this.updateStats()
  }

  checkForDeath(snake) {
    const snakeBodyCopy = [...snake.body]
    const head = snakeBodyCopy[snakeBodyCopy.length - 1]
    const headlessBody = [...snakeBodyCopy].slice(1, snakeBodyCopy.length - 1)
    headlessBody.forEach(pos => {
      if (pos.x === head.x && pos.y === head.y) {
        document.querySelector('#lost-modal').style.display = 'flex';
        clearInterval(this.gameInterval)
      }
    })
  }

  drawSnakeAndFood(snakeBody, food) {
    const cellData = document.querySelectorAll('td');
    const headX = snakeBody[snakeBody.length - 1].x
    const headY = snakeBody[snakeBody.length - 1].y
    const tailX = snakeBody[0].x
    const tailY = snakeBody[0].y
    if (headX === tailX && headY === tailY) {
      return;
    }
    cellData[coordToIndex(headX, headY, this.gameWidth)].style.backgroundColor = 'blue'
    cellData[coordToIndex(tailX, tailY, this.gameWidth)].style.backgroundColor = 'white'
    if (this.thereMayBeFood) {
      cellData[coordToIndex(food.x, food.y, this.gameWidth)].style.backgroundColor = 'red'
    }
  }

  drawGrid(width, height) {
    const gameGrid = document.querySelector('.game-grid tbody');
    for (let x = 0; x < width + 1; x++ ) {
      gameGrid.innerHTML += `<tr data-row=${x}></tr>`
      for (let y = 0; y < height + 1; y++) {
        gameGrid.querySelector(`tr[data-row="${x}"]`).innerHTML += '<td></td>'
      }
    }
  }

  updateStats() {
    document.querySelector('#snake-size').innerHTML = this.snakeSize;
  }
}

export { Game };
