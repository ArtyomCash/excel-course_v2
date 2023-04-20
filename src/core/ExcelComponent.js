import { DomListener } from '@core/DomListener';

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name || '';
    this.emitter = options.emitter;
    this.unsubscribers = [];

    this.prepare();
  }
  // настраиваем наш компонент до init
  prepare() {}

  // возращает шаблон компонента
  toHTML() {
    return '';
  }
  // называем через $ для того что бы не путать с методами котороые сам создал с теми которые приходят с фреймворка
  // уведомляем слушателя про событие
  $emit(event, ...args) {
    this.emitter.emit(event, ...args);
  }

  // Подписываемся на событие event
  $on(event, fn) {
    const unsub = this.emitter.subscribe(event, fn);
    this.unsubscribers.push(unsub);
  }

  // Инициализируем компонент
  // добавляем Dom слушателей
  init() {
    this.initDOMListeners();
  }

  // удаляем компонент
  // чистим слушателя
  destroy() {
    this.removeDOMListeners();
    this.unsubscribers.forEach((unsub) => unsub());
  }
}
