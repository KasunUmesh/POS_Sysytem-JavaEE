import { Item } from "../model/Item.js";
import { saveItemDB, getItemDB, updateItem, deleteItem } from "../db/ItemDB.js";

export class ItemController {
  constructor() {
    $("#btn_itemAdd").click(this.handleSaveItemValidation.bind(this));
    $("#btn_itemUpdate").click(this.handleUpdateItem.bind(this));
    $("#btn_itemDelete").click(this.handleDeleteItem.bind(this));
    this.handleSaveItem.bind(this);
    this.handleLoadItem();
    this.handleClearInput();
    this.handleLoadItemTextField();
  }

  handleSaveItemValidation() {
    var item_code = $("#item_code").val();
    var item_name = $("#item_name").val();
    var item_price = $("#item_price").val();
    var item_qty = $("#item_qty").val();

    const regexNumber = /^\d+$/;

    !regexNumber.test(item_code)
      ? alert("Invalid id")
      : !item_name
      ? alert("Invalid Name")
      : !item_price
      ? alert("Invalid Address")
      : !item_qty
      ? alert("Invalid Salary")
      : this.handleSaveItem();
  }

  handleSaveItem() {
    var item_code = $("#item_code").val();
    var item_name = $("#item_name").val();
    var item_price = $("#item_price").val();
    var item_qty = $("#item_qty").val();

    let new_item = new Item(item_code, item_name, item_price, item_qty);

    saveItemDB(new_item)
      ? alert("Item saved Successfully")
      : alert("Error when saving");

    this.handleLoadItem();
    this.handleClearInput();
  }

  handleUpdateItem() {
    var item_code = $("#item_code").val();
    var item_name = $("#item_name").val();
    var item_price = $("#item_price").val();
    var item_qty = $("#item_qty").val();

    let update_item = new Item(item_code, item_name, item_price, item_qty);

    updateItem(update_item)
      ? alert("Item Updated Successfully")
      : alert("Error When Updating");
    this.handleLoadItem();
    this.handleClearInput();
  }

  handleDeleteItem() {
    var item_code = $("#item_code").val();
    var item_name = $("#item_name").val();
    var item_price = $("#item_price").val();
    var item_qty = $("#item_qty").val();

    let delete_item = new Item(item_code, item_name, item_price, item_qty);

    if (confirm(`Do you want to Delete Item ${$("#item_code").val()}`)) {
      deleteItem(delete_item);
    }
    this.handleLoadItem();
    this.handleClearInput();
  }

  handleLoadItem() {
    let item_data_arr = getItemDB();

    $("#tbl_item").empty();

    item_data_arr.map((result, index) => {
      var row =
        "<tr class='row-data'>" +
        "<td>" +
        result._item_code +
        "</td>" +
        "<td>" +
        result._item_name +
        "</td>" +
        "<td>" +
        result._item_price +
        "</td>" +
        "<td>" +
        result._item_qty +
        "</td>" +
        "</tr>";
      $("#tbl_item").append(row);
    });
  }

  handleClearInput() {
    $("#item_code").val("");
    $("#item_name").val("");
    $("#item_price").val("");
    $("#item_qty").val("");
  }

  handleLoadItemTextField() {
    $("#tbl_item").on("click", ".row-data", function () {
      let item_code = $(this).children("td:eq(0)").text();
      let item_name = $(this).children("td:eq(1)").text();
      let item_price = $(this).children("td:eq(2)").text();
      let item_qty = $(this).children("td:eq(3)").text();

      $("#item_code").val(item_code);
      $("#item_name").val(item_name);
      $("#item_price").val(item_price);
      $("#item_qty").val(item_qty);
    });
    this.handleClearInput();
  }
}

new ItemController();
