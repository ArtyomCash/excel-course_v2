import { capitalize } from '@core/utils';

export class DomListener {
  // добавляем изолированные события которые будут наследоваться от этого класса
  // $root - корневой элемент на который мы будем вешать слушателей
  constructor($root, listeners = []) {
    if (!$root) {
      throw new Error(`No $root provider for DomListener`);
    }
    this.$root = $root;
    this.listeners = listeners;
  }
  initDOMListeners() {
    // console.log(this.listeners, this.$root);
    this.listeners.forEach((listener) => {
      const method = getMethodName(listener);
      if (!this[method]) {
        throw new Error(`Method ${method} is not implemented in ${this.name || ''} Component`);
      }
      console.log('method', this);
      this[method] = this[method].bind(this);
      // тоже самое что и addEventListener
      this.$root.on(listener, this[method]);
    });
  }

  removeDOMListeners() {
    this.listeners.forEach((listener) => {
      const method = getMethodName(listener);
      this.$root.off(listener, this[method]);
    });
  }
}

// input => onInput
function getMethodName(eventName) {
  return 'on' + capitalize(eventName);
}
