import React, { useEffect } from "react";
import { useContext } from "react";
import { UserContext } from "../utils/context";
import { useAuth0 } from "@auth0/auth0-react";

function UserAndAccountRibbon(props) {
  const { logout} = useAuth0();
  const { activeAccount, activeUser } = useContext(UserContext);
  
  useEffect(() => {
  
  }, [activeUser]);

  function handleTempNewUser(){
    if(activeUser.firstName === undefined || activeUser.lastName === undefined) {
      return "New User";
    }
    return `${activeUser.firstName} ${activeUser.lastName}`;
  }
  return (
    <div className="container">
      <div className="row">
      {/* user and account details display */}
        <div className="text-start col">
          <div className="fw-bolder fs-4">{`Welcome,  ${handleTempNewUser()}`}</div>
          <div className="fw-bold">{`Account Number ${activeAccount.accountNumber} `}</div>
        </div>
        <div className="text-end col align-middle">
          {/* Logout button */}
          <button 
            onClick={logout}
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
