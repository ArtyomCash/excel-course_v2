export class Excel {
  constructor(selector, options) {
    this.$el = document.querySelector('#app');
    this.components = options.components || [];
  }
  getRoot() {
    const $root = document.createElement('div');
    // console.log(this.components);

    this.components.forEach((Component) => {
      const component = new Component();
      $root.insertAdjacentHTML('beforeend', component.toHTML());
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
    this.$el.append(this.getRoot());
  }
}