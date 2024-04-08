import styled from "styled-components";
import TasksList from "./TasksList";
import CreateTasksForm from "./CreateTasksForm";
import DayHeader from "./DayHeader";
import { transformDateToString } from "../scripts/transformDateToString";
import { observer } from "mobx-react-lite";

type StyledDayType = { $isToday: boolean };
const StyledDay = styled.div<StyledDayType>`
  position: relative;
  width: 100%;
  border-radius: 10px;
  height: 100%;
  background-color: ${(props) =>
    props.$isToday ? "rgba(255, 255, 255, 0.35)" : "rgba(255, 255, 255, 0.2)"};
  padding: 5px;
  overflow: hidden;
`;

interface IDayProps {
  date: Date | "other";
}
export const WeekDay = observer(({ date }: IDayProps) => {
  return (
    <StyledDay
      $isToday={
        transformDateToString(date) === transformDateToString(new Date())
      }
    >
      <DayHeader date={date} />
      <CreateTasksForm date={date} />
      <TasksList date={date} />
    </StyledDay>
  );
});
