import React, { useState, useEffect } from "react";
import styled from "styled-components/macro";
import Day from "./Day";
import { screenSize } from "../scripts/screens.js";
import { useSwipeable } from "react-swipeable";

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

const WeekScreen = ({ date, monthNames, tasksfromDB, setDate }) => {
  let weekDays = [
    "Воскресенье",
    "Понедельник",
    "Вторник",
    "Среда",
    "Четверг",
    "Пятница",
    "Суббота",
  ];
  // choose the screen size
  const [elementsCount, setElementsCount] = useState(handleResize());
  // choose the screen size
  function handleResize() {
    if (window.innerWidth <= screenSize.tablet) {
      return 1;
    } else if (window.innerWidth <= screenSize.tabletLg) {
      return 3;
    } else if (window.innerWidth <= screenSize.widescreen) {
      return 5;
    } else {
      return 7;
    }
  }

  useEffect(() => {
    window.addEventListener("resize", () => setElementsCount(handleResize()));
  }, []);

  const swipeDate = useSwipeable({
    onSwipedLeft: () => {
      setDate(
        new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate() - elementsCount
        )
      );
    },
    onSwipedRight: () => {
      setDate(
        new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate() + elementsCount
        )
      );
    },
    swipeDuration: 500,
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  return (
    <StyledWrapper {...swipeDate}>
      {[...Array(elementsCount)].map((day, index) => (
        <Day
          key={
            new Date(
              date.getFullYear(),
              date.getMonth(),
              date.getDate() + index
            )
          }
          monthNames={monthNames}
          date={
            new Date(
              date.getFullYear(),
              date.getMonth(),
              date.getDate() + index
            )
          }
          weekDays={weekDays}
          tasksfromDB={tasksfromDB}
        />
      ))}

      <Day date='other' tasksfromDB={tasksfromDB} />
    </StyledWrapper>
  );
};

export default WeekScreen;
