import { PaletteType } from "../../store/colorTheme";

export const LSSavePalette = (palette: PaletteType) => {
  localStorage.setItem("colorsTheme", JSON.stringify(palette));
};

export const LSGetPalette = () => {
  return JSON.parse(localStorage.getItem("colorsTheme") || "null");
};

export const LSRemovePalette = () => {
  return localStorage.removeItem("colorsTheme");
};
