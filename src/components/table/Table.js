import { ExcelComponent } from '@core/ExcelComponent';
import { $ } from '@core/dom';
import { createTable } from '@/components/table/table.template';
import { resizeHandler } from '@/components/table/table.resize';
import { isCell, shouldResize, matrix, nextSelector } from '@/components/table/table.functions';
import { TableSelection } from '@/components/table/TableSelection';

export class Table extends ExcelComponent {
  static className = 'excel__table';

  constructor($root, options) {
    super($root, {
      // listeners: ['click', 'mousedown', 'mousemove', 'mouseup'],
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      ...options,
    });
  }

  toHTML() {
    return createTable(20);
  }

  prepare() {
    this.selection = new TableSelection();
  }

  init() {
    super.init();

    this.selectCell(this.$root.find('[data-id="0:0"]'));

    this.$on('formula:input', (text) => {
      this.selection.current.text(text);
      console.log('Table from Formula', text);
    });

    // добавляю прослушку события
    this.$on('formula:done', () => {
      this.selection.current.focus();
    });
    // this.unsubs.push(unsub);
  }

  selectCell($cell) {
    this.selection.select($cell);
    this.$emit('table:select', $cell);
  }

  onMousedown(event) {
    // console.log('mousedown', event.target.getAttribute('data-resize'));
    // console.log('mousedown', event.target.dataset);
    if (shouldResize(event)) {
      // console.log('Start resizing', event.target.dataset.resize);
      resizeHandler(this.$root, event);
    } else if (isCell(event)) {
      const $target = $(event.target);
      if (event.shiftKey) {
        const $cells = matrix($target, this.selection.current).map((id) => this.$root.find(`[data-id="${id}"]`));
        this.selection.selectGroup($cells);
      } else {
        this.selection.select($target);
      }
    }
  }

  onKeydown(event) {
    const keys = ['Enter', 'Tab', 'ArrowLeft', 'ArrowRight', 'ArrowDown', 'ArrowUp'];
    const { key } = event;
    // !event.shiftKey  => при зажатии шифта можно переместиться на новую строку
    // при нажатии на Enter - переходим на новую ячейку
    if (keys.includes(key) && !event.shiftKey) {
      event.preventDefault();
      const id = this.selection.current.id(true);
      const $next = this.$root.find(nextSelector(key, id));
      this.selectCell($next);
    }
  }
  // вызываем destroy чтобы удалить слушателя
  /* destroy() {
    super.destroy();
    this.unsubs.forEach((unsub) => unsub());
  }*/
  onInput(event) {
    this.$emit('table:input', $(event.target));
  }
}
