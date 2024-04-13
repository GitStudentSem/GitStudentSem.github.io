import styled from "styled-components";
import { ChangeEvent, FormEvent, useState } from "react";
import { RiLoginCircleFill } from "react-icons/ri";
import Title from "./Title";
import { UserStore } from "../../store/user";
import { observer } from "mobx-react-lite";
import { makeFetch } from "../../scripts/makeFetch";
import { TasksStore } from "../../store/tasks";

const StyledRegisterWrapper = styled.form`
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

type LoginPropsType = {
	setIsLoginForm: (isLoginForm: boolean) => void;
	setIsRegisterForm: (ssRegisterForm: boolean) => void;
};

export const RegisterForm = observer(
	({ setIsLoginForm, setIsRegisterForm }: LoginPropsType) => {
		const [email, setEmail] = useState("");
		const [password, setPassword] = useState("");
		const [fullName, setFullName] = useState("");
		const [errorMessage, setErrorMessage] = useState("");

		const onChangeHandler = (
			e: ChangeEvent<HTMLInputElement>,
			setValue: (value: string) => void,
		) => {
			e.preventDefault();
			setValue(e.target.value);
		};

		type UserRegisterInfoType = {
			email: string;
			fullName: string;
			token: string;
			_id: string;
		};

		const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
			e.preventDefault();
			makeFetch
				.post("/auth/register", {
					fullName,
					email: email.toLowerCase(),
					password,
				})
				.then((data: UserRegisterInfoType) => {
					window.localStorage.setItem("token", data.token);
					UserStore.login(data.fullName);
					TasksStore.setTasksfromDB();
				})
				.catch((error) => {
					setErrorMessage(error.message);
				});
		};

		return (
			<StyledRegisterWrapper onSubmit={handleSubmit}>
				<Title>Регистрация</Title>
				<StyledInput
					type="text"
					value={fullName}
					onChange={(e) => {
						onChangeHandler(e, setFullName);
					}}
					placeholder="как к вам обращаться?"
				/>
				<StyledInput
					type="text"
					value={email}
					onChange={(e) => {
						onChangeHandler(e, setEmail);
					}}
					placeholder="почта"
				/>
				<StyledInput
					type="text"
					value={password}
					onChange={(e) => {
						onChangeHandler(e, setPassword);
					}}
					placeholder="пароль"
				/>
				<StyledSendBlock>
					<StyledStatus>{errorMessage}</StyledStatus>
					<StyledButton>
						<RiLoginCircleFill size={30} fill="rgba(255, 255, 255, 0.8)" />
					</StyledButton>
				</StyledSendBlock>
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
	},
);
