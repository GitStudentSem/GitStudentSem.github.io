import React, { useState } from 'react';
import styled from 'styled-components/macro';
import { AiFillCheckCircle } from 'react-icons/ai';
import Star from './Star';

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

const CreateTasksForm = ({ addTaskInStorage }) => {
    const [text, setText] = useState('');
    const [isImportant, setIsImportant] = useState(false);

    return (
        <StyledForm>
            <StyledInput
                type='text'
                value={text}
                onChange={(e) => {
                    setText(e.target.value);
                }}
                placeholder='Какие планы?'
            />
            <Star setValue={setIsImportant} value={isImportant} />

            <StyledButton
                onClick={(e) => {
                    e.preventDefault();
                    addTaskInStorage({ text, isImportant });

                    setText('');
                    setIsImportant(false);
                }}
                disabled={!text}
            >
                <AiFillCheckCircle
                    size={20}
                    fill={
                        text
                            ? 'rgba(255, 255, 255)'
                            : 'rgba(255, 255, 255, 0.6)'
                    }
                />
            </StyledButton>
        </StyledForm>
    );
};

export default CreateTasksForm;
