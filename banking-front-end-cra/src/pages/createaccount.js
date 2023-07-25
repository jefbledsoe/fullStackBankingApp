import React, { useContext, useEffect, useState } from "react";
import superagent from "superagent";
import { UserContext } from "../utils/context";
import { useAuth0 } from "@auth0/auth0-react";
import Card from "react-bootstrap/Card";
import { Form, Button, Alert, Row, Col } from "react-bootstrap";
import { PatternFormat, NumericFormat } from "react-number-format";
import { useNavigate } from "react-router-dom";

function CreateAccount() {
  // form states
  const [firstName, setFirstName] = useState("");
  const [showFirstNameAlert, setShowFirstNameAlert] = useState(false);
  const [lastName, setLastName] = useState("");
  const [showLastNameAlert, setShowLastNameAlert] = useState(false);
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showPhoneNumberAlert, setShowPhoneNumberAlert] = useState(false);

  const {
    setCurrentPath,
    setActiveUser,
    setActiveAccount,
    activeUser,
    setIsNewUser,
  } = useContext(UserContext);
  const { user } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    setCurrentPath("/createaccount");
  }, []);

  async function handleFormSubmit(e) {
    e.preventDefault();
    console.log("hitting handleFormSubmit");
    firstName === ""
      ? setShowFirstNameAlert(true)
      : setShowFirstNameAlert(false);
    lastName === "" ? setShowLastNameAlert(true) : setShowLastNameAlert(false);
    phoneNumber === ""
      ? setShowPhoneNumberAlert(true)
      : setShowPhoneNumberAlert(false);
    if (firstName === "" || lastName === "" || phoneNumber === "") return;

    // all good if we get here
    // if all fields are filled out, then create user
    let userInfo = {
      firstName: firstName.toLowerCase().trim(),
      lastName: lastName.toLowerCase().trim(),
      address: address.toLowerCase().trim(),
      city: city.toLowerCase().trim(),
      state: state, // state is a select, no need to clean
      zipcode: zipcode, // zipcode is formatted, no need to clean
      phoneNumber: phoneNumber, // phoneNumber is formatted, no need to clean
    };
    // superagent put to add user info to database
    let emailToCheck = user.email.toLowerCase().trim();
    await superagent
      .put(`/addUserInfo/${emailToCheck}`)
      .send(userInfo)
      .then((res) => {
        console.log("CreateAccount - response from addUserInfo", res.body);
        setActiveUser({ ...activeUser, ...userInfo });
      });
    // superagent get to get account info from database
    await superagent.get(`/getAccount/${emailToCheck}`).then((res) => {
      console.log("CreateAccount - response from getAccount", res.body);
      setActiveAccount(res.body);
    });

    // clear form fields
    setFirstName("");
    setLastName("");
    setAddress("");
    setCity("");
    setState("");
    setZipcode("");
    setPhoneNumber("");

    // shows new user message on account details page
    setIsNewUser(false);

    // account is fully created, send to account details page
    navigate("/accountdetails");
  }

  return (
    <div className="container">
      <Card>
        <Card.Header className="fw-bold">
          Weloome to Bottomless Vault Banking
          <br />
          Finish creating your account by correctly filling out the form below.
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleFormSubmit}>
            <Form.Group className="mb-3" controlId="userInfo">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                className="mb-3"
                type="text"
                placeholder="Enter first name"
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                  setShowFirstNameAlert(false);
                }}
              />
              <Alert variant="danger" show={showFirstNameAlert}>
                First Name Is Required
              </Alert>
              {/* field break */}
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                className="mb-3"
                type="text"
                placeholder="Enter last name"
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                  setShowLastNameAlert(false);
                }}
              />
              <Alert variant="danger" show={showLastNameAlert}>
                Last Name Is Required
              </Alert>
              {/* field break */}
              <Form.Label>Address</Form.Label>
              <Form.Control
                className="mb-3"
                type="text"
                placeholder="Enter address"
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
              />
              {/* field break */}
              <Form.Label>City</Form.Label>
              <Form.Control
                className="mb-3"
                type="text"
                placeholder="Enter city"
                value={city}
                onChange={(e) => {
                  setCity(e.target.value);
                }}
              />
              {/* field break */}
              <Form.Label>State</Form.Label>
              <Form.Select aria-label="Default select example">
                <option>- Select A State -</option>
                <option value="AL">Alabama</option>
                <option value="AK">Alaska</option>
                <option value="AZ">Arizona</option>
                <option value="AR">Arkansas</option>
                <option value="CA">California</option>
                <option value="CO">Colorado</option>
                <option value="CT">Connecticut</option>
                <option value="DE">Delaware</option>
                <option value="DC">District Of Columbia</option>
                <option value="FL">Florida</option>
                <option value="GA">Georgia</option>
                <option value="HI">Hawaii</option>
                <option value="ID">Idaho</option>
                <option value="IL">Illinois</option>
                <option value="IN">Indiana</option>
                <option value="IA">Iowa</option>
                <option value="KS">Kansas</option>
                <option value="KY">Kentucky</option>
                <option value="LA">Louisiana</option>
                <option value="ME">Maine</option>
                <option value="MD">Maryland</option>
                <option value="MA">Massachusetts</option>
                <option value="MI">Michigan</option>
                <option value="MN">Minnesota</option>
                <option value="MS">Mississippi</option>
                <option value="MO">Missouri</option>
                <option value="MT">Montana</option>
                <option value="NE">Nebraska</option>
                <option value="NV">Nevada</option>
                <option value="NH">New Hampshire</option>
                <option value="NJ">New Jersey</option>
                <option value="NM">New Mexico</option>
                <option value="NY">New York</option>
                <option value="NC">North Carolina</option>
                <option value="ND">North Dakota</option>
                <option value="OH">Ohio</option>
                <option value="OK">Oklahoma</option>
                <option value="OR">Oregon</option>
                <option value="PA">Pennsylvania</option>
                <option value="RI">Rhode Island</option>
                <option value="SC">South Carolina</option>
                <option value="SD">South Dakota</option>
                <option value="TN">Tennessee</option>
                <option value="TX">Texas</option>
                <option value="UT">Utah</option>
                <option value="VT">Vermont</option>
                <option value="VA">Virginia</option>
                <option value="WA">Washington</option>
                <option value="WV">West Virginia</option>
                <option value="WI">Wisconsin</option>
                <option value="WY">Wyoming</option>
              </Form.Select>
              {/* field break */}
              <Form.Label>Zipcode</Form.Label>
              <PatternFormat
                className="form-control"
                format="#####"
                placeholder="Enter zipcode"
                value={zipcode}
                onChange={(e) => {
                  setZipcode(e.target.value);
                }}
              />
              {/* field break */}
              <Form.Label>Phone Number</Form.Label>
              <PatternFormat
                className="form-control"
                format="(###) ###-####"
                placeholder="Enter phone number"
                value={phoneNumber}
                onChange={(e) => {
                  setPhoneNumber(e.target.value);
                  setShowPhoneNumberAlert(false);
                }}
              />
              <br />
              <Alert variant="danger" show={showPhoneNumberAlert}>
                Phone Number Is Required
              </Alert>
              {/* field break */}
              <Button variant="success" type="submit">
                Submit
              </Button>
              <br />
              <Form.Text>Submit user information to proceed.</Form.Text>
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}

export default CreateAccount;
