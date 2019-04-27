const express = require("express");
const app = express();
const cors = require("cors");
const template = require("./template.jsx");
const pdf = require("html-pdf");
const path = require("path");
app.use(cors());
app.use(express.json());
app.post("/generatepdf", (req, res) => {
  console.log("request came");
  const name = req.body.Email;
  const price1 = req.body.Address;
  const price2 = req.body.City;
  const receiptId = req.body.Zip;

  ///pass the data and
  pdf
    .create(template(name, price1, price2, receiptId))
    .toFile("./mypdf1.pdf", function(err, res) {
      if (err) return console.log(err);
      console.log(res); // { filename: '/app/businesscard.pdf' }
    });
  var file = path.join(__dirname, "mypdf.pdf");
  console.log("filepath= ", file);
  //res.download("mypdf1.pdf", { root: __dirname });
  //res.download(file);
  res.download(file);
});
///starting the server
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log("listening on port :", port);
});
