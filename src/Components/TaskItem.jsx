import React, { useState } from 'react';
import styled from 'styled-components/macro';
import { AiFillDelete, AiFillStar } from 'react-icons/ai';
import { useEffect } from 'react';

const StyledTask = styled.li`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5px;
    width: 100%;
    transition: 0.3s;
    border-radius: 10px;
    cursor: pointer;
    &:hover {
        background-color: rgba(255, 255, 255, 0.2);
    }
`;
const StyledTaskText = styled.p`
    flex-grow: 1;
    text-align: start;
    white-space: nowrap;
    text-overflow: ellipsis;
    padding-right: 10px;
    overflow: hidden;
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

const TaskItem = ({
    taskItem,
    index,
    transformDateToString,
    setTaskOnDay,
    date,
    updateLocalStorageDB,
    loadLocalStorageDB,
}) => {
    const [isImportant, setIsImportant] = useState();

    const updateIsImpartant = (index) => {
        let currentDBInStorage = loadLocalStorageDB();
        for (let i = 0; i < currentDBInStorage.length; i++) {
            let copyTasksInfo = currentDBInStorage[i];

            if (
                transformDateToString(copyTasksInfo.date) ===
                transformDateToString(date)
            ) {
                for (
                    let indexTaskInDB = 0;
                    indexTaskInDB < copyTasksInfo.tasksOnDay.length;
                    indexTaskInDB++
                ) {
                    let taskOnDay = copyTasksInfo.tasksOnDay[indexTaskInDB];

                    if (!taskOnDay) return;

                    if (!index && index !== 0) {
                        setIsImportant(taskOnDay.isImportant);
                        updateLocalStorageDB(currentDBInStorage);
                    } else if (indexTaskInDB === index) {
                        taskOnDay.isImportant =
                            !copyTasksInfo?.tasksOnDay[indexTaskInDB]
                                ?.isImportant;

                        setIsImportant(
                            copyTasksInfo.tasksOnDay[index].isImportant
                        );
                        updateLocalStorageDB(currentDBInStorage);
                    } else if (indexTaskInDB !== index) {
                        taskOnDay.isImportant =
                            copyTasksInfo?.tasksOnDay[
                                indexTaskInDB
                            ]?.isImportant;
                        setIsImportant(
                            copyTasksInfo.tasksOnDay[index].isImportant
                        );
                        updateLocalStorageDB(currentDBInStorage);
                    }
                }

                // setIsImportant(copyTasksInfo.tasksOnDay[index].isImportant);
            }
        }
        // updateLocalStorageDB(currentDBInStorage);
    };

    useEffect(() => {
        updateIsImpartant();
    }, [date]);

    const deleteTasksFromStorage = (index) => {
        const currentDBInStorage = loadLocalStorageDB();

        for (let i = 0; i < currentDBInStorage.length; i++) {
            let copyTasksOnDay = currentDBInStorage[i];
            if (
                transformDateToString(copyTasksOnDay.date) ===
                transformDateToString(date)
            ) {
                let changedTasks = copyTasksOnDay.tasksOnDay;
                changedTasks.splice(index, 1);
                copyTasksOnDay = {
                    date,
                    tasksOnDay: changedTasks,
                };

                updateLocalStorageDB(currentDBInStorage);
                setTaskOnDay({
                    date,
                    tasksOnDay: copyTasksOnDay,
                });
            }
        }
    };

    return (
        <StyledTask>
            <StyledButton
                onClick={() => {
                    updateIsImpartant(index);
                }}
            >
                <AiFillStar
                    size={20}
                    fill={
                        isImportant
                            ? 'rgb(255, 255, 255)'
                            : 'rgba(255, 255, 255, 0.6)'
                    }
                />
            </StyledButton>

            <StyledTaskText>{taskItem.text}</StyledTaskText>
            <StyledButton
                onClick={() => {
                    deleteTasksFromStorage(index);
                }}
            >
                <AiFillDelete size={20} fill='rgba(255, 255, 255, 0.8)' />
            </StyledButton>
        </StyledTask>
    );
};

export default TaskItem;
