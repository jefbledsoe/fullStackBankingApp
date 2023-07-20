import React, { useEffect, useState } from "react";
import { UserContext } from "../utils/context";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { encode } from "punycode";

// Login page component
function Login() {
  // auth0
  const { loginWithRedirect, isAuthenticated, user, isLoading, error, logout } =
    useAuth0();

  // context
  const { accounts } = useContext(UserContext); //correct
  const { setActiveAccount } = useContext(UserContext);
  const { setUser } = useContext(UserContext);

  const { setCurrentPath } = useContext(UserContext);

  // navigate
  const navigate = useNavigate();

  // local state
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [attempts, setAttempts] = React.useState(1);



  useEffect(() => {
    setCurrentPath("/login/");

  }, []);

  async function checkUser() {
       //checks if email and password are valid
    // authentification is handled by auth0
    window.event.preventDefault();
    console.log("hitting loginwithredirect");
    await loginWithRedirect();

    
   
    // get account info from database with email and set active account

   

 
  }

  return (
    <div className="container">
      <div className="card p-2">
        <form>
          <div className="mb-3">
            <label htmlFor="InputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="InputEmail1"
              aria-describedby="emailHelp"
              placeholder="you@email.com"
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="InputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="InputPassword1"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
            />
          </div>
          <button type="submit" className="btn btn-success" onClick={checkUser}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
export default Login;
