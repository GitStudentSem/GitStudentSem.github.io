export const generateColor = () => {
    // setTheArray((oldArray) => [...oldArray, newElement]);
    const getRandomColor = () => {
        let letters = "0123456789ABCD";
        let color = "#";
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
