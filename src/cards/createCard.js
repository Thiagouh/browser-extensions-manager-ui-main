import { DOM, SELECTORS } from "../utils/dom.js";
import { animateAndRemove } from "../animations/animate.js";
import { currentFilter } from "../filters/filter.js";

export let extensionsData = [];

export function initCards() {
  fetchExtensions();
  DOM.extensionsContainer.addEventListener("change", onToggleActive);
  DOM.extensionsContainer.addEventListener("click", onRemove);
}

async function fetchExtensions() {
  try {
    const res = await fetch("./src/data.json");
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    extensionsData = await res.json();
    renderFilteredCards(currentFilter);
  } catch (err) {
    console.error("Error fetching extensions", err);
  }
}

export function renderFilteredCards() {
  DOM.extensionsContainer.innerHTML = "";

  const listToShow = extensionsData.filter((item) => {
    if (currentFilter === "all") return true;
    if (currentFilter === "active") return item.isActive;
    if (currentFilter === "inactive") return !item.isActive;
  });

  listToShow.forEach((item, idx) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.id = idx;
    card.innerHTML = `
      <div class="card-content">
        <img 
          class="grid-logo"
          src="${item.logo}"
          alt="${item.name} logo"
        />
        <div class="card-content__text">
          <h2>${item.name}</h2>
          <p>${item.description}</p>
        </div>
      </div>
      <div class="card-buttons">
        <button class="btn-remove">Remove</button>
        <label class="switch">
          <input type="checkbox" ${item.isActive ? "checked" : ""} />
          <span class="slider"></span>
        </label>
      </div>`;
    DOM.extensionsContainer.appendChild(card);
  });
}

function onToggleActive(e) {
  const input = e.target;
  if (!input.matches(SELECTORS.SWITCH_INPUT)) return;
  const card = input.closest(SELECTORS.CARD);
  const id = Number(card.dataset.id);

  extensionsData[id].isActive = input.checked;
  const shouldStay =
    currentFilter === "all"
      ? true
      : currentFilter === "active"
      ? input.checked
      : /* inactive */ !input.checked;

  if (!shouldStay) {
    animateAndRemove(card, input.checked ? "right" : "left");
  }
}

function onRemove(e) {
  if (!e.target.matches(SELECTORS.BTN_REMOVE)) return;
  const card = e.target.closest(SELECTORS.CARD);
  const id = Number(card.dataset.id);

  extensionsData.splice(id, 1);
  renderFilteredCards();
}
