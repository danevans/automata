import { html, render } from 'lit-html';
import Character from './character';
import { randItem } from './random';
import Board from './board';

const board = new Board(33, 15);

const characters = [
  new Character(randItem(randItem(board.grid)), 'a', 'olive'),
  new Character(randItem(randItem(board.grid)), 'b', 'green'),
  new Character(randItem(randItem(board.grid)), 'c', 'blue'),
  new Character(randItem(randItem(board.grid)), 'd', 'maroon'),
  new Character(randItem(randItem(board.grid)), 'e', 'cadetblue'),
  new Character(randItem(randItem(board.grid)), 'f', 'brown'),
  new Character(randItem(randItem(board.grid)), 'g', 'navy'),
  new Character(randItem(randItem(board.grid)), 'h', 'chocolate'),
  new Character(randItem(randItem(board.grid)), 'i', 'cornflowerblue'),
  new Character(randItem(randItem(board.grid)), 'j', 'darkgoldenrod'),
  new Character(randItem(randItem(board.grid)), 'k', 'darkslategray'),
  new Character(randItem(randItem(board.grid)), 'l', 'darkolivegreen'),
  new Character(randItem(randItem(board.grid)), 'm', 'firebrick'),
];

const cellTemplate = (cell) => html`
  <span>${cell.char ? cell.char.template() : '.'}</span>
`;

const rowTemplate = (row) => html`
  <div class="row">${row.map(cellTemplate)}</div>
`;

const boardTemplate = (board) => html`
  <div class="board">${board.grid.map(rowTemplate)}</div>
`;

const tickTemplate = (ticks) => html`ticks: <strong>${ticks}</strong>`;

const container = document.getElementById('container');
const tickDiv = document.getElementById('tickDiv');
const autoTick = document.getElementById('autoTick');

let ticks = 0;

const processTick = () => {
  render(boardTemplate(board), container);
  render(tickTemplate(ticks), tickDiv);

  characters.forEach((char) => {
    char.move(board, board.randomCoords(char.cell));
  });
  ticks++;

  if (autoTick.checked) {
    setTimeout(processTick, 200);
  }
};

processTick();

document.getElementById('manualTick').addEventListener('click', processTick);
