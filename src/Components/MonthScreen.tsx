import styled from "styled-components";
import { useSwipeable } from "react-swipeable";
import { ScreenStore } from "../store/screen";
import { observer } from "mobx-react-lite";
import { Day } from "./Day";

const StyledWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(5, 1fr);
  grid-column-gap: 2px;
  grid-row-gap: 2px;
  height: 100%; // 45px - это высота шапки margin + padding
`;

const MonthScreen = observer(() => {
  //* при обновлении date компонент будет перерисован
  //* currentMonth nextMont daysInMonth будут рассчитаны заново
  const currentMonth = new Date(
    ScreenStore.date.getFullYear(),
    ScreenStore.date.getMonth(),
    1
  );
  const nextMonth = new Date(
    ScreenStore.date.getFullYear(),
    ScreenStore.date.getMonth() + 1,
    1
  );
  const daysInMonth = Math.round(
    (Number(nextMonth) - Number(currentMonth)) / 1000 / 3600 / 24
  );

  const swipeDate = useSwipeable({
    onSwipedLeft: () => {
      ScreenStore.setDate(
        new Date(
          ScreenStore.date.getFullYear(),
          ScreenStore.date.getMonth() - 1,
          ScreenStore.date.getDate()
        )
      );
    },
    onSwipedRight: () => {
      ScreenStore.setDate(
        new Date(
          ScreenStore.date.getFullYear(),
          ScreenStore.date.getMonth() + 1,
          ScreenStore.date.getDate()
        )
      );
    },
    swipeDuration: 500,
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  return (
    <StyledWrapper {...swipeDate}>
      {[...Array(daysInMonth)].map((_day, index) => (
        <Day
          key={`${currentMonth.getDate()}_${index}`}
          date={
            new Date(
              currentMonth.getFullYear(),
              currentMonth.getMonth(),
              currentMonth.getDate() + index
            )
          }
        />
      ))}
      <Day date='other' startColumn={35 - daysInMonth} />
    </StyledWrapper>
  );
});
export default MonthScreen;
