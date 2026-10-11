# Project Rules - Drum Kit Engine (Homework 2)

This file has two parts. Part A applies to every file in the repository. Part B applies to Homework 2 only. Read both before you change any code, together with TASK_DECOMPOSITION.md.

---

## Part A. General rules

Each rule lists the lecture slides it comes from.

### A1. Technology

- Use plain HTML5, modern CSS and ES6+ JavaScript. (Slides 6, 22)
- Do not use jQuery, Bootstrap, Tailwind, UI frameworks or external script CDNs. (Slide 6)
- Open the project through Live Server at http://localhost:5500. Never open files with file:///, because CORS, Web Audio and ES Modules fail. (Slide 3)
- Use the browser baseline for the target users. Do not depend on a feature that needs a polyfill. (Slide 12)

### A2. Code style

- Use const by default. Use let only when the value is reassigned. Never use var. (Slides 6, 22)
- Use querySelector and querySelectorAll to select elements. (Slide 22)
- Use Prettier to format code and ESLint to check it. Both are the project's code convention. (Slide 3 lists both as the tooling standard)
- Keep the configuration files .prettierrc and eslint.config.js in the repository root, so every contributor uses the same rules.
- Run npm run format and npm run lint before each commit.
- Keep indentation clean. Do not leave dead code or unused imports. (Slide 21)
- Do not add dependencies that the project does not need. (Slide 21)

### A3. HTML

- Use native semantic elements before generic containers such as div. (Slides 6, 7)
- Each page has one h1. Heading levels never skip. (Slide 8)
- Every form input has a visible label connected with for and id. Placeholders do not replace labels. (Slide 8)
- Every img has alt text, width and height. (Slide 9)
- Every page starts with lang="en", a UTF-8 charset and a viewport meta tag. (Slide 4)

### A4. CSS

- Put colours in CSS variables declared in :root. Do not write hex codes inside rules. (Slide 13)
- Use Flexbox for one-dimensional layouts and Grid for two-dimensional layouts. (Slides 16, 17)
- Use gap, not margin overrides, to space items in a flex or grid container. (Slide 16)
- Text contrast must reach at least 4.5:1 for normal text. (Slide 13, WCAG 2.2 AA)

### A5. Security

- Never place unescaped user input into the page with innerHTML. Use textContent. (Slides 6, 21)

### A6. Keyboard events

- Use the keydown event and read event.key. Do not use keyCode or keypress, which are obsolete. (Slide 23)

### A7. Layout and accessibility checks

- Check every layout at a 375px width first, then at desktop width. (Slides 6, 13, 21)
- The page must not scroll sideways at 375px. (Slide 13)
- The whole page must work with Tab and Enter. Every focused element must show a visible focus style. (Slides 13, 21)

### A8. Performance budgets

- Largest Contentful Paint at or below 2.5 s. (Slide 9)
- Interaction to Next Paint at or below 200 ms. (Slide 9)
- Cumulative Layout Shift at or below 0.1. (Slide 9)

### A9. Documentation sources

- Check features on MDN Web Docs, web.dev, or the W3C and WHATWG specifications. Do not follow outdated blog posts. (Slide 12)

### A10. Working with AI

- Read this file and TASK_DECOMPOSITION.md before the AI proposes any code change. (Slide 6)
- Decompose the work into sub-tasks before you write any prompt. (Slides 5, 20)
- One prompt covers one sub-task. A monolithic prompt for the whole assignment is not allowed. (Slides 5, 24)
- Read the full diff before you commit. Do not commit code you do not understand. (Slides 2, 3, 20)
- The AI writes boilerplate. You own the architecture and verify that the code is correct. (Slide 3)
- Record each mistake the AI makes: the commit, what went wrong, and how you found it. (Slide 25)

### A11. Git

- Run git init at the start of every project. (Slide 3)
- Each sub-task is one atomic commit. (Slides 5, 20)
- Use the type(scope): message format, for example feat(css): responsive grid. (Slide 20)
- Commit messages come from TASK_DECOMPOSITION.md.

---

## Part B. Homework 2 rules

### B1. Architecture

- The audio engine (audio-engine.js) must be decoupled from the UI. It must not read the DOM, read data attributes, or register event listeners. (Slide 24)
- The key bindings and sound paths are defined in index.html only, through data-key and data-sound. (Slides 23, 24)
- Changing a key binding or a sound file must require an HTML change only. No JavaScript change should be needed. (Slide 24, live defense)

### B2. HTML contract

- Commit the HTML data contract before writing any JavaScript. (Slide 24, step 1)
- Each pad is an element with class drum-pad. It has a data-key attribute (the key) and a data-sound attribute (the sound file path). (Slides 23, 24)
- The HTML file contains no script logic and no inline event handlers.

### B3. Audio engine

- Implement polyphonic playback. Each sound plays on its own Audio object, so sounds can overlap. (Slide 24, step 2)
- The engine exposes one function, playSound(src), and nothing else.

### B4. Keyboard input

- Listen for the keydown event on the window. (Slides 23, 24, step 3)
- Ignore repeated key events (event.repeat === true). Holding a key plays the sound once. (Slides 23, 24)
- Ignore keys that have no matching pad, without throwing an error.

### B5. Beat recorder

- Store recorded key presses in a first-in, first-out (FIFO) queue. (Slide 24, step 4)
- Each entry records the key and the timestamp of the press. (Slide 24, step 4)

### B6. Development process

- Follow the commit order in TASK_DECOMPOSITION.md. Each step is one commit. (Slide 24)
- Send one sub-task per AI prompt. (Slide 24, penalty for monolithic code)
