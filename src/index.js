class Snake {
  constructor() {
    this.size = 1;
    this.body = [
      // Snake's last node is invisible. It is here to be colored in white in the page, which
      // is more efficient than coloring all tiles in the grid everytime snake moves.
      {x: 3, y: 3}, // This is a fake snake tile
      {x: 4, y: 4}, // This is a real snake tile
    ]
    this.direction = 'right';
  }

  move(gameWidth, gameHeight, intendedDir) {
    if (!((intendedDir === "right" && this.direction === "left") ||
        (intendedDir === "left" && this.direction === "right") ||
        (intendedDir === "up" && this.direction === "down") ||
        (intendedDir === "down" && this.direction === "up"))) {
      this.direction = intendedDir;
    }
    const bd = this.body;
    switch(this.direction) {
      case "right":
        if (bd[bd.length - 1].x === gameWidth) {
          bd.push({
            x: 0,
            y: bd[bd.length - 1].y
          })
        } else {
          bd.push({
            x: bd[bd.length - 1].x + 1,
            y: bd[bd.length - 1].y
          })
        }
        break;
      case "left":
        if (bd[bd.length - 1].x === 0) {
          bd.push({
            x: gameWidth,
            y: bd[bd.length - 1].y
          })
        } else {
          bd.push({
            x: bd[bd.length - 1].x - 1,
            y: bd[bd.length - 1].y
          })
        }
        break;
      case "up":
        if (bd[bd.length - 1].y === 0) {
          bd.push({
            x: bd[bd.length - 1].x,
            y: gameHeight
          })
        } else {
          bd.push({
            x: bd[bd.length - 1].x,
            y: bd[bd.length - 1].y - 1
          })
        }
        break;
      case "down":
        if (bd[bd.length - 1].y === gameHeight) {
          bd.push({
            x: bd[bd.length - 1].x,
            y: 0
          })
        } else {
          bd.push({
            x: bd[bd.length - 1].x,
            y: bd[bd.length - 1].y + 1
          })
        }
        break;
    }
    bd.shift();
    return this.body;
  }

  grow() {
    this.body.unshift({
      x: this.body[0].x,
      y: this.body[0].y
    })
  }
}

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
      food.findAGoodSpot(this.gameWidth, this.gameHeight, snake.body, this.coordToIndex)
    }
    this.handleDisplay(newSnakeBody, food)
    this.checkForDeath(snake)
  }

  checkForDeath(snake) {
    const snakeBodyCopy = [...snake.body]
    console.log('hi')
    const head = snakeBodyCopy[snakeBodyCopy.length - 1]
    const headlessBody = [...snakeBodyCopy].slice(1, snakeBodyCopy.length - 1)
    console.log(headlessBody)
    console.log(snake.body)
    headlessBody.forEach(pos => {
      if (pos.x === head.x && pos.y === head.y) {
        console.log('')
        console.log(pos)
        console.log(head)
        console.log('')
        clearInterval(this.gameInterval)
      }
    })
  }

  handleDisplay(snakeBody, food) {
    const headX = snakeBody[snakeBody.length - 1].x
    const headY = snakeBody[snakeBody.length - 1].y
    const tailX = snakeBody[0].x
    const tailY = snakeBody[0].y
    this.cellData[this.coordToIndex(headX, headY, this.gameWidth)].style.backgroundColor = 'blue'
    this.cellData[this.coordToIndex(tailX, tailY, this.gameWidth)].style.backgroundColor = 'white'

    // Make sure food.x and food.y actually exist yet
    setTimeout(() => {
      this.cellData[this.coordToIndex(food.x, food.y, this.gameWidth)].style.backgroundColor = 'red'
    }, 100)
  }

  coordToIndex(x, y, width) {
    return x + (y * (width + 1))
  }
}

class Food {
  constructor() {
    this.x = 7,
    this.y = 7
  }
  findAGoodSpot(w, h, snakePos, coordToIndex) {
    let retry = true;
    let tryPosition = null;
    while (retry) {
      retry = false
      tryPosition = Math.floor(Math.random() * coordToIndex(w, h, w));
      snakePos.forEach(pos => {
        if (coordToIndex(pos.x, pos.y, w) === tryPosition) {
          retry = true
        }
      })
    }
    [this.x, this.y] = this.indexToCoord(tryPosition, w);
  }
  indexToCoord(i, width) {
    return [i % (width + 1), Math.floor(i / (width + 1))]
  }
}

const game = new Game()
game.play()
