import { FaRegCalendar } from "react-icons/fa";
import { MdOutlineWorkOutline } from "react-icons/md";
import styled from "styled-components";
import { transformDateToString } from "../scripts/transformDateToString";
import { observer } from "mobx-react-lite";
import { ScreenStore } from "../store/screen";
import { TasksStore } from "../store/tasks";

type IStyledDay = {
  $isToday: boolean;
  $isDayOff: boolean;
  $startColumn: number;
};
const StyledDay = styled.button<IStyledDay>`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  border-radius: 10px;
  padding: 1px;
  background-color: ${(props) =>
    props.$isToday
      ? "rgba(255, 255, 255, 0.4)"
      : props.$isDayOff
      ? "rgba(255, 255, 255, 0.3)"
      : "rgba(255, 255, 255, 0.2)"};
  &:last-child {
    grid-column-start: ${(props) => 8 - props.$startColumn};
    grid-column-end: 8;
  }
`;
const StyledDate = styled.div`
  position: absolute;
  top: 10px;
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  flex-shrink: 0;
  flex-grow: 1;
`;
const StyledCountTasks = styled.div`
  position: absolute;
  bottom: 11px;
  width: 100%;
`;
const IconWrapper = styled.div`
  position: relative;
  height: min-content;
  width: 100%;
`;
interface IDayMonthProps {
  date: Date | "other";
  startColumn?: number;
}

export const MonthDay = observer(({ date, startColumn }: IDayMonthProps) => {
  return (
    <StyledDay
      $startColumn={startColumn || 0}
      onClick={() => {
        ScreenStore.setIsMonth(false);
        ScreenStore.setDate(date === "other" ? new Date() : date);
      }}
      $isToday={
        transformDateToString(date) === transformDateToString(new Date())
      }
      $isDayOff={
        date !== "other" && (date.getDay() === 0 || date.getDay() === 6)
      }
    >
      <IconWrapper>
        <FaRegCalendar size={30} />
        <StyledDate>{date !== "other" ? date.getDate() : "..."}</StyledDate>
      </IconWrapper>
      <IconWrapper>
        <MdOutlineWorkOutline size={35} />

        <StyledCountTasks>
          {TasksStore.getTasksOnDay(date).length}
        </StyledCountTasks>
      </IconWrapper>
    </StyledDay>
  );
});
