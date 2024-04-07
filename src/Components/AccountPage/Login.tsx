import styled from "styled-components";
import { ChangeEvent, useState } from "react";
import { RiLoginCircleFill } from "react-icons/ri";
import Title from "./Title";
import user from "../../store/user";
import { observer } from "mobx-react-lite";
import { logError } from "../../scripts/errorLog";

const StyledLoginWrapper = styled.form`
  width: 60%;
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
  padding: 5px;
  transition: all 0.3s;
  border-radius: 5px;
  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;

interface ILoginProps {
  setIsLoginForm: (isLoginForm: boolean) => void;
  setIsRegisterForm: (isregisterForm: boolean) => void;
}

const Login = observer(({ setIsLoginForm, setIsRegisterForm }: ILoginProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const onChangeHandler = (
    e: ChangeEvent<HTMLInputElement>,
    setValue: (value: string) => void
  ) => {
    e.preventDefault();
    setValue(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:3333/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (!response.ok) {
        return setErrorMessage(data.message);
      }
      window.localStorage.setItem("token", data.token);
      user.login(data.fullName);
    } catch (error) {
      logError(error);
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
        onChange={(e) => {
          onChangeHandler(e, setEmail);
        }}
        placeholder='почта'
      />
      <StyledInput
        type='text'
        value={password}
        onChange={(e) => {
          onChangeHandler(e, setPassword);
        }}
        placeholder='пароль'
      />
      <StyledSendBlock>
        <StyledStatus>{errorMessage}</StyledStatus>
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
