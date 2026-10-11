import { playSound } from "./audio-engine.js";
import {
  record,
  startRecording,
  stopRecording,
} from "./beat-recorder.js";

let recording = false;

function triggerPad(pad) {
  playSound(pad.dataset.sound);
  pad.classList.add("active");
  setTimeout(() => pad.classList.remove("active"), 100);
}

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
  triggerPad(pad);
});

document.querySelectorAll(".drum-pad").forEach((pad) => {
  pad.addEventListener("click", () => triggerPad(pad));
});
