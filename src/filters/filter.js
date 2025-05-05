import { DOM } from "../utils/dom.js";
import { renderFilteredCards } from "../cards/createCard.js";

export let currentFilter = "all";

export function initFilters() {
  ["all", "active", "inactive"].forEach((filter) => {
    DOM[`btn${capitalize(filter)}`].addEventListener("click", () => {
      currentFilter = filter;
      renderFilteredCards();
    });
  });
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
