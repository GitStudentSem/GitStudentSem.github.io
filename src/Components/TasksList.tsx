import styled from "styled-components";
import TaskItem from "./TaskItem";
import { TasksStore } from "../store/tasks";
import { observer } from "mobx-react-lite";

const StyledTasksList = styled.ul`
  list-style-type: none;
  height: calc(100% - 60px); // Высота зависит от шапки
  overflow-y: auto;
`;

interface ITasksListProps {
  date: Date | "other";
}
const TasksList = observer(({ date }: ITasksListProps) => {
  return (
    <StyledTasksList>
      {TasksStore.getTasksOnDay(date).map((taskItem, index) => {
        return (
          <TaskItem
            key={`${taskItem.text}_${index}`}
            taskItem={taskItem}
            index={index}
            date={date}
          />
        );
      })}
    </StyledTasksList>
  );
});

export default TasksList;
