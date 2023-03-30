export class TableSelection {
  constructor() {
    this.group = [];
  }

  // $el instance DOM === tre
  select($el) {
    this.group.push($el);
    $el.addClass('selected');
  }

  selectGroup() {}
}
