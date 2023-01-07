import { transformDateToString } from "../transformDateToString";

const nameIsImportant = (date) => `isImportant-${transformDateToString(date)}`;

export const setStorageIsImportant = (isImportant, date) => {
    if (isImportant) {
        localStorage.setItem(
            nameIsImportant(date),
            JSON.stringify(isImportant)
        );
    } else {
        localStorage.removeItem(
            nameIsImportant(date),
            JSON.stringify(isImportant)
        );
    }
};

export const getStorageIsImportant = (date) => {
    return JSON.parse(localStorage.getItem(nameIsImportant(date))) || false;
};
