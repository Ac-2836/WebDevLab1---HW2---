import { playSound } from "./audio-engine.js";
import {
  record,
  startRecording,
  stopRecording,
} from "./beat-recorder.js";

let recording = false;

window.addEventListener("keydown", (e) => {
  if (e.repeat) {
    return;
  }

  if (e.key === "Escape") {
    if (recording) {
      recording = false;
      stopRecording();
    } else {
      recording = true;
      startRecording();
    }

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
  playSound(pad.dataset.sound);
  pad.classList.add("active");
  setTimeout(() => pad.classList.remove("active"), 100);
});
