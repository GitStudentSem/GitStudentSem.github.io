import styled from "styled-components";

import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import { ReactElement } from "react";

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 20px;
  font-weight: 900;
  color: black;
  width: 150px;
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
type NavigationFromDateType = {
  setPrevDate: () => void;
  setNextDate: () => void;
  children: ReactElement;
};

const NavigationFromDate = ({
  setPrevDate,
  setNextDate,
  children,
}: NavigationFromDateType) => {
  return (
    <StyledWrapper>
      <StyledButton onClick={setPrevDate}>
        <AiFillCaretLeft size={20} fill='rgba(255, 255, 255, 0.5)' />
      </StyledButton>

      {children}

      <StyledButton onClick={setNextDate}>
        <AiFillCaretRight size={20} fill='rgba(255, 255, 255, 0.5)' />
      </StyledButton>
    </StyledWrapper>
  );
};

export default NavigationFromDate;
