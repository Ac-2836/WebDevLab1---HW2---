import { playSound } from "./audio-engine.js";

export function playRecording(events, lookupSound) {
  const timers = [];

  for (const event of events) {
    const timer = setTimeout(() => {
      const src = lookupSound(event.key);

      if (src !== undefined) {
        playSound(src);
      }
    }, event.time);

    timers.push(timer);
  }

  return function stop() {
    for (const timer of timers) {
      clearTimeout(timer);
    }
  };
}
