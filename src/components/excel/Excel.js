import {$} from '@core/dom';

export class Excel {
  constructor(selector, options) {
    // this.$el = document.querySelector('#app');
    this.$el = $(selector);
    this.components = options.components || [];
  }
  getRoot() {
    const $root = $.create('div', 'excel');
    // console.log(this.components);

    this.components.forEach((Component) => {
      // const $el = document.createElement('div');
      // $el.classList.add(Component.className);
      const $el = $.create('div', Component.className);
      const component = new Component($el);
      // console.log('$el>>>', $el);
      // $el.innerHTML = component.toHTML();
      $el.html(component.toHTML());
      $root.append($el);
      // $root.insertAdjacentHTML('beforeend', component.toHTML());
    });
    // $root.textContent = 'test';
    // $root.style.fontSize = '5rem';
    return $root;
  }

  render() {
    // console.log(this.$el);
    // afterbegin, afterned, beforeend, beforebegin
    // this.$el.insertAdjacentHTML('afterbegin', `<h1>Test</h1>`);
    // this.$el.append(document.createElement('h1'));
    // const node = document.createElement('h1');
    // node.textContent = 'TEST';
    // this.$el.append(this.getRoot().$el);
    this.$el.append(this.getRoot());
  }
}
