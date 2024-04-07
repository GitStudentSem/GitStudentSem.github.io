import { makeAutoObservable } from "mobx";

class Screen {
  isMonth: boolean;
  date: Date;

  constructor() {
    this.isMonth = false;
    this.date = new Date();

    makeAutoObservable(this);
  }

  setIsMonth(isMonth: boolean) {
    this.isMonth = isMonth;
  }

  setDate(date: Date) {
    this.date = date;
  }
}

export const ScreenStore = new Screen();
