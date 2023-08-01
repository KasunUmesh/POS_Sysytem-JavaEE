$("#btn_CustomerAdd").click(function () {
  var data = $("#customerForm").serialize();
  console.log(data);

  $.ajax({
    url: "customer",
    method: "POST",
    data: data,
    success: function (res) {
      console.log(res);
    },
  });
});
