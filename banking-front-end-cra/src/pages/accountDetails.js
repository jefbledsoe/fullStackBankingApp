import React from "react";
import { Card, CloseButton, Row, Col, ListGroup } from "react-bootstrap";
import { useContext, useState } from "react";
import { UserContext } from "../utils/context";
import { useNavigate } from "react-router-dom";
import AuthorizedUserCard from "../components/authorizedUserCard";
import { useEffect } from "react";

function AccountDetails() {
  const { activeAccount, isNewUser, setIsNewUser, setCurrentPath } =
    useContext(UserContext);
  const Navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState();

  const handleSelect = (selectedIndex, e) => {
 
  };

  useEffect(() => {
    setCurrentPath("/accountdetails");
  }, []);

  return (
    <div className="container">
      {/* New user message to display only when user/account is first created */}
      {isNewUser && (
        <Card>
          <Card.Header className="fw-bold fs-3">
            <Row>
              <Col>Congratulations and Welcome</Col>
              <Col className="row justify-content-end">
                <CloseButton
                  className="bg bg-danger "
                  onClick={() => setIsNewUser(false)}
                />
              </Col>
            </Row>
          </Card.Header>
          <Card.Body>
            <Card.Text className="m-3 fs-4">
              Your new account has been created!
              <br />
              Check out your account details below.
            </Card.Text>
          </Card.Body>
        </Card>
      )}
      {/* Account Details */}
      <Card className="mt-3">
        <Card.Header className="fw-bold fs-3">Account Details</Card.Header>
        <Card.Body>
          <ListGroup>
            <ListGroup.Item>
              <Row>
                <Col>Account Number:</Col>
                <Col>{activeAccount.accountNumber}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Account Creation Date:</Col>
                <Col>{activeAccount.accountCreationDate}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Account Balance:</Col>
                <Col>$ {activeAccount.balance}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item
              onClick={() => {
                Navigate("/maketransactions");
              }}
            >
              <Row>
                <Col className="text-primary fw-bold text-decoration-underline">
                  Make Transactions and See Transaction History
                </Col>
              </Row>
            </ListGroup.Item>
          </ListGroup>
        </Card.Body>
      </Card>
      {/* Users expanding list */}
      <Card className="mt-3">
        <Card.Header className="fw-bold fs-3">Authorized Users</Card.Header>
        <Card.Body className="p-2" >
          {activeAccount.authorizedUsers.map((user, index) => {
            return <AuthorizedUserCard key={index} user={user} />;
          })}
        </Card.Body>
      </Card>
    </div>
  );
}

export default AccountDetails;
