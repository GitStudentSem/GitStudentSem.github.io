import { transformDateToString } from "../transformDateToString";

const nameIsImportant = (date: Date | "other") =>
  `isImportant-${transformDateToString(date)}`;

export const setStorageIsImportant = (
  isImportant: boolean,
  date: Date | "other"
) => {
  if (isImportant) {
    localStorage.setItem(nameIsImportant(date), JSON.stringify(isImportant));
  } else {
    localStorage.removeItem(nameIsImportant(date));
  }
};

export const getStorageIsImportant = (date: Date | "other") => {
  return JSON.parse(localStorage.getItem(nameIsImportant(date)) || "false");
};
