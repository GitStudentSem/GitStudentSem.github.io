import styled from "styled-components/macro";
import React, { useState } from "react";
import { RiLoginCircleFill } from "react-icons/ri";
import Title from "./Title";
import { screenSize } from "../../scripts/screens";

const StyledLoginWrapper = styled.div`
    position: relative;
    padding: 20px;
    overflow: hidden;
    grid-row-start: 1;
    grid-row-end: 1;
    grid-column-start: 1;
    grid-column-end: 2;
    border-radius: 10px;
    background-color: rgba(255, 255, 255, 0.2);
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
    padding: 0;
    transition: all 0.3s;
    padding: 5px;
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

const Login = () => {
    const [email, setEmail] = useState("");
    const [isValidEmail, setIsValidEmail] = useState(true);

    const [password, setPassword] = useState("");
    const [isValidPassword, setIsValidPassword] = useState(true);

    const validateEmail = () => {
        if (email.length > 5) {
            return setIsValidEmail(true);
        }
        return setIsValidEmail(false);
    };

    const validatePassword = () => {
        if (password.length > 5) {
            return setIsValidPassword(true);
        }
        return setIsValidPassword(false);
    };

    const onChangeHandler = (e, setValue, validateValue) => {
        e.preventDefault();
        setValue(e.target.value);
        validateValue(e.target.value);
    };

    return (
        <StyledLoginWrapper>
            <Title>Форма для входа</Title>
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
                    {isValidEmail && isValidPassword
                        ? ""
                        : "В данных есть ошибка"}
                </StyledStatus>
                <StyledButton>
                    <RiLoginCircleFill
                        size={20}
                        fill='rgba(255, 255, 255, 0.8)'
                    />
                </StyledButton>
            </StyledSendBlock>
            <StyledIsdev isDev>
                <p>Скоро появится</p>
            </StyledIsdev>
        </StyledLoginWrapper>
    );
};
export default Login;
