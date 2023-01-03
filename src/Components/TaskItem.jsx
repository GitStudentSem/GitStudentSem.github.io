import React, { useState } from "react";
import styled from "styled-components/macro";
import { AiFillDelete, AiFillStar } from "react-icons/ai";
import { transformDateToString } from "../scripts/transformDateToString";

const StyledTask = styled.li`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5px;
    width: 100%;
    transition: 0.3s;
    border-radius: 10px;
    cursor: pointer;
    margin-bottom: 5px;
    &:hover {
        background-color: rgba(255, 255, 255, 0.2);
    }
`;
const StyledTaskText = styled.p`
    flex-grow: 1;
    text-align: start;
    /* white-space: nowrap;
    text-overflow: ellipsis; */
    padding-right: 10px;
    overflow-x: hidden;
    margin-left: 5px;
`;
const StyledButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    outline: none;
    border: none;
    background-color: transparent;
    cursor: pointer;
    margin: 0;
    padding: 0;
    transition: all 0.3s;
    padding: 2px 5px;
    margin-left: 5px;
    border-radius: 5px;
    &:hover {
        background-color: rgba(255, 255, 255, 0.2);
    }
`;

const TaskItem = ({ taskItem, index, tasksOnDay, setTasksOnDay }) => {
    const changeIsImportant = () => {
        const copyTasks = [...tasksOnDay];
        copyTasks[index].isImportant = !copyTasks[index].isImportant;
        setTasksOnDay(copyTasks);
    };

    const deleteTask = () => {
        const copyTasks = [...tasksOnDay];
        copyTasks.splice(index, 1);

        setTasksOnDay(copyTasks);
    };

    return (
        <StyledTask>
            <StyledButton
                onClick={(e) => {
                    e.preventDefault();
                    changeIsImportant();
                }}
            >
                <AiFillStar
                    size={20}
                    fill={
                        taskItem.isImportant
                            ? "rgb(255, 255, 255)"
                            : "rgba(255, 255, 255, 0.6)"
                    }
                />
            </StyledButton>

            <StyledTaskText>{taskItem.text}</StyledTaskText>

            <StyledButton
                onClick={() => {
                    deleteTask();
                }}
            >
                <AiFillDelete size={20} fill='rgba(255, 255, 255, 0.8)' />
            </StyledButton>
        </StyledTask>
    );
};

export default TaskItem;
