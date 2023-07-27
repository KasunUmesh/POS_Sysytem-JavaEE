const order = "ORDER";

export function saveOrders(order_details) {
  let pre_order = localStorage.getItem(order);
  let order_arr = JSON.parse(pre_order) || [];
  if (order_details) {
    order_arr.push(order_details);
    localStorage.setItem(order, JSON.stringify(order_arr));
    return true;
  }
}
