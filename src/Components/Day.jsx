import React, { useState, useEffect } from "react";
import styled from "styled-components/macro";
import TasksList from "./TasksList";
import CreateTasksForm from "./CreateTasksForm";
import DayHeader from "./DayHeader";

const StyledDay = styled.div`
    position: relative;
    width: 24%;
    border-radius: 10px;
    height: 48%;
    background-color: rgba(255, 255, 255, 0.2);
    padding: 5px;
    overflow: hidden;
`;
const StyledIsdev = styled.div`
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    position: absolute;
    left: 0;
    top: 0;
    width: ${(props) => (props.isDev ? "100%" : "0px")};
    height: ${(props) => (props.isDev ? "100%" : "0px")};
    background-color: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(${(props) => (props.isDev ? "3px" : "0px")});
`;

const Day = ({ date, monthNames, weekDays, isDev }) => {
    const [tasksOnDay, setTasksOnDay] = useState([]);

    const transformDateToString = () => {
        if (date === "other") {
            return "other";
        }
        return date.toISOString().slice(0, 10);
    };

    const getTasksOnDay = () => {
        let tasksOnDay = localStorage.getItem(transformDateToString());

        if (!tasksOnDay) {
            setTasksOnDay([]);
        } else {
            setTasksOnDay(JSON.parse(tasksOnDay));
        }
    };

    const checkSizeLocalStorage = () => {
        let _lsTotal = 0,
            _xLen,
            _x;
        for (_x in localStorage) {
            if (!localStorage.hasOwnProperty(_x)) {
                continue;
            }
            _xLen = (localStorage[_x].length + _x.length) * 2;
            _lsTotal += _xLen;
        }
        console.log("Всего занято = " + (_lsTotal / 1024).toFixed(2) + " KB");
        // console.table(loadLocalStorageDB()));
        return _lsTotal / 1024;
    };

    useEffect(() => {
        getTasksOnDay();
        checkSizeLocalStorage();
    }, [date]);

    return (
        <StyledDay isDev={isDev}>
            <DayHeader
                date={date}
                monthNames={monthNames}
                weekDays={weekDays}
            />
            <CreateTasksForm
                transformDateToString={transformDateToString}
                date={date}
                tasksOnDay={tasksOnDay}
                setTasksOnDay={setTasksOnDay}
            />
            <TasksList
                transformDateToString={transformDateToString}
                tasksOnDay={tasksOnDay}
                setTasksOnDay={setTasksOnDay}
            />
            {isDev && <StyledIsdev isDev={isDev}>Скоро появится</StyledIsdev>}
        </StyledDay>
    );
};

export default Day;
