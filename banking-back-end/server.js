require("dotenv").config();
// Initial set up of the server to import/require the necessary packages
const PORT = process.env.PORT || 9000;
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const dal = require("./dal.js");

// console.log("process.env.MONGO_URI inside server.js", process.env.MONGO_URI);

// middleware
// coors allows us to make requests from the front end to the back end on different ports, "origins"
app.use(cors());
app.options("*", cors());

// body parser allows us to parse the body of the request, which is key for any post request that has a body
app.use(bodyParser.json());

// serve static assets normally
app.use(
  express.static(path.join(__dirname, "../", "banking-front-end-cra", "public"))
);

// should initially handle the file serve the the endpoint /
// but only handle data CRUD ops for any other endpoint
app.get("/", function (req, res) {
  res.sendFile(
    path.join(__dirname, "../", "banking-front-end-cra", "public", "index.html")
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
app.post(
  "/addAuthorizedUser/:accountNumber/:firstName/:lastName/:email/:phoneNumber",
  function (req, res) {
    // using the dal to create a new account
    dal
      .addAuthorizedUser(
        req.params.accountNumber,
        req.params.firstName,
        req.params.lastName,
        req.params.email,
        req.params.phoneNumber
      )
      .then((account) => {
        // console.log("response from addAuthorizedUser", account);
        res.send(account);
      });
  }
);

// endpoint to get a specific account
app.get("/getAccount/:email", function (req, res) {
  // using the dal to create a new account
  dal.getAccount(req.params.email).then((account) => {
    // console.log("response from getAccount", account);
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

app.delete(
  "/deleteTransaction/:accountNumber/:transactionID",
  function (req, res) {
    console.log("entering deleteTransaction endpoint");
    console.log("req.body :", req.body);
    // using the dal to add transaction
    dal
      .deleteTransaction(req.params.accountNumber, req.params.transactionID)
      .then((transaction) => {
        // console.log("response from deleteTransaction", transaction);
        res.send(transaction);
      });
  }
);

// Listen for requests on PORT 9000 or the Process Environment PORT
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
