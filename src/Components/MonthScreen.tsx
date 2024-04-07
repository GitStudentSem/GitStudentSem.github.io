import styled from "styled-components";
import DayMonth from "./DayMonth";
import { useSwipeable } from "react-swipeable";
import { TasksFromDBType } from "./Main";

const StyledWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(5, 1fr);
  grid-column-gap: 2px;
  grid-row-gap: 2px;
  height: 100%; // 45px - это высота шапки margin + padding
`;
interface IMonthScreenProps {
  date: Date;
  setDate: (date: Date) => void;
  setIsMonth: (isMonth: boolean) => void;
  tasksFromDB: TasksFromDBType[];
}
const MonthScreen = ({
  date,
  setIsMonth,
  setDate,
  tasksFromDB,
}: IMonthScreenProps) => {
  //* при обновлении date компонент будет перерисован
  //* currentMonth nextMont daysInMonth будут рассчитаны заново
  const currentMonth = new Date(date.getFullYear(), date.getMonth(), 1);
  const nextMonth = new Date(date.getFullYear(), date.getMonth() + 1, 1);
  const daysInMonth = Math.round(
    (Number(nextMonth) - Number(currentMonth)) / 1000 / 3600 / 24
  );

  const swipeDate = useSwipeable({
    onSwipedLeft: () => {
      setDate(
        new Date(date.getFullYear(), date.getMonth() - 1, date.getDate())
      );
    },
    onSwipedRight: () => {
      setDate(
        new Date(date.getFullYear(), date.getMonth() + 1, date.getDate())
      );
    },
    swipeDuration: 500,
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  return (
    <StyledWrapper {...swipeDate}>
      {[...Array(daysInMonth)].map((_day, index) => (
        <DayMonth
          key={`${currentMonth.getDate()}_${index}`}
          date={
            new Date(
              currentMonth.getFullYear(),
              currentMonth.getMonth(),
              currentMonth.getDate() + index
            )
          }
          setDate={setDate}
          setIsMonth={setIsMonth}
          tasksFromDB={tasksFromDB}
        />
      ))}
      <DayMonth
        date='other'
        startColumn={35 - daysInMonth}
        setDate={setDate}
        setIsMonth={setIsMonth}
        tasksFromDB={tasksFromDB}
      />
    </StyledWrapper>
  );
};

export default MonthScreen;
