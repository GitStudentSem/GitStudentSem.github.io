import styled from "styled-components";
import { ChangeEvent, FormEvent, useState } from "react";
import { RiLoginCircleFill } from "react-icons/ri";
import Title from "./Title";
import { UserStore } from "../../store/user";
import { observer } from "mobx-react-lite";
import { makeFetch } from "../../scripts/makeFetch";
import { TasksStore, TasksType } from "../../store/tasks";

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

export const LoginForm = observer(
	({ setIsLoginForm, setIsRegisterForm }: ILoginProps) => {
		const [email, setEmail] = useState("");
		const [password, setPassword] = useState("");

		const [errorMessage, setErrorMessage] = useState("");

		const onChangeHandler = (
			e: ChangeEvent<HTMLInputElement>,
			setValue: (value: string) => void,
		) => {
			e.preventDefault();
			setValue(e.target.value);
		};

		type UserLoginInfoType = {
			email: string;
			fullName: string;
			tasks: TasksType;
			_id: string;
			token?: string;
		};

		const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
			console.log("login");
			e.preventDefault();

			makeFetch
				.post("/auth/login", { email: email.toLowerCase(), password })
				.then((data: UserLoginInfoType) => {
					window.localStorage.setItem("token", data.token || "");
					UserStore.login(data.fullName);
					TasksStore.setTasksfromDB();
				})
				.catch((error) => {
					setErrorMessage(error.message);
				});
		};

		return (
			<StyledLoginWrapper onSubmit={handleSubmit}>
				<Title>Войти</Title>
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
						setIsLoginForm(false);
						setIsRegisterForm(true);
					}}
				>
					Еще нет аккаунта? Пора создать его!
				</StyledButton>
			</StyledLoginWrapper>
		);
	},
);
