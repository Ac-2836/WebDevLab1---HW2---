import { playSound } from "./audio-engine.js";
import {
  isRecording,
  record,
  start,
  stop,
} from "./beat-recorder.js";

const recordButton = document.querySelector("#record-btn");

function triggerPad(pad) {
  playSound(pad.dataset.sound);
  pad.classList.add("active");
  setTimeout(() => pad.classList.remove("active"), 100);
}

function toggleRecording() {
  if (isRecording()) {
    stop();
  } else {
    start();
  }

  recordButton.textContent = isRecording() ? "Recording" : "Record";
}

window.addEventListener("keydown", (e) => {
  if (e.repeat) {
    return;
  }

  if (e.key === "Escape") {
    toggleRecording();
    return;
  }

  const key = e.key.toLowerCase();
  const pad = Array.from(document.querySelectorAll(".drum-pad")).find(
    (element) => element.dataset.key === key,
  );

  if (!pad) {
    return;
  }

  record(key);
  if (!isRecording()) {
    recordButton.textContent = "Record";
  }

  triggerPad(pad);
});

document.querySelectorAll(".drum-pad").forEach((pad) => {
  pad.addEventListener("click", () => triggerPad(pad));
});

recordButton.addEventListener("click", toggleRecording);
