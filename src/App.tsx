import Main from "./Components/Main";
import { useCallback, useEffect } from "react";
import styled from "styled-components";
import { Routes, Route } from "react-router-dom";
import AccountPage from "./Components/AccountPage/AccountPage";
// import PrivateRoute from './Components/PrivateRoute';
import NotFoundPage from "./Components/NotFoundPage";
import { checkSizeLocalStorage } from "./scripts/storageWorker/checkSizeLocalStorage";
import { observer } from "mobx-react-lite";
import { PaletteType, ColorThemeStore } from "./store/colorTheme";
import { LSGetPalette } from "./scripts/storageWorker/LSPalette";
import { UserStore } from "./store/user";
import { logError } from "./scripts/errorLog";
import { TasksStore } from "./store/tasks";

const StyledApp = styled.div<PaletteType>`
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

      UserStore.login(data.fullName);
      TasksStore.setTasksfromDB();
    } catch (error) {
      logError(error);
    }
  }, []);

  useEffect(() => {
    authMe();

    checkSizeLocalStorage();

    ColorThemeStore.setIsNeedSaveColor(!!LSGetPalette());
    ColorThemeStore.isNeedSaveColor
      ? ColorThemeStore.setPalette(LSGetPalette())
      : ColorThemeStore.generateColor();
  }, [authMe]);

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  return (
    <StyledApp
      from={ColorThemeStore.palette.from}
      to={ColorThemeStore.palette.to}
    >
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/account' element={<AccountPage />} />
        <Route path='*' element={<NotFoundPage />} />
        {/* <Route path='/login' element={<Login />} /> */}
      </Routes>
    </StyledApp>
  );
});

export default App;
