import { transformDateToString } from "../transformDateToString";

const nameInput = (date: Date | "other") =>
  `input-${transformDateToString(date)}`;

export const setStorageInputText = (
  inputText: string,
  date: Date | "other"
) => {
  if (inputText.length > 0) {
    localStorage.setItem(nameInput(date), JSON.stringify(inputText));
  } else {
    localStorage.removeItem(nameInput(date));
  }
};

export const getStorageInputText = (date: Date | "other") => {
  return JSON.parse(localStorage.getItem(nameInput(date)) || "");
};
