import { playSound } from "./audio-engine.js";
import { playRecording } from "./playback.js";
import { renderLatest } from "./record-log.js";
import {
  getEvents,
  isRecording,
  record,
  start,
  stop,
} from "./beat-recorder.js";

const recordButton = document.querySelector("#record-btn");
const padSounds = new Map(
  Array.from(document.querySelectorAll(".drum-pad"), (pad) => [
    pad.dataset.key,
    pad.dataset.sound,
  ]),
);
let stopPlayback;

function lookupSound(key) {
  return padSounds.get(key);
}

function playRecordedEvents(events) {
  stopPlayback?.();
  stopPlayback = playRecording(events, lookupSound);
}

function triggerPad(pad) {
  playSound(pad.dataset.sound);
  pad.classList.add("active");
  setTimeout(() => pad.classList.remove("active"), 100);
}

function toggleRecording() {
  if (isRecording()) {
    stop();
    renderLatest(getEvents(), playRecordedEvents);
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
    renderLatest(getEvents(), playRecordedEvents);
  }

  triggerPad(pad);
});

document.querySelectorAll(".drum-pad").forEach((pad) => {
  pad.addEventListener("click", () => triggerPad(pad));
});

recordButton.addEventListener("click", toggleRecording);
