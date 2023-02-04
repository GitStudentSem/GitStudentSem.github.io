import React, { useEffect } from "react";
import { useState } from "react";
import { FaRegCalendar } from "react-icons/fa";
import { MdOutlineWorkOutline } from "react-icons/md";
import styled from "styled-components/macro";
import { getStorageTasksList } from "../scripts/storageWorker/tasks";
import { transformDateToString } from "../scripts/transformDateToString";

const StyledDay = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  border-radius: 10px;
  padding: 1px;
  background-color: ${(props) =>
    props.isToday
      ? "rgba(255, 255, 255, 0.4)"
      : props.isDayOff
      ? "rgba(255, 255, 255, 0.3)"
      : "rgba(255, 255, 255, 0.2)"};
  backdrop-filter: blur(${(props) => (props.isDev ? "3px" : "0px")});
  &:last-child {
    grid-column-start: ${(props) => 8 - props.startColumn};
    grid-column-end: 8;
  }
`;
const StyledDate = styled.div`
  position: absolute;
  top: 10px;
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  flex-shrink: 0;
  flex-grow: 1;
`;
const StyledCountTasks = styled.div`
  position: absolute;
  bottom: 11px;
  width: 100%;
`;
const IconWrapper = styled.div`
  position: relative;
  height: min-content;
  width: 100%;
`;

const DayMonth = ({ date, startColumn, setIsMonth, setDate, tasksfromDB }) => {
  const [countTasksOnDay, setCountTasksOnDay] = useState(0);
  useEffect(() => {
    setCountTasksOnDay(getStorageTasksList(date).length);
    if (tasksfromDB.length) {
      let currentTasks = tasksfromDB.find((day) => {
        if (day.calendarDate === "other") {
          return day.calendarDate === date;
        } else {
          return (
            transformDateToString(day.calendarDate) ===
            transformDateToString(date)
          );
        }
      });
      if (currentTasks) {
        setCountTasksOnDay(currentTasks.tasks.length);
      }
    }
  }, [date]);
  return (
    <StyledDay
      startColumn={startColumn}
      onClick={() => {
        setIsMonth(false);
        setDate(date === "other" ? new Date() : date);
      }}
      isToday={
        transformDateToString(date) === transformDateToString(new Date())
      }
      isDayOff={
        date !== "other" && (date.getDay() === 0 || date.getDay() === 6)
      }
    >
      <IconWrapper>
        <FaRegCalendar size={30} />
        <StyledDate>{date !== "other" ? date.getDate() : "..."}</StyledDate>
      </IconWrapper>
      <IconWrapper>
        <MdOutlineWorkOutline size={35} />

        <StyledCountTasks>{countTasksOnDay}</StyledCountTasks>
      </IconWrapper>
    </StyledDay>
  );
};

export default DayMonth;
