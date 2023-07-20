import React from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../utils/context";
import { useContext, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

function Home() {
  const navigate = useNavigate();
  const { setCurrentPath, setActiveUser, setActiveAccount } =
    useContext(UserContext);
  const { isAuthenticated, loginWithRedirect, user } = useAuth0();
  useEffect(() => {
    setCurrentPath("/");
  }, []);

  async function handleLogin() {
    window.event.preventDefault();
    console.log("hitting loginwithredirect"); // diverts back to home page after login
    await loginWithRedirect();
  }
  const superagent = require("superagent");
  async function handleCreateAccount() {
    window.event.preventDefault();
    console.log("hitting loginwithredirect");
    await loginWithRedirect({ screen_hint: "signup" }); // diverts back to home page after signup
  }

  return (
    <div className="container">
      <div className="card">
        <div className="card-img text-center">
          <img
            className="m-3"
            src={require("./bankicon.png")}
            alt={require("./bankicon2.jpg")}
            width="400"
            height="400"
          />
        </div>
        <h2 className="card-title m-3">Welcome to Bottomless Vault Banking</h2>
        <p className="card-body m-3">
          Welcome to Bottomless Vault Banking, where your financial dreams find
          a secure home. We believe in empowering individuals and businesses
          with innovative banking solutions tailored to your unique needs. With
          a legacy of trust and a commitment to excellence, we strive to be your
          reliable partner in navigating the financial landscape. Explore our
          comprehensive range of services, including personal and business
          accounts, loans, investments, and cutting-edge digital banking tools
          designed to simplify your financial journey. Our dedicated team of
          experts is here to assist you every step of the way, ensuring your
          financial success and peace of mind. Join the Bottomless Vault family
          today and unlock a world of limitless possibilities. Your dreams, our
          vault - together, we thrive!
        </p>
        {!isAuthenticated && (
          <form>
            <button className="btn btn-success m-3" onClick={handleLogin}>
              Login
            </button>
            <div className="m-3">Dont have an account yet?</div>
            <button
              className="btn btn-success m-3"
              onClick={handleCreateAccount}
            >
              Create an account
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
export default Home;
