import { React } from "react";
import { UserContext } from "../utils/context";
import { useContext, useState, useEffect } from "react";

import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import { OverlayTrigger, Tooltip, Navbar, Nav, Button } from "react-bootstrap";

function BankNavBar() {
  // const { isloggedIn } = useContext(UserContext);
  const { currentPath, isNewUser } = useContext(UserContext);
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const isSelected = "m-1 text-light text-center bg bg-dark rounded p-2";
  const isNotSelected = "m-1 text-light text-center p-2";


  function checkNavSelected(link) {
    if (link === currentPath) {
      return isSelected;
    } else {
      return isNotSelected;
    }
  }
  return (
    <div className="container">
      <Navbar className="rounded pt-0 pb-0" expand="lg" collapseOnSelect  bg="success">
        <OverlayTrigger
          delay={{ show: 120, hide: 200 }}
          placement="top"
          className="opacity-50"
          overlay={<Tooltip>Home page</Tooltip>}
        >
          {/* Home button and bank logo */}
          <Navbar.Brand
            className="bg bg-success rounded"
            as={Link}
            to="/"
          >
            <img
              width="90"
              height="50"
              className={checkNavSelected("/")}
              src={require("./../images/bankLogo.png")}
              alt=""
           
              
            />
          </Navbar.Brand>
        </OverlayTrigger>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="m-2" />
        {/* Start of collapsable navbar items */}
        <Navbar.Collapse id="basic-navbar-nav" className="fs-5 fw-bold navbar-co">
          {/* Account details */}
          <div hidden={!isAuthenticated || isNewUser}>
            <OverlayTrigger
              delay={{ show: 120, hide: 200 }}
              placement="top"
              className="opacity-50"
              overlay={<Tooltip>Account details page</Tooltip>}
            >
              <Nav.Link
                className={checkNavSelected("/accountdetails")}
                as={Link}
                to="/accountdetails"
              >
                Account Details
              </Nav.Link>
            </OverlayTrigger>
          </div>
          {/* Make transactions */}
          <div hidden={!isAuthenticated || isNewUser}>
            <OverlayTrigger
              delay={{ show: 120, hide: 200 }}
              placement="top"
              className="opacity-50"
              overlay={<Tooltip>Make transactions page</Tooltip>}
            >
              <Nav.Link
                className={checkNavSelected("/maketransactions")}
                as={Link}
                to="/maketransactions"
              >
                Make Transactions
              </Nav.Link>
            </OverlayTrigger>
          </div>
          {/* Add user */}
          <div hidden={!isAuthenticated || isNewUser}>
            <OverlayTrigger
              delay={{ show: 120, hide: 200 }}
              placement="top"
              className="opacity-50"
              overlay={<Tooltip>Add user page</Tooltip>}
            >
              <Nav.Link
                className={checkNavSelected("/addauthorizeduser")}
                as={Link}
                to="/addauthorizeduser"
              >
                Add User
              </Nav.Link>
            </OverlayTrigger>
          </div>
          {/* Create accounts helper page */}
          <div hidden={!isNewUser}>
            <OverlayTrigger
              delay={{ show: 120, hide: 200 }}
              placement="top"
              className="opacity-50"
              overlay={<Tooltip>Create account page</Tooltip>}
            >
              <Nav.Link
                className={checkNavSelected("/createaccount")}
                as={Link}
                to="/createaccount"
              >
                Create Account
              </Nav.Link>
            </OverlayTrigger>
          </div>
          {/* Login / signup */}
          <div hidden={isAuthenticated}>
            <OverlayTrigger
              delay={{ show: 120, hide: 200 }}
              placement="top"
              className="opacity-50"
              overlay={<Tooltip>Secure login page</Tooltip>}
            >
              <Nav.Link
                className={checkNavSelected("/login")}
                onClick={() => loginWithRedirect()}
              >
                Login / Signup
              </Nav.Link>
            </OverlayTrigger>
          </div>
          {/* About */}
          <OverlayTrigger
            delay={{ show: 120, hide: 200 }}
            placement="top"
            className="opacity-50"
            overlay={<Tooltip>About page</Tooltip>}
          >
            <Nav.Link
              className={checkNavSelected("/about")}
              as={Link}
              to="/about"
            >
              About
            </Nav.Link>
          </OverlayTrigger>
          {/* Terms */}
          <OverlayTrigger
            delay={{ show: 120, hide: 200 }}
            placement="top"
            className="opacity-50"
            overlay={<Tooltip>Terms page</Tooltip>}
          >
            <Nav.Link className={checkNavSelected("/tos")} as={Link} to="/tos">
              Terms
            </Nav.Link>
          </OverlayTrigger>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}
export default BankNavBar;
