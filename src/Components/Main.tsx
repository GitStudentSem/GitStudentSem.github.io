import styled from "styled-components";
import MonthScreen from "./MonthScreen";
import Navbar from "./Navbar";
import WeekScreen from "./WeekScreen";
import { screenSize } from "../scripts/screens";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";

import user from "../store/user";
import { TasksStore } from "../store/tasks";
import { ScreenStore } from "../store/screen";

const StyledWrapper = styled.div`
  height: calc(100% - 55px); // 45px - это высота шапки margin + padding
  max-width: 1500px;
  width: 100%;
  @media (max-width: ${screenSize.tablet}px) {
    height: calc(100% - 85px);
  }
`;

interface IMainProps {
  date: Date;
  setDate: (date: Date) => void;
}
const Main = observer(({ date, setDate }: IMainProps) => {
  const { isAuth } = user;

  useEffect(() => {
    if (!isAuth) return;
    TasksStore.setTasksfromDB();
  }, [isAuth]);

  return (
    <StyledWrapper>
      <Navbar date={date} setDate={setDate} />
      {ScreenStore.isMonth ? (
        <MonthScreen date={date} setDate={setDate} />
      ) : (
        <WeekScreen date={date} setDate={setDate} />
      )}
    </StyledWrapper>
  );
});

export default Main;
