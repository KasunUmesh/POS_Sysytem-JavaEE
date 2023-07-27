const data = "CUSTOMER";

// Customer Function
export function saveCustomerDB(new_customer) {
  let pre_data = localStorage.getItem(data);
  let data_arr = JSON.parse(pre_data) || [];

  if (data_arr) {
    data_arr.push(new_customer);
    localStorage.setItem(data, JSON.stringify(data_arr));
    return true;
  }
}

export function getCustomerDB() {
  let pre_data = localStorage.getItem(data);
  return JSON.parse(pre_data) || [];
}

export function updateCustomer(update_customer) {
  let pre_data = localStorage.getItem(data);
  let data_arr = JSON.parse(pre_data) || [];
  let pre_customer = data_arr.find(
    (e) => e._customer_id === update_customer.customer_id
  );

  pre_customer._customer_name = update_customer.customer_name;
  pre_customer._customer_address = update_customer.customer_address;
  pre_customer._customer_salary = update_customer.customer_salary;

  localStorage.setItem(data, JSON.stringify(data_arr));
  if (pre_customer) return true;
}

export function deleteCustomer(delete_Customer) {
  let pre_data = localStorage.getItem(data);
  let data_arr = JSON.parse(pre_data) || [];
  let cus_index = data_arr.findIndex(
    (e) => e._customer_id === delete_Customer.customer_id
  );
  if (cus_index !== -1) {
    data_arr.splice(cus_index, 1);
    localStorage.setItem(data, JSON.stringify(data_arr));
    return true;
  }
}
