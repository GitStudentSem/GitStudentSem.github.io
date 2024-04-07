import Main from "./Components/Main";
import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { Routes, Route } from "react-router-dom";
import AccountPage from "./Components/AccountPage/AccountPage";
// import PrivateRoute from './Components/PrivateRoute';
import NotFoundPage from "./Components/NotFoundPage";
import { checkSizeLocalStorage } from "./scripts/storageWorker/checkSizeLocalStorage";
import { observer } from "mobx-react-lite";
import colorTheme from "./store/colorTheme";
import { LSGetPalette } from "./scripts/storageWorker/LSPalette";
import user from "./store/user";

const StyledApp = styled.div`
  display: flex;
  justify-content: center;
  padding: 5px;
  height: 100vh;
  height: calc(var(--vh, 1vh) * 100);
  background: radial-gradient(
    circle,
    ${(props) => props.from} 10%,
    ${(props) => props.to} 100%
  );
`;

const App = observer(() => {
  const [date, setDate] = useState(new Date());
  const monthNames = [
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
  const handleResize = useCallback(() => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }, []);

  const authMe = useCallback(async () => {
    try {
      const token = window.localStorage.getItem("token");
      if (!token) return;

      const response = await fetch("http://localhost:3333/auth/me", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();

      if (!response.ok) {
        return console.error(data.message);
      }
      user.login(data.fullName);
    } catch (error) {
      error.message && console.error(error.message);
      console.error(error);
    }
  }, []);

  useEffect(() => {
    handleResize();

    authMe();

    window.addEventListener("resize", handleResize);
    checkSizeLocalStorage();

    colorTheme.setIsNeedSaveColor(!!LSGetPalette());
    colorTheme.isNeedSaveColor
      ? colorTheme.setPalette(LSGetPalette())
      : colorTheme.generateColor();
  }, [handleResize, authMe]);

  return (
    <StyledApp from={colorTheme.palette.from} to={colorTheme.palette.to}>
      <Routes>
        <Route
          path='/'
          element={
            <Main monthNames={monthNames} date={date} setDate={setDate} />
          }
        />
        <Route path='/account' element={<AccountPage />} />
        <Route path='*' element={<NotFoundPage />} />
        {/* <Route path='/login' element={<Login />} /> */}
      </Routes>
    </StyledApp>
  );
});

export default App;
