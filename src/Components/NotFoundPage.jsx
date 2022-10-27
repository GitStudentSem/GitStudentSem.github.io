import styled from 'styled-components/macro';
import React from 'react';
import { Link } from 'react-router-dom';
import { IoTodaySharp } from 'react-icons/io5';

const StyledHeader = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
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
const StyledWrapper = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
`;
const StyledBlockWrapper = styled.div`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    width: 30%;
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 10px;
    padding: 10px;
`;
const StyledDescription = styled.p`
    text-align: center;
    color: rgba(255, 255, 255, 0.6);
    font-size: 24px;
    width: 100%;
`;

const NotFoundPage = () => {
    return (
        <StyledWrapper>
            <StyledHeader>
                <StyledButton disabled>
                    <Link to='/'>
                        <IoTodaySharp
                            size={30}
                            fill='rgba(255, 255, 255, 0.8)'
                        />
                    </Link>
                </StyledButton>
            </StyledHeader>
            <StyledBlockWrapper>
                <StyledDescription>Здесь нет такой страницы.</StyledDescription>
                <StyledDescription>
                    Может вы заработались и пора отдохнуть?
                </StyledDescription>
            </StyledBlockWrapper>
            <div></div>
        </StyledWrapper>
    );
};
export default NotFoundPage;
