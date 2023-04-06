export class TableSelection {
  static className = 'selected';

  constructor() {
    this.group = [];
    this.current = 0;
  }

  // $el instance DOM === tre
  select($el) {
    this.clear();
    // добавил focus - что бы курсор передвигался вместе с синей рамочкой
    $el.focus().addClass(TableSelection.className);
    this.group.push($el);
    this.current = $el;
  }

  clear() {
    this.group.forEach(($el) => $el.removeClass(TableSelection.className));
    this.group = [];
  }

  selectGroup($group = []) {
    this.clear();

    this.group = $group;
    this.group.forEach(($el) => $el.addClass(TableSelection.className));
  }
}
