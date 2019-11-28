//for the view order details page
var deleteOrders = [];
$(document).ready(function() {
  $("#getDetails").click(function() {
    let accountNum = $("#accountno").val();
    if (accountNum === "") {
      console.log("No Account Number inputted...");
    } else {
      $.ajax({
        url: `get-order-details/?id=${accountNum}&type=complete`,
        success: function(response) {
          if (response === "error") {
            $("#show-orders").attr("hidden", true);
            $("#notfound").attr("class", "alert alert-warning");
            $("#notfound").attr("hidden", false);
            $("#notfound").html(
              "<strong>Warning.</strong> There are no orders associated with that account. Please ensure that the account number you enetered is valid."
            );
          } else {
            let r_length = response.length;
            let html = "";
            for (var i = 0; i < r_length; i++) {
              html += `<tr>
                      <th scope="row"><input type="checkbox" class="table-checkbox"/></th>
                      <td>${response[i].orderNo}</td>
                      <td>${response[i].plan}</td>
                      <td>${response[i].Packs}</td>
                      <td>Php. ${response[i].monthlyservicefee}</td>
                      <td>${response[i].deviceModel}</td>
                      <td>${response[i].modeOfPayment}</td>
                      <td>${response[i].Remarks}</td>
                      </tr>`;
            }
            $("#tablebody").html(html);
            $("#notfound").attr("hidden", true);
            $("#show-orders").attr("hidden", false);
            $("#nextBtn").attr("hidden", false);
            $("#resetBtn").attr("hidden", false);
          }
        }
      });
    }
  });
  $("#nextBtn").click(function() {
    let checkboxes = $(":checkbox:checked");
    deleteOrders = [];
    for (var i = 0; i < checkboxes.length; i++) {
      var checkbox = checkboxes[i];

      var currentRow = checkbox.parentNode.parentNode;
      var cols = currentRow.getElementsByTagName("td"); //get columns in row
      let info = {
        orderno: cols[0].innerHTML,
        plan: cols[1].innerHTML,
        msf: cols[3].innerHTML,
        device: cols[4].innerHTML
      };
      console.log(info);
      deleteOrders.push(info);
    }
    $("#confirm-delete").modal("show");
  });
  $("#confirm-delete").on("show.bs.modal", function(e) {
    //console.log(deleteOrders);
    // populate modal with orders to be deleted..
    var modal = $(this);
    if (deleteOrders.length === 0) {
      $("#none-selected").attr("hidden", false);
      $("#selected").attr("hidden", true);
      $("#save-delete-btn").attr("hidden", true);
    } else {
      $("#none-selected").attr("hidden", true);
      $("#selected").attr("hidden", false);
      let d_length = deleteOrders.length;
      let html = "";
      for (var i = 0; i < d_length; i++) {
        html += `<tr>
                      <td>${deleteOrders[i].orderno}</td>
                      <td>${deleteOrders[i].plan}</td>
                      <td>${deleteOrders[i].device}</td>
                      <td>${deleteOrders[i].msf}</td>
                      </tr>`;
      }
      $("#confirm-tablebody").html(html);
      $("#save-delete-btn").attr("hidden", false);
    }
  });
  $("#save-delete-btn").click(function() {
    $.post("/submit-cancel-order", { deleteOrders }, function() {
      window.location.href = "/order-delete-success";
    });
  });
});
