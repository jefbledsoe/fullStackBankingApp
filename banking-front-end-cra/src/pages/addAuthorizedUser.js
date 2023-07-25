import React, { useContext, useEffect, useState } from "react";
import superagent from "superagent";
import { UserContext } from "../utils/context";
import Card from "react-bootstrap/Card";
import { Form, Button, Alert } from "react-bootstrap";
import { PatternFormat } from "react-number-format";
import { useNavigate } from "react-router-dom";

function AddAuthorizedUser() {
  // form states
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");

  const [showFirstNameAlert, setShowFirstNameAlert] = useState(false);
  const [showLastNameAlert, setShowLastNameAlert] = useState(false);
  const [showPhoneNumberAlert, setShowPhoneNumberAlert] = useState(false);
  const [showAddressAlert, setShowAddressAlert] = useState(false);
  const [showCityAlert, setShowCityAlert] = useState(false);
  const [showStateAlert, setShowStateAlert] = useState(false);
  const [showZipcodeAlert, setShowZipcodeAlert] = useState(false);
  const [showEmailAlert, setShowEmailAlert] = useState(false);

  const {
    setCurrentPath,
    setActiveAccount,
    activeUser,
    setIsNewUser,
    activeAccount,
  } = useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => {
    setCurrentPath("/addauthorizeduser");
  }, []);

  async function handleFormSubmit(e) {
    e.preventDefault();
    // validate form fields
    firstName === ""
      ? setShowFirstNameAlert(true)
      : setShowFirstNameAlert(false);
    lastName === "" ? setShowLastNameAlert(true) : setShowLastNameAlert(false);
    phoneNumber === ""
      ? setShowPhoneNumberAlert(true)
      : setShowPhoneNumberAlert(false);
    email === "" ? setShowEmailAlert(true) : setShowEmailAlert(false);
    address === "" ? setShowAddressAlert(true) : setShowAddressAlert(false);
    city === "" ? setShowCityAlert(true) : setShowCityAlert(false);
    state === "" ? setShowStateAlert(true) : setShowStateAlert(false);
    zipcode === "" ? setShowZipcodeAlert(true) : setShowZipcodeAlert(false);
    // if any fields are empty, return
    if (
      firstName === "" ||
      lastName === "" ||
      phoneNumber === "" ||
      email === "" ||
      city === "" ||
      state === "" ||
      zipcode === "" ||
      address === ""
    )
      return;

    // all good if we get here
    // if all fields are filled out, then create user
    let userInfo = {
      accessLevel: 1,
      firstName: firstName,
      lastName: lastName,
      address: address,
      city: city,
      state: state,
      zipcode: zipcode,
      phoneNumber: phoneNumber,
      email: email,
    };
    // superagent put to add user info to database
    await superagent
      .post(`/addAuthorizedUser/${activeAccount.accountNumber}`)
      .send(userInfo)
      .then((res) => {
        console.log("response from addUserInfo", res.body);
        setActiveAccount(res.body);
      });
    // get updated account info from database and set active account
    await superagent.get(`/getAccount/${activeUser.email}`).then((res) => {
      console.log("response from getAccount", res.body);
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
    setEmail("");
    // SPA will update context with user info
    // finished with create account, send to home
    setIsNewUser(false);
    navigate("/accountdetails");
  }
  return (
    <div className="container">
      <Card>
        <Card.Header className="fw-bold">
          Fill out the user information below to add an authorized user to your
          account.
          <br />
          When the user signs up, they will be able to view this account
          information.
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleFormSubmit}>
            {/* Form to capture firstName, lastName, address, email, city, state, zipcode, and phoneNumber */}
            <Form.Group className="mb-3" controlId="userInfo">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter first name"
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                  setShowFirstNameAlert(false);
                }}
              />
              <Alert
                className="pt-1 pb-1 mt-1"
                variant="danger"
                show={showFirstNameAlert}
              >
                First Name Is Required
              </Alert>
              {/*  */}
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter last name"
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                  setShowLastNameAlert(false);
                }}
              />
              <Alert
                className="pt-1 pb-1 mt-1"
                variant="danger"
                show={showLastNameAlert}
              >
                Last Name Is Required
              </Alert>
              {/*  */}
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter address"
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
              />
              <Alert
                className="pt-1 pb-1 mt-1"
                variant="danger"
                show={showAddressAlert}
              >
                Address Is Required
              </Alert>
              {/*  */}
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter city"
                value={city}
                onChange={(e) => {
                  setCity(e.target.value);
                }}
              />
              <Alert
                className="pt-1 pb-1 mt-1"
                variant="danger"
                show={showCityAlert}
              >
                City Is Required
              </Alert>
              {/*  */}
              <Form.Label>State</Form.Label>
              <Form.Select
                title="- Select a state -"
                onChange={(e) => {
                  setState(e.target.value);
                }}
              >
                <option value=""> - Select -</option>
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
              <Alert
                className="pt-1 pb-1 mt-1"
                variant="danger"
                show={showStateAlert}
              >
                State Is Required
              </Alert>
              {/*  */}
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
              <Alert
                className="pt-1 pb-1 mt-1"
                variant="danger"
                show={showZipcodeAlert}
              >
                Zipcode Is Required
              </Alert>
              {/*  */}
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
              <Alert
                className="pt-1 pb-1 mt-1"
                variant="danger"
                show={showPhoneNumberAlert}
              >
                Phone Number Is Required
              </Alert>
              {/*  */}
              <Form.Label>Email</Form.Label>
              <Form.Control
                placeholder="Enter email address"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setShowEmailAlert(false);
                }}
              />
              <Alert
                className="pt-1 pb-1 mt-1"
                variant="danger"
                show={showEmailAlert}
              >
                Email Is Required
              </Alert>
              {/*  */}
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

export default AddAuthorizedUser;
