//for the forgot account number page
$(document).ready(function() {
  $(document.getElementById("checkAccount")).click(function() {
    // console.log("hello...");
    // console.log($(document.getElementById("mobile")).val());
    let mobileNum = $(document.getElementById("mobile")).val();
    if (mobileNum === "") {
      console.log("no mobile number inputted...");
    } else {
      $.ajax({
        url: `get-account-number/${mobileNum}`,
        success: function(response) {
          if (response.status === "undefined") {
            $("#accountno").attr("class", "alert alert-danger");
            $("#accountno").attr("hidden", false);
            $("#accountno").html(
              "This mobile number is not yet associated with an account. <strong>Please create an account first</strong>."
            );
          } else if (response.status === "single") {
            $("#accountno").attr("class", "alert alert-success");
            $("#accountno").attr("hidden", false);
            $("#accountno").html(
              `Your account number is <strong>${response.result}</strong>.`
            );
          } else if (response.status === "multiple") {
            $("#accountno").attr("class", "alert alert-warning");
            $("#accountno").attr("hidden", false);
            let html =
              "<strong>Warning!</strong> This mobile number is associated with multiple accounts. The account numbers are: <strong>";
            let r_length = response.result.length;
            for (var i = 0; i < r_length; i++) {
              html = html + response.result[i].accountNo;
              if (i !== r_length - 1) {
                html += ", ";
              }
            }
            html += "</strong>.";
            $("#accountno").html(html);
          }
        }
      });
    }
  });
  $("#backBtn").click(function() {
    if (typeof Storage !== "undefined") {
      window.location.href = sessionStorage.redirectSrc;
    } else {
      console.log("Session Storage not Supported...");
    }
  });
});
