import { ExcelComponent } from '@core/ExcelComponent';

export class Formula extends ExcelComponent {
  // static => потому что мы будем иметь к нему доступ без создания инстанса этого класса Formula
  // className => будет идти корневым для данного блока
  static className = 'excel__formula';

  toHTML() {
    return `
      <div class="info">fx</div>
      <div class="input" contenteditable spellcheck="false"></div>
    `;
  }
}
