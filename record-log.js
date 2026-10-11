export function renderLatest(events, playHandler) {
  const recordLog = document.querySelector("#record-log");
  recordLog.replaceChildren();

  if (events.length === 0) {
    recordLog.textContent = "No recordings yet.";
    return;
  }

  const row = document.createElement("div");
  const duration = events[events.length - 1].time / 1000;
  const description = document.createElement("p");
  description.textContent = `Recording: ${events.length} events, ${duration.toFixed(2)} seconds`;

  const details = document.createElement("details");
  const summary = document.createElement("summary");
  summary.textContent = "Events";

  const eventList = document.createElement("ol");
  for (const event of events) {
    const item = document.createElement("li");
    item.textContent = `${event.key}: ${event.time} ms`;
    eventList.append(item);
  }

  details.append(summary, eventList);

  const playButton = document.createElement("button");
  playButton.type = "button";
  playButton.textContent = "Play";
  playButton.addEventListener("click", () => playHandler(events));

  row.append(description, details, playButton);
  recordLog.replaceChildren(row);
}
