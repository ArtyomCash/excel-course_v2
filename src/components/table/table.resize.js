import { $ } from '@core/dom';

export function resizeHandler($root, event) {
  return new Promise((resolve) => {
    const $resizer = $(event.target);
    // const $perent = $resizer.$el.parentNode;
    // .closest() - получить ближайшего родителя по условию
    // const $perent = $resizer.$el.closest('.column');
    const $perent = $resizer.closest('[data-type="resizable"]');
    const coords = $perent.getCoords();
    const type = $resizer.data.resize;
    const sideProp = type === 'col' ? 'bottom' : 'right';
    let value;

    $resizer.css({
      opacity: 1,
      // zIndex: 1000,
      [sideProp]: '-5000px',
    });

    console.log(type);

    // const cell = this.$root.findAll(`[data-col="${$perent.data.col}"]`);

    document.onmousemove = (e) => {
      if (type === 'col') {
        const delta = e.pageX - coords.right;
        value = coords.width + delta;
        $resizer.css({ right: -delta + 'px' });
        // $perent.$el.style.width = value + 'px';
      } else {
        const delta = e.pageY - coords.bottom;
        value = coords.height + delta;
        $resizer.css({ bottom: -delta + 'px' });
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
      document.onmouseup = null;

      if (type === 'col') {
        $perent.css({ width: value + 'px' });
        $root.findAll(`[data-col="${$perent.data.col}"]`).forEach((el) => (el.style.width = value + 'px'));
      } else {
        $perent.css({ height: value + 'px' });
      }
      // debugger;
      // нахожу id столбца который нужно сохранить вместе со значением
      resolve({
        value,
        type,
        // id: type === 'col' ? $perent.data.col : $perent.data.row,
        id: $perent.data[type],
      });

      $resizer.css({
        opacity: 0,
        bottom: 0,
        right: 0,
      });
    };
  });
}
