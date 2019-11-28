// Example starter JavaScript for disabling form submissions if there are invalid fields
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
  //User selects a plan
  $(document.getElementById("plan")).change(function() {
    let plan = $(document.getElementById("plan")).val();
    let value = parseInt(plan.split(" ")[1]);
    $("input:checkbox").prop("checked", false);
    $.ajax({
      url: `get-plan-lockup/${plan}`,
      success: function(result) {
        $("#lockup").html(`${result}`);
        $("#msf").html(`${value}`);
        $("#hidden_msf").val(`${value}`);
        if ($(document.getElementById("device-model")).val() !== null) {
          let plan = $(document.getElementById("plan")).val();
          let imei = $(document.getElementById("imei")).val();
          $.ajax({
            url: `get-handset-cashout/?imei=${imei}&plan=${plan}`,
            success: function(response) {
              $("#cashout").val(`Php. ${response}`);
            }
          });
        }
      }
    });
  });
  //User selects a device
  $(document.getElementById("device-model")).change(function() {
    let device = $(document.getElementById("device-model")).val();
    $.ajax({
      url: `get-device-details/${device}`,
      success: function(result) {
        let date = result.deviceReleaseDate.substring(0, 10);

        $("#imei").val(`${result.imeiNo}`);
        $("#hidden_imei").val(`${result.imeiNo}`);
        $("#device-release-date").val(`${date}`);
        $("#baseprice").val(`Php. ${result.handsetBasePrice}`);
        if ($(document.getElementById("plan")).val() !== null) {
          let plan = $(document.getElementById("plan")).val();
          let imei = $(document.getElementById("imei")).val();
          $.ajax({
            url: `get-handset-cashout/?imei=${imei}&plan=${plan}`,
            success: function(response) {
              $("#cashout").val(`Php. ${response}`);
            }
          });
        } else {
          $("#cashout").val("Select a plan to see the device cashout.");
        }
      }
    });
  });
  //User selects the packs
  $(":checkbox").change(function() {
    let plan = $("#plan").val();
    let value = parseInt(plan.split(" ")[1]);
    let surf = $(".surfPack:checked").length;
    let life = $(".lifestylePack:checked").length;
    let callntext = $(".callNTextPack:checked").length;
    let cost = surf * 50 + life * 100 + callntext * 150;
    if (cost > value) {
      $("#msf").html(`${cost}`);
      $("#hidden_msf").val(`${cost}`);
    } else {
      $("#msf").html(`${value}`);
      $("#hidden_msf").val(`${value}`);
    }
  });
  //User clicks forgot account button
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
});

//SAMPLE AJAX REQUEST

// $(document).ready(function() {
//   $(document.getElementById("")).click(function() {
//     // console.log("hello...");
//     // console.log($(document.getElementById("mobile")).val());
//     let mobileNum = $(document.getElementById("mobile")).val();
//     $.ajax({
//       url: ``,
//       success: function(result) {
//       //   $("#accountno").attr("class", "alert alert-success");
//       //   $("#accountno").attr("hidden", false);
//       //   $("#accountno").html(
//       //     `Your account number is <strong>${result}</strong>.`
//       //   );
//       }
//     });

//   });
// });
