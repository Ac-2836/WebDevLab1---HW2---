export function playSound(src) {
  const audio = new Audio(src);
  const playPromise = audio.play();

  playPromise.catch((error) => console.warn("Audio playback failed:", error));

  return playPromise;
}
