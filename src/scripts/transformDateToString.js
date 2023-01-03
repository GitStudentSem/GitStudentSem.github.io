export const transformDateToString = (date) => {
    if (date === "other") {
        return "other";
    }
    return date.toString().slice(4, 15);
};
