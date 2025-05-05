import { initCards } from "./cards/createCard.js";
import { initFilters } from "./filters/filter.js";
import { initTheme } from "./themes/switchTheme.js";

function initApp() {
  initCards();
  initFilters();
  initTheme();
}

document.addEventListener("DOMContentLoaded", initApp);