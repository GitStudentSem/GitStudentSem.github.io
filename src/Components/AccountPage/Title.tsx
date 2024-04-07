import styled from "styled-components";
import { screenSize } from "../../scripts/screens";
import { ReactNode } from "react";

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

interface ITitleProps {
  children: ReactNode;
}

const Title = ({ children }: ITitleProps) => {
  return <StyledTitle>{children}</StyledTitle>;
};
export default Title;
