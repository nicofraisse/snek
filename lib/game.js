import { Snake } from './snake'
import { Food } from './food'
import { coordToIndex } from './helpers'

class Game {
  constructor() {
    this.gameWidth = 9;
    this.gameHeight = 9;
    this.cellData = document.querySelectorAll('td');
    this.intendedDirection = 'right';
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
    const snake = new Snake()
    const food = new Food()
    this.listenToControls()
    this.gameInterval = setInterval(() => this.nextStep(snake, this.intendedDirection, food), 200)
  }

  nextStep(snake, intendedDirection, food) {
    const newSnakeBody = snake.move(this.gameWidth, this.gameHeight, intendedDirection)
    const headX = newSnakeBody[newSnakeBody.length - 1].x
    const headY = newSnakeBody[newSnakeBody.length - 1].y
    if (headX === food.x && headY === food.y) {
      snake.grow()
      food.findAGoodSpot(this.gameWidth, this.gameHeight, snake.body)
    }
    this.draw(newSnakeBody, food)
    this.checkForDeath(snake)
  }

  checkForDeath(snake) {
    const snakeBodyCopy = [...snake.body]
    const head = snakeBodyCopy[snakeBodyCopy.length - 1]
    const headlessBody = [...snakeBodyCopy].slice(1, snakeBodyCopy.length - 1)
    headlessBody.forEach(pos => {
      if (pos.x === head.x && pos.y === head.y) {
        clearInterval(this.gameInterval)
      }
    })
  }

  draw(snakeBody, food) {
    const headX = snakeBody[snakeBody.length - 1].x
    const headY = snakeBody[snakeBody.length - 1].y
    const tailX = snakeBody[0].x
    const tailY = snakeBody[0].y
    if (headX === tailX && headY === tailY) {
      return;
    }
    this.cellData[coordToIndex(headX, headY, this.gameWidth)].style.backgroundColor = 'blue'
    this.cellData[coordToIndex(tailX, tailY, this.gameWidth)].style.backgroundColor = 'white'
    this.cellData[coordToIndex(food.x, food.y, this.gameWidth)].style.backgroundColor = 'red'
  }
}

export { Game };
