import { makeAutoObservable } from "mobx";

class Screen {
  isMonth: boolean;
  // date: Date;

  constructor() {
    this.isMonth = false;
    // this.date = new Date();

    makeAutoObservable(this);
  }

  setIsMonth(isMonth: boolean) {
    this.isMonth = isMonth;
  }
}

export const ScreenStore = new Screen();
