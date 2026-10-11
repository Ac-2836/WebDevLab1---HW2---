import { playSound } from "./audio-engine.js";

window.addEventListener("keydown", (e) => {
  if (e.repeat) {
    return;
  }

  const key = e.key.toLowerCase();
  const pad = Array.from(document.querySelectorAll(".drum-pad")).find(
    (element) => element.dataset.key === key,
  );

  if (!pad) {
    return;
  }

  playSound(pad.dataset.sound);
  pad.classList.add("active");
  setTimeout(() => pad.classList.remove("active"), 100);
});
