# TBKHTY Masters · clickable demo

A mobile web prototype of TBKHTY Masters, 41 screens, built from the design handoff pack so that people in Cairo can open a link on their own phone and walk the whole product end to end, in English or Arabic.

It is a demo, not the product. There is no server, no database and no real verification: everything runs in the browser off the sample data in `spec/content.json`, and state resets on reload. `NOTES.md` lists every place it fakes something.

Plain HTML, CSS and ES modules. No framework, no build step, no npm install.

## Run it locally

ES modules do not load over `file://`, so serve the folder:

```sh
./start.sh                 # same as: python3 -m http.server 8000
```

Then open <http://localhost:8000>.

## Put it on a static host

Upload the whole `masters-demo` folder as it is (Netlify drop, GitHub Pages, S3, any web server). There is nothing to build. The only request that leaves the host is the Google Fonts stylesheet; without it the app still works, in system fonts.

The `test/`, `spec/` and `docs/` folders are not needed at runtime but do no harm if uploaded. `spec/` holds the manifest the tests read.

## Opening a given screen and language

Routes are hash routes named after the screen ids in `spec/screens.json`, lower case:

| URL | Opens |
|---|---|
| `/#/a0` | A0 Welcome (the WhatsApp landing) |
| `/#/a1` | A1 Home |
| `/?lang=ar#/e1` | E1 Feed, in Arabic |
| `/#/e2?cook=hoda` | E2 for a given cook (ids: `salma`, `hoda`, `amira`, `nadia`, `mona`, `fatma`, `omar`, `dina`, `hassan`, `yasmin`, `nesma`, `heba`, `karim`, `reem`) |
| `/#/a2?club=Maadi%20Club` | A2 for another edition |
| `/#/g1` | G1 Table QR landing (an entry point from a QR code) |
| `/#/j5` | J5 Title awarded (an entry point from a notification) |
| `/#/ar1`, `/#/ar2`, `/#/ar3` | The Arabic reference boards, which are A1, B3 and E1 in Arabic |

`?lang=ar` can also go inside the hash (`#/a1?lang=ar`). The language toggle in every header keeps the URL in step, so a link copied from the address bar opens in the same language.

## Running a test session

Add `?dev=1` to any URL (for example `/?dev=1#/a0`) to get the facilitator drawer: a DEV button bottom left, and the current screen id bottom right. The drawer has:

- a jump list to every screen;
- a reset back to the seeded state;
- the language switch;
- toggles that force each K3 state: search with no results (E8), first cook in an area (J2), location denied (B3), wrong code (B2 and E3), upload failed (B4), ranked 12 of 14 (D1), voting closed (everywhere), and offline with a queued vote (E3).

Without `?dev=1` none of this is in the page.

Things testers can do for real in a session: vote (with the verify sheet), sign up as the 15th cook, search, nominate, answer the quick profile, follow cooks, and grant or deny the location prompt on B3. The code `0000` is always the wrong code.

## Checks

```sh
node test/check.mjs   # the 10 acceptance checks from PROMPT.md section 9
node test/flows.mjs   # the behaviours in section 6: voting, signup, search, nomination, location, photos, offline, language, dev drawer
```

Both start their own server and use Playwright with Chromium. If Playwright is not installed locally they use a global install (`npm i -g playwright`).

## Where things are

```
index.html            the shell
css/tokens.css        the design tokens, unchanged from the pack
css/tokens-ext.css    the secondary tints the reference boards use, plus the type floors
css/base.css          layout: fixed header, scrolling body, fixed action bar, the phone frame at 430px+
css/components.css    shared components (K1 and K2)
css/screens.css       screen-specific layout
js/app.js             boot, render loop, event delegation, dev drawer
js/router.js          hash routing and the back stack
js/store.js           the in-memory store, seeded from content.json
js/i18n.js            every string, English and Arabic
js/ui.js              component functions
js/screens/*.js       one module per screen, loaded on demand
js/icons-data.js      icons copied from the K2 board
js/art-data.js        the dish and cook illustrations copied from the boards
spec/                 screens.json, routes.json, content.json, tokens.json from the pack
docs/PROMPT.md        the build brief
```
