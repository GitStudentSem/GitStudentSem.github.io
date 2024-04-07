import React from "react";
import styled from "styled-components";
import TaskItem from "./TaskItem";

const StyledTasksList = styled.ul`
  list-style-type: none;
  height: calc(100% - 60px); // Высота зависит от шапки
  overflow-y: auto;
`;

const TasksList = ({ tasksOnDay, setTasksOnDay, date }) => {
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
