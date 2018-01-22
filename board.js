import { randItem, randBool } from './random';

class Cell {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

const createN = (n, f) => [...Array(n)].map((_, index) => f(index));
const createCells = (row, n) => createN(n, index => new Cell(index, row));
const createRows = (n, width) => createN(n, index => createCells(index, width));

export default class Board {
  constructor(height, width) {
    // There are problems inheriting directly from Array
    this.grid = createRows(height, width);

    this.height = height;
    this.width = width;
  }

  randomCoords({ x, y }) {
    const coords = { x, y };
    if (randBool()) {
      const dir = randItem(['x', 'y']);
      const limit = this[dir === 'x' ? 'width' : 'height'];
      let newValue = (coords[dir] + randItem([-1, 1])) % limit;
      if (newValue < 0) {
        newValue = limit - 1;
      }
      coords[dir] = newValue;
    }
    return coords;
  }
}
