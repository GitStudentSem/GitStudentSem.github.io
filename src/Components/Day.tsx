import { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import TasksList from "./TasksList";
import CreateTasksForm from "./CreateTasksForm";
import DayHeader from "./DayHeader";
import { getStorageTasksList } from "../scripts/storageWorker/tasks";
import { transformDateToString } from "../scripts/transformDateToString";
import { observer } from "mobx-react-lite";
import { TasksStore } from "../store/tasks";
import { ITask } from "../store/tasks";

type StyledDayType = { $isToday: boolean };
const StyledDay = styled.div<StyledDayType>`
  position: relative;
  width: 100%;
  border-radius: 10px;
  height: 100%;
  background-color: ${(props) =>
    props.$isToday ? "rgba(255, 255, 255, 0.35)" : "rgba(255, 255, 255, 0.2)"};
  padding: 5px;
  overflow: hidden;
`;

interface IDayProps {
  date: Date | "other";
}
const Day = observer(({ date }: IDayProps) => {
  const [tasksOnDay, setTasksOnDay] = useState<ITask[]>([]);
  const { tasksFromDB } = TasksStore;

  const getTasksOnDay = useCallback(async () => {
    const currentTasks = tasksFromDB.find((day) => {
      if (day.dateKey === "other") {
        return day.dateKey === date;
      }
      return transformDateToString(day.dateKey) === transformDateToString(date);
    });
    if (currentTasks) {
      setTasksOnDay([...currentTasks.tasks]);
    }
  }, [date, tasksFromDB]);

  useEffect(() => {
    if (tasksFromDB.length) {
      getTasksOnDay();
    } else {
      setTasksOnDay(getStorageTasksList(date));
    }
  }, [date, getTasksOnDay, tasksFromDB]);

  return (
    <StyledDay
      $isToday={
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
