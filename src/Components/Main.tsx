import styled from "styled-components";
import MonthScreen from "./MonthScreen";
import Navbar from "./Navbar";
import WeekScreen from "./WeekScreen";
import { screenSize } from "../scripts/screens";
import { observer } from "mobx-react-lite";

import { ScreenStore } from "../store/screen";

const StyledWrapper = styled.div`
  height: calc(100% - 55px); // 45px - это высота шапки margin + padding
  max-width: 1500px;
  width: 100%;
  @media (max-width: ${screenSize.tablet}px) {
    height: calc(100% - 85px);
  }
`;

const Main = observer(() => {
  return (
    <StyledWrapper>
      <Navbar />
      {ScreenStore.isMonth ? <MonthScreen /> : <WeekScreen />}
    </StyledWrapper>
  );
});

export default Main;
