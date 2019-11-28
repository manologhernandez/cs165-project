$(document).ready(function() {
  let d = new Date();
  $("#curdate").html(`${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`);
  $.ajax({
    url: `get-devices`,
    success: function(result) {
      let r_length = result.length;
      let html = ``;
      for (var i = 0; i < r_length; i++) {
        let model = result[i].deviceModel;
        let rdate = result[i].deviceReleaseDate.substring(0, 10);
        let imei = result[i].imeiNo;
        let plan = result[i].plan;
        let cashout = result[i].handsetCashout;
        let lockup = result[i].lockUpPeriod;
        html += `<tr>
          <th scope="row">${model}</th>
          <td>${rdate}</td>
          <td>${imei}</td>
          <td>${plan}</td>
          <td>Php ${cashout}</td>
          <td>${lockup} months</td>
        </tr>`;
      }
      $("#tablebody").html(html);
    }
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
// })
