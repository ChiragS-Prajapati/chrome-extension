/** @format */

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import SignupPage from "./SignupPage";
import HomePage from "./homePage";
import LoginPage from "./loginPage";
import { makeid } from "../constants/constants";

function InitialPage() {
  const user = JSON.parse(localStorage.getItem("userData"));
  const [Secret, setSecret] = useState("");
  const [route, setRoute] = useState({
    initial: true,
    home: false,
    login: false,
    signup: false,
  });

  const secretVal = localStorage.getItem("secret");

  const routeHandler = (route) => {
    if (user) {
      return <LoginPage />;
    }
    if (route.home) {
      return <HomePage />;
    }
    if (route.signup) {
      return <SignupPage />;
    }
  };
  useEffect(() => {
    if (!Secret) {
      const Secret = makeid(15);
      localStorage.setItem("secret", JSON.stringify(Secret));
      setSecret("Secret");
    }
    if (user) {
      setRoute({ initial: false, home: false, login: true, signup: false });
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      {route.initial && (
        <FlexDiv>
          <Infodiv>Hello, This is your user secret:</Infodiv>
          <SecretDiv>{secretVal}</SecretDiv>
          <SignupButton
            color={"#2571c9"}
            onClick={() => {
              setRoute({ ...route, initial: false, signup: true });
            }}>
            Click here for Sign Up
          </SignupButton>
        </FlexDiv>
      )}
      {routeHandler(route)}
    </div>
  );
}

export default InitialPage;

const Infodiv = styled.div`
  font-size: 20px;
  font-weight: 600;
`;

const FlexDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 100%;
  height: 150px;
  gap: 10px;
  border-radius: 8px;
  box-shadow: 0px 0px 3px 1px;
  padding: 5px;
`;

export const SignupButton = styled.div`
  background-color: ${(props) => props.color};
  color: white;
  border: none;
  width: auto;
  height: auto;
  border-radius: 4px;
  padding: 10px;
  font-size: 18px;
  margin-top: 6px;
  :hover {
    cursor: pointer;
    filter: brightness(0.9);
  }
`;

export const SecretDiv = styled.div`
  font-weight: 600;
  font-size: 20px;
  text-align: center;
  background-color: #e8e9e2;
  padding: 3px;
`;
