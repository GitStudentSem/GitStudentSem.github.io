import styled from "styled-components/macro";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoTodaySharp } from "react-icons/io5";
import Register from "./Register";
import Versions from "./Versions";
import Attention from "./Attention";
import ThemeControls from "./ThemeControls";
import ViewControl from "./ViewControl";
import Login from "./Login";
import { screenSize } from "../../scripts/screens";

const StyledAccountPage = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const StyledHeader = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
`;
const StyledMain = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 5px;
  height: calc(100% - 55px); // с вычетом высоты шапки
`;
const StyledButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;
  border: none;
  cursor: pointer;
  margin: 0;
  padding: 0;
  transition: all 0.3s;
  padding: 5px;
  border-radius: 5px;
  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;
const StyledFormsWrapper = styled.div`
  position: relative;
  padding: 20px;
  overflow: hidden;
  grid-row-start: 1;
  grid-row-end: 1;
  grid-column-start: 1;
  grid-column-end: 2;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
`;
const StyledHelloWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const StyledHelloBlock = styled.p`
  width: 100%;
  text-align: center;
`;
const StyledIsdev = styled.div`
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  position: absolute;
  text-align: center;
  left: 0;
  top: 0;
  width: ${(props) => (props.isDev ? "100%" : "0px")};
  height: ${(props) => (props.isDev ? "100%" : "0px")};
  background-color: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(${(props) => (props.isDev ? "3px" : "0px")});
`;

const AccountPage = ({ setColorsTheme, colorsTheme, name, setName }) => {
  //   const [name, setName] = useState("");
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isRegisterForm, setIsRegisterForm] = useState(false);
  const [isLoginForm, setIsLoginForm] = useState(true);

  const handleResize = () => {
    if (window.innerWidth <= screenSize.desktop) {
      setIsSmallScreen(true);
    } else {
      setIsSmallScreen(false);
    }
  };
  const logOut = () => {
    window.localStorage.removeItem("token");
    setName("");
  };

  useEffect(() => {
    handleResize();

    window.addEventListener("resize", handleResize);
  }, []);
  return (
    <StyledAccountPage>
      <StyledHeader>
        <StyledButton disabled>
          <Link to='/'>
            <IoTodaySharp size={30} fill='rgba(255, 255, 255, 0.8)' />
          </Link>
        </StyledButton>
      </StyledHeader>

      <StyledMain>
        <StyledFormsWrapper>
          {name ? (
            <StyledHelloWrapper>
              <StyledHelloBlock>привет, {name}</StyledHelloBlock>
              <StyledButton onClick={logOut}>Выйти из аккаунта</StyledButton>
            </StyledHelloWrapper>
          ) : (
            <>
              {isRegisterForm && (
                <Register
                  setIsRegisterForm={setIsRegisterForm}
                  setIsLoginForm={setIsLoginForm}
                  setName={setName}
                />
              )}
              {isLoginForm && (
                <Login
                  setIsRegisterForm={setIsRegisterForm}
                  setIsLoginForm={setIsLoginForm}
                  setName={setName}
                />
              )}
            </>
          )}
          {/* <StyledIsdev isDev>
                        <p>Скоро появится</p>
                    </StyledIsdev> */}
        </StyledFormsWrapper>

        <ThemeControls
          colorsTheme={colorsTheme}
          setColorsTheme={setColorsTheme}
        />

        <Versions />

        <ViewControl />

        <Attention />
      </StyledMain>
    </StyledAccountPage>
  );
};
export default AccountPage;
