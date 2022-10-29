import React from "react";
import styled from "styled-components/macro";
import TaskItem from "./TaskItem";

const StyledTasksList = styled.ul`
    list-style-type: none;
    padding: 0 5px 0 0;
    height: calc(100% - 75px); // Высота зависит от шапки
    overflow-y: auto;
`;

const TasksList = ({ transformDateToString, tasksOnDay, setTasksOnDay }) => {
    return (
        <StyledTasksList>
            {tasksOnDay.map((taskItem, index) => {
                return (
                    <TaskItem
                        key={taskItem.text + index}
                        taskItem={taskItem}
                        transformDateToString={transformDateToString}
                        index={index}
                        tasksOnDay={tasksOnDay}
                        setTasksOnDay={setTasksOnDay}
                    />
                );
            })}
        </StyledTasksList>
    );
};

export default TasksList;
