import React from "react";
import styled from "styled-components/macro";
import { AiFillDelete, AiFillStar } from "react-icons/ai";
import axios from "../axios";
import { observer } from "mobx-react-lite";
import user from "../store/user";
import { setStorageTasksList } from "../scripts/storageWorker/tasks";
import { transformDateToString } from "../scripts/transformDateToString";

const StyledTask = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 5px;
  padding-bottom: 5px;
  width: 98%;
  transition: 0.3s;
  border-radius: 10px;
  cursor: pointer;
  margin-bottom: 5px;
  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
  &:last-child {
    margin-bottom: 0;
  }
`;
const StyledTaskText = styled.p`
  flex-grow: 1;
  text-align: start;
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

const TaskItem = observer(
  ({ taskItem, index, tasksOnDay, setTasksOnDay, date }) => {
    const changeIsImportant = async () => {
      if (user.isAuth) {
        try {
          const { data } = await axios.patch("/tasks/isImportant", {
            dateKey: transformDateToString(date),
            isImportant: !taskItem.isImportant,
            id: taskItem.id,
          });
          console.log("data", data);
          setTasksOnDay(data);
        } catch (error) {
          console.error(error.response.data.message);
        }
      } else {
        const copyTasks = [...tasksOnDay];
        copyTasks[index].isImportant = !copyTasks[index].isImportant;
        setTasksOnDay(copyTasks);
        setStorageTasksList(copyTasks, date);
      }
    };

    const deleteTask = async () => {
      if (user.isAuth) {
        try {
          const { data } = await axios.patch("/tasks/delete", {
            dateKey: transformDateToString(date),
            id: taskItem.id,
          });

          setTasksOnDay(data);
        } catch (error) {
          console.error(error.response.data.message);
        }
      } else {
        const copyTasks = [...tasksOnDay];
        copyTasks.splice(index, 1);

        setTasksOnDay(copyTasks);
        setStorageTasksList(copyTasks, date);
      }
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
  }
);

export default TaskItem;
