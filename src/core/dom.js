// файл  dom.js => для простоты общения с дом деревом (типа jQuery)
// создаю автоматизированное появление элемента
class Dom {
  constructor(selector) {
    // #app
    this.$el = typeof selector === 'string' ? document.querySelector(selector) : selector;
  }
  // html(html) - базовый гетер
  html(html) {
    if (typeof html === 'string') {
      this.$el.innerHTML = html;
    }
    // trim() - удаляет лишни проделы в начале и в конце
    return this.$el.outerHTML.trim();
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
