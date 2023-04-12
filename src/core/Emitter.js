export class Emitter {
  constructor() {
    this.listeners = {};
  }
  // Уведомляем слушателей, если они есть
  // table.emit('table:select, {a: 1}')
  emit(event, ...args) {
    if (!Array.isArray(this.listeners[event])) {
      return false;
    }
    this.listeners[event].forEach((listener) => {
      listener(...args);
    });
    return true;
  }

  // Подписываемся на уведомления
  // Добавляю нового слушателя
  // formula.subscribe('table:select', () => {})
  subscribe(event, fn) {
    this.listeners[event] = this.listeners[event] || [];
    this.listeners[event].push(fn);
    // функция позволяющая отписаться от события как useEffect
    return () => {
      this.listeners[event] = this.listeners[event].filter((listener) => listener !== fn);
    };
  }
}

// Пример
/* const emitter = new Emitter();

const unsub = emitter.subscribe('vladilen', (data) => console.log(data));

emitter.emit('vladilen', 42);

setTimeout(() => {
  emitter.emit('vladilen', 'After 2 seconds');
}, 2000);

setTimeout(() => {
  unsub();
}, 3000);

setTimeout(() => {
  emitter.emit('vladilen', 'After 4 seconds');
}, 4000);*/
