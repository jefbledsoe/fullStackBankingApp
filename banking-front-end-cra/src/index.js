import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import Spa from "./Spa";
import dotenv from "dotenv";
dotenv.config();
// immport the spa component with require instead of import
// in order to run the dotenv.config() before the component is imported and rendered
// to be able to use the env variables in the component
//let Spa = require("./Spa").default;
const container = document.getElementById("root");
const root = createRoot(container);
// console.log("process.env", process.env);

root.render(
  <React.StrictMode>
    <Auth0Provider
      domain={process.env.REACT_APP_AUTH0_DOMAIN}
      clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri: `${window.location.origin}`,
      }}
    >
      <Router>
        <Spa />
      </Router>
    </Auth0Provider>
  </React.StrictMode>
);
// redirect_uri: `${window.location.origin}/maketransactions`,
