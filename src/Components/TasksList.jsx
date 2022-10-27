import React, { useState, useEffect } from 'react';
import styled from 'styled-components/macro';
import TaskItem from './TaskItem';

const StyledTasksList = styled.ul`
    list-style-type: none;
    padding: 0 5px 0 0;
    height: calc(100% - 75px); // Высота зависит от шапки
    overflow-y: auto;
`;

const TasksList = ({
    tasksOnDayState,
    transformDateToString,
    setTaskOnDay,
    date,
    updateLocalStorageDB,
    loadLocalStorageDB,
}) => {
    return (
        <StyledTasksList>
            {tasksOnDayState?.tasksOnDay?.length > 0 &&
                tasksOnDayState.tasksOnDay.map((taskItem, index) => {
                    return (
                        <TaskItem
                            key={taskItem.text + index}
                            taskItem={taskItem}
                            index={index}
                            transformDateToString={transformDateToString}
                            setTaskOnDay={setTaskOnDay}
                            date={date}
                            updateLocalStorageDB={updateLocalStorageDB}
                            loadLocalStorageDB={loadLocalStorageDB}
                        />
                    );
                })}
        </StyledTasksList>
    );
};

export default TasksList;
