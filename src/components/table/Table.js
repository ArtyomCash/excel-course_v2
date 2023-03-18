import { ExcelComponent } from '@core/ExcelComponent';
import { createTable } from '@/components/table/table.template';
import { $ } from '@core/dom';

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

  onMousedown(event) {
    // console.log('mousedown', event.target.getAttribute('data-resize'));
    // console.log('mousedown', event.target.dataset);
    if (event.target.dataset.resize) {
      // console.log('Start resizing', event.target.dataset.resize);
      const $resizer = $(event.target);
      // const $perent = $resizer.$el.parentNode;
      // .closest() - получить ближайшего родителя по условию
      // const $perent = $resizer.$el.closest('.column');
      const $perent = $resizer.closest('[data-type="resizable"]');
      const coords = $perent.getCoords();

      document.onmousemove = (e) => {
        // e.pageX текщее положение мыши, отсчитывается с левого края
        // console.log('e.pageX>>>', e.pageX);
        // console.log('mousemove');
        const delta = e.pageX - coords.right;
        const value = coords.width + delta;
        $perent.$el.style.width = value + 'px';
        // console.log('delta', delta);
      };
      // удаляю событие на мышки когда отпускаю кнопку мышки
      document.onmouseup = () => {
        document.onmousemove = null;
      };
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
