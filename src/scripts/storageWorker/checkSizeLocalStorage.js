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
