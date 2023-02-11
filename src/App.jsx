import Main from "./Components/Main";
import React, { useEffect, useState } from "react";
import styled from "styled-components/macro";
import { Routes, Route } from "react-router-dom";
import AccountPage from "./Components/AccountPage/AccountPage";
// import PrivateRoute from './Components/PrivateRoute';
import NotFoundPage from "./Components/NotFoundPage";
import { checkSizeLocalStorage } from "./scripts/storageWorker/checkSizeLocalStorage";
import axios from "./axios";
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
  const [tasksfromDB, setTaksFromDB] = useState([]);
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
  const handleResize = () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  };

  const fetchData = async () => {
    const { data } = await axios.get("/tasks");
    const selectedFields = [];
    data.forEach((day) => {
      const { calendarDate, tasks } = day;
      selectedFields.push({
        calendarDate:
          calendarDate !== "other" ? new Date(calendarDate) : "other",
        tasks,
      });
    });
    setTaksFromDB(selectedFields);
  };

  const authMe = async () => {
    const token = window.localStorage.getItem("token");
    if (token) {
      const { data } = await axios.get("/auth/me");
      if (data) {
        user.login(data.userData.fullName);
        fetchData();
      }
    }
  };
  useEffect(() => {
    handleResize();

    authMe();

    window.addEventListener("resize", handleResize);
    checkSizeLocalStorage();

    colorTheme.setIsNeedSaveColor(!!LSGetPalette());
    colorTheme.isNeedSaveColor
      ? colorTheme.setPalette(LSGetPalette())
      : colorTheme.generateColor();
  }, []);

  return (
    <StyledApp from={colorTheme.palette.from} to={colorTheme.palette.to}>
      <Routes>
        <Route
          path='/'
          element={
            <Main
              monthNames={monthNames}
              date={date}
              setDate={setDate}
              tasksfromDB={tasksfromDB}
            />
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
