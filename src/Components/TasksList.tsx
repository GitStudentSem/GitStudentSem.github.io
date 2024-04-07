import styled from "styled-components";
import TaskItem from "./TaskItem";
import { ITask } from "./Main";

const StyledTasksList = styled.ul`
  list-style-type: none;
  height: calc(100% - 60px); // Высота зависит от шапки
  overflow-y: auto;
`;

interface ITasksListProps {
  date: Date | "other";
  tasksOnDay: ITask[];
  setTasksOnDay: (tasks: ITask[]) => void;
}
const TasksList = ({ tasksOnDay, setTasksOnDay, date }: ITasksListProps) => {
  return (
    <StyledTasksList>
      {tasksOnDay.map((taskItem, index) => {
        return (
          <TaskItem
            key={`${taskItem.text}_${index}`}
            taskItem={taskItem}
            index={index}
            tasksOnDay={tasksOnDay}
            setTasksOnDay={setTasksOnDay}
            date={date}
          />
        );
      })}
    </StyledTasksList>
  );
};

export default TasksList;
