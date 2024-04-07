import styled from "styled-components";
import React from "react";
import Title from "./Title";
import { screenSize } from "../../scripts/screens";
import { TfiLayoutGrid2Alt, TfiLayoutGrid3Alt } from "react-icons/tfi";

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
const StyledViewControls = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  grid-row-start: 2;
  grid-row-end: 3;
  grid-column-start: 2;
  grid-column-end: 4;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  padding: 10px;
  overflow: hidden;
  @media (max-width: ${screenSize.phoneLg}px) {
    padding: 4px;
  }
`;
const StyledButtonWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;
const StyledButtonsWrapper = styled.div`
  width: 100%;
  display: flex;
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
const StyledIconDays = styled(TfiLayoutGrid2Alt)`
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
const StyledIconMonth = styled(TfiLayoutGrid3Alt)`
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

const ViewControl = ({ setColorsTheme, colorsTheme }) => {
  // const [isNeedSaveColor, setIsNeedSaveColor] = useState();

  // useEffect(() => {
  //     const savedColorsTheme = JSON.parse(
  //         localStorage.getItem("colorsTheme")
  //     );

  //     const savedIsNeedSaveColor = JSON.parse(
  //         localStorage.getItem("isNeedSaveColor")
  //     );

  //     setIsNeedSaveColor(savedIsNeedSaveColor);

  //     if (!savedColorsTheme) return;

  //     setColorsTheme(savedColorsTheme);
  // }, []);

  // const saveColor = () => {
  //     localStorage.setItem("colorsTheme", JSON.stringify(colorsTheme));
  //     setIsNeedSaveColor(true);
  //     localStorage.setItem("isNeedSaveColor", JSON.stringify(true));
  // };

  // const randomColor = () => {
  //     setIsNeedSaveColor(false);
  //     localStorage.setItem("isNeedSaveColor", JSON.stringify(false));

  //     localStorage.removeItem("colorsTheme");
  //     setColorsTheme(generateColor());
  // };

  return (
    <StyledViewControls>
      <Title>Стартовое отображение</Title>

      <StyledButtonsWrapper>
        <StyledButtonWrapper>
          <StyledButton
            title='При входе отображать дни'
            // onClick={saveColor}
          >
            <StyledIconDays
            // fill={
            //     isNeedSaveColor
            //         ? "rgba(255, 255, 255, 1)"
            //         : "rgba(255, 255, 255, 0.2)"
            // }
            />
          </StyledButton>
          <StyledText>Дни</StyledText>
        </StyledButtonWrapper>

        <StyledButtonWrapper>
          <StyledButton
            title='При входе отображать месяца'
            // onClick={randomColor}
          >
            <StyledIconMonth
            // fill={
            //     isNeedSaveColor
            //         ? "rgba(255, 255, 255, 0.2)"
            //         : "rgba(255, 255, 255, 0.8)"
            // }
            />
          </StyledButton>
          <StyledText>Месяца</StyledText>
        </StyledButtonWrapper>
      </StyledButtonsWrapper>
      <StyledIsdev isDev>
        <p>Скоро появится</p>
      </StyledIsdev>
    </StyledViewControls>
  );
};
export default ViewControl;
