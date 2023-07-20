import React from "react";
import { useContext } from "react";
import { UserContext } from "../utils/context";
import { useAuth0 } from "@auth0/auth0-react";

function UserAndAccountRibbon(props) {
  const { logout } = useAuth0();
  const { activeAccount, activeUser } = useContext(UserContext);

  const hanleLogout = () => {
    console.log(
      "while logging out --> window.location.origin :",
      window.location.origin
    );
    logout();
   };
  console.log("window.location.origin :", window.location.origin);
  return (
    <div className="container">
      <div className="row">
        <div className="text-start col">
          <div className="fw-bolder fs-4">{`Welcome,  ${activeUser.email}`}</div>
          <div className="fw-bold">{`Account Number ${activeAccount.accountNumber} `}</div>
        </div>
        <div className="text-end col align-middle">
          <button //logout button
            onClick={() => {
              hanleLogout();
            }}
            className="btn btn-danger m-3 fs"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserAndAccountRibbon;
