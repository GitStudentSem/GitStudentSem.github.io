import styled from "styled-components/macro";
import React from "react";
import { Link } from "react-router-dom";
import { IoTodaySharp } from "react-icons/io5";
import LoginPage from "./Login";
import Versions from "./Versions";
import Attention from "./Attention";
import ThemeControls from "./ThemeControls";
import ViewControl from "./ViewControl";

const StyledAccountPage = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;
const StyledHeader = styled.div`
    display: flex;
    justify-content: center;
`;
const StyledMain = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(3, 1fr);
    gap: 5px;
    height: calc(100% - 45px); // с вычетом высоты шапки
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

const AccountPage = ({ setColorsTheme, colorsTheme }) => {
    return (
        <StyledAccountPage>
            <StyledHeader>
                <StyledButton disabled>
                    <Link to='/'>
                        <IoTodaySharp
                            size={30}
                            fill='rgba(255, 255, 255, 0.8)'
                        />
                    </Link>
                </StyledButton>
            </StyledHeader>

            <StyledMain>
                <LoginPage />

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
