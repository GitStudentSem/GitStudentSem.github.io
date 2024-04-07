export const transformDateToString = (date: Date | "other") => {
  if (date === "other") return "other";

  return date.toString().slice(4, 15);
};
