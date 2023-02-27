import { makeAutoObservable } from "mobx";

class ColorTheme {
  palette = { from: "", to: "" }; //colorsTheme
  isNeedSaveColor = false;

  constructor() {
    makeAutoObservable(this);
  }
  generateColor() {
    const getRandomColor = () => {
      let letters = "0123456789ABCD";
      let color = "#";
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * letters.length)];
      }
      return color;
    };
    this.palette = { from: getRandomColor(), to: getRandomColor() };
  }
  setPalette(palette) {
    if (palette.from && palette.to) {
      this.palette = palette;
    } else if (palette.from && !palette.to) {
      this.palette.from = palette.from;
    } else if (!palette.from && palette.to) {
      this.palette.to = palette.to;
    }
  }
  setIsNeedSaveColor(isNeed) {
    this.isNeedSaveColor = isNeed;
  }
}

export default new ColorTheme();
