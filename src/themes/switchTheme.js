import { DOM } from "../utils/dom.js";

export function initTheme() {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const initial =
    localStorage.getItem("theme") || (prefersDark ? "dark" : "light");
  applyTheme(initial);

  DOM.themeToggle.addEventListener("click", () => {
    const newTheme =
      document.documentElement.getAttribute("data-theme") === "dark"
        ? "light"
        : "dark";
    applyTheme(newTheme);
  });
}

function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
  DOM.icon.src =
    theme === "dark"
      ? "../../../assets/images/icon-sun.svg"
      : "../../../assets/images/icon-moon.svg";
  DOM.themeToggle.setAttribute(
    "aria-label",
    theme === "dark" ? "toggle to light theme" : "toggle to dark theme"
  );
}
