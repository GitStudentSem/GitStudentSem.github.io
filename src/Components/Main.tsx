import { useState } from "react";
import styled from "styled-components";
import MonthScreen from "./MonthScreen";
import Navbar from "./Navbar";
import WeekScreen from "./WeekScreen";
import { screenSize } from "../scripts/screens";
import axios from "../axios";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { logError } from "../scripts/errorLog";

const StyledWrapper = styled.div`
  height: calc(100% - 55px); // 45px - это высота шапки margin + padding
  max-width: 1500px;
  width: 100%;
  @media (max-width: ${screenSize.tablet}px) {
    height: calc(100% - 85px);
  }
`;

export type ITask = {
  text: string;
  isImportant: boolean;
  id: string;
};

export type TasksFromDBType = {
  dateKey: Date | "other";
  tasks: ITask[];
};

interface IMainProps {
  date: Date;
  setDate: (date: Date) => void;
}
const Main = observer(({ date, setDate }: IMainProps) => {
  const [isMonth, setIsMonth] = useState(true);
  const [tasksfromDB, setTaksFromDB] = useState<TasksFromDBType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get("/tasks/all");
        const selectedFields: TasksFromDBType[] = [];
        for (const dateKey in data) {
          selectedFields.push({
            dateKey: dateKey !== "other" ? new Date(dateKey) : "other",
            tasks: data[dateKey],
          });
        }
        setTaksFromDB(selectedFields);
      } catch (error) {
        logError(error);
      }
    };

    fetchData();
  }, []);

  return (
    <StyledWrapper>
      <Navbar
        date={date}
        setDate={setDate}
        setIsMonth={setIsMonth}
        isMonth={isMonth}
      />
      {isMonth ? (
        <MonthScreen
          date={date}
          setIsMonth={setIsMonth}
          setDate={setDate}
          tasksfromDB={tasksfromDB}
        />
      ) : (
        <WeekScreen date={date} setDate={setDate} tasksfromDB={tasksfromDB} />
      )}
    </StyledWrapper>
  );
});

export default Main;
