import { makeAutoObservable } from "mobx";

export type PaletteType = {
  from: string;
  to: string;
};
class ColorTheme {
  palette: PaletteType;
  isNeedSaveColor: boolean;

  constructor() {
    this.palette = { from: "", to: "" };
    this.isNeedSaveColor = false;
    makeAutoObservable(this);
  }
  generateColor() {
    const getRandomColor = () => {
      const letters = "0123456789ABCD";
      let color = "#";
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * letters.length)];
      }
      return color;
    };
    this.palette = { from: getRandomColor(), to: getRandomColor() };
  }

  setPalette(palette: PaletteType) {
    if (palette.from && palette.to) {
      this.palette = palette;
    } else if (palette.from && !palette.to) {
      this.palette.from = palette.from;
    } else if (!palette.from && palette.to) {
      this.palette.to = palette.to;
    }
  }
  setIsNeedSaveColor(isNeedSaveColor: boolean) {
    this.isNeedSaveColor = isNeedSaveColor;
  }
}

export default new ColorTheme();
