import React from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../utils/context";
import { useContext, useEffect } from "react";
import { Card, Image } from "react-bootstrap";

function Home() {
  const { setCurrentPath } = useContext(UserContext);

  useEffect(() => {
    setCurrentPath("/");
  }, []);

  // basic welcome page set up
  return (
    <div className="container">
      <Card>
        <Image
          className="m-3 mx-auto"
          src={require("./../images/bankicon.png")}
          alt={require("./../images/bankicon2.jpg")}
          width="400"
          height="400"
        ></Image>
        <Card.Header className="fs-3 fw-bold text-uppercase">
          Welcome to Bottomless Vault Banking
        </Card.Header>
        <Card.Text className="m-3">
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
        </Card.Text>
      </Card>
    </div>
  );
}
export default Home;
