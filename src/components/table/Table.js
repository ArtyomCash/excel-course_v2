import { ExcelComponent } from '@core/ExcelComponent';

export class Table extends ExcelComponent {
  static className = 'excel__table';
  toHTML() {
    return `
      <div class="row">

        <div class="row-info"></div>

        <div class="row-data">
          <div class="column">
            A
          </div>
          <div class="column">
            B
          </div>
          <div class="column">
            C
          </div>
          <div class="column">
            A
          </div>
          <div class="column">
            B
          </div>
          <div class="column">
            C
          </div>
          <div class="column">
            A
          </div>
          <div class="column">
            B
          </div>
          <div class="column">
            C
          </div>
          <div class="column">
            A
          </div>
          <div class="column">
            B
          </div>
          <div class="column">
            C
          </div>
          <div class="column">
            A
          </div>
          <div class="column">
            B
          </div>
          <div class="column">
            C
          </div><div class="column">
          A
        </div>
          <div class="column">
            B
          </div>
          <div class="column">
            C
          </div><div class="column">
          A
        </div>
          <div class="column">
            B
          </div>
          <div class="column">
            C
          </div>
          <div class="column">
            A
          </div>
          <div class="column">
            B
          </div>
          <div class="column">
            C
          </div>
        </div>

      </div>
      <div class="row">

        <div class="row-info">
          1
        </div>

        <div class="row-data">
          <div class="sell selected" contenteditable>A1</div>
          <div class="sell" contenteditable>B2</div>
          <div class="sell" contenteditable>C3</div>
        </div>
      </div>
      <div class="row">

        <div class="row-info">
          2
        </div>

        <div class="row-data">
          <div class="sell">A1</div>
          <div class="sell">B2</div>
          <div class="sell">C3</div>
        </div>
      </div>
    `;
  }
}
