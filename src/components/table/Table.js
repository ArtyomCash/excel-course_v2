import { ExcelComponent } from '@core/ExcelComponent';
import { $ } from '@core/dom';
import { createTable } from '@/components/table/table.template';
import { resizeHandler } from '@/components/table/table.resize';
import {isCell, shouldResize} from '@/components/table/table.functions';
import { TableSelection } from '@/components/table/TableSelection';

export class Table extends ExcelComponent {
  static className = 'excel__table';

  constructor($root) {
    super($root, {
      // listeners: ['click', 'mousedown', 'mousemove', 'mouseup'],
      listeners: ['mousedown'],
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

    const $cell = this.$root.find('[data-id="0:0"]');
    this.selection.select($cell);
  }

  onMousedown(event) {
    // console.log('mousedown', event.target.getAttribute('data-resize'));
    // console.log('mousedown', event.target.dataset);
    if (shouldResize(event)) {
      // console.log('Start resizing', event.target.dataset.resize);
      resizeHandler(this.$root, event);
    } else if (isCell(event)) {
      const $target = $(event.target);
      this.selection.select($target);
    }
  }

  /* onClick() {
    console.log('click');
  }

  onMousedown(event) {
    console.log('mousedown', event.target);
  }

  onMousemove() {
    console.log('mousemove');
  }

  onMouseup() {
    console.log('mouseup');
  }*/
}
