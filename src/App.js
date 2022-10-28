import Main from './Components/Main';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components/macro';
import { Routes, Route } from 'react-router-dom';
import AccountPage from './Components/AccountPage';
// import PrivateRoute from './Components/PrivateRoute';
import NotFoundPage from './Components/NotFoundPage';

const StyledApp = styled.div`
    background: #fff;
    padding: 5px;
    height: 100vh;
    background: radial-gradient(
        circle,
        ${(props) => props.from} 10%,
        ${(props) => props.to} 100%
    );
`;

function App() {
    const [date, setDate] = useState(new Date());
    const [stringData, setStringData] = useState(
        // JSON.stringify(newLocalStorageDB)
        JSON.stringify(localStorage.getItem('DB') || '[]')
    );

    const updateLocalStorageDB = (newLocalStorageDB) => {
        if (!newLocalStorageDB) return;
        setStringData(JSON.stringify(newLocalStorageDB));
        localStorage.setItem('DB', JSON.stringify(newLocalStorageDB));
        // updateLocalStorageDB(newLocalStarageDB);
    };

    const loadLocalStorageDB = () => {
        return JSON.parse(localStorage.getItem('DB') || '[]');
    };

    const generateColor = () => {
        // setTheArray((oldArray) => [...oldArray, newElement]);
        const getRandomColor = () => {
            let letters = '0123456789ABCD';
            let color = '#';
            for (let i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * letters.length)];
            }
            return color;
        };

        return {
            from: getRandomColor(),
            to: getRandomColor(),
        };
    };

    const [colorsTheme, setColorsTheme] = useState(
        localStorage.getItem('colorsTheme') &&
            localStorage.getItem('colorsTheme').length > 0
            ? JSON.parse(localStorage.getItem('colorsTheme'))
            : generateColor()
    );

    const generateBD = (daysAgo) => {
        let dateDiapasone = [];

        for (let i = 0; i < daysAgo; ++i) {
            dateDiapasone.push({
                date: new Date(
                    date.getFullYear(),
                    date.getMonth(),
                    date.getDate() + i
                ),
                tasksOnDay: [
                    {
                        text: 'false',
                        isImportant: false,
                    },
                ],
            });
        }

        console.log('generated BD', dateDiapasone);
        updateLocalStorageDB(dateDiapasone);
    };

    const checkSizeLocalStorage = () => {
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
        console.log('Всего занято = ' + (_lsTotal / 1024).toFixed(2) + ' KB');
        // console.table(loadLocalStorageDB()));
        return _lsTotal / 1024;
    };

    // генерация бд
    useEffect(() => {
        if (
            !!localStorage.getItem('DB')
            // Array.isArray(loadLocalStorageDB())
        ) {
            updateLocalStorageDB(loadLocalStorageDB());
            setStringData(JSON.stringify(loadLocalStorageDB()));
            return;
        } else {
            generateBD(60);
        }

        checkSizeLocalStorage();
    }, []);

    useEffect(() => {
        console.log('updated DB');
        updateLocalStorageDB(loadLocalStorageDB());
    }, [stringData]);

    // useEffect(() => {});

    let weekDays = [
        'Воскресенье',
        'Понедельник',
        'Вторник',
        'Среда',
        'Четверг',
        'Пятница',
        'Суббота',
    ];

    let monthNames = [
        'Январь',
        'Февраль',
        'Март',
        'Апрель',
        'Май',
        'Июнь',
        'Июль',
        'Август',
        'Сентябрь',
        'Октябрь',
        'Ноябрь',
        'Декабрь',
    ];

    return (
        <StyledApp from={colorsTheme.from} to={colorsTheme.to}>
            <Routes>
                <Route
                    path='/'
                    element={
                        <Main
                            monthNames={monthNames}
                            date={date}
                            weekDays={weekDays}
                            setDate={setDate}
                            updateLocalStorageDB={updateLocalStorageDB}
                            loadLocalStorageDB={loadLocalStorageDB}
                        />
                    }
                />
                <Route
                    path='/account'
                    element={
                        <AccountPage
                            setColorsTheme={setColorsTheme}
                            colorsTheme={colorsTheme}
                            generateColor={generateColor}
                        />
                    }
                />
                <Route path='*' element={<NotFoundPage />} />
                {/* <Route path='/login' element={<Login />} /> */}
            </Routes>
        </StyledApp>
    );
}

export default App;
