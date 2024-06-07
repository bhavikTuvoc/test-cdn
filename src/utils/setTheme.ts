// Assuming the theme object looks like this:
type theme = { prim_color: string; sec_color: string; tert_color: string };
function hexToRGBA(hex: string, opacity: number) {
  let r = parseInt(hex.slice(1, 3), 16);
  let g = parseInt(hex.slice(3, 5), 16);
  let b = parseInt(hex.slice(5, 7), 16);

  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}
export function setThemeColors(theme: theme) {
  // Access the root element (typically <html>)
  const root = document.documentElement;

  // localStorage.setItem("primaryColor", theme.prim_color);
  // localStorage.setItem("textSecondry", theme.sec_color);
  // localStorage.setItem("textNormal", theme.tert_color);

  // Set CSS variables
  root.style.setProperty("--primarColor", theme.prim_color);
  const primaryColorHover = hexToRGBA(theme.sec_color, 0.3);
  root.style.setProperty("--primaryColorHover", primaryColorHover);
  root.style.setProperty("--textPrimary", theme.prim_color);
  root.style.setProperty("--textSecondry", theme.sec_color);
  const textSecondryLight = hexToRGBA(theme.sec_color, 0.29);
  root.style.setProperty("--textSecondryLight", textSecondryLight);
  root.style.setProperty("--textNormal", theme.tert_color);
  root.style.setProperty("--primaryBtnBg", theme.prim_color);
  const primaryColorHoverRGBA = hexToRGBA(theme.sec_color, 0.2);
  root.style.setProperty("--btnActiveColorBg", primaryColorHoverRGBA);
  const indicatorShadow = hexToRGBA(theme.sec_color, 0.29);
  root.style.setProperty("--indicatorShadow", indicatorShadow);
}

export function applyStoredTheme() {
  const prim_color: string =
    localStorage.getItem("primaryColor") || "rgb(111, 55, 152)";
  const sec_color = localStorage.getItem("textSecondry") || "#7f56d9";
  const tert_color = localStorage.getItem("textNormal") || "#344054";

  const theme: theme = { prim_color, sec_color, tert_color };
  return theme;
}
