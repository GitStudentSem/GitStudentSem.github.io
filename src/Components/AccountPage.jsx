import styled from "styled-components/macro";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoTodaySharp } from "react-icons/io5";
import { MdChangeCircle } from "react-icons/md";
import { FaSave } from "react-icons/fa";
import { FaRandom } from "react-icons/fa";
import LoginPage from "./Login";

const StyledAccountPage = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;
const StyledHeader = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
`;
const StyledMain = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;
    flex-grow: 1;
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
const StyledBlockWrapper = styled.div`
    width: 20%;
    height: 40%;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 10px;
    overflow: hidden;
    &:last-child {
        height: 25%;
        width: 100%;
    }
`;
const StyledThemeControls = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
`;
const StyledDescription = styled.div`
    width: 100%;
    text-align: center;
    color: rgba(255, 255, 255, 0.6);
    font-size: 24px;
`;
const StyledVersions = styled.ul`
    height: 100%;
    overflow-y: scroll;
    font-size: 20px;
    padding: 10px;
    margin: 5px;
    display: flex;
    flex-wrap: wrap;
`;
const StyledVersionNumber = styled.li`
    color: rgba(255, 255, 255, 0.6);
    width: 100%;
    font-size: 20px;
`;
const StyledVersionText = styled.li`
    position: relative;
    font-size: 18px;
    width: 100%;
    padding-left: 15px;
    &::before {
        content: "-";
        position: absolute;
        left: 0;
        top: 0;
    }
`;

const AccountPage = ({ setColorsTheme, colorsTheme, generateColor }) => {
    const [isNeedSaveColor, setIsNeedSaveColor] = useState();

    useEffect(() => {
        const savedColorsTheme = JSON.parse(
            localStorage.getItem("colorsTheme")
        );

        const savedIsNeedSaveColor = JSON.parse(
            localStorage.getItem("isNeedSaveColor")
        );

        setIsNeedSaveColor(savedIsNeedSaveColor);

        if (!savedColorsTheme) return;

        setColorsTheme(savedColorsTheme);
    }, []);

    const saveColor = () => {
        localStorage.setItem("colorsTheme", JSON.stringify(colorsTheme));
        setIsNeedSaveColor(true);
        localStorage.setItem("isNeedSaveColor", JSON.stringify(true));
    };

    const changeColor = () => {
        setColorsTheme(generateColor());
        localStorage.removeItem("colorsTheme");

        setIsNeedSaveColor(false);
        localStorage.setItem("isNeedSaveColor", JSON.stringify(false));
    };

    const randomColor = () => {
        setIsNeedSaveColor(false);
        localStorage.setItem("isNeedSaveColor", JSON.stringify(false));

        localStorage.removeItem("colorsTheme");
        setColorsTheme(generateColor());
    };

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
                <StyledBlockWrapper>
                    <LoginPage />
                </StyledBlockWrapper>

                <StyledBlockWrapper>
                    <StyledThemeControls>
                        <StyledButton
                            title='Сменить цвета'
                            onClick={changeColor}
                        >
                            <MdChangeCircle
                                size={50}
                                fill='rgba(255, 255, 255, 0.8)'
                            />
                        </StyledButton>
                        <StyledButton
                            title='Каждая новая палитра будет автоматически сохраняться'
                            onClick={saveColor}
                        >
                            <FaSave
                                size={50}
                                fill={
                                    isNeedSaveColor
                                        ? "rgba(255, 255, 255, 0.8)"
                                        : "rgba(255, 255, 255, 0.2)"
                                }
                            />
                        </StyledButton>
                        <StyledButton
                            title='Палитра создается случайным образом'
                            onClick={randomColor}
                        >
                            <FaRandom
                                size={50}
                                fill={
                                    isNeedSaveColor
                                        ? "rgba(255, 255, 255, 0.2)"
                                        : "rgba(255, 255, 255, 0.8)"
                                }
                            />
                        </StyledButton>
                    </StyledThemeControls>
                </StyledBlockWrapper>
                <StyledBlockWrapper>
                    <StyledVersions>
                        <StyledVersionNumber>0.1.1</StyledVersionNumber>
                        <StyledVersionText>
                            Изменена схема хранения данных
                        </StyledVersionText>
                        <StyledVersionText>
                            Добавлен раздел "другие задачи"
                        </StyledVersionText>
                        <StyledVersionText>
                            Длинные тесты задач показываются полностью
                        </StyledVersionText>
                        <StyledVersionNumber>0.0.1</StyledVersionNumber>
                        <StyledVersionText>
                            Первое размещение в интернете
                        </StyledVersionText>
                        <StyledVersionText>
                            Исправлена ошибка 404 при обновлении страницы
                        </StyledVersionText>
                    </StyledVersions>
                </StyledBlockWrapper>
                <StyledBlockWrapper>
                    <StyledDescription>
                        Внимание! Вы можете пользоваться приложением и без
                        логина.
                    </StyledDescription>
                    <StyledDescription>
                        Но в таком случае все данные будут сохранятся у вас в
                        браузере.
                    </StyledDescription>
                    <StyledDescription>
                        Вы не сможете получить их с другого устройства или
                        браузера.
                    </StyledDescription>
                </StyledBlockWrapper>
            </StyledMain>
        </StyledAccountPage>
    );
};
export default AccountPage;
