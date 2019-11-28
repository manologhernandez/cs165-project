(function() {
  "use strict";
  window.addEventListener(
    "load",
    function() {
      // Fetch all the forms we want to apply custom Bootstrap validation styles to
      var forms = document.getElementsByClassName("needs-validation");
      // Loop over them and prevent submission
      var validation = Array.prototype.filter.call(forms, function(form) {
        form.addEventListener(
          "submit",
          function(event) {
            if (form.checkValidity() === false) {
              event.preventDefault();
              event.stopPropagation();
            }
            form.classList.add("was-validated");
          },
          false
        );
      });
    },
    false
  );
})();

$(document).ready(function() {
  $("#cancelBtn").click(function() {
    window.location.href = "/update";
  });
  $("#confirmOrderNum").click(function() {
    let orderNum = $("#orderno").val();
    if (orderNum !== "") {
      $.ajax({
        url: `confirm-order-devices/?orderno=${orderNum}`,
        success: function(result) {
          if (result === "error") {
            $("#notfound").attr("class", "alert alert-danger");
            $("#notfound").attr("hidden", false);
            $("#notfound").html(
              "<strong>Error. </strong>The order could not be found. Please make sure the order number you entered is valid."
            );
            $("#order-details").attr("hidden", true);
          } else {
            $("#notfound").attr("hidden", true);
            $("#order-details").attr("hidden", false);
            $("#submitBtn").attr("hidden", false);
            $("#resetBtn").attr("hidden", false);
            $("#oldDevice").val(`${result.deviceModel}`);
            $("#imei").val(`${result.imeiNo}`);
            $("#device-release-date").val(
              `${result.deviceReleaseDate.substring(0, 10)}`
            );
            $("#plan").val(`${result.plan}`);
            $("#baseprice").val(`Php. ${result.handsetBasePrice}`);
            $("#cashout").val(`Php. ${result.handsetCashOut}`);
          }
        }
      });
    } else {
      console.log("No Order Number inputted..");
    }
  });

  $("#device-model").change(function() {
    let device = $("#device-model").val();
    $.ajax({
      url: `get-device-details/${device}`,
      success: function(result) {
        let date = result.deviceReleaseDate.substring(0, 10);

        $("#new_imei").val(`${result.imeiNo}`);
        $("#new_hidden_imei").val(`${result.imeiNo}`);
        $("#new_device-release-date").val(`${date}`);
        $("#new_baseprice").val(`Php. ${result.handsetBasePrice}`);

        let plan = $("#plan").val();
        let imei = $("#new_imei").val();
        $.ajax({
          url: `get-handset-cashout/?imei=${imei}&plan=${plan}`,
          success: function(response) {
            $("#new_cashout").val(`Php. ${response}`);
          }
        });
      }
    });
  });
});
