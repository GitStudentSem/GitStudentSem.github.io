import styled from "styled-components/macro";
import React, { useState } from "react";
import { RiLoginCircleFill } from "react-icons/ri";
import Title from "./Title";
import axios from "../../axios";

const StyledRegisterWrapper = styled.form`
  width: 48%;
  height: 100%;
`;
const StyledInput = styled.input`
  outline: none;
  border: none;
  background-color: rgba(255, 255, 255, 0.2);
  padding: 5px;
  border-radius: 5px;
  margin-bottom: 10px;
  width: 100%;
  &::placeholder {
    color: rgb(255, 255, 255);
  }
`;
const StyledSendBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;
const StyledStatus = styled.p`
  color: rgba(255, 255, 255, 0.8);
`;
const StyledButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;
  border: none;
  cursor: pointer;
  margin: 0;
  padding: 5px;
  transition: all 0.3s;
  border-radius: 5px;
  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
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

const Login = ({ setIsLoginForm, setIsRegisterForm, setName }) => {
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);

  const [password, setPassword] = useState("");
  const [isValidPassword, setIsValidPassword] = useState(true);

  const [fullName, setFullName] = useState("");
  const [isValidFullName, setIsValidFullName] = useState(true);

  const validateEmail = () => {
    if (email.length > 0) {
      return setIsValidEmail(true);
    }
    return setIsValidEmail(false);
  };

  const validatePassword = () => {
    if (password.length > 0) {
      return setIsValidPassword(true);
    }
    return setIsValidPassword(false);
  };

  const validateFullName = () => {
    if (password.length > 0) {
      return setIsValidFullName(true);
    }
    return setIsValidFullName(false);
  };

  const onChangeHandler = (e, setValue, validateValue) => {
    e.preventDefault();
    setValue(e.target.value);
    validateValue(e.target.value);
  };

  const handleSubmit = async () => {
    const { data } = await axios.post("/auth/register", {
      fullName,
      email,
      password,
    });
    if ("token" in data) {
      setName(data.fullName);
    }
  };

  return (
    <StyledRegisterWrapper
      onSubmit={(e) => {
        e.preventDefault();
        console.log(handleSubmit());
      }}
    >
      <Title>Регистрация</Title>
      <StyledInput
        type='text'
        value={fullName}
        onFocus={(e) => {
          onChangeHandler(e, setFullName, validateFullName);
        }}
        onChange={(e) => {
          onChangeHandler(e, setFullName, validateFullName);
        }}
        placeholder='Как к вам обращаться?'
      />
      <StyledInput
        type='text'
        value={email}
        onFocus={(e) => {
          onChangeHandler(e, setEmail, validateEmail);
        }}
        onChange={(e) => {
          onChangeHandler(e, setEmail, validateEmail);
        }}
        placeholder='почта'
      />
      <StyledInput
        type='text'
        value={password}
        onFocus={(e) => {
          onChangeHandler(e, setPassword, validatePassword);
        }}
        onChange={(e) => {
          onChangeHandler(e, setPassword, validatePassword);
        }}
        placeholder='пароль'
      />
      <StyledSendBlock>
        <StyledStatus>
          {isValidEmail && isValidPassword && isValidFullName
            ? ""
            : "В данных есть ошибка"}
        </StyledStatus>
        <StyledButton>
          <RiLoginCircleFill size={30} fill='rgba(255, 255, 255, 0.8)' />
        </StyledButton>
      </StyledSendBlock>
      {/* <StyledIsdev isDev>
                <p>Скоро появится</p>
            </StyledIsdev> */}
      <StyledButton
        onClick={() => {
          setIsLoginForm(true);
          setIsRegisterForm(false);
        }}
      >
        Уже есть аккаунт? Войдите в него!
      </StyledButton>
    </StyledRegisterWrapper>
  );
};
export default Login;
