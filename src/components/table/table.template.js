const CODES = {
  A: 65,
  Z: 90,
};

function toCell(_, col) {
  return `
    <div class="sell" contenteditable data-col="${col}"></div>
  `;
}

// data-  => это data атрибуты к которым можно обращаться !!!!!!!!!
// обращение к атрибуту происходит через [], пример => const $perent = $resizer.$el.closest('[data-type="resizable"]');

function toColumn(col, index) {
  return `
    <div class="column" data-type="resizable" data-col="${index}">
      ${col}
      <div class="col-resize" data-resize="col"></div>
    </div>
    `;
}

function createRow(index, content) {
  const resize = index ? '<div class="row-resize" data-resize="row"></div>' : '';
  return `
    <div class="row" data-type="resizable">
      <div class="row-info">${index ? index : ''} ${resize}</div>
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

  // console.log('cols', cols);
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
