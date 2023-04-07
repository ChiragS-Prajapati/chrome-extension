/** @format */

import React, { useState } from "react";
import styled from "styled-components";
import { SignupButton } from "./InitialPage";
import HomePage from "./homePage";
import InitialPage from "./InitialPage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginPage = () => {
  const user = JSON.parse(localStorage.getItem("userData"));

  const [userData, setUserData] = useState({
    name: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [route, setRoute] = useState({
    initial: false,
    home: false,
    login: true,
    signup: false,
  });

  const routeHandler = (route) => {
    if (route.home) {
      return <HomePage />;
    }
    if (route.initial) {
      return <InitialPage />;
    }
  };

  const handleLogin = () => {
    if (!userData.name || !userData.password) {
      setError("All fields are required");
      toast.error("All fields are required");
      return;
    } else if (
      userData.password !== user.password ||
      userData.name !== user.name
    ) {
      toast.error("Invalid Password or Name");
      setError("Invalid Password or Name");
      return;
    } else {
      toast.success("Sign in successfully");
      setError("");
      setRoute({ ...route, login: false, home: true });
      return;
    }
  };

  return (
    <>
      <ToastContainer autoClose={1500} />
      {route.login && (
        <div>
          <h1>Sign in</h1>
          {error && <Error>{error}</Error>}
          <FormDiv>
            <div>
              <Input
                autoComplete='off'
                type='text'
                name='name'
                placeholder='Name'
                value={userData.name}
                onChange={(e) => {
                  e.preventDefault();
                  setUserData({ ...userData, name: e.target.value });
                }}
              />
            </div>
            <div>
              <Input
                autoComplete='off'
                type='password'
                name='password'
                placeholder='Password'
                value={userData.password}
                onChange={(e) => {
                  e.preventDefault();
                  setUserData({ ...userData, password: e.target.value });
                }}
              />
            </div>
            <div>
              <SignupButton
                color={"#25c925"}
                onClick={() => {
                  handleLogin();
                }}>
                Sign in
              </SignupButton>
            </div>
            <div>
              <SignupButton
                color={"red"}
                onClick={() => {
                  localStorage.removeItem("userData");
                  toast.success(`Application reset successfully`);
                  setRoute({ ...route, login: false, initial: true });
                }}>
                Reset Application
              </SignupButton>
            </div>
          </FormDiv>
        </div>
      )}
      {routeHandler(route)}
    </>
  );
};

export default LoginPage;

const FormDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;

const Input = styled.input`
  width: 200px;
  height: 30px;
  border-radius: 4px;
`;

const Error = styled.p`
  color: red;
`;
