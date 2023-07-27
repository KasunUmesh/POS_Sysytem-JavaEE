export class Customer {
  constructor(customer_id, customer_name, customer_address, customer_salary) {
    this._customer_id = customer_id;
    this._customer_name = customer_name;
    this._customer_address = customer_address;
    this._customer_salary = customer_salary;
  }

  get customer_id() {
    return this._customer_id;
  }
  get customer_name() {
    return this._customer_name;
  }
  get customer_address() {
    return this._customer_address;
  }
  get customer_salary() {
    return this._customer_salary;
  }

  set customer_id(customer_id) {
    this._customer_id = customer_id;
  }

  set customer_name(customer_name) {
    this._customer_name = customer_name;
  }

  set customer_address(customer_address) {
    this._customer_address = customer_address;
  }

  set customer_salary(customer_salary) {
    this._customer_salary = customer_salary;
  }
}
