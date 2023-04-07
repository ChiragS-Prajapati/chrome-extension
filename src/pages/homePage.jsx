/** @format */

import React, { useState } from "react";
import styled from "styled-components";
import InitialPage, { SignupButton } from "./InitialPage";
import LoginPage from "./loginPage";
import { makeid } from "../constants/constants";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { EcryptData, DecryptData } from "../constants/constants";
import { SecretDiv } from "./InitialPage";

const HomePage = () => {
  const user = JSON.parse(localStorage.getItem("userData"));
  const [route, setRoute] = useState({
    initial: false,
    home: true,
    login: false,
    signup: false,
  });

  const [secret, setSecret] = useState("");

  const routeHandler = (route) => {
    if (route.initial) {
      return <InitialPage />;
    }
    if (route.login) {
      return <LoginPage />;
    }
  };

  const handleLogut = () => {
    setRoute({ ...route, login: true, home: false });
    return;
  };

  return (
    <>
      <ToastContainer autoClose={1500} />
      {route.home && (
        <div>
          <h2>Welcome {user?.name}</h2>
          <h3>Secret:</h3>
          <SecretDiv>{DecryptData(user?.secret)}</SecretDiv>
          <h3>Ecrypted Secret:</h3>
          <EncrDiv>
            <EncrptData>{secret ? secret : user?.secret}</EncrptData>
          </EncrDiv>

          <FormDiv>
            <ButtonDiv>
              <div>
                <SignupButton
                  color={"#fc8c30"}
                  onClick={() => {
                    const sec = makeid(15);
                    setSecret(EcryptData(sec));
                    localStorage.setItem(
                      "userData",
                      JSON.stringify({
                        ...user,
                        secret: EcryptData(sec),
                      })
                    );
                  }}>
                  Regenerate Secret
                </SignupButton>
              </div>
              <div>
                <SignupButton
                  color={"red"}
                  onClick={() => {
                    setRoute({ ...route, home: false, initial: true });
                    toast.success(`Your application reset successfully`);
                    localStorage.removeItem("userData");
                  }}>
                  Reset Application
                </SignupButton>
              </div>
            </ButtonDiv>
            <div>
              <SignupButton
                color={"blue"}
                onClick={() => {
                  handleLogut();
                }}>
                Sign out
              </SignupButton>
            </div>
          </FormDiv>
        </div>
      )}
      {routeHandler(route)}
    </>
  );
};

export default HomePage;

const FormDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const EncrDiv = styled.div`
  width: 330px;
  background-color: #e4e6e1;
`;

const EncrptData = styled.p`
  display: flex;
  word-break: break-all;
`;

const ButtonDiv = styled.div`
  display: flex;
  gap: 10px;
`;
