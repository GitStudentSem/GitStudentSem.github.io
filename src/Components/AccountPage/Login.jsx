import styled from "styled-components/macro";
import React, { useState } from "react";
import { RiLoginCircleFill } from "react-icons/ri";
import Title from "./Title";
import axios from "../../axios";
import user from "../../store/user";
import { observer } from "mobx-react-lite";

const StyledLoginWrapper = styled.form`
  /* width: 48%; */
  height: 100%;
`;
const StyledInput = styled.input`
  outline: none;
  border: none;
  background-color: rgba(255, 255, 255, 0.2);
  padding: 5px;
  border-radius: 5px;
  margin-bottom: 5px;
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
  /* padding: 5px; */
  transition: all 0.3s;
  border-radius: 5px;
  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;

const Login = observer(({ setIsLoginForm, setIsRegisterForm }) => {
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);

  const [password, setPassword] = useState("");
  const [isValidPassword, setIsValidPassword] = useState(true);

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

  const onChangeHandler = (e, setValue, validateValue) => {
    e.preventDefault();
    setValue(e.target.value);
    validateValue(e.target.value);
  };

  const handleSubmit = async () => {
    const { data } = await axios.post("/auth/login", {
      email,
      password,
    });
    if ("token" in data) {
      window.localStorage.setItem("token", data.token);
      user.login(data.fullName);
    }
  };

  return (
    <StyledLoginWrapper
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <Title>Войти</Title>
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
          {isValidEmail && isValidPassword ? "" : "В данных есть ошибка"}
        </StyledStatus>
        <StyledButton>
          <RiLoginCircleFill size={30} fill='rgba(255, 255, 255, 0.8)' />
        </StyledButton>
      </StyledSendBlock>
      <StyledButton
        onClick={() => {
          setIsLoginForm(false);
          setIsRegisterForm(true);
        }}
      >
        Еще нет аккаунта? Пора создать его!
      </StyledButton>
    </StyledLoginWrapper>
  );
});
export default Login;
