import { html } from 'lit-html';

export default class Character {
  constructor(cell, glyph = '@', color = 'red') {
    this.glyph = glyph;
    this.color = color;

    this.cell = cell;
    cell.char = this;
  }

  template() {
    return html`
      <span style="color: ${this.color};">${this.glyph}</span>
    `;
  }

  move(board, { x, y }) {
    // remove character from old cell
    this.cell.char = null;
    // look up new cell position
    const cell = board.grid[y][x];
    // assign new cell to char
    this.cell = cell;
    // assign new char to new cell
    cell.char = this;
  }
};
