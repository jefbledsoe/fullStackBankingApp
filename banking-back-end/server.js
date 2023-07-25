require("dotenv").config();
// Initial set up of the server to import/require the necessary packages
const PORT = process.env.PORT || 9000;
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const dal = require("./dal.js");

app.use(cors());
app.options("*", cors());
app.use(bodyParser.json());
app.use(
  express.static(path.join(__dirname, "..", "banking-front-end-cra", "build"))
);
app.get("/", function (req, res) {
  res.sendFile(
    path.join(__dirname, "..", "banking-front-end-cra", "build", "index.html")
  );
});

////////////////// START ENDPOINTS ////////////////////////

// endpoint to create a user account
app.post("/createNewAccount/:email", function (req, res) {
  // using the dal to create a new account
  dal.createNewAccount(req.params.email).then((account) => {
    // console.log("new account", account);
    res.send(account);
  });
});

// endpoint to add an authorized user to an account
app.post("/addAuthorizedUser/:accountNumber",
  function (req, res) {
    // using the dal to create a new account
    
    dal
      .addAuthorizedUser(
        req.params.accountNumber,
        req.body
      )
      .then((account) => {
        console.log("response from addAuthorizedUser", account.value);
        res.send(account.value);
      });
  }
);

// endpoint to add user info to an account
app.put("/addUserInfo/:email", function (req, res) {
  // using the dal to create a new account
  
  // console.log("req.params.email :", req.params.email);
  // console.log("req.body :", req.body);
  dal
    .addUserInfo(
      req.params.email,
      req.body
    )
    .then((account) => {
      // console.log("response from addUserInfo", account);
      res.send(account);
    });
});

// endpoint to get a specific account
app.get("/getAccount/:email", function (req, res) {
  // using the dal to create a new account
  dal.getAccount(req.params.email).then((account) => {
    // console.log("response from getAccount", account);
    res.send(account);
  });
});

// endpoint to get a specific user information
app.get("/getUserInfo/:email", function (req, res) {
  // using the dal to create a new account
  dal.getUserInfo(req.params.email).then((account) => {
    // console.log("response from getUserInfo", account);
    res.send(account);
  });
});

// endpoint to make transactions
app.post("/addTransaction/:accountNumber", function (req, res) {
  console.log("entering makeTransaction endpoint");
  console.log("req.body :", req.body);
  // using the dal to add transaction
  dal
    .addTransaction(
      req.params.accountNumber,
      req.body.accessLevel,
      req.body.id,
      req.body.transactor,
      req.body.date,
      req.body.type,
      req.body.vendor,
      req.body.category,
      req.body.amount,
      req.body.balance
    )
    .then((transaction) => {
      // console.log("response from addTransaction", transaction);
      res.send(transaction);
    });
});


// Listen for requests on PORT 9000 or the Process Environment PORT
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});



