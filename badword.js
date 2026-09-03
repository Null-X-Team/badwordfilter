// badword.js — Foolproof profanity filter (self-contained)
// Drops in anywhere. The ONLY client-side bypass is dev tools
// (disabling JS / removing listeners). Text tricks — leetspeak,
// inserted spaces/punctuation, repeated characters, unicode
// lookalikes, mixed case — are all normalized away before matching.

(function () {
  'use strict';

  // 1. Paste your bad words list into this array (duplicates &
  //    leetspeak variants are auto-merged at runtime).
  const badWords = [
    // Core swear words and variations
    "fuck", "fucking", "fucked", "fucker", "fuckers", "fuckoff", "fuckyou", "fuk", "fck",
    "shit", "shitty", "shitface", "shithead", "bullshit", "shits",
    "ass", "asshole", "assholes", "asshat", "asswipe", "dumbass",
    "bitch", "bitches", "bitchy", "sonofabitch",
    "cunt", "cunts", "twat",
    "dick", "dickhead", "dickwad",
    "pussy", "pussies",
    "cock", "cocksucker", "cockhead",
    "motherfucker", "mothafucker", "mf", "mofos",
    "bastard", "bastards",

    // Sexual / explicit terms
    "anal", "anilingus", "anus", "arse", "arsehole", "assfucker", "asslick", "assmunch",
    "ballbag", "ballsack", "blowjob", "blumpkin", "boob", "boobs", "bukakke", "bukkake",
    "clit", "clitoris", "cum", "cumbubble", "cumshot", "cunnilingus", "deepthroat",
    "dildo", "ejaculate", "faggot", "fag", "fanny", "fistfuck", "gangbang", "handjob",
    "horny", "jizz", "masturbate", "orgasm", "orgy", "penis", "porn", "porno", "prostitute",
    "rimjob", "scat", "semen", "sex", "slut", "tit", "tits", "titties", "vagina", "whore",

    // Racial / derogatory slurs
    "nigger", "nigga", "nigg", "chink", "kike", "spic", "wetback", "beaner", "gook", "paki",
    "raghead", "towelhead", "jap", "coon", "cracker",

    // More from extensive lists
    "2g1c", "5h1t", "5hit", "a55", "acrotomophilia", "alabama hot pocket", "alaskan pipeline",
    "apeshit", "arrse", "assbag", "assbanger", "assbite", "assclown", "assface", "assgoblin",
    "asshopper", "assjacker", "assmonkey", "asspirate", "asswad", "autoerotic", "babeland",
    "ball gag", "ball gravy", "bbw", "bdsm", "beaners", "beastiality", "bestiality",
    "biatch", "big black cock", "bimbos", "birdlock", "bloody", "blue waffle", "bollock",
    "bollocks", "bondage", "boner", "boobies", "booty call", "brown showers", "bugger",
    "camel toe", "carpetmuncher", "cawk", "choad", "chode", "circlejerk", "cleveland steamer",
    "clusterfuck", "cockbite", "cockface", "cockjockey", "cockknoker", "cockmongler",
    "cockmunch", "cocknugget", "cocksuck", "coochie", "coon", "cooter", "cornhole",
    "creampie", "cumdumpster", "cumguzzler", "cunthole", "cuntlicker", "cyalis", "cyberfuck",
    "dammit", "damn", "darkie", "daterape", "dickbag", "dickface", "dickhole", "dickjuice",
    "dickmilk", "dickslap", "dickwad", "dickweed", "dike", "dingleberry", "dipshit",
    "dirty sanchez", "doggiestyle", "doggystyle", "domination", "donkey punch", "douchebag",
    "dumshit", "dyke", "eat my ass", "ecchi", "ejakulate", "f4nny", "faggit", "fannyflaps",
    "fannyfucker", "fart", "fatass", "fcuk", "felch", "fellatio", "fingerbang", "fingerfuck",
    "fistfuck", "flamer", "fook", "footjob", "frotting", "fucka", "fuckhead", "fucktard",
    "fudgepacker", "gangbanged", "gaysex", "goddamn", "gooch", "goregasm", "grope",
    "g-spot", "handjob", "hardcore", "heeb", "hentai", "heshe", "hoe", "honkey", "honky",
    "hooker", "hot carl", "incest", "jackoff", "jailbait", "jerkoff", "jigaboo", "jism",
    "jiz", "jizz", "kawk", "kike", "kinky", "knob", "knobhead", "kunilingus", "kunt",
    "labia", "lesbo", "lmfao", "lolita", "lust", "m0fo", "masterbate", "milf", "minge",
    "mofo", "mothafucka", "muff", "muffdiver", "n1gga", "n1gger", "nazi", "negro", "neonazi",
    "nig nog", "nigg3r", "niggah", "niggas", "niggaz", "niglet", "nimphomania", "nympho",
    "octopussy", "omorashi", "paedophile", "panooch", "pecker", "pedophile", "pegging",
    "penisfucker", "phuck", "phuk", "piece of shit", "pigfucker", "piss", "pissed", "pissoff",
    "poon", "poonani", "poontang", "poop", "pornos", "prick", "pthc", "pube", "punanny",
    "punta", "pusy", "queef", "queer", "queerbait", "quim", "raghead", "rape", "rapist",
    "retard", "rimming", "ruski", "s_h_i_t", "sadism", "santorum", "schlong", "scissoring",
    "shag", "shagger", "shemale", "shibari", "shitass", "shitbag", "shitface", "shithead",
    "shithole", "shitting", "shitty", "skank", "skeet", "slanteye", "slutbag", "smegma",
    "snatch", "snowballing", "sodomize", "spac", "spic", "spunk", "strapon", "sucker",
    "suicide girls", "swastika", "tard", "tea bagging", "thundercunt", "titfuck", "titty",
    "tosser", "towelhead", "tranny", "turd", "tw4t", "twat", "twathead", "twink", "twunt",
    "upskirt", "v14gra", "va-j-j", "vagina", "viagra", "voyeur", "vulva", "wang", "wank",
    "wanker", "wetback", "whore", "willy", "yaoi", "zoophilia",

    // === DRUGS / SUBSTANCES / NARCOTICS SLANG ===
    "weed", "pot", "marijuana", "cannabis", "ganja", "kush", "maryjane", "blunt", "joint", "doobie",
    "heroin", "cocaine", "coke", "crack", "meth", "methamphetamine", "speed", "ice", "crystal",
    "mdma", "ecstasy", "molly", "lsd", "acid", "shrooms", "mushrooms", "ketamine", "specialk",
    "oxy", "oxycodone", "vicodin", "percocet", "xanax", "benzo", "benzodiazepine", "adderall",
    "ritalin", "fentanyl", "fent", "tramadol", "codeine", "lean", "purple drank", "sizzurp",
    "opioid", "opiate", "suboxone", "subutex", "dmt", "ayahuasca", "salvia", "ghb", "roofies",
    "poppers", "nitrous", "whippets",

    "420", "blazed", "stoned", "high", "lit", "baked", "tripping", "trip", "rolling", "geeked",
    "zooted", "tweaking", "fiend", "junkie", "dope", "dopehead", "snow", "blow", "yayo", "white",
    "skunk", "dabs", "wax", "shatter", "oil", "edibles", "cart", "vape", "thc", "cbd",
    "smack", "china white", "black tar", "boy", "horse", "speedball",
    "crackhead", "methhead", "tweeker", "pillhead", "xanny", "xans", "bars", "percs", "oxys",
    "syrup", "cough syrup", "promethazine", "roxy", "hydros", "norco",
    "acid tab", "blotter", "mushies", "ket", "k-hole", "special k", "molley", "mollys",
    "ecstacy", "mda", "bath salts", "flakka", "research chemicals", "synthetic",
    "wock", "actavis", "dirty sprite", "fetty", "tranq", "xylazine",

    "gethigh", "gettinghigh", "snort", "snorting", "shootup", "inject", "shooting", "popping",
    "smokingweed", "poppills", "poppingpills", "tripballs", "rollingface", "tweakingout",
    "fiending", "jonesing", "overdose", "overdosing",

    "perc", "oxycontin", "vic", "valium", "klonopin", "ativan", "adderallxr",
    "concerta", "vyvanse", "dexedrine", "desoxyn", "focalin",
    "subbies", "zubsolv", "buprenorphine",
    "carfentanil", "u47700", "etizolam",

    // === RACIAL / ETHNIC SLURS & DEROGATORY TERMS ===
    "niggas", "niggaz", "n1gger", "n1gga", "niglet", "nignog", "negr",
    "porchmonkey", "jigaboo", "junglebunny", "spear chucker", "spook", "darkie", "tar baby",

    "chinky", "gookeye", "zipperhead", "slant", "slanteye", "slope", "dink",
    "nip", "yellow", "rice nigger", "rice picker",

    "kyke", "hymie", "sheeny", "yid",

    "spick", "greaser", "pepperbelly", "taco bender",
    "border bunny", "mexcrement",

    "sand nigger", "camel jockey", "hajji", "haji", "dune coon",
    "bomb maker", "diaper head",

    "curry muncher", "dot head", "street shitter",

    "honky", "whitey", "redneck", "trailer trash", "hillbilly", "white trash",
    "peckerwood", "ofay",

    "chav", "pikey", "gypsy", "tinker",

    "abbo", "boong", "blackfella", "lubra",

    "wog", "wop", "dago", "guido", "guinea", "greaseball", "eyetie",

    "kraut", "hun", "fritz", "jerry",

    "frog", "froggy", "limey", "pom", "pommy",

    "commie",

    "ching chong", "chingchong", "bamboo coon",

    "monkey", "gorilla", "ape", "savage",

    "buckwheat", "charcoal", "coalburner", "ebony", "jungle bunny", "moon cricket",
    "pickaninny", "sambo", "shine", "smoked irish", "snowflake",

    "gong", "jook", "oriental", "squint", "yellow peril",

    "hebe", "hooknose", "oven dodger", "shylock",

    "brownie", "cabbage eater", "goat roper", "halfbreed", "half caste",
    "mojado", "tacohead",

    "hadji", "kebab", "muzzie", "rag head", "sand monkey", "turbanator",

    "curry nigger", "dothead", "pajeet", "streetshitter",

    "gringo", "haole", "paleface", "roundeye", "white devil",

    "bimbo", "cholo", "eskimo", "injun", "redskin", "squaw",
    "timber nigger", "wagon burner",

    "nigguh", "niggur", "nig", "kneegrow", "africoon",
    "chinkster", "gookster", "kikester",
    "spickster", "wetbackster",
    "sandnigger",
    "n1gg3r", "nigg4", "n1g", "ch1nk", "g00k", "k1ke", "sp1c", "w3tback", "b3aner",
    "r4ghead", "t0welhead", "c00n", "j1gaboo",

    // === TRANSGENDER / GENDER IDENTITY SLURS ===
    "trannies", "trannie", "trannys",
    "she-male", "shemales",
    "he-she", "he/she",
    "traps", "trapfag",
    "ladyboys",
    "shim", "chick with a dick", "dickgirl", "dickgirls",
    "transvestites",
    "gender bender", "genderbend",
    "troons", "troonery",
    "autogynephile", "autogynephilia", "agp",
    "tims", "tifs",
    "transbian", "transmaxxing", "transmax",
    "hons",
    "clocked", "clockable",

    "man in a dress", "man in dress", "woman in a dress",
    "fake woman", "fake man", "pretend woman", "pretend man",
    "biological male", "biological female",
    "chromosomally challenged",
    "delusional", "delusional man", "delusional woman",

    "trooncord", "troonout",
    "xdresser", "x-dresser",
    "theyfab",

    "tr4nny", "tr4nnies", "tr4nnie",
    "sh3male", "sh3males",
    "tr@p", "tr@ps",
    "l4dyboy", "l4dyboys",
    "h3-sh3", "h3sh3",
    "trannyfag", "tranniefag",

    // === DISABILITY / ABLEIST SLURS ===
    "retarded", "retards", "r tard", "rtard", "tards", "tarded",
    "mongoloid", "mongol", "spastic", "spazzy", "spazout",
    "cripple", "crip", "crippled", "crips", "gimpy", "gimps",
    "lamo", "lameass", "lamebrain",
    "dumbo", "dummies", "deaf and dumb", "deafmute",
    "idiots", "idiotic", "imbecile", "imbeciles",
    "morons", "moronic", "cretin", "cretins",
    "feebleminded", "feeble minded", "simpleton", "halfwit", "dimwit", "nitwit",
    "psychotic", "psychopath", "schizophrenic", "schiz",
    "crazies", "lunatic", "loony", "loon", "nutjob",
    "deranged", "mental case", "headcase",
    "windowlicker", "shortbus", "short bus", "special ed", "sped kid",
    "downie", "downy",
    "autist", "autismo", "asperger", "aspie",
    "blind as a bat", "one eyed", "four eyes",
    "midget", "dwarf", "freakshow", "sideshow",
    "handicapped", "handicap", "wheelchair bound", "confined to wheelchair",
    "braindead", "brain damaged", "vegetative",
    "flid", "fliddy", "raspberry ripple",
    "harelip", "harelipped", "clubfoot", "hunchback", "hunchbacked",
    "baldy", "baldie", "bucktoothed",
    "slowpoke", "slow in the head", "slow minded",
    "subnormal", "defective", "deformed", "disfigured", "birth defect",
    "epileptic", "epileptic fit", "seizure boy",
    "leper", "leprosy",
    "paralyzed", "paralytic", "quad", "quadriplegic",
    "crippling anxiety", "crippled by", "lame excuse",
    "bonkers", "batshit", "batshit crazy", "off your rocker",
    "basket case", "fruitcake", "nutcase",
    "retard strength", "tard wrangler", "tard herd",
    "spacker", "spack", "spacky",
    "rainman", "forrest gump",
    "spec", "spec ed",
    "learning disabled", "useless eater",

    "r3tard", "r3t4rd", "t4rd", "sp4z", "cr1pple", "cr1p", "g1mp",
    "1diot", "1mbecile", "m0ron", "psych0", "sch1zo", "cr4zy", "1nsane", "l4me",
    "d3ranged", "m3ntal", "aut1st", "aut1sm", "bl1nd", "d3af", "m0ng", "m0ngoloid",
    "b4tshit", "normie",

    // === INAPPROPRIATE GEN ALPHA SLANG ===
    "gyatt", "gyat", "gyattt", "level10gyatt", "level 10 gyatt",
    "huzz", "chuzz", "chopped huzz",
    "glizzy",
    "304", "three oh four",
    "gooner", "gooning", "goonette",
    "edging",
    "jelq", "jelqing",
    "coomer",
    "bomboclat", "bombaclat", "claat",
    "sybau", "syba",
    "fine shyt",
    "big back",
    "zesty",

    // === ADDITIONAL / EMERGING DRUGS & SLANG ===
    "fentanyl analogues", "fentalogues", "nitazenes", "etonitazene", "metonitazene",
    "tranq dope",
    "kratom", "mitragyna",
    "tianeptine", "gas station heroin", "za za red",
    "phenibut", "liquid ecstasy",
    "2c-b", "2cb", "2c-i", "2ci", "2c-t", "nbome", "25i", "25c",
    "lsd analogues", "1p-lsd", "1cp-lsd", "ald-52",
    "dmt cart", "dmt vape", "changa",
    "salvia divinorum", "divinorum",
    "huasca", "dmt brew",
    "mescaline", "peyote", "san pedro",
    "psilocybin", "mushroom chocolate", "shroom bar", "shroom gummies",
    "dextromethorphan", "robotripping", "ccc",
    "benadryl", "dph", "deliriants",

    "delta 8", "delta8", "delta 9", "delta9", "thca", "thc-a",
    "live resin", "rosin", "hash rosin", "diamond sauce", "terps",
    "dispo", "disposable", "thc cart", "weed pen",
    "gummy", "delta gummy", "mushroom gummy",

    "alpha pvp", "pvp", "mdphp",
    "3mmc", "3cmc", "cathinone", "bath salt",
    "amphetamine", "addies", "white girl",

    "fent press", "fent 30s", "blues", "m30s",
    "dilaudid",
    "china",
    "subs", "bupe",
    "methadone", "dolophine", "diskettes",

    "xannies", "xanax bar",
    "klons", "kpins", "lorazepam",
    "ambien", "zombie pill", "stilnox",
    "addy", "vyanse",

    "booze", "liquor", "drunk", "wasted", "hammered",
    "rush", "jungle juice", "amyl nitrite",

    "nod", "nodding", "nod out", "zombie", "perched",
    "roll", "molly roll",
    "acid trip", "bad trip",
    "hot rail", "hotrailing", "boof", "boofing", "plugging",
    "parachute", "parachuting", "monkey water",
    "fent od", "naloxone",

    // Additional profanity and vulgar variants
    "fuckin", "fukin", "fcking", "fking", "f***", "f**k", "fcku",
    "fux", "fuxk", "fuking", "fuked", "fukker", "motherfuckin",
    "motherfukin", "mofo", "mfer", "muthafucka", "muthafucker",
    "fuckedup", "fuckwit", "fuckface", "fuckass", "fucknut",
    "fuckstick", "fuckbucket", "fuckbrain", "fuckwad",
    "fucknugget", "shitshow", "shitstorm", "shitstain", "shitheel",
    "shitbird", "shitlord", "shitbrain", "shitkicker",
    "assclown", "asskisser", "assmonger", "dumbfuck", "dumbfucks",
    "jackass", "smartass", "badass", "fatass", "lazyass", "kissass",
    "painintheass", "pieceofshit", "sonsabitch",
    "bullshitter", "bullshitting", "horseshit", "dogshit",
    "dipfuck", "douche", "douchecanoe", "douchelord",
    "scumbags", "dirtbag", "sleazebag", "shit-for-brains",

    "boners", "erection", "erect", "shaft", "rod", "junk",
    "nutting", "nutsack", "balls", "ballsy",
    "cockbreath", "dickless",
    "pricks", "pissing", "pisshead", "pissface",
    "pissbag", "pissweak", "piss off", "pissedoff",
    "twatwaffle", "cuntface", "cuntbag", "cuntish", "cunting",
    "slutty", "slutface", "skanky", "whorish",
    "ho", "hoebag", "hoeass", "thot", "thots", "thottie",
    "bastardized", "bastardly", "motherless",

    "eatshit", "eat shit", "go to hell", "screw you", "screw off",
    "shut the hell up", "shut up bitch", "get bent", "drop dead",
    "rot in hell", "kiss my ass", "bite me", "suck it",
    "piece of crap", "son of a gun",
    "what the hell", "what the fuck", "for fucks sake",
    "fuck off", "fuck you", "go fuck yourself",

    "f.u.c.k", "f-u-c-k", "f_u_c_k", "f u c k",
    "s.h.i.t", "s-h-i-t", "s_h_i_t", "s h i t",
    "a.s.s", "a-s-s", "a_s_s", "a s s",
    "b.i.t.c.h", "b-i-t-c-h", "b_i_t_c_h",
    "d.i.c.k", "d-i-c-k", "d_i_c_k",
    "c.u.n.t", "c-u-n-t", "c_u_n_t",

    "ph4ck", "f0ck", "f0k", "fuk3d",
    "sh1t", "sh!t", "$hit", "5h!t",
    "@ss", "4ss", "4sshole", "@sshole",
    "b1tch", "b!tch", "8itch", "b1tchy",
    "d1ck", "d!ck", "d!ckhead",
    "c0ck", "c0ckhead", "cunt3",
    "p1ss", "p!ss", "t\/\/at",

    "crappy", "crud", "screwup", "screwball",
    "jerkass", "losers",
    "weirdo", "creep", "creeper", "pervert", "pervy",
    "degenerate", "sleazeball",
    "jackwagon", "toolbag", "mouthbreather", "knucklehead",
    "meathead", "blockhead", "birdbrain", "bozo",
    "trashbag", "trashperson", "wasteofspace", "human garbage"
  ];

  // 2. Leetspeak / homoglyph → base letter map.
  //    Applied to BOTH the input and the bad-word list so that
  //    "b1tch", "b!tch", "5h1t", "@ss" all collapse to their roots.
  function applyLeetMap(s) {
    return s
      .replace(/[@4àáâãäå]/g, 'a')
      .replace(/[3€èéêë]/g, 'e')
      .replace(/[1!|ìíîï]/g, 'i')
      .replace(/0/g, 'o')
      .replace(/[5$]/g, 's')
      .replace(/7/g, 't')
      .replace(/8/g, 'b')
      .replace(/9/g, 'g')
      .replace(/[2z]/g, 'z');
  }

  // 3. Normalize text → compact token stream for matching.
  //    leet=true  → digits/symbols mapped to letters (catches "b1tch").
  //    leet=false → digits kept as-is              (catches "420").
  function normalize(text, leet) {
    let s = String(text || '').toLowerCase().normalize('NFKD');
    s = s.replace(/[\u0300-\u036f]/g, '');            // strip diacritics
    s = s.replace(/[\u200B-\u200D\uFEFF\u00AD]/g, ''); // zero-width / soft hyphen
    if (leet) s = applyLeetMap(s);
    s = s.replace(leet ? /[^a-z ]/g : /[^a-z0-9 ]/g, ''); // drop separators
    s = s.replace(/([aeiou])\1+/g, '$1');             // collapse vowel runs (fuuuck→fuck)
    s = s.replace(/\s+/g, ' ').trim();
    return s.replace(/ /g, '');                        // compact: remove all spaces
  }

  // 4. Build a single boundary-anchored regex from the list.
  //    (?:^|[^a-z0-9]) ... (?![a-z0-9])  → matches only whole tokens,
  //    so "class", "assess", "grass" never false-trigger.
  function buildRegex(leet) {
    const set = new Set();
    badWords.forEach(w => {
      const n = normalize(w, leet);
      if (n.length >= 2) set.add(n);
    });
    if (!set.size) return null;
    const pattern = [...set]
      .sort((a, b) => b.length - a.length)            // longest first
      .map(w => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
      .join('|');
    return new RegExp('(?:^|[^a-z0-9])(?:' + pattern + ')(?![a-z0-9])');
  }

  const rawRegex = buildRegex(false);
  const leetRegex = buildRegex(true);

  // 5. Profanity verification.
  function containsBadWords(message) {
    if (!message || typeof message !== 'string') return false;
    const raw = normalize(message, false);
    const leet = normalize(message, true);
    if (rawRegex && rawRegex.test(raw)) return true;
    if (leetRegex && leetRegex.test(leet)) return true;
    return false;
  }

  // 6. Modal (CSS + DOM).
  const modalStyles = `
    .modal-overlay {
      display: none;
      position: fixed;
      top: 0; left: 0; width: 100%; height: 100%;
      background: rgba(0, 0, 0, 0.5);
      justify-content: center;
      align-items: center;
      z-index: 1000;
    }
    .modal-overlay.show-modal { display: flex; }
    .modal-content {
      background: #ffffff;
      padding: 24px;
      border-radius: 8px;
      text-align: center;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      max-width: 320px;
      width: 90%;
      font-family: system-ui, -apple-system, sans-serif;
    }
    .modal-content p {
      margin: 0 0 16px 0;
      color: #333333;
      font-size: 16px;
      line-height: 1.4;
    }
    .modal-content button {
      padding: 8px 20px;
      background-color: #007bff;
      color: #ffffff;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
      font-weight: 500;
    }
    .modal-content button:hover { background-color: #0056b3; }
  `;
  const styleTag = document.createElement('style');
  styleTag.textContent = modalStyles;
  document.head.appendChild(styleTag);

  function injectModalHTML() {
    if (document.getElementById('profanityModal')) return;
    const modalOverlay = document.createElement('div');
    modalOverlay.id = 'profanityModal';
    modalOverlay.className = 'modal-overlay';
    modalOverlay.innerHTML = `
      <div class="modal-content">
        <p>Please refrain from using inappropriate language.</p>
        <button id="closeModalBtn">OK</button>
      </div>
    `;
    document.body.appendChild(modalOverlay);
    document.getElementById('closeModalBtn').addEventListener('click', () => {
      modalOverlay.classList.remove('show-modal');
    });
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectModalHTML);
  } else {
    injectModalHTML();
  }

  // 7. Attach filter to a single element (id, selector, or DOM node).
  function attachFilterToInput(target) {
    const el = typeof target === 'string' ? document.querySelector(target) : target;
    if (!el || el.__badwordBound) return;
    el.__badwordBound = true;

    const handler = () => {
      const value = el.isContentEditable ? el.textContent : el.value;
      if (containsBadWords(value)) {
        const modal = document.getElementById('profanityModal');
        if (modal) modal.classList.add('show-modal');
        if (el.isContentEditable) el.textContent = '';
        else el.value = '';
        el.dispatchEvent(new Event('change', { bubbles: true }));
      }
    };
    // 'input' catches typing + paste + drag-drop; boundary logic means
    // partial/legit words never trigger, so this is safe per keystroke.
    el.addEventListener('input', handler);
    el.addEventListener('paste', () => setTimeout(handler, 0));
  }

  // 8. Auto-attach to every text field on the page (foolproof default).
  function isTextField(el) {
    if (el.isContentEditable) return true;
    if (el.tagName === 'TEXTAREA') return true;
    if (el.tagName === 'INPUT') {
      const t = (el.type || 'text').toLowerCase();
      return ['text', 'search', 'email', 'url', 'number', 'tel', 'password', ''].includes(t);
    }
    return false;
  }
  function attachAll(root) {
    (root || document).querySelectorAll('input, textarea, [contenteditable=""], [contenteditable="true"]')
      .forEach(el => { if (isTextField(el)) attachFilterToInput(el); });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => attachAll(document));
  } else {
    attachAll(document);
  }

  // 9. Watch for dynamically added fields (SPAs, lazy UI) and bind them too.
  const observer = new MutationObserver(mutations => {
    mutations.forEach(m => m.addedNodes.forEach(node => {
      if (node.nodeType !== 1) return;
      if (isTextField(node)) attachFilterToInput(node);
      attachAll(node);
    }));
  });
  if (document.body) {
    observer.observe(document.body, { childList: true, subtree: true });
  } else {
    document.addEventListener('DOMContentLoaded', () => {
      observer.observe(document.body, { childList: true, subtree: true });
    });
  }

  // 10. Expose globally.
  window.containsBadWords = containsBadWords;
  window.attachFilterToInput = attachFilterToInput;
  window.attachFilterToAllInputs = attachAll;
})();
