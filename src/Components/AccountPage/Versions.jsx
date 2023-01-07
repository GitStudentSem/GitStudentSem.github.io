import styled from "styled-components/macro";
import React from "react";
import Title from "./Title";
import { screenSize } from "../../scripts/screens";

const StyledVersions = styled.ul`
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    font-size: 20px;
    padding: 10px;
    background-color: rgba(255, 255, 255, 0.2);
    grid-row-start: 2;
    grid-row-end: 3;
    grid-column-start: 1;
    grid-column-end: 2;
    border-radius: 10px;
    @media (max-width: ${screenSize.phone}px) {
        padding: 5px;
    }
`;
const StyledVersionNumber = styled.li`
    color: rgba(255, 255, 255, 0.6);
    width: 100%;
    font-size: 20px;
    list-style-type: none;
    @media (max-width: ${screenSize.phone}px) {
        font-size: 16px;
    }
`;
const StyledVersionText = styled.li`
    position: relative;
    font-size: 18px;
    width: 100%;
    padding-left: 15px;
    list-style-type: none;
    &::before {
        content: "-";
        position: absolute;
        left: 0;
        top: 0;
    }
    @media (max-width: ${screenSize.phone}px) {
        font-size: 12px;
    }
`;

const Versions = () => {
    return (
        <div style={{ overflow: "hidden", borderRadius: "10px" }}>
            <StyledVersions>
                <Title>История версий</Title>
                <StyledVersionNumber>0.2.2</StyledVersionNumber>
                <StyledVersionText>
                    Оптимизация работы приложения
                </StyledVersionText>
                <StyledVersionText>
                    Исправлена опечатка в истории версий
                </StyledVersionText>
                <StyledVersionText>
                    Исправлены визуальные ошибки
                </StyledVersionText>
                <StyledVersionNumber>0.2.1</StyledVersionNumber>
                <StyledVersionText>
                    Настроена мобильная версия
                </StyledVersionText>
                <StyledVersionText>
                    Добавлен режим отображения по месяцам
                </StyledVersionText>
                <StyledVersionText>
                    Добавлено перемещение к сегодняшнему дню
                </StyledVersionText>
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
        </div>
    );
};
export default Versions;
