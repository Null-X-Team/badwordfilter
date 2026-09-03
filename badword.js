// badword.js - Complete self-contained script (CSS + HTML + Filter Logic)

// 1. Paste your bad words list into this array
const badWords = [// Core swear words and variations
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
    
    // Racial / derogatory slurs (very common in filters)
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

// More slang & variations
"420", "blazed", "stoned", "high", "lit", "baked", "tripping", "trip", "rolling", "geeked",
"zooted", "tweaking", "fiend", "junkie", "dope", "dopehead", "snow", "blow", "yayo", "white",
"skunk", "dabs", "wax", "shatter", "oil", "edibles", "cart", "vape", "thc", "cbd",
"heroin", "smack", "china white", "black tar", "boy", "horse", "speedball",
"crackhead", "methhead", "tweeker", "pillhead", "xanny", "xans", "bars", "percs", "oxys",
"lean", "syrup", "cough syrup", "codeine", "promethazine", "roxy", "hydros", "norco",
"acid tab", "blotter", "mushies", "ket", "k-hole", "special k", "molley", "mollys",
"ecstacy", "e", "mda", "bath salts", "flakka", "research chemicals", "rc", "synthetic",
"lean", "wock", "actavis", "dirty sprite", "fent", "fetty", "tranq", "xylazine",

// Drug-related verbs / actions
"gethigh", "gettinghigh", "snort", "snorting", "shootup", "inject", "shooting", "popping",
"smokingweed", "poppills", "poppingpills", "tripballs", "rollingface", "tweakingout",
"fiending", "jonesing", "overdose", "od", "overdosing",

// Common brand / street names
"perc", "roxy", "oxycontin", "vic", "valium", "klonopin", "ativan", "adderallxr",
"ritalin", "concerta", "vyvanse", "dexedrine", "desoxyn", "focalin",
"suboxone", "subbies", "zubsolv", "buprenorphine",
"heroin", "fentanyl", "carfentanil", "u47700", "etizolam",

    // === RACIAL / ETHNIC SLURS & DEROGATORY TERMS ===
"nigger", "nigga", "nigg", "niggas", "niggaz", "n1gger", "n1gga", "niglet", "nignog", "negr",
"coon", "porchmonkey", "jigaboo", "junglebunny", "spear chucker", "spook", "darkie", "tar baby",

"chink", "chinky", "gook", "gookeye", "zipperhead", "slant", "slanteye", "slope", "dink",
"jap", "nip", "yellow", "rice nigger", "rice picker",

"kike", "kyke", "heeb", "hymie", "sheeny", "yid",

"spic", "spick", "spic", "wetback", "beaner", "beaner", "greaser", "pepperbelly", "taco bender",
"border bunny", "illegal", "mexcrement",

"raghead", "towelhead", "sand nigger", "camel jockey", "hajji", "haji", "dune coon", "terrorist",
"bomb maker", "diaper head",

"paki", "paki", "curry muncher", "dot head", "street shitter",

"cracker", "honky", "honkey", "whitey", "redneck", "trailer trash", "hillbilly", "white trash",
"peckerwood", "ofay",

"chav", "pikey", "gypsy", "tinker",

"abo", "abbo", "boong", "blackfella", "lubra",

"wog", "wop", "dago", "guido", "guinea", "greaseball", "eyetie",

"kraut", "hun", "fritz", "jerry", "nazi",

"frog", "froggy", "limey", "pom", "pommy",

"ruski", "commie",

"ching chong", "chingchong", "bamboo coon",

"monkey", "gorilla", "ape", "savage" /* context dependent but often used racially */,

// More comprehensive additions
"buckwheat", "charcoal", "coalburner", "ebony", "jungle bunny", "moon cricket",
"pickaninny", "sambo", "shine", "smoked irish", "snowflake" /* sometimes used racially */,

"ching chong", "gong", "jook", "oriental", "squint", "yellow peril",

"hebe", "hooknose", "oven dodger", "shylock",

"beaner", "brownie", "cabbage eater", "goat roper", "greaser", "halfbreed", "half caste",
"latino" /* sometimes used negatively */, "mojado", "pepperbelly", "tacohead",

"hadji", "hajji", "kebab", "muzzie", "muzzie", "rag head", "sand monkey", "turbanator",

"curry nigger", "dothead", "pajeet", "streetshitter",

"cracker", "gringo", "haole", "honky", "ofay", "paleface", "redneck", "roundeye", "white devil",

"bimbo" /* sometimes ethnic */, "cholo", "cholo", "eskimo", "injun", "redskin", "squaw",
"timber nigger", "wagon burner",

// Additional modern / variant forms
"nigguh", "niggur", "nig", "kneegrow", "af", "africoon",
"chinkster", "gookster", "kikester",
"spickster", "wetbackster",
"raghead", "towelhead", "sandnigger",
"pakistani" /* often used derogatorily as "paki" */,
"arab" /* context dependent */, "terrorist" /* often used as slur */,

// Leetspeak / common bypasses for racial terms
"n1gg3r", "n1gga", "nigg4", "n1g", "ch1nk", "g00k", "k1ke", "sp1c", "w3tback", "b3aner",
"r4ghead", "t0welhead", "c00n", "j1gaboo",

    // === TRANSGENDER / GENDER IDENTITY SLURS & DEROGATORY TERMS ===
"tranny", "trannies", "trannie", "trannys",
"shemale", "she-male", "shemales",
"he-she", "heshe", "he/she",
"trap", "traps", "trapfag",
"ladyboy", "ladyboys",
"shim", "chick with a dick", "dickgirl", "dickgirls",
"transvestite", "transvestites", // often used derogatorily
"crossdresser" /* sometimes used negatively */,
"gender bender", "genderbend",
"troon", "troons", "troonery",
"autogynephile", "autogynephilia", "agp",
"tim", "tims", // "trans-identified male"
"tif", "tifs", // "trans-identified female"
"transbian", // sometimes used mockingly
"transmaxxing", "transmax",
"hon", "hons", // "honey" used sarcastically in certain communities
"passing" /* context dependent */,
"clocked", "clockable",

// More explicit / vulgar terms
"man in a dress", "man in dress", "woman in a dress" /* often used negatively */,
"fake woman", "fake man", "pretend woman", "pretend man",
"biological male", "biological female" /* weaponized in debates */,
"chromosomally challenged",
"mentally ill" /* very common in derogatory context */,
"delusional", "delusional man", "delusional woman",

// Common online / 4chan-style terms
"troon", "trooncord", "troonout",
"xdresser", "x-dresser",
"mtf", "ftm" /* sometimes used mockingly */,
"enby" /* occasionally derogatory */,
"theyfab", "they/them" /* used negatively */,

// Leetspeak & bypass variations
"tr4nny", "tr4nnies", "tr4nnie",
"sh3male", "sh3males",
"tr@p", "tr@ps",
"l4dyboy", "l4dyboys",
"h3-sh3", "h3sh3",
"trannyfag", "tranniefag",
    // === DISABILITY / ABLEIST SLURS & DEROGATORY TERMS ===
"retard", "retarded", "retards", "r tard", "rtard", "tard", "tards", "tarded",
"mong", "mongoloid", "mongol", "spaz", "spastic", "spazzy", "spazout",
"cripple", "crip", "crippled", "crips", "gimp", "gimpy", "gimps",
"lame", "lamo", "lameass", "lamebrain",
"dumb", "dumbo", "dummy", "dummies", "deaf and dumb", "deafmute",
"idiot", "idiots", "idiotic", "imbecile", "imbeciles",
"moron", "morons", "moronic", "cretin", "cretins",
"feebleminded", "feeble minded", "simpleton", "halfwit", "dimwit", "nitwit",
"psycho", "psychotic", "psychopath", "schizo", "schizophrenic", "schiz",
"crazy", "crazies", "insane", "lunatic", "loony", "loon", "mad", "nuts", "nutjob",
"deranged", "deranged", "mental", "mentally ill", "mental case", "headcase",
"windowlicker", "shortbus", "short bus", "special ed", "sped", "sped kid",
"downie", "down syndrome" /* often used as insult */, "downy",
"autistic", "autist", "autismo", "asperger", "aspie" /* sometimes derogatory */,
"blind", "blind as a bat", "one eyed", "four eyes",
"deaf", "deafmute", "deaf and dumb",
"mute", "midget", "dwarf", "freak", "freakshow", "sideshow",
"invalid", "handicapped", "handicap", "wheelchair bound", "confined to wheelchair",
"vegetable", "veg", "braindead", "brain damaged", "vegetative",
"spastic", "spaz", "flid", "fliddy", "raspberry ripple", "rasp",
"harelip", "harelipped", "clubfoot", "hunchback", "hunchbacked",
"baldy", "baldie", "four eyes", "bucktoothed",
"slow", "slowpoke", "slow in the head", "slow minded",
"subnormal", "defective", "deformed", "disfigured", "birth defect",
"epileptic", "epileptic fit", "seizure boy",
"cancer" /* sometimes used as insult like "you have cancer" */,
"leper", "leprosy",
"paralyzed", "paralytic", "quad", "quadriplegic" /* derogatory use */,
"blind leading the blind", "fall on deaf ears", "turn a blind eye",
"crippling", "crippling anxiety", "crippled by", "lame excuse",
"nuts", "bonkers", "batshit", "batshit crazy", "off your rocker",
"basket case", "headcase", "fruitcake", "nutcase",
"retard strength", "tard wrangler", "tard herd",
"mongo", "mongol", "spacker", "spack", "spacky",
"joey" /* sometimes used for Down syndrome */,
"rainman", "forrest gump" /* used mockingly */,
"special needs", "special", "spec", "spec ed",
"learning disabled", "ld", "add", "adhd" /* used as insult */,
"ocd" /* "I'm so ocd" as insult */,
"bipolar" /* "you're so bipolar" */,
"depressed" /* used lightly as insult */,
"ptsd" /* trivialized */,
"disabled" /* sometimes weaponized */,
"invalid", "burden", "useless eater",

// Leetspeak & bypass variations
"r3tard", "r3t4rd", "r tard", "t4rd", "sp4z", "spazzy", "cr1pple", "cr1p", "g1mp",
"1diot", "1mbecile", "m0ron", "psych0", "sch1zo", "cr4zy", "1nsane", "l4me",
"d3ranged", "m3ntal", "aut1st", "aut1sm", "bl1nd", "d3af", "m0ng", "m0ngoloid",
"b4tshit", "n0rmie", /* sometimes reverse used */, "normie",

    // === INAPPROPRIATE GEN ALPHA SEXUAL / VULGAR / CURSE SLANG ===
    "gyatt", "gyat", "gyattt", "level10gyatt", "level 10 gyatt",
    "bop", // promiscuous/slut
    "huzz", "chuzz", "chopped huzz", // derogatory for women/hoes
    "glizzy", // dick / penis
    "304", "three oh four", // "hoe"
    "gooner", "gooning", "goon", "goonette", // excessive masturbation / porn addict
    "edging", "edge",
    "jelq", "jelqing", // penis enlargement masturbation technique
    "coomer", // chronic masturbator / porn addict
    "pegged", "pegging", // strap-on sex (usually male receiving)
    "oil up", "lube up", // sexual prep reference
    "bomboclat", "bombaclat", "claat", // strong Jamaican curse (~fuck)
    "sybau", "syba", // "shut your bitch ass up"
    "fine shyt", "fine shit", // objectifying "fine pussy/ass"
    "big back", // often used in a derogatory sexual/body-shaming way
    "zesty",// often used as a soft slur for gay/effeminate
    
        // === ADDITIONAL / EMERGING DRUGS & SLANG (not in previous sections) ===
    // Newer / Designer / Research Chemicals
    "fentanyl analogues", "fentalogues", "nitazenes", "iso", "etonitazene", "metonitazene",
    "xylazine", "tranq", "tranq dope", // already have some xylazine but add phrases
    "kratom", "kratom", "mitragyna",
    "tianeptine", "gas station heroin", "za za red",
    "phenibut", "ghb", "ghb", "liquid ecstasy",
    "2c-b", "2cb", "2c-i", "2ci", "2c-t", "nbome", "25i", "25c",
    "lsd analogues", "1p-lsd", "1cp-lsd", "ald-52",
    "dmt", "dmt cart", "dmt vape", "changa",
    "salvia", "salvia divinorum", "divinorum",
    "ayahuasca", "huasca", "dmt brew",
    "mescaline", "peyote", "san pedro",
    "psilocybin", "mushroom chocolate", "shroom bar", "shroom gummies",
    "ket", "special k", "ketamine", "k hole", // variations
    "dxm", "dextromethorphan", "robotripping", "dex", "ccc",
    "benadryl", "dph", "deliriants",

    // Cannabis & Concentrates (newer terms)
    "delta 8", "delta8", "delta 9", "delta9", "thca", "thc-a",
    "live resin", "rosin", "hash rosin", "diamond sauce", "terps",
    "dispo", "disposable", "cart", "thc cart", "weed pen",
    "edible", "gummy", "delta gummy", "mushroom gummy",

    // Stimulants & Misc
    "cocaine", "coke", "crack", // already have, but add:
    "flakka", "bath salts", "alpha pvp", "pvp", "mdphp",
    "3mmc", "3cmc", "3mmc", "cathinone", "bath salt",
    "amphetamine", "addies", "speed", "meth", // variations
    "coke", "yayo", "snow", "blow", "white girl",

    // Opioids & Painkillers (more street/brand)
    "fent", "fetty", "fent press", "fent 30s", "blues", "m30s",
    "oxy", "perc", "percs", "roxy", "hydros", "norco", "dilaudid",
    "heroin", "smack", "dope", "boy", "china", "black tar",
    "suboxone", "subbies", "subs", "bupe", "zubsolv",
    "methadone", "dolophine", "diskettes",

    // Prescription & Benzos
    "xan", "xans", "xannies", "bars", "xanax bar",
    "klonopin", "klons", "kpins", "valium", "ativan", "lorazepam",
    "ambien", "zombie pill", "stilnox",
    "adderall", "addy", "vyanse", "concerta",

    // Alcohol & Misc Intoxicants
    "lean", "dirty sprite", "sizzurp", "purple", "wock", "act",
    "alcohol", "booze", "liquor", "drunk", "wasted", "hammered",
    "poppers", "rush", "jungle juice", "amyl nitrite",

    // Drug-related verbs / actions / culture
    "tweak", "tweaking", "geeking", "fiend", "jonesing",
    "nod", "nodding", "nod out", "zombie", "perched",
    "rolling", "roll", "molly roll",
    "trip", "tripping", "acid trip", "bad trip",
    "hot rail", "hotrailing", "boof", "boofing", "plugging",
    "parachute", "parachuting", "monkey water",
    "overdose", "od", "fent od", " Narcan", "naloxone"
];
// 2. Inject CSS Styles directly into <head>
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
  .modal-overlay.show-modal {
    display: flex;
  }
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
  .modal-content button:hover {
    background-color: #0056b3;
  }
`;

const styleTag = document.createElement('style');
styleTag.textContent = modalStyles;
document.head.appendChild(styleTag);

// 3. Inject Modal DOM elements into <body>
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

  // Close button click handler
  document.getElementById('closeModalBtn').addEventListener('click', () => {
    modalOverlay.classList.remove('show-modal');
  });
}

// Ensure DOM is populated before appending HTML
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', injectModalHTML);
} else {
  injectModalHTML();
}

// 4. Regex Pattern Construction
// Sort by length (longest phrases first) to prevent sub-phrase misfires
const sortedBadWords = badWords
    .filter(Boolean)
    .sort((a, b) => b.length - a.length);

const patternString = sortedBadWords
    .map(phrase => {
        const escaped = phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        return escaped.replace(/\s+/g, '\\s+');
    })
    .join('|');

const badWordRegex = patternString 
    ? new RegExp(`\\b(${patternString})\\b`, 'gi')
    : null;

// 5. Profanity Verification Function
function containsBadWords(message) {
    if (!message || typeof message !== 'string' || !badWordRegex) return false;
    const normalizedMessage = message.trim().replace(/\s+/g, ' ');
    badWordRegex.lastIndex = 0;
    return badWordRegex.test(normalizedMessage);
}

// 6. Bind Listener to Input Element
function attachFilterToInput(inputId) {
    const inputField = document.getElementById(inputId);
    if (!inputField) return;

    inputField.addEventListener('change', () => {
        const modal = document.getElementById('profanityModal');
        if (containsBadWords(inputField.value)) {
            if (modal) modal.classList.add('show-modal');
            inputField.value = '';
        }
    });
}

// Expose functions globally
window.containsBadWords = containsBadWords;
window.attachFilterToInput = attachFilterToInput;
