const express = require("express");
const app = express();
const mysql = require("mysql");
const path = require("path");
const router = express.Router();
const bodyParser = require("body-parser");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "121699",
  database: "hernandez"
});

//DB Connect
db.connect(err => {
  if (err) {
    throw err;
  }
  console.log("MySQL Connected!");
});

//Middleware
app.use(bodyParser.urlencoded({ extended: true }));

//GET Routes
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});
app.get("/create", (req, res) => {
  res.sendFile(__dirname + "/views/create.html");
});
app.get("/create-form", (req, res) => {
  res.sendFile(__dirname + "/views//create/create-form.html");
});
app.get("/create-account", (req, res) => {
  res.sendFile(__dirname + "/views/create/create-account.html");
});
app.get("/account-created/", (req, res) => {
  res.sendFile(__dirname + "/views/create/accountcreated.html");
});
app.get("/form-created/", (req, res) => {
  res.sendFile(__dirname + "/views/create/formcreated.html");
});
app.get("/read", (req, res) => {
  res.sendFile(__dirname + "/views/read.html");
});
app.get("/view-devices", (req, res) => {
  res.sendFile(__dirname + "/views/read/viewdevices.html");
});
app.get("/forgot-account-number", (req, res) => {
  res.sendFile(__dirname + "/views/read/forgotaccount.html");
});
app.get("/view-order", (req, res) => {
  res.sendFile(__dirname + "/views/read/vieworderdetails.html");
});
app.get("/update", (req, res) => {
  res.sendFile(__dirname + "/views/update.html");
});
app.get("/account-updated/", (req, res) => {
  res.sendFile(__dirname + "/views/update/accountupdated.html");
});
app.get("/update-account-address", (req, res) => {
  res.sendFile(__dirname + "/views/update/update-address.html");
});
app.get("/change-device", (req, res) => {
  res.sendFile(__dirname + "/views/update/change-device.html");
});
app.get("/delete", (req, res) => {
  res.sendFile(__dirname + "/views/delete.html");
});
app.get("/cancel-order", (req, res) => {
  res.sendFile(__dirname + "/views/delete/cancel_order.html");
});
app.get("/order-delete-success", (req, res) => {
  res.sendFile(__dirname + "/views/delete/orderdeleted.html");
});

//get files
app.get("/logo.png", (req, res) => {
  res.sendFile(__dirname + "/views/assets/logo.png");
});
app.get("/signup1.jpg", (req, res) => {
  res.sendFile(__dirname + "/views/assets/signup1.jpg");
});
app.get("/existing.jpg", (req, res) => {
  res.sendFile(__dirname + "/views/assets/existing.jpg");
});
app.get("/phones.jpg", (req, res) => {
  res.sendFile(__dirname + "/views/assets/phones.jpg");
});
app.get("/happyphone.jpg", (req, res) => {
  res.sendFile(__dirname + "/views/assets/happyphone.jpg");
});
app.get("/delivery.jpg", (req, res) => {
  res.sendFile(__dirname + "/views/assets/delivery.jpg");
});
app.get("/choosingphone.jpg", (req, res) => {
  res.sendFile(__dirname + "/views/assets/choosingphone.jpg");
});
app.get("/cancel.jpg", (req, res) => {
  res.sendFile(__dirname + "/views/assets/cancel.jpg");
});
app.get("/scripts/form_scripts.js", (req, res) => {
  res.sendFile(__dirname + "/scripts/form_scripts.js");
});
app.get("/scripts/forgot_account.js", (req, res) => {
  res.sendFile(__dirname + "/scripts/forgot_account.js");
});
app.get("/scripts/view_devices.js", (req, res) => {
  res.sendFile(__dirname + "/scripts/view_devices.js");
});
app.get("/scripts/view_order.js", (req, res) => {
  res.sendFile(__dirname + "/scripts/view_order.js");
});
app.get("/scripts/update_address.js", (req, res) => {
  res.sendFile(__dirname + "/scripts/update_address.js");
});
app.get("/scripts/change_device.js", (req, res) => {
  res.sendFile(__dirname + "/scripts/change_device.js");
});
app.get("/scripts/cancel-order.js", (req, res) => {
  res.sendFile(__dirname + "/scripts/cancel-order.js");
});

//handle AJAX requests

app.get("/get-account-number/:id", (req, res) => {
  //res.sendFile(__dirname + "/views/demo_test.txt");
  let mobileNum = req.params.id;
  let sql = `SELECT accountNo FROM UserAccount WHERE mobileNo = ${mobileNum}`;
  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    //console.log(results);
    let response = {
      status: "",
      result: results
    };
    let r_length = results.length;
    if (r_length == 1) {
      response.status = "single";
      response.result = results[0].accountNo;
      res.send(response);
    } else if (r_length > 1) {
      response.status = "multiple";
      let a_nums = [];
      for (var i = 0; i < r_length; i++) {
        a_nums.push(results[i]);
      }
      response.result = a_nums;
      res.send(response);
    } else if (r_length == 0) {
      response.status = "undefined";
      res.send(response);
    }
  });
});
app.get("/get-plan-lockup/:plan", (req, res) => {
  //res.sendFile(__dirname + "/views/demo_test.txt");
  let plan = req.params.plan;
  let sql = `SELECT lockUpPeriod FROM PlanLockup WHERE plan = "${plan}"`;
  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    //console.log(results);
    res.send(`${results[0].lockUpPeriod}`);
  });
});
app.get("/get-device-details/:device", (req, res) => {
  //res.sendFile(__dirname + "/views/demo_test.txt");
  let device = req.params.device;
  let sql = `SELECT imeiNo, handsetBasePrice, deviceReleaseDate FROM DeviceInfo WHERE deviceModel = "${device}"`;
  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    //console.log(results);
    res.json(results[0]);
  });
});
app.get("/get-handset-cashout/", (req, res) => {
  let plan = req.query.plan;
  let imei = req.query.imei;

  let sql = `SELECT handsetCashOut FROM DeviceCashout WHERE plan = "${plan}" AND imeiNo = "${imei}"`;
  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    res.send(`${results[0].handsetCashOut}`);
  });
});
app.get("/get-order-details/", (req, res) => {
  let type = req.query.type;

  if (type === "partial") {
    let orderNum = req.query.id;

    let sql = `SELECT u.orderNo, u.accountNo, u.plan, u.monthlyservicefee,
    (SELECT group_concat(c.callntextpack SEPARATOR '<br>')
    FROM callntextpacksperorderno c
    WHERE c.orderNo = u.orderNo) AS CallnTextPacks,
    (SELECT group_concat(l.lifestylepack SEPARATOR '<br>')
    FROM lifestylepacksperorderno l
    WHERE l.orderNo = u.orderNo) AS LifestylePacks,
    (SELECT group_concat(s.surfpack SEPARATOR '<br>')
    FROM surfpacksperorderno s
    WHERE s.orderNo = u.orderNo) AS SurfPacks
    FROM updateform u
    WHERE u.orderNo = ${orderNum}`;
    let query = db.query(sql, (err, results) => {
      if (err) throw err;
      //console.log(results);
      if (results.length === 0) {
        res.send("error");
      } else {
        res.json(results[0]);
      }
    });
  } else if (type === "complete") {
    let accountNum = req.query.id;
    let sql = `SELECT u.orderNo, u.plan, u.monthlyservicefee,
    CONCAT_WS('<br>', (SELECT group_concat(c.callntextpack SEPARATOR '<br>')
      FROM callntextpacksperorderno c
      WHERE c.orderNo = u.orderNo), (SELECT group_concat(l.lifestylepack SEPARATOR '<br>')
      FROM lifestylepacksperorderno l
      WHERE l.orderNo = u.orderNo),  (SELECT group_concat(s.surfpack SEPARATOR '<br>')
      FROM surfpacksperorderno s
      WHERE s.orderNo = u.orderNo)) AS Packs,
      u.modeOfPayment, di.deviceModel, CONCAT_WS('<br><br>', r.planRemarks, r.deviceRemarks) AS Remarks
  FROM updateform u
  JOIN DeviceInfo di 
    ON di.imeiNo = u.imeiNo
  JOIN Remarks r
    ON r.remarksID = u.remarksID
  WHERE u.accountNo = ${accountNum}`;
    let query = db.query(sql, (err, results) => {
      if (err) throw err;
      //console.log(results);
      if (results.length === 0) {
        res.send("error");
      } else {
        res.send(results);
      }
    });
  }
});
app.get("/confirm-account-address/", (req, res) => {
  let accountNum = req.query.id;
  let sql = `SELECT deliveryAddress FROM UserAccount WHERE accountNo = ${accountNum}`;
  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    let response = {
      status: "",
      address: ""
    };
    if (results.length === 0) {
      response.status = "error";
    } else {
      response.status = "ok";
      response.address = results[0].deliveryAddress;
    }
    res.json(response);
  });
});
app.get("/confirm-order-devices/", (req, res) => {
  let orderNum = req.query.orderno;
  let sql = `SELECT u.plan, u.imeiNo, d.deviceModel, d.handsetBasePrice, d.deviceReleaseDate, dc.handsetCashOut 
  FROM UpdateForm u 
  JOIN DeviceInfo d
  ON d.imeiNo = u.imeiNo
  JOIN DeviceCashout dc 
  ON dc.imeiNo = u.imeiNo AND dc.plan = u.plan
  WHERE u.orderNo = ${orderNum}`;
  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    if (results.length === 0) {
      res.send("error");
    } else {
      res.json(results[0]);
    }
  });
});
app.get("/get-devices/", (req, res) => {
  let sql =
    "SELECT di.deviceModel, di.deviceReleaseDate, di.imeiNo, dc.plan, dc.handsetCashout, p.lockUpPeriod FROM DeviceInfo di LEFT JOIN DeviceCashout dc ON di.imeiNo = dc.imeiNo LEFT JOIN PlanLockUp p ON p.plan = dc.plan";
  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

//POST Routes
app.post("/submit-create-form", (req, res) => {
  //insert into remarks table
  let remarks = {
    planRemarks: req.body.planremarks,
    deviceRemarks: req.body.deviceremarks
  };
  let sql = "INSERT INTO Remarks SET ?";
  let query = db.query(sql, remarks, (err, result) => {
    if (err) throw err;
    const remarksID = result.insertId;

    let form = {
      accountNo: req.body.accountno,
      plan: req.body.plan,
      monthlyServiceFee: req.body.monthlyservicefee,
      imeiNo: req.body.imei,
      modeOfPayment: req.body.modeofpayment,
      remarksID: remarksID
    };

    let sql = "INSERT INTO UpdateForm SET ?";
    let query = db.query(sql, form, (err, result) => {
      if (err) throw err;

      //insert into ___perorderno tables
      if (typeof req.body.surfPacks !== "undefined") {
        for (var i = 0; i < req.body.surfPacks.length; i++) {
          let newform = {
            orderNo: result.insertId,
            SurfPack: req.body.surfPacks[i]
          };
          let sql = "INSERT INTO SurfPacksPerOrderNo SET ?";
          let query = db.query(sql, newform, (err, result) => {
            if (err) throw err;
          });
        }
      }
      if (typeof req.body.lifestylePacks !== "undefined") {
        for (var i = 0; i < req.body.lifestylePacks.length; i++) {
          let newform = {
            orderNo: result.insertId,
            LifestylePack: req.body.lifestylePacks[i]
          };
          let sql = "INSERT INTO LifestylePacksPerOrderNo SET ?";
          let query = db.query(sql, newform, (err, result) => {
            if (err) throw err;
          });
        }
      }
      if (typeof req.body.callNTextPacks !== "undefined") {
        for (var i = 0; i < req.body.callNTextPacks.length; i++) {
          let newform = {
            orderNo: result.insertId,
            CallNTextPack: req.body.callNTextPacks[i]
          };
          let sql = "INSERT INTO CallnTextPacksPerOrderNo SET ?";
          let query = db.query(sql, newform, (err, result) => {
            if (err) throw err;
          });
        }
      }

      res.redirect(`/form-created/?id=${result.insertId}`);
    });
  });
});
app.post("/submit-create-account", (req, res) => {
  let account = {
    mobileNo: req.body.mobileno,
    firstName: req.body.fname,
    middleName: req.body.mname,
    lastName: req.body.lname,
    birthday: req.body.birthday,
    deliveryAddress: req.body.address,
    simSerialNo: req.body.simno
  };
  let sql = "INSERT INTO UserAccount SET ?";
  let query = db.query(sql, account, (err, result) => {
    if (err) throw err;
    res.redirect(`/account-created/?id=${result.insertId}`);
  });
});
app.post("/submit-update-form", (req, res) => {
  let accountNum = req.body.accountno;
  let address = req.body.newAddress;
  let sql = `UPDATE UserAccount SET deliveryAddress = "${address}" WHERE accountNo = ${accountNum}`;
  let query = db.query(sql, (err, result) => {
    if (err) throw err;
    //console.log(result);
    res.redirect(`/account-updated/`);
  });
});
app.post("/submit-change-device", (req, res) => {
  let orderNum = req.body.orderno;
  let imei = req.body.new_imei;
  let sql = `UPDATE UpdateForm SET imeiNo = ${imei} WHERE orderNo = ${orderNum}`;
  let query = db.query(sql, (err, result) => {
    if (err) throw err;
    //console.log(result);
    res.redirect(`/account-updated/`);
  });
  //console.log(req.body);
});
app.post("/submit-cancel-order", (req, res) => {
  let orders = req.body.deleteOrders;
  let o_len = orders.length;
  for (var i = 0; i < o_len; i++) {
    let orderNo = orders[i].orderno;
    let sql = `DELETE FROM UpdateForm WHERE orderNo = ${orderNo}`;
    let query = db.query(sql, (err, result) => {
      if (err) throw err;
      //console.log(result);
      res.send("hooray it worked");
    });
  }
  // //console.log(req.body);
});

//Port Listening
var port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Server Started on Port 3000...");
});
