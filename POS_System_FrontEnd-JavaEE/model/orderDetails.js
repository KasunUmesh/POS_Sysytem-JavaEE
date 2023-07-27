export class OrderDetails {
  constructor(order_id, customer_id, item_code, quantity, price, total) {
    this._order_id = order_id;
    this._customer_id = customer_id;
    this._item_code = item_code;
    this._quantity = quantity;
    this._price = price;
    this._total = total;
  }
  get order_id() {
    return this._order_id;
  }
  get customer_id() {
    return this._customer_id;
  }
  get item_code() {
    return this._item_code;
  }
  get quantity() {
    return this._quantity;
  }
  get price() {
    return this._price;
  }
  get total() {
    return this._total;
  }
  set order_id(order_id) {
    this._order_id = order_id;
  }
  set customer_id(customer_id) {
    this._customer_id = customer_id;
  }
  set item_code(item_code) {
    this._item_code = item_code;
  }
  set quantity(quantity) {
    this._quantity = quantity;
  }
  set price(price) {
    this._price = price;
  }
  set total(total) {
    this._total = total;
  }
}
