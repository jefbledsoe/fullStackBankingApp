require("dotenv").config();
const { MongoClient } = require("mongodb");
const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

// HELPERS FUNCTIONS --START

async function generateNewAccountInfo() {
  //creating the new account
  let newAccount = {
    accountNumber: Math.floor(Math.random() * 1000000000),
    accountCreationDate: new Date().toISOString().slice(0, 10),
    balance: 0,
    transactions: [],
    authorizedUsers: [],
  };

  try {
    //connecting to the database
    console.log("generateNewAccountInfo, connecting to database");
    await client.connect();
    const db = client.db("badBankAccounts");
    const accountsCollection = db.collection("fakeAccounts");

    //DB CRUD op - read/findOne - checking if the account number already exists,
    //if so calls the function again, recursively
    const account = await accountsCollection.findOne(
      // filtering for the account number
      { accountNumber: newAccount.accountNumber },
      (err, res) => {
        err ? reject(err) : resolve(res);
      }
    );
    if (account) {
      console.log("account already exists, generating new account info");
      generateNewAccountInfo();
    }
  } finally {
    //closing the connection to the database
    console.log("generateNewAccountInfo complete, closing connection");
    await client.close();
  }
  //returning the new account
  console.log("newAccount", newAccount);
  return newAccount;
}

// HELPERS FUNCTIONS --END

//creating a new account
//this funciton will take the first users information, create the account by
//generating the account number and other information then return the entire account
async function createNewAccount(email) {
  //generating a new account
  let newAccount = await generateNewAccountInfo();
  //creating a new authorized user
  let newAuthorizedUser = {
    accessLevel: 5,
    email: email,
  };
  //adding the new authorized user to the new account
  newAccount.authorizedUsers.push(newAuthorizedUser);
  try {
    //connecting to the database
    await client.connect();
    const db = client.db("badBankAccounts");
    const accountsCollection = db.collection("fakeAccounts");

    //DB CRUD op - create/insertOne
    const account = await accountsCollection.insertOne(
      { ...newAccount },
      (err, res) => {
        err ? reject(err) : resolve(res);
      }
    );
    console.log("account", account);
  } finally {
    //closing the connection to the database
    console.log("closing connection");
    await client.close();
  }
  console.log("newAccount", newAccount);
  //returning the new account
  return newAccount;
}

//adding an authorized user to an account
//this function will take the account number and the authorized users information
//and add the authorized user to the account then return the entire account
async function addAuthorizedUser(
  accountNumberToFind,
  firstName,
  lastName,
  email,
  phoneNumber
) {
  //creating a new authorized user
  let newAuthorizedUser = {
    accessLevel: 1, // all new authorized users will have access level 1 by default
    firstName: firstName,
    lastName: lastName,
    email: email,
    phoneNumber: phoneNumber,
  };
  let result = null;

  try {
    //connecting to the database
    await client.connect();
    const db = client.db("badBankAccounts");
    const accountsCollection = db.collection("fakeAccounts");

    //DB CRUD op - create/insertOne
    result = await accountsCollection.findOneAndUpdate(
      { accountNumber: parseInt(accountNumberToFind) },
      { $push: { authorizedUsers: newAuthorizedUser } },
      { new: true },
      (err, res) => {
        err ? reject(err) : resolve(res);
      }
    );
  } finally {
    //closing the connection to the database
    console.log("closing connection");
    await client.close();
  }
  //returning the new account
  return result;
}

//this function will take an email and return the account associated with that email
async function getAccount(userEmailToFind) {
  let accountFound = null;
  try {
    //connecting to the database
    await client.connect();
    const db = client.db("badBankAccounts");
    const accountsCollection = db.collection("fakeAccounts");

    //DB CRUD op - create/insertOne
    ////////////////// BUG HERE - I THINK ITS NOT THE RIGHT QUERY ///////////////////////
    accountFound = await accountsCollection.findOne(
      { authorizedUsers: { $elemMatch: { email: userEmailToFind } } },
      (err, res) => {
        err ? reject(err) : resolve(res);
      }
    );

    // console.log("accountFound", accountFound);
  } finally {
    //closing the connection to the database
    console.log("closing connection");
    await client.close();
  }
  //returning the found account
  return accountFound;
}

//this function will take the account number and transaction information,
//add the transaction to that account then return that account
async function addTransaction(
  accountNumberToFind,
  accessLevel,
  id,
  transactor,
  date,
  type,
  vendor,
  category,
  amount,
  balance
) {
  let newTransaction = {
    index: parseInt(id) + 1,
    transactor: transactor,
    date: date,
    type: type,
    vendor: vendor,
    category: category,
    amount: parseInt(amount),
    balance: parseInt(balance) + parseInt(amount),
  };
  try {
    //connecting to the database
    await client.connect();
    const db = client.db("badBankAccounts");
    const accountsCollection = db.collection("fakeAccounts");

    //DB CRUD op - create/insertOne
    result = await accountsCollection.findOneAndUpdate(
      { accountNumber: parseInt(accountNumberToFind) },
      {
        $push: { transactions: newTransaction },
        $set: { balance: newTransaction.balance },
      },
      { returnOriginal: false }
    ); // also need to update the balance
    if (result.ok === 1) {
      // console.log("Transaction added!!!!!!!!!!!!!!!!!!!!!");
      // console.log("result", result); // Updated document
      return newTransaction;
    } else {
      // console.log("Failed to add transaction");
      // console.log("result", result); // Updated document
      return "null";
    }
  } finally {
    //closing the connection to the database
    console.log("closing connection");
    await client.close();
  }
}

// warning this deletes the entire account not just the transaction
async function deleteTransaction(accountNumberToFind, transactionID) {
  try {
    //connecting to the database
    await client.connect();
    const db = client.db("badBankAccounts");
    const accountsCollection = db.collection("fakeAccounts");

    //DB CRUD op - create/insertOne
    result = await accountsCollection.findOneAndUpdate(
      { accountNumber: parseInt(accountNumberToFind) },
      { $pull: { transactions: { index: parseInt(transactionID) } } },
      { returnOriginal: false }
    ); // also need to update the balance
    if (result.ok === 1) {
      console.log("Transaction deleted!!!!!!!!!!!!!!!!!!!!!");
      console.log("result", result); // Updated document
      return "transaction deleted";
    } else {
      console.log("Failed to delete transaction");
      console.log("result", result); // Updated document
      return "null";
    }
  } finally {
    //closing the connection to the database
    console.log("closing connection");
    await client.close();
  }
}

// this function will take the account number of the sender and receiver and transaction information,
// then adds the transaction to both accounts, updates both balances and the transaction
async function sendOtherUserFunds(
  senderAccountNumberToFind,
  receiverAccountNumberToFind,
  accessLevel,
  id,
  transactor,
  date,
  type,
  vendor,
  catagory,
  amount,
  balance
) {}

module.exports = {
  createNewAccount,
  addAuthorizedUser,
  addTransaction,
  getAccount,
  sendOtherUserFunds,
  deleteTransaction,
};
