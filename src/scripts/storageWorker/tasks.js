import { transformDateToString } from "../transformDateToString";

const nameTasks = (date) => `tasks-${transformDateToString(date)}`;
export const setStorageTasksList = (list, date) => {
    if (list.length > 0) {
        localStorage.setItem(nameTasks(date), JSON.stringify(list));
    } else {
        localStorage.removeItem(nameTasks(date), JSON.stringify(list));
    }
};

export const getStorageTasksList = (date) => {
    return JSON.parse(localStorage.getItem(nameTasks(date))) || [];
};
