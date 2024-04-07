import { useEffect } from "react";
import { useState } from "react";
import { FaRegCalendar } from "react-icons/fa";
import { MdOutlineWorkOutline } from "react-icons/md";
import styled from "styled-components";
import { getStorageTasksList } from "../scripts/storageWorker/tasks";
import { transformDateToString } from "../scripts/transformDateToString";
import { observer } from "mobx-react-lite";
import user from "../store/user";
import { TasksFromDBType } from "./Main";

type IStyledDay = {
  isToday: boolean;

  isDayOff: boolean;
  startColumn: number;
};
const StyledDay = styled.button<IStyledDay>`
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
const StyledIconWrapper = styled.div`
  position: relative;
  height: min-content;
  width: 100%;
`;
interface IDayMonthProps {
  date: Date | "other";
  setDate: (date: Date) => void;
  setIsMonth: (isMonth: boolean) => void;
  tasksfromDB: TasksFromDBType[];
  startColumn?: number;
}
const DayMonth = observer(
  ({ date, startColumn, setIsMonth, setDate, tasksfromDB }: IDayMonthProps) => {
    const [countTasksOnDay, setCountTasksOnDay] = useState(0);

    useEffect(() => {
      console.log("user.isAuth", user.isAuth);
      if (user.isAuth) {
        const getTasksOnDay = () => {
          if (tasksfromDB.length) {
            const currentTasks = tasksfromDB.find((day) => {
              if (day.dateKey === "other") {
                return day.dateKey === date;
              }
              return (
                transformDateToString(day.dateKey) ===
                transformDateToString(date)
              );
            });

            if (currentTasks) {
              setCountTasksOnDay(currentTasks.tasks.length);
            }
          }
        };

        getTasksOnDay();
      } else {
        setCountTasksOnDay(getStorageTasksList(date).length);
      }
    }, [date, tasksfromDB]);

    return (
      <StyledDay
        startColumn={startColumn || 0}
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
        <StyledIconWrapper>
          <FaRegCalendar size={30} />
          <StyledDate>{date !== "other" ? date.getDate() : "..."}</StyledDate>
        </StyledIconWrapper>
        <StyledIconWrapper>
          <MdOutlineWorkOutline size={35} />

          <StyledCountTasks>{countTasksOnDay}</StyledCountTasks>
        </StyledIconWrapper>
      </StyledDay>
    );
  }
);

export default DayMonth;
