const genNewAccount = (firstName, lastName, email, phoneNumber, password) => {
  // generates random account number, inits account, adds user, returns account
  // TODO - need a fix to ensure that the new account number is unique
  let newAccountNumber = Math.floor(Math.random() * 100000000000);
  let creationDate = new Date().toISOString().slice(0, 10);
  let newAccount = {
    accountNumber: newAccountNumber,
    accountCreationDate: creationDate,
    balance: 0,
    transactions: [],
    authorizedUsers: [
      {
        firstName: firstName,
        lastName: lastName,
        email: email,
        phoneNumber: phoneNumber,
        password: password,
      },
    ],
  };
  return newAccount;
};

module.exports = { genNewAccount };
