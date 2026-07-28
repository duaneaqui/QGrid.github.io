# R/S QGrid Studio - Complete Project Handoff

This document is a complete knowledge-transfer note for the project located at:

`C:\Users\Acer Nitro Gaming\Desktop\R and S`

It is written so a new agent can read it before touching the repository and understand the product goal, architecture, current implementation, design direction, animation system, data import format, known history, and safe development workflow.

Last updated: 2026-07-09.

---

## 1. Project Summary

This is a browser-based "pseudo-PowerPoint" interactive medical question simulator inspired by an original PowerPoint deck and screenshot mockups. The user wanted to move beyond PowerPoint limitations and build a web app with sci-fi design, 3D/HUD-inspired transitions, animated medical body-system backgrounds, Excel import, and question/answer reveal workflows.

The app is currently a static frontend:

- `index.html`
- `styles.css`
- `app.js`
- static image assets in `assets/body-systems`
- a tiny Node static server in `tools/serve-static.mjs`

There is no build system, bundler, package.json, framework, or local dependency install required for the current app. It runs directly in the browser through the included static server.

Primary local URL:

`http://127.0.0.1:8787/`

---

## 2. Product Goal

The project is a QGrid Simulator for medical/nursing education. It should feel like a futuristic clinical training console rather than a normal quiz app.

The high-level user idea:

- Home/grid page shows 5 main process nodes:
  - Assess
  - Analyze
  - Plan
  - Implement
  - Evaluate
- Below/alongside those nodes are subcategory filters:
  - General
  - Patient Teaching
  - Medication
  - Laboratory
  - Delegation
- There is an R/S toggle:
  - `R` = Regular version of questions
  - `S` = Superlative version of questions
- Body system selector supports 12 systems:
  - Cardiovascular
  - Respiratory
  - Gastrointestinal
  - Urinary
  - Hematology
  - Infectious Diseases
  - Neurology
  - Endocrine
  - Musculoskeletal
  - Integumentary
  - Oncology
  - Gynecology
- User will import an Excel/CSV/JSON sheet containing question data.
- Clicking a process node should trigger a PowerPoint-like morph transition, then land on a question screen.
- The question screen displays:
  - left sidebar with R/S diamond, question/process number, mode, body system, subcategory, regular/superlative, progress
  - main sci-fi question panel
  - question stem
  - 4 multiple choice answers A-D
  - reveal answer button
  - previous/next buttons
  - clinical tip/rationale area after reveal
- The visual style should be futuristic, sci-fi medical, HUD, LCARS-like, cinematic, and polished.

Important: The user strongly cares about visual polish, transitions, spacing, and layout at 100% browser zoom. Many iterations were spent on clipping, overlap, timing, and visual balance.

---

## 3. Current Tech Stack

Current actual stack:

- HTML5
- CSS3
- Vanilla JavaScript
- Canvas 2D for animated background field
- Web Animations API for some UI animations
- `requestAnimationFrame` for the custom node-to-question morph transition
- SheetJS via CDN for Excel parsing:
  - `https://cdn.sheetjs.com/xlsx-0.20.3/package/dist/xlsx.full.min.js`
- Node.js only for local static serving:
  - `tools/serve-static.mjs`

No framework is currently used:

- No React
- No Vue
- No Svelte
- No Vite
- No Next.js
- No local npm dependencies
- No package.json

Potential future libraries the user mentioned as acceptable:

- anime.js
- GSAP
- Framer Motion
- Three.js

But none are currently used in the implementation.

---

## 4. Repository Map

Top-level files/folders:

```text
R and S/
  index.html
  styles.css
  app.js
  assets/
    medical-heart.png
    body-systems/
      cardiovascular.png
      respiratory.png
      gastrointestinal.png
      urinary.png
      hematology.png
      infectious-diseases.png
      neurology.png
      endocrine.png
      musculoskeletal.png
      integumentary.png
      oncology.png
      gynecology.png
  tools/
    serve-static.mjs
  work/
    many development screenshots, transition debug captures, and PPTX inspection artifacts
  .agents/
  .git/
```

Important notes:

- `work/` contains many generated screenshots and PowerPoint inspection artifacts. It is useful as visual history but not required at runtime.
- `assets/body-systems/*.png` are the actual body-system background images used at runtime.
- `assets/medical-heart.png` exists but the current app uses the `assets/body-systems` map for body-system backgrounds.
- The `.git` folder exists, but from the current shell `git status` reported "not a git repository". Do not rely on Git history unless you inspect/fix the repository metadata first.

---

## 5. How To Run Locally

Current static server:

`tools/serve-static.mjs`

It serves the current working directory at `http://127.0.0.1:8787/` and disables cache with `cache-control: no-store`.

Recommended command from PowerShell:

```powershell
$node = 'C:\Users\Acer Nitro Gaming\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe'
$script = 'C:\Users\Acer Nitro Gaming\Desktop\R and S\tools\serve-static.mjs'
Start-Process -FilePath $node -ArgumentList ('"' + $script + '"') -WorkingDirectory 'C:\Users\Acer Nitro Gaming\Desktop\R and S' -WindowStyle Hidden
```

Then open:

```text
http://127.0.0.1:8787/
```

Quick server check:

```powershell
try {
  (Invoke-WebRequest -UseBasicParsing http://127.0.0.1:8787/ -TimeoutSec 3).StatusCode
} catch {
  $_.Exception.Message
}
```

Expected result:

```text
200
```

The server port defaults to 8787 but can be changed with the `PORT` environment variable:

```powershell
$env:PORT = 8790
node tools\serve-static.mjs
```

---

## 6. Debug URLs

The app has debug URL parameters in `init()`:

- `?debug=1&view=question`
  - Opens directly in question view.
- `?debug=1&auto=assess`
  - Automatically clicks the Assess node after 300ms.
- `?debug=1&auto=analyze`
  - Automatically clicks Analyze after 300ms.
- Any process id works:
  - `assess`
  - `analyze`
  - `plan`
  - `implement`
  - `evaluate`
- `v=...` is often appended during screenshot testing as a cache/debug label. It is not used by app logic.

Examples:

```text
http://127.0.0.1:8787/?debug=1&view=question
http://127.0.0.1:8787/?debug=1&auto=analyze&v=layout-check
```

---

## 7. HTML Structure

`index.html` defines one main shell:

```html
<main class="stage-shell">
  <div class="system-bg" id="systemBg"></div>
  <div class="scan-vignette"></div>
  <canvas id="fieldCanvas" class="field-canvas"></canvas>
  <section class="deck-stage" id="deckStage">
    <div class="hud-row">...</div>
    <section id="homeView" class="home-view view is-active">...</section>
    <section id="questionView" class="question-view view">...</section>
  </section>
</main>
```

Major regions:

### `stage-shell`

Full viewport container. Contains background image, scan vignette, canvas particle field, and deck stage.

### `system-bg`

Full-screen background image controlled by CSS variable `--bg-image`, set in JS by `setSystemBackground()`.

### `scan-vignette`

Overlay used to darken/scan the background and add sci-fi screen texture.

### `fieldCanvas`

Canvas particle/network animation drawn in `drawField()`.

### `hud-row`

Top header. Contains:

- eyebrow text: `QGrid Simulator`
- body system title: `#systemTitle`
- import sheet button/file input
- body system select

### `homeView`

The first/home screen. Contains:

- `#nodeTrack`: five process buttons generated in JS
- `.category-rail`: R/S diamond toggle, horizontal rail line, category tabs

### `questionView`

The question screen. Contains:

- `.question-side`: left sidebar
- `.question-card`: main question panel

### `.question-side`

Left sidebar includes:

- `#backHome` / `.mini-logo`: diamond R/S button that returns to grid
- `.question-count`: process number display and total count
- `#sideType`: mode label
- `.meta-stack`: body system, category, variant pills with inline SVG icons
- `.side-divider`
- `.side-progress`: progress label and bar

### `.question-card`

Main panel includes:

- `.diagnostic-frame`: decorative HUD line layer
- `.card-topbar`: "CORE-ZIGMA / CLINICAL NODE" and state/simulation labels
- `.question-content`: question body
- `.progress-rail`: vertical dot rail
- `.question-flow`: case label, question stem, answer list, clinical tip
- `.card-footer`: Previous / Reveal Answer / Next

---

## 8. JavaScript Architecture

All app logic is in `app.js`.

### Constants

```js
const processes = [
  { id: "assess", number: "01", label: "Assess" },
  { id: "analyze", number: "02", label: "Analyze" },
  { id: "plan", number: "03", label: "Plan" },
  { id: "implement", number: "04", label: "Implement" },
  { id: "evaluate", number: "05", label: "Evaluate" },
];
```

Categories:

```js
const categories = ["General", "Patient Teaching", "Medication", "Laboratory", "Delegation"];
```

Systems:

```js
const systems = [
  "Cardiovascular",
  "Respiratory",
  "Gastrointestinal",
  "Urinary",
  "Hematology",
  "Infectious Diseases",
  "Neurology",
  "Endocrine",
  "Musculoskeletal",
  "Integumentary",
  "Oncology",
  "Gynecology",
];
```

Each system maps to a generated PNG background in `systemBackgrounds`.

### State

Central state object:

```js
const state = {
  variant: "R",
  system: "Cardiovascular",
  category: "Patient Teaching",
  process: "assess",
  questionIndex: 0,
  selectedAnswer: null,
  answerVisible: false,
  questions: sampleQuestions,
};
```

Meaning:

- `variant`: R or S
- `system`: current body system
- `category`: current subcategory
- `process`: one of assess/analyze/plan/implement/evaluate
- `questionIndex`: index within filtered questions
- `selectedAnswer`: numeric 0-3 or null
- `answerVisible`: whether answer state is shown
- `questions`: current loaded question array; starts as `sampleQuestions`

### DOM References

`els` object stores all important elements:

- `shell`
- `stage`
- `systemBg`
- `homeView`
- `questionView`
- `nodeTrack`
- `categoryTabs`
- `variantToggle`
- `variantLabel`
- `miniVariant`
- `systemSelect`
- `systemTitle`
- `sheetInput`
- `backHome`
- `sideNumber`
- `sideTotal`
- `sideType`
- `sideSystem`
- `sideCategory`
- `sideVariant`
- `progressText`
- `progressFill`
- `cardMode`
- `questionCard`
- `caseLabel`
- `questionStem`
- `answerList`
- `clinicalTip`
- `clinicalTipText`
- `revealAnswer`
- `nextQuestion`
- `prevQuestion`
- `canvas`

### Initialization

`init()` runs at the bottom of `app.js`.

It:

1. Reads debug URL params.
2. Renders body system dropdown.
3. Renders process nodes.
4. Renders categories.
5. Sets background.
6. Binds events.
7. Selects first available question.
8. Shows home view.
9. Handles debug direct question view or auto morph.
10. Starts canvas background animation.

### Main Render Functions

`renderSystems()`

- Populates `#systemSelect`.

`renderNodes()`

- Populates the five process circle buttons.

`renderCategories()`

- Populates the subcategory tabs.

`renderQuestion()`

- Reads current question.
- Updates sidebar labels.
- Updates progress.
- Updates card mode and reveal button.
- Renders 4 answer options A-D.
- Shows correct/wrong states when answer is revealed.

Important: `renderQuestion()` normalizes all choices to exactly 4 items with `normalizeChoices()`. The app should always display A-D, even if imported data is missing values. Empty values become empty strings.

There is a commented-out legacy block in `renderQuestion()` containing an encoded checkmark artifact:

```js
/*
question.choices
  .map(...)
*/
```

It is harmless but messy. It can be removed later carefully. It previously resisted patch removal due to encoded characters.

### Filtering

`filteredQuestions()`

Returns questions matching:

- normalized process
- exact category
- exact system
- exact variant

`processQuestions()`

Returns questions matching:

- process
- system
- variant

`selectFirstAvailable(renderUi = true)`

Used when filters change. It tries to preserve sensible state:

1. Check exact filter match.
2. If no exact match, use first category available for same process/system/variant.
3. If still none, find any question for current system/variant and adopt its process/category.
4. Reset question index and selected answer.
5. Render nodes/categories if requested.
6. Render question.

### Views

`showView(view)`

Toggles:

- `.stage-shell.in-question`
- `.homeView.is-active`
- `.questionView.is-active`
- `aria-hidden`

`returnHome()`

Calls `showView("home")`.

### Answer Behavior

`selectAnswer(event)`

- Ignores clicks if answer is already visible.
- Stores selected answer index.
- Re-renders.
- Applies a small horizontal shake using Web Animations API.

`revealAnswer()`

- Toggles answer visibility.
- Re-renders.
- Pulses the question card.

`moveQuestion(delta)`

- Moves previous/next within filtered questions.
- Wraps around.
- Clears selected answer and answer-visible state.
- Re-renders and pulses.

### Background Field

`drawField()`

- Creates 64 random points.
- Moves points slowly.
- Draws lines between nearby points.
- Draws small dots.
- Uses `requestAnimationFrame`.
- Resizes canvas on window resize.

---

## 9. Data Import Model

The app accepts:

- `.xlsx`
- `.xls`
- `.csv`
- `.json`

The file input is:

```html
<input id="sheetInput" type="file" accept=".xlsx,.xls,.csv,.json" />
```

Excel parsing is via SheetJS CDN loaded in `index.html`:

```html
<script defer src="https://cdn.sheetjs.com/xlsx-0.20.3/package/dist/xlsx.full.min.js"></script>
```

`importQuestions(event)` handles import:

- JSON: `JSON.parse(await file.text())`
- CSV: basic local parser `parseCsv()`
- Excel: `window.XLSX.read(buffer)`, first sheet only, `sheet_to_json`

After import:

- `state.questions` becomes normalized rows
- `state.answerVisible = false`
- `selectFirstAvailable()`
- `showView("home")`
- file input is reset

### Expected Excel Columns

Original user data plan:

- Type of question
- Sub question type
- Type of body system question
- Question stem
- Correct answer
- Question category type
- Answer A
- Answer B
- Answer C
- Answer D

The app also supports aliases:

Process:

- `Type of question`
- `process`
- `type`
- `Process`

Category:

- `Sub question type`
- `category`
- `Category`

System:

- `Type of body system question`
- `system`
- `System`

Stem:

- `Question stem`
- `stem`
- `question`
- `Question`

Variant:

- `Question category type`
- `variant`
- `Version`

Choices:

- A:
  - `Answer A`
  - `A`
  - `choiceA`
  - `Multiple choice answer 1`
- B:
  - `Answer B`
  - `B`
  - `choiceB`
  - `Multiple choice answer 2`
- C:
  - `Answer C`
  - `C`
  - `choiceC`
  - `Multiple choice answer 3`
- D:
  - `Answer D`
  - `D`
  - `choiceD`
  - `Multiple choice answer 4`

Correct answer:

- `Correct answer`
- `correct`
- `answer`
- `Correct Answer`

### Correct Answer Format

`correctIndexFrom(value)` accepts:

- A-D letters
- numbers 1-4

It converts to numeric 0-3.

If invalid/missing, defaults to 0/A.

### Important Import Limitations

The CSV parser is intentionally simple:

```js
text.trim().split(/\r?\n/).map((line) => line.split(",").map((cell) => cell.trim()))
```

It does NOT correctly handle:

- quoted commas
- escaped quotes
- multiline CSV fields

For robust CSV, replace with PapaParse or use SheetJS CSV utilities.

The Excel import reads only the first sheet.

---

## 10. Sample Questions

The app ships with 5 sample Cardiovascular questions:

1. Assess / Patient Teaching / R
2. Analyze / Laboratory / R
3. Plan / General / R
4. Implement / Medication / S
5. Evaluate / Delegation / S

This lets the app demonstrate all process nodes, answer reveal, and R/S behavior before real data is imported.

Fallback question if no match:

```text
No matching question yet. Import the Excel sheet once your data is ready, or switch the process/category/version.
```

Fallback choices:

- Waiting for imported data
- Try another filter
- Use this as a preview shell
- Return to the grid

---

## 11. Transition System

The key function is:

```js
function morphToQuestion(sourceNode) { ... }
```

This creates the custom process-node-to-question transition.

User wanted a PowerPoint Morph-like transition, then evolved the request into a "HUD lock-on + iris morph" effect:

1. Click process node.
2. Lock-on HUD appears around clicked node.
3. Circular iris/gear grows from clicked node.
4. Circle covers/envelops the whole screen.
5. App switches to question page while covered.
6. Circle zooms out, revealing the question page.
7. Gear should continue rotating through zoom-out.

### Transition Temporary Elements

`morphToQuestion()` creates:

```js
const lock = document.createElement("div");      // .hud-lock
const backdrop = document.createElement("div");  // .morph-backdrop
const cover = document.createElement("div");     // .morph-cover
```

Appends them to `document.body`.

### Position Math

The transition starts at the clicked node:

```js
const rect = sourceNode.getBoundingClientRect();
const centerX = rect.left + rect.width / 2;
const centerY = rect.top + rect.height / 2;
```

To guarantee full-screen coverage, it computes the farthest viewport corner:

```js
const farthestCornerDistance = Math.max(
  Math.hypot(centerX, centerY),
  Math.hypot(window.innerWidth - centerX, centerY),
  Math.hypot(centerX, window.innerHeight - centerY),
  Math.hypot(window.innerWidth - centerX, window.innerHeight - centerY)
);
```

Then it computes cover size:

```js
const coverSize = Math.max((farthestCornerDistance * 2.08) / coverPeakScale, baseSize);
```

`2.08` is a safety multiplier so the circle covers all corners.

### Transition Timing

Current timing values:

```js
const coverDelay = 820;
const zoomInDuration = 1900;
const apexDuration = 180;
const zoomOutDuration = 3400;
const coverDuration = zoomInDuration + apexDuration + zoomOutDuration;
const coverAt = coverDelay + zoomInDuration + Math.round(apexDuration * 0.5);
const doneAt = coverDelay + coverDuration;
```

Meaning:

- 820ms lock-on delay before cover starts.
- 1900ms zoom in.
- 180ms full-cover apex hold.
- 3400ms zoom out.
- Page switches at `coverAt`, while the cover should be hiding the background.
- Cleanup at `doneAt`.

### Cover Scale Animation

The cover scale is animated manually using `requestAnimationFrame`:

```js
const step = (time) => {
  const progress = Math.min((time - start) / coverDuration, 1);
  const exitProgress = progress <= apexAt ? 0 : (progress - apexAt) / (1 - apexAt);
  const scale =
    progress <= apexAt
      ? lerp(startScale, holdScale, easeOut(progress / apexAt))
      : lerp(holdScale, endScale, Math.pow(exitProgress, 1.08));
  ...
  cover.style.transform = `scale(${scale})`;
};
```

This was chosen after several CSS animation attempts caused stutter, flicker, or poor timing.

### Page Switch

Actual page switch:

```js
setTimeout(() => {
  els.shell.classList.remove("morphing");
  renderQuestion();
  showView("question");
}, coverAt);
```

Final cleanup:

```js
setTimeout(() => {
  els.stage.classList.remove("is-transitioning");
  renderNodes();
  renderCategories();
  renderQuestion();
  showView("question");
  cancelAnimationFrame(morphFrame);
  lock.remove();
  backdrop.remove();
  cover.remove();
}, doneAt);
```

### Transition CSS Classes

Main transition styles are in `styles.css`:

- `.stage-shell.morphing .system-bg`
- `.stage-shell.morphing .scan-vignette`
- `.hud-lock`
- `.lock-ring`
- `.lock-ring-a`
- `.lock-ring-b`
- `.lock-crosshair`
- `.lock-scan`
- `.lock-scan-x`
- `.lock-scan-y`
- `.morph-backdrop`
- `.morph-cover`
- `.morph-cover::before`
- `.morph-cover::after`
- `.morph-gear`
- `.morph-cover.is-running .morph-gear`
- `.morph-cover-label`

Keyframes:

- `slowSpin`
- `orbitalSpin`
- `hudLockSpin`
- `hudLockSpinReverse`
- `scanX`
- `scanY`
- `bgMorphPush`
- `vignetteMorphPulse`

### Important Transition History

Several user complaints/fixes shaped this:

- Initial click had no transition.
- Then transition existed but was too fast.
- Background changed at the wrong time, looking like a "next button" cut.
- The page needed to switch while circle covered whole screen.
- Circle was too zoomed in at times.
- Full-screen coverage had corner leaks.
- Zoom-out was too fast/flicked.
- Gear stopped rotating during zoom-out.
- Some attempted smooth fixes caused stutter.
- Current implementation uses a single JS frame loop to smooth zoom in/out and keep gear animation CSS running.

Do not casually replace this transition unless you test it carefully at 100% browser zoom and multiple viewport sizes.

---

## 12. CSS Design System

Visual direction:

- Sci-fi medical training console
- Dark teal/black glass
- Cyan/mint HUD lines
- Occasional amber/red accents
- LCARS-inspired panels and framed bars
- Digital/condensed typography
- No friendly rounded SaaS cards
- No beige/cream/purple-heavy palette

Root variables:

```css
--ink: #f4fbff;
--muted: rgba(219, 242, 255, 0.72);
--dim: rgba(153, 205, 224, 0.58);
--cyan: #62e9ff;
--cyan-2: #1eb4d6;
--mint: #73ffd9;
--warn: #ff466a;
--amber: #ffc857;
--deep: #03070d;
--glass: rgba(4, 13, 22, 0.72);
--glass-2: rgba(7, 24, 36, 0.84);
--line: rgba(140, 237, 255, 0.34);
--grid-line: rgba(98, 233, 255, 0.055);
--panel-hot: rgba(45, 233, 255, 0.82);
--bg-image: url("assets/body-systems/cardiovascular.png");
```

Global font stack:

```css
font-family: "Bahnschrift", "Segoe UI", Arial, sans-serif;
```

Large titles:

```css
font-family: Impact, "Arial Black", sans-serif;
```

Important base constraints:

- `html, body` are full-screen and `overflow: hidden`.
- `.stage-shell` has `min-height: 680px`.
- `.deck-stage` is limited to `min(1520px, calc(100vw - 56px))` wide and `min(820px, calc(100vh - 44px))` tall.

---

## 13. Current Layout State

The latest layout changes before this handoff:

- The question/table container was moved upward to make space for the sidebar progress section.
- `.question-view` current override:

```css
.question-view {
  left: clamp(30px, 3.4vw, 64px);
  right: clamp(30px, 3.4vw, 64px);
  top: clamp(58px, 8.5vh, 86px);
  bottom: clamp(6px, 1.1vh, 14px);
  grid-template-columns: minmax(188px, 232px) minmax(640px, 1fr);
  gap: clamp(18px, 2vw, 28px);
}
```

- `.question-side` current override:

```css
.question-side {
  align-self: stretch;
  grid-template-rows: auto auto auto auto 1fr auto;
  align-content: stretch;
  gap: 10px;
  padding: 16px 14px 18px;
  border-left: 1px solid rgba(45, 233, 255, 0.46);
  overflow: hidden;
}
```

- `.side-progress` was returned to normal grid flow after absolute positioning caused overlap:

```css
.side-progress {
  position: relative;
  z-index: 2;
  align-self: end;
  padding: 10px 2px 8px;
  border-top: 1px solid rgba(45, 233, 255, 0.16);
  background:
    linear-gradient(180deg, rgba(2, 13, 24, 0.05), rgba(2, 13, 24, 0.62)),
    linear-gradient(90deg, rgba(45, 233, 255, 0.035), transparent);
}
```

Compact height media query:

```css
@media (max-height: 720px) and (min-width: 901px) {
  .question-view {
    left: 24px;
    right: 24px;
    top: 16px;
    bottom: 6px;
    grid-template-columns: 184px minmax(560px, 1fr);
    gap: 16px;
  }

  .question-side {
    gap: 7px;
    padding: 12px 10px 12px;
  }
}
```

The user may still visually check and request tiny adjustments. If adjusting:

- Prefer moving the whole `.question-view` up/down before pinning inner elements.
- Avoid absolute-positioning `.side-progress` over pills unless there is reserved padding and measured overlap checks.
- Verify at 1280x720 and 1900x860-ish because user runs Chrome at 100% with toolbar/taskbar.

---

## 14. Home Screen Design

Home view:

- Five process circles in `.node-track`.
- R/S diamond and category rail below.
- Background image based on selected body system.

The process node hover/active design was revised because early versions looked like coins lifting from the bottom. Current node design uses cyan rings, dashed rings, glow, and stable dimensions.

The user does not want a node to look permanently hovered unless actually active.

The subcategory buttons should not clip text.

---

## 15. Question Screen Design

Question screen is the most heavily iterated area.

Current goals:

- Cinematic sci-fi clinical console
- Left sidebar with mode/context/progress
- Main question panel with top HUD strip
- Answer rows with angular right-edge notches
- Stable A-D rendering
- No overlap with footer
- At 100% zoom, D must be visible and have room above footer
- Progress bar in sidebar must be visible and not overlap Regular pill

Important classes:

- `.question-view`
- `.question-side`
- `.mini-logo`
- `.question-count`
- `.side-mode`
- `.meta-stack`
- `.meta-pill`
- `.side-divider`
- `.side-progress`
- `.question-card`
- `.diagnostic-frame`
- `.card-topbar`
- `.topbar-state`
- `.question-content`
- `.question-main`
- `.progress-rail`
- `.answers`
- `.answer-option`
- `.clinical-tip`
- `.card-footer`

Answer list is an ordered list:

```html
<ol class="answers" id="answerList"></ol>
```

JS renders four `li.answer-option` items.

---

## 16. Body-System Backgrounds

Generated background files:

```text
assets/body-systems/cardiovascular.png
assets/body-systems/respiratory.png
assets/body-systems/gastrointestinal.png
assets/body-systems/urinary.png
assets/body-systems/hematology.png
assets/body-systems/infectious-diseases.png
assets/body-systems/neurology.png
assets/body-systems/endocrine.png
assets/body-systems/musculoskeletal.png
assets/body-systems/integumentary.png
assets/body-systems/oncology.png
assets/body-systems/gynecology.png
```

They are large PNGs around 1.8-2.0 MB each. They are currently used as CSS background images. They are not optimized for production delivery yet.

Potential future optimization:

- Convert to WebP/AVIF.
- Create responsive versions.
- Preload current/adjacent system backgrounds.
- Add loading state when switching body systems.

---

## 17. PPTX Context

The original inspiration was a PowerPoint file:

`QGrid_01Cardio_01.pptx`

It was inspected/unpacked into:

`work/pptx_inspect/`

PowerPoint exports exist:

`work/pptx_inspect/powerpoint_export/Slide*.PNG`

Original visual reference included:

- 5 circular nodes numbered 01-05.
- R diamond on left.
- Horizontal rail.
- category buttons below rail.
- medical heart background.
- PowerPoint Morph-like zoom transition.

This web app is intended to replace/extend that PowerPoint experience.

---

## 18. User Preferences And Design Constraints

These are important from the conversation:

- User wants sci-fi, futuristic, cinematic, medical discussion/tutorial theme.
- User likes Star Trek LCARS-style references but does not want ugly/out-of-place decorations.
- User dislikes generic containers.
- User wants smooth transitions, not abrupt fades or next-button cuts.
- User wants the page switch hidden during the transition cover.
- User wants the gear/ring to rotate through the zoom-out.
- User wants the zoom-out as smooth as zoom-in, boomerang-like, no hiccup/stutter.
- User often evaluates at Chrome 100% zoom and attaches screenshots.
- User repeatedly checks for clipped/overlapping UI.
- User expects 4 answer choices A-D because Excel data will contain 4 multiple choice answers.
- Do not remove option D.
- Do not include timer or flag question in the question panel; those were in a sample reference only and user said not to include them.
- The progress bar in the sidebar should remain visible.
- The header/system title should be visible and somewhat larger in question mode.
- The progress section should not overlap the Regular pill.

---

## 19. Known Issues / Technical Debt

### 1. CSV parser is naive

The current CSV parser will break on quoted commas/multiline cells. Replace before real production data if CSV import matters.

### 2. SheetJS CDN dependency

Excel import depends on internet/CDN availability. If offline use is required, vendor SheetJS locally or add a package/bundler.

### 3. No build system

This is good for simplicity, but if the app grows, consider Vite or similar. Be careful not to rewrite unnecessarily.

### 4. No tests

There are no automated tests. Validation has been visual/manual through browser screenshots and `node --check app.js`.

### 5. Git metadata issue

`.git` exists but `git status --short` from project root returned:

```text
fatal: not a git repository (or any of the parent directories): .git
```

Investigate before relying on Git operations.

### 6. Large CSS file with older duplicate blocks

`styles.css` contains older style blocks and later overrides. This is why many selectors appear more than once. The effective design often comes from later rules around the "Interactive clinical question view" section and later media queries.

If refactoring CSS, do it carefully and verify visuals.

### 7. Commented legacy answer-render block

`app.js` has a commented-out legacy block in `renderQuestion()` with an encoded checkmark. It is harmless but should be cleaned later.

### 8. Background images are large

May affect load performance.

### 9. Canvas animation always runs

`drawField()` runs continuously. Consider honoring reduced motion or pausing when hidden.

### 10. No accessibility polish yet

Some roles/tabindex exist for answer options, but full keyboard/screen-reader support is not complete.

---

## 20. Verification Workflow

For code syntax:

```powershell
node --check app.js
```

For server:

```powershell
try {
  (Invoke-WebRequest -UseBasicParsing http://127.0.0.1:8787/ -TimeoutSec 3).StatusCode
} catch {
  $_.Exception.Message
}
```

For visual testing:

- Open `http://127.0.0.1:8787/`
- Test home view.
- Switch system dropdown.
- Toggle R/S.
- Click each process node.
- Watch the transition all the way through.
- Check question view at 100% zoom.
- Confirm:
  - A-D choices visible.
  - D is not clipped by footer.
  - Progress bar visible.
  - Progress bar does not overlap Regular pill.
  - Header visible.
  - No category text clipping.
  - Background changes are hidden during morph transition.

Useful debug URLs:

```text
http://127.0.0.1:8787/?debug=1&view=question
http://127.0.0.1:8787/?debug=1&auto=assess
http://127.0.0.1:8787/?debug=1&auto=analyze
```

Recommended viewport checks:

- 1280x720
- around 1907x860
- around 1907x927
- normal desktop Chrome at 100% zoom with toolbar/taskbar

---

## 21. Safe Editing Guidance For Future Agent

Before editing:

1. Read `index.html`, `app.js`, and relevant section of `styles.css`.
2. Use `rg` to find existing selectors/functions.
3. Make small scoped CSS patches.
4. Do not remove answer D logic.
5. Do not rewrite the transition from scratch unless explicitly requested.
6. After edits, run:
   - `node --check app.js`
   - server status check
   - visual test if possible

Because CSS has duplicate historical sections, prefer editing the later active override blocks:

- For transition: around `.hud-lock`, `.morph-cover`, `.morph-gear`, keyframes.
- For question view: around comment `/* Interactive clinical question view */`.
- For compact height: `@media (max-height: 720px) and (min-width: 901px)`.

Use `apply_patch` for manual edits.

---

## 22. Suggested Future Improvements

Potential improvements that fit the user direction:

### Data Import

- Add a downloadable Excel template.
- Add column validation with friendly error messages.
- Support multiple worksheets, one per body system.
- Add a mapping UI for columns.
- Add import summary: total questions by system/process/category/R/S.

### Question Engine

- Store rationales separately from "correct answer".
- Add explanation text column.
- Add per-question ID.
- Add shuffle option.
- Add "most selected" style indicator only if actual response data exists.

### UI

- Add better responsive behavior below 900px.
- Add reduced-motion mode.
- Add keyboard shortcuts.
- Add focus-visible styling for process nodes and category tabs.
- Add active process indicator on question screen.

### Animation

- Consider Three.js only if adding true 3D assets/medical models.
- Keep the current morph transition as baseline.
- If using GSAP, replace the manual `requestAnimationFrame` transition only after matching current timing and coverage.

### Performance

- Optimize PNG backgrounds to WebP.
- Preload selected background.
- Pause canvas animation on hidden tab.
- Use `prefers-reduced-motion`.

### Code Organization

- Split JS into modules:
  - constants/data
  - state/render
  - imports
  - transitions
  - canvas background
- Split CSS into:
  - base
  - home
  - question
  - transition
  - responsive

Do not do this refactor casually during small visual tweaks.

---

## 23. Important Function Reference

`init()`

- Entry point.

`renderSystems()`

- Fill system dropdown.

`renderNodes()`

- Render process buttons.

`renderCategories()`

- Render category tabs.

`bindEvents()`

- Attach all event listeners.

`updateVariantLabels()`

- Sync R/S labels.

`setSystemBackground(animate = false)`

- Set CSS variable `--bg-image`.

`filteredQuestions()`

- Exact filter list.

`processQuestions()`

- Same process/system/variant list.

`selectFirstAvailable(renderUi = true)`

- Recover valid question after filter changes.

`currentQuestion()`

- Return current filtered question or fallback shell.

`renderQuestion()`

- Populate question screen and answer options.

`clinicalTipText(question)`

- Generate current rationale text.

`selectAnswer(event)`

- Select answer before reveal.

`morphToQuestion(sourceNode)`

- Main transition.

`returnHome()`

- Back to home.

`showView(view)`

- Toggle home/question view.

`revealAnswer()`

- Toggle answer state.

`moveQuestion(delta)`

- Previous/next.

`pulse(element)`

- Small visual pulse animation.

`importQuestions(event)`

- Import JSON/CSV/XLS/XLSX.

`normalizeRows(rows)`

- Normalize imported data.

`normalizeChoices(choices)`

- Force 4 answer choices.

`correctIndexFrom(value)`

- Convert A-D or 1-4 to 0-3.

`parseCsv(text)`

- Simple CSV parser.

`normalized(value)`

- Lowercase/kebab-ish process normalization.

`drawField()`

- Canvas animated network.

---

## 24. Current Server State At Time Of Handoff

A server was previously started on:

```text
http://127.0.0.1:8787/
```

The last known PID in conversation was:

```text
32960
```

This PID may no longer be valid. Always re-check with `Invoke-WebRequest`.

---

## 25. Recommended First Prompt For Next Agent

If moving this project to another agent, paste this:

```text
Read PROJECT_HANDOFF.md fully first. Then inspect index.html, app.js, and styles.css before making changes. This is a static vanilla JS sci-fi medical QGrid simulator. Preserve the current morph transition and the A-D answer behavior. The user is very sensitive to visual clipping/overlap at 100% browser zoom. Use small scoped patches and verify with node --check app.js and browser layout checks.
```

---

## 26. Current User-Visible State

As of this handoff:

- Home page works.
- Body system selector works.
- R/S toggle works.
- Category tabs work.
- Process node click triggers HUD lock-on + iris morph transition.
- Question page renders sample questions.
- A-D choices are rendered.
- Reveal answer works.
- Previous/next works within current filtered question set.
- Excel/CSV/JSON import exists.
- Sidebar progress exists and was most recently adjusted back into grid flow after overlap.
- Question/table container was moved upward to give sidebar progress more room.

The newest visual concern from the user before this handoff was about making room for sidebar progress. The last code change addressed this by moving `.question-view` upward and putting `.side-progress` back into normal grid flow rather than absolute positioning.

Future agent should visually re-check this exact area before further changes.

