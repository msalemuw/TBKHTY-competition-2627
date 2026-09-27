# What this demo fakes

The demo is a prototype for user testing. Nothing below is a working system. Every line in this file is something a tester could otherwise mistake for real.

## Faked behaviour

| Where | What the tester sees | What actually happens |
|---|---|---|
| Everywhere | A live competition | One in-memory store seeded from `spec/content.json`. A reload resets everything. No localStorage, no cookies, no server. |
| B2, E3 | "Send code via WhatsApp", a 4-digit code | No message is sent. Any 4 digits pass. `0000` always shows the wrong-code state. The "Resend code in 0:24" timer is cosmetic. |
| B2, E3, C1 | WhatsApp numbers | Checked only for having at least 8 digits. Never sent or stored beyond the session. |
| E3 → E4 | "Confirm my vote" | Adds one to the cook's count in memory, marks her voted today, re-sorts the ranking and shows movement arrows. One vote per cook per day. |
| E3 (offline) | "You're offline, your vote is saved" | Uses `navigator.onLine`, or the dev-drawer toggle. The vote waits in memory and is counted when the browser fires `online` or the toggle is switched off. |
| B3 | The location prompt, "Pin dropped", "Accurate to about N m" | One real `navigator.geolocation` call. The result is matched to the nearest area in the controlled list using approximate area centres, then the coordinate is dropped. Only the area id is kept; no coordinate is stored or shown. Outside Greater Cairo (more than 60 km from every area) it is treated as denied. |
| B3, B3b, D4 | Maps | Static illustrations from the boards. Dragging on B3b moves the picture; nothing is geocoded. The address line on B3b shows the area and governorate, not a street. |
| B3, B3a, B3d, E3, E5 | Governorate and area pickers | All 27 governorates are listed. content.json only has areas for Giza and Cairo, so every other governorate is offered as one area with its own name. Governorate positions are approximate capitals, used only to match the geolocation reading. |
| B3a | "My area is not on the list", compounds | Shows a demo notice. There is no compounds level in the sample data, so none is shown. |
| B3, B4 | Photo upload | A real file picker with a local preview (object URL). Nothing is uploaded. Any file over 10 MB shows the upload-failed state. |
| B5 → B6 | "Submit my entry" | Adds a 15th cook to the in-memory list with zero votes. She appears in the feed, search, leaderboard and her dashboard for the rest of the session. Submitting again edits the same entry. |
| C1 → C2 | "Nominate her" | Records the nomination in memory. No invite is sent. C2 then shows what the nominee would see, with the nominator's own words as the first quote. If the name matches an existing cook, the C3 ladder uses her real rank. |
| C2 → B2 | "Accept my nomination" | Opens signup already marked verified, with her name filled in. |
| D2, E1, E2 | Share buttons | Show "Demo only: nothing was sent." "Copy link" copies this demo's own URL for that cook. |
| D1 | Votes today, supporters, "See all 26 supporters" | Sample figures from the D1 board for seeded cooks. A new cook shows her real vote count and no supporters. |
| D3 | Kitchen questions | Answers are held in memory only. Delivery reach is worked out from the approximate area centres. |
| E2 | Price chips, Follow | Held in memory only. No orders, no notifications. |
| E5 | Quick profile, raffle | Answers held in memory. There is no raffle. |
| E6 | "9h 12m until your next vote" | Time left until local midnight. The rule is not enforced across reloads. |
| G1 → G2 | Live tasting vote | Marks one live vote in memory. "214 of 340 guests" is the board's sample figure. |
| H1, H2 | Final scores | From `final_scores` in content.json. "186 tasting votes" is from the H2 board. |
| H4 | "Notify me when Season 2 opens" | Toggles a local flag. No notification exists. |
| J2, J3, J4, J5 | Titles | The Season 1 titles shown on the J boards (Salma's three, Hoda's Dokki title). The challenge on J4 is the board's sample. |
| Dev drawer | Forced states | Only with `?dev=1`. |

## Figures that come from the boards, not from content.json

These are copied from the reference designs as sample figures. They are not measured, and they do not change with what the tester does: "142 neighbours voted today" (A2), "42" votes today (D1), the three supporters and "+23, +14, +8" (D1), "Your last share brought 8 votes" (D2), "Your shares brought 14 votes", the four badges and "3 entries in the raffle" (E7), the season totals on H4 (they start from the board's 6 votes, 4 cooks, 6 days and add the tester's own), "126" and "318" followers (E2, J3), "Cooks who share in the first hour get 3x more votes" (B6), "214 of 340 guests" (G2), and the H3 stats for seeded cooks. Anything not on a board shows a dash rather than an invented number.

## Unresolved placeholders

These stay visible as bracketed placeholders, as the pack asks. None has been filled in.

| Placeholder | Stands for | Where it shows |
|---|---|---|
| `[SPONSOR]` | the event sponsor's name and lockup | A0, A1, A2, A3, D2, E4, E5, E7, H1, H2, H4, C3 |
| `[SCOUT PRIZE]` | the reward a nominator gets when their cook reaches the top 3 | C1, C3 |
| `[GRAND SCOUT PRIZE]` | the top nominator reward at the end of the season | C3 |
| `[CLUB SPONSOR]` | the club-level sponsor | A2 |
| `[CTA]` | the sponsor's own call to action | A1, A2 |

In running Arabic copy the boards write `[الراعي]` for `[SPONSOR]`, and the demo keeps that. The sponsor lockup slot itself stays `[SPONSOR]` in both languages, as on AR1.

## Stand-ins

- **Photography.** Every cook and dish is a flat illustration copied from the boards. Six dishes have no illustration on any board (hawawshi, konafa, sayadeya, shorbet lesan asfour, mesa'a'a, and any new entry), so they show a plain plate in a single colour. Four cooks have no portrait on any board (Yasmin, Nesma, Karim, Reem), so they reuse the unnamed sample portraits. A new cook without a photo shows her initial. B1 keeps the empty photo slot the pack describes.
- **A1 top cooks.** The A1 board shows "Rania Hafez, Maadi Club" at #3. She is not in content.json, so the ranking shows the real top three of the sample data instead.
- **Other editions.** A1 lists four editions and all four open A2. Only the Shooting Club edition has cooks in the sample data, so A2 for Gezira, Maadi or Wadi Degla shows the edition's name and counts and says its entries are not in the sample data.

## Arabic

Every Arabic string is copied from the reference boards or from content.json. Where a board has no Arabic for a string, the English shows in Arabic mode and the entry in `js/i18n.js` carries a `TODO(ar)` comment: 223 strings at the time of writing, mostly secondary labels, demo notices and accessible names. Nothing was machine translated.

## Decisions where the brief and the boards pull apart

The brief says the reference HTML wins on anything visual and the brief wins on behaviour. These are the places that rule decided something.

- **White text on teal.** The boards put white on teal in a few spots (the "COOKING" brush on B1, the rung ticks on C3, the teal-dark score segment). All of them carry navy, per the brief.
- **Language toggle colours.** The boards fill the active option in teal on dark headers. The brief says the toggle uses the logo and background colours only, so it is white on navy headers and navy on light ones. Both options have a fixed width so switching never moves anything.
- **Tap targets.** Controls drawn under 44px on the boards (the search-result vote pills, the language options, inline links, checkboxes) are 44x44.
- **Ranks carry their board.** Rank badges read "#3 in Shooting Club Edition", or "#3 · Shooting Club" where space is short. D1 shows the edition under the rank.
- **Back paths.** Where a board has no back control on a screen you can reach by a forward tap (A1, C2, D1, E1, E4, B6, G2, H1, H2), a back arrow appears in the header whenever there is somewhere to go back to. Every back control returns to the screen you came from, not the board's default; the default is only used when the screen was opened directly from a link.
- **Voting twice.** The brief asks for the already-voted state on a second vote for the same cook the same day. Tapping "Vote for …" again on E2 opens E6 (Already voted today). routes.json has no E2 → E6 link; the control still points at E3 as the table says, and the redirect happens on tap.
- **K3 states.** The links inside K3 states ("Nominate a cook" on the empty search, "Invite 2 cooks", "See the results") use the K3 board's own routes (C1 and H1).
- **G2 is reachable only from G1.** routes.json gives G2 one way in, from G1, which is an entry point (the QR code on a tasting table). So G2 cannot be reached from A0 by following links. The acceptance check reports this as a note, not a failure, and the dev drawer's jump list opens it. Adding a link would break the "no link outside routes.json" rule, so the gap is left for the design team to decide.
- **One primary action.** Screens whose boards have no single primary control (D3, D4, E7, E8, J1, J2, J3, F1) mark the most important one for the check: the live question, the tasting details, the Vote tab, the search field, the two tracks, the board chips, Follow, and the pair of buttons under the leaderboard.
