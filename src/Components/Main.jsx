import React, { useState } from "react";
import styled from "styled-components/macro";
import MonthScreen from "./MonthScreen";
import Navbar from "./Navbar";
import WeekScreen from "./WeekScreen";
import { screenSize } from "../scripts/screens";
import axios from "../axios";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";

const StyledWrapper = styled.div`
  height: calc(100% - 55px); // 45px - это высота шапки margin + padding
  max-width: 1500px;
  width: 100%;
  @media (max-width: ${screenSize.tablet}px) {
    height: calc(100% - 85px);
  }
`;

const Main = observer(({ date, monthNames, setDate }) => {
  const [isMonth, setIsMonth] = useState(true);
  const [tasksfromDB, setTaksFromDB] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get("/tasks");
        const selectedFields = [];
        console.log("data", data);
        for (const day of data) {
          const { dateKey, tasks } = day;

          selectedFields.push({
            calendarDate: dateKey !== "other" ? new Date(dateKey) : "other",
            tasks,
          });
        }
        setTaksFromDB(selectedFields);
      } catch (error) {
        console.error(error.response.data.message);
      }
    };

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
          setDate={setDate}
          monthNames={monthNames}
          tasksfromDB={tasksfromDB}
        />
      )}
    </StyledWrapper>
  );
});

export default Main;
