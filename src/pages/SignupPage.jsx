/** @format */

import React, { useState } from "react";
import styled from "styled-components";
import { SignupButton } from "./InitialPage";
import LoginPage from "./loginPage";
import HomePage from "./homePage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CryptoJS from "crypto-js";
import { secretPass } from "../constants/constants";

const SignupPage = () => {
  const [userData, setUserData] = useState({
    name: "",
    secret: "",
    password: "",
    cpassword: "",
  });
  const [error, setError] = useState("");
  const [route, setRoute] = useState({
    initial: false,
    home: false,
    login: false,
    signup: true,
  });

  const routeHandler = (route) => {
    if (route.home) {
      return <HomePage />;
    }
    if (route.login) {
      return <LoginPage />;
    }
  };

  const handleSubmit = () => {
    const secret = String(localStorage.getItem("secret"));

    if (!userData.name || !userData.password || !userData.cpassword) {
      toast.error("All fields are required");
      setError("All fields are required");
      return;
    } else if (userData.password !== userData.cpassword) {
      toast.error("Confirm password not match");
      setError("Confirm password not match");
      return;
    } else {
      if (secret) {
        localStorage.setItem(
          "userData",
          JSON.stringify({
            ...userData,
            secret: CryptoJS.AES.encrypt(
              JSON.stringify(secret.replaceAll('"', "")),
              secretPass
            ).toString(),
          })
        );
        CryptoJS.AES.encrypt(
          JSON.stringify(secret.replaceAll('"', "")),
          secretPass
        ).toString();

        toast.success("User added successfully");
        setError("");
        setRoute({ ...route, signup: false, login: true });

        return;
      } else {
        setError("Secret not found");
        return;
      }
    }
  };

  return (
    <>
      <ToastContainer autoClose={1500} />
      {route.signup && (
        <div>
          <h1>Sign Up</h1>
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
              <Input
                autoComplete='off'
                type='password'
                name='cpassword'
                placeholder='Confirm Password'
                value={userData.cpassword}
                onChange={(e) => {
                  e.preventDefault();
                  setUserData({ ...userData, cpassword: e.target.value });
                }}
              />
            </div>
            <div>
              <SignupButton
                color={"#25c925"}
                onClick={() => {
                  handleSubmit();
                }}>
                Sign Up
              </SignupButton>
            </div>
          </FormDiv>
        </div>
      )}
      {routeHandler(route)}
    </>
  );
};

export default SignupPage;

const FormDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const Input = styled.input`
  width: 200px;
  height: 30px;
  border-radius: 4px;
`;

const Error = styled.p`
  color: red;
`;
