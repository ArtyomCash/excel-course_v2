import { ExcelComponent } from '@core/ExcelComponent';
import { $ } from '@core/dom';

export class Formula extends ExcelComponent {
  // static => потому что мы будем иметь к нему доступ без создания инстанса этого класса Formula
  // className => будет идти корневым для данного блока
  static className = 'excel__formula';

  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'keydown'],
      ...options,
    });
  }

  toHTML() {
    return `
      <div class="info">fx</div>
      <div id="formula" class="input" contenteditable spellcheck="false"></div>
    `;
  }

  init() {
    super.init();
    this.$formula = this.$root.find('#formula');
    // $sell - значение текста ячейки вставляю в input
    this.$on('table:select', ($cell) => {
      this.$formula.text($cell.text());
    });

    this.$on('table:input', ($cell) => {
      this.$formula.text($cell.text());
    });

    this.$subscribe((state) => {
      console.log('FormulaState', state);
    });
  }

  onInput(event) {
    // this.emitter.emit('it is working', text);  обращаюсь сразу к emit
    this.$emit('formula:input', $(event.target).text());
    // console.log(this.$root);
    /* console.log('Formula: onInput', event.target.textContent.trim());*/
  }

  onKeydown(event) {
    const keys = ['Enter', 'Tab'];
    if (keys.includes(event.key)) {
      event.preventDefault();
      // делаю фокус на таблицу
      this.$emit('formula:done');
    }
  }

  /* onClick() {
    console.log('mk');
  }*/
}
