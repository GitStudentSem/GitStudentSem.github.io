import React from "react";
import styled from "styled-components";
import { AiFillStar } from "react-icons/ai";

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;
  border: none;
  background-color: transparent;
  cursor: pointer;
  margin: 0;
  padding: 0;
  transition: all 0.3s;
  padding: 2px 5px;
  margin-left: 5px;
  border-radius: 5px;
  &:hover {
    background-color: rgba(255, 255, 255, 0.15);
  }
`;
const Star = ({ setValue, value }) => {
  return (
    <StyledButton
      onClick={(e) => {
        e.preventDefault();
        setValue();
      }}
      type='button'
    >
      <AiFillStar
        size={20}
        fill={value ? "rgb(255, 255, 255)" : "rgba(255, 255, 255, 0.6)"}
      />
    </StyledButton>
  );
};
export default Star;
