class Snake {
  constructor() {
    this.size = 1
    this.body = [
      // Snake's last node is invisible. It is colored back to white as snake goes forward
      { x: 3, y: 3 }, // This is a fake snake tile
      { x: 4, y: 4 }, // This is a real snake tile
    ]
    this.direction = 'right'
  }

  move(gameWidth, gameHeight, intendedDir) {
    if (
      !(
        (intendedDir === 'right' && this.direction === 'left') ||
        (intendedDir === 'left' && this.direction === 'right') ||
        (intendedDir === 'up' && this.direction === 'down') ||
        (intendedDir === 'down' && this.direction === 'up')
      )
    ) {
      this.direction = intendedDir
    }
    const bd = this.body
    switch (this.direction) {
      case 'right':
        if (bd[bd.length - 1].x === gameWidth) {
          bd.push({
            x: 0,
            y: bd[bd.length - 1].y,
          })
        } else {
          bd.push({
            x: bd[bd.length - 1].x + 1,
            y: bd[bd.length - 1].y,
          })
        }
        break
      case 'left':
        if (bd[bd.length - 1].x === 0) {
          bd.push({
            x: gameWidth,
            y: bd[bd.length - 1].y,
          })
        } else {
          bd.push({
            x: bd[bd.length - 1].x - 1,
            y: bd[bd.length - 1].y,
          })
        }
        break
      case 'up':
        if (bd[bd.length - 1].y === 0) {
          bd.push({
            x: bd[bd.length - 1].x,
            y: gameHeight,
          })
        } else {
          bd.push({
            x: bd[bd.length - 1].x,
            y: bd[bd.length - 1].y - 1,
          })
        }
        break
      case 'down':
        if (bd[bd.length - 1].y === gameHeight) {
          bd.push({
            x: bd[bd.length - 1].x,
            y: 0,
          })
        } else {
          bd.push({
            x: bd[bd.length - 1].x,
            y: bd[bd.length - 1].y + 1,
          })
        }
        break
    }
    bd.shift()
    return this.body
  }

  grow() {
    this.body.unshift({
      x: this.body[0].x,
      y: this.body[0].y,
    })
  }
}

export { Snake }
