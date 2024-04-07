import { useState, useEffect } from "react";
import styled from "styled-components";
import Day from "./Day.js";
import { screenSize } from "../scripts/screens.js";
import { useSwipeable } from "react-swipeable";
import { ScreenStore } from "../store/screen.js";
import { observer } from "mobx-react-lite";

const StyledWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(2, 1fr);
  grid-column-gap: 5px;
  grid-row-gap: 5px;
  height: 100%; // 45px - это высота шапки margin + padding
  @media (max-width: ${screenSize.widescreen}px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: ${screenSize.tabletLg}px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: ${screenSize.tablet}px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const WeekScreen = observer(() => {
  // choose the screen size
  const [elementsCount, setElementsCount] = useState(handleResize());
  // choose the screen size
  function handleResize() {
    if (window.innerWidth <= screenSize.tablet) {
      return 1;
    }
    if (window.innerWidth <= screenSize.tabletLg) {
      return 3;
    }
    if (window.innerWidth <= screenSize.widescreen) {
      return 5;
    }
    return 7;
  }

  useEffect(() => {
    window.addEventListener("resize", () => setElementsCount(handleResize()));
  }, []);

  const swipeDate = useSwipeable({
    onSwipedLeft: () => {
      ScreenStore.setDate(
        new Date(
          ScreenStore.date.getFullYear(),
          ScreenStore.date.getMonth(),
          ScreenStore.date.getDate() - elementsCount
        )
      );
    },
    onSwipedRight: () => {
      ScreenStore.setDate(
        new Date(
          ScreenStore.date.getFullYear(),
          ScreenStore.date.getMonth(),
          ScreenStore.date.getDate() + elementsCount
        )
      );
    },
    swipeDuration: 500,
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  return (
    <StyledWrapper {...swipeDate}>
      {[...Array(elementsCount)].map((_day, index) => (
        <Day
          key={new Date(
            ScreenStore.date.getFullYear(),
            ScreenStore.date.getMonth(),
            ScreenStore.date.getDate() + index
          ).toString()}
          date={
            new Date(
              ScreenStore.date.getFullYear(),
              ScreenStore.date.getMonth(),
              ScreenStore.date.getDate() + index
            )
          }
        />
      ))}

      <Day date='other' />
    </StyledWrapper>
  );
});

export default WeekScreen;
