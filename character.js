import { html } from 'lit-html';

export default class Character {
  constructor(cell, glyph = '@', color = 'red', target) {
    this.glyph = glyph;
    this.color = color;

    this.target = target;

    this.cell = cell;
    cell.char = this;
  }

  template() {
    return html`
      <span style="color: ${this.color};">${this.glyph}</span>
    `;
  }

  moveTo(board, { x, y }) {
    // remove character from old cell
    this.cell.char = null;
    // look up new cell position
    const cell = board.grid[y][x];
    // assign new cell to char
    this.cell = cell;
    // assign new char to new cell
    cell.char = this;
  }

  moveToward(board, target) {
    // simplest version could be a straight line from this.cell to target.cell
    // don't worry about wrapping around the board here
    const xDist = this.cell.x - target.cell.x;
    const yDist = this.cell.y - target.cell.y;
    if (Math.abs(xDist) > Math.abs(yDist)) {
      this.moveTo(board, {
        x: this.cell.x + (xDist > 0 ? -1 : 1),
        y: this.cell.y,
      });
    } else if (yDist !== 0) {
      this.moveTo(board, {
        x: this.cell.x,
        y: this.cell.y + (yDist > 0 ? -1 : 1),
      });
    }
  }

  move(board) {
    if (this.target) {
      this.moveToward(board, this.target);
    } else {
      this.moveTo(board, board.randomCoords(this.cell));
    }
  }
};
