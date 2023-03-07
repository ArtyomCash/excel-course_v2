// файл  dom.js => для простоты общения с дом деревом (типа jQuery)
// создаю автоматизированное появление элемента
class Dom {
  constructor() {}
}

export function $() {
  return new Dom();
}

// создаю статический метод
$.create = (tagName, classes = '') => {
  const el = document.createElement(tagName);
  if (classes) {
    el.classList.add(classes);
  }
  return el;
};
