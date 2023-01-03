import styled from "styled-components/macro";
import React from "react";
import { screenSize } from "../../scripts/screens";

const StyledTitle = styled.p`
    text-align: center;
    font-size: 24px;
    width: 100%;
    margin-bottom: 10px;
    @media (max-width: ${screenSize.tablet}px) {
        font-size: 18px;
    }
    @media (max-width: ${screenSize.phoneLg}px) {
        font-size: 15px;
    }
`;

const Title = ({ children }) => {
    return <StyledTitle>{children}</StyledTitle>;
};
export default Title;
