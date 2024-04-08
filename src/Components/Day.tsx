import { observer } from "mobx-react-lite";
import { ScreenStore } from "../store/screen";
import { MonthDay } from "./MonthDay";
import { WeekDay } from "./WeekDay";

type DayType = { date: Date | "other"; startColumn?: number };

export const Day = observer(({ date, startColumn }: DayType) => {
  return ScreenStore.isMonth ? (
    <MonthDay date={date} startColumn={startColumn} />
  ) : (
    <WeekDay date={date} />
  );
});
