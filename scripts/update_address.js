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
  $("#forgotAccountBtn").click(function() {
    if (typeof Storage !== "undefined") {
      if (sessionStorage.redirectSrc) {
        sessionStorage.redirectSrc = window.location.href;
      } else {
        sessionStorage.redirectSrc = window.location.href;
      }
      //console.log(sessionStorage.redirectSrc);
    } else {
      console.log("Session Storage not Supported...");
    }
    window.location.href = "forgot-account-number";
  });

  $("#cancelBtn").click(function() {
    window.location.href = "/update";
  });
  $("#checkAccount").click(function() {
    let accountNum = $("#accountno").val();
    if (accountNum !== "") {
      $.ajax({
        url: `/confirm-account-address/?id=${accountNum}`,
        success: function(result) {
          if (result.status === "ok") {
            $("#notfound").attr("hidden", true);
            $("#oldAddress").val(`${result.address}`);
            $("#address-details").attr("hidden", false);
            $("#submitBtn").attr("hidden", false);
            $("#resetBtn").attr("hidden", false);
          } else {
            $("#notfound").attr("class", "alert alert-danger");
            $("#notfound").attr("hidden", false);
            $("#address-details").attr("hidden", true);
            $("#notfound").html(
              "<strong>Error. </strong>The account could not be found. Please make sure the account number you entered is valid."
            );
          }
        }
      });
    } else {
      console.log("No Account Number inputted..");
    }
  });
});
