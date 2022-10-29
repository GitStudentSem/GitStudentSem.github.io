import React, { useState, useEffect } from "react";
import styled from "styled-components/macro";
import { AiFillCheckCircle } from "react-icons/ai";
import Star from "./Star";

const StyledForm = styled.form`
    display: flex;
`;
const StyledInput = styled.input`
    outline: none;
    border: none;
    flex: 1;
    background-color: rgba(255, 255, 255, 0.2);
    padding: 2px 5px;
    border-radius: 5px;
    &::placeholder {
        color: rgb(255, 255, 255);
    }
`;
const StyledButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    outline: none;
    border: none;
    background-color: transparent;
    cursor: pointer;
    margin: 0;
    padding: 0;
    transition: all 0.3s;
    padding: 2px 5px;
    margin-left: 5px;
    border-radius: 5px;
    &:hover {
        background-color: rgba(255, 255, 255, 0.2);
    }
`;

const CreateTasksForm = ({
    transformDateToString,
    date,
    tasksOnDay,
    setTasksOnDay,
}) => {
    const [text, setText] = useState("");
    const [isImportant, setIsImportant] = useState(false);

    const changeIsImportant = () => {
        setIsImportant(!isImportant);
        localStorage.setItem(
            `isImportant-${transformDateToString()}`,
            JSON.stringify(!isImportant)
        );
    };

    useEffect(() => {
        let isImportantInStorage = localStorage.getItem(
            `isImportant-${transformDateToString()}`
        );
        if (!isImportantInStorage || isImportantInStorage === "false") {
            return;
        } else {
            setIsImportant(true);
            localStorage.setItem(
                `isImportant-${transformDateToString()}`,
                JSON.stringify(true)
            );
        }
    }, [date, transformDateToString]);

    const changeText = (value) => {
        setText(value);
        localStorage.setItem(
            `text-${transformDateToString()}`,
            JSON.stringify(value)
        );
    };

    useEffect(() => {
        let textInLocalStorage = localStorage.getItem(
            `text-${transformDateToString()}`
        );

        if (!textInLocalStorage) {
            return;
        } else {
            setText(JSON.parse(textInLocalStorage));
        }
    }, []);

    return (
        <StyledForm>
            <StyledInput
                type='text'
                value={text}
                onChange={(e) => {
                    changeText(e.target.value);
                }}
                placeholder='Какие планы?'
            />
            <Star setValue={changeIsImportant} value={isImportant} />

            <StyledButton
                onClick={(e) => {
                    e.preventDefault();

                    setTasksOnDay((prevState) => [
                        ...prevState,
                        { text, isImportant },
                    ]);

                    localStorage.setItem(
                        transformDateToString(),
                        JSON.stringify(tasksOnDay)
                    );
                    changeText("");
                    setIsImportant(false);
                }}
                disabled={!text}
                type='submit'
            >
                <AiFillCheckCircle
                    size={20}
                    fill={
                        text
                            ? "rgba(255, 255, 255)"
                            : "rgba(255, 255, 255, 0.6)"
                    }
                />
            </StyledButton>
        </StyledForm>
    );
};

export default CreateTasksForm;
