import { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import TasksList from "./TasksList";
import CreateTasksForm from "./CreateTasksForm";
import DayHeader from "./DayHeader";
import { getStorageTasksList } from "../scripts/storageWorker/tasks";
import { transformDateToString } from "../scripts/transformDateToString";
import { observer } from "mobx-react-lite";
import user from "../store/user";
import { ITask, TasksFromDBType } from "./Main";

type StyledDayType = { isToday: boolean };
const StyledDay = styled.div<StyledDayType>`
  position: relative;
  width: 100%;
  border-radius: 10px;
  height: 100%;
  background-color: ${(props) =>
    props.isToday ? "rgba(255, 255, 255, 0.35)" : "rgba(255, 255, 255, 0.2)"};
  padding: 5px;
  overflow: hidden;
`;

interface IDayProps {
  date: Date | "other";
  tasksfromDB: TasksFromDBType[];
}
const Day = observer(({ date, tasksfromDB }: IDayProps) => {
  const [tasksOnDay, setTasksOnDay] = useState<ITask[]>([]);

  const fetchData = useCallback(async () => {
    if (tasksfromDB.length) {
      const currentTasks = tasksfromDB.find((day) => {
        if (day.dateKey === "other") {
          return day.dateKey === date;
        }
        return (
          transformDateToString(day.dateKey) === transformDateToString(date)
        );
      });
      if (currentTasks) {
        setTasksOnDay([...currentTasks.tasks]);
      }
    }
  }, [date, tasksfromDB]);

  useEffect(() => {
    if (user.isAuth) {
      fetchData();
    } else {
      setTasksOnDay(getStorageTasksList(date));
    }
  }, [date, fetchData]);

  return (
    <StyledDay
      isToday={
        transformDateToString(date) === transformDateToString(new Date())
      }
    >
      <DayHeader date={date} />
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
