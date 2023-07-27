import { getCustomerDB } from "../db/CustomerDB.js";
import { getItemDB } from "../db/ItemDB.js";
import { saveOrders } from "../db/OrderDB.js";
import { OrderDetails } from "../model/orderDetails.js";
import { Orders } from "../model/Orders.js";

export class OrderController {
  constructor() {
    this.orderList = [];

    $("#btn_add_Item").click(this.handleAddOrder.bind(this));
    $("#customerID").click(this.loadCustomerDetails.bind(this));
    $("#itemCode").click(this.loadItemDetails.bind(this));
    $("#orderQty").on("input", this.calculateTotal.bind(this));
    $("#purchase_order").click(this.purchaseOrder.bind(this));

    this.loadCustomers();
    this.loadItems();
    this.disableTextField();
    this.loadOrderItemTable();
  }

  disableTextField() {
    $("#cusName").prop("disabled", true);
    $("#cusSalary").prop("disabled", true);
    $("#cusAddress").prop("disabled", true);

    $("#itemName").prop("disabled", true);
    $("#itemPrice").prop("disabled", true);
    $("#qty").prop("disabled", true);
    $("#total").prop("disabled", true);
  }

  loadCustomers() {
    let customers = getCustomerDB();
    let customerID = $("#customerID");
    customerID.empty();
    customerID.append($("<option selected>").text("Select Customer ID"));
    customers.forEach((customers) => {
      customerID.append(
        $("<option>")
          .val(JSON.stringify(customers))
          .text(customers._customer_id)
      );
    });
  }

  loadCustomerDetails() {
    let selected = $("#customerID").val();
    let selectedCustomer = JSON.parse(selected);

    $("#cusName").val(selectedCustomer._customer_name);
    $("#cusSalary").val(selectedCustomer._customer_salary);
    $("#cusAddress").val(selectedCustomer._customer_address);
  }

  loadItems() {
    let items = getItemDB();
    let itemCode = $("#itemCode");
    itemCode.empty();
    itemCode.append($("<option selected>").text("Select Item Code"));
    items.forEach((items) => {
      itemCode.append(
        $("<option>").val(JSON.stringify(items)).text(items._item_code)
      );
    });
  }

  loadItemDetails() {
    let selectedOption = $("#itemCode").val();
    let selectedItems = JSON.parse(selectedOption);

    $("#itemName").val(selectedItems._item_name);
    $("#itemPrice").val(selectedItems._item_price);
    $("#qty").val(selectedItems._item_qty);
  }

  handleAddOrder() {
    let orderID = $("#orderId").val();
    let customerID = JSON.parse($("#customerID").val())._customer_id;
    let itemCode = JSON.parse($("#itemCode").val())._item_code;
    let qty = parseInt($("#orderQty").val());
    let total = parseInt($("#total").val());
    let price = $("#itemPrice").val();

    if (!orderID || !customerID || !itemCode || !qty || !price) {
      alert("Please fill all Fields");

      return;
    }

    let existingOrder = this.orderList.find(
      (order) => order._item_code === itemCode
    );

    if (existingOrder) {
      existingOrder._quantity += qty;
      existingOrder._total += total;
    } else {
      let newOrder = new OrderDetails(
        orderID,
        customerID,
        itemCode,
        qty,
        price,
        total
      );
      this.orderList.push(newOrder);
    }
    this.loadOrderItemTable();
    this.calculateOrderTotal();
  }

  loadOrderItemTable() {
    let list = this.orderList;
    $("#orderItemDetal_table").empty();
    list.forEach((orderDetails) => {
      $("#orderItemDetal_table").append(
        `<tr>
            <td>${orderDetails._order_id}</td>
            <td>${orderDetails._customer_id}</td>
            <td>${orderDetails._item_code}</td>
            <td>${orderDetails._quantity}</td>
            <td>${orderDetails._total}</td>
        </tr> `
      );
    });
  }

  calculateTotal() {
    let qty = $("#orderQty").val();
    let price = $("#itemPrice").val();

    if (qty && price) {
      let total = qty * price;
      $("#total").val(total);
    }
  }

  calculateOrderTotal() {
    let total = 0;
    this.orderList.forEach((order) => {
      total += parseInt(order._total);
    });
    $("#totalPrice").val(total);
  }

  purchaseOrder() {
    let order = saveOrders(new Orders(this.orderList, $("#totalPrice").val()));

    order ? alert("Order Save Successfully") : alert("Error");

    $("#orderItemDetal_table").empty();
    this.clearTextField();
  }

  clearTextField() {
    $("#orderId").val("");

    $("#customerID").append($("<option selected>").text("Select Customer ID"));
    $("#cusName").val("");
    $("#cusSalary").val("");
    $("#cusAddress").val("");

    $("#itemCode").append($("<option selected>").text("Select Item Code"));
    $("#itemName").val("");
    $("#itemPrice").val("");
    $("#qty").val("");
    $("#total").val("");
    $("#totalPrice").val("");
    $("#orderQty").val("");
  }
}

new OrderController();
