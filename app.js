const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
  const firstName = req.body.fName;
  const secondName = req.body.lName;
  const email = req.body.email;
  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: secondName,
        },
      },
    ],
  };
  var jsonData = JSON.stringify(data);
  var url = "https://us21.api.mailchimp.com/3.0/lists/01c085a2a5";
  var options = {
    method: "POST",
    auth: "marykey:d1c82f30f5cb6f6feb047b6f7fcb7ad-us21",
  };
  const request = https.request(url, options, function (response) {
    if (response.statusCode === 200) {
      res.sendFile(__dirname + "/succes.html");
    } else {
      res.sendFile(__dirname + "/failure.html");
    }
    response.on("data", function (data) {
      console.log(JSON.parse(data));
    });
  });

  request.write(jsonData);
  request.end();
});

app.post("/failure", function (req, res) {
  res.redirect("/");
});

app.listen(process.env.PORT || 3000, function () {
  console.log("Server is running");
});

//API key mailchimp
//2d1c82f30f5cb6f6feb047b6f7fcb7ad-us21
//Audience ID
//01c085a2a5
