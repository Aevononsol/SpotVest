import { createServer } from "node:http";
import { readFile, writeFile } from "node:fs/promises";
import { existsSync, readFileSync } from "node:fs";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";
import { fetchDemandMomentum } from "./services/googleTrends.js";

const root = fileURLToPath(new URL(".", import.meta.url));
const port = Number(process.env.PORT || 5174);
const startedAt = new Date();

const contentTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".txt": "text/plain; charset=utf-8"
};

const allowedKeyNames = [
  "CENSUS_API_KEY",
  "GOOGLE_PLACES_API_KEY",
  "NYC_OPEN_DATA_APP_TOKEN",
  "OPENAI_API_KEY"
];

const isHostedProduction = process.env.NODE_ENV === "production" || Boolean(process.env.RENDER);
const responseCache = new Map();
const cacheTtl = {
  census: 24 * 60 * 60 * 1000,
  openData: 20 * 60 * 1000,
  google: 20 * 60 * 1000,
  geocode: 24 * 60 * 60 * 1000,
  openaiSearch: 6 * 60 * 60 * 1000
};

const restaurantTerms = {
  deli: ["DELI", "DELICATESSEN", "BODEGA"],
  pizza: ["PIZZA", "PIZZERIA"],
  cafe: ["CAFE", "COFFEE", "ESPRESSO"],
  coffee: ["CAFE", "COFFEE", "ESPRESSO"],
  bakery: ["BAKERY", "BAGEL"],
  breakfast: ["BREAKFAST", "BRUNCH", "PANCAKE"],
  italian: ["ITALIAN", "PASTA"],
  greek: ["GREEK"],
  mediterranean: ["MEDITERRANEAN", "HALAL", "MIDDLE EASTERN", "FALAFEL", "SHAWARMA"],
  turkish: ["TURKISH", "KEBAB", "DONER"],
  french: ["FRENCH", "BISTRO", "BRASSERIE"],
  japanese: ["JAPANESE", "SUSHI", "RAMEN"],
  chinese: ["CHINESE", "DIM SUM"],
  korean: ["KOREAN"],
  thai: ["THAI"],
  vietnamese: ["VIETNAMESE", "PHO", "BANH MI", "CAMBODIAN", "MALAYSIA"],
  filipino: ["FILIPINO"],
  indian: ["INDIAN"],
  pakistani: ["PAKISTANI", "BANGLADESHI", "BENGALI"],
  mexican: ["MEXICAN", "TACO"],
  latin: ["LATIN", "SPANISH"],
  dominican: ["DOMINICAN"],
  "puerto rican": ["PUERTO RICAN"],
  peruvian: ["PERUVIAN"],
  colombian: ["COLOMBIAN"],
  brazilian: ["BRAZILIAN"],
  caribbean: ["CARIBBEAN", "JAMAICAN", "HAITIAN", "TRINIDADIAN"],
  african: ["AFRICAN", "NIGERIAN", "GHANAIAN"],
  ethiopian: ["ETHIOPIAN"],
  american: ["AMERICAN", "DINER"],
  burger: ["BURGER", "HAMBURGER"],
  chicken: ["CHICKEN", "WINGS"],
  bbq: ["BBQ", "BARBECUE", "BARBEQUE"],
  seafood: ["SEAFOOD", "FISH", "LOBSTER", "CRAB"],
  steakhouse: ["STEAKHOUSE", "STEAK"],
  vegan: ["VEGAN", "VEGETARIAN"],
  juice: ["JUICE", "SMOOTHIE", "ACAI"],
  dessert: ["DESSERT", "ICE CREAM", "GELATO", "DONUT", "YOGURT", "ICES"],
  "bubble tea": ["BUBBLE TEA", "BOBA"],
  bar: ["BAR", "PUB", "TAVERN", "COCKTAIL"],
  "food truck": ["FOOD TRUCK", "FOOD CART", "CART"],
  restaurant: [""]
};

const restaurantConceptModels = [
  { key: "pizza", label: "Pizza / slice shop", search: "pizza" },
  { key: "deli", label: "Deli / bodega", search: "deli bodega" },
  { key: "breakfast", label: "Breakfast / brunch", search: "breakfast brunch restaurant" },
  { key: "italian", label: "Italian", search: "Italian restaurant" },
  { key: "greek", label: "Greek", search: "Greek restaurant" },
  { key: "mediterranean", label: "Mediterranean / halal", search: "Mediterranean halal restaurant" },
  { key: "turkish", label: "Turkish", search: "Turkish restaurant" },
  { key: "japanese", label: "Japanese / sushi", search: "Japanese sushi restaurant" },
  { key: "chinese", label: "Chinese", search: "Chinese restaurant" },
  { key: "korean", label: "Korean", search: "Korean restaurant" },
  { key: "thai", label: "Thai", search: "Thai restaurant" },
  { key: "vietnamese", label: "Vietnamese / pho", search: "Vietnamese pho restaurant" },
  { key: "indian", label: "Indian", search: "Indian restaurant" },
  { key: "pakistani", label: "Pakistani / Bangladeshi", search: "Pakistani Bangladeshi restaurant" },
  { key: "mexican", label: "Mexican", search: "Mexican restaurant" },
  { key: "latin", label: "Latin American", search: "Latin American restaurant" },
  { key: "dominican", label: "Dominican", search: "Dominican restaurant" },
  { key: "caribbean", label: "Caribbean / Jamaican", search: "Caribbean Jamaican restaurant" },
  { key: "american", label: "American / diner", search: "American diner restaurant" },
  { key: "burger", label: "Burger", search: "burger restaurant" },
  { key: "chicken", label: "Chicken / wings", search: "chicken wings restaurant" },
  { key: "seafood", label: "Seafood", search: "seafood restaurant" },
  { key: "vegan", label: "Vegan / vegetarian", search: "vegan vegetarian restaurant" },
  { key: "juice", label: "Juice / smoothie", search: "juice smoothie" },
  { key: "dessert", label: "Dessert / ice cream", search: "dessert ice cream" },
  { key: "bubble tea", label: "Bubble tea", search: "bubble tea boba" },
  { key: "cafe", label: "Cafe / bakery", search: "cafe bakery" }
];

const dcwpTerms = {
  laundromat: ["LAUNDRY", "LAUNDROMAT"],
  laundry: ["LAUNDRY", "LAUNDROMAT"],
  gym: ["GYM", "FITNESS", "HEALTH CLUB"],
  "bike shop": ["BIKE SHOP", "BICYCLE SHOP", "BICYCLE STORE", "BIKE REPAIR"],
  "smoke shop": ["TOBACCO", "ELECTRONIC CIGARETTE", "VAPE"],
  vape: ["TOBACCO", "ELECTRONIC CIGARETTE", "VAPE"],
  daycare: ["DAY CARE", "CHILD CARE"],
  salon: ["SALON", "BARBER", "BEAUTY"],
  barber: ["BARBER"],
  "nail salon": ["NAIL", "MANICURE", "PEDICURE"],
  spa: ["SPA", "BEAUTY", "FACIAL"],
  "dry cleaner": ["DRY CLEAN", "CLEANER", "TAILOR"],
  pharmacy: ["PHARMACY", "DRUG"],
  grocery: ["GROCERY", "MARKET", "SUPERMARKET"],
  retail: ["RETAIL", "STORE"],
  clothing: ["CLOTHING", "APPAREL", "FASHION"],
  "pet store": ["PET", "DOG", "GROOMING"],
  tutoring: ["TUTOR", "LEARNING", "EDUCATION"],
  "urgent care": ["URGENT CARE", "CLINIC", "MEDICAL"],
  medical: ["MEDICAL", "DOCTOR", "CLINIC"],
  dental: ["DENTAL", "DENTIST", "ORTHODONT"],
  "liquor store": ["LIQUOR", "WINE", "SPIRITS"],
  hardware: ["HARDWARE", "TOOLS"],
  electronics: ["ELECTRONICS", "COMPUTER"],
  "phone repair": ["PHONE REPAIR", "CELL PHONE", "MOBILE REPAIR"]
};

const knownChains = [
  "STARBUCKS", "DUNKIN", "MCDONALD", "BURGER KING", "WENDY", "CHIPOTLE", "SUBWAY", "TACO BELL",
  "KFC", "POPEYES", "DOMINO", "PAPA JOHN", "PIZZA HUT", "TARGET", "WALMART", "CVS", "WALGREENS",
  "RITE AID", "7-ELEVEN", "SEVEN ELEVEN", "WHOLE FOODS", "TRADER JOE", "PLANET FITNESS", "BLINK",
  "EQUINOX", "ORANGETHEORY", "CHASE", "BANK OF AMERICA", "TD BANK", "T-MOBILE", "VERIZON", "AT&T"
];

function loadEnv() {
  const envPath = join(root, ".env");
  if (!existsSync(envPath)) return;

  const lines = readFileSync(envPath, "utf8").split(/\r?\n/);
  lines.forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) return;

    const splitAt = trimmed.indexOf("=");
    if (splitAt === -1) return;

    const key = trimmed.slice(0, splitAt).trim();
    const value = trimmed.slice(splitAt + 1).trim().replace(/^["']|["']$/g, "");
    if (key) process.env[key] = value;
  });
}

function readRequestJson(request) {
  return new Promise((resolve, reject) => {
    let body = "";
    request.on("data", (chunk) => {
      body += chunk;
      if (body.length > 100_000) {
        request.destroy();
        reject(new Error("Request body too large"));
      }
    });
    request.on("end", () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch {
        reject(new Error("Invalid JSON"));
      }
    });
    request.on("error", reject);
  });
}

async function saveEnvKeys(keys) {
  const envPath = join(root, ".env");
  const current = {};

  if (existsSync(envPath)) {
    readFileSync(envPath, "utf8")
      .split(/\r?\n/)
      .forEach((line) => {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith("#")) return;
        const splitAt = trimmed.indexOf("=");
        if (splitAt === -1) return;
        current[trimmed.slice(0, splitAt).trim()] = trimmed.slice(splitAt + 1).trim();
      });
  }

  allowedKeyNames.forEach((name) => {
    const incoming = typeof keys[name] === "string" ? keys[name].trim() : "";
    if (incoming) current[name] = incoming;
    if (!(name in current)) current[name] = "";
    process.env[name] = current[name];
  });

  const contents = `${allowedKeyNames.map((name) => `${name}=${current[name] || ""}`).join("\n")}\n`;
  await writeFile(envPath, contents, "utf8");
}

function keyStatus() {
  return {
    census: Boolean(process.env.CENSUS_API_KEY),
    googlePlaces: Boolean(process.env.GOOGLE_PLACES_API_KEY),
    nycOpenData: Boolean(process.env.NYC_OPEN_DATA_APP_TOKEN),
    openai: Boolean(process.env.OPENAI_API_KEY),
    canSaveKeys: !isHostedProduction
  };
}

function sendJson(response, statusCode, data) {
  response.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store"
  });
  response.end(JSON.stringify(data, null, 2));
}

function normalizeBusiness(value) {
  const normalized = String(value || "").trim().toLowerCase();
  if (normalized.includes("pizza")) return "pizza";
  if (normalized.includes("italian") || normalized.includes("pasta")) return "italian";
  if (normalized.includes("greek")) return "greek";
  if (normalized.includes("mediterranean") || normalized.includes("halal") || normalized.includes("middle eastern")) return "mediterranean";
  if (normalized.includes("turkish") || normalized.includes("kebab") || normalized.includes("doner")) return "turkish";
  if (normalized.includes("french") || normalized.includes("bistro") || normalized.includes("brasserie")) return "french";
  if (normalized.includes("japanese") || normalized.includes("sushi") || normalized.includes("ramen")) return "japanese";
  if (normalized.includes("chinese") || normalized.includes("dim sum")) return "chinese";
  if (normalized.includes("korean")) return "korean";
  if (normalized.includes("thai")) return "thai";
  if (normalized.includes("vietnamese") || normalized.includes("pho") || normalized.includes("banh mi")) return "vietnamese";
  if (normalized.includes("filipino")) return "filipino";
  if (normalized.includes("indian")) return "indian";
  if (normalized.includes("pakistani") || normalized.includes("bangladeshi") || normalized.includes("bengali")) return "pakistani";
  if (normalized.includes("mexican") || normalized.includes("taco")) return "mexican";
  if (normalized.includes("dominican")) return "dominican";
  if (normalized.includes("puerto rican")) return "puerto rican";
  if (normalized.includes("peruvian")) return "peruvian";
  if (normalized.includes("colombian")) return "colombian";
  if (normalized.includes("brazilian")) return "brazilian";
  if (normalized.includes("caribbean") || normalized.includes("jamaican") || normalized.includes("haitian")) return "caribbean";
  if (normalized.includes("ethiopian")) return "ethiopian";
  if (normalized.includes("african") || normalized.includes("nigerian") || normalized.includes("ghanaian")) return "african";
  if (normalized.includes("latin") || normalized.includes("spanish food")) return "latin";
  if (normalized.includes("burger") || normalized.includes("hamburger")) return "burger";
  if (normalized.includes("chicken") || normalized.includes("wings")) return "chicken";
  if (normalized.includes("bbq") || normalized.includes("barbecue") || normalized.includes("barbeque")) return "bbq";
  if (normalized.includes("seafood") || normalized.includes("lobster") || normalized.includes("crab")) return "seafood";
  if (normalized.includes("steak")) return "steakhouse";
  if (normalized.includes("vegan") || normalized.includes("vegetarian")) return "vegan";
  if (normalized.includes("juice") || normalized.includes("smoothie") || normalized.includes("acai")) return "juice";
  if (normalized.includes("dessert") || normalized.includes("ice cream") || normalized.includes("gelato") || normalized.includes("donut")) return "dessert";
  if (normalized.includes("bubble tea") || normalized.includes("boba")) return "bubble tea";
  if (normalized.includes("bar") || normalized.includes("pub") || normalized.includes("tavern")) return "bar";
  if (normalized.includes("food truck") || normalized.includes("food cart")) return "food truck";
  if (normalized.includes("breakfast") || normalized.includes("brunch")) return "breakfast";
  if (normalized.includes("american") || normalized.includes("diner")) return "american";
  if (normalized.includes("deli") || normalized.includes("bodega") || normalized.includes("corner store")) return "deli";
  if (normalized.includes("coffee") || normalized.includes("cafe")) return "cafe";
  if (normalized.includes("laundr")) return "laundromat";
  if (normalized.includes("dry clean") || normalized.includes("tailor")) return "dry cleaner";
  if (normalized.includes("smoke") || normalized.includes("vape") || normalized.includes("tobacco")) return "smoke shop";
  if (normalized.includes("gym") || normalized.includes("fitness")) return "gym";
  if (normalized.includes("bike") || normalized.includes("bicycle") || normalized.includes("cycling")) return "bike shop";
  if (normalized.includes("daycare") || normalized.includes("child")) return "daycare";
  if (normalized.includes("barber")) return "barber";
  if (normalized.includes("nail") || normalized.includes("manicure") || normalized.includes("pedicure")) return "nail salon";
  if (normalized.includes("spa") || normalized.includes("facial")) return "spa";
  if (normalized.includes("salon") || normalized.includes("beauty")) return "salon";
  if (normalized.includes("pharmacy") || normalized.includes("drugstore") || normalized.includes("drug store")) return "pharmacy";
  if (normalized.includes("grocery") || normalized.includes("supermarket") || normalized.includes("market")) return "grocery";
  if (normalized.includes("clothing") || normalized.includes("boutique") || normalized.includes("apparel") || normalized.includes("fashion")) return "clothing";
  if (normalized.includes("pet") || normalized.includes("dog grooming")) return "pet store";
  if (normalized.includes("tutor") || normalized.includes("learning center") || normalized.includes("test prep")) return "tutoring";
  if (normalized.includes("urgent care") || normalized.includes("walk-in clinic")) return "urgent care";
  if (normalized.includes("dental") || normalized.includes("dentist") || normalized.includes("orthodont")) return "dental";
  if (normalized.includes("medical") || normalized.includes("doctor") || normalized.includes("clinic")) return "medical";
  if (normalized.includes("liquor") || normalized.includes("wine shop") || normalized.includes("wine store") || normalized.includes("spirits")) return "liquor store";
  if (normalized.includes("hardware") || normalized.includes("tools")) return "hardware";
  if (normalized.includes("phone repair") || normalized.includes("cell phone repair") || normalized.includes("mobile repair")) return "phone repair";
  if (normalized.includes("electronics") || normalized.includes("computer store") || normalized.includes("tech store")) return "electronics";
  if (normalized.includes("retail") || normalized.includes("store") || normalized.includes("shop")) return "retail";
  if (normalized.includes("bakery") || normalized.includes("bagel")) return "bakery";
  if (
    normalized.includes("restaurant") ||
    normalized.includes("resturant") ||
    normalized.includes("dining") ||
    normalized.includes("eatery") ||
    normalized.includes("food")
  ) return "restaurant";
  return normalized || "business";
}

function titleCase(value) {
  return String(value || "")
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function soqlTextFilter(fields, terms) {
  const activeTerms = terms.filter(Boolean);
  if (!activeTerms.length) return "1=1";

  return activeTerms
    .flatMap((term) => fields.map((field) => `upper(${field}) like '%${term.replaceAll("'", "''")}%'`))
    .join(" OR ");
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function redactedCacheKey(url, suffix = "") {
  return `${String(url).replace(/([?&]key=)[^&]+/g, "$1__redacted__")}${suffix}`;
}

function readCache(key) {
  const cached = responseCache.get(key);
  if (!cached) return null;
  if (cached.expiresAt <= Date.now()) {
    responseCache.delete(key);
    return null;
  }
  return structuredClone(cached.value);
}

function writeCache(key, value, ttlMs) {
  if (!ttlMs || ttlMs <= 0) return;
  if (responseCache.size > 600) {
    const now = Date.now();
    for (const [cacheKey, cached] of responseCache) {
      if (cached.expiresAt <= now || responseCache.size > 450) responseCache.delete(cacheKey);
    }
  }
  responseCache.set(key, {
    expiresAt: Date.now() + ttlMs,
    value: structuredClone(value)
  });
}

async function cachedJsonFetch(url, { headers = {}, timeoutMs = 5000, ttlMs = 0, cacheSuffix = "" } = {}) {
  const key = redactedCacheKey(url, cacheSuffix);
  const cached = readCache(key);
  if (cached) return cached;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, { headers, signal: controller.signal });
    const data = await response.json();
    const result = { ok: response.ok, status: response.status, data };
    if (response.ok) writeCache(key, result, ttlMs);
    return result;
  } finally {
    clearTimeout(timeout);
  }
}

async function fetchJsonWithTimeout(url, timeoutMs = 5000) {
  const result = await cachedJsonFetch(url, { timeoutMs, ttlMs: cacheTtl.google });
  return {
    response: { ok: result.ok, status: result.status },
    data: result.data
  };
}

function distanceMiles(aLat, aLng, bLat, bLng) {
  const toRadians = (degrees) => (Number(degrees) * Math.PI) / 180;
  const lat1 = toRadians(aLat);
  const lat2 = toRadians(bLat);
  const deltaLat = toRadians(bLat - aLat);
  const deltaLng = toRadians(bLng - aLng);
  const haversine =
    Math.sin(deltaLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(deltaLng / 2) ** 2;
  return 3958.8 * 2 * Math.atan2(Math.sqrt(haversine), Math.sqrt(1 - haversine));
}

function withinSearchRadius(record, location) {
  if (!location?.lat || !location?.lng) return true;
  if (!record.lat || !record.lng) return false;
  return distanceMiles(location.lat, location.lng, record.lat, record.lng) <= Number(location.radiusMiles || 0.5);
}

async function socrataJson(resource, params) {
  const url = new URL(`https://data.cityofnewyork.us/resource/${resource}.json`);
  Object.entries(params).forEach(([key, value]) => url.searchParams.set(key, value));

  const headers = {};
  if (process.env.NYC_OPEN_DATA_APP_TOKEN) {
    headers["X-App-Token"] = process.env.NYC_OPEN_DATA_APP_TOKEN;
  }

  const result = await cachedJsonFetch(url, {
    headers,
    timeoutMs: 6500,
    ttlMs: cacheTtl.openData,
    cacheSuffix: process.env.NYC_OPEN_DATA_APP_TOKEN ? ":token" : ":public"
  });
  if (!result.ok) {
    throw new Error(`NYC Open Data ${resource} returned ${result.status}`);
  }
  return result.data;
}

async function dataNyJson(resource, params) {
  const url = new URL(`https://data.ny.gov/resource/${resource}.json`);
  Object.entries(params).forEach(([key, value]) => url.searchParams.set(key, value));

  const result = await cachedJsonFetch(url, {
    timeoutMs: 6500,
    ttlMs: cacheTtl.openData
  });
  if (!result.ok) {
    throw new Error(`NY Open Data ${resource} returned ${result.status}`);
  }
  return result.data;
}

function firstCount(row) {
  if (!row) return 0;
  const value = Object.values(row)[0];
  return Number(value || 0);
}

function numberValue(value) {
  const number = Number(value);
  return Number.isFinite(number) && number > -666666 ? number : null;
}

function scoreRange(value, min, max) {
  if (value === null || value === undefined) return 50;
  return Math.max(0, Math.min(100, Math.round(((value - min) / (max - min)) * 100)));
}

function isoDaysAgo(days) {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date.toISOString().slice(0, 10);
}

function typedCount(row) {
  return Number(row?.count || row?.count_1 || Object.values(row || {})[1] || 0);
}

function typedNumber(value) {
  const number = Number(value);
  return Number.isFinite(number) ? number : 0;
}

async function fetchCensusProfile(zip) {
  const variables = [
    "NAME",
    "B01003_001E",
    "B19013_001E",
    "B01002_001E",
    "B11001_001E",
    "B25003_001E",
    "B25003_003E",
    "B25064_001E",
    "B15003_001E",
    "B15003_022E",
    "B15003_023E",
    "B15003_024E",
    "B15003_025E"
  ];

  const url = new URL("https://api.census.gov/data/2023/acs/acs5");
  url.searchParams.set("get", variables.join(","));
  url.searchParams.set("for", `zip code tabulation area:${zip}`);
  if (process.env.CENSUS_API_KEY) url.searchParams.set("key", process.env.CENSUS_API_KEY);

  const censusResult = await cachedJsonFetch(url, {
    timeoutMs: 6500,
    ttlMs: cacheTtl.census,
    cacheSuffix: process.env.CENSUS_API_KEY ? ":key" : ":public"
  });
  if (!censusResult.ok) throw new Error(`Census returned ${censusResult.status}`);
  const rows = censusResult.data;
  if (!Array.isArray(rows) || rows.length < 2) throw new Error("No Census row");

  const headers = rows[0];
  const row = Object.fromEntries(headers.map((header, index) => [header, rows[1][index]]));
  const population = numberValue(row.B01003_001E);
  const medianIncome = numberValue(row.B19013_001E);
  const medianAge = numberValue(row.B01002_001E);
  const households = numberValue(row.B11001_001E);
  const occupiedHousing = numberValue(row.B25003_001E);
  const renters = numberValue(row.B25003_003E);
  const medianRent = numberValue(row.B25064_001E);
  const educationBase = numberValue(row.B15003_001E);
  const bachelorPlus =
    (numberValue(row.B15003_022E) || 0) +
    (numberValue(row.B15003_023E) || 0) +
    (numberValue(row.B15003_024E) || 0) +
    (numberValue(row.B15003_025E) || 0);
  const renterShare = occupiedHousing ? Math.round((renters / occupiedHousing) * 100) : null;
  const bachelorShare = educationBase ? Math.round((bachelorPlus / educationBase) * 100) : null;

  return {
    zip,
    name: row.NAME,
    population,
    medianIncome,
    medianAge,
    households,
    renterShare,
    medianRent,
    bachelorShare,
    signals: {
      income: scoreRange(medianIncome, 35000, 180000),
      rent: scoreRange(medianRent, 900, 4200),
      families: renterShare === null ? 55 : Math.max(30, 100 - Math.round(renterShare * 0.55)),
      student: medianAge === null ? 45 : Math.max(20, Math.min(85, Math.round(95 - medianAge * 1.5))),
      chainFit: scoreRange(medianIncome, 45000, 170000),
      localPreference: renterShare === null ? 70 : Math.max(50, Math.min(90, Math.round(92 - renterShare * 0.25)))
    },
    source: "Census ACS 2023 5-year ZIP Code Tabulation Area"
  };
}

async function countRestaurants(zip, business) {
  const terms = restaurantTerms[business];
  if (!terms) return 0;

  const where = [
    `zipcode='${zip}'`,
    terms.some(Boolean) ? `(${soqlTextFilter(["dba", "cuisine_description"], terms)})` : "1=1"
  ].join(" AND ");

  const rows = await socrataJson("43nn-pn8j", {
    $select: "count(DISTINCT camis)",
    $where: where
  });

  return firstCount(rows[0]);
}

async function countDcwpBusinesses(zip, business) {
  const terms = dcwpTerms[business] || [business.toUpperCase()];
  const where = [
    `address_zip='${zip}'`,
    "license_status='Active'",
    `(${soqlTextFilter(["business_name", "dba_trade_name", "business_category", "detail"], terms)})`
  ].join(" AND ");

  const rows = await socrataJson("w7w3-xahh", {
    $select: "count(DISTINCT license_nbr)",
    $where: where
  });

  return firstCount(rows[0]);
}

async function businessTenure(zip, business) {
  const normalized = normalizeBusiness(business);
  const restaurantTermsForBusiness = restaurantTerms[normalized];
  const dcwpTermsForBusiness = dcwpTerms[normalized] || [normalized.toUpperCase()];
  const results = [];

  if (restaurantTermsForBusiness) {
    const restaurantWhere = [
      `zipcode='${zip}'`,
      restaurantTermsForBusiness.some(Boolean)
        ? `(${soqlTextFilter(["dba", "cuisine_description"], restaurantTermsForBusiness)})`
        : "1=1"
    ].join(" AND ");
    const rows = await socrataJson("43nn-pn8j", {
      $select: "min(inspection_date)",
      $where: restaurantWhere
    }).catch(() => []);
    if (rows[0]?.min_inspection_date) {
      results.push({ label: "Earliest restaurant inspection", date: rows[0].min_inspection_date });
    }
  }

  const dcwpWhere = [
    `address_zip='${zip}'`,
    "license_status='Active'",
    `(${soqlTextFilter(["business_name", "dba_trade_name", "business_category", "detail"], dcwpTermsForBusiness)})`
  ].join(" AND ");
  const rows = await socrataJson("w7w3-xahh", {
    $select: "min(license_creation_date)",
    $where: dcwpWhere
  }).catch(() => []);
  if (rows[0]?.min_license_creation_date) {
    results.push({ label: "Earliest active DCWP license", date: rows[0].min_license_creation_date });
  }

  const sorted = results
    .map((item) => ({ ...item, year: new Date(item.date).getFullYear() }))
    .filter((item) => Number.isFinite(item.year) && item.year > 1900)
    .sort((a, b) => a.year - b.year);

  if (!sorted.length) {
    return {
      text: "Tenure unavailable from connected sources",
      source: "Google Places does not provide business age directly."
    };
  }

  const earliest = sorted[0];
  return {
    text: `Observed in city records since ${earliest.year}`,
    source: earliest.label
  };
}

function cityRecordAddress(...parts) {
  return parts.filter(Boolean).map((part) => String(part).trim()).filter(Boolean).join(" ");
}

function cityRecordKey(record) {
  const lat = Number.isFinite(Number(record.lat)) ? Number(record.lat).toFixed(5) : "";
  const lng = Number.isFinite(Number(record.lng)) ? Number(record.lng).toFixed(5) : "";
  return `${record.name}:${record.address}:${lat}:${lng}`.toUpperCase().replace(/\s+/g, " ");
}

async function restaurantMapRecords(zip, business, location = null) {
  const terms = restaurantTerms[business];
  if (!terms) return [];

  const where = [
    `zipcode='${zip}'`,
    "latitude IS NOT NULL",
    "longitude IS NOT NULL",
    terms.some(Boolean) ? `(${soqlTextFilter(["dba", "cuisine_description"], terms)})` : "1=1"
  ].join(" AND ");

  const rows = await socrataJson("43nn-pn8j", {
    $select: "camis,dba,building,street,zipcode,cuisine_description,latitude,longitude",
    $where: where,
    $group: "camis,dba,building,street,zipcode,cuisine_description,latitude,longitude",
    $limit: "300",
    $order: "dba"
  });

  return rows
    .map((row) => ({
      id: row.camis,
      name: row.dba || "Restaurant record",
      address: cityRecordAddress(row.building, row.street, row.zipcode),
      lat: Number(row.latitude),
      lng: Number(row.longitude),
      category: row.cuisine_description || titleCase(business),
      source: "NYC restaurant inspections"
    }))
    .filter((record) => Number.isFinite(record.lat) && Number.isFinite(record.lng) && withinSearchRadius(record, location));
}

async function dcwpMapRecords(zip, business, location = null) {
  const terms = dcwpTerms[business] || [business.toUpperCase()];
  const where = [
    `address_zip='${zip}'`,
    "license_status='Active'",
    "latitude IS NOT NULL",
    "longitude IS NOT NULL",
    `(${soqlTextFilter(["business_name", "dba_trade_name", "business_category", "detail"], terms)})`
  ].join(" AND ");

  const rows = await socrataJson("w7w3-xahh", {
    $select: "license_nbr,business_name,dba_trade_name,business_category,detail,address_building,address_street_name,address_zip,latitude,longitude",
    $where: where,
    $group: "license_nbr,business_name,dba_trade_name,business_category,detail,address_building,address_street_name,address_zip,latitude,longitude",
    $limit: "300",
    $order: "business_name"
  });

  return rows
    .map((row) => ({
      id: row.license_nbr,
      name: row.dba_trade_name || row.business_name || "Licensed business",
      address: cityRecordAddress(row.address_building, row.address_street_name, row.address_zip),
      lat: Number(row.latitude),
      lng: Number(row.longitude),
      category: row.business_category || row.detail || titleCase(business),
      source: "NYC active licenses"
    }))
    .filter((record) => Number.isFinite(record.lat) && Number.isFinite(record.lng) && withinSearchRadius(record, location));
}

async function cityMapRecords(zip, business, location = null) {
  const [restaurants, licenses] = await Promise.all([
    restaurantMapRecords(zip, business, location).catch(() => []),
    dcwpMapRecords(zip, business, location).catch(() => [])
  ]);
  const seen = new Set();
  return [...restaurants, ...licenses].filter((record) => {
    const key = cityRecordKey(record);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

async function googlePlaceSignals(zip, businessInput, location = null) {
  if (!process.env.GOOGLE_PLACES_API_KEY) return null;

  const business = normalizeBusiness(businessInput);
  const url = new URL("https://maps.googleapis.com/maps/api/place/nearbysearch/json");
  if (location?.lat && location?.lng) {
    url.searchParams.set("location", `${location.lat},${location.lng}`);
    url.searchParams.set("radius", String(location.radiusMeters || 805));
    url.searchParams.set("keyword", businessInput);
  } else {
    url.pathname = "/maps/api/place/textsearch/json";
    url.searchParams.set("query", `${businessInput} in ${zip} New York NY`);
  }
  url.searchParams.set("key", process.env.GOOGLE_PLACES_API_KEY);

  const { response, data } = await fetchJsonWithTimeout(url, 5500);
  if (!response.ok) throw new Error(`Google Places returned ${response.status}`);
  if (data.status && !["OK", "ZERO_RESULTS"].includes(data.status)) {
    throw new Error(`Google Places status ${data.status}`);
  }

  const places = Array.isArray(data.results) ? data.results : [];
  const names = places.map((place) => String(place.name || "").toUpperCase());
  const chainCount = names.filter((name) => knownChains.some((chain) => name.includes(chain))).length;
  const ratedPlaces = places.filter((place) => Number.isFinite(Number(place.rating)));
  const avgRating = ratedPlaces.length
    ? Math.round((ratedPlaces.reduce((total, place) => total + Number(place.rating), 0) / ratedPlaces.length) * 10) / 10
    : null;
  const reviewCount = places.reduce((total, place) => total + Number(place.user_ratings_total || 0), 0);

  const rankedPlaces = places
    .map((place) => {
      const rating = Number(place.rating || 0);
      const reviews = Number(place.user_ratings_total || 0);
      const chain = knownChains.some((chainName) => String(place.name || "").toUpperCase().includes(chainName));
      return {
        name: place.name,
        address: place.formatted_address || place.vicinity,
        lat: place.geometry?.location?.lat || null,
        lng: place.geometry?.location?.lng || null,
        rating: rating || null,
        reviews,
        chain,
        openNow: place.opening_hours?.open_now ?? null,
        photoRef: place.photos?.[0]?.photo_reference || null,
        placeId: place.place_id,
        score: Math.round((rating * 20) + Math.min(35, Math.log10(reviews + 1) * 16))
      };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 60);

  return {
    business,
    count: places.length,
    chainCount,
    localCount: Math.max(0, places.length - chainCount),
    avgRating,
    reviewCount,
    topNames: rankedPlaces.slice(0, 5).map((place) => place.name),
    topPlaces: rankedPlaces.slice(0, 6),
    mapPlaces: rankedPlaces.slice(0, 20).map((place) => ({
      name: place.name,
      address: place.address,
      lat: place.lat,
      lng: place.lng,
      rating: place.rating,
      reviews: place.reviews,
      chain: place.chain,
      placeId: place.placeId
    })),
    source: location?.lat ? "Google Places Nearby Search first page" : "Google Places Text Search first page",
    caveat: "Google Places is limited to a fast first-page sample. NYC record pins show the broader registry picture."
  };
}

async function businessCount(zip, businessInput, location = null) {
  const business = normalizeBusiness(businessInput);
  const [restaurantCount, dcwpCount, googlePlaces, tenure, mapRecords, demandMomentum] = await Promise.all([
    countRestaurants(zip, business).catch(() => 0),
    countDcwpBusinesses(zip, business).catch(() => 0),
    googlePlaceSignals(zip, businessInput, location).catch(() => null),
    businessTenure(zip, business).catch(() => null),
    cityMapRecords(zip, business, location).catch(() => []),
    fetchDemandMomentum({ keyword: businessInput || business, region: "US-NY" }).catch(() => null)
  ]);
  const countedOpenDataTotal = restaurantCount + dcwpCount;
  const mappedOpenDataTotal = mapRecords.length;
  const openDataTotal = countedOpenDataTotal || mappedOpenDataTotal;
  const googleVisibleCount = googlePlaces?.count || 0;
  const hasAnySourceSignal = openDataTotal > 0 || googleVisibleCount > 0;

  return {
    zip,
    business,
    count: openDataTotal,
    googleVisibleCount,
    mode: hasAnySourceSignal ? "live" : "live-zero",
    openDataCount: openDataTotal,
    registryExact: openDataTotal > 0,
    searchContext: location
      ? {
          mode: "address-radius",
          address: location.address,
          radiusMiles: location.radiusMiles,
          lat: location.lat,
          lng: location.lng
        }
      : { mode: "zip", radiusMiles: null },
    googlePlaces,
    demandMomentum,
    mapRecords,
    tenure,
    sources: [
      restaurantCount ? `DOHMH restaurant records: ${restaurantCount}` : null,
      dcwpCount ? `DCWP active licenses: ${dcwpCount}` : null,
      !countedOpenDataTotal && mappedOpenDataTotal ? `Mapped NYC records: ${mappedOpenDataTotal}` : null,
      googlePlaces ? `Google Places visible results: ${googlePlaces.count}` : null
    ].filter(Boolean),
    note:
      countedOpenDataTotal > 0
        ? "Observed city-record matches from NYC Open Data. Google Places is shown separately as visibility, not as an exact competitor count."
        : mappedOpenDataTotal > 0
          ? "Observed mapped NYC records from connected city datasets. Google Places is shown separately as visibility, not as a complete registry."
        : googleVisibleCount > 0
          ? "No matching NYC city records were found for this exact ZIP and term. Google Places has visible results, but those are search visibility signals, not a complete registry."
          : "Connected sources returned zero matching records for this exact ZIP and search term."
  };
}

function conceptVerdict(cityCount, googleCount, avgRating) {
  const visible = Number(cityCount || 0) + Number(googleCount || 0);
  if (visible <= 4) return { label: "Open gap", score: 86, tone: "good" };
  if (visible <= 12 && (avgRating === null || avgRating < 4.4)) return { label: "Potential gap", score: 76, tone: "good" };
  if (visible <= 24) return { label: "Competitive but possible", score: 62, tone: "mixed" };
  return { label: "Crowded concept", score: 44, tone: "risky" };
}

async function restaurantConceptFit(zip, location = null) {
  const cityCounts = await Promise.all(
    restaurantConceptModels.map(async (concept) => ({
      ...concept,
      cityCount: await countRestaurants(zip, concept.key).catch(() => 0)
    }))
  );
  const googleLookupKeys = new Set(
    cityCounts
      .slice()
      .sort((a, b) => a.cityCount - b.cityCount)
      .slice(0, 12)
      .map((concept) => concept.key)
  );

  const concepts = await Promise.all(
    cityCounts.map(async (concept) => {
      const googlePlaces = googleLookupKeys.has(concept.key)
        ? await googlePlaceSignals(zip, concept.search, location).catch(() => null)
        : null;
      const googleCount = googlePlaces?.count || 0;
      const verdict = conceptVerdict(concept.cityCount, googleCount, googlePlaces?.avgRating ?? null);
      return {
        key: concept.key,
        label: concept.label,
        cityCount: concept.cityCount,
        googleCount,
        avgRating: googlePlaces?.avgRating ?? null,
        reviewCount: googlePlaces?.reviewCount || 0,
        topNames: googlePlaces?.topNames || [],
        score: verdict.score,
        verdict: verdict.label,
        tone: verdict.tone
      };
    })
  );

  return {
    zip,
    searchContext: location
      ? {
          mode: "address-radius",
          address: location.address,
          radiusMiles: location.radiusMiles,
          lat: location.lat,
          lng: location.lng
        }
      : { mode: "zip" },
    concepts: concepts.sort((a, b) => b.score - a.score),
    source: "NYC DOHMH cuisine records for all concepts + Google Places visibility for the least-saturated concepts",
    caveat: "Delivery-platform data from Uber Eats and Grubhub is not pulled unless official partner/API access is available. Treat this as concept research, then verify delivery apps manually."
  };
}

async function geocodeAddress(address) {
  if (!process.env.GOOGLE_PLACES_API_KEY) {
    throw new Error("Google key is required for address lookup.");
  }

  const url = new URL("https://maps.googleapis.com/maps/api/geocode/json");
  url.searchParams.set("address", address);
  url.searchParams.set("components", "administrative_area:NY|country:US");
  url.searchParams.set("key", process.env.GOOGLE_PLACES_API_KEY);

  const geocodeResult = await cachedJsonFetch(url, {
    timeoutMs: 5500,
    ttlMs: cacheTtl.geocode
  });
  if (!geocodeResult.ok) throw new Error(`Google Geocoding returned ${geocodeResult.status}`);
  const data = geocodeResult.data;
  if (data.status !== "OK" || !data.results?.[0]) {
    return geocodeAddressWithPlaces(address);
  }

  const result = data.results[0];
  const component = (type) => result.address_components?.find((item) => item.types?.includes(type))?.long_name || "";
  const zip = component("postal_code");
  const borough = component("sublocality") || component("locality") || component("administrative_area_level_2");

  return {
    address: result.formatted_address,
    zip,
    borough,
    lat: result.geometry.location.lat,
    lng: result.geometry.location.lng,
    source: "Google Geocoding"
  };
}

async function geocodeAddressWithPlaces(address) {
  const url = new URL("https://maps.googleapis.com/maps/api/place/textsearch/json");
  url.searchParams.set("query", `${address}, New York, NY`);
  url.searchParams.set("key", process.env.GOOGLE_PLACES_API_KEY);

  const placesResult = await cachedJsonFetch(url, {
    timeoutMs: 5500,
    ttlMs: cacheTtl.geocode
  });
  if (!placesResult.ok) throw new Error(`Google Places address lookup returned ${placesResult.status}`);
  const data = placesResult.data;
  if (data.status && !["OK", "ZERO_RESULTS"].includes(data.status)) {
    throw new Error(`Google Places address lookup status ${data.status}`);
  }

  const result = data.results?.[0];
  if (!result?.geometry?.location) throw new Error("Address not found.");
  const formatted = result.formatted_address || address;
  const zip = formatted.match(/\b1\d{4}\b/)?.[0] || "";

  return {
    address: formatted,
    zip,
    borough: "",
    lat: result.geometry.location.lat,
    lng: result.geometry.location.lng,
    source: "Google Places Text Search"
  };
}

async function civicSignals(zip, location = null) {
  const since = `${isoDaysAgo(180)}T00:00:00`;
  const complaintWhere = [
    location?.lat && location?.lng
      ? `within_circle(location, ${location.lat}, ${location.lng}, ${location.radiusMeters || 805})`
      : `incident_zip='${zip}'`,
    `created_date > '${since}'`
  ].join(" AND ");

  const [complaintRows, complaintTotalRows, permitRows, permitTotalRows] = await Promise.all([
    socrataJson("erm2-nwe9", {
      $select: "complaint_type,count(*)",
      $where: complaintWhere,
      $group: "complaint_type",
      $order: "count DESC",
      $limit: "6"
    }).catch(() => []),
    socrataJson("erm2-nwe9", {
      $select: "count(*)",
      $where: complaintWhere
    }).catch(() => []),
    socrataJson("ipu4-2q9a", {
      $select: "permit_type,count(*)",
      $where: `zip_code='${zip}'`,
      $group: "permit_type",
      $order: "count DESC",
      $limit: "6"
    }).catch(() => []),
    socrataJson("ipu4-2q9a", {
      $select: "count(*)",
      $where: `zip_code='${zip}'`
    }).catch(() => [])
  ]);

  const complaintTotal = firstCount(complaintTotalRows[0]);
  const permitTotal = firstCount(permitTotalRows[0]);

  return {
    zip,
    searchContext: location
      ? {
          mode: "address-radius",
          address: location.address,
          radiusMiles: location.radiusMiles
        }
      : { mode: "zip" },
    complaints: {
      total180Days: complaintTotal,
      level: complaintTotal >= 900 ? "High" : complaintTotal >= 350 ? "Moderate" : "Lower",
      topTypes: complaintRows.map((row) => ({
        type: row.complaint_type || "Unknown",
        count: typedCount(row)
      })),
      source: "NYC 311 Service Requests, last 180 days"
    },
    permits: {
      totalRecords: permitTotal,
      level: permitTotal >= 40000 ? "Heavy" : permitTotal >= 12000 ? "Active" : "Light",
      topTypes: permitRows.map((row) => ({
        type: row.permit_type || "Unknown",
        count: typedCount(row)
      })),
      source: "DOB Permit Issuance records by ZIP"
    }
  };
}

const landUseLabels = {
  "1": "One and two family homes",
  "2": "Multi-family walk-up",
  "3": "Multi-family elevator",
  "4": "Mixed residential/commercial",
  "5": "Commercial and office",
  "6": "Industrial/manufacturing",
  "7": "Transportation/utility",
  "8": "Public facilities",
  "9": "Open space",
  "10": "Parking",
  "11": "Vacant land"
};

async function siteIntelligence(zip, location = null) {
  const liquorWhere = location?.lat && location?.lng
    ? `within_circle(georeference, ${location.lat}, ${location.lng}, ${location.radiusMeters || 805})`
    : `zipcode='${zip}'`;

  const mtaWhere = location?.lat && location?.lng
    ? `within_circle(georeference, ${location.lat}, ${location.lng}, ${location.radiusMeters || 805}) AND transit_timestamp between '2024-12-01T00:00:00' and '2025-01-01T00:00:00'`
    : null;

  const [
    sidewalkRows,
    liquorRows,
    liquorTotalRows,
    mtaRows,
    plutoSummaryRows,
    plutoLandUseRows
  ] = await Promise.all([
    socrataJson("qcdj-rwhu", {
      $select: "lic_status,count(*)",
      $where: `zip='${zip}'`,
      $group: "lic_status",
      $order: "count DESC",
      $limit: "6"
    }).catch(() => []),
    dataNyJson("9s3h-dpkz", {
      $select: "description,count(*)",
      $where: liquorWhere,
      $group: "description",
      $order: "count DESC",
      $limit: "6"
    }).catch(() => []),
    dataNyJson("9s3h-dpkz", {
      $select: "count(*)",
      $where: liquorWhere
    }).catch(() => []),
    mtaWhere
      ? dataNyJson("wujg-7c2s", {
          $select: "station_complex,sum(ridership)",
          $where: mtaWhere,
          $group: "station_complex",
          $order: "sum_ridership DESC",
          $limit: "6"
        }).catch(() => [])
      : Promise.resolve([]),
    socrataJson("64uk-42ks", {
      $select: "sum(retailarea),sum(comarea),sum(officearea),avg(yearbuilt),count(*)",
      $where: `zipcode='${zip}'`
    }).catch(() => []),
    socrataJson("64uk-42ks", {
      $select: "landuse,count(*)",
      $where: `zipcode='${zip}'`,
      $group: "landuse",
      $order: "count DESC",
      $limit: "6"
    }).catch(() => [])
  ]);

  const sidewalkActive = sidewalkRows
    .filter((row) => String(row.lic_status || "").toLowerCase() === "active")
    .reduce((total, row) => total + typedCount(row), 0);
  const sidewalkTotal = sidewalkRows.reduce((total, row) => total + typedCount(row), 0);
  const liquorTotal = firstCount(liquorTotalRows[0]);
  const mtaTotal = mtaRows.reduce((total, row) => total + typedNumber(row.sum_ridership), 0);
  const plutoSummary = plutoSummaryRows[0] || {};
  const averageYearBuilt = Math.round(typedNumber(plutoSummary.avg_yearbuilt));
  const validAverageYearBuilt = averageYearBuilt >= 1800 && averageYearBuilt <= new Date().getFullYear()
    ? averageYearBuilt
    : null;

  return {
    zip,
    searchContext: location
      ? {
          mode: "address-radius",
          address: location.address,
          radiusMiles: location.radiusMiles
        }
      : { mode: "zip" },
    sidewalkCafe: {
      active: sidewalkActive,
      totalApplications: sidewalkTotal,
      statusBreakdown: sidewalkRows.map((row) => ({
        status: row.lic_status || "Unknown",
        count: typedCount(row)
      })),
      source: "NYC Sidewalk Cafe Licenses and Applications by ZIP"
    },
    liquor: {
      total: liquorTotal,
      scope: location ? `within ${location.radiusMiles} mile` : `in ZIP ${zip}`,
      topTypes: liquorRows.map((row) => ({
        type: row.description || "Unknown",
        count: typedCount(row)
      })),
      source: "NYS Current Liquor Authority Active Licenses"
    },
    mta: {
      available: Boolean(location),
      totalDecember2024Ridership: Math.round(mtaTotal),
      scope: location ? `within ${location.radiusMiles} mile` : "Enter an address to calculate nearby station ridership",
      topStations: mtaRows.map((row) => ({
        station: row.station_complex || "Unknown station",
        ridership: Math.round(typedNumber(row.sum_ridership))
      })),
      source: "MTA Subway Hourly Ridership, December 2024"
    },
    pluto: {
      taxLots: typedNumber(plutoSummary.count),
      retailArea: Math.round(typedNumber(plutoSummary.sum_retailarea)),
      commercialArea: Math.round(typedNumber(plutoSummary.sum_comarea)),
      officeArea: Math.round(typedNumber(plutoSummary.sum_officearea)),
      averageYearBuilt: validAverageYearBuilt,
      landUseMix: plutoLandUseRows.map((row) => ({
        type: landUseLabels[row.landuse] || `Land use ${row.landuse || "unknown"}`,
        count: typedCount(row)
      })),
      source: "NYC PLUTO tax-lot property data by ZIP"
    }
  };
}

async function sendPlacePhoto(response, photoRef) {
  if (!process.env.GOOGLE_PLACES_API_KEY || !photoRef) {
    response.writeHead(404);
    response.end("No photo");
    return;
  }

  const url = new URL("https://maps.googleapis.com/maps/api/place/photo");
  url.searchParams.set("maxwidth", "640");
  url.searchParams.set("photo_reference", photoRef);
  url.searchParams.set("key", process.env.GOOGLE_PLACES_API_KEY);

  const photoResponse = await fetch(url, { redirect: "follow" });
  if (!photoResponse.ok) {
    response.writeHead(photoResponse.status);
    response.end("Photo unavailable");
    return;
  }

  const contentType = photoResponse.headers.get("content-type") || "image/jpeg";
  const bytes = Buffer.from(await photoResponse.arrayBuffer());
  response.writeHead(200, {
    "Content-Type": contentType,
    "Cache-Control": "public, max-age=86400"
  });
  response.end(bytes);
}

async function clientMemo({ zip, business, profile, businessResult }) {
  if (!process.env.OPENAI_API_KEY) {
    return {
      memo: "Decision report service is not connected, so the report could not be generated.",
      source: "fallback"
    };
  }

  const prompt = [
    "You are AreaIntel, an enterprise-grade location intelligence, market research, site selection, and business fit decision engine.",
    "Your job is to determine the probability that a business succeeds in a specific geographic area using evidence-based analysis.",
    "Never generate random business ideas. Never optimize for popularity. Optimize for probability of long-term business success.",
    "Separate Verified Signals, Model Insights, and Estimated Factors. Do not fabricate numbers. Do not present estimates as facts.",
    "If the supplied evidence is too weak for a confident recommendation, write INSUFFICIENT DATA and explain what is missing.",
    "",
    `Location: ZIP ${zip}`,
    `Business category: ${business}`,
    "",
    "Write a concise business success decision report with these sections:",
    "EXECUTIVE SUMMARY",
    "OVERALL OPPORTUNITY SCORE",
    "CONFIDENCE SCORE",
    "TOP RECOMMENDATION",
    "TOP RISKS",
    "VERIFIED SIGNALS",
    "MODEL INSIGHTS",
    "ESTIMATED FACTORS",
    "SCENARIO ANALYSIS: best case, base case, worst case",
    "DECISION: YES, NO, or CONDITIONAL",
    "REQUIRED CONDITIONS: traffic, max rent, minimum demand, margins, and next diligence steps",
    "",
    "Use plain English for a client deciding whether this business should open in the area.",
    "Do not overpromise. Exact block, cost, frontage, visibility, commitment terms, and operator quality still matter.",
    "",
    `Market profile data: ${JSON.stringify(profile)}`,
    `Competition data: ${JSON.stringify(businessResult)}`
  ].join("\n");

  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL || "gpt-4o-mini",
      input: prompt,
      max_output_tokens: 900
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Decision report service returned ${response.status}: ${errorText.slice(0, 180)}`);
  }
  const data = await response.json();
  const outputText =
    data.output_text ||
    data.output?.flatMap((item) => item.content || [])?.map((content) => content.text || "").join("\n").trim() ||
    "";

  return {
    memo: outputText || "Decision report service returned an empty report.",
    source: "Decision Report"
  };
}

function parseJsonObject(text) {
  try {
    return JSON.parse(text);
  } catch {
    const match = text.match(/\{[\s\S]*\}/);
    if (!match) return null;
    try {
      return JSON.parse(match[0]);
    } catch {
      return null;
    }
  }
}

async function listingFinder({ zip, address, radiusMiles, business }) {
  if (!process.env.OPENAI_API_KEY) {
    return {
      listings: [],
      source: "fallback",
      note: "Search service is not connected, so AreaIntel cannot search public listing pages inside the app yet."
    };
  }

  const locationText = address
    ? `${address} within ${radiusMiles || 0.5} mile, NYC`
    : `ZIP ${zip}, NYC`;
  const prompt = [
    "Search the public web for active or recent commercial storefront, retail, restaurant, or pop-up space listing pages.",
    `Location: ${locationText}.`,
    `Tenant/business context: ${business || "retail storefront"}.`,
    "Prefer sources from LoopNet, CommercialCafe, Crexi, The Storefront, Craigslist, broker pages, and official leasing pages.",
    "Return only public source links. Do not invent rent, square footage, or availability.",
    "Return JSON only in this exact shape:",
    "{\"listings\":[{\"title\":\"\",\"source\":\"\",\"url\":\"\",\"snippet\":\"\"}],\"note\":\"\"}",
    "Limit to 6 useful results. If results are broad directories, say that in the snippet."
  ].join("\n");
  const cacheKey = `openai:listings:${zip}:${address || ""}:${radiusMiles || ""}:${business || ""}`;
  const cached = readCache(cacheKey);
  if (cached) return { ...cached, cached: true };

  const openaiResponse = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: process.env.OPENAI_SEARCH_MODEL || process.env.OPENAI_MODEL || "gpt-4o-mini",
      tools: [
        {
          type: "web_search_preview",
          search_context_size: "low",
          user_location: {
            type: "approximate",
            country: "US",
            region: "New York",
            city: "New York",
            timezone: "America/New_York"
          }
        }
      ],
      input: prompt,
      max_output_tokens: 1200
    })
  });

  if (!openaiResponse.ok) {
    const errorText = await openaiResponse.text();
    throw new Error(`Listing search returned ${openaiResponse.status}: ${errorText.slice(0, 180)}`);
  }

  const data = await openaiResponse.json();
  const outputText =
    data.output_text ||
    data.output?.flatMap((item) => item.content || [])?.map((content) => content.text || "").join("\n").trim() ||
    "";
  const parsed = parseJsonObject(outputText) || { listings: [], note: outputText };
  const listings = Array.isArray(parsed.listings)
    ? parsed.listings
        .filter((listing) => listing && listing.url && /^https?:\/\//.test(String(listing.url)))
        .slice(0, 6)
        .map((listing) => ({
          title: String(listing.title || "Listing source").slice(0, 140),
          source: String(listing.source || "Web result").slice(0, 80),
          url: String(listing.url),
          snippet: String(listing.snippet || "Open source and confirm availability with the listing contact.").slice(0, 260)
        }))
    : [];

  const result = {
    listings,
    source: "Public listing search",
    note: parsed.note || "Verify every listing with the listing contact or platform before using it with a client."
  };
  writeCache(cacheKey, result, cacheTtl.openaiSearch);
  return result;
}

async function sendFile(response, pathname) {
  const requested = pathname === "/" ? "index.html" : pathname.slice(1);
  const normalized = normalize(requested);

  if (normalized.startsWith("..") || normalized.includes("/.env")) {
    response.writeHead(403);
    response.end("Forbidden");
    return;
  }

  const filePath = join(root, normalized);
  const data = await readFile(filePath);
  const extension = extname(filePath);
  response.writeHead(200, {
    "Content-Type": contentTypes[extension] || "application/octet-stream",
    "Cache-Control": extension === ".html" ? "no-cache" : "public, max-age=300"
  });
  response.end(data);
}

loadEnv();

createServer(async (request, response) => {
  const url = new URL(request.url || "/", `http://${request.headers.host}`);

  try {
    if (url.pathname === "/api/key-status") {
      sendJson(response, 200, keyStatus());
      return;
    }

    if (url.pathname === "/api/health") {
      sendJson(response, 200, {
        ok: true,
        app: "AreaIntel",
        startedAt: startedAt.toISOString(),
        uptimeSeconds: Math.round((Date.now() - startedAt.getTime()) / 1000),
        cacheEntries: responseCache.size,
        keyStatus: keyStatus()
      });
      return;
    }

    if (url.pathname === "/api/save-keys" && request.method === "POST") {
      if (isHostedProduction) {
        sendJson(response, 403, {
          error: "API keys must be managed in the hosting platform environment variables."
        });
        return;
      }

      const body = await readRequestJson(request);
      await saveEnvKeys(body);
      sendJson(response, 200, { ok: true, keyStatus: keyStatus() });
      return;
    }

    if (url.pathname === "/api/area-report") {
      const zip = String(url.searchParams.get("zip") || "").trim();
      if (!/^\d{5}$/.test(zip)) {
        sendJson(response, 400, { error: "Provide a five-digit ZIP." });
        return;
      }

      sendJson(response, 200, {
        zip,
        mode: "live",
        keyStatus: keyStatus(),
        census: await fetchCensusProfile(zip)
      });
      return;
    }

    if (url.pathname === "/api/geocode") {
      const address = String(url.searchParams.get("address") || "").trim();
      if (address.length < 6) {
        sendJson(response, 400, { error: "Provide a full NYC address." });
        return;
      }

      sendJson(response, 200, await geocodeAddress(address));
      return;
    }

    if (url.pathname === "/api/business-count") {
      const zip = String(url.searchParams.get("zip") || "").trim();
      const business = String(url.searchParams.get("business") || "").trim();
      const hasLocation = url.searchParams.has("lat") && url.searchParams.has("lng");
      const lat = Number(url.searchParams.get("lat"));
      const lng = Number(url.searchParams.get("lng"));
      const radiusMiles = Number(url.searchParams.get("radius") || 0.5);
      const address = String(url.searchParams.get("address") || "").trim();

      if (!/^\d{5}$/.test(zip) || !business) {
        sendJson(response, 400, { error: "Provide a five-digit ZIP and business type." });
        return;
      }

      const location = hasLocation && Number.isFinite(lat) && Number.isFinite(lng)
        ? {
            lat,
            lng,
            address,
            radiusMiles,
            radiusMeters: Math.round(Math.max(0.1, Math.min(3, radiusMiles)) * 1609.344)
          }
        : null;

      sendJson(response, 200, await businessCount(zip, business, location));
      return;
    }

    if (url.pathname === "/api/restaurant-concepts") {
      const zip = String(url.searchParams.get("zip") || "").trim();
      const hasLocation = url.searchParams.has("lat") && url.searchParams.has("lng");
      const lat = Number(url.searchParams.get("lat"));
      const lng = Number(url.searchParams.get("lng"));
      const radiusMiles = Number(url.searchParams.get("radius") || 0.5);
      const address = String(url.searchParams.get("address") || "").trim();

      if (!/^\d{5}$/.test(zip)) {
        sendJson(response, 400, { error: "Provide a five-digit ZIP." });
        return;
      }

      const location = hasLocation && Number.isFinite(lat) && Number.isFinite(lng)
        ? {
            lat,
            lng,
            address,
            radiusMiles,
            radiusMeters: Math.round(Math.max(0.1, Math.min(3, radiusMiles)) * 1609.344)
          }
        : null;

      sendJson(response, 200, await restaurantConceptFit(zip, location));
      return;
    }

    if (url.pathname === "/api/civic-signals") {
      const zip = String(url.searchParams.get("zip") || "").trim();
      const hasLocation = url.searchParams.has("lat") && url.searchParams.has("lng");
      const lat = Number(url.searchParams.get("lat"));
      const lng = Number(url.searchParams.get("lng"));
      const radiusMiles = Number(url.searchParams.get("radius") || 0.5);
      const address = String(url.searchParams.get("address") || "").trim();

      if (!/^\d{5}$/.test(zip)) {
        sendJson(response, 400, { error: "Provide a five-digit ZIP." });
        return;
      }

      const location = hasLocation && Number.isFinite(lat) && Number.isFinite(lng)
        ? {
            lat,
            lng,
            address,
            radiusMiles,
            radiusMeters: Math.round(Math.max(0.1, Math.min(3, radiusMiles)) * 1609.344)
          }
        : null;

      sendJson(response, 200, await civicSignals(zip, location));
      return;
    }

    if (url.pathname === "/api/site-intelligence") {
      const zip = String(url.searchParams.get("zip") || "").trim();
      const hasLocation = url.searchParams.has("lat") && url.searchParams.has("lng");
      const lat = Number(url.searchParams.get("lat"));
      const lng = Number(url.searchParams.get("lng"));
      const radiusMiles = Number(url.searchParams.get("radius") || 0.5);
      const address = String(url.searchParams.get("address") || "").trim();

      if (!/^\d{5}$/.test(zip)) {
        sendJson(response, 400, { error: "Provide a five-digit ZIP." });
        return;
      }

      const location = hasLocation && Number.isFinite(lat) && Number.isFinite(lng)
        ? {
            lat,
            lng,
            address,
            radiusMiles,
            radiusMeters: Math.round(Math.max(0.1, Math.min(3, radiusMiles)) * 1609.344)
          }
        : null;

      sendJson(response, 200, await siteIntelligence(zip, location));
      return;
    }

    if (url.pathname === "/api/place-photo") {
      await sendPlacePhoto(response, url.searchParams.get("ref"));
      return;
    }

    if (url.pathname === "/api/client-memo" && request.method === "POST") {
      try {
        const body = await readRequestJson(request);
        const zip = String(body.zip || "").trim();
        const business = String(body.business || "").trim();

        if (!/^\d{5}$/.test(zip) || !business) {
          sendJson(response, 400, { error: "Provide a five-digit ZIP and business type." });
          return;
        }

        const [profile, businessResult] = await Promise.all([
          fetchCensusProfile(zip).catch((error) => ({ error: error.message })),
          businessCount(zip, business).catch((error) => ({ error: error.message }))
        ]);

        sendJson(response, 200, await clientMemo({ zip, business, profile, businessResult }));
      } catch (error) {
        sendJson(response, 502, {
          memo: "Decision report service could not generate the report right now. The rest of the live data is connected.",
          error: error.message
        });
      }
      return;
    }

    if (url.pathname === "/api/listing-finder" && request.method === "POST") {
      try {
        const body = await readRequestJson(request);
        const zip = String(body.zip || "").trim();
        if (!/^\d{5}$/.test(zip)) {
          sendJson(response, 400, { error: "Provide a five-digit ZIP." });
          return;
        }

        sendJson(response, 200, await listingFinder({
          zip,
          address: String(body.address || "").trim(),
          radiusMiles: String(body.radiusMiles || "").trim(),
          business: String(body.business || "").trim()
        }));
      } catch (error) {
        sendJson(response, 502, {
          listings: [],
          note: "AreaIntel could not run the AI listing search right now. Use the manual platform fallback, then save the best listing into the calculator.",
          error: error.message
        });
      }
      return;
    }

    await sendFile(response, url.pathname);
  } catch (error) {
    console.error(`[AreaIntel] ${request.method} ${url.pathname}: ${error.message}`);
    const statusCode = error.code === "ENOENT" ? 404 : 500;
    response.writeHead(statusCode, { "Content-Type": "text/plain; charset=utf-8" });
    response.end(statusCode === 404 ? "Not found" : "Server error");
  }
}).listen(port, () => {
  console.log(`AreaIntel running at http://localhost:${port}`);
});
