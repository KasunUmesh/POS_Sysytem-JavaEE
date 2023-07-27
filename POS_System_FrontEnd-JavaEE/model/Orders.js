export class Orders {
  constructor(order_list, total) {
    this._order_list = order_list;
    this._total = total;
  }
  get order_list() {
    return this._order_list;
  }
  get total() {
    return this._total;
  }
  set order_list(order_list) {
    this._order_list = order_list;
  }
  set total(total) {
    this._total = total;
  }
}
