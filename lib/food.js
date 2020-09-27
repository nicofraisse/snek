import { coordToIndex, indexToCoord } from './helpers'

class Food {
  constructor() {
    this.x = 7,
    this.y = 7
  }
  findAGoodSpot(w, h, snakePos) {
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
    [this.x, this.y] = indexToCoord(tryPosition, w);
  }
}

export { Food };
