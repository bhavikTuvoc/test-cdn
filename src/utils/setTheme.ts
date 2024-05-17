// Assuming the theme object looks like this:
type theme = { primaryColor: string; secondaryColor: string };

export function setThemeColors(theme: theme) {
  // Access the root element (typically <html>)
  const root = document.documentElement;

  // Set CSS variables
  root.style.setProperty("--primary-color", theme.primaryColor);
  root.style.setProperty("--secondary-color", theme.secondaryColor);
}

export function applyStoredTheme() {
  const primaryColor = localStorage.getItem("primaryColor") || "#fff";
  const secondaryColor = localStorage.getItem("secondaryColor") || "#fff";

  const theme: theme = { primaryColor, secondaryColor };
  return theme;
}
