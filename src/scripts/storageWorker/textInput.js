import { transformDateToString } from "../transformDateToString";

const nameInput = (date) => `input-${transformDateToString(date)}`;

export const setStorageInputText = (inputText, date) => {
    if (inputText.length > 0) {
        localStorage.setItem(nameInput(date), JSON.stringify(inputText));
    } else {
        localStorage.removeItem(nameInput(date), JSON.stringify(inputText));
    }
};

export const getStorageInputText = (date) => {
    return JSON.parse(localStorage.getItem(nameInput(date))) || "";
};
