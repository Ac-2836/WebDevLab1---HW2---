const queue = [];

export const MAX_EVENTS = 1000;

let recording = false;
let startTime = 0;

export function startRecording() {
  recording = true;
  queue.length = 0;
  startTime = performance.now();
}

export function stopRecording() {
  recording = false;
}

export function record(key) {
  if (!recording) {
    return;
  }

  queue.push({ key, time: performance.now() - startTime });

  if (queue.length > MAX_EVENTS) {
    queue.shift();
  }
}

export function getEvents() {
  return [...queue];
}
