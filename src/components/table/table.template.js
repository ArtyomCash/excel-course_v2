const CODES = {
  A: 65,
  Z: 90,
};

const DEFAULT_WIDTH = 120;

function getWidth(state, index) {
  return (state[index] || DEFAULT_WIDTH) + 'px';
}

function toCell(state, row) {
  return function(_, col) {
    const width = getWidth(state.colState, col);
    return `
      <div 
        class="sell" 
        contenteditable 
        data-col="${col}"
        data-type="cell"
        data-id="${row}:${col}"
        style="width: ${width}"
      ></div>
  `;
  };
}

// data-  => это data атрибуты к которым можно обращаться !!!!!!!!!
// обращение к атрибуту происходит через [], пример => const $perent = $resizer.$el.closest('[data-type="resizable"]');

function toColumn({col, index, width}) {
  return `
    <div class="column" data-type="resizable" data-col="${index}" style="width: ${width}">
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

function widthWidthFrom(state) {
  return function(col, index) {
    return {
      col,
      index,
      width: getWidth(state.colState, index),
    };
  };
}

export function createTable(rowCount = 15, state = {}) {
  const colsCount = CODES.Z - CODES.A + 1;
  const rows = [];

  const cols = new Array(colsCount)
      .fill('')
      .map(toChar)
      .map(widthWidthFrom(state))
      .map(toColumn)
      /* .map((col, index) => {
        const width = getWidth(state.colState, index);
        return toColumn(col, index, width);
      })*/
      .join('');

  // console.log('cols', cols);
  rows.push(createRow(null, cols));

  for (let row = 0; row < rowCount; row++) {
    const cells = new Array(colsCount)
        .fill('')
        // .map((_, col) => toCell(row, col))
        .map(toCell(state, row))
        .join('');
    rows.push(createRow(row + 1, cells));
  }

  return rows.join('');
}
