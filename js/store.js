// One in-memory store, seeded from content.json and reset on reload.
// No localStorage, no cookies, no server.
import content from './data/content.js';

// Which feed filter each dish belongs to. The categories are the ones on the
// E1 and B4 boards; the mapping is a plain reading of each dish.
const CATEGORY = {
  fatta: 'mains', mahshi: 'mains', molokhia: 'mains', rokak: 'baked', omali: 'sweets',
  bamya: 'mains', hawawshi: 'baked', konafa: 'sweets', feteer: 'baked', koshari: 'mains',
  sayadeya: 'mains', basbousa: 'sweets', shorba: 'mains', mesaa: 'mains',
};

// Stories that exist on the reference boards, in both languages. Cooks without
// one on the boards have no story in the demo.
const STORIES = {
  salma: {
    en: 'Bread soaked the way my mother taught me, with the garlic vinegar poured at the table.',
    ar: 'عيش مبلول زي ما أمي علمتني، والتقلية تتصب على السفرة.',
  },
  hoda: {
    en: 'Rolled thin enough to see the light through. 300 rolls the night before.',
    ar: 'ملفوف رفيع تشوف منه النور. 300 لفة من الليلة اللي قبلها.',
  },
  amira: {
    en: "My grandmother's recipe from Tanta. She cooked it every Friday and never wrote it down.",
    ar: 'وصفة جدتي من طنطا. كانت بتطبخها كل جمعة ومكتبتهاش أبداً.',
  },
};

// Followers shown on the reference boards (E2, K1, J3). Others have none shown.
const FOLLOWERS = { amira: 126, salma: 214 };

// Governorate for each area in the controlled list. Areas are ids from content.json.
export const GOVERNORATES = [
  { id: 'giza', en: 'Giza', ar: 'الجيزة' },
  { id: 'cairo', en: 'Cairo', ar: 'القاهرة' },
  { id: 'qalyubia', en: 'Qalyubia', ar: 'القليوبية' },
];
const AREA_GOV = {
  Mohandessin: 'giza', Dokki: 'giza', Agouza: 'giza', Giza: 'giza', Haram: 'giza', Faisal: 'giza',
  'Sheikh Zayed': 'giza', '6th of October': 'giza', Zamalek: 'cairo', Downtown: 'cairo', Maadi: 'cairo', 'New Cairo': 'cairo',
};
// Approximate centre of each area, used only to preselect the nearest area after
// the one geolocation call on B3. Coordinates are never stored or shown.
const AREA_CENTRE = {
  Mohandessin: [30.0561, 31.2001], Dokki: [30.0384, 31.2123], Agouza: [30.0571, 31.2109], Zamalek: [30.0609, 31.2197],
  Giza: [30.0131, 31.2089], Haram: [29.9936, 31.1566], Downtown: [30.0459, 31.2421], Faisal: [30.0056, 31.1726],
  Maadi: [29.9602, 31.2569], 'Sheikh Zayed': [30.0444, 30.9776], '6th of October': [29.9285, 30.9188], 'New Cairo': [30.0301, 31.4731],
};

export const AREAS = [...content.areas_near, ...content.areas_more].map((a) => ({
  id: a.en, en: a.en, ar: a.ar, km: a.km_from_club, gov: AREA_GOV[a.en] || 'giza', centre: AREA_CENTRE[a.en],
}));
export const areaById = (id) => AREAS.find((a) => a.id === id) || null;
export const govById = (id) => GOVERNORATES.find((g) => g.id === id) || null;

function seedCooks() {
  return content.cooks.map((c) => ({
    ...c,
    seedRank: c.rank,
    move: c.rank_move,
    category: CATEGORY[c.dish_kind] || 'mains',
    story: STORIES[c.id] || null,
    followers: FOLLOWERS[c.id] ?? null,
    photo: null,
    isNew: false,
  }));
}

function seed() {
  return {
    lang: 'en',
    cooks: seedCooks(),
    // The person holding the phone, as a voter.
    voter: {
      name: '', phone: '', verified: false, code: '', area: null, gov: null, club: 'none',
      votedToday: {}, votesCast: 0, streak: 0, backed: {}, follows: {}, lastVoted: null,
      freq: null, raffle: false, notifySeason2: false, orderIntent: {},
    },
    // The person holding the phone, as a cook going through B1 to B6.
    signup: {
      phone: '', verified: false, code: '', name: '', photo: null, photoSize: 0, area: null, gov: null, club: 'shooting',
      pinConfirmed: false, dish: '', dishPhoto: null, dishPhotoSize: 0, story: '', category: 'mains',
      nominatedBy: null,
    },
    myCookId: null,
    geo: { status: 'idle', area: null, accuracy: null },
    nominations: [
      { id: 'n1', name: 'Fatma Abdel Aziz', cookId: 'fatma', seeded: true },
      { id: 'n2', name: 'Omar Tawfik', cookId: 'omar', seeded: true },
      { id: 'n3', name: 'Heba Sami', cookId: 'heba', seeded: true },
    ],
    lastNomination: null,
    kitchen: { radius: '5km' },
    tasting: { bring: [true, true, false, false] },
    liveVoted: false,
    queuedVote: null,
    // K3 states the facilitator can force from the dev drawer.
    force: {
      searchEmpty: false, firstCook: false, locationDenied: false, wrongCode: false,
      uploadFailed: false, rank12: false, votingClosed: false, offline: false,
    },
  };
}

export const state = seed();
const listeners = new Set();
export const subscribe = (fn) => listeners.add(fn);
export function emit() { listeners.forEach((fn) => fn()); }

export function resetState() {
  const lang = state.lang;
  const fresh = seed();
  Object.keys(state).forEach((k) => delete state[k]);
  Object.assign(state, fresh, { lang });
  emit();
}

// ---------- Cooks and ranking ----------
export const edition = content.edition;
export const clubs = content.clubs;

export function ranked() {
  return [...state.cooks].sort((a, b) => b.votes - a.votes || a.seedRank - b.seedRank);
}
export function rankOf(id) {
  return ranked().findIndex((c) => c.id === id) + 1;
}
export function cookById(id) {
  return state.cooks.find((c) => c.id === id) || null;
}
export function cookCount() { return state.cooks.length; }

// Voting closes are forced from the dev drawer; otherwise open.
export const votingOpen = () => !state.force.votingClosed;
export const isOffline = () => state.force.offline || (typeof navigator !== 'undefined' && navigator.onLine === false);

export function castVote(cookId) {
  const before = ranked().map((c) => c.id);
  const cook = cookById(cookId);
  if (!cook) return;
  cook.votes += 1;
  const after = ranked().map((c) => c.id);
  // Update movement for anyone whose position changed.
  after.forEach((id, i) => {
    const was = before.indexOf(id);
    if (was !== i) cookById(id).move = was - i;
  });
  const v = state.voter;
  v.votedToday[cookId] = true;
  v.backed[cookId] = true;
  v.votesCast += 1;
  if (v.streak === 0) v.streak = 1;
  v.lastVoted = cookId;
  state.queuedVote = null;
  emit();
}

// ---------- Signup: the 15th cook ----------
export function submitEntry() {
  const s = state.signup;
  const name = s.name.trim() || 'New cook';
  const dish = s.dish.trim() || 'Signature dish';
  const story = s.story.trim();
  const fields = {
    name, name_ar: name, dish, dish_ar: dish, dish_kind: 'custom', area: s.area || 'Mohandessin',
    area_ar: (areaById(s.area) || areaById('Mohandessin')).ar,
    club: s.club === 'shooting' ? 'Shooting Club' : 'Shooting Club',
    category: s.category, story: story ? { en: story, ar: story } : null,
    photo: s.photo, dishPhoto: s.dishPhoto,
  };
  if (state.myCookId) {
    Object.assign(cookById(state.myCookId), fields);
  } else {
    const id = 'me';
    state.cooks.push({
      id, rank: state.cooks.length + 1, seedRank: 99, votes: 0, rank_move: 0, move: 0, followers: null, isNew: true, ...fields,
    });
    state.myCookId = id;
    // A nominee who accepts and cooks unlocks the first rung for the nominator.
    if (s.nominatedBy) {
      const n = state.nominations.find((x) => x.id === s.nominatedBy);
      if (n) n.cookId = id;
    }
  }
  emit();
}

// ---------- Nominations ----------
export function addNomination({ name, phone, club, best, by }) {
  const clean = name.trim();
  const match = state.cooks.find((c) => c.name.toLowerCase() === clean.toLowerCase());
  const n = { id: 'n' + (state.nominations.length + 1) + '-' + Date.now().toString(36), name: clean, phone, club, best, by, cookId: match ? match.id : null, seeded: false };
  state.nominations.push(n);
  state.lastNomination = n.id;
  state.signup.nominatedBy = n.id;
  if (by && !state.voter.name) state.voter.name = by;
  emit();
  return n;
}

// Rungs: 1 she enters and cooks, 2 top 10, 3 top 3, 4 wins the edition.
export function rungsFor(nomination) {
  if (!nomination.cookId) return 0;
  const r = rankOf(nomination.cookId);
  let n = 1;
  if (r <= 10) n = 2;
  if (r <= 3) n = 3;
  return n;
}

// ---------- Geolocation (B3, once) ----------
function distKm([a, b], [c, d]) {
  const toR = (x) => (x * Math.PI) / 180;
  const R = 6371;
  const dLat = toR(c - a);
  const dLon = toR(d - b);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(toR(a)) * Math.cos(toR(c)) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}
export function nearestArea(lat, lon) {
  let best = null;
  let bestD = Infinity;
  AREAS.forEach((a) => {
    if (!a.centre) return;
    const d = distKm([lat, lon], a.centre);
    if (d < bestD) { bestD = d; best = a; }
  });
  // Far outside Greater Cairo, no area is a sensible guess.
  return bestD <= 60 ? best : null;
}

export function requestLocationOnce() {
  if (state.geo.status !== 'idle') return;
  if (state.force.locationDenied || !('geolocation' in navigator)) {
    state.geo.status = 'denied';
    emit();
    return;
  }
  state.geo.status = 'pending';
  emit();
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      if (state.force.locationDenied) { state.geo.status = 'denied'; emit(); return; }
      const area = nearestArea(pos.coords.latitude, pos.coords.longitude);
      // Only the area id is kept. The coordinate is dropped here.
      if (!area) { state.geo.status = 'denied'; emit(); return; }
      state.geo = { status: 'ok', area: area.id, accuracy: Math.max(10, Math.round((pos.coords.accuracy || 30) / 10) * 10) };
      if (!state.signup.area) { state.signup.area = area.id; state.signup.gov = area.gov; }
      emit();
    },
    () => { state.geo.status = 'denied'; emit(); },
    { enableHighAccuracy: false, timeout: 10000, maximumAge: 60000 },
  );
}

// ---------- Titles ----------
// Season 1 titles as the J boards show them. A title only exists once three cooks
// compete for it, so every other area shows its titles as locked.
export const TITLES = [
  { kind: 'club', key: 'title.clubChamp', cook: 'salma', area: null },
  { kind: 'area', key: 'title.cook1', cook: 'salma', area: 'Mohandessin' },
  { kind: 'cat', key: 'title.bestMains', cook: 'salma', area: 'Mohandessin' },
  { kind: 'area', key: 'title.cook1', cook: 'hoda', area: 'Dokki' },
];
export const titlesOf = (cookId) => TITLES.filter((x) => x.cook === cookId);
export const cooksIn = (area) => state.cooks.filter((c) => c.area === area);
