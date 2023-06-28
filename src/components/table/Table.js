import { ExcelComponent } from '@core/ExcelComponent';
import { $ } from '@core/dom';
import { createTable } from '@/components/table/table.template';
import { resizeHandler } from '@/components/table/table.resize';
import { isCell, shouldResize, matrix, nextSelector } from '@/components/table/table.functions';
import { TableSelection } from '@/components/table/TableSelection';
import * as actions from '@/redux/action';

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
    return createTable(20, this.store.getState());
  }

  prepare() {
    this.selection = new TableSelection();
  }

  init() {
    super.init();

    this.selectCell(this.$root.find('[data-id="0:0"]'));

    this.$on('formula:input', (text) => {
      this.selection.current.text(text);
      this.updateTextInStore(text);
    });

    // добавляю прослушку события
    this.$on('formula:done', () => {
      this.selection.current.focus();
    });
    // this.unsubs.push(unsub);

    /* this.$subscribe((state) => {
      console.log('TableState', state);
    });*/
  }

  selectCell($cell) {
    this.selection.select($cell);
    this.$emit('table:select', $cell);
    // this.$dispatch({ type: 'TEST' });
  }

  async resizeTable(event) {
    try {
      const data = await resizeHandler(this.$root, event);
      this.$dispatch(actions.tableResize(data));
      console.log('Resize data', data);
    } catch (e) {
      console.warn('Resize error', e.message);
    }
  }

  onMousedown(event) {
    // console.log('mousedown', event.target.getAttribute('data-resize'));
    // console.log('mousedown', event.target.dataset);
    if (shouldResize(event)) {
      // console.log('Start resizing', event.target.dataset.resize);
      // отвечает за размер колонки
      this.resizeTable(event);
    } else if (isCell(event)) {
      const $target = $(event.target);
      if (event.shiftKey) {
        const $cells = matrix($target, this.selection.current).map((id) => this.$root.find(`[data-id="${id}"]`));
        this.selection.selectGroup($cells);
      } else {
        this.selectCell($target);
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

  updateTextInStore(value) {
    this.$dispatch(
        actions.changeText({
          id: this.selection.current.id(),
          value,
        })
    );
  }

  /* onInput(event) {
    // this.$emit('table:input', $(event.target));
    // в changeText передаём объект в который передаём id и текст
    this.$dispatch(
        actions.changeText({
          id: this.selection.current.id(),
          value: $(event.target).text(),
        })
    );
  }*/
  onInput(event) {
    this.updateTextInStore($(event.target).text());
  }
}
