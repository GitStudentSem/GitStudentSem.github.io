import React, { useState, useEffect } from "react";
import styled from "styled-components/macro";
import TasksList from "./TasksList";
import CreateTasksForm from "./CreateTasksForm";
import DayHeader from "./DayHeader";
import {
    getStorageTasksList,
    setStorageTasksList,
} from "../scripts/localStorageWorker";
import { transformDateToString } from "../scripts/transformDateToString";

const StyledDay = styled.div`
    position: relative;
    width: 100%;
    border-radius: 10px;
    height: 100%;
    background-color: ${(props) =>
        props.isToday
            ? "rgba(255, 255, 255, 0.35)"
            : "rgba(255, 255, 255, 0.2)"};
    padding: 5px;
    overflow: hidden;
`;

const Day = ({ date, monthNames, weekDays, isDev }) => {
    const [tasksOnDay, setTasksOnDay] = useState(getStorageTasksList(date));

    const addTask = (task) => {
        setTasksOnDay((prev) => {
            setStorageTasksList([...prev, task], date);
            return [...prev, task];
        });
    };
    useEffect(() => {
        setTasksOnDay(getStorageTasksList(date));
    }, [date]);

    useEffect(() => {
        setStorageTasksList(tasksOnDay, date);
    }, [date, tasksOnDay]);

    return (
        <StyledDay
            isDev={isDev}
            isToday={
                transformDateToString(date) ===
                transformDateToString(new Date())
            }
        >
            <DayHeader
                date={date}
                monthNames={monthNames}
                weekDays={weekDays}
            />
            <CreateTasksForm date={date} addTask={addTask} />
            <TasksList tasksOnDay={tasksOnDay} setTasksOnDay={setTasksOnDay} />
        </StyledDay>
    );
};

export default Day;
