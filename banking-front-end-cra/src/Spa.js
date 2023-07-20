import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserContext } from "./utils/context";
import { useAuth0 } from "@auth0/auth0-react";

//page references
import Home from "./pages/home.js";
import CreateAccount from "./pages/createaccount.js";
import About from "./pages/about.js";
import Login from "./pages/login.js";
import TOS from "./pages/tos.js";
import MakeTransactions from "./pages/maketransactions.js";

//Component references
import Nav from "./components/nav.js";
import UserAndAccountRibbon from "./components/UserAndAccountRibbon.js";

//spa
function Spa() {
  const [activeAccount, setActiveAccount] = useState({
    // need to clear this when testing is done
    accountNumber: 708533606,
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
        firstName: "The",
        lastName: "Hulk",
        email: "456@yourmail.com",
        phoneNumber: "800-867-5309",
      },
    ],
  });
  // need to clear this when testing is done
  const [activeUser, setActiveUser] = useState({
    firstName: "Loading User...",
    lastName: "Loading User...",
    email: "456@yourmail.com",
    phoneNumber: "800-867-5309",
  });
  const [currentPath, setCurrentPath] = useState(
    window.location.pathname.toString().toLowerCase()
  );

  const superagent = require("superagent");
  // auth0
  const { isAuthenticated, user } = useAuth0();

  // on Authentcation change, login or out, if authenticated, get and set set active account and user
  useEffect(() => {
    console.log("Authentification changed in SPA");
    console.log("isAuthenticated: ", isAuthenticated);
    console.log("window.location.origin: ", window.location.origin);
    if (isAuthenticated) {
      console.log("user: ", user);
      // get account from DB, set active account and activeUser
      superagent.get(`/getAccount/${user.email}`).then((getAccountResponse) => {
        console.log("getAccountResponse.body", getAccountResponse.body);
        if (getAccountResponse.body === null) {
          // this means its a new user
          console.log("new user detected, creating new account");
          superagent
            .post(`/createNewAccount/${user.email}`)
            .then((createNewAccountResponse) => {
              console.log(
                "createNewAccountResponse.body",
                createNewAccountResponse.body
              );
              setActiveAccount(createNewAccountResponse.body);
              setActiveUser({
                email: user.email,
              });
            });
        } else {
          setActiveAccount(getAccountResponse.body);
          let tempUser = getAccountResponse.body.authorizedUsers.filter(
            (element) => element.email === user.email
          );
          console.log("tempUser", tempUser[0]);
          setActiveUser(tempUser[0]);
        }
      });
    }
  }, [isAuthenticated]);

  const inlineBlock = {
    display: "inline-block",
  };

  return (
    <div className="bg-">
      <UserContext.Provider
        value={{
          activeUser,
          setActiveUser,
          activeAccount,
          setActiveAccount,
          isAuthenticated,
          //doFetch, // to be used with strapi DB later
          currentPath,
          setCurrentPath,
        }}
      >
        <div className="container">
          {/* Header */}
          <div className="fs-1 fw-bold text-uppercase " style={inlineBlock}>
            <img
              src={require("./pages/bankLogo.png")}
              alt="..."
              width="150"
              height="75"
            />
            Bottomless Vault Banking
          </div>
        </div>
        <Nav />
        {isAuthenticated && ( //if logged in, show welcome message
          <UserAndAccountRibbon
            firstName={activeUser.firstName}
            accountNumber={activeAccount.accountNumber}
            setActiveAccount={setActiveAccount}
          />
        )}
        <Routes>
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
            path="/createAccount"
            element={
              <CreateAccount
                isLoggedIn={isAuthenticated}
                setActiveUser={setActiveUser}
                setActiveAccount={setActiveAccount}
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
