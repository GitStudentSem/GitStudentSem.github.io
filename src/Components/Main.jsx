import React, { useState } from "react";
import styled from "styled-components/macro";
import MonthScreen from "./MonthScreen";
import Navbar from "./Navbar";
import WeekScreen from "./WeekScreen";
import { screenSize } from "../scripts/screens";
const StyledWrapper = styled.div`
    height: calc(100% - 55px); // 45px - это высота шапки margin + padding
    max-width: 1500px;
    width: 100%;
    @media (max-width: ${screenSize.tablet}px) {
        height: calc(100% - 85px);
    }
`;

const Main = ({ date, monthNames, setDate }) => {
    const [isMonth, setIsMonth] = useState(true);

    const tasksFromBD = [
        // {
        //     date: new Date(),
        //     tasks: [{ text: "запросил из базы", isImportant: true }],
        // },
        // {
        //     date: new Date(
        //         new Date().getFullYear(),
        //         new Date().getMonth(),
        //         new Date().getDate() + 2
        //     ),
        //     tasks: [
        //         { text: "запросил из базы через 2 дня", isImportant: true },
        //     ],
        // },
    ];

    return (
        <StyledWrapper>
            <Navbar
                monthNames={monthNames}
                date={date}
                setDate={setDate}
                setIsMonth={setIsMonth}
                isMonth={isMonth}
            />
            {isMonth ? (
                <MonthScreen
                    date={date}
                    setIsMonth={setIsMonth}
                    setDate={setDate}
                />
            ) : (
                <WeekScreen
                    date={date}
                    monthNames={monthNames}
                    tasksFromBD={tasksFromBD}
                />
            )}
        </StyledWrapper>
    );
};

export default Main;
