export class DomListener {
  // добавляем изолированные события которые будут наследоваться от этого класса
  // $root - корневой элемент на который мы будем вешать слушателей
  constructor($root) {
    if (!$root) {
      throw new Error(`No $root provider for DomListener`);
    }
    this.$root = $root;
  }
}
