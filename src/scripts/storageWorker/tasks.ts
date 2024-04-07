import { ITask } from "../../Components/Main";
import { transformDateToString } from "../transformDateToString";

const nameTasks = (date: Date | "other") =>
  `tasks-${transformDateToString(date)}`;
export const setStorageTasksList = (list: ITask[], date: Date | "other") => {
  if (list.length > 0) {
    localStorage.setItem(nameTasks(date), JSON.stringify(list));
  } else {
    localStorage.removeItem(nameTasks(date));
  }
};

export const getStorageTasksList = (date: Date | "other") => {
  return JSON.parse(localStorage.getItem(nameTasks(date)) || "[]");
};
