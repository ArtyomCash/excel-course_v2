import { ExcelComponent } from '@core/ExcelComponent';

export class Formula extends ExcelComponent {
  // static => потому что мы будем иметь к нему доступ без создания инстанса этого класса Formula
  // className => будет идти корневым для данного блока
  static className = 'excel__formula';

  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input'],
      ...options,
    });
  }

  toHTML() {
    return `
      <div class="info">fx</div>
      <div class="input" contenteditable spellcheck="false"></div>
    `;
  }

  onInput(event) {
    const text = event.target.textContent.trim();
    this.emitter.emit('it is working', text);
    // console.log(this.$root);
    /* console.log('Formula: onInput', event.target.textContent.trim());*/
  }

  /* onClick() {
    console.log('mk');
  }*/
}
