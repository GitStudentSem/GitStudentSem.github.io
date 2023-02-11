import React, { useState, useEffect } from "react";
import styled from "styled-components/macro";
import TasksList from "./TasksList";
import CreateTasksForm from "./CreateTasksForm";
import DayHeader from "./DayHeader";
import {
  getStorageTasksList,
  setStorageTasksList,
} from "../scripts/storageWorker/tasks";
import { transformDateToString } from "../scripts/transformDateToString";
import { observer } from "mobx-react-lite";
import user from "../store/user";

const StyledDay = styled.div`
  position: relative;
  width: 100%;
  border-radius: 10px;
  height: 100%;
  background-color: ${(props) =>
    props.isToday ? "rgba(255, 255, 255, 0.35)" : "rgba(255, 255, 255, 0.2)"};
  padding: 5px;
  overflow: hidden;
`;

const Day = observer(({ date, monthNames, weekDays, isDev, tasksfromDB }) => {
  const [tasksOnDay, setTasksOnDay] = useState([]);

  const fetchData = async () => {
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
        console.log(currentTasks.tasks);
        setTasksOnDay([...currentTasks.tasks]);
      }
    }
  };

  useEffect(() => {
    if (user.isAuth) {
      fetchData();
    } else {
      setTasksOnDay(getStorageTasksList(date));
    }
  }, [date]);

  return (
    <StyledDay
      isDev={isDev}
      isToday={
        transformDateToString(date) === transformDateToString(new Date())
      }
    >
      <DayHeader date={date} monthNames={monthNames} weekDays={weekDays} />
      <CreateTasksForm date={date} setTasksOnDay={setTasksOnDay} />
      <TasksList
        tasksOnDay={tasksOnDay}
        setTasksOnDay={setTasksOnDay}
        date={date}
      />
    </StyledDay>
  );
});

export default Day;
