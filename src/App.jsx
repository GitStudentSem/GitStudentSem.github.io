import Main from "./Components/Main";
import React, { useEffect, useState } from "react";
import styled from "styled-components/macro";
import { Routes, Route } from "react-router-dom";
import AccountPage from "./Components/AccountPage/AccountPage";
// import PrivateRoute from './Components/PrivateRoute';
import NotFoundPage from "./Components/NotFoundPage";
import { checkSizeLocalStorage } from "./scripts/localStorageWorker";
import { generateColor } from "./scripts/generateColor";
const StyledApp = styled.div`
    display: flex;
    justify-content: center;
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

    const [colorsTheme, setColorsTheme] = useState(
        localStorage.getItem("colorsTheme")
            ? JSON.parse(localStorage.getItem("colorsTheme"))
            : generateColor()
    );

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
    useEffect(() => {
        checkSizeLocalStorage();
    }, []);
    return (
        <StyledApp from={colorsTheme.from} to={colorsTheme.to}>
            <Routes>
                <Route
                    path='/'
                    element={
                        <Main
                            monthNames={monthNames}
                            date={date}
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
