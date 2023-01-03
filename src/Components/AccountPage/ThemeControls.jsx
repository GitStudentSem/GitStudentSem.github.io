import styled from "styled-components/macro";
import React, { useEffect, useState } from "react";
import { FaSave } from "react-icons/fa";
import { FaRandom } from "react-icons/fa";
import { generateColor } from "../../scripts/generateColor";
import Title from "./Title";
import { screenSize } from "../../scripts/screens";

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
const StyledThemeControls = styled.div`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    grid-row-start: 1;
    grid-row-end: 1;
    grid-column-start: 2;
    grid-column-end: 4;
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 10px;
    padding: 10px;
    @media (max-width: ${screenSize.phoneLg}px) {
        padding: 4px;
    }
`;
const StyledButtonWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    width: 49%;
    position: relative;
    overflow: hidden;
    border-radius: 5px;
`;
const StyledButtonsWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
`;
const StyledText = styled.p`
    text-align: center;
    font-size: 14px;
    width: 100%;
    @media (max-width: ${screenSize.phoneMd}px) {
        font-size: 10px;
    }
`;
const StyledIconSave = styled(FaSave)`
    width: 50px;
    height: 50px;
    @media (max-width: ${screenSize.phoneLg}px) {
        width: 35px;
        height: 35px;
    }
    @media (max-width: ${screenSize.phoneMd}px) {
        width: 25px;
        height: 25px;
    }
`;
const StyledIconRandom = styled(FaRandom)`
    width: 50px;
    height: 50px;
    @media (max-width: ${screenSize.phoneLg}px) {
        width: 35px;
        height: 35px;
    }
    @media (max-width: ${screenSize.phoneMd}px) {
        width: 25px;
        height: 25px;
    }
`;
const StyledIsdev = styled.div`
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    position: absolute;
    text-align: center;
    left: 0;
    top: 0;
    width: ${(props) => (props.isDev ? "100%" : "0px")};
    height: ${(props) => (props.isDev ? "100%" : "0px")};
    background-color: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(${(props) => (props.isDev ? "3px" : "0px")});
`;

const ThemeControls = ({ setColorsTheme, colorsTheme }) => {
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

    const randomColor = () => {
        setIsNeedSaveColor(false);
        localStorage.setItem("isNeedSaveColor", JSON.stringify(false));

        localStorage.removeItem("colorsTheme");
        setColorsTheme(generateColor());
    };

    return (
        <StyledThemeControls>
            <Title>Управление цветами</Title>

            <StyledButtonsWrapper>
                <StyledButtonWrapper>
                    <StyledButton
                        title='Каждая новая палитра будет автоматически сохраняться'
                        onClick={saveColor}
                    >
                        <StyledIconSave
                            fill={
                                isNeedSaveColor
                                    ? "rgba(255, 255, 255, 1)"
                                    : "rgba(255, 255, 255, 0.2)"
                            }
                        />
                    </StyledButton>
                    <StyledText>Сохранить эти цвета</StyledText>
                </StyledButtonWrapper>

                <StyledButtonWrapper>
                    <StyledButton
                        title='Палитра создается случайным образом'
                        onClick={randomColor}
                    >
                        <StyledIconRandom
                            fill={
                                isNeedSaveColor
                                    ? "rgba(255, 255, 255, 0.2)"
                                    : "rgba(255, 255, 255, 0.8)"
                            }
                        />
                    </StyledButton>
                    <StyledText>Случайные цвета</StyledText>
                </StyledButtonWrapper>
                <StyledButtonWrapper>
                    <StyledButton
                        title='Палитра создается случайным образом'
                        onClick={randomColor}
                    >
                        <StyledIconRandom
                            fill={
                                isNeedSaveColor
                                    ? "rgba(255, 255, 255, 0.2)"
                                    : "rgba(255, 255, 255, 0.8)"
                            }
                        />
                    </StyledButton>
                    <StyledText>Случайный при каждом входе</StyledText>
                    <StyledIsdev isDev>
                        <p>Скоро появится</p>
                    </StyledIsdev>
                </StyledButtonWrapper>

                <StyledButtonWrapper>
                    <StyledButton
                        title='Палитра создается случайным образом'
                        onClick={randomColor}
                    >
                        <StyledIconRandom
                            fill={
                                isNeedSaveColor
                                    ? "rgba(255, 255, 255, 0.2)"
                                    : "rgba(255, 255, 255, 0.8)"
                            }
                        />
                    </StyledButton>
                    <StyledText>Случайный при каждом входе</StyledText>
                    <StyledIsdev isDev>
                        <p>Скоро появится</p>
                    </StyledIsdev>
                </StyledButtonWrapper>
            </StyledButtonsWrapper>
        </StyledThemeControls>
    );
};
export default ThemeControls;
