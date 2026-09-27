// Every UI string lives here, in English and Arabic. Arabic is taken from the
// reference boards; where a board has no Arabic for a string, `ar` is null,
// the English is shown, and the entry carries a TODO(ar) comment.
import { state } from './store.js';

export const S = {
  // ---------- Shell ----------
  'lang.group': { en: 'Language', ar: null }, // TODO(ar): accessible name only
  back: { en: 'Back', ar: null }, // TODO(ar): accessible name only
  close: { en: 'Close', ar: null }, // TODO(ar): accessible name only
  scroll: { en: 'Scroll for more', ar: 'كمّل لتحت' },
  logo: { en: 'TBKHTY', ar: 'طبختي' },
  masters: { en: 'TBKHTY Masters', ar: 'طبختي ماسترز' },
  tagline: { en: "Egypt's home cooking competition", ar: 'مسابقة الطبخ البيتي في مصر' },
  closes: { en: 'Voting closes in 2d 14h', ar: 'التصويت يقفل خلال يومين و14 ساعة' },
  closesShort: { en: '2d 14h left', ar: null }, // TODO(ar)
  closesFri: { en: 'Voting closes Friday, 6 PM', ar: 'التصويت يقفل الجمعة 6 مساءً' },
  closedBand: { en: 'Online voting closed Friday 6 PM', ar: 'التصويت اتقفل' },
  votingClosed: { en: 'Voting closed', ar: 'التصويت اتقفل' },
  seeResults: { en: 'See the results', ar: 'شوف النتايج' },
  votes: { en: 'VOTES', ar: 'صوت' },
  votesLower: { en: '{n} votes', ar: '{n} صوت' },
  vote: { en: 'Vote', ar: 'صوّت' },
  voted: { en: 'Voted', ar: 'صوّتت' },
  follow: { en: 'Follow', ar: null }, // TODO(ar)
  following: { en: 'Following', ar: null }, // TODO(ar)
  followName: { en: 'Follow {name}', ar: null }, // TODO(ar): accessible name only
  shareEntry: { en: 'Share this entry', ar: null }, // TODO(ar): accessible name only
  share: { en: 'Share', ar: null }, // TODO(ar): accessible name only
  required: { en: 'Required', ar: 'مطلوب' },
  optional: { en: 'Optional', ar: 'اختياري' },
  cont: { en: 'Continue', ar: 'كمّل' },
  sponsor: { en: '[SPONSOR]', ar: '[الراعي]' },
  clubSponsor: { en: '[CLUB SPONSOR]', ar: null }, // TODO(ar): placeholder stays bracketed
  cta: { en: '[CTA]', ar: '[إجراء]' },
  by: { en: 'BY', ar: null }, // TODO(ar)
  edition: { en: 'Shooting Club Edition', ar: 'نسخة نادي الصيد' },
  rankIn: { en: '#{n} in Shooting Club Edition', ar: '#{n} · نسخة نادي الصيد' },
  rankDot: { en: '#{n} · {club}', ar: '#{n} · {club}' },
  newEntry: { en: 'New entry', ar: null }, // TODO(ar)
  live: { en: 'Live', ar: 'شغالة' },
  toastDemo: { en: 'Demo only: nothing was sent.', ar: null }, // TODO(ar): demo notice
  toastCopied: { en: 'Link copied. Demo only: nothing was sent.', ar: null }, // TODO(ar): demo notice
  toastSaved: { en: 'Saved.', ar: null }, // TODO(ar)
  navMain: { en: 'Main', ar: null }, // TODO(ar): accessible name only
  // ---------- A0 Welcome ----------
  'a0.title': { en: 'Who cooks the best\nfood in your area?', ar: 'مين أحسن طباخ في منطقتك؟' },
  'a0.lede': { en: 'Your neighbours cook. Your neighbours vote.', ar: 'جيرانك بيطبخوا، وجيرانك بيصوّتوا.' },
  'a0.free': { en: 'Free', ar: 'ببلاش' },
  'a0.noapp': { en: 'No app to download', ar: 'من غير ما تنزّل تطبيق' },
  'a0.twomin': { en: '2 minutes', ar: 'دقيقتين' },
  'a0.s1': { en: 'A cook enters\none dish', ar: 'طباخ بيدخل\nطبق واحد' },
  'a0.s2': { en: 'Neighbours\nvote free', ar: 'الجيران\nبيصوتوا ببلاش' },
  'a0.s3': { en: 'The best\ncook wins', ar: 'أحسن طباخ\nبيكسب' },
  'a0.which': { en: 'Which one are you?', ar: 'انت مين فيهم؟' },
  'a0.cook': { en: 'I cook', ar: 'أنا بطبخ' },
  'a0.cookWin': { en: 'Win prizes and a title that stays on your profile', ar: 'جوايز ولقب يفضل على صفحتك' },
  'a0.vote': { en: 'I want to vote', ar: 'عايز أصوّت' },
  'a0.voteWin': { en: 'Free, and you go into the [SPONSOR] draw', ar: 'ببلاش، وتدخل سحب [الراعي]' },
  'a0.know': { en: 'I know a cook', ar: 'أعرف طباخ' },
  'a0.knowWin': { en: 'If they reach the top 3, you win too', ar: 'لو وصل لأحسن 3، تكسب معاه' },
  'a0.rank': { en: 'See the rankings', ar: 'شوف الترتيب' },
  'a0.how': { en: 'How it works', ar: 'إزاي بتشتغل' },
  // ---------- A1 Home ----------
  'a1.annCap': { en: 'ANNOUNCEMENT', ar: 'إعلان' },
  'a1.annTitle': { en: 'Shooting Club\ncloses in 2d 14h', ar: 'نادي الصيد\nبيقفل خلال يومين' },
  'a1.annSub': { en: 'Vote before Friday, 6 PM', ar: 'صوّت قبل الجمعة 6 مساءً' },
  'a1.voteNow': { en: 'Vote now', ar: 'صوّت دلوقتي' },
  'a1.sponsoredCap': { en: 'SPONSORED', ar: 'إعلان ممول' },
  'a1.bannerSlot': { en: 'Banner slot', ar: 'مساحة إعلانية' },
  'a1.voteFav': { en: 'Vote for your favourite cook', ar: 'صوّت لأحلى طباخ' },
  'a1.signup': { en: 'Sign up as a cook to compete', ar: 'سجّل كطباخ وتنافس' },
  'a1.nominate': { en: 'Nominate a cook you know', ar: 'رشّح طباخ تعرفه' },
  'a1.nomSub': { en: 'If she reaches the top 3, you win too', ar: 'لو وصل لأحسن 3، تكسب معاه' },
  'a1.newHere': { en: 'New here? How the competition works', ar: 'أول مرة؟ إزاي المسابقة شغالة' },
  'a1.howComp': { en: 'How the competition works', ar: 'إزاي المسابقة شغالة' },
  'a1.findCook': { en: 'Find a cook', ar: 'دوّر على طباخ' },
  'a1.topCooks': { en: 'Top cooks in Egypt', ar: 'أحسن الطباخين في مصر' },
  'a1.topSub': { en: 'Across every edition, updated live', ar: 'من كل النسخ، بيتحدّث لحظة بلحظة' },
  'a1.fAll': { en: 'All Egypt', ar: 'كل مصر' },
  'a1.fArea': { en: 'By area', ar: 'حسب المنطقة' },
  'a1.fClub': { en: 'By club', ar: 'حسب النادي' },
  'a1.fDish': { en: 'By dish', ar: 'حسب الطبق' },
  'a1.full': { en: 'Full leaderboard', ar: 'الترتيب الكامل' },
  'a1.titles': { en: 'Area titles', ar: 'الألقاب' },
  'a1.choose': { en: 'Choose a competition', ar: 'اختار المسابقة' },
  'a1.chooseSub': { en: 'Tap one to vote in it or enter it', ar: 'ادخل على أي واحدة' },
  'a1.closesIn': { en: 'Closes in 2d 14h', ar: 'بيقفل خلال يومين' },
  'a1.cooksVotes': { en: '{c} cooks · {v} votes', ar: '{c} طباخ · {v} صوت' },
  // ---------- A2 Club edition home ----------
  'a2.all': { en: 'All competitions', ar: null }, // TODO(ar)
  'a2.editionOf': { en: '{club} Edition', ar: 'نسخة {club}' },
  'a2.tasting': { en: 'Live tasting,\nFriday 2 October', ar: null }, // TODO(ar)
  'a2.tastingSub': { en: 'Garden Terrace · 6:00 PM', ar: 'تراس الحديقة · 6 مساءً' },
  'a2.calendar': { en: 'Add to calendar', ar: null }, // TODO(ar)
  'a2.clubBanner': { en: 'Club banner slot', ar: 'مساحة إعلانية' },
  'a2.voteIn': { en: 'Vote in this edition', ar: 'صوّت في النسخة دي' },
  'a2.placed': { en: 'Cooks enter once from the home screen. We place you in the editions your area and club qualify you for.', ar: null }, // TODO(ar)
  'a2.neighbours': { en: '142 neighbours voted today', ar: '142 جار صوّتوا النهاردة' },
  'a2.top3': { en: 'Top 3 right now', ar: 'الترتيب دلوقتي' },
  'a2.seeAll': { en: 'See all {n} competitors', ar: null }, // TODO(ar)
  'a2.noEntries': { en: 'The sample data only holds the Shooting Club entries.', ar: null }, // TODO(ar): demo notice
  // ---------- A3 How the competition works ----------
  'a3.title': { en: 'How the competition works', ar: 'إزاي المسابقة شغالة' },
  'a3.forCooks': { en: 'For cooks', ar: 'للطباخين' },
  'a3.forVoters': { en: 'For voters', ar: 'للمصوتين' },
  'a3.c1': { en: 'Enter', ar: 'اشترك' },
  'a3.c1s': { en: 'Photo + dish, 2 minutes', ar: null }, // TODO(ar)
  'a3.c2': { en: 'Share', ar: 'اشير' },
  'a3.c2s': { en: 'Your link to family and club', ar: null }, // TODO(ar)
  'a3.c3': { en: 'Cook', ar: 'اطبخي' },
  'a3.c3s': { en: '40 portions on tasting day', ar: null }, // TODO(ar)
  'a3.v1': { en: 'Vote daily', ar: 'صوّت يومياً' },
  'a3.v1s': { en: 'One vote every day', ar: null }, // TODO(ar)
  'a3.v2': { en: 'Share', ar: 'اشير' },
  'a3.v2s': { en: 'Bring your neighbours in', ar: null }, // TODO(ar)
  'a3.v3': { en: 'Taste live', ar: 'دوق وصوّت' },
  'a3.v3s': { en: 'One live vote at the club', ar: null }, // TODO(ar)
  'a3.decided': { en: 'How the winner is decided', ar: 'إزاي بنختار الفائزة' },
  'a3.judges': { en: 'Judges 40%', ar: 'لجنة التحكيم 40%' },
  'a3.tasting': { en: 'Live tasting votes 30%', ar: 'تصويت التذوق 30%' },
  'a3.online': { en: 'Online community votes 30%', ar: 'تصويت الجمهور 30%' },
  'a3.sealed': { en: 'Online votes are live. Judges and tasting scores stay sealed until the ceremony.', ar: 'درجات اللجنة والتذوق مقفولة لحد الحفل.' },
  'a3.win': { en: 'What you win', ar: 'الجوايز' },
  'a3.grand': { en: 'Grand prize from [SPONSOR]', ar: 'جايزة كبرى من [الراعي]' },
  'a3.badge': { en: 'TBKHTY Verified eCook badge', ar: 'شارة طباخة موثقة' },
  'a3.final': { en: 'Your place in the City Grand Final', ar: 'مكانك في نهائي القاهرة' },
  'a3.signup': { en: 'Sign up as a cook to compete', ar: 'سجّل كطباخ وتنافس' },
  'a3.justVote': { en: 'Just here to vote? Start voting', ar: null }, // TODO(ar)
  // ---------- E1 Feed ----------
  'e1.cooks': { en: '{n} cooks', ar: '{n} طباخ' },
  'e1.change': { en: 'Change edition', ar: 'غيّر' },
  'e1.fAll': { en: 'All', ar: 'الكل' },
  'e1.fTrend': { en: 'Trending today', ar: 'الأكثر رواجاً' },
  'e1.fMains': { en: 'Mains', ar: 'رئيسي' },
  'e1.fSweets': { en: 'Sweets', ar: 'حلو' },
  'e1.fBaked': { en: 'Baked', ar: 'مخبوزات' },
  'nav.vote': { en: 'Vote', ar: 'صوّت' },
  'nav.find': { en: 'Find a cook', ar: 'دوّر' },
  'nav.me': { en: 'Me', ar: 'حسابي' },
  // ---------- E2 Entry detail ----------
  'e2.voteFor': { en: 'Vote for {name}', ar: 'صوّت ل{name}' },
  'e2.oneVote': { en: 'One vote a day, for one cook', ar: 'صوت واحد في اليوم' },
  'e2.notified': { en: 'Get notified when her kitchen opens', ar: 'هنبلغك لما مطبخها يفتح' },
  'e2.order': { en: "I'd order this", ar: 'كنت هطلب ده' },
  'e2.other': { en: 'Her other dishes', ar: 'أطباقها التانية' },
  'e2.competing': { en: 'competing for', ar: null }, // TODO(ar)
  'e2.titleArea': { en: '#1 Cook · {area}', ar: 'الأولى في {area}' },
  'stat.votes': { en: 'VOTES', ar: 'صوت' },
  'stat.rank': { en: 'RANK', ar: 'ترتيبك' },
  'stat.followers': { en: 'FOLLOWERS', ar: null }, // TODO(ar)
  'dish.mahshi': { en: 'Mahshi', ar: 'محشي' },
  'dish.basbousa': { en: 'Basbousa', ar: null }, // TODO(ar)
  'dish.koshari': { en: 'Koshari', ar: 'كشري' },
  // ---------- E3 Verify to vote ----------
  'e3.has': { en: '{name} has your vote', ar: null }, // TODO(ar)
  'e3.confirm': { en: 'Confirm your number so it counts. Takes 20 seconds.', ar: 'أكّد رقمك عشان الصوت يتحسب. 20 ثانية.' },
  'e3.wa': { en: 'WhatsApp number', ar: 'رقم الواتساب' },
  'e3.code': { en: 'Code from WhatsApp', ar: 'الكود' },
  'e3.name': { en: 'Your name', ar: 'اسمك' },
  'e3.nameNote': { en: 'Shown to the cook as one of her supporters', ar: null }, // TODO(ar)
  'e3.loc': { en: 'Your location', ar: 'موقعك' },
  'e3.locOk': { en: 'Location confirmed', ar: null }, // TODO(ar)
  'e3.update': { en: 'Update', ar: null }, // TODO(ar)
  'e3.locNote': { en: 'One tap. You confirm the area itself on the next screen.', ar: 'ضغطة واحدة. هتأكّد المنطقة في الشاشة اللي بعدها.' },
  'e3.consent': { en: 'Your number is used only to keep votes real. One vote a day, for one cook.', ar: null }, // TODO(ar)
  'e3.confirmVote': { en: 'Confirm my vote', ar: 'أكّد صوتي' },
  'e3.notNow': { en: 'Not now', ar: null }, // TODO(ar)
  'e3.needPhone': { en: 'Enter your WhatsApp number.', ar: null }, // TODO(ar)
  'e3.needCode': { en: 'Enter the 4 digits.', ar: null }, // TODO(ar)
  'e3.needArea': { en: 'Pick your area.', ar: null }, // TODO(ar)
  'e3.codeHint': { en: 'Demo: any 4 digits work. No message is sent.', ar: null }, // TODO(ar): demo notice
  'code.aria': { en: '4-digit code', ar: null }, // TODO(ar): accessible name only
  // K3: wrong code
  'k3.wrongCode': { en: 'That code is wrong or expired. 2 tries left.', ar: 'الكود غلط أو انتهى. فاضل محاولتين.' },
  'k3.newCode': { en: 'Send a new code', ar: 'ابعت كود جديد' },
  'k3.waHelp': { en: 'Get help on WhatsApp', ar: null }, // TODO(ar)
  // K3: offline
  'k3.offline': { en: "You're offline", ar: 'مفيش انترنت' },
  'k3.offlineBody': { en: 'Your vote is saved on this phone and will be sent the moment you are back.', ar: 'صوتك محفوظ على الموبايل وهيتبعت أول ما النت يرجع.' },
  // ---------- E4 Vote confirmed ----------
  'e4.youVoted': { en: 'You voted for\n{name}', ar: 'صوّتك راح ل{name}' },
  'e4.nowRank': { en: "She's now {ord}", ar: null }, // TODO(ar)
  'e4.nowRankAt': { en: "She's now {ord} in Shooting Club Edition", ar: null }, // TODO(ar)
  'e4.streak1': { en: 'Day {n} streak started', ar: 'بدأت سلسلة التصويت · ارجع بكرة تكمّل' },
  'e4.badgeAt': { en: 'Day 5 = badge', ar: null }, // TODO(ar)
  'e4.raffle': { en: "Two quick things and you're in the [SPONSOR] raffle", ar: 'جاوب 3 أسئلة سريعة وادخل سحب [الراعي]' },
  'e4.answer': { en: 'Answer them', ar: null }, // TODO(ar)
  'e4.raffleDone': { en: "You're in the [SPONSOR] raffle", ar: null }, // TODO(ar)
  'e4.share': { en: 'Share to help her win', ar: 'اشير عشان تكسب' },
  'e4.again': { en: 'Vote again tomorrow', ar: null }, // TODO(ar)
  // ---------- E5 Quick profile ----------
  'e5.step': { en: '1 OF 2', ar: null }, // TODO(ar)
  'e5.title': { en: 'Which area do\nyou vote from?', ar: 'بتصوّت من أي منطقة؟' },
  'e5.read': { en: 'We read your location as {area}', ar: 'قرينا موقعك على {area}' },
  'e5.gov': { en: 'Governorate', ar: 'المحافظة' },
  'e5.area': { en: 'Area', ar: 'المنطقة' },
  'e5.why': { en: 'This is how cooks near you get found, and how your area gets its own ranking. It is never shown next to your name.', ar: 'كده الطباخين اللي جمبك بيتلاقوا، ومنطقتك بياخد ترتيب لوحده. مش بيظهر جنب اسمك.' },
  'e5.optional': { en: 'And one optional question', ar: null }, // TODO(ar)
  'e5.q': { en: 'How often do you buy food from outside home each week?', ar: 'بتطلبوا أكل من بره البيت كام مرة في الأسبوع؟' },
  'e5.r1': { en: 'Rarely', ar: 'نادراً' },
  'e5.r2': { en: '1 to 2 times', ar: 'مرة أو اتنين' },
  'e5.r3': { en: '3 to 5 times', ar: '3 لـ 5 مرات' },
  'e5.r4': { en: 'Almost every day', ar: 'كل يوم تقريباً' },
  'e5.finish': { en: "Finish and you're in the [SPONSOR] raffle", ar: 'كمّل وتدخل سحب [الراعي]' },
  'e5.save': { en: 'Save and finish', ar: 'احفظ وخلّص' },
  // ---------- E6 Already voted ----------
  'e6.title': { en: "You've voted today", ar: 'صوّتّ النهاردة' },
  'e6.until': { en: 'until your next vote', ar: 'لحد ما تقدر تصوّت تاني' },
  'e6.streak': { en: '{n}-day voting streak', ar: '{n} أيام تصويت ورا بعض' },
  'e6.badge7': { en: 'Day 7 = badge', ar: null }, // TODO(ar)
  'e6.shareInstead': { en: 'Share instead to help {name}', ar: 'اشير عشان تساعد {name}' },
  'e6.others': { en: 'Other cooks to follow', ar: 'طباخين تانيين' },
  // ---------- E7 Supporter profile ----------
  'e7.since': { en: 'Shooting Club · Supporter since 12 Sep', ar: 'داعمة من 12 سبتمبر' },
  'e7.badges': { en: 'Badges earned', ar: 'الشارات' },
  'e7.bFirst': { en: 'First voter', ar: 'أول مصوّت' },
  'e7.bTop': { en: 'Top supporter', ar: 'أكبر داعم' },
  'e7.b5': { en: '5-day streak', ar: '5 أيام' },
  'e7.bScout': { en: 'Talent Scout', ar: 'كشّاف مواهب' },
  'e7.shares': { en: 'Your shares brought 14 votes', ar: 'مشاركاتك جابت 14 صوت' },
  'e7.plus': { en: '+{n} votes', ar: '+{n} صوت' },
  'e7.nominated': { en: 'You nominated {n} cooks', ar: 'رشحتي {n} طباخين' },
  'e7.inTop10': { en: '{n} in the top 10', ar: null }, // TODO(ar)
  'e7.raffle': { en: '{n} entries in the [SPONSOR] raffle', ar: '{n} فرص في سحب [الراعي]' },
  'e7.draw': { en: 'Draw 2 Oct', ar: null }, // TODO(ar)
  'e7.follow': { en: 'Cooks you follow', ar: null }, // TODO(ar)
  'e7.season': { en: 'Your season so far', ar: null }, // TODO(ar)
  'e7.seasonSub': { en: 'Votes cast, cooks backed, raffle', ar: null }, // TODO(ar)
  'e7.noFollows': { en: 'Tap Follow on a cook to see them here.', ar: null }, // TODO(ar)
  // ---------- E8 Search ----------
  'e8.title': { en: 'Find a cook', ar: 'دوّر على طباخ' },
  'e8.ph': { en: 'Name, dish or area', ar: null }, // TODO(ar)
  'e8.clear': { en: 'Clear', ar: null }, // TODO(ar): accessible name only
  'e8.match': { en: '{n} cooks match “{q}”', ar: '{n} نتائج' },
  'e8.all': { en: 'Top cooks in Egypt', ar: 'أحسن الطباخين في مصر' },
  'e8.try': { en: 'Try', ar: null }, // TODO(ar)
  'e8.mName': { en: 'NAME', ar: null }, // TODO(ar)
  'e8.mDish': { en: 'DISH', ar: null }, // TODO(ar)
  'e8.mArea': { en: 'AREA', ar: null }, // TODO(ar)
  'e8.covers': { en: 'Search covers every live edition, so you can find a cook before you know which club she is in.', ar: 'البحث في كل النسخ، فتلاقي الطباخة من غير ما تعرف ناديها' },
  // K3: search empty
  'k3.noCook': { en: 'No cook called\n“{q}” yet', ar: 'مفيش طباخة بالاسم ده' },
  'k3.noCookBody': { en: 'Try a dish or an area instead, or nominate her so she enters.', ar: null }, // TODO(ar)
  'k3.nominate': { en: 'Nominate a cook', ar: 'رشّح طباخة' },
  'e7.sampleName': { en: 'Nadia H.', ar: null }, // sample supporter from the E7 board; a name, not copy
  'e8.t1': { en: 'Mohandessin', ar: 'المهندسين' },
  'e8.t2': { en: 'Molokhia', ar: 'ملوخية' },
  'e8.t3': { en: 'Fatta', ar: 'فتة' },
  'e8.t4': { en: 'Shooting Club', ar: 'نادي الصيد' },
  'e8.t5': { en: 'Dokki', ar: 'الدقي' },
  // ---------- B1 Intro ----------
  'b1.cooking': { en: 'COOKING', ar: null }, // TODO(ar): poster word
  'b1.competition': { en: 'COMPETITION', ar: null }, // TODO(ar): poster word
  'b1.show': { en: 'Show us your dish.\nGet the votes. ', ar: 'وري أكلك، هات الأصوات، واكسب' },
  'b1.win': { en: 'Win big.', ar: null }, // TODO(ar): folded into the line above in Arabic
  'b1.real1': { en: 'REAL COOKS', ar: null }, // TODO(ar)
  'b1.real2': { en: 'REAL TALENT', ar: null }, // TODO(ar)
  'b1.real3': { en: 'REAL PRIZES', ar: null }, // TODO(ar)
  'b1.easy': { en: "IT'S EASY TO JOIN", ar: 'الاشتراك سهل' },
  'b1.s1': { en: 'COOK', ar: 'اطبخ' },
  'b1.s1s': { en: 'Your best dish,\nat home.', ar: null }, // TODO(ar)
  'b1.s2': { en: 'SNAP', ar: 'صوّر' },
  'b1.s2s': { en: 'One clear\nphoto is enough.', ar: null }, // TODO(ar)
  'b1.s3': { en: 'SHARE', ar: 'شارك' },
  'b1.s3s': { en: 'Send it round.\nVotes come in.', ar: null }, // TODO(ar)
  'b1.s4': { en: 'WIN', ar: 'اكسب' },
  'b1.s4s': { en: 'Top dishes take\nthe prizes.', ar: null }, // TODO(ar)
  'b1.playing': { en: 'WHAT YOU ARE PLAYING FOR', ar: 'بتلعب على إيه' },
  'b1.p1': { en: 'Prizes and a place in the City Grand Final', ar: 'جوايز ونهائي القاهرة' },
  'b1.p2': { en: 'A title that stays on your profile', ar: 'لقب يفضل على بروفايلك' },
  'b1.twoMin': { en: 'Signing up takes 2 minutes. No forms later.', ar: null }, // TODO(ar)
  'b1.already': { en: '{n} cooks have already entered', ar: '{n} طباخ دخلوا' },
  'b1.enter': { en: 'Enter now', ar: 'اشترك دلوقتي' },
  'b1.help': { en: 'Prefer help? Send us your entry on WhatsApp', ar: null }, // TODO(ar)
  // ---------- B2 Verify ----------
  'step': { en: 'Step {n} of 5', ar: 'خطوة {n} من 5' },
  'b2.title': { en: 'Verify your number', ar: 'أكّد رقم الواتساب بتاعك' },
  'b2.send': { en: 'Send code via WhatsApp', ar: 'ابعت الكود على واتساب' },
  'b2.sent': { en: 'Demo: no message is sent. Type any 4 digits.', ar: null }, // TODO(ar): demo notice
  'b2.enter4': { en: 'ENTER THE 4 DIGITS', ar: null }, // TODO(ar)
  'b2.resend': { en: 'Resend code in 0:{s}', ar: 'إعادة الإرسال بعد 0:{s}' },
  'b2.consent': { en: 'I agree TBKHTY can contact me on WhatsApp about the competition.', ar: 'موافق إن طبختي تكلمني على واتساب بخصوص المسابقة. رقمك بيستخدم بس عشان نتأكد إن التصويت حقيقي.' },
  'b2.consent2': { en: 'Your number is only used to keep votes real. We never sell it and never post it.', ar: null }, // TODO(ar): covered by the Arabic line above
  'b2.needConsent': { en: 'Tick the box to agree before you continue.', ar: null }, // TODO(ar)
  'b2.verified': { en: 'Number verified', ar: null }, // TODO(ar)
  // ---------- B3 About you ----------
  'b3.title': { en: 'You and where\nyou cook', ar: 'انت وبتطبخ منين' },
  'b3.name': { en: 'Your name', ar: 'اسمك' },
  'b3.photo': { en: 'Your photo', ar: 'صورتك' },
  'b3.addPhoto': { en: 'Add your photo', ar: null }, // TODO(ar): accessible name only
  'b3.photoWhy': { en: 'Voters recognise a face faster than a name. It sits on your entry and your profile.', ar: 'الناس بتعرف الوش أسرع من الاسم. بتظهر على مشاركتك وصفحتك.' },
  'b3.where': { en: 'Where do you live and cook?', ar: 'ساكن وبتطبخ فين؟' },
  'b3.drop': { en: 'Drop your pin', ar: 'حدد موقعك بالدبوس' },
  'b3.accuracy': { en: 'Accurate to about {m} m', ar: 'دقة حوالي {m} متر' },
  'b3.dropped': { en: 'Pin dropped', ar: 'الدبوس اتحدد' },
  'b3.move': { en: 'Move pin', ar: 'حرّك الدبوس' },
  'b3.pinWhy': { en: 'The pin is only used to work out your area and which club editions you can enter. You confirm the area yourself on the next step.', ar: 'الدبوس بنستخدمه عشان نعرف منطقتك والنوادي اللي تقدر تدخلها بس، وهتأكّد المنطقة بنفسك في الخطوة اللي جاية.' },
  'b3.locating': { en: 'Reading your location…', ar: null }, // TODO(ar)
  'b3.needName': { en: 'Add your name so voters know who cooked it.', ar: null }, // TODO(ar)
  // K3: location denied
  'k3.locDenied': { en: "We can't read\nyour location", ar: 'مش قادرين نحدد موقعك' },
  'k3.locBody': { en: 'No problem. Pick your governorate and area from the list instead, and you can add the pin later.', ar: null }, // TODO(ar)
  'k3.pickArea': { en: 'Pick my area from the list', ar: 'اختار منطقتي' },
  // K3: upload failed
  'k3.uploadStopped': { en: 'Upload stopped', ar: 'الصورة مرفعتش' },
  'k3.tooBig': { en: '{mb} MB · over the 10 MB limit', ar: null }, // TODO(ar)
  'k3.tryAgain': { en: 'Try again', ar: 'جرّب تاني' },
  'k3.another': { en: 'Pick another photo', ar: 'صورة تانية' },
  // ---------- B3a Area picker ----------
  'b3a.title': { en: 'Your area', ar: 'منطقتك' }, // Arabic from B3d's heading
  'b3a.search': { en: 'Search areas and compounds', ar: null }, // TODO(ar)
  'b3a.searchShort': { en: 'Search areas', ar: 'دوّر' },
  'b3a.gov': { en: 'GOVERNORATE', ar: 'المحافظة' },
  'b3a.areasIn': { en: 'AREAS IN {gov}', ar: 'مناطق {gov}' },
  'b3a.compounds': { en: '4 compounds', ar: null }, // TODO(ar)
  'b3a.notListed': { en: 'My area is not on the list', ar: null }, // TODO(ar)
  'b3a.notListedToast': { en: 'Demo: this would open a free-text field for the team to add it.', ar: null }, // TODO(ar): demo notice
  'b3a.confirm': { en: 'Confirm {gov} · {area}', ar: 'أكّد {gov} · {area}' },
  'b3a.confirmGov': { en: 'Confirm {gov}', ar: 'أكّد {gov}' },
  'b3a.none': { en: 'No area matches that search.', ar: null }, // TODO(ar)
  // ---------- B3b Drop pin ----------
  'b3b.title': { en: 'Drop your pin', ar: 'حرّك الدبوس' },
  'b3b.drag': { en: 'Drag the pin to\nyour building', ar: 'حرّك الدبوس على عمارتك' },
  'b3b.gps': { en: '{gov} · set from your GPS, adjust if it is off', ar: null }, // TODO(ar)
  'b3b.never': { en: 'Your pin is never shown to voters or to other cooks. It decides which area and which club editions you are placed in, and nothing else.', ar: 'الدبوس مش بيظهر لحد. بنستخدمه عشان نحطك في المنطقة والنادي الصح بس.' },
  'b3b.confirm': { en: 'Confirm this pin', ar: 'أكّد الدبوس' },
  'b3b.cancel': { en: 'Cancel', ar: null }, // TODO(ar)
  'b3b.zoom': { en: 'Zoom in', ar: null }, // TODO(ar): accessible name only
  'b3b.recentre': { en: 'Centre on my location', ar: null }, // TODO(ar): accessible name only
  // ---------- B3d Area and club ----------
  'b3d.title': { en: 'Your area and club', ar: 'منطقتك وناديك' },
  'b3d.read': { en: 'We read your pin as {area}. Change it below if that is wrong.', ar: 'قرينا الدبوس على {area}. غيّرها تحت لو مش صح.' },
  'b3d.manual': { en: 'Pick your governorate and area below.', ar: null }, // TODO(ar)
  'b3d.browse': { en: 'Browse the full list or add a compound', ar: null }, // TODO(ar)
  'b3d.club': { en: 'Your club', ar: 'ناديك · اختياري' },
  'b3d.clubNote': { en: 'Separate from where you live. Members and neighbours both compete.', ar: 'مستقل عن مكان سكنك. الأعضاء والجيران بيتنافسوا.' },
  'b3d.two': { en: 'These answers put you in 2 rankings', ar: 'في ترتيبين' },
  'b3d.one': { en: 'These answers put you in 1 ranking', ar: null }, // TODO(ar)
  'b3d.areaRank': { en: '{area} area', ar: null }, // TODO(ar)
  'b3d.fromArea': { en: 'from your area', ar: null }, // TODO(ar)
  'b3d.fromClub': { en: 'from your club', ar: null }, // TODO(ar)
  'b3d.never': { en: 'You never pick a competition. We place you from what you entered.', ar: 'مش هتختار مسابقة. بنحطك حسب بياناتك.' },
  'b3d.how': { en: 'How the two rankings work', ar: null }, // TODO(ar)
  'b3d.needArea': { en: 'Pick your area to continue.', ar: null }, // TODO(ar)
  // ---------- B4 Dish ----------
  'b4.title': { en: 'Your signature dish', ar: 'طبقك المميز' },
  'b4.name': { en: 'Dish name', ar: 'اسم الطبق' },
  'b4.photo': { en: 'One photo of the dish', ar: 'صورة واحدة للطبق' },
  'b4.change': { en: 'Change', ar: null }, // TODO(ar)
  'b4.add': { en: 'Add a photo', ar: null }, // TODO(ar)
  'b4.tip1': { en: 'Daylight, no flash', ar: null }, // TODO(ar)
  'b4.tip2': { en: 'Shot from above', ar: null }, // TODO(ar)
  'b4.tip3': { en: 'Fill the frame', ar: null }, // TODO(ar)
  'b4.story': { en: 'Your story', ar: 'حكايتك' },
  'b4.plenty': { en: '2 lines is plenty', ar: 'سطرين كفاية' },
  'b4.category': { en: 'Category', ar: 'التصنيف' },
  'cat.mains': { en: 'Mains', ar: 'أطباق رئيسية' },
  'cat.baked': { en: 'Baked', ar: 'مخبوزات' },
  'cat.sweets': { en: 'Sweets', ar: 'حلويات' },
  'cat.mezze': { en: 'Mezze', ar: 'مقبلات' },
  'b4.needDish': { en: 'Add the name of your dish.', ar: null }, // TODO(ar)
  // ---------- B5 Preview ----------
  'b5.title': { en: 'This is how neighbours\nwill see you', ar: 'كده جيرانك هيشوفوا مشاركتك' },
  'b5.ranked': { en: 'Your rank appears once voting starts. You will be ranked twice: in the Shooting Club Edition and in {area}.', ar: 'ترتيبك هيظهر أول ما التصويت يبدأ. هتترتبي في نسخة نادي الصيد وفي {area}.' },
  'b5.great': { en: 'Looks great', ar: null }, // TODO(ar)
  'b5.edit': { en: 'Edit', ar: null }, // TODO(ar)
  'b5.submit': { en: 'Submit my entry', ar: 'سجّل مشاركتي' },
  // ---------- B6 Success ----------
  'b6.in': { en: "You're in!", ar: 'تم تسجيلك!' },
  'b6.two': { en: "You're in 2 competitions", ar: 'دخلتي 2 مسابقة' },
  'b6.competitor': { en: 'competitor #{n}', ar: null }, // TODO(ar)
  'b6.cooksN': { en: '{n} cooks', ar: '{n} طباخ' },
  'b6.firstHour': { en: 'Cooks who share in the first hour get 3x more votes', ar: 'اللي بتشير في أول ساعة بتاخد 3 أضعاف الأصوات' },
  'b6.first': { en: 'Get your first votes', ar: 'هات أول أصواتك' },
  'b6.dash': { en: 'Go to my dashboard', ar: null }, // TODO(ar)
  // ---------- D1 Dashboard ----------
  'd1.rank': { en: 'RANK', ar: 'ترتيبك' },
  'd1.total': { en: 'TOTAL VOTES', ar: 'إجمالي الأصوات' },
  'd1.today': { en: 'TODAY', ar: 'النهاردة' },
  'd1.behind': { en: "You're {n} votes behind {name} for {ord} place", ar: 'فاضل {n} صوت توصلي للمركز {pos}' },
  'd1.lead': { en: "You're {n} votes ahead of {name}", ar: null }, // TODO(ar)
  'd1.closeGap': { en: 'Share now to close the gap', ar: null }, // TODO(ar)
  'd1.milestone': { en: 'Next milestone', ar: null }, // TODO(ar)
  'd1.ofVotes': { en: '/ {n} votes', ar: null }, // TODO(ar)
  'd1.toGo': { en: '{n} votes to the confetti moment', ar: 'فاضل {n} صوت' },
  'd1.shareGet': { en: 'Share to get votes', ar: 'اشير عشان تجيبي أصوات' },
  'd1.supporters': { en: 'Your top supporters', ar: 'أكتر ناس بتدعمك' },
  'd1.sup1': { en: 'Shared 4 times on WhatsApp', ar: null }, // TODO(ar)
  'd1.sup2': { en: 'Shared to his status', ar: null }, // TODO(ar)
  'd1.sup3': { en: 'Shared to Instagram', ar: null }, // TODO(ar)
  'd1.seeAll': { en: 'See all 26 supporters', ar: null }, // TODO(ar)
  'd1.noSupporters': { en: 'Supporters appear here once people vote for you.', ar: null }, // TODO(ar)
  'd1.season': { en: 'Your season so far', ar: null }, // TODO(ar)
  'd1.seasonSub': { en: 'Votes, supporters, days in the top 5', ar: null }, // TODO(ar)
  'nav.entry': { en: 'My entry', ar: 'مشاركتي' },
  'nav.kitchen': { en: 'My kitchen', ar: 'مطبخي' },
  'nav.tasting': { en: 'Tasting day', ar: 'يوم التذوق' },
  // K3: ranked 12 of 14
  'k3.beat': { en: 'You beat {n} cooks this week', ar: null }, // TODO(ar)
  'k3.up': { en: 'Up {n} place since Monday', ar: 'طلعت مركز من الاتنين' },
  'k3.down': { en: 'Down {n} place since Monday', ar: null }, // TODO(ar)
  'k3.nearest': { en: 'Nearest cook below: {name}, {n} votes behind you', ar: null }, // TODO(ar)
  'k3.invite1': { en: 'Invite 1 more cook to unlock', ar: null }, // TODO(ar)
  'k3.invite2': { en: 'Invite 2 more cooks to unlock', ar: null }, // TODO(ar)
  'k3.ofThree': { en: '{n} of 3', ar: null }, // TODO(ar)
  'title.bestSweets': { en: 'Best Sweets · {area}', ar: 'أحسن حلو · {area}' },
  'title.bestMolokhia': { en: 'Best Molokhia · {area}', ar: 'أحسن ملوخية · {area}' },
  'title.bestMains': { en: 'Best Mains · {area}', ar: 'أحسن طبق رئيسي · {area}' },
  'title.cook1': { en: '#1 Cook · {area}', ar: 'الأولى في {area}' },
  'title.clubChamp': { en: 'Shooting Club Champion 2026', ar: 'بطلة نادي الصيد 2026' },
  // ---------- D2 Share card ----------
  'd2.title': { en: 'Share card', ar: null }, // TODO(ar)
  'd2.yours': { en: 'Your share card', ar: 'كارت المشاركة بتاعك' },
  'd2.theirs': { en: 'Share card', ar: null }, // TODO(ar)
  'd2.voteMe': { en: 'Vote for me in\nTBKHTY Masters', ar: 'صوّتوا لي في طبختي ماسترز' },
  'd2.voteHer': { en: 'Vote for {name} in\nTBKHTY Masters', ar: null }, // TODO(ar)
  'd2.rank': { en: 'Rank {n}', ar: null }, // TODO(ar)
  'd2.wa': { en: 'WhatsApp', ar: 'واتساب' },
  'd2.status': { en: 'WhatsApp Status', ar: 'حالة واتساب' },
  'd2.insta': { en: 'Instagram Story', ar: 'ستوري انستجرام' },
  'd2.copy': { en: 'Copy link', ar: 'انسخ اللينك' },
  'd2.last': { en: 'Your last share brought 8 votes', ar: 'آخر مشاركة جابتلك 8 أصوات' },
  // ---------- D3 Kitchen ----------
  'd3.ready': { en: 'Your kitchen is {p}% ready for TBKHTY', ar: 'مطبخك جاهز {p}% لطبختي' },
  'd3.answered': { en: '{n} of 7 answered · finish to unlock the Verified eCook badge early', ar: null }, // TODO(ar)
  'd3.q1': { en: 'Other dishes you cook', ar: 'أطباق تانية بتطبخيها' },
  'd3.a1': { en: "Mahshi · Fatta · Basbousa · Roz mo'ammar", ar: null }, // TODO(ar)
  'd3.u1': { en: 'Unlocked: Shooting Club highlight reel', ar: null }, // TODO(ar)
  'd3.q2': { en: 'Days and times you could cook', ar: 'الأيام والمواعيد' },
  'd3.a2': { en: 'Sun, Tue, Thu · 8am to 2pm', ar: null }, // TODO(ar)
  'd3.u2': { en: 'Unlocked: Early kitchen slot', ar: null }, // TODO(ar)
  'd3.q3': { en: 'How far would you send food?', ar: 'توصّلي أكلك لحد فين؟' },
  'd3.from': { en: 'From {area}', ar: null }, // TODO(ar)
  'd3.change': { en: 'change', ar: null }, // TODO(ar)
  'd3.r1': { en: 'My area only', ar: 'منطقتي بس' },
  'd3.r2': { en: 'Up to 5 km', ar: 'لحد 5 كم' },
  'd3.r3': { en: 'Up to 10 km', ar: 'لحد 10 كم' },
  'd3.r4': { en: 'Across Cairo', ar: 'كل القاهرة' },
  'd3.reach': { en: 'This sets the area your food can reach when orders open. {range} from {area} covers {list}.', ar: null }, // TODO(ar)
  'd3.reachOnly': { en: 'This sets the area your food can reach when orders open: {area} only.', ar: null }, // TODO(ar)
  'd3.q4': { en: 'Would you like to sell your food on TBKHTY?', ar: 'تحبي تبيعي على طبختي؟' },
  'd3.q5': { en: 'Portions per day', ar: 'عدد الأطباق في اليوم' },
  'd3.q6': { en: 'Price range for your signature dish', ar: 'سعر طبقك المميز' },
  'd3.q7': { en: 'Where you sell today', ar: 'بتبيعي فين دلوقتي' },
  'd3.yes': { en: 'Yes', ar: null }, // TODO(ar)
  // ---------- D4 Tasting day ----------
  'd4.fri': { en: 'FRI', ar: null }, // TODO(ar)
  'd4.oct': { en: 'OCT', ar: null }, // TODO(ar)
  'd4.live': { en: 'Live tasting · 6:00 PM', ar: null }, // TODO(ar)
  'd4.venue': { en: 'Shooting Club, Garden Terrace', ar: 'نادي الصيد · تراس الحديقة · 6 مساءً' },
  'd4.table': { en: 'YOUR TABLE', ar: null }, // TODO(ar)
  'd4.arrive': { en: 'ARRIVE BY', ar: null }, // TODO(ar)
  'd4.bring': { en: 'What to bring', ar: 'تجيبي إيه' },
  'd4.b1': { en: '40 tasting portions of {dish}', ar: '40 طبق تذوق من {dish}' },
  'd4.b2': { en: 'Your own serving spoons and a ladle', ar: 'معالقك وطبق التقديم' },
  'd4.b3': { en: 'Hot box or cool box (no reheating on site)', ar: 'شنطة حافظة للحرارة (ممنوع التسخين في المكان)' },
  'd4.b4': { en: 'Your ID for the club gate', ar: 'بطاقتك لبوابة النادي' },
  'd4.match': { en: 'Your dish must match your entry photo', ar: 'لازم الطبق يكون نفس اللي في صورة مشاركتك' },
  'd4.gate': { en: 'Enter from the main gate, then left past the pool', ar: null }, // TODO(ar)
  'd4.garden': { en: 'Garden Terrace', ar: 'تراس الحديقة' },
  'd4.mainGate': { en: 'Main gate', ar: null }, // TODO(ar)
  // ---------- C1 Nominate ----------
  'c1.title': { en: 'Nominate a cook', ar: 'رشّح طباخة' },
  'c1.mine': { en: 'My nominations', ar: 'اللي رشحتهم' },
  'c1.know': { en: 'Know an amazing\nhome cook?', ar: 'تعرف طباخة بيتي مميزة؟' },
  'c1.lede': { en: 'We send her a WhatsApp invite with your name on it. She enters in 2 minutes, and you win alongside her.', ar: 'هنبعتلها دعوة على واتساب باسمك. هتشترك في دقيقتين، وتكسب معاها.' },
  'c1.winWhen': { en: 'You win when she does', ar: null }, // TODO(ar)
  'c1.winBody': { en: 'Talent Scout badge as soon as she cooks, [SCOUT PRIZE] if she reaches the top 3.', ar: 'شارة كشّاف المواهب أول ما تطبخ، وجائزة لو وصلت لأحسن 3' },
  'c1.rungs': { en: 'See all four rungs', ar: null }, // TODO(ar)
  'c1.herName': { en: 'Her name', ar: 'اسمها' },
  'c1.herWa': { en: 'Her WhatsApp number', ar: 'رقم واتسابها' },
  'c1.herClub': { en: 'Her club', ar: 'ناديها' },
  'c1.clubNote': { en: 'Leave it as Not a member if you are not sure. She can change it herself.', ar: null }, // TODO(ar)
  'c1.best': { en: 'What does she cook best?', ar: 'بتطبخ إيه أحسن حاجة؟' },
  'c1.yourName': { en: 'Your name', ar: 'اسمك' },
  'c1.see': { en: 'She will see who nominated her', ar: 'هتشوف مين رشحها' },
  'c1.nominate': { en: 'Nominate her', ar: 'رشّحها' },
  'c1.needName': { en: 'Add her name.', ar: null }, // TODO(ar)
  'c1.needWa': { en: 'Add her WhatsApp number so the invite can reach her.', ar: null }, // TODO(ar)
  // ---------- C2 Nomination received ----------
  'c2.title': { en: '3 neighbours at\nShooting Club\nnominated you', ar: '3 جيران في نادي الصيد رشحوكي' },
  'c2.said': { en: 'What they said', ar: 'قالوا إيه' },
  'c2.q2': { en: 'The rokak she sends every Ramadan is unreal.', ar: 'الرقاق اللي بتبعته كل رمضان تحفة.' },
  'c2.q3': { en: 'She fed half the building last Eid.', ar: 'عزمت نص العمارة العيد اللي فات.' },
  'c2.q1': { en: 'Her bamya bel mozat. Nobody makes it like her.', ar: 'البامية بالموزة بتاعتها. محدش بيعملها زيها.' },
  'c2.theyWin': { en: 'They win a prize if you reach the top 3', ar: 'بيكسبوا جائزة لو وصلتي لأحسن 3' },
  'c2.filled': { en: 'Your name and club are already filled in', ar: null }, // TODO(ar)
  'c2.accept': { en: 'Accept my nomination', ar: 'اقبل الترشيح' },
  // ---------- C3 My nominations ----------
  'c3.found': { en: 'You found {n} cooks', ar: 'لقيت {n} طباخين' },
  'c3.top10': { en: '{n} of them are in the top 10', ar: null }, // TODO(ar)
  'c3.entries': { en: 'DRAW ENTRIES', ar: null }, // TODO(ar)
  'c3.list': { en: 'Cooks you nominated', ar: 'اللي رشحتهم' },
  'c3.ofN': { en: '#{r} of {n} · {area}', ar: '#{r} من {n} · {area}' },
  'c3.invited': { en: 'Invite sent · not entered yet', ar: null }, // TODO(ar)
  'c3.unlocked': { en: 'YOU UNLOCKED', ar: null }, // TODO(ar)
  'c3.xOf4': { en: '{n} of 4', ar: null }, // TODO(ar)
  'c3.nudge': { en: '{name} is {n} votes from the top 5. Share her entry and you both move up.', ar: '{name} على بعد {n} صوت من أحسن 5. شير مشاركتها وهتطلعوا مع بعض.' },
  'c3.share': { en: "Share this cook's entry", ar: null }, // TODO(ar)
  'c3.winWhen': { en: 'What you win when she does', ar: 'بتكسب إيه لما تكسب' },
  'c3.r1': { en: 'She enters and cooks', ar: 'تدخل وتطبخ · شارة كشّاف المواهب' },
  'c3.r1s': { en: 'Talent Scout badge on your profile', ar: null }, // TODO(ar): folded into the line above in Arabic
  'c3.r2': { en: 'She reaches the top 10', ar: 'توصل لأحسن 10 · 5 فرص في سحب [الراعي]' },
  'c3.r2s': { en: '5 entries in the [SPONSOR] draw', ar: null }, // TODO(ar): folded into the line above
  'c3.r3': { en: 'She reaches the top 3', ar: 'توصل لأحسن 3 · [جائزة الكشّاف] ومقعد في يوم التذوق' },
  'c3.r3s': { en: '[SCOUT PRIZE] and a seat at the live tasting', ar: null }, // TODO(ar): folded into the line above
  'c3.r4': { en: 'She wins the edition', ar: 'تكسب النسخة · [الجائزة الكبرى] واسمك على كارت فوزها' },
  'c3.r4s': { en: '[GRAND SCOUT PRIZE] and your name on her winner card', ar: null }, // TODO(ar): folded into the line above
  'c3.now': { en: 'Now', ar: null }, // TODO(ar)
  'c3.another': { en: 'Nominate another cook', ar: 'رشّح طباخة تانية' },
  'c3.justAdded': { en: 'Just nominated', ar: null }, // TODO(ar)
  // ---------- F1 Leaderboard ----------
  'f1.close': { en: 'Close race: {n} votes between {a} and {b}', ar: null }, // TODO(ar)
  'f1.sealed': { en: 'Online votes only. Judges and tasting scores are revealed at the event.', ar: 'أصوات الأونلاين بس. درجات اللجنة والتذوق بتتعلن في الحفل.' },
  'f1.vs': { en: 'Club vs club', ar: 'النوادي ضد بعض' },
  'f1.final': { en: 'Final results', ar: 'النتايج' },
  // ---------- F2 Club vs club ----------
  'f2.title': { en: 'Club vs club', ar: 'النوادي ضد بعض' },
  'f2.ranked': { en: "Ranked by total participation. Each club's winner goes to the City Grand Final on 14 November.", ar: 'الترتيب حسب المشاركة. الفائز من كل نادي يروح نهائي القاهرة 14 نوفمبر.' },
  'f2.yours': { en: 'Your club', ar: 'ناديك' },
  'f2.verified': { en: '{n} verified voters', ar: null }, // TODO(ar)
  'f2.help': { en: 'Help Shooting Club lead the city', ar: 'ساعد نادي الصيد يتصدر' },
  // ---------- G1 Table QR ----------
  'g1.live': { en: 'Live tasting · Shooting Club', ar: null }, // TODO(ar)
  'g1.table': { en: 'Table 12', ar: null }, // TODO(ar)
  'g1.by': { en: 'by {name} · Shooting Club', ar: null }, // TODO(ar)
  'g1.first': { en: 'Taste everything first. You get one live vote.', ar: 'دوق كل الأطباق الأول. ليك صوت واحد بس في التذوق.' },
  'g1.vote': { en: 'Vote for this dish', ar: 'صوّت للطبق ده' },
  'g1.counts': { en: 'Your live vote counts for 30% of the final score', ar: null }, // TODO(ar)
  'g1.already': { en: 'Your one live vote is already in.', ar: 'تم تسجيل صوت التذوق' },
  // ---------- G2 Live vote confirmed ----------
  'g2.in': { en: 'Your tasting\nvote is in', ar: 'تم تسجيل صوت التذوق' },
  'g2.counts': { en: "It counts for 30% of {name}'s final score", ar: 'بيحسب 30% من درجة {name} النهائية' },
  'g2.guests': { en: 'of 340 guests have voted live', ar: '214 من 340 ضيف صوّتوا' },
  'g2.results': { en: 'Results announced at 8:00 PM', ar: 'النتايج 8 مساءً' },
  'g2.back': { en: 'Back to the leaderboard', ar: null }, // TODO(ar)
  // ---------- H1 Results ----------
  'h1.title': { en: 'The results', ar: 'النتايج' },
  'h1.meta': { en: 'Shooting Club Edition · Friday 2 October · 6:00 PM', ar: null }, // TODO(ar)
  'h1.score': { en: 'SCORE', ar: null }, // TODO(ar)
  'h1.grand': { en: 'Grand prize from [SPONSOR]', ar: 'جايزة كبرى من [الراعي]' },
  'h1.judges': { en: 'Judges 40', ar: 'لجنة التحكيم 40%' },
  'h1.tasting': { en: 'Tasting 30', ar: 'تصويت التذوق 30%' },
  'h1.online': { en: 'Online 30', ar: 'تصويت الجمهور 30%' },
  'h1.winner': { en: "See the winner's page", ar: null }, // TODO(ar)
  'h1.place': { en: '{n} place in Shooting Club Edition', ar: null }, // TODO(ar): accessible name only
  // ---------- H2 Winner ----------
  'h2.banner': { en: 'Shooting Club Masters Winner 2026', ar: null }, // TODO(ar)
  'h2.winner': { en: 'Winner', ar: null }, // TODO(ar)
  'h2.verified': { en: 'Verified eCook', ar: 'طباخة موثقة' },
  'h2.final': { en: 'FINAL SCORE', ar: null }, // TODO(ar)
  'h2.online': { en: 'ONLINE VOTES', ar: null }, // TODO(ar)
  'h2.tasting': { en: 'TASTING VOTES', ar: null }, // TODO(ar)
  'h2.titles': { en: 'Titles won this season', ar: 'ألقاب الموسم' },
  'h2.see': { en: 'See them on her profile', ar: null }, // TODO(ar)
  'h2.grand': { en: 'Heading to the City Grand Final', ar: 'نهائي القاهرة · 14 نوفمبر' },
  'h2.grandWhen': { en: '14 November · Cairo', ar: null }, // TODO(ar)
  'h2.share': { en: 'Share the winner card', ar: 'اشير كارت الفائزة' },
  // ---------- H3 Thank you ----------
  'h3.thanks': { en: 'Thank you, {name}', ar: 'شكراً يا {name}' },
  'h3.now': { en: 'You are now a TBKHTY Verified eCook. Your entry stays on your profile.', ar: 'بقيتي طباخة موثقة في طبختي. مشاركتك هتفضل على صفحتك.' },
  'h3.total': { en: 'TOTAL VOTES', ar: 'إجمالي الأصوات' },
  'h3.supporters': { en: 'SUPPORTERS', ar: 'داعمين' },
  'h3.rank': { en: 'FINAL RANK', ar: 'الترتيب النهائي' },
  'h3.top5': { en: 'DAYS IN TOP 5', ar: 'أيام في أول 5' },
  'h3.complete': { en: 'Complete your kitchen profile to be first when orders open', ar: 'كمّلي ملف مطبخك عشان تكوني الأولى لما الطلبات تفتح' },
  'h3.finish': { en: 'Finish the last 3 questions', ar: null }, // TODO(ar)
  'h3.share': { en: 'Share your final result', ar: null }, // TODO(ar)
  // ---------- H4 Voter wrap-up ----------
  'h4.title': { en: 'You supported {c} cooks\nand voted {d} days\nin a row', ar: 'دعمت {c} طباخين وصوّتّ {d} أيام ورا بعض' },
  'h4.cast': { en: 'VOTES CAST', ar: null }, // TODO(ar)
  'h4.backed': { en: 'COOKS BACKED', ar: null }, // TODO(ar)
  'h4.fromShares': { en: 'VOTES FROM\nYOUR SHARES', ar: null }, // TODO(ar)
  'h4.raffle': { en: 'Raffle: the [SPONSOR] hamper went to Nour A.', ar: null }, // TODO(ar)
  'h4.roll': { en: 'Your 3 entries roll over to the Maadi edition', ar: 'فرصك الـ3 بتتنقل لنسخة المعادي' },
  'h4.fav': { en: 'Follow your favourites', ar: 'تابع اللي عجبوك' },
  'h4.know': { en: 'Know the moment they start taking orders', ar: 'هتعرف أول ما يبدأوا يستقبلوا طلبات' },
  'h4.s2': { en: 'Season 2 opens across all five clubs', ar: 'الموسم التاني بيبدأ 12 أكتوبر في الخمس نوادي' },
  'h4.oct': { en: 'OCT', ar: null }, // TODO(ar)
  'h4.notify': { en: 'Notify me when Season 2 opens', ar: 'بلّغني لما الموسم 2 يفتح' },
  'h4.notified': { en: "We'll tell you when Season 2 opens", ar: null }, // TODO(ar)
  // ---------- J1 Title ladder ----------
  'j1.bar': { en: 'Titles', ar: 'الألقاب' },
  'j1.title': { en: 'Two tracks.\nOne season.', ar: 'مسارين في نفس الموسم.' },
  'j1.lede': { en: 'Where you live and which club you belong to are separate races, and you run both at once. Titles are held, not won once: every season a challenger can take yours.', ar: 'مكان سكنك وناديك سباقين مختلفين، وبتدخلي الاتنين في نفس الوقت.' },
  'j1.area': { en: 'Your area', ar: 'منطقتك' },
  'j1.everyone': { en: 'Everyone, member or not', ar: null }, // TODO(ar)
  'j1.dish': { en: 'Dish title', ar: 'الطبق' },
  'j1.dishEx': { en: 'Best Molokhia · Dokki', ar: 'أحسن ملوخية · الدقي' },
  'j1.cat': { en: 'Category title', ar: 'التصنيف' },
  'j1.catEx': { en: 'Best Mains · Dokki', ar: 'أحسن طبق رئيسي · الدقي' },
  'j1.champ': { en: 'Area champion', ar: 'المنطقة' },
  'j1.champEx': { en: '#1 Cook · Dokki', ar: 'الأولى في الدقي' },
  'j1.club': { en: 'Your club', ar: 'ناديك' },
  'j1.members': { en: 'Members only, optional', ar: null }, // TODO(ar)
  'j1.clubChamp': { en: 'Club champion', ar: 'النادي' },
  'j1.noClub': { en: 'No club? Nothing is lost. You still compete for every title in your area.', ar: null }, // TODO(ar)
  'j1.both': { en: 'BOTH LEAD TO', ar: null }, // TODO(ar)
  'j1.city': { en: 'City champion', ar: 'بطلة القاهرة' },
  'j1.citySub': { en: 'Cairo Champion 2026 · one cook a year, from the Grand Final', ar: null }, // TODO(ar)
  'j1.hoda': { en: 'Hoda lives in Dokki, right by Shooting Club, and is a member. This season she competes for the Dokki titles and the Shooting Club title at the same time.', ar: 'هدى ساكنة في الدقي جنب نادي الصيد وعضوة فيه. بتنافس على ألقاب الدقي ولقب النادي في نفس الموسم.' },
  'j1.rule': { en: 'A title only exists when 3 cooks compete for it and the leader passes 50 votes', ar: null }, // TODO(ar)
  'j1.ruleSub': { en: 'Otherwise it rolls up to the next level. That is why a title is worth something.', ar: null }, // TODO(ar)
  // ---------- J2 Area titles ----------
  'j2.bar': { en: 'Titles · {area}', ar: 'الألقاب · {area}' },
  'j2.cairo': { en: 'Cairo', ar: 'القاهرة' },
  'j2.season': { en: 'Season 1 · closed 2 October', ar: null }, // TODO(ar)
  'j2.s2': { en: 'Season 2 opens 12 October. Every title can change hands.', ar: 'الموسم 2 يبدأ 12 أكتوبر. كل لقب ممكن يتغير.' },
  'j2.titles': { en: 'TITLES', ar: 'الألقاب' },
  'j2.held': { en: 'Held now', ar: 'الألقاب الحالية' },
  'j2.since': { en: 'Held since Oct 2026 · first holder', ar: null }, // TODO(ar)
  'j2.locked': { en: 'Locked · needs more cooks', ar: 'مقفولة' },
  'j2.none': { en: 'No title is held here yet.', ar: null }, // TODO(ar)
  // K3: first cook in an area
  'k3.firstCook': { en: "You're the first\ncook in {area}", ar: 'انت أول طباخ في {area}' },
  'k3.firstBody': { en: 'Titles open when 3 cooks compete. Invite 2 neighbours and {area} gets its own ranking.', ar: null }, // TODO(ar)
  'k3.invite2cooks': { en: 'Invite 2 cooks', ar: 'رشّح 2 طباخين' },
  // ---------- J3 Titled profile ----------
  'j3.fromArea': { en: 'FROM HER AREA · {area}', ar: 'من منطقتها' },
  'j3.fromClub': { en: 'FROM HER CLUB · SHOOTING CLUB', ar: 'من ناديها' },
  'j3.titlesHeld': { en: 'Titles held', ar: 'الألقاب' },
  'j3.titlesStat': { en: 'TITLES', ar: 'الألقاب' },
  'j3.challenged': { en: 'One of her titles is challenged', ar: null }, // TODO(ar)
  'j3.apart': { en: '8 votes apart with 3 days left', ar: '8 أصوات بس والفرق، وفاضل 3 أيام' },
  'j3.stay': { en: 'Her titles stay on this profile when TBKHTY opens orders.', ar: 'ألقابها هتفضل على صفحتها لما طبختي تفتح الطلبات.' },
  // ---------- J4 Title challenged ----------
  'j4.title': { en: 'Your title is\nunder threat', ar: 'لقبك في خطر' },
  'j4.holding': { en: 'HOLDING', ar: null }, // TODO(ar)
  'j4.challenger': { en: 'CHALLENGER', ar: null }, // TODO(ar)
  'j4.vs': { en: 'vs', ar: null }, // TODO(ar)
  'j4.closes': { en: 'Season 2 closes Friday, 8:00 PM', ar: 'الموسم التاني بيقفل الجمعة 8 مساءً' },
  'j4.defend': { en: 'Defend my title', ar: 'دافعي عن لقبك' },
  'j4.board': { en: 'See the area board', ar: null }, // TODO(ar)
  // ---------- J5 Title awarded ----------
  'j5.cap': { en: 'SEASON 1 TITLE', ar: null }, // TODO(ar)
  'j5.title': { en: 'You are the\n#1 Cook in Dokki', ar: 'أنتِ الأولى في الدقي' },
  'j5.from': { en: '400 votes from 264 neighbours in Dokki', ar: null }, // TODO(ar)
  'j5.tracks': { en: 'YOUR TWO TRACKS THIS SEASON', ar: null }, // TODO(ar)
  'j5.dokki': { en: 'Dokki · where you live', ar: null }, // TODO(ar)
  'j5.won': { en: '1st · title won', ar: null }, // TODO(ar)
  'j5.club': { en: 'Shooting Club · your club', ar: null }, // TODO(ar)
  'j5.second': { en: '2nd', ar: null }, // TODO(ar)
  'j5.hold': { en: 'You hold it until someone takes it', ar: null }, // TODO(ar)
  'j5.tell': { en: 'Season 2 opens 12 October. We will tell you the moment a challenger gets close.', ar: 'هنبلغك أول ما حد يقرب من لقبك.' },
  'j5.share': { en: 'Share my title card', ar: 'اشيري كارت اللقب' },
  'j5.see': { en: 'See it on my profile', ar: null }, // TODO(ar)
  // @@STRINGS@@
};

const RTL = { ar: true };
export const lang = () => state.lang;
export const otherLang = () => (state.lang === 'ar' ? 'en' : 'ar');
export const isAr = () => state.lang === 'ar';

// Line breaks in a string (\n) become <br>, as on the boards' two-line titles.
const br = (s) => s.replace(/\n/g, '<br>');

export function esc(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function pick(v, lng) {
  if (v && typeof v === 'object' && ('en' in v || 'ar' in v)) return v[lng] ?? v.en;
  return v;
}

// Raw string in a given language, with {vars}. Vars may be {en, ar} objects.
export function raw(key, lng = state.lang, vars) {
  const e = S[key];
  if (!e) {
    console.warn('i18n: missing key', key);
    return key;
  }
  const s = e[lng] ?? e.en;
  return s.replace(/\{(\w+)\}/g, (m, k) => (vars && vars[k] != null ? pick(vars[k], lng) : m));
}
export const has = (key, lng) => !!(S[key] && S[key][lng]);

// Escaped text in the current language. English shown inside an Arabic page
// (a string with no Arabic yet) is isolated so it reads left to right.
export function t(key, vars) {
  const lng = state.lang;
  const txt = br(esc(raw(key, lng, vars)));
  if (lng === 'ar' && !has(key, 'ar')) return `<bdi lang="en" dir="ltr">${txt}</bdi>`;
  return txt;
}
// Plain escaped text for attributes (aria-label and the like).
export const ta = (key, vars) => esc(raw(key, state.lang, vars).replace(/\n/g, ' '));

// The same string in the other language, isolated, or '' if it has none.
export function alt(key, vars) {
  const lng = otherLang();
  if (!has(key, lng)) return '';
  return `<bdi lang="${lng}" dir="${RTL[lng] ? 'rtl' : 'ltr'}">${esc(raw(key, lng, vars)).replace(/\n/g, ' ')}</bdi>`;
}

// Secondary line: the Arabic under the English, as on the boards. In Arabic
// the English is dropped, as AR1 to AR3 show, unless `keep` is set (primary
// buttons and step counters keep the English demoted underneath).
export function sub(key, vars, { cls = '', keep = false, tag = 'span' } = {}) {
  if (state.lang === 'ar' && !keep) return '';
  const a = alt(key, vars);
  if (!a) return '';
  return `<${tag} class="sub ${cls}">${a}</${tag}>`;
}
// Inline version: a short secondary label next to a primary one.
export function subIn(key, vars, cls = 'note') {
  if (state.lang === 'ar') return '';
  const a = alt(key, vars);
  return a ? `<span class="${cls}">${a}</span>` : '';
}

// Content fields: cook.name / cook.name_ar and similar.
export function L(obj, field) {
  if (!obj) return '';
  if (state.lang === 'ar' && obj[field + '_ar']) return esc(obj[field + '_ar']);
  return esc(obj[field]);
}
export function Lraw(obj, field, lng = state.lang) {
  if (!obj) return '';
  if (lng === 'ar' && obj[field + '_ar']) return obj[field + '_ar'];
  return obj[field];
}
// {en, ar} objects (areas, governorates, clubs in the dropdown).
export const LO = (o, lng = state.lang) => esc(o ? o[lng] ?? o.en : '');
// Bilingual var object built from a content object.
export const V = (obj, field) => ({ en: obj[field], ar: obj[field + '_ar'] || obj[field] });
export const first = (s) => String(s || '').split(' ')[0];
export const firstV = (obj) => ({ en: first(obj.name), ar: first(obj.name_ar || obj.name) });
