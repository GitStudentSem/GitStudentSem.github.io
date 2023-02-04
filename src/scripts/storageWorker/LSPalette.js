export const LSSavePalette = (palette) => {
  localStorage.setItem("colorsTheme", JSON.stringify(palette));
};

export const LSGetPalette = () => {
  return JSON.parse(localStorage.getItem("colorsTheme"));
};

export const LSRemovePalette = () => {
  return localStorage.removeItem("colorsTheme");
};
