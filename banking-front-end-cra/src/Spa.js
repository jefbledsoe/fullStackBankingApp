import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { UserContext } from "./utils/context";
import { useAuth0 } from "@auth0/auth0-react";

//page references
import Home from "./pages/home.js";
import CreateAccount from "./pages/createaccount.js";
import About from "./pages/about.js";
import Login from "./pages/login.js";
import TOS from "./pages/tos.js";
import MakeTransactions from "./pages/maketransactions.js";
import AccountDetails from "./pages/accountDetails.js";

//Component references
import Nav from "./components/BankNavBar.js";
import UserAndAccountRibbon from "./components/UserAndAccountRibbon.js";
import AddAuthorizedUser from "./pages/addAuthorizedUser";
import BankNavBar from "./components/BankNavBar.js";

//spa
function Spa() {
  // Serves as default account info until DB is connected
  const [activeAccount, setActiveAccount] = useState({
    accountNumber: "xxxxxxxxxxxx",
    accountCreationDate: "2021-02-01",
    balance: 0,
    transactions: [
      {
        id: "test-transaction",
        Transactor: "- loading name ... $-",
        date: "2021-02-01",
        type: "Deposit",
        vendor: "Born rich bank",
        category: "income",
        transactor: "Jane Doe",
        amount: 9999,
        balance: 9999,
      },
    ],
    authorizedUsers: [
      {
        firstName: "... Loading",
        lastName: "New User",
        email: "456@yourmail.com",
        phoneNumber: "800-867-5309",
      },
    ],
  });
  // serves as default during loads and until DB is connected with a full user object
  const [activeUser, setActiveUser] = useState({
    firstName: "... Loading",
    lastName: "New User",
    email: "456@yourmail.com",
    phoneNumber: "800-867-5309",
  });
  // helps handle navbar highlighting
  const [currentPath, setCurrentPath] = useState(
    window.location.pathname.toString().toLowerCase()
  );
  const [isNewUser, setIsNewUser] = useState(false);

  const superagent = require("superagent");
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth0();

  async function handleAuthChange() {
    // get account from DB, set active account and activeUser
    if (isAuthenticated) {
      //clean email for DB checks/hits
      let emailToCheck = user.email.toLowerCase().trim();
      superagent
        .get(`/getAccount/${emailToCheck}`)
        .then((getAccountResponse) => {
          if (getAccountResponse.body === null) {
            // this means its a new user
            // generate new in DB, get acct info and set actives
            superagent
              .post(`/createNewAccount/${emailToCheck}`)
              .then((createNewAccountResponse) => {
                setActiveAccount(createNewAccountResponse.body);
                setActiveUser({
                  email: user.email,
                });
              });
            //after acct gen, send to create account page to finish getting user's info
            setIsNewUser(true);
            navigate("/createaccount");
          } else {
            // this means its a returning user
            if (
              getAccountResponse.body.authorizedUsers[0].firstName === null ||
              getAccountResponse.body.authorizedUsers[0].firstName === undefined
            ) {
              // user setup is incomplete, send to createaccount and restrict access to other pages
              setIsNewUser(true);
              navigate("/createaccount");
            } else {
              // user info is complete, set active account and user
              setActiveAccount(getAccountResponse.body);
              let tempUser = getAccountResponse.body.authorizedUsers.filter(
                (element) => element.email === user.email
              );
              setActiveUser(tempUser[0]);
              setIsNewUser(false);
            }
          }
        });
    }
  }
  // on Authentcation change, login or out, if authenticated, 
  // get and set set active account and user
  useEffect(() => {
    handleAuthChange();
  }, [isAuthenticated]);

  return (
    <div>
      <UserContext.Provider
        value={{
          activeUser,
          setActiveUser,
          activeAccount,
          setActiveAccount,
          isAuthenticated,
          currentPath,
          setCurrentPath,
          isNewUser,
          setIsNewUser,
        }}
      >
        <div className="container">
          {/* Header */}
          <div className="fs-1 fw-bold text-uppercase text-center">
            Bottomless Vault Banking
          </div>
        </div>
        <BankNavBar />
        {isAuthenticated && ( //if logged in, show welcome message
          <UserAndAccountRibbon
            firstName={activeUser.firstName}
            accountNumber={activeAccount.accountNumber}
            setActiveAccount={setActiveAccount}
            activeUser={activeUser}
            activeAccount={activeAccount}
            currentPath={currentPath}
          />
        )}

        <Routes>
          <Route
            exact
            path="/"
            element={
              <Home
                isloggedIn={isAuthenticated}
                setActiveUser={setActiveUser}
                setActiveAccount={setActiveAccount}
              />
            }
          />
          <Route
            exact
            path="/maketransactions"
            element={
              <MakeTransactions
                activeAccount={activeAccount}
                setActiveAccount={setActiveAccount}
                activeUser={activeUser}
                isloggedIn={isAuthenticated}
              />
            }
          />
          <Route
            exact
            path="/createAccount"
            element={
              <CreateAccount
                isLoggedIn={isAuthenticated}
                setActiveUser={setActiveUser}
                setActiveAccount={setActiveAccount}
                isNewUser={isNewUser}
                setIsNewUser={setIsNewUser}
              />
            }
          />
          <Route
            exact
            path="/addAuthorizedUser"
            element={
              <AddAuthorizedUser
                isLoggedIn={isAuthenticated}
                setActiveUser={setActiveUser}
                setActiveAccount={setActiveAccount}
                isNewUser={isNewUser}
                setIsNewUser={setIsNewUser}
              />
            }
          />
          <Route
            exact
            path="/accountDetails"
            element={
              <AccountDetails
                isLoggedIn={isAuthenticated}
                setActiveUser={setActiveUser}
                setActiveAccount={setActiveAccount}
                isNewUser={isNewUser}
                setIsNewUser={setIsNewUser}
              />
            }
          />
          <Route
            exact
            path="/login"
            element={
              <Login
                setActiveUser={setActiveUser}
                setActiveAccount={setActiveAccount}
              />
            }
          />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/TOS" element={<TOS />} />
        </Routes>
      </UserContext.Provider>
    </div>
  );
}

export default Spa;
