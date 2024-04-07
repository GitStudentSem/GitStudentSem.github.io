import styled from "styled-components";
import { useState } from "react";
import { FaSave } from "react-icons/fa";
import { FaRandom } from "react-icons/fa";
import Title from "./Title";
import { screenSize } from "../../scripts/screens";
import { observer } from "mobx-react-lite";
import { ColorThemeStore } from "../../store/colorTheme";
import {
  LSRemovePalette,
  LSSavePalette,
} from "../../scripts/storageWorker/LSPalette";
import { RiLoginCircleFill } from "react-icons/ri";
import validateColor from "validate-color";
import { useEffect } from "react";

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
  border-radius: 5px;
  &:disabled {
    opacity: 0.2;
  }
  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;
const StyledThemeControls = styled.div`
  display: flex;
  align-items: flex-start;
  /* justify-content: space-between; */
  flex-wrap: wrap;
  grid-row-start: 1;
  grid-row-end: 2;
  grid-column-start: 2;
  grid-column-end: 4;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  padding: 0px 10px;
  /* height: ; */
  @media (max-width: ${screenSize.phoneLg}px) {
    padding: 4px;
  }
`;
const StyledButtonWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  overflow: hidden;
  border-radius: 5px;
`;
const StyledButtonsWrapper = styled.div`
  width: 100%;
  height: calc(100% - 43px); // 43px высота заголовка
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
  width: 40px;
  height: 40px;
  @media (max-width: ${screenSize.phoneLg}px) {
    width: 35px;
    height: 35px;
  }
  /* @media (max-width: ${screenSize.phoneMd}px) {
    width: 25px;
    height: 25px;
  } */
`;
const StyledIconRandom = styled(FaRandom)`
  width: 40px;
  height: 40px;
  @media (max-width: ${screenSize.phoneLg}px) {
    width: 35px;
    height: 35px;
  }
  /* @media (max-width: ${screenSize.phoneMd}px) {
    width: 25px;
    height: 25px;
  } */
`;
const StyledColorForm = styled.form`
  width: 100%;
  display: flex;
  align-items: center;
`;
const StyledInputsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
const StyledInput = styled.input`
  outline: none;
  border: none;
  background-color: rgba(255, 255, 255, 0.2);
  padding: 3px;
  border-radius: 5px;
  margin-bottom: 5px;
  width: 99%;
  &::placeholder {
    color: rgb(255, 255, 255);
  }
`;

const ThemeControls = observer(() => {
  const [centerColor, setCenterColor] = useState("");
  const [isErrorCenter, setIsErrorCenter] = useState(true);

  const [outsideColor, setOutsideColor] = useState("");
  const [isErrorOutside, setIsErrorOutside] = useState(true);

  const savePalette = () => {
    LSSavePalette(ColorThemeStore.palette);
    ColorThemeStore.setIsNeedSaveColor(true);
    setCenterColor("");
    setOutsideColor("");
  };
  const forgetPalette = () => {
    LSRemovePalette();
    ColorThemeStore.setIsNeedSaveColor(false);
    ColorThemeStore.generateColor();
    setCenterColor("");
    setOutsideColor("");
  };
  const setUserColors = () => {
    ColorThemeStore.setPalette({ from: centerColor, to: outsideColor });
    LSSavePalette(ColorThemeStore.palette);
    ColorThemeStore.setIsNeedSaveColor(true);
  };

  useEffect(() => {
    setIsErrorOutside(!validateColor(outsideColor));
  }, [outsideColor]);

  useEffect(() => {
    setIsErrorCenter(!validateColor(centerColor));
  }, [centerColor]);

  return (
    <StyledThemeControls>
      <Title>Управление цветами</Title>

      <StyledButtonsWrapper>
        <StyledButtonWrapper>
          <StyledButton
            title='Каждая новая палитра будет автоматически сохраняться'
            onClick={savePalette}
          >
            <StyledIconSave
              fill={
                ColorThemeStore.isNeedSaveColor
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
            onClick={forgetPalette}
          >
            <StyledIconRandom
              fill={
                ColorThemeStore.isNeedSaveColor
                  ? "rgba(255, 255, 255, 0.2)"
                  : "rgba(255, 255, 255, 0.8)"
              }
            />
          </StyledButton>

          <StyledText>Случайные цвета</StyledText>
        </StyledButtonWrapper>
        <StyledColorForm>
          <StyledInputsWrapper>
            <StyledInput
              type='text'
              value={centerColor}
              onChange={(e) => {
                setCenterColor(e.target.value);
              }}
              placeholder={`${ColorThemeStore.palette.from}`}
            />

            <StyledInput
              type='text'
              value={outsideColor}
              onChange={(e) => {
                setOutsideColor(e.target.value);
              }}
              placeholder={`${ColorThemeStore.palette.to}`}
            />
          </StyledInputsWrapper>

          <StyledButton
            type='submit'
            disabled={
              (!!centerColor && isErrorCenter) ||
              (!!outsideColor && isErrorOutside)
            }
            onClick={(e) => {
              e.preventDefault();
              setUserColors();
            }}
          >
            <RiLoginCircleFill size={25} fill='rgba(255, 255, 255, 0.8)' />
          </StyledButton>
        </StyledColorForm>
      </StyledButtonsWrapper>
    </StyledThemeControls>
  );
});
export default ThemeControls;
