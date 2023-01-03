import { transformDateToString } from "./transformDateToString";

export const checkSizeLocalStorage = () => {
    let _lsTotal = 0,
        _xLen,
        _x;
    for (_x in localStorage) {
        if (!localStorage.hasOwnProperty(_x)) {
            continue;
        }
        _xLen = (localStorage[_x].length + _x.length) * 2;
        _lsTotal += _xLen;
    }
    console.log("Всего занято = " + (_lsTotal / 1024).toFixed(2) + " KB");
    // console.table(loadLocalStorageDB()));
    return _lsTotal / 1024;
};

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
