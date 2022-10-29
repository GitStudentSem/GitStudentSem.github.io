import React from "react";
import styled from "styled-components/macro";
import Navbar from "./Navbar";
import Day from "./Day";

const StyledWrapper = styled.div`
    height: calc(100% - 55px); // 45px - это высота шапки margin + padding
`;
const StyledMain = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: stretch;
    height: 100%;
`;

const Main = ({ date, monthNames, weekDays, setDate }) => {
    return (
        <StyledWrapper>
            <Navbar monthNames={monthNames} date={date} setDate={setDate} />
            <StyledMain>
                {weekDays.map((day, index) => (
                    <Day
                        key={
                            new Date(
                                date.getFullYear(),
                                date.getMonth(),
                                date.getDate() + index
                            )
                        }
                        monthNames={monthNames}
                        date={
                            new Date(
                                date.getFullYear(),
                                date.getMonth(),
                                date.getDate() + index
                            )
                        }
                        weekDays={weekDays}
                    />
                ))}

                <Day date='other' />
            </StyledMain>
        </StyledWrapper>
    );
};

export default Main;
