// файл  dom.js => для простоты общения с дом деревом (типа jQuery)
// создаю автоматизированное появление элемента
class Dom {
  constructor(selector) {
    // #app
    this.$el = typeof selector === 'string' ? document.querySelector(selector) : selector;
  }
  // html(html) - базовый гетер
  // нужно сделать что бы метод был и геттером и сеттером
  html(html) {
    if (typeof html === 'string') {
      this.$el.innerHTML = html;
    }
    // trim() - удаляет лишни пробелы в начале и в конце
    return this.$el.outerHTML.trim();
  }

  text(text) {
    if (typeof text === 'string') {
      this.$el.textContent = text;
      return this;
    }
    if (this.$el.tagName.toLowerCase() === 'input') {
      return this.$el.value.trim();
    }
    return this.$el.textContent.trim();
  }
  clear() {
    this.html('');
    return this;
  }

  on(eventType, callback) {
    this.$el.addEventListener(eventType, callback);
  }

  off(eventType, callback) {
    this.$el.removeEventListener(eventType, callback);
  }

  find(selector) {
    return $(this.$el.querySelector(selector));
  }

  append(node) {
    // console.log('node>>>', node);
    if (node instanceof Dom) {
      node = node.$el;
    }
    // полифил
    if (Element.prototype.append) {
      this.$el.append(node);
    } else {
      this.$el.appendChild(node);
    }

    return this;
    // this.$el.append(node.$el);
  }

  get data() {
    return this.$el.dataset;
  }
  // closest => возращает HTMLlement - нативный элемент, а нам нужно работать с инстансом класса дом
  // поэтому нужно обернуть в конструктор $(value....)
  closest(selector) {
    return $(this.$el.closest(selector));
  }
  // getBoundingClientRect => позволяет получить набор координат
  getCoords() {
    return this.$el.getBoundingClientRect();
  }
  findAll(selector) {
    return this.$el.querySelectorAll(selector);
  }

  css(styles = {}) {
    Object.keys(styles).forEach((key) => {
      this.$el.style[key] = styles[key];
    });
  }

  id(parse) {
    if (parse) {
      const parsed = this.id().split(':');
      return {
        row: +parsed[0],
        col: +parsed[1],
      };
    }
    return this.data.id;
  }

  focus() {
    this.$el.focus();
    return this;
  }

  addClass(className) {
    this.$el.classList.add(className);
    return this;
  }

  removeClass(className) {
    this.$el.classList.remove(className);
    return this;
  }
}

// $('div').html('<h1>Test</h1>>').clear();
// event.target
export function $(selector) {
  return new Dom(selector);
}

// создаю статический метод
$.create = (tagName, classes = '') => {
  const el = document.createElement(tagName);
  if (classes) {
    el.classList.add(classes);
  }
  return $(el);
};
