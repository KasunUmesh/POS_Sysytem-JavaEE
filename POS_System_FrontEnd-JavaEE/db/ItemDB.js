const data = "ITEM";

// Items Function
export function saveItemDB(new_item) {
  let pre_data = localStorage.getItem(data);
  let item_arr = JSON.parse(pre_data) || [];
  if (item_arr) {
    item_arr.push(new_item);
    localStorage.setItem(data, JSON.stringify(item_arr));

    return true;
  }
}

export function getItemDB() {
  let pre_data = localStorage.getItem(data);
  return JSON.parse(pre_data) || [];
}

export function updateItem(update_Item) {
  let pre_data = localStorage.getItem(data);
  let item_arr = JSON.parse(pre_data) || [];
  let pre_item = item_arr.find((e) => e._item_code === update_Item.item_code);

  pre_item._item_name = update_Item.item_name;
  pre_item._item_price = update_Item.item_price;
  pre_item._item_qty = update_Item.item_qty;

  localStorage.setItem(data, JSON.stringify(item_arr));
  if (pre_item) return true;
}

export function deleteItem(delete_Item) {
  let pre_data = localStorage.getItem(data);
  let item_arr = JSON.parse(pre_data) || [];
  let item_index = item_arr.findIndex(
    (e) => e._item_code === delete_Item.item_code
  );
  if (item_index !== -1) {
    item_arr.splice(item_index, 1);
    localStorage.setItem(data, JSON.stringify(item_arr));
    return true;
  }
}
