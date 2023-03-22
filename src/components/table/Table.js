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
      const type = $resizer.data.resize;

      console.log(type);

      const cell = this.$root.findAll(`[data-col="${$perent.data.col}"]`);

      document.onmousemove = (e) => {
        if (type === 'col') {
          const delta = e.pageX - coords.right;
          const value = coords.width + delta;
          // $perent.$el.style.width = value + 'px';
          $perent.css({width: value + 'px'});
          cell.forEach((el) => (el.style.width = value + 'px'));
        } else {
          const delta = e.pageY - coords.bottom;
          const value = coords.height + delta;
          $perent.css({height: value + 'px'});
          // $perent.$el.style.height = value + 'px';
        }
        // e.pageX текщее положение мыши, отсчитывается с левого края
        // console.log('e.pageX>>>', e.pageX);
        /* console.log('mousemove');
        const delta = e.pageX - coords.right;
        const value = coords.width + delta;
        $perent.$el.style.width = value + 'px';
        cell.forEach((el) => el.style.width = value + 'px');*/
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
