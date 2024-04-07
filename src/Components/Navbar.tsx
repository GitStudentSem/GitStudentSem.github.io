import { Link } from "react-router-dom";
import styled from "styled-components";
import NavigationFromDate from "./NavigatonFromDate";
import { FaUserAlt } from "react-icons/fa";
import { TfiLayoutGrid2Alt, TfiLayoutGrid3Alt } from "react-icons/tfi";
import { screenSize } from "../scripts/screens";
import { monthNames } from "../scripts/montsAndDaysEnum";
import { ScreenStore } from "../store/screen";
import { observer } from "mobx-react-lite";

const StyledNavbar = styled.div`
  /* 
        Изменение высоты данного блока требует 
        изменения высоты StyledMain в /Components/Main.js 
    */
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: relative;
  margin-bottom: 10px;
  @media (max-width: ${screenSize.tablet}px) {
    flex-wrap: wrap;
  }
`;

interface IStyledButton {
  $isMonth?: boolean;
}

const StyledButton = styled.button<IStyledButton>`
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;
  border: none;
  cursor: pointer;
  margin: 0;
  padding: 0;
  transition: all 0.3s;
  padding: 5px;
  border-radius: 5px;
  background-color: ${(props) =>
    props.$isMonth ? "rgba(255, 255, 255, 0.2)" : "transparent"};
  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;
const StyledVisibleTypeWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 80px;
`;
const StyledButtons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40%;
  justify-content: space-between;
  @media (max-width: ${screenSize.tablet}px) {
    order: 3;
    width: 100%;
  }
`;

const Navbar = observer(() => {
  return (
    <StyledNavbar>
      <NavigationFromDate
        setPrevDate={() => {
          ScreenStore.setDate(
            new Date(
              ScreenStore.date.getFullYear(),
              ScreenStore.date.getMonth() - 1,
              ScreenStore.date.getDate()
            )
          );
        }}
        setNextDate={() => {
          ScreenStore.setDate(
            new Date(
              ScreenStore.date.getFullYear(),
              ScreenStore.date.getMonth() + 1,
              ScreenStore.date.getDate()
            )
          );
        }}
      >
        <p style={{ color: "rgba(255, 255, 255, 0.85)" }}>
          {monthNames[ScreenStore.date.getMonth()]}
        </p>
      </NavigationFromDate>

      <StyledButtons>
        <StyledButton
          onClick={() => {
            ScreenStore.setDate(new Date());
          }}
          title='Перейти к сегодняшнему дню'
        >
          СЕГОДНЯ
        </StyledButton>

        <StyledButton disabled title='Аккаунт'>
          <Link to='/account'>
            <FaUserAlt size={30} fill='rgba(255, 255, 255, 0.8)' />
          </Link>
        </StyledButton>

        <StyledVisibleTypeWrapper>
          <StyledButton
            onClick={() => {
              ScreenStore.setIsMonth(false);
            }}
            title='Отображать дни'
            $isMonth={!ScreenStore.isMonth}
          >
            <TfiLayoutGrid2Alt size={25} />
          </StyledButton>
          <StyledButton
            onClick={() => {
              ScreenStore.setIsMonth(true);
            }}
            title='Отображать месяца'
            $isMonth={ScreenStore.isMonth}
          >
            <TfiLayoutGrid3Alt size={25} />
          </StyledButton>
        </StyledVisibleTypeWrapper>
      </StyledButtons>

      <NavigationFromDate
        setPrevDate={() => {
          ScreenStore.setDate(
            new Date(
              ScreenStore.date.getFullYear() - 1,
              ScreenStore.date.getMonth(),
              ScreenStore.date.getDate()
            )
          );
        }}
        setNextDate={() => {
          ScreenStore.setDate(
            new Date(
              ScreenStore.date.getFullYear() + 1,
              ScreenStore.date.getMonth(),
              ScreenStore.date.getDate()
            )
          );
        }}
      >
        <p>{ScreenStore.date.getFullYear()}</p>
      </NavigationFromDate>
    </StyledNavbar>
  );
});
export default Navbar;
