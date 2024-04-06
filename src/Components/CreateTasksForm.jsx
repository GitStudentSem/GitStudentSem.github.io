import React, { useState, useEffect } from "react";
import styled from "styled-components/macro";
import { AiFillCheckCircle } from "react-icons/ai";
import Star from "./Star";
import {
  setStorageInputText,
  getStorageInputText,
} from "../scripts/storageWorker/textInput";
import {
  setStorageIsImportant,
  getStorageIsImportant,
} from "../scripts/storageWorker/isImportantInput";
import axios from "../axios";
import { observer } from "mobx-react-lite";
import user from "../store/user";
import { setStorageTasksList } from "../scripts/storageWorker/tasks";

const StyledForm = styled.form`
  display: flex;
  margin-bottom: 5px;
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

const CreateTasksForm = observer(({ date, setTasksOnDay }) => {
  const [text, setText] = useState("");
  const [isImportant, setIsImportant] = useState(false);

  useEffect(() => {
    setText(getStorageInputText(date));
    setIsImportant(getStorageIsImportant(date));
  }, [date]);

  const changeIsImportant = () => {
    setIsImportant(!isImportant);
    setStorageIsImportant(!isImportant, date);
  };

  const changeText = (value) => {
    setText(value);
    setStorageInputText(value, date);
  };
  const addTask = async (task) => {
    if (user.isAuth) {
      await axios.post("/tasks", {
        text,
        isImportant,
        date: date.toString(),
      });
      setTasksOnDay((prev) => {
        return [...prev, task];
      });
    } else {
      setTasksOnDay((prev) => {
        console.log("first");
        setStorageTasksList([...prev, task], date);
        return [...prev, task];
      });
    }
  };

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
        onClick={async (e) => {
          e.preventDefault();
          addTask({ text, isImportant });

          changeText("");
          setIsImportant(false);
        }}
        disabled={text.length === 0}
        type='submit'
      >
        <AiFillCheckCircle
          size={20}
          fill={text ? "rgba(255, 255, 255)" : "rgba(255, 255, 255, 0.6)"}
        />
      </StyledButton>
    </StyledForm>
  );
});

export default CreateTasksForm;
