import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components/macro';
import NavigationFromDate from './NavigatonFromDate';
import { FaUserAlt } from 'react-icons/fa';
const StyledNavbar = styled.div`
    /* 
        Изменение высоты данного блока требует 
        изменения высоты StyledMain в /Components/Main.js 
    */
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    margin-bottom: 10px;
`;
const StyledButton = styled.button`
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
    &:hover {
        background-color: rgba(255, 255, 255, 0.2);
    }
`;

const Navbar = ({ monthNames, date, setDate }) => {
    const getWeekNumber = () => {
        const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
        const pastDaysOfYear = (date - firstDayOfYear) / 86400000;

        return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
    };

    return (
        <StyledNavbar>
            <NavigationFromDate
                setPrevDate={() => {
                    setDate(
                        new Date(
                            date.getFullYear(),
                            date.getMonth() - 1,
                            date.getDate()
                        )
                    );
                }}
                setNextDate={() => {
                    setDate(
                        new Date(
                            date.getFullYear(),
                            date.getMonth() + 1,
                            date.getDate()
                        )
                    );
                }}
            >
                <p style={{ color: 'rgba(255, 255, 255, 0.85)' }}>
                    {monthNames[date.getMonth()]} {date.getFullYear()}
                </p>
            </NavigationFromDate>

            <StyledButton disabled>
                <Link to='/account'>
                    <FaUserAlt size={30} fill='rgba(255, 255, 255, 0.8)' />
                </Link>
            </StyledButton>

            <NavigationFromDate
                setPrevDate={() => {
                    setDate(
                        new Date(
                            date.getFullYear(),
                            date.getMonth(),
                            date.getDate() - 7
                        )
                    );
                }}
                setNextDate={() => {
                    setDate(
                        new Date(
                            date.getFullYear(),
                            date.getMonth(),
                            date.getDate() + 7
                        )
                    );
                }}
            >
                <p>неделя {getWeekNumber()}</p>
            </NavigationFromDate>
        </StyledNavbar>
    );
};

export default Navbar;
