import styled from "styled-components/macro";
import React from "react";
import Title from "./Title";
import { screenSize } from "../../scripts/screens";

const StyledBlockWrapper = styled.div`
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 10px;
    width: 100%;
    grid-row-start: 3;
    grid-row-end: 4;
    grid-column-start: 1;
    grid-column-end: 4;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
`;

const StyledDescription = styled.div`
    width: 100%;
    text-align: center;
    color: rgba(255, 255, 255, 0.6);
    font-size: 24px;
    white-space: nowrap;
    @media (max-width: ${screenSize.tablet}px) {
        white-space: normal;
        font-size: 20px;
    }
    @media (max-width: ${screenSize.phone}px) {
        font-size: 16px;
    }
`;

const Attention = () => {
    return (
        <StyledBlockWrapper>
            <Title>Внимание!</Title>
            <StyledDescription>
                Вы можете пользоваться приложением и без логина.
            </StyledDescription>
            <StyledDescription>
                Но в таком случае все данные будут сохранятся у вас в браузере.
            </StyledDescription>
            <StyledDescription>
                Вы не сможете получить их с другого устройства или браузера.
            </StyledDescription>
        </StyledBlockWrapper>
    );
};
export default Attention;
