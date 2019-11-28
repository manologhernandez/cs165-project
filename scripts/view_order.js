//for the view order details page
$(document).ready(function() {
  $(document.getElementById("getDetails")).click(function() {
    let orderNum = $("#ordernum").val();
    if (orderNum === "") {
      console.log("No Order Number inputted...");
    } else {
      $.ajax({
        url: `get-order-details/?id=${orderNum}&type=partial`,
        success: function(response) {
          if (response === "error") {
            $("#plan_table").attr("hidden", true);
            $("#notfound").attr("class", "alert alert-danger");
            $("#notfound").attr("hidden", false);
            $("#notfound").html(
              "<strong>Error. </strong>The order number could not be found. Please make sure the order number you entered is valid."
            );
          } else {
            let surfpacks = "N/A";
            let lifestylepacks = "N/A";
            let callntextpacks = "N/A";
            if (response.SurfPacks !== null) {
              surfpacks = response.SurfPacks;
            }
            if (response.LifestylePacks !== null) {
              lifestylepacks = response.LifestylePacks;
            }
            if (response.CallnTextPacks !== null) {
              callntextpacks = response.CallnTextPacks;
            }
            let html = `<tr>
            <th scope="row">${response.orderNo}</th>
            <td>${response.accountNo}</td>
            <td>${response.plan}</td>
            <td>${surfpacks}</td>
            <td>${lifestylepacks}</td>
            <td>${callntextpacks}</td>
            <td>Php ${response.monthlyservicefee}</td>
            </tr>`;
            $("#tablebody").html(html);
            $("#notfound").attr("hidden", true);
            $("#plan_table").attr("hidden", false);
          }
        }
      });
    }
  });
});
