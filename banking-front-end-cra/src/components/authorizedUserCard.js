import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { Card, Collapse, ListGroup, Row, Col, OverlayTrigger, Dropdown } from "react-bootstrap";
import { UserContext } from "../utils/context";

function AuthorizedUserCard(props) {
  const [open, setOpen] = useState(false);
  const { activeUser } = useContext(UserContext);

  return (
    <Card>
      <Row
        onClick={(e) => {
          setOpen(!open);
        }}
        className="card-header fw-bold bg bg-success text-light p-2 m-0"
      >
        <Col xs={1}>
        <Dropdown.Toggle variant="dark" size="sm"  drop="end"/>        
        </Col>
        <Col xs={10}>
        {`${props.user.firstName} ${props.user.lastName}`}
        </Col>
        <Col className="pe-1">
        {/* active User dot */}
        <OverlayTrigger
              delay={{ show: 120, hide: 200 }}
              placement="left"
              className="opacity-50"  
              overlay={<div className="text-align-center me-4" >Current User</div>}
            >
            
          <div
            hidden={props.user.email != activeUser.email}
            style={{ height: "15px", width: "15px", borderRadius: 100 }}
            className="bg bg-dark position-absolute end-0 mt-2 me-3"
            
          ></div>
          </OverlayTrigger>
        </Col>
      </Row>

      <Collapse in={open}>
        <ListGroup>
          <ListGroup.Item>
            <Row>
              <Col>Access Level:</Col>
              <Col>{props.user.accessLevel}</Col>
            </Row>
          </ListGroup.Item>
          <ListGroup.Item>
            <Row>
              <Col>Email:</Col>
              <Col>{props.user.email}</Col>
            </Row>
          </ListGroup.Item>
          <ListGroup.Item>
            <Row>
              <Col>Phone Number:</Col>
              <Col>{props.user.phoneNumber}</Col>
            </Row>
          </ListGroup.Item>
          <ListGroup.Item>
            <Row>
              <Col>State:</Col>
              <Col>{props.user.state}</Col>
            </Row>
          </ListGroup.Item>
          <ListGroup.Item>
            <Row>
              <Col>City:</Col>
              <Col>{props.user.city}</Col>
            </Row>
          </ListGroup.Item>
          <ListGroup.Item>
            <Row>
              <Col>Zipcode:</Col>
              <Col>{props.user.zipcode}</Col>
            </Row>
          </ListGroup.Item>
          <ListGroup.Item>
            <Row>
              <Col>Address:</Col>
              <Col>{props.user.address}</Col>
            </Row>
          </ListGroup.Item>
        </ListGroup>
      </Collapse>
    </Card>
  );
}

export default AuthorizedUserCard;
