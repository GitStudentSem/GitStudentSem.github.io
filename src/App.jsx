import Main from "./Components/Main";
import React, { useState } from "react";
import styled from "styled-components/macro";
import { Routes, Route } from "react-router-dom";
import AccountPage from "./Components/AccountPage";
// import PrivateRoute from './Components/PrivateRoute';
import NotFoundPage from "./Components/NotFoundPage";

const StyledApp = styled.div`
    background: #fff;
    padding: 5px;
    height: 100vh;
    background: radial-gradient(
        circle,
        ${(props) => props.from} 10%,
        ${(props) => props.to} 100%
    );
`;

function App() {
    const [date, setDate] = useState(new Date());

    const generateColor = () => {
        // setTheArray((oldArray) => [...oldArray, newElement]);
        const getRandomColor = () => {
            let letters = "0123456789ABCD";
            let color = "#";
            for (let i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * letters.length)];
            }
            return color;
        };

        return {
            from: getRandomColor(),
            to: getRandomColor(),
        };
    };

    const [colorsTheme, setColorsTheme] = useState(
        localStorage.getItem("colorsTheme") &&
            localStorage.getItem("colorsTheme").length > 0
            ? JSON.parse(localStorage.getItem("colorsTheme"))
            : generateColor()
    );

    let weekDays = [
        "Воскресенье",
        "Понедельник",
        "Вторник",
        "Среда",
        "Четверг",
        "Пятница",
        "Суббота",
    ];

    let monthNames = [
        "Январь",
        "Февраль",
        "Март",
        "Апрель",
        "Май",
        "Июнь",
        "Июль",
        "Август",
        "Сентябрь",
        "Октябрь",
        "Ноябрь",
        "Декабрь",
    ];

    return (
        <StyledApp from={colorsTheme.from} to={colorsTheme.to}>
            <Routes>
                <Route
                    path='/'
                    element={
                        <Main
                            monthNames={monthNames}
                            date={date}
                            weekDays={weekDays}
                            setDate={setDate}
                        />
                    }
                />
                <Route
                    path='/account'
                    element={
                        <AccountPage
                            setColorsTheme={setColorsTheme}
                            colorsTheme={colorsTheme}
                            generateColor={generateColor}
                        />
                    }
                />
                <Route path='*' element={<NotFoundPage />} />
                {/* <Route path='/login' element={<Login />} /> */}
            </Routes>
        </StyledApp>
    );
}

export default App;
