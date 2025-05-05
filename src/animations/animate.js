export function animateAndRemove(card, direction) {
  const className = direction === "left" ? "slide-left" : "slide-right";
  card.classList.add(className);
  card.addEventListener("animationend", () => card.remove(), { once: true });
}
