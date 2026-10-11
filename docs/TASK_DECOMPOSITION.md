# TASK_DECOMPOSITION.md - Drum Kit Engine (Homework 2)

This file defines the Work Breakdown Structure (WBS) and the atomic commit rules for Homework 2. Every sub-task is defined before any AI prompt is issued for it, and each sub-task maps to exactly one commit.

Assumption: 9 pads mapped to keys a s d f g h j k l; sound files stored in sounds/.

---

## 1. Work Breakdown Structure (WBS)

| ID | Level | Scope | Contract | Commit message | Deliverable |
| --- | --- | --- | --- | --- | --- |
| DOC | Big step | Spec and WBS for Homework 2 | Data contracts for data-key, data-sound, the playSound signature and the FIFO entry shape, plus this WBS, are written before any AI call. | docs(spec): define drum kit contracts and WBS table | Create TASK_DECOMPOSITION.md and project-rules.md |
| S1 | Big step | Contract-first HTML | Data attributes are defined in HTML before any JavaScript exists. | feat(html): drum pad data contract | index.html, sounds/*.wav |
| H2-01 | Small step | Drum pad data contract | Nine elements with class drum-pad. Each has data-key (one lowercase letter) and data-sound (relative path sounds/name.wav). No script tag, no onclick handler, no CSS in this commit. | feat(html): drum pad data contract | Create index.html; add sounds/*.wav (9 files) |
| S2 | Big step | Polyphonic audio engine | Audio playback is isolated from the DOM and allows overlapping sounds. | feat(js): polyphonic audio engine | audio-engine.js |
| H2-02 | Small step | Audio engine decoupled from UI triggers | Export function playSound(src). Each call creates a new Audio(src) so that sounds overlap. Return the promise from play() and catch rejection. The module must not read document, window or dataset, and must not register listeners. No side effects on import. | feat(js): polyphonic audio engine | Create audio-engine.js |
| S3 | Big step | Keyboard control with repeat throttling | A key press triggers the matching pad. Holding a key does not retrigger the sound. | feat(js): keydown listener with repeat throttling | main.js, index.html |
| H2-03 | Small step | Keydown listener with repeat throttling | Attach a keydown listener to window. Return early when e.repeat is true. Convert e.key to lowercase and query .drum-pad[data-key="..."]. Return if no pad is found. Otherwise call playSound(pad.dataset.sound), add class active to the pad, and remove it after 100 ms. audio-engine.js is not modified in this commit. | feat(js): keydown listener with repeat throttling | Create main.js; modify index.html (add script type="module") |
| S4 | Big step | FIFO beat recorder | Key presses are recorded in order with timestamps, and memory use is bounded. | feat(js): FIFO beat recorder | beat-recorder.js, main.js |
| H2-04 | Small step | FIFO beat recorder with timestamped queue | Use const queue = []. Add entries with push and remove from the front with shift. Entry shape is { key: string, time: number }, where time is performance.now() minus the recording start time. MAX_EVENTS = 1000; when the limit is exceeded, shift() removes the oldest entry. Expose start(), stop(), record(key) and getEvents(). | feat(js): FIFO beat recorder | Create beat-recorder.js; modify main.js (call record() on keydown while recording) |

---

## 2. Commit Rule

Each sub-task maps to exactly one atomic commit, in this order:

| # | Commit message | Task | Files |
| --- | --- | --- | --- |
| 1 | docs(spec): define drum kit contracts and WBS table | DOC | TASK_DECOMPOSITION.md, project-rules.md |
| 2 | feat(html): drum pad data contract | H2-01 | index.html, sounds/*.wav |
| 3 | feat(js): polyphonic audio engine | H2-02 | audio-engine.js |
| 4 | feat(js): keydown listener with repeat throttling | H2-03 | main.js, index.html |
| 5 | feat(js): FIFO beat recorder | H2-04 | beat-recorder.js, main.js |

Commit 2 contains no .js file. Commit 3 contains no DOM access. Commit 4 does not modify audio-engine.js. No commit may add 100 or more lines across multiple files without a matching WBS entry.
