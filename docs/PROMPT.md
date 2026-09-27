# Build the TBKHTY Masters clickable demo

Build a working mobile web prototype of TBKHTY Masters, 41 screens, from the design pack in this folder, so that real people in Cairo can open a link on their own phone and walk the whole product end to end.

This is a demo, not the production app. There is no server, no database and no real phone verification. Everything runs in the browser off sample data, and state resets on reload. The purpose is to test whether the flow and the design make sense to someone who has never seen it before, half of whom will read Arabic first.

---

## 1. What is in this pack

| Path | What it is | How to use it |
|---|---|---|
| `reference/html/*.dc.html` | All 50 boards as rendered HTML, exactly as designed | The visual source of truth. Read these. Every colour, size, spacing and string is in here. |
| `reference/png/*.png` | The same 50 boards as images at 2x | Look at these to check your build against the design. |
| `spec/screens.json` | Every board: id, name, flow, role, size, purpose, outgoing links, inbound links, whether it is an external entry point, and whether it is a screen to build (`in_demo`) | The manifest. Build from this. |
| `spec/routes.json` | The routing table on its own: screen id, control label, destination | Wire navigation from this and test against it. |
| `spec/tokens.json` and `spec/tokens.css` | Colour, type, sizing tokens plus the rules that govern them | Use the CSS variables. Do not hardcode hex values anywhere else. |
| `spec/content.json` | The sample dataset: 14 cooks, votes, clubs, areas, scores, placeholders | The only data in the app. Do not invent more. |
| `assets/*.png` | The TBKHTY wordmark, light and dark variants | Use as is. |

The `.dc.html` files are design-canvas artboards, not web pages. Each is a fixed 390x844 box with inline styles, an `<x-dc>` wrapper and a `support.js` script that does not exist here. **Do not ship them, do not copy them into the app, and do not extend them.** Read them, extract the design, and write clean code.

Precedence when sources disagree: for anything visual, the reference HTML wins. For anything behavioural, this document wins. If both are silent, ask rather than invent.

---

## 2. Stack and constraints

Plain HTML, CSS and JavaScript. No framework, no bundler, no npm install, no TypeScript, no build step.

- ES modules, one module per screen, loaded from a single `index.html` shell.
- Hash routing: `#/a0`, `#/e1`, and so on, using the lowercase screen ids from `spec/screens.json`. A URL must be shareable and reloadable straight into that screen.
- CSS in a small number of hand written files using the variables in `tokens.css`. No utility framework.
- Icons as inline SVG, copied from the reference HTML. No icon font, no icon library.
- The only permitted runtime network request is the Google Fonts stylesheet already named in `tokens.json`. Everything else must work offline.
- Target: opens and is usable in under 2 seconds on a throttled 3G connection on a mid range Android phone.

Because ES modules do not load over `file://`, ship a one line start script (`python3 -m http.server 8000`) and say so in the README. The result must also deploy to any static host by uploading the folder.

---

## 3. Layout

The design is drawn at 390x844. Build it as a real responsive mobile page, not a fixed box.

- Use `100dvh`, safe area insets, and a flex column: fixed header, scrolling body, fixed action bar where the design has one.
- Below 430px the app fills the viewport.
- At 430px and above, centre a 390px column on a neutral backdrop with a light phone frame around it, so it can be demoed on a laptop without looking broken.
- No horizontal scrolling at any width from 320px up.
- `screens.json` marks every board with `in_demo`. Nine are false: they are reference material, not screens to build, and each carries `not_in_demo_because`. That leaves **41 screens to build**. Two of the nine still shape the build: **K3 is the states catalogue and every state in it must be implemented inside the screen it belongs to**, and K1 and K2 are the component and foundation sheets you build the shared components from.

---

## 4. The rules that came out of the UX audit

These are not suggestions. Verify each one mechanically before you call the build done.

1. **Every navigation label names its destination.** If someone cannot tell from the words on the control where they will land, the label is wrong. `spec/routes.json` carries the corrected labels.
2. **One primary action per screen, reachable without scrolling.** Where the content is long, the primary action sits in a sticky bar at the bottom and the body scrolls behind it. `tokens.json` lists the screens that have one.
3. **Minimum tap target 44x44 CSS pixels** for anything tappable, including back arrows, close buttons and language toggles.
4. **Type floors: 11px for Arabic, 10px for Latin.** Nothing smaller, anywhere, ever.
5. **Never white text on teal.** That pair is 2.41:1 and fails WCAG AA. Every teal fill carries navy text. Teal text on paper or white uses `--c-teal-text` only.
6. **A rank is meaningless without its board.** Wherever a rank appears, the board it belongs to appears with it, for example `#3 in Shooting Club Edition`, not `#3`.
7. **Back must never strand anyone.** Every screen reachable by a forward tap has a working back path, and back goes to the screen you actually came from where that differs from the design default.
8. **Nothing is unreachable.** Every screen in `screens.json` is reachable from A0 except the ones with an `entry_point` value, which are opened from outside the app.

---

## 5. Language

Arabic is not a separate set of screens. Build one app with a working language toggle in the header of every screen.

- Toggling sets `dir="rtl"` on the document and swaps every string.
- All strings live in one `i18n.js` with `en` and `ar` keys. No string is hardcoded in a screen module.
- `AR1`, `AR2` and `AR3` in the reference are the mirroring specification. Study them: the back and next arrows flip, the rank number moves to the right of a row, the movement arrow to the left, carousels swipe the other way, floated field labels and corner badges swap side, and the display face becomes Cairo because Instrument Serif has no Arabic.
- Arabic headings use Cairo, never a serif.
- The toggle uses the logo and background colours only, and it must not shift the layout when switched.
- The choice persists for the session and is reflected in the URL (`?lang=ar`) so a link can be shared already in Arabic.

Every string in `content.json` already has its Arabic. Anything missing, take from the reference HTML. Do not machine translate and do not invent Arabic copy. Where a string genuinely does not exist, use the English and leave a `TODO(ar)` comment.

---

## 6. State and fakery

One in-memory store seeded from `content.json`, reset on reload. No localStorage, no cookies, no server.

What must actually work when tapped:

- **Voting.** Tapping vote runs the verify sheet, then increments that cook's count, marks them voted, updates the rank order live, and shows the confirmation. A second vote for the same cook the same day shows the already voted state.
- **Verification.** Any 4 digit code is accepted. The code `0000` shows the wrong code error state from K3. There is no SMS and no WhatsApp message.
- **Location.** Call the real `navigator.geolocation` once on B3, because testing the permission prompt is part of the point. On success, preselect the nearest area from `content.json` and show the pin confirmed state. On denial or timeout, show the location denied state from K3 and fall through to the manual area picker. Never store or display a raw coordinate; the stored value is always an area id from the controlled list.
- **Photos.** A real file input with a local object URL preview. Nothing is uploaded. Simulate the upload failure state from K3 when the chosen file is over 10MB.
- **Signup.** Completing B1 to B6 creates a 15th cook from the entered details and that entry appears in the feed, in the search results and on the leaderboard for the rest of the session.
- **Search.** E8 filters the live dataset by cook name, dish and area, with the no results state from K3 when nothing matches.
- **Nomination.** C1 records a nomination and the rung ladder on C3 advances.

What must not be faked into looking real: no invented statistics, no fabricated testimonials, no claims about how many people have joined beyond the numbers already in `content.json`.

---

## 7. Demo controls for user testing

Add a small dev drawer, opened with `?dev=1` in the URL and hidden otherwise. It must contain:

- A jump list to any screen by id.
- Reset the demo to its seeded state.
- Language toggle.
- Force any of the K3 states: search empty, first cook in an area, location denied, wrong code, upload failed, ranked 12 of 14, voting closed, offline with a queued vote.
- A note of which screen you are on, so a facilitator watching over a shoulder can see the id.

This drawer is for running sessions, not for participants. It must be invisible and unreachable without the query string.

---

## 8. Build order

Ship each phase working before starting the next, so testing can begin early.

1. **Shell.** `index.html`, router, tokens, i18n, layout primitives, dev drawer, the shared components (app bar, sticky action bar, bottom nav, entry card, rank badge, vote button, chips, buttons). `K1` and `K2` in the reference are the component and foundation boards; build from those.
2. **Voter loop.** A0, A1, A2, A3, E1, E2, E3, E4, E5, E6, E7, E8. This alone is a testable product and it is the flow most people will see first.
3. **Cook signup.** B1 through B6 including B3a, B3b and B3d, then D1 to D4.
4. **Everything else.** C1 to C3, F1, F2, G1, G2, H1 to H4, J1 to J5.
5. **States and polish.** Every K3 state wired into its screen, then the acceptance checks below.

---

## 9. Acceptance checks

Write these as a Playwright script in `test/check.mjs` and run it. Do not report the build as done until all of them pass, and paste the results.

1. Every screen id in `screens.json` with `in_demo: true` loads at its hash route without a console error.
2. Every link in `routes.json` whose source and destination are both `in_demo` exists in the built app, points at a real route, and its visible label matches the label in the file.
3. No link in the app points at a route that is not in `routes.json`.
4. At 390x844, the primary action on every screen is inside the viewport without scrolling.
5. Every tappable element is at least 44x44.
6. No text node renders below 11px in Arabic or 10px in Latin.
7. No white text sits on a teal background anywhere.
8. Every screen renders in both languages with no clipped or overflowing text, and no horizontal scroll at 320px, 390px and 430px.
9. From A0, every `in_demo` screen without an `entry_point` is reachable by following links only.
10. From every screen, back or close returns to a screen that exists.

---

## 10. Deliverables

- The app itself, running from a static folder.
- `README.md`: how to run it locally, how to put it on a static host, and the URL pattern for opening it at a given screen and language.
- `NOTES.md`: every place the demo fakes something, in a table, so nobody mistakes the prototype for a working system. Include the five unresolved placeholders below.

The following copy is deliberately unresolved and must stay visible as a bracketed placeholder rather than being invented:

`[SPONSOR]`, `[SCOUT PRIZE]`, `[GRAND SCOUT PRIZE]`, `[CLUB SPONSOR]`, `[CTA]`.

---

## 11. Out of scope

No ordering, no delivery, no payments, no menus, no real accounts, no real SMS or WhatsApp, no admin tools, no analytics, no push notifications, no backend of any kind. If a task seems to need one of these, stop and ask.

---

## 12. Context you should know

TBKHTY Masters is Phase 1 of a home cooking platform. It is a cooking competition run inside a Cairo sports club. Members and neighbours enter one signature dish, the neighbourhood votes for free online, the top entries cook at a live tasting event at the club, and blended scoring decides a winner: judges 40 percent, live tasting 30 percent, online votes 30 percent, with judge scores sealed until the ceremony. Winning cooks keep a title on their profile. Anyone can nominate a cook they know and win a prize if that cook reaches the top three.

Most people arrive from a WhatsApp link with no idea what any of this is, on a mid range Android phone, and they decide in about five seconds whether to keep going. A0 exists for exactly that person. Everything in the design is bent toward getting them to one clear next action.
