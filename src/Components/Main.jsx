import React, { useState } from "react";
import styled from "styled-components/macro";
import MonthScreen from "./MonthScreen";
import Navbar from "./Navbar";
import WeekScreen from "./WeekScreen";
import { screenSize } from "../scripts/screens";
import axios from "../axios";
import { useEffect } from "react";
import { FaChessKing } from "react-icons/fa";
const StyledWrapper = styled.div`
  height: calc(100% - 55px); // 45px - это высота шапки margin + padding
  max-width: 1500px;
  width: 100%;
  @media (max-width: ${screenSize.tablet}px) {
    height: calc(100% - 85px);
  }
`;

const Main = ({ date, monthNames, setDate }) => {
  const [isMonth, setIsMonth] = useState(true);
  const [tasksfromDB, setTaksFromDB] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get("/tasks");
      const selectedFields = [];
      data.map((day) => {
        const { calendarDate, tasks } = day;
        selectedFields.push({
          calendarDate:
            calendarDate !== "other" ? new Date(calendarDate) : "other",
          tasks,
        });
      });
      setTaksFromDB(selectedFields);
    }
    fetchData();
  }, []);

  return (
    <StyledWrapper>
      <Navbar
        monthNames={monthNames}
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
        <WeekScreen
          date={date}
          monthNames={monthNames}
          tasksfromDB={tasksfromDB}
        />
      )}
    </StyledWrapper>
  );
};

export default Main;
