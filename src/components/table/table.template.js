const CODES = {
  A: 65,
  Z: 90,
};

function toCell() {
  return `
    <div class="sell" contenteditable></div>
  `;
}

function toColumn(col) {
  return `
    <div class="column">
      ${col}
    </div>
    `;
}

function createRow(index, content) {
  return `
    <div class="row">
      <div class="row-info">${index ? index : ''}</div>
      <div class="row-data">${content}</div>
    </div>
  `;
}
// если элемент не используется (входящий параметр) то его можно заменить плейсхолдером "_"

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index);
}

export function createTable(rowCount = 15) {
  const colsCount = CODES.Z - CODES.A + 1;
  const rows = [];

  const cols = new Array(colsCount).fill('').map(toChar).map(toColumn).join('');

  console.log('cols', cols);
  rows.push(createRow(null, cols));

  for (let i = 0; i < rowCount; i++) {
    const cells = new Array(colsCount)
        .fill('')
        .map(toCell)
        .join('');
    rows.push(createRow(i + 1, cells));
  }

  return rows.join('');
}
