if (window.location.protocol === "file:") {
  window.location.replace("http://localhost:5174/");
}

// Silence benign third-party noise: when the Market map is recreated on a
// re-render, MapLibre tears down the old map and its in-flight tile/glyph
// fetches abort — surfacing as "signal is aborted without reason" and
// "Failed to fetch" thrown from maplibre-gl. The map still renders fine.
// Drop ONLY those maplibre-originated teardown errors; every other error
// (including real "Failed to fetch" from app code) passes through.
(function () {
  const origError = console.error;
  console.error = function (...args) {
    try {
      const text = args.map((a) => (a && typeof a === "object") ? `${a.message || ""} ${a.stack || ""}` : String(a)).join(" ");
      if (text.includes("signal is aborted without reason")) return;
      if (text.includes("maplibre-gl") && /Failed to fetch|AbortError|signal is aborted/i.test(text)) return;
    } catch (e) { /* fall through to original */ }
    return origError.apply(console, args);
  };
})();

const zipProfiles = {
  "10003": {
    name: "East Village / Union Square",
    density: 92,
    income: 86,
    transit: 94,
    rent: 90,
    competition: 88,
    nightlife: 92,
    families: 42,
    office: 68,
    tourist: 78,
    student: 82,
    localPreference: 78,
    chainFit: 61,
    affluenceLabel: "Affluent young professionals with heavy student and nightlife overlap",
    audience: [
      ["Money profile", "High income, but shoppers still compare value because rent drives prices up."],
      ["Street life", "Very walkable, late-night, transit-heavy, and friendly to quick repeat visits."],
      ["Best customer type", "Students, young professionals, visitors, and renters who buy convenience."]
    ],
    verdict: "Good area for premium daily-use concepts, fast service, beauty, fitness, and differentiated food. Risk is not demand; risk is rent, competition, and weak branding.",
    talkingPoints: [
      "Favor operators with strong brand identity, high repeat purchase, or premium ticket size.",
      "Avoid generic food or retail concepts unless the operator already has reviews, delivery volume, or a clear niche.",
      "Confirm how the business will survive cost pressure during slow months."
    ],
    evidence: [
      "Very high pedestrian demand and train access support grab-and-go concepts.",
      "High rent and crowded food competition punish undifferentiated operators.",
      "Student, nightlife, and young professional demand favors convenience and experience-led services."
    ]
  },
  "11201": {
    name: "Brooklyn Heights / DUMBO",
    density: 78,
    income: 91,
    transit: 83,
    rent: 87,
    competition: 74,
    nightlife: 58,
    families: 72,
    office: 74,
    tourist: 69,
    student: 36,
    localPreference: 70,
    chainFit: 74,
    affluenceLabel: "High-income households, families, professionals, and office workers",
    audience: [
      ["Money profile", "Strong household income supports premium pricing and appointment-based services."],
      ["Street life", "Balanced residential, office, and visitor activity with less late-night energy."],
      ["Best customer type", "Families, professionals, office workers, and higher-spend local residents."]
    ],
    verdict: "Good area for polished premium services, family needs, wellness, and higher-ticket retail. National brands can work, but local operators need a refined look and strong trust signals.",
    talkingPoints: [
      "Lead with household income, family demand, and premium service potential.",
      "For local businesses, stress design quality, reviews, and consistency.",
      "Avoid low-margin concepts that cannot carry expensive rent."
    ],
    evidence: [
      "Affluent households and daytime office traffic support premium services.",
      "Family concentration helps childcare, wellness, and specialty retail.",
      "High rent requires strong average order value or appointment-based revenue."
    ]
  },
  "11101": {
    name: "Long Island City",
    density: 72,
    income: 82,
    transit: 88,
    rent: 76,
    competition: 57,
    nightlife: 54,
    families: 58,
    office: 82,
    tourist: 42,
    student: 28,
    localPreference: 67,
    chainFit: 72,
    affluenceLabel: "Growing professional renter base with office and commuter demand",
    audience: [
      ["Money profile", "Upper-middle income renters and workers support daily-use services."],
      ["Street life", "Commuter-oriented with new residential towers and office clusters."],
      ["Best customer type", "Residents, office workers, commuters, and convenience-driven professionals."]
    ],
    verdict: "Good area for operators that serve routine weekly demand: coffee, lunch, fitness, convenience, pet care, and neighborhood services. Less proven for tourist-heavy or destination retail.",
    talkingPoints: [
      "Show operators the gap between growing density and lower competition.",
      "Favor businesses that can build repeat weekly habits.",
      "Validate the exact block because LIC demand changes quickly from avenue to avenue."
    ],
    evidence: [
      "New residential density and office demand create room for daily-use services.",
      "Lower competition than core Manhattan improves category entry chances.",
      "Commuter patterns favor coffee, fitness, lunch, and convenience retail."
    ]
  },
  "10458": {
    name: "Fordham / Belmont",
    density: 86,
    income: 38,
    transit: 78,
    rent: 45,
    competition: 63,
    nightlife: 46,
    families: 76,
    office: 34,
    tourist: 35,
    student: 70,
    localPreference: 84,
    chainFit: 48,
    affluenceLabel: "Dense working-class families, students, and value-focused shoppers",
    audience: [
      ["Money profile", "Lower income than premium NYC cores, so price sensitivity matters."],
      ["Street life", "Dense residential demand with school and student activity."],
      ["Best customer type", "Families, students, local workers, and value-driven repeat customers."]
    ],
    verdict: "Good area for value-priced essentials, local food, laundry, discount retail, education, and family services. Premium concepts need careful pricing and community trust.",
    talkingPoints: [
      "Pitch affordability, volume, and neighborhood loyalty instead of luxury positioning.",
      "Local operators may outperform big brands when they match community needs.",
      "Avoid concepts that depend on high disposable income."
    ],
    evidence: [
      "Dense households and student activity support value-priced daily needs.",
      "Lower rent can help operators survive with smaller tickets and high volume.",
      "Premium concepts need careful pricing because local income is more constrained."
    ]
  },
  "10301": {
    name: "St. George / Stapleton",
    density: 48,
    income: 62,
    transit: 58,
    rent: 42,
    competition: 39,
    nightlife: 36,
    families: 66,
    office: 42,
    tourist: 38,
    student: 24,
    localPreference: 76,
    chainFit: 43,
    affluenceLabel: "Mixed-income local households with neighborhood-first demand",
    audience: [
      ["Money profile", "Moderate income and lower rent support practical local services."],
      ["Street life", "More neighborhood and commuter based than constant pedestrian flow."],
      ["Best customer type", "Residents, families, ferry commuters, and local service customers."]
    ],
    verdict: "Selective area. It can be good for local services with low overhead, but weak for businesses that require heavy tourist flow or luxury spending.",
    talkingPoints: [
      "Use lower rent and lower competition as the upside.",
      "Push operators to prove repeat local demand before investing.",
      "Be cautious with businesses that need constant walk-in traffic."
    ],
    evidence: [
      "Lower competition and lower rent can help neighborhood services break even.",
      "Demand is more local and repeat-driven than tourist or office-driven.",
      "Foot traffic assumptions should be validated block by block before committing."
    ]
  }
};

const nycZipCodesByBorough = {
  Manhattan: [
    "10001", "10002", "10003", "10004", "10005", "10006", "10007", "10009", "10010", "10011", "10012",
    "10013", "10014", "10016", "10017", "10018", "10019", "10020", "10021", "10022", "10023", "10024",
    "10025", "10026", "10027", "10028", "10029", "10030", "10031", "10032", "10033", "10034", "10035",
    "10036", "10037", "10038", "10039", "10040", "10044", "10065", "10069", "10075", "10128", "10280",
    "10281", "10282"
  ],
  Bronx: [
    "10451", "10452", "10453", "10454", "10455", "10456", "10457", "10458", "10459", "10460", "10461",
    "10462", "10463", "10464", "10465", "10466", "10467", "10468", "10469", "10470", "10471", "10472",
    "10473", "10474", "10475"
  ],
  Brooklyn: [
    "11201", "11203", "11204", "11205", "11206", "11207", "11208", "11209", "11210", "11211", "11212",
    "11213", "11214", "11215", "11216", "11217", "11218", "11219", "11220", "11221", "11222", "11223",
    "11224", "11225", "11226", "11228", "11229", "11230", "11231", "11232", "11233", "11234", "11235",
    "11236", "11237", "11238", "11239", "11249"
  ],
  Queens: [
    "11004", "11005", "11101", "11102", "11103", "11104", "11105", "11106", "11109", "11354", "11355",
    "11356", "11357", "11358", "11359", "11360", "11361", "11362", "11363", "11364", "11365", "11366",
    "11367", "11368", "11369", "11370", "11372", "11373", "11374", "11375", "11377", "11378", "11379",
    "11385", "11411", "11412", "11413", "11414", "11415", "11416", "11417", "11418", "11419", "11420",
    "11421", "11422", "11423", "11426", "11427", "11428", "11429", "11430", "11432", "11433", "11434",
    "11435", "11436", "11691", "11692", "11693", "11694", "11697"
  ],
  "Staten Island": [
    "10301", "10302", "10303", "10304", "10305", "10306", "10307", "10308", "10309", "10310", "10312",
    "10314"
  ]
};

const allNycZipCodes = Object.values(nycZipCodesByBorough).flat().sort();

const boroughProfiles = {
  Manhattan: {
    density: 88,
    income: 82,
    transit: 91,
    rent: 88,
    competition: 82,
    nightlife: 72,
    families: 46,
    office: 78,
    tourist: 68,
    student: 54,
    localPreference: 68,
    chainFit: 72,
    affluenceLabel: "Manhattan demand mix with high rent and strong transit",
    audience: [
      ["Money profile", "Generally strong spending power, but cost pressure forces operators to protect margins."],
      ["Street life", "Transit-rich, dense, and highly dependent on the exact block."],
      ["Best customer type", "Professionals, renters, visitors, and convenience-driven daily customers."]
    ]
  },
  Bronx: {
    density: 78,
    income: 45,
    transit: 70,
    rent: 48,
    competition: 58,
    nightlife: 42,
    families: 76,
    office: 34,
    tourist: 28,
    student: 58,
    localPreference: 82,
    chainFit: 48,
    affluenceLabel: "Bronx neighborhood demand with value-focused households",
    audience: [
      ["Money profile", "More price-sensitive than premium core areas."],
      ["Street life", "Local repeat demand matters more than destination shopping."],
      ["Best customer type", "Families, students, workers, and neighborhood regulars."]
    ]
  },
  Brooklyn: {
    density: 76,
    income: 66,
    transit: 72,
    rent: 66,
    competition: 66,
    nightlife: 56,
    families: 68,
    office: 46,
    tourist: 36,
    student: 44,
    localPreference: 78,
    chainFit: 58,
    affluenceLabel: "Brooklyn local demand with mixed income and strong neighborhood identity",
    audience: [
      ["Money profile", "Mixed income; some ZIPs are premium, others are value-driven."],
      ["Street life", "Neighborhood loyalty and repeat visits are major business drivers."],
      ["Best customer type", "Residents, families, remote workers, and local service customers."]
    ]
  },
  Queens: {
    density: 68,
    income: 62,
    transit: 66,
    rent: 56,
    competition: 58,
    nightlife: 42,
    families: 72,
    office: 42,
    tourist: 26,
    student: 38,
    localPreference: 80,
    chainFit: 54,
    affluenceLabel: "Queens residential demand with family, commuter, and immigrant business strength",
    audience: [
      ["Money profile", "Moderate to strong household demand depending on the ZIP."],
      ["Street life", "Commercial strips and transit nodes matter more than ZIP-wide averages."],
      ["Best customer type", "Families, commuters, local workers, and neighborhood shoppers."]
    ]
  },
  "Staten Island": {
    density: 46,
    income: 62,
    transit: 42,
    rent: 42,
    competition: 40,
    nightlife: 28,
    families: 72,
    office: 34,
    tourist: 22,
    student: 24,
    localPreference: 74,
    chainFit: 48,
    affluenceLabel: "Staten Island neighborhood demand with lower density and car-oriented patterns",
    audience: [
      ["Money profile", "Moderate household income with practical local spending."],
      ["Street life", "More car-oriented and neighborhood-specific than subway-foot-traffic driven."],
      ["Best customer type", "Families, commuters, homeowners, and local service customers."]
    ]
  }
};

const categoryModels = [
  {
    name: "Specialty coffee",
    business: "cafe",
    weights: { density: 0.2, income: 0.16, transit: 0.18, office: 0.16, student: 0.1, competition: -0.12, rent: -0.1 },
    note: "Works best near transit, offices, universities, and dense morning routes."
  },
  {
    name: "Boutique fitness",
    business: "gym",
    weights: { density: 0.12, income: 0.26, transit: 0.1, families: 0.08, office: 0.1, rent: -0.12, competition: -0.08 },
    note: "Needs disposable income, routine traffic, and enough room for class economics."
  },
  {
    name: "Fast casual lunch",
    business: "restaurant",
    weights: { density: 0.18, transit: 0.12, office: 0.24, student: 0.08, nightlife: 0.04, competition: -0.14, rent: -0.12 },
    note: "Strong when daytime workers and repeat weekly traffic are nearby."
  },
  {
    name: "Daycare / enrichment",
    business: "daycare",
    weights: { families: 0.32, income: 0.18, density: 0.12, rent: -0.08, competition: -0.06, transit: 0.06 },
    note: "Favors family density, reliable household income, and local referral networks."
  },
  {
    name: "Med spa / beauty clinic",
    business: "salon",
    weights: { income: 0.3, density: 0.1, transit: 0.08, office: 0.08, tourist: 0.06, competition: -0.1, rent: -0.1 },
    note: "Needs premium spend, appointment flow, and trust-building local marketing."
  },
  {
    name: "Discount retail",
    business: "retail",
    weights: { density: 0.16, income: -0.08, rent: -0.18, families: 0.14, competition: -0.08, transit: 0.06 },
    note: "Works with lower rent, family volume, and practical daily demand."
  },
  {
    name: "Full-service restaurant",
    business: "restaurant",
    weights: { income: 0.16, nightlife: 0.16, tourist: 0.12, density: 0.1, rent: -0.18, competition: -0.16, transit: 0.08 },
    note: "Can do well, but only if concept, reviews, and labor economics are sharp."
  },
  {
    name: "Laundry / wash-and-fold",
    business: "laundromat",
    weights: { density: 0.24, families: 0.12, rent: -0.12, income: -0.06, competition: -0.1, transit: 0.04 },
    note: "Best for dense residential pockets with repeat household need."
  }
];

const businessTypes = {
  restaurant: {
    aliases: ["restaurant", "resturant", "dining", "eatery", "food spot", "full-service restaurant"],
    baseDemand: 76,
    localBias: 72,
    chainBias: 58,
    rentSensitivity: 82,
    notes: "Restaurants are a core NYC business type. Validate cuisine gap, venting, license fit, reviews, delivery demand, labor costs, and late-night/weekend traffic."
  },
  deli: {
    aliases: ["deli", "bodega", "corner store", "convenience store"],
    baseDemand: 82,
    localBias: 88,
    chainBias: 34,
    rentSensitivity: 54,
    notes: "Deli demand follows dense residential blocks, students, workers, and late-night convenience."
  },
  pizza: {
    aliases: ["pizza", "pizzeria", "pizza spot", "slice shop"],
    baseDemand: 78,
    localBias: 82,
    chainBias: 42,
    rentSensitivity: 62,
    notes: "Pizza can work in most dense NYC areas, but it gets crowded fast and needs strong reviews or late-night demand."
  },
  laundromat: {
    aliases: ["laundromat", "laundry", "wash and fold", "wash-and-fold"],
    baseDemand: 70,
    localBias: 86,
    chainBias: 22,
    rentSensitivity: 50,
    notes: "Laundry demand is strongest in dense renter and family areas with practical local repeat need."
  },
  gym: {
    aliases: ["gym", "fitness", "fitness studio", "boutique fitness"],
    baseDemand: 66,
    localBias: 58,
    chainBias: 72,
    rentSensitivity: 76,
    notes: "Fitness needs income, routine traffic, and enough space to make rent work."
  },
  "smoke shop": {
    aliases: ["smoke shop", "vape", "vape shop", "tobacco"],
    baseDemand: 52,
    localBias: 76,
    chainBias: 24,
    rentSensitivity: 58,
    notes: "Smoke shops can be over-saturated and should be checked against licenses, complaints, and nearby schools."
  },
  daycare: {
    aliases: ["daycare", "childcare", "kids", "children"],
    baseDemand: 62,
    localBias: 72,
    chainBias: 48,
    rentSensitivity: 44,
    notes: "Daycare depends more on family density, licensing, trust, and usable space than pure foot traffic."
  },
  cafe: {
    aliases: ["coffee", "cafe", "coffee shop"],
    baseDemand: 74,
    localBias: 70,
    chainBias: 66,
    rentSensitivity: 72,
    notes: "Coffee needs morning routes, offices, students, and repeat neighborhood habits."
  },
  "bike shop": {
    aliases: ["bike shop", "bicycle", "bike repair", "cycling"],
    baseDemand: 58,
    localBias: 76,
    chainBias: 36,
    rentSensitivity: 58,
    notes: "Bike shops need dense local riders, delivery workers, repair demand, storage room, and visibility near bike lanes."
  },
  salon: {
    aliases: ["salon", "hair salon", "beauty salon"],
    baseDemand: 68,
    localBias: 78,
    chainBias: 34,
    rentSensitivity: 58,
    notes: "Hair salons depend on repeat local customers, operator reputation, appointment flow, and neighborhood income."
  },
  barber: {
    aliases: ["barber", "barber shop", "barbershop"],
    baseDemand: 66,
    localBias: 82,
    chainBias: 28,
    rentSensitivity: 52,
    notes: "Barber shops work best with repeat neighborhood demand, easy walk-in access, and strong operator loyalty."
  },
  "nail salon": {
    aliases: ["nail salon", "nails", "manicure", "pedicure"],
    baseDemand: 64,
    localBias: 74,
    chainBias: 30,
    rentSensitivity: 62,
    notes: "Nail salons need local repeat demand, income fit, strong reviews, and enough appointment volume to cover labor."
  },
  spa: {
    aliases: ["spa", "med spa", "beauty clinic", "facial"],
    baseDemand: 58,
    localBias: 62,
    chainBias: 42,
    rentSensitivity: 78,
    notes: "Spa and med-spa concepts need disposable income, trust, appointment flow, and strong branding."
  },
  "dry cleaner": {
    aliases: ["dry cleaner", "dry cleaning", "cleaners", "tailor"],
    baseDemand: 58,
    localBias: 78,
    chainBias: 32,
    rentSensitivity: 50,
    notes: "Dry cleaners need dense residential demand, office or commuter habits, and convenient pickup/drop-off access."
  },
  pharmacy: {
    aliases: ["pharmacy", "drugstore", "drug store"],
    baseDemand: 68,
    localBias: 46,
    chainBias: 82,
    rentSensitivity: 70,
    notes: "Pharmacies are chain-heavy and need strong population density, insurance demand, and enough space."
  },
  grocery: {
    aliases: ["grocery", "market", "supermarket", "food market"],
    baseDemand: 76,
    localBias: 70,
    chainBias: 62,
    rentSensitivity: 68,
    notes: "Grocery demand follows dense households, daily convenience, delivery radius, and frontage/loading constraints."
  },
  retail: {
    aliases: ["retail", "store", "shop"],
    baseDemand: 56,
    localBias: 60,
    chainBias: 58,
    rentSensitivity: 72,
    notes: "Retail needs category fit, strong storefront visibility, manageable cost pressure, and a clear reason to visit in person."
  },
  clothing: {
    aliases: ["clothing", "boutique", "apparel", "fashion"],
    baseDemand: 52,
    localBias: 62,
    chainBias: 54,
    rentSensitivity: 76,
    notes: "Clothing boutiques need destination appeal, affluent or style-driven customers, and strong visual merchandising."
  },
  "pet store": {
    aliases: ["pet store", "pet shop", "pet supplies", "dog grooming"],
    baseDemand: 60,
    localBias: 72,
    chainBias: 48,
    rentSensitivity: 58,
    notes: "Pet concepts need pet-owning households, repeat supply demand, grooming/service mix, and local loyalty."
  },
  tutoring: {
    aliases: ["tutoring", "learning center", "education center", "test prep"],
    baseDemand: 58,
    localBias: 68,
    chainBias: 50,
    rentSensitivity: 46,
    notes: "Tutoring depends on family density, school proximity, income, and trust more than pure walk-in traffic."
  },
  "urgent care": {
    aliases: ["urgent care", "walk-in clinic", "clinic"],
    baseDemand: 62,
    localBias: 42,
    chainBias: 74,
    rentSensitivity: 70,
    notes: "Urgent care needs population density, payer mix, accessibility, medical buildout, and regulatory diligence."
  },
  medical: {
    aliases: ["medical", "doctor", "medical office", "clinic"],
    baseDemand: 60,
    localBias: 48,
    chainBias: 68,
    rentSensitivity: 66,
    notes: "Medical offices need patient access, insurance fit, elevator/ADA compliance, and suitable buildout."
  },
  dental: {
    aliases: ["dental", "dentist", "orthodontist"],
    baseDemand: 58,
    localBias: 54,
    chainBias: 60,
    rentSensitivity: 66,
    notes: "Dental concepts need income fit, family or worker demand, visibility, and expensive specialized buildout."
  },
  "liquor store": {
    aliases: ["liquor store", "wine shop", "wine store", "spirits"],
    baseDemand: 60,
    localBias: 66,
    chainBias: 42,
    rentSensitivity: 58,
    notes: "Liquor stores need licensing feasibility, local household demand, low theft risk, and saturation checks."
  },
  hardware: {
    aliases: ["hardware", "hardware store", "tools"],
    baseDemand: 52,
    localBias: 70,
    chainBias: 52,
    rentSensitivity: 54,
    notes: "Hardware stores need dense housing, contractor traffic, storage, and practical local repeat demand."
  },
  electronics: {
    aliases: ["electronics", "computer store", "tech store"],
    baseDemand: 48,
    localBias: 50,
    chainBias: 64,
    rentSensitivity: 70,
    notes: "Electronics retail is difficult without repair/service revenue, strong visibility, and online competition protection."
  },
  "phone repair": {
    aliases: ["phone repair", "cell phone repair", "mobile repair"],
    baseDemand: 54,
    localBias: 74,
    chainBias: 38,
    rentSensitivity: 52,
    notes: "Phone repair needs convenience traffic, trust, fast service, and enough local device repair demand."
  }
};

const restaurantCuisineTypes = Object.fromEntries([
  ["italian", ["italian", "pasta", "red sauce"]],
  ["greek", ["greek", "gyro", "souvlaki"]],
  ["mediterranean", ["mediterranean", "halal", "middle eastern", "falafel", "shawarma"]],
  ["turkish", ["turkish", "kebab", "doner"]],
  ["french", ["french", "bistro", "brasserie"]],
  ["japanese", ["japanese", "sushi", "ramen", "izakaya"]],
  ["chinese", ["chinese", "dim sum", "noodle"]],
  ["korean", ["korean", "kbbq", "korean bbq"]],
  ["thai", ["thai", "pad thai"]],
  ["vietnamese", ["vietnamese", "pho", "banh mi"]],
  ["filipino", ["filipino", "filipina"]],
  ["indian", ["indian", "curry"]],
  ["pakistani", ["pakistani", "bangladeshi", "bengali"]],
  ["mexican", ["mexican", "taco", "taqueria", "burrito"]],
  ["latin", ["latin", "latin american", "spanish food"]],
  ["dominican", ["dominican"]],
  ["puerto rican", ["puerto rican", "boricua"]],
  ["peruvian", ["peruvian"]],
  ["colombian", ["colombian"]],
  ["brazilian", ["brazilian"]],
  ["caribbean", ["caribbean", "jamaican", "haitian", "trinidadian"]],
  ["african", ["african", "west african", "nigerian", "ghanaian"]],
  ["ethiopian", ["ethiopian"]],
  ["american", ["american", "new american", "diner"]],
  ["burger", ["burger", "hamburger", "hamburgers"]],
  ["chicken", ["chicken", "wings", "fried chicken"]],
  ["bbq", ["bbq", "barbecue", "barbeque"]],
  ["seafood", ["seafood", "fish", "lobster", "crab"]],
  ["steakhouse", ["steakhouse", "steak house", "steak"]],
  ["vegan", ["vegan", "vegetarian", "plant based"]],
  ["juice", ["juice", "smoothie", "acai"]],
  ["dessert", ["dessert", "ice cream", "gelato", "donut", "donuts"]],
  ["bubble tea", ["bubble tea", "boba"]],
  ["bar", ["bar", "pub", "tavern", "cocktail"]],
  ["food truck", ["food truck", "food cart", "cart"]],
  ["breakfast", ["breakfast", "brunch"]]
].map(([key, aliases]) => [
  key,
  {
    aliases,
    baseDemand: 70,
    localBias: 76,
    chainBias: 44,
    rentSensitivity: 74,
    notes: `${titleCase(key)} is scored as a restaurant concept. Validate cuisine-specific competition, reviews, delivery demand, labor, kitchen buildout, venting, and the exact block.`
  }
]));

Object.assign(businessTypes, restaurantCuisineTypes);

const businessSuccessWeights = {
  demand: 0.25,
  customerFit: 0.2,
  competition: 0.15,
  financial: 0.15,
  location: 0.1,
  growth: 0.1,
  risk: 0.05
};

const competitorCounts = {
  "10003": { restaurant: 150, deli: 24, pizza: 31, laundromat: 9, gym: 18, "smoke shop": 16, daycare: 8, cafe: 42 },
  "11201": { restaurant: 95, deli: 14, pizza: 19, laundromat: 7, gym: 15, "smoke shop": 7, daycare: 13, cafe: 29 },
  "11101": { restaurant: 88, deli: 12, pizza: 16, laundromat: 6, gym: 12, "smoke shop": 6, daycare: 8, cafe: 20 },
  "10458": { restaurant: 58, deli: 30, pizza: 24, laundromat: 18, gym: 7, "smoke shop": 15, daycare: 17, cafe: 10 },
  "10301": { restaurant: 42, deli: 11, pizza: 10, laundromat: 8, gym: 5, "smoke shop": 6, daycare: 9, cafe: 7 }
};

const labels = {
  density: ["Low", "Moderate", "High", "Very high"],
  income: ["Limited", "Moderate", "High", "Very high"],
  transit: ["Limited", "Useful", "Strong", "Excellent"],
  rent: ["Low", "Manageable", "High", "Severe"]
};

const state = {
  zip: "",
  filter: "all",
  business: "restaurant",
  budget: 0,
  location: null,
  businessRequestId: 0,
  areaRequestId: 0,
  civicRequestId: 0,
  siteIntelRequestId: 0,
  conceptRequestId: 0,
  mapRetryCount: 0,
  liveProfiles: {},
  lastBusinessResult: null,
  lastCivicResult: null,
  lastSiteIntelResult: null,
  lastConceptFitResult: null,
  leases: [],
  compareList: [],
  savedReports: [],
  businessCheckPending: false
};
const leaseStorageKey = "areaintel-leases";
const legacyLeaseStorageKey = "tenantfit-leases";
const compareStorageKey = "areaintel-compare";
const compareMax = 6;
const savedStorageKey = "areaintel-saved";
const savedMax = 12;

function logIntegrationError(source, error, context = {}) {
  const detail = error?.name === "AbortError" ? "request timed out" : error?.message || String(error);
  console.warn(`[SpotVest] ${source} failed: ${detail}`, context);
}

function safeUiUpdate(source, callback) {
  try {
    return callback();
  } catch (error) {
    logIntegrationError(`${source} render`, error);
    return null;
  }
}

async function fetchJsonWithTimeout(url, { timeoutMs = 9000, retries = 1, source = "request", options = {} } = {}) {
  // When a "Refresh data" is in progress, tell the server to bypass the 7-day
  // cache for this location and pull fresh (it re-locks the new value).
  if (state.forceRefresh && typeof url === "string" && url.startsWith("/api/")) {
    url += (url.includes("?") ? "&" : "?") + "refresh=1";
  }
  let lastError = null;
  for (let attempt = 0; attempt <= retries; attempt += 1) {
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), timeoutMs);
    try {
      const response = await fetch(url, { ...options, signal: controller.signal });
      const text = await response.text();
      const data = text ? JSON.parse(text) : {};
      if (!response.ok) {
        throw new Error(data?.error || `${response.status} ${response.statusText}`);
      }
      return data;
    } catch (error) {
      lastError = error;
      logIntegrationError(source, error, { url: String(url), attempt: attempt + 1 });
    } finally {
      window.clearTimeout(timeout);
    }
  }
  throw lastError;
}

function fallbackSearchContext() {
  return state.location
    ? {
        mode: "address-radius",
        address: state.location.address,
        radiusMiles: state.location.radiusMiles,
        lat: state.location.lat,
        lng: state.location.lng
      }
    : { mode: "zip" };
}

function fallbackCivicSignals() {
  return {
    zip: state.zip,
    fallback: true,
    searchContext: fallbackSearchContext(),
    complaints: {
      total180Days: null,
      level: "Lower",
      topTypes: [],
      source: "Fallback risk signal"
    },
    permits: {
      totalRecords: null,
      level: "Light",
      topTypes: [],
      source: "Fallback development signal"
    }
  };
}

function fallbackSiteIntelligence() {
  return {
    zip: state.zip,
    fallback: true,
    searchContext: fallbackSearchContext(),
    sidewalkCafe: {
      active: 0,
      totalApplications: 0,
      statusBreakdown: [],
      source: "Fallback outdoor activity signal"
    },
    liquor: {
      total: 0,
      scope: state.location ? `within ${state.location.radiusMiles} mile` : `in ZIP ${state.zip}`,
      topTypes: [],
      source: "Fallback license signal"
    },
    mta: {
      available: false,
      totalDecember2024Ridership: 0,
      scope: state.location ? `within ${state.location.radiusMiles} mile` : "Enter an address to calculate nearby station ridership",
      topStations: [],
      source: "Fallback mobility signal"
    },
    pluto: {
      taxLots: 0,
      retailArea: 0,
      commercialArea: 0,
      officeArea: 0,
      averageYearBuilt: null,
      landUseMix: [],
      source: "Fallback commercial mix signal"
    }
  };
}

const elements = {
  form: document.querySelector("#zip-form"),
  input: document.querySelector("#zip-input"),
  analyzeButton: document.querySelector("#analyze-button"),
  zipOptions: document.querySelector("#nyc-zip-options"),
  message: document.querySelector("#form-message"),
  addressForm: document.querySelector("#address-form"),
  addressInput: document.querySelector("#address-input"),
  radiusInput: document.querySelector("#radius-input"),
  budgetInput: document.querySelector("#budget-input"),
  clearAddress: document.querySelector("#clear-address"),
  addressMessage: document.querySelector("#address-message"),
  startScreen: document.querySelector("#start-screen"),
  results: document.querySelector("#results"),
  heroBusiness: document.querySelector("#hero-business"),
  heroSource: document.querySelector("#hero-source"),
  heroMarket: document.querySelector("#hero-market"),
  signalsStripList: document.querySelector("#signals-strip-list"),
  map: document.querySelector("#market-map"),
  mapStatus: document.querySelector("#map-status"),
  presets: document.querySelectorAll(".preset"),
  areaTitle: document.querySelector("#area-title"),
  categoryList: document.querySelector("#category-list"),
  filter: document.querySelector("#category-filter"),
  headline: document.querySelector("#headline"),
  narrative: document.querySelector("#narrative-copy"),
  memoButton: document.querySelector("#memo-button"),
  memoCopy: document.querySelector("#memo-copy"),
  evidence: document.querySelector("#evidence-list"),
  confidence: document.querySelector("#confidence-pill"),
  verdictTitle: document.querySelector("#verdict-title"),
  verdictCopy: document.querySelector("#verdict-copy"),
  verdictGrade: document.querySelector("#verdict-grade"),
  verdictLabel: document.querySelector("#verdict-label"),
  agentAnswer: document.querySelector("#agent-answer"),
  agentAnswerCopy: document.querySelector("#agent-answer-copy"),
  decisionSuccess: document.querySelector("#decision-success"),
  dataConfidence: document.querySelector("#data-confidence"),
  dataConfidenceCopy: document.querySelector("#data-confidence-copy"),
  nextMove: document.querySelector("#next-move"),
  nextMoveCopy: document.querySelector("#next-move-copy"),
  fullScopePill: document.querySelector("#full-scope-pill"),
  fullScoreBadge: document.querySelector("#full-score-badge"),
  fullVerdictLabel: document.querySelector("#full-verdict-label"),
  fullScoreValue: document.querySelector("#full-score-value"),
  fullConfidenceLabel: document.querySelector("#full-confidence-label"),
  fullWhyCopy: document.querySelector("#full-why-copy"),
  fullRiskCopy: document.querySelector("#full-risk-copy"),
  fullActionCopy: document.querySelector("#full-action-copy"),
  memoDecisionTitle: document.querySelector("#memo-decision-title"),
  memoDecisionCopy: document.querySelector("#memo-decision-copy"),
  memoSuccessScore: document.querySelector("#memo-success-score"),
  memoConfidenceScore: document.querySelector("#memo-confidence-score"),
  memoThesisList: document.querySelector("#memo-thesis-list"),
  memoRiskList: document.querySelector("#memo-risk-list"),
  memoActionList: document.querySelector("#memo-action-list"),
  evidenceSource: document.querySelector("#evidence-source"),
  evidenceSignalGrid: document.querySelector("#evidence-signal-grid"),
  institutionalConfidence: document.querySelector("#institutional-confidence"),
  institutionalDecision: document.querySelector("#institutional-decision"),
  institutionalSummary: document.querySelector("#institutional-summary"),
  scoreDriverTitle: document.querySelector("#score-driver-title"),
  scoreDriverList: document.querySelector("#score-driver-list"),
  validationGrid: document.querySelector("#validation-grid"),
  scoreBreakdown: document.querySelector("#score-breakdown"),
  scenarioAnalysis: document.querySelector("#scenario-analysis"),
  rawDataList: document.querySelector("#raw-data-list"),
  missingDataList: document.querySelector("#missing-data-list"),
  sourceMapList: document.querySelector("#source-map-list"),
  explainabilityList: document.querySelector("#explainability-list"),
  conditionsList: document.querySelector("#conditions-list"),
  alternativesList: document.querySelector("#alternatives-list"),
  customerProfile: document.querySelector("#customer-profile"),
  chainTitle: document.querySelector("#chain-title"),
  chainCopy: document.querySelector("#chain-copy"),
  localFitBar: document.querySelector("#local-fit-bar"),
  talkingPoints: document.querySelector("#talking-points"),
  exportButton: document.querySelector("#export-button"),
  exportPdfButton: document.querySelector("#export-pdf-button"),
  exportFullButton: document.querySelector("#export-full-button"),
  execSummary: document.querySelector("#exec-summary"),
  printMeta: document.querySelector("#print-meta"),
  compareAddButton: document.querySelector("#compare-add-button"),
  comparePanel: document.querySelector("#compare-panel"),
  compareBody: document.querySelector("#compare-body"),
  compareClear: document.querySelector("#compare-clear"),
  copyLinkButton: document.querySelector("#copy-link-button"),
  saveReportButton: document.querySelector("#save-report-button"),
  newSearchButton: document.querySelector("#new-search-button"),
  savedReportsPanel: document.querySelector("#saved-reports"),
  savedReportsList: document.querySelector("#saved-reports-list"),
  businessForm: document.querySelector("#business-form"),
  businessInput: document.querySelector("#business-input"),
  businessSuggestions: document.querySelector("#business-suggestions"),
  businessCount: document.querySelector("#business-count"),
  businessCountLabel: document.querySelector("#business-count-label"),
  businessSourceTags: document.querySelector("#business-source-tags"),
  businessSaturation: document.querySelector("#business-saturation"),
  businessMeter: document.querySelector("#business-meter"),
  businessMix: document.querySelector("#business-mix"),
  businessMixCopy: document.querySelector("#business-mix-copy"),
  businessVerdict: document.querySelector("#business-verdict"),
  businessReason: document.querySelector("#business-reason"),
  conceptSource: document.querySelector("#concept-source"),
  conceptPanel: document.querySelector(".concept-fit-panel"),
  conceptFitList: document.querySelector("#concept-fit-list"),
  opportunityList: document.querySelector("#opportunity-list"),
  opportunitySource: document.querySelector("#opportunity-source"),
  categorySource: document.querySelector("#category-source"),
  placesTitle: document.querySelector("#places-title"),
  placesSource: document.querySelector("#places-source"),
  placesList: document.querySelector("#places-list"),
  pulseFoot: document.querySelector("#pulse-foot"),
  pulseSpend: document.querySelector("#pulse-spend"),
  pulseRisk: document.querySelector("#pulse-risk"),
  footTrafficScore: document.querySelector("#foot-traffic-score"),
  footTrafficActivity: document.querySelector("#foot-traffic-activity"),
  footTrafficVisitors: document.querySelector("#foot-traffic-visitors"),
  footTrafficPeaks: document.querySelector("#foot-traffic-peaks"),
  footTrafficWeekSplit: document.querySelector("#foot-traffic-weeksplit"),
  footTrafficWalkability: document.querySelector("#foot-traffic-walkability"),
  footTrafficTransit: document.querySelector("#foot-traffic-transit"),
  footTrafficConfidence: document.querySelector("#foot-traffic-confidence"),
  footTrafficWhy: document.querySelector("#foot-traffic-why"),
  revenueRent: document.querySelector("#revenue-rent"),
  revenueSize: document.querySelector("#revenue-size"),
  revenueCategory: document.querySelector("#revenue-category"),
  revenueProjection: document.querySelector("#revenue-projection"),
  revenueBreakeven: document.querySelector("#revenue-breakeven"),
  revenueRentPercent: document.querySelector("#revenue-rent-percent"),
  revenueNote: document.querySelector("#revenue-note"),
  civicSource: document.querySelector("#civic-source"),
  complaintLevel: document.querySelector("#complaint-level"),
  complaintCopy: document.querySelector("#complaint-copy"),
  complaintTypes: document.querySelector("#complaint-types"),
  permitLevel: document.querySelector("#permit-level"),
  permitCopy: document.querySelector("#permit-copy"),
  permitTypes: document.querySelector("#permit-types"),
  siteIntelSource: document.querySelector("#site-intel-source"),
  sidewalkLevel: document.querySelector("#sidewalk-level"),
  sidewalkCopy: document.querySelector("#sidewalk-copy"),
  sidewalkTypes: document.querySelector("#sidewalk-types"),
  liquorLevel: document.querySelector("#liquor-level"),
  liquorCopy: document.querySelector("#liquor-copy"),
  liquorTypes: document.querySelector("#liquor-types"),
  mtaLevel: document.querySelector("#mta-level"),
  mtaCopy: document.querySelector("#mta-copy"),
  mtaTypes: document.querySelector("#mta-types"),
  plutoLevel: document.querySelector("#pluto-level"),
  plutoCopy: document.querySelector("#pluto-copy"),
  plutoTypes: document.querySelector("#pluto-types"),
  leaseForm: document.querySelector("#lease-form"),
  leaseAddress: document.querySelector("#lease-address"),
  leaseRent: document.querySelector("#lease-rent"),
  leaseSf: document.querySelector("#lease-sf"),
  leaseUse: document.querySelector("#lease-use"),
  leaseConcept: document.querySelector("#lease-concept"),
  leaseSales: document.querySelector("#lease-sales"),
  leaseBuildout: document.querySelector("#lease-buildout"),
  leaseFrontage: document.querySelector("#lease-frontage"),
  leaseLink: document.querySelector("#lease-link"),
  leaseNotes: document.querySelector("#lease-notes"),
  leaseCsv: document.querySelector("#lease-csv"),
  leaseMessage: document.querySelector("#lease-message"),
  leaseList: document.querySelector("#lease-list"),
  leaseSearchLinks: document.querySelector("#lease-search-links"),
  listingSearchContext: document.querySelector("#listing-search-context"),
  listingFinderButton: document.querySelector("#listing-finder-button"),
  listingResults: document.querySelector("#listing-results"),
  meters: {
    density: document.querySelector("#density-meter"),
    income: document.querySelector("#income-meter"),
    transit: document.querySelector("#transit-meter"),
    rent: document.querySelector("#rent-meter")
  },
  values: {
    density: document.querySelector("#density-value"),
    income: document.querySelector("#income-value"),
    transit: document.querySelector("#transit-value"),
    rent: document.querySelector("#rent-value")
  }
};

const reducedMotionQuery = window.matchMedia?.("(prefers-reduced-motion: reduce)");
const animatedNumbers = new WeakMap();
const timestampChips = new Map();

function prefersReducedMotion() {
  return Boolean(reducedMotionQuery?.matches);
}

function formatUpdatedTime(date = new Date()) {
  return `Last updated ${date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}`;
}

function panelTimestamp(panelSelector) {
  if (timestampChips.has(panelSelector)) return timestampChips.get(panelSelector);
  const header = document.querySelector(`${panelSelector} .panel-header`);
  if (!header) return null;
  const chip = document.createElement("span");
  chip.className = "last-updated";
  chip.textContent = formatUpdatedTime();
  header.appendChild(chip);
  timestampChips.set(panelSelector, chip);
  return chip;
}

function updatePanelTimestamp(panelSelector) {
  const chip = panelTimestamp(panelSelector);
  if (chip) chip.textContent = formatUpdatedTime();
}

// Maps a status label to one of the 5 design-system states (see
// DESIGN_SYSTEM.md). Tone keys map to CSS: connected=Verified(green),
// modeled=Modeled(amber), estimated=Estimated(blue), refreshing=Research(gray),
// risk=Risk(red). Modeled/estimated output must never read as verified.
function statusTone(status) {
  const n = String(status || "").toLowerCase();
  if (n.includes("risk")) return "risk";
  if (n.includes("verified") || n.includes("available") || n.includes("connected") || n.includes("live")) return "connected";
  if (n.includes("checking") || n.includes("loading") || n.includes("refresh") || n.includes("building") || n.includes("research")) return "refreshing";
  if (n.includes("modeled")) return "modeled";
  return "estimated";
}

function setStatusPill(element, text, status = text) {
  if (!element) return;
  element.textContent = text;
  element.classList.remove("status-connected", "status-estimated", "status-refreshing", "status-modeled", "status-risk");
  element.classList.add(`status-${statusTone(status)}`);
}

// Drives the "Signals in this report" strip from real per-request state so it
// never claims a signal is verified when only a modeled estimate is available.
function renderSignalsStrip() {
  if (!elements.signalsStripList) return;
  const businessResult = currentBusinessResult();
  const civicResult = currentCivicResult();
  const siteIntelResult = currentSiteIntelResult();
  const liveProfile = Boolean(state.liveProfiles[state.zip]);
  const hasCompetitive = Boolean(businessResult?.googlePlaces?.topPlaces?.length || businessResult?.registryExact);
  const hasDemand = Boolean(businessResult?.demandMomentum?.available);
  const hasSite = Boolean(siteIntelResult && !siteIntelResult.fallback);
  const hasRisk = Boolean(civicResult && !civicResult.fallback);

  // 5-state mapping (see DESIGN_SYSTEM.md): live demographics = Verified;
  // borough-default demographics & broad demand = Estimated (proxy); foot
  // traffic = Modeled (our model); pending fetch = Research In Progress.
  const chips = [
    { label: "Demographics", state: liveProfile ? "verified" : "estimated" },
    { label: "Competition", state: hasCompetitive ? "verified" : businessResult ? "modeled" : "research" },
    { label: "Mobility", state: hasSite ? "verified" : siteIntelResult ? "modeled" : "research" },
    { label: "Foot traffic", state: "modeled" },
    { label: "Risk signals", state: hasRisk ? "verified" : civicResult ? "modeled" : "research" },
    { label: "Consumer demand", state: hasDemand ? "verified" : "estimated" }
  ];

  const meta = {
    verified:  { text: "Verified",  tone: "connected" },
    modeled:   { text: "Modeled",   tone: "modeled" },
    estimated: { text: "Estimated", tone: "estimated" },
    research:  { text: "Checking",  tone: "refreshing" }
  };

  elements.signalsStripList.innerHTML = chips
    .map(({ label, state: chipState }) => {
      const { text, tone } = meta[chipState];
      return `<span class="signal-chip signal-chip-${tone}"><i class="signal-dot"></i>${escapeText(label)}<em>${text}</em></span>`;
    })
    .join("");
}

function animateNumber(element, value, options = {}) {
  if (!element) return;
  const numeric = Number(value);
  const suffix = options.suffix ?? "";
  if (!Number.isFinite(numeric)) {
    element.textContent = String(value ?? "Needs Validation");
    return;
  }
  if (prefersReducedMotion()) {
    element.textContent = `${Math.round(numeric)}${suffix}`;
    animatedNumbers.set(element, numeric);
    return;
  }

  const prior = animatedNumbers.get(element);
  const start = Number.isFinite(prior) ? prior : numeric;
  const duration = options.duration ?? 650;
  const startedAt = performance.now();
  animatedNumbers.set(element, numeric);

  function tick(now) {
    const progress = Math.min(1, (now - startedAt) / duration);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(start + (numeric - start) * eased);
    element.textContent = `${current}${suffix}`;
    if (progress < 1) requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
}

function animateScoreText(element, value) {
  const match = String(value ?? "").match(/^(\d+)(\/100)$/);
  if (!match) {
    if (element) element.textContent = String(value ?? "Needs more data");
    return;
  }
  animateNumber(element, Number(match[1]), { suffix: match[2] });
}

function setLoadingText(element, label = "Refreshing") {
  if (!element) return;
  element.textContent = label;
  element.classList.add("skeleton-text");
}

function clearLoadingText(...items) {
  items.forEach((element) => element?.classList?.remove("skeleton-text"));
}

let marketMap = null;
let mapLayers = [];

const zipCenters = {
  "10003": [40.7316, -73.9891],
  "11201": [40.6955, -73.9893],
  "11101": [40.7447, -73.9485],
  "10458": [40.8622, -73.8860],
  "10301": [40.6312, -74.0929]
};

function renderStaticMapFallback(reason = "Map tiles are taking longer than expected.") {
  if (!elements.map) return;
  const center = mapCenterForZip(state.zip || "10003");
  elements.map.classList.add("map-fallback");
  elements.map.innerHTML = `
    <div class="static-map-fallback">
      <strong>Map preview available</strong>
      <span>${escapeText(reason)}</span>
      <small>Area center: ${center.map((value) => Number(value).toFixed(4)).join(", ")}</small>
    </div>
  `;
  setStatusPill(elements.mapStatus, "Map preview", "Estimated");
  updatePanelTimestamp(".map-panel");
}

function mapCenterForZip(zip) {
  if (state.location) return [Number(state.location.lat), Number(state.location.lng)];
  if (zipCenters[zip]) return zipCenters[zip];
  const borough = boroughForZip(zip);
  const boroughCenters = {
    Manhattan: [40.7831, -73.9712],
    Bronx: [40.8448, -73.8648],
    Brooklyn: [40.6782, -73.9442],
    Queens: [40.7282, -73.7949],
    "Staten Island": [40.5795, -74.1502]
  };
  return boroughCenters[borough] || [40.7128, -74.0060];
}

function clearMapLayers() {
  mapLayers.forEach((layer) => layer.remove());
  mapLayers = [];
}

function markerIcon(className) {
  return L.divIcon({
    className: `map-marker ${className}`,
    iconSize: [18, 18],
    iconAnchor: [9, 9]
  });
}

function addMapMarker(lat, lng, className, html) {
  if (!marketMap || !Number.isFinite(Number(lat)) || !Number.isFinite(Number(lng))) return;
  const marker = L.marker([Number(lat), Number(lng)], { icon: markerIcon(className) }).bindPopup(html);
  marker.addTo(marketMap);
  mapLayers.push(marker);
}

function densityColor(score) {
  const value = clampScore(score);
  if (value >= 78) return "#963226";
  if (value >= 58) return "#c99a14";
  if (value >= 38) return "#117c7d";
  return "#177a50";
}

function addDensityCircle(lat, lng, score, popupHtml) {
  if (!marketMap || !Number.isFinite(Number(lat)) || !Number.isFinite(Number(lng))) return;
  const value = clampScore(score);
  const color = densityColor(value);
  const circle = L.circle([Number(lat), Number(lng)], {
    radius: 115 + value * 2.1,
    color,
    fillColor: color,
    fillOpacity: 0.1,
    weight: 1
  }).bindPopup(popupHtml);
  circle.addTo(marketMap);
  mapLayers.push(circle);
}

function renderMarketMap() {
  if (!window.L || !elements.map) {
    setStatusPill(elements.mapStatus, "Map loading", "Refreshing");
    renderStaticMapFallback("Interactive map library is still loading. SpotVest will retry automatically.");
    if (state.mapRetryCount < 4) {
      state.mapRetryCount += 1;
      window.setTimeout(renderMarketMap, 650);
    }
    return;
  }

  if (!marketMap) {
    requestAnimationFrame(() => {
      try {
        elements.map.classList.remove("map-fallback");
        elements.map.innerHTML = "";
        if (elements.map._leaflet_id) {
          try {
            delete elements.map._leaflet_id;
          } catch {
            elements.map._leaflet_id = undefined;
          }
        }
        marketMap = L.map(elements.map, { scrollWheelZoom: false });
        const tiles = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          maxZoom: 19
        });
        tiles.on("tileerror", (error) => logIntegrationError("map tiles", error, { zip: state.zip }));
        tiles.addTo(marketMap);
        _finishRenderMap();
      } catch (error) {
        logIntegrationError("map render", error, { zip: state.zip });
        renderStaticMapFallback("Interactive map could not initialize. Market signals still loaded below.");
      }
    });
    return;
  }

  try {
    elements.map.classList.remove("map-fallback");
    _finishRenderMap();
  } catch (error) {
    logIntegrationError("map update", error, { zip: state.zip });
    renderStaticMapFallback("Interactive map update failed. Market signals still loaded below.");
  }
}

function _finishRenderMap() {
  const map = marketMap;
  clearMapLayers();
  const center = mapCenterForZip(state.zip);
  map.setView(center, state.location ? 15 : 13);

  if (state.location) {
    addMapMarker(state.location.lat, state.location.lng, "address-marker selected-location", `<strong>${state.location.address}</strong><br>Search center`);
    const radius = Number(state.location.radiusMiles || 0.5) * 1609.344;
    const circle = L.circle(center, {
      radius,
      color: "#117c7d",
      fillColor: "#117c7d",
      fillOpacity: 0.08,
      weight: 2
    }).addTo(map);
    mapLayers.push(circle);
  }

  const businessResult = currentBusinessResult();
  const business = normalizeBusiness(state.business || "business");
  const profile = profileForZip(state.zip);
  const categorySaturation = businessResult?.count && profile
    ? saturationFromCount(businessResult.count, profile)
    : profile?.competition || 50;
  const saturation = saturationLabel(categorySaturation);
  if (profile) {
    const aggregateCircle = L.circle(center, {
      radius: state.location ? Number(state.location.radiusMiles || 0.5) * 1609.344 : 1250,
      color: densityColor(categorySaturation),
      fillColor: densityColor(categorySaturation),
      fillOpacity: 0.045,
      weight: 2,
      dashArray: "6 6"
    }).bindPopup(`<strong>${titleCase(business)} saturation</strong><br>${saturation} market pressure<br><small>Modeled competition density layer</small>`);
    aggregateCircle.addTo(map);
    mapLayers.push(aggregateCircle);
  }

  const records = businessResult?.mapRecords || [];
  records.forEach((record) => {
    const popup = `<strong>${record.name}</strong><br>${record.category || "Local activity"}<br>${record.address || ""}<br><small>Local market activity · ${saturation} category saturation</small>`;
    addDensityCircle(record.lat, record.lng, categorySaturation, popup);
    addMapMarker(
      record.lat,
      record.lng,
      "registry-marker",
      popup
    );
  });

  const places = businessResult?.googlePlaces?.mapPlaces || businessResult?.googlePlaces?.topPlaces || [];
  places.forEach((place) => {
    const rating = safeNumber(place.rating);
    const reviews = safeNumber(place.reviews, 0);
    const placePressure = clampScore(categorySaturation + Math.min(18, Math.log10(reviews + 1) * 6) + (rating >= 4.5 ? 4 : 0));
    const popup = `
      <strong>${place.name}</strong><br>
      ${rating === null ? "No rating" : `${rating} rating`} · ${formatInteger(reviews, "0")} reviews<br>
      <small>${saturationLabel(placePressure)} competitor density · ${saturation} category saturation</small>
    `;
    addDensityCircle(place.lat, place.lng, placePressure, popup);
    addMapMarker(
      place.lat,
      place.lng,
      "competitor-marker",
      popup
    );
  });

  state.leases
    .filter((lease) => lease.zip === state.zip && lease.lat && lease.lng)
    .forEach((lease) => {
      addMapMarker(
        lease.lat,
        lease.lng,
        "lease-marker",
        `<strong>${lease.address}</strong><br>${safeNumber(lease.sf) === null ? "SF: Needs Validation" : `${formatInteger(lease.sf)} SF`} · ${safeNumber(lease.rent) === null ? "Cost: Needs Validation" : `${formatCurrency(lease.rent)}/mo`}`
      );
    });

  setStatusPill(
    elements.mapStatus,
    state.location ? `Address radius · ${state.location.radiusMiles} mi` : `Area view · ZIP ${state.zip}`,
    "Available"
  );
  updatePanelTimestamp(".map-panel");
  requestAnimationFrame(() => window.setTimeout(() => map.invalidateSize(), 60));
}

function labelFor(metric, value) {
  const bucket = value >= 85 ? 3 : value >= 68 ? 2 : value >= 48 ? 1 : 0;
  return labels[metric][bucket];
}

function boroughForZip(zip) {
  const exact = Object.entries(nycZipCodesByBorough).find(([, zips]) => zips.includes(zip))?.[0];
  if (exact) return exact;
  if (/^10[012]/.test(zip)) return "Manhattan";
  if (/^104/.test(zip)) return "Bronx";
  if (/^112/.test(zip)) return "Brooklyn";
  if (/^(1100[45]|111|113|114|116)/.test(zip)) return "Queens";
  if (/^103/.test(zip)) return "Staten Island";
  return null;
}

function profileForZip(zip) {
  if (state.liveProfiles[zip]) return state.liveProfiles[zip];
  if (zipProfiles[zip]) return zipProfiles[zip];

  const borough = boroughForZip(zip);
  if (!borough) return null;

  const base = boroughProfiles[borough];
  return {
    ...base,
    name: `${borough} ZIP ${zip}`,
    verdict:
      `SpotVest can analyze this ${borough} ZIP. The first pass uses market profile assumptions plus live local activity signals; verify the exact block before making a final business decision.`,
    talkingPoints: [
      "Use competitive intensity as the first screen for category saturation.",
      "Validate the exact avenue, corner visibility, frontage, and nearby anchors.",
      "Treat broad customer profile signals as directional until stronger area evidence is connected."
    ],
    evidence: [
      "ZIP is recognized as an NYC ZIP code in SpotVest.",
      "Business checker can query local market activity and competitive signals.",
      "Customer profile is directional until market demographics are connected."
    ]
  };
}

function enrichProfileWithCensus(baseProfile, census) {
  if (!census || census.error) return baseProfile;

  const medianIncome = safeNumber(census.medianIncome) !== null ? formatCurrency(census.medianIncome) : "not available";
  const medianRent = safeNumber(census.medianRent) !== null ? formatCurrency(census.medianRent) : "not available";
  const renterShare = safeNumber(census.renterShare) !== null ? `${Math.round(safeNumber(census.renterShare))}%` : "not available";
  const bachelorShare = safeNumber(census.bachelorShare) !== null ? `${Math.round(safeNumber(census.bachelorShare))}%` : "not available";
  const medianAgeValue = safeNumber(census.medianAge);
  const medianAge = medianAgeValue !== null ? `${Math.round(medianAgeValue)}` : "not available";

  return {
    ...baseProfile,
    density: census.population ? Math.max(20, Math.min(98, Math.round(((census.population - 8000) / 85000) * 100))) : baseProfile.density,
    income: census.signals?.income ?? baseProfile.income,
    rent: census.signals?.rent ?? baseProfile.rent,
    families: census.signals?.families ?? baseProfile.families,
    student: census.signals?.student ?? baseProfile.student,
    chainFit: census.signals?.chainFit ?? baseProfile.chainFit,
    localPreference: census.signals?.localPreference ?? baseProfile.localPreference,
    affluenceLabel: `market demographics profile with median income ${medianIncome}, median age ${medianAge}, and renter share ${renterShare}`,
    audience: [
      ["Money profile", `Median household income is ${medianIncome}; median gross rent is ${medianRent}.`],
      ["Household profile", `Population is ${formatInteger(census.population, "not available")} with ${formatInteger(census.households, "not available")} households and ${renterShare} renter occupancy.`],
      ["Education / age", `Median age is ${medianAge}; bachelor-plus education share is ${bachelorShare}.`]
    ],
    evidence: [
      `Market Demographics: median household income ${medianIncome}.`,
      `Market Demographics: renter share ${renterShare}, median gross rent ${medianRent}.`,
      `Market Demographics: population ${formatInteger(census.population, "not available")}, median age ${medianAge}.`
    ],
    verdict: `${baseProfile.verdict} Market demographics are now connected for income, age, households, rent, renter profile, and education.`
  };
}

function opportunityCompetition(zip, business, profile, options = {}) {
  const includeLiveCompetition = options.includeLiveCompetition !== false;
  const liveResult = includeLiveCompetition ? currentBusinessResult() : null;
  const liveMatchesBusiness = liveResult?.business === business;
  const count = liveMatchesBusiness && Number.isFinite(Number(liveResult.count))
    ? Number(liveResult.count)
    : competitorCounts[zip]?.[business];

  if (!Number.isFinite(Number(count))) {
    return {
      count: null,
      source: "modeled area signals",
      adjustment: 0,
      label: "Directional"
    };
  }

  const saturation = saturationFromCount(Number(count), profile);
  const adjustment = saturation >= 82
    ? -14
    : saturation >= 68
      ? -8
      : saturation <= 36
        ? 9
        : saturation <= 50
          ? 5
          : 0;

  return {
    count: Number(count),
    source: liveMatchesBusiness ? "verified market signals" : "modeled competitor baseline",
    adjustment,
    label: saturationLabel(saturation)
  };
}

function scoreCategory(profile, model, options = {}) {
  const raw = Object.entries(model.weights).reduce((total, [metric, weight]) => {
    return total + (safeNumber(profile[metric], 50) - 50) * weight * 3.15;
  }, 50);

  const competition = opportunityCompetition(state.zip, model.business, profile, options);
  const localFit = model.business === "restaurant"
    ? Math.round((safeNumber(profile.nightlife, 50) + safeNumber(profile.transit, 50) + safeNumber(profile.density, 50) - safeNumber(profile.rent, 50) * 0.45) / 3)
    : Math.round((safeNumber(profile.localPreference, 50) + safeNumber(profile.density, 50) - safeNumber(profile.rent, 50) * 0.35) / 2.2);
  const contextAdjustment = Math.max(-14, Math.min(14, Math.round((localFit - 50) / 5.8)));

  return Math.max(5, Math.min(98, Math.round(raw + competition.adjustment + contextAdjustment)));
}

function bandFor(score) {
  if (score >= 72) return "strong";
  if (score >= 55) return "mixed";
  return "weak";
}

function buildRecommendations(profile, options = {}) {
  return categoryModels
    .map((model) => {
      const score = scoreCategory(profile, model, options);
      return {
        ...model,
        score,
        band: bandFor(score)
      };
    })
    .sort((a, b) => b.score - a.score);
}

function normalizeRestaurantCuisine(input) {
  const value = String(input || "").trim().toLowerCase();
  const match = Object.entries(restaurantCuisineTypes).find(([, config]) => {
    return config.aliases.some((alias) => value.includes(alias));
  });
  return match ? match[0] : null;
}

function normalizeBusiness(input) {
  const value = String(input || "").trim().toLowerCase();
  const cuisine = normalizeRestaurantCuisine(value);
  if (cuisine) return cuisine;

  const match = Object.entries(businessTypes).find(([, config]) => {
    return config.aliases.some((alias) => value.includes(alias));
  });

  return match ? match[0] : value || "business";
}

function businessDisplayName(input) {
  const normalized = normalizeBusiness(input);
  const labels = {
    restaurant: "Restaurant",
    deli: "Deli / bodega",
    pizza: "Pizza / slice shop",
    cafe: "Cafe / coffee",
    coffee: "Cafe / coffee",
    bakery: "Bakery / bagel",
    breakfast: "Breakfast / brunch",
    italian: "Italian restaurant",
    greek: "Greek restaurant",
    mediterranean: "Mediterranean / halal",
    turkish: "Turkish restaurant",
    french: "French restaurant",
    japanese: "Japanese / sushi / ramen",
    chinese: "Chinese / dim sum",
    korean: "Korean restaurant",
    thai: "Thai restaurant",
    vietnamese: "Vietnamese / pho",
    filipino: "Filipino restaurant",
    indian: "Indian restaurant",
    pakistani: "Pakistani / Bangladeshi",
    mexican: "Mexican / tacos",
    latin: "Latin American restaurant",
    dominican: "Dominican restaurant",
    "puerto rican": "Puerto Rican restaurant",
    peruvian: "Peruvian restaurant",
    colombian: "Colombian restaurant",
    brazilian: "Brazilian restaurant",
    caribbean: "Caribbean / Jamaican",
    african: "African restaurant",
    ethiopian: "Ethiopian restaurant",
    american: "American / diner",
    burger: "Burger restaurant",
    chicken: "Chicken / wings",
    bbq: "BBQ restaurant",
    seafood: "Seafood restaurant",
    steakhouse: "Steakhouse",
    vegan: "Vegan / vegetarian",
    juice: "Juice / smoothie",
    dessert: "Dessert / ice cream",
    "bubble tea": "Bubble tea",
    bar: "Bar / pub",
    "food truck": "Food truck / cart"
  };
  return labels[normalized] || titleCase(normalized);
}

const businessSuggestionOptions = [
  "General restaurant",
  "Pizza / slice shop",
  "Deli / bodega",
  "Cafe / coffee",
  "Bakery / bagel",
  "Breakfast / brunch",
  "Italian restaurant",
  "Greek restaurant",
  "Mediterranean / halal",
  "Turkish restaurant",
  "French restaurant",
  "Japanese / sushi / ramen",
  "Chinese / dim sum",
  "Korean restaurant",
  "Thai restaurant",
  "Vietnamese / pho",
  "Filipino restaurant",
  "Indian restaurant",
  "Pakistani / Bangladeshi",
  "Mexican / tacos",
  "Latin American restaurant",
  "Dominican restaurant",
  "Puerto Rican restaurant",
  "Peruvian restaurant",
  "Colombian restaurant",
  "Brazilian restaurant",
  "Caribbean / Jamaican",
  "African restaurant",
  "Ethiopian restaurant",
  "American / diner",
  "Burgers",
  "Chicken / wings",
  "BBQ restaurant",
  "Seafood restaurant",
  "Steakhouse",
  "Vegan / vegetarian",
  "Juice / smoothie",
  "Dessert / ice cream",
  "Bubble tea",
  "Bar / pub",
  "Food truck / cart",
  "Gym / fitness studio",
  "Bike shop",
  "Daycare / childcare",
  "Hair salon",
  "Barber shop",
  "Nail salon",
  "Spa / med spa",
  "Laundromat",
  "Dry cleaner",
  "Pharmacy",
  "Grocery / market",
  "Retail store",
  "Clothing boutique",
  "Pet store",
  "Tutoring / learning center",
  "Urgent care",
  "Medical office",
  "Dental office",
  "Liquor store",
  "Hardware store",
  "Electronics store",
  "Phone repair",
  "Smoke / vape shop"
];

function filteredBusinessSuggestions({ showAll = false } = {}) {
  const query = showAll ? "" : elements.businessInput?.value?.trim().toLowerCase() || "";
  const options = businessSuggestionOptions.filter((option) => {
    const normalized = option.toLowerCase();
    return !query || normalized.includes(query) || normalizeBusiness(option).includes(query);
  });
  return (options.length ? options : businessSuggestionOptions).slice(0, 80);
}

function showBusinessSuggestions(options = {}) {
  if (!elements.businessSuggestions) return;
  const suggestions = filteredBusinessSuggestions(options);
  elements.businessSuggestions.innerHTML = suggestions
    .map((option) => `<button type="button" role="option" data-business="${escapeText(option)}">${escapeText(option)}</button>`)
    .join("");
  elements.businessSuggestions.hidden = false;
  elements.businessInput?.setAttribute("aria-expanded", "true");
  document.body.classList.add("business-picker-open");
}

function hideBusinessSuggestions() {
  if (!elements.businessSuggestions) return;
  elements.businessSuggestions.hidden = true;
  elements.businessInput?.setAttribute("aria-expanded", "false");
  document.body.classList.remove("business-picker-open");
}

function selectBusinessSuggestion(value) {
  elements.businessInput.value = value;
  state.business = value;
  hideBusinessSuggestions();
  elements.businessInput.focus({ preventScroll: true });
}

function syncBusinessInput() {
  const value = elements.businessInput?.value?.trim();
  if (value) state.business = value;
}

function titleCase(value) {
  return value
    .split(" ")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function reportAreaTitle(zip, profile) {
  const profileName = String(profile?.name || "").trim();
  const fallbackName = profileName && !profileName.includes(zip)
    ? `ZIP ${zip} · ${profileName}`
    : profileName || `ZIP ${zip}`;
  if (!state.location) return fallbackName;
  const cleanAddress = String(state.location.address || "")
    .replace(/,\s*USA$/i, "")
    .replace(/\s+/g, " ")
    .trim();
  return cleanAddress || fallbackName;
}

function modeledBusinessConfig(business) {
  return (
    businessTypes[business] || {
      aliases: [business],
      baseDemand: 58,
      localBias: 62,
      chainBias: 50,
      rentSensitivity: 60,
      notes: "This is a modeled category until competitive signals are connected for live market research."
    }
  );
}

function estimateCompetitors(zip, business, profile, config) {
  const known = competitorCounts[zip]?.[business];
  if (typeof known === "number") return known;

  const demand = (profile.density * 0.28 + profile.transit * 0.16 + profile.competition * 0.2 + config.baseDemand * 0.24) / 8;
  return Math.max(2, Math.round(demand + profile.localPreference / 14));
}

function estimateMonthlyProfit(item, profile) {
  const demandFactor = safeNumber(item.score, 50) / 100;
  const incomeFactor = Math.max(0.75, safeNumber(profile.income, 55) / 80);
  const rentDrag = Math.max(0.68, 1 - safeNumber(profile.rent, 60) / 260);
  const baseRevenue = {
    "Specialty coffee": 85000,
    "Boutique fitness": 95000,
    "Fast casual lunch": 120000,
    "Daycare / enrichment": 110000,
    "Med spa / beauty clinic": 130000,
    "Discount retail": 90000,
    "Full-service restaurant": 165000,
    "Laundry / wash-and-fold": 70000
  }[item.name] || 85000;
  const margin = {
    "Specialty coffee": 0.14,
    "Boutique fitness": 0.18,
    "Fast casual lunch": 0.11,
    "Daycare / enrichment": 0.16,
    "Med spa / beauty clinic": 0.22,
    "Discount retail": 0.09,
    "Full-service restaurant": 0.08,
    "Laundry / wash-and-fold": 0.2
  }[item.name] || 0.12;
  const monthlyProfit = baseRevenue * demandFactor * incomeFactor * rentDrag * margin;
  const low = Math.max(2500, Math.round((monthlyProfit * 0.72) / 500) * 500);
  const high = Math.max(low + 1500, Math.round((monthlyProfit * 1.28) / 500) * 500);
  return `${moneyRange(low, high)}/mo`;
}

function sourceTagsForResult(result, isLive) {
  if (!isLive) return ["Modeled market signal"];

  const tags = [];
  if (result?.openDataCount > 0) tags.push("Local Market Activity");
  if (result?.googleVisibleCount > 0) tags.push("Competitive Signals");
  if (result?.demandMomentum?.available) tags.push("Demand Momentum");
  if (!tags.length) tags.push("Limited verified signal");
  return tags;
}

function demandMomentumForResult(result) {
  return result?.demandMomentum?.available ? result.demandMomentum : null;
}

function demandMomentumLabel(result) {
  return demandMomentumForResult(result)?.label || "Demand unavailable";
}

function demandMomentumScore(result) {
  const signal = demandMomentumForResult(result);
  return signal ? safeNumber(signal.momentumScore, 50) : 50;
}

function scoreDrivers(profile, item) {
  const competition = opportunityCompetition(state.zip, item.business, profile);
  const positiveDrivers = Object.entries(item.weights)
    .filter(([, weight]) => weight > 0)
    .sort((a, b) => (profile[b[0]] || 0) * b[1] - (profile[a[0]] || 0) * a[1])
    .slice(0, 2)
    .map(([metric]) => metric.replace(/([A-Z])/g, " $1").toLowerCase());

  const drag = Object.entries(item.weights)
    .filter(([, weight]) => weight < 0)
    .sort((a, b) => (profile[b[0]] || 0) * Math.abs(b[1]) - (profile[a[0]] || 0) * Math.abs(a[1]))[0]?.[0]
    ?.replace(/([A-Z])/g, " $1")
    .toLowerCase();

  const competitionCopy = competition.count === null
    ? `${saturationLabel(safeNumber(profile.competition, 50)).toLowerCase()} (modeled for this category)`
    : `${competition.label.toLowerCase()} market pressure`;

  return `Driven by ${positiveDrivers.join(" and ")}${drag ? `; watch ${drag}` : ""}. Competition: ${competitionCopy}.`;
}

function renderOpportunities(profile) {
  const recommendations = buildRecommendations(profile).slice(0, 5);
  const liveCompetition = currentBusinessResult()?.registryExact;
  setStatusPill(
    elements.opportunitySource,
    liveCompetition ? "Verified signals + model ranges" : "Directional model",
    liveCompetition ? "Available" : "Estimated"
  );
  elements.opportunityList.innerHTML = recommendations
    .map((item) => {
      const profit = estimateMonthlyProfit(item, profile);
      const competition = opportunityCompetition(state.zip, item.business, profile);
      const score = clampScore(item.score);
      const risk = score >= 72 ? "Good fit" : score >= 58 ? "Selective" : "Risky";
      const scoreType = competition.source.includes("verified") ? "signal-adjusted" : "area-adjusted";
      const confidence = competition.source.includes("verified") ? "Confidence: medium/high" : "Confidence: low/medium";
      return `
        <article class="opportunity-item">
          <div>
            <h4>${item.name}</h4>
            <p>${item.note}</p>
            <p>${scoreDrivers(profile, item)}</p>
          </div>
          <div class="opportunity-metrics">
            <strong>${profit}</strong>
            <span>${risk} · ${scoreType} score ${formatBadgeScore(score)}</span>
            <span>${confidence}</span>
          </div>
        </article>
      `;
    })
    .join("");
}

function renderCategoryList(recommendations) {
  const visibleRecommendations =
    state.filter === "all"
      ? recommendations
      : recommendations.filter((item) => item.band === state.filter);
  const liveCompetition = currentBusinessResult()?.registryExact;

  setStatusPill(
    elements.categorySource,
    liveCompetition ? `Signal-adjusted for ${currentBusinessResult().business}` : "Directional area model",
    liveCompetition ? "Available" : "Estimated"
  );
  elements.categoryList.innerHTML = visibleRecommendations
    .map(
      (item) => `
        <article class="category-item">
          <div>
            <h4>${item.name}</h4>
            <p>${item.note}</p>
          </div>
          <div class="score ${item.band}" aria-label="${item.band} fit score">${formatBadgeScore(item.score)}</div>
        </article>
      `
    )
    .join("");
}

function renderTopPlaces(result) {
  const places = result?.googlePlaces?.topPlaces || [];
  elements.placesTitle.textContent = `Best nearby competitive examples`;
  setStatusPill(
    elements.placesSource,
    result?.searchContext?.mode === "address-radius"
      ? `Competitive Signals · ${result.searchContext.radiusMiles} mi`
      : result?.googlePlaces ? "Competitive Signals" : "Waiting for competitive signals",
    places.length ? "Available" : "Estimated"
  );
  updatePanelTimestamp(".places-panel");

  if (!places.length) {
    elements.placesList.innerHTML = `
      <article class="empty-places">
        <strong>No competitive examples yet</strong>
        <p>Try a common term like pizza, deli, cafe, gym, or laundromat.</p>
      </article>
    `;
    return;
  }

  elements.placesList.innerHTML = places
    .map((place) => {
      const photo = place.photoRef
        ? `<img src="/api/place-photo?ref=${encodeURIComponent(place.photoRef)}" alt="${place.name}" loading="lazy" />`
        : `<div class="place-photo-fallback">NYC</div>`;
      const tenure = result.tenure?.text || "Business age needs confirmation";
      return `
        <article class="place-card">
          ${photo}
          <div>
            <h4>${place.name}</h4>
            <p>${place.address || "Address unavailable"}</p>
            <div class="place-meta">
              <span>${safeNumber(place.rating) === null ? "No rating" : `${safeNumber(place.rating)} rating`}</span>
              <span>${formatInteger(place.reviews, "0")} reviews</span>
              <span>${place.chain ? "Chain" : "Likely local"}</span>
            </div>
            <small>${tenure}</small>
          </div>
        </article>
      `;
    })
    .join("");
}

function saturationFromCount(count, profile) {
  const tolerance = profile.density >= 80 ? 24 : profile.density >= 65 ? 18 : 12;
  return Math.max(8, Math.min(98, Math.round((count / tolerance) * 82)));
}

function saturationLabel(score) {
  if (score >= 78) return "Crowded";
  if (score >= 58) return "Moderate";
  if (score >= 38) return "Open";
  return "Underserved";
}

function pulseLabel(score, labelsForRange) {
  if (score >= 78) return labelsForRange[3];
  if (score >= 58) return labelsForRange[2];
  if (score >= 38) return labelsForRange[1];
  return labelsForRange[0];
}

function renderMarketPulse(profile) {
  const footScore = Math.round(profile.density * 0.45 + profile.transit * 0.35 + profile.office * 0.2);
  const spendScore = Math.round(profile.income * 0.74 + profile.tourist * 0.12 + profile.office * 0.14);
  const riskScore = Math.round(profile.rent * 0.55 + profile.competition * 0.35 + (100 - profile.localPreference) * 0.1);

  elements.pulseFoot.textContent = pulseLabel(footScore, ["Thin", "Uneven", "Strong", "Very strong"]);
  elements.pulseSpend.textContent = pulseLabel(spendScore, ["Limited", "Moderate", "High", "Premium"]);
  elements.pulseRisk.textContent = pulseLabel(riskScore, ["Low", "Manageable", "Elevated", "Severe"]);
}

function activityLabel(score) {
  if (score >= 74) return "High";
  if (score >= 48) return "Medium";
  return "Low";
}

function modeledVisitorRange(score, profile) {
  const baseLow = score >= 74 ? 4500 : score >= 48 ? 1800 : 600;
  const baseHigh = score >= 74 ? 12000 : score >= 48 ? 5200 : 1800;
  const officeLift = safeNumber(profile.office, 50) >= 75 ? 1.18 : 1;
  const touristLift = safeNumber(profile.tourist, 50) >= 72 ? 1.12 : 1;
  const locationLift = state.location ? 0.82 : 1;
  const low = Math.round(baseLow * officeLift * touristLift * locationLift / 100) * 100;
  const high = Math.round(baseHigh * officeLift * touristLift * locationLift / 100) * 100;
  return `${formatInteger(low)}-${formatInteger(Math.max(low + 500, high))}`;
}

function peakHoursFor(profile) {
  const peaks = [];
  if (safeNumber(profile.office, 0) >= 58 || safeNumber(profile.transit, 0) >= 72) peaks.push("morning");
  peaks.push("lunch");
  if (safeNumber(profile.nightlife, 0) >= 58 || safeNumber(profile.tourist, 0) >= 62) peaks.push("evening");
  return [...new Set(peaks)].join(" / ");
}

function weekdayWeekendSplit(profile) {
  const weekday = clampScore(50 + safeNumber(profile.office, 50) * 0.18 + safeNumber(profile.transit, 50) * 0.1 - safeNumber(profile.nightlife, 50) * 0.08 - safeNumber(profile.tourist, 50) * 0.05);
  const weekend = 100 - weekday;
  return `Weekday ${weekday}% / weekend ${weekend}% modeled split.`;
}

function footTrafficConfidenceLabel(score) {
  // Describes how much real data backs the modeled estimate, not how
  // confident we are that the foot-traffic number is correct.
  if (score >= 78) return "stronger data backing";
  if (score >= 58) return "moderate data backing";
  return "low data backing";
}

function renderFootTrafficIntelligence(profile) {
  if (!profile || !elements.footTrafficScore) return;

  const siteIntel = currentSiteIntelResult();
  const businessResult = currentBusinessResult();
  const mobilityScore = siteIntel?.mta?.available
    ? (siteIntel.mta.totalDecember2024Ridership > 250000 ? 90 : 68)
    : safeNumber(profile.transit, 50);
  const commercialMixScore = siteIntel?.pluto?.retailArea > 500000
    ? 88
    : siteIntel?.pluto?.retailArea > 150000
      ? 68
      : safeNumber(profile.office, 50);
  const restaurantConcentration = businessResult?.registryExact
    ? saturationFromCount(safeNumber(businessResult.count, 0), profile)
    : safeNumber(competitorCounts[state.zip]?.restaurant, 0)
      ? saturationFromCount(competitorCounts[state.zip].restaurant, profile)
      : safeNumber(profile.competition, 50);
  const score = clampScore(
    safeNumber(profile.density, 50) * 0.24 +
      safeNumber(profile.transit, 50) * 0.2 +
      mobilityScore * 0.14 +
      safeNumber(profile.office, 50) * 0.12 +
      safeNumber(profile.nightlife, 50) * 0.1 +
      safeNumber(profile.tourist, 50) * 0.08 +
      commercialMixScore * 0.07 +
      restaurantConcentration * 0.05
  );
  const confidenceScore = clampScore(
    42 +
      (siteIntel ? 18 : 0) +
      (siteIntel?.mta?.available ? 13 : 0) +
      (siteIntel?.pluto?.retailArea > 0 ? 12 : 0) +
      (businessResult?.registryExact ? 10 : 0)
  );
  const activity = activityLabel(score);
  const walkability = clampScore(safeNumber(profile.density, 50) * 0.46 + safeNumber(profile.transit, 50) * 0.42 + safeNumber(profile.localPreference, 50) * 0.12);
  const transitText = siteIntel?.mta?.available
    ? `Transit proximity: ${siteIntel.mta.totalDecember2024Ridership > 250000 ? "strong" : "moderate"} nearby mobility signal.`
    : `Transit proximity: ${pulseLabel(profile.transit, ["limited", "useful", "strong", "excellent"])} area access.`;

  elements.footTrafficScore.textContent = formatScore(score);
  elements.footTrafficActivity.textContent = `Estimated Activity: ${activity}. Based on SpotVest's location intelligence model.`;
  elements.footTrafficVisitors.textContent = `${modeledVisitorRange(score, profile)} daily`;
  elements.footTrafficPeaks.textContent = peakHoursFor(profile);
  elements.footTrafficWeekSplit.textContent = weekdayWeekendSplit(profile);
  elements.footTrafficWalkability.textContent = formatScore(walkability);
  elements.footTrafficTransit.textContent = transitText;
  setStatusPill(
    elements.footTrafficConfidence,
    `Modeled estimate · ${footTrafficConfidenceLabel(confidenceScore)}`,
    "Modeled"
  );
  elements.footTrafficWhy.textContent =
    `Score reflects density ${formatBadgeScore(profile.density)}, transit ${formatBadgeScore(profile.transit)}, office activity ${formatBadgeScore(profile.office)}, nightlife ${formatBadgeScore(profile.nightlife)}, tourism ${formatBadgeScore(profile.tourist)}, commercial mix, mobility, and restaurant concentration. Estimated using mobility, transit, density, and commercial activity signals — SpotVest's Foot Traffic Model, not a direct pedestrian counter.`;
}

function revenueCategoryDefaults(category) {
  const key = normalizeBusiness(category || state.business || "retail");
  const defaults = {
    restaurant: { salesPerSf: [85, 145], breakeven: [12, 24], rentShare: [0.06, 0.1] },
    cafe: { salesPerSf: [70, 125], breakeven: [10, 20], rentShare: [0.07, 0.12] },
    pizza: { salesPerSf: [75, 135], breakeven: [9, 18], rentShare: [0.08, 0.13] },
    deli: { salesPerSf: [95, 175], breakeven: [6, 14], rentShare: [0.06, 0.1] },
    gym: { salesPerSf: [38, 82], breakeven: [14, 30], rentShare: [0.08, 0.14] },
    daycare: { salesPerSf: [45, 90], breakeven: [12, 28], rentShare: [0.07, 0.12] },
    salon: { salesPerSf: [55, 105], breakeven: [8, 18], rentShare: [0.08, 0.13] },
    laundromat: { salesPerSf: [42, 78], breakeven: [18, 36], rentShare: [0.07, 0.12] },
    pharmacy: { salesPerSf: [95, 185], breakeven: [14, 30], rentShare: [0.05, 0.09] },
    retail: { salesPerSf: [45, 95], breakeven: [10, 24], rentShare: [0.08, 0.14] }
  };
  return defaults[key] || defaults.restaurant;
}

function renderRevenueEstimator(profile) {
  if (!elements.revenueProjection) return;
  const rent = safeNumber(elements.revenueRent.value);
  const sizeInput = safeNumber(elements.revenueSize.value);
  const category = elements.revenueCategory.value || state.business || "retail";

  if (!profile) {
    elements.revenueProjection.textContent = "Run a location first";
    elements.revenueBreakeven.textContent = "—";
    elements.revenueRentPercent.textContent = "—";
    return;
  }

  // Show an immediate neighborhood baseline (≈1,200 sq ft at a modeled local
  // rent) so the calculator has value before the user types anything.
  const usingBaseline = rent === null || rent <= 0 || sizeInput === null || sizeInput <= 0;
  const size = usingBaseline ? 1200 : sizeInput;
  const effectiveRent = usingBaseline ? estimateBaselineRent(profile, size) : rent;

  const defaults = revenueCategoryDefaults(category);
  const config = modeledBusinessConfig(normalizeBusiness(category));
  const demandScore = categoryFitForBusiness(normalizeBusiness(category), profile);
  const demandLift = 0.72 + clampScore(demandScore) / 185;
  const incomeLift = 0.82 + clampScore(profile.income) / 420;
  const rentDrag = Math.max(0.72, 1 - clampScore(profile.rent) / 420);

  // Safe parsing + fallbacks: config/defaults fields can be missing (e.g. the
  // fallback config has no operatingDifficulty), which previously produced
  // NaN in the lower break-even bound.
  const salesLow = safeNumber(defaults.salesPerSf?.[0], 60);
  const salesHigh = safeNumber(defaults.salesPerSf?.[1], 120);
  const rentShareLow = safeNumber(defaults.rentShare?.[0], 0.08) || 0.08;
  const rentShareHigh = safeNumber(defaults.rentShare?.[1], 0.12) || 0.12;
  const beBaseLow = safeNumber(defaults.breakeven?.[0], 10);
  const beBaseHigh = safeNumber(defaults.breakeven?.[1], 24);
  const opDifficulty = safeNumber(config.operatingDifficulty, 50);
  const rentSensitivity = safeNumber(config.rentSensitivity, 60);

  const lowRevenue = size * salesLow * demandLift * rentDrag;
  const highRevenue = size * salesHigh * demandLift * incomeLift;
  const avgRevenue = (lowRevenue + highRevenue) / 2;
  const targetRevenueLow = effectiveRent / rentShareHigh;
  const targetRevenueHigh = effectiveRent / rentShareLow;
  const rentPercent = avgRevenue > 0 ? (effectiveRent / avgRevenue) * 100 : null;
  let breakEvenLow = beBaseLow + Math.round(opDifficulty / 24);
  let breakEvenHigh = beBaseHigh + Math.round(rentSensitivity / 18);
  if (breakEvenLow > breakEvenHigh) [breakEvenLow, breakEvenHigh] = [breakEvenHigh, breakEvenLow];

  // Never let NaN / Infinity / null reach the UI.
  const num = (value) => (Number.isFinite(value) ? value : null);
  elements.revenueProjection.textContent =
    num(lowRevenue) !== null && num(highRevenue) !== null && lowRevenue > 0
      ? moneyRange(lowRevenue, highRevenue)
      : "Needs inputs";
  elements.revenueBreakeven.textContent =
    num(breakEvenLow) !== null && num(breakEvenHigh) !== null
      ? `${Math.max(1, breakEvenLow)}-${Math.max(1, breakEvenHigh)} months`
      : "Needs inputs";
  elements.revenueRentPercent.textContent =
    num(rentPercent) !== null ? `${Math.round(rentPercent)}%` : "Needs inputs";
  elements.revenueNote.textContent = usingBaseline
    ? `Neighborhood baseline: ≈1,200 sq ft at a modeled local rent of ${formatCurrency(effectiveRent)}/mo. Enter your own rent and size above to tailor this. Modeled ranges, Due Diligence Required on operator financials.`
    : `Modeled target sales to support this rent: ${moneyRange(targetRevenueLow, targetRevenueHigh)}/mo. Category, demand, rent pressure, and area income are included; verify margins and operator costs.`;
  refreshSpotVestV3Money();
}

// Baseline monthly rent from the area's cost-pressure score (~$4–13 /sq ft/mo).
function estimateBaselineRent(profile, size) {
  const perSfMonthly = 4 + (clampScore(safeNumber(profile.rent, 50)) / 100) * 9;
  return Math.round((size * perSfMonthly) / 100) * 100;
}

function renderCivicLoading() {
  setStatusPill(elements.civicSource, state.location ? "Local activity + address radius" : "Local Market Activity", "Refreshing");
  setLoadingText(elements.complaintLevel, "Refreshing");
  elements.complaintCopy.textContent = "Loading recent quality-of-life signals.";
  elements.complaintTypes.innerHTML = "";
  setLoadingText(elements.permitLevel, "Refreshing");
  elements.permitCopy.textContent = "Loading development activity.";
  elements.permitTypes.innerHTML = "";
  updatePanelTimestamp(".civic-panel");
}

function miniList(items) {
  if (!items?.length) return '<span class="no-signal-copy">No active alerts or complaints recorded for this radius.</span>';
  return items
    .slice(0, 4)
    .map((item) => `<span>${escapeText(item.type)}</span>`)
    .join("");
}

const permitActivityLabels = {
  EW: "Electrical Work",
  PL: "Plumbing",
  EQ: "Equipment",
  AL: "Alteration",
  NB: "New Building",
  SG: "Signage",
  DM: "Demolition",
  FO: "Foundation",
  MH: "Mechanical",
  OT: "Other permit activity"
};

function permitActivityDisplayName(type) {
  const code = String(type || "").trim().toUpperCase();
  return permitActivityLabels[code] || "Other permit activity";
}

function permitMiniList(items) {
  if (!items?.length) return '<span class="no-signal-copy">No active development signal returned.</span>';
  return items
    .slice(0, 4)
    .map((item) => `<span>${escapeText(permitActivityDisplayName(item.type))}</span>`)
    .join("");
}

function renderCivicSignals(data) {
  state.lastCivicResult = data;
  const radiusText = data.searchContext?.mode === "address-radius"
    ? `within ${data.searchContext.radiusMiles} mile`
    : `in ZIP ${data.zip}`;

  elements.civicSource.textContent = data.searchContext?.mode === "address-radius"
    ? "Address radius + area signal"
    : "Area-level signals";
  setStatusPill(elements.civicSource, elements.civicSource.textContent, data.fallback ? "Estimated" : "Available");
  clearLoadingText(elements.complaintLevel, elements.permitLevel);
  elements.complaintLevel.textContent = `${data.complaints.level} local activity`;
  elements.complaintCopy.textContent =
    `Recent quality-of-life signal ${radiusText}. Use this as a risk indicator, not a foot-traffic count.`;
  elements.complaintTypes.innerHTML = miniList(data.complaints.topTypes);
  elements.permitLevel.textContent = `${data.permits.level} permit activity`;
  elements.permitCopy.textContent =
    `Development activity signal in ZIP ${data.zip}. This shows area momentum, not current availability.`;
  elements.permitTypes.innerHTML = permitMiniList(data.permits.topTypes);
  updatePanelTimestamp(".civic-panel");

  // Civic signals are supporting evidence. Keep the executive decision stable
  // after the primary market/competition pass so users do not watch the score
  // keep changing as slower secondary panels finish.
}

async function renderCivicCheck() {
  const requestId = ++state.civicRequestId;
  renderCivicLoading();

  const params = new URLSearchParams({ zip: state.zip });
  if (state.location) {
    params.set("lat", state.location.lat);
    params.set("lng", state.location.lng);
    params.set("radius", state.location.radiusMiles);
    params.set("address", state.location.address);
  }

  try {
    const data = await fetchJsonWithTimeout(`/api/civic-signals?${params.toString()}`, {
      source: "risk and development signals",
      timeoutMs: 26000,
      retries: 1
    });
    if (requestId !== state.civicRequestId) return;
    renderCivicSignals(data);
  } catch (error) {
    if (requestId !== state.civicRequestId) return;
    logIntegrationError("risk and development fallback", error, { zip: state.zip });
    // Keep the last confirmed risk signal rather than downgrading to a neutral
    // fallback (a slow refresh must not drop the real 311 risk and flip the verdict).
    if (state.lastCivicResult && contextMatches(state.lastCivicResult) && !state.lastCivicResult.fallback) return;
    renderCivicSignals(fallbackCivicSignals());
    elements.complaintLevel.textContent = "Estimated local risk";
    elements.complaintCopy.textContent = "Risk signal did not return in time. SpotVest is using a neutral fallback until retry.";
    elements.permitLevel.textContent = "Estimated permit activity";
    elements.permitCopy.textContent = "Development signal did not return in time. SpotVest is using a neutral fallback until retry.";
  }
}

function renderConceptLoading() {
  setStatusPill(elements.conceptSource, state.location ? "Address radius" : "Area concept scan", "Refreshing");
  elements.conceptFitList.innerHTML = `
    <article class="empty-places">
      <strong class="skeleton-text">Refreshing concept signals</strong>
      <p><span class="skeleton-line"></span><span class="skeleton-line short"></span></p>
    </article>
  `;
  updatePanelTimestamp(".concept-fit-panel");
}

function isFoodBusiness(business) {
  const normalized = normalizeBusiness(business);
  const foodTerms = new Set([
    "restaurant",
    "pizza",
    "deli",
    "cafe",
    "bakery",
    "breakfast",
    "italian",
    "greek",
    "mediterranean",
    "turkish",
    "french",
    "japanese",
    "chinese",
    "korean",
    "thai",
    "vietnamese",
    "filipino",
    "indian",
    "pakistani",
    "mexican",
    "latin",
    "dominican",
    "puerto rican",
    "peruvian",
    "colombian",
    "brazilian",
    "caribbean",
    "african",
    "ethiopian",
    "american",
    "burger",
    "chicken",
    "bbq",
    "seafood",
    "steakhouse",
    "vegan",
    "juice",
    "dessert",
    "bubble tea",
    "bar",
    "food truck"
  ]);
  return foodTerms.has(normalized);
}

function escapeText(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function renderConceptFit(data) {
  state.lastConceptFitResult = data;
  const concepts = Array.isArray(data.concepts) ? data.concepts : [];
  setStatusPill(
    elements.conceptSource,
    data.searchContext?.mode === "address-radius" ? `Competitive Signals · ${data.searchContext.radiusMiles} mi` : "Competitive Signals",
    data.fallback ? "Estimated" : "Available"
  );
  updatePanelTimestamp(".concept-fit-panel");

  if (!concepts.length) {
    state.lastConceptFitResult = null;
    elements.conceptFitList.innerHTML = `
      <article class="empty-places concept-fallback">
        <strong>Concept-specific market data is limited.</strong>
        <p>SpotVest used broader market and competition signals instead.</p>
      </article>
    `;
    return;
  }

  const selectedFoodBusiness = normalizeBusiness(state.business);
  const displayConcepts = concepts.slice().sort((a, b) => {
    if (a.key === selectedFoodBusiness) return -1;
    if (b.key === selectedFoodBusiness) return 1;
    return safeNumber(b.score, 0) - safeNumber(a.score, 0);
  });

  // The concept scan only fetches Google visibility for less-common cuisines,
  // so a common cuisine (e.g. pizza) can come back with no example names even
  // though the main search surfaced its competitors. Borrow the real nearby
  // matches for the cuisine the user actually searched so the two panels agree.
  const mainPlaceNames = (currentBusinessResult()?.googlePlaces?.topPlaces || [])
    .map((place) => place?.name)
    .filter((name) => typeof name === "string" && /[a-zA-Z]/.test(name));

  const searchedHasCompetitiveSet = hasCompetitiveSet(currentBusinessResult());

  elements.conceptFitList.innerHTML = displayConcepts.slice(0, 6).map((concept) => {
    const ownNames = (concept.topNames || []).filter(
      (n) => typeof n === "string" && /[a-zA-Z]/.test(n)
    );
    const isSelected = concept.key === selectedFoodBusiness;
    // Borrow the real nearby matches for the cuisine the user searched.
    let cleanNames = ownNames;
    if (isSelected && mainPlaceNames.length) cleanNames = ownNames.length ? ownNames : mainPlaceNames;

    // Post-processing competitor override: when adjacent operators are present
    // nearby, never present this concept as an open lane.
    let displayVerdict = concept.verdict;
    let displayTone = concept.tone;
    if (concept.tone === "good" && ((isSelected && searchedHasCompetitiveSet) || cleanNames.length > 2)) {
      displayVerdict = "Competitive Set Present";
      displayTone = "mixed";
    }

    const fallbackExamples = displayTone === "good"
      ? "Limited visible competitors here — validate positioning before committing."
      : "Multiple operators already active in this category nearby.";
    const topNames = cleanNames.length
      ? cleanNames.slice(0, 3).map(escapeText).join(", ")
      : fallbackExamples;
    return `
      <article class="concept-card concept-${displayTone}">
        <div>
          <span class="signal-label">${escapeText(displayVerdict)}</span>
          <h4>${escapeText(concept.label)}</h4>
          <p>${escapeText(displayVerdict || "Needs more data")} competitive intensity${safeNumber(concept.avgRating) > 0 ? ` · ${safeNumber(concept.avgRating).toFixed(1)} avg rating` : ""}</p>
          <small>Visible examples: ${topNames}</small>
        </div>
        <strong>${formatBadgeScore(concept.score)}</strong>
      </article>
    `;
  }).join("");

  // Concept intelligence updates this panel only; it should not mutate the
  // executive decision after the main report has already settled.
}

async function renderRestaurantConceptFit() {
  if (!isFoodBusiness(state.business)) {
    elements.conceptPanel.hidden = true;
    state.lastConceptFitResult = null;
    return;
  }

  elements.conceptPanel.hidden = false;
  const requestId = ++state.conceptRequestId;
  renderConceptLoading();

  const params = new URLSearchParams({ zip: state.zip, business: state.business });
  if (state.location) {
    params.set("lat", state.location.lat);
    params.set("lng", state.location.lng);
    params.set("radius", state.location.radiusMiles);
    params.set("address", state.location.address);
  }

  try {
    const data = await fetchJsonWithTimeout(`/api/restaurant-concepts?${params.toString()}`, {
      source: "food concept intelligence",
      timeoutMs: 26000,
      retries: 1
    });
    if (requestId !== state.conceptRequestId) return;
    renderConceptFit(data);
  } catch (error) {
    if (requestId !== state.conceptRequestId) return;
    logIntegrationError("food concept fallback", error, { zip: state.zip, business: state.business });
    state.lastConceptFitResult = null;
    elements.conceptSource.textContent = "Broader signals";
    elements.conceptFitList.innerHTML = `
      <article class="empty-places concept-fallback">
        <strong>Concept-specific market data is limited.</strong>
        <p>SpotVest used broader market and competition signals instead.</p>
      </article>
    `;
  }
}

function renderSiteIntelLoading() {
  setStatusPill(elements.siteIntelSource, state.location ? "Address + area signals" : "Area-level signals", "Refreshing");
  setLoadingText(elements.sidewalkLevel, "Refreshing");
  elements.sidewalkCopy.textContent = "Loading outdoor dining activity.";
  elements.sidewalkTypes.innerHTML = "";
  setLoadingText(elements.liquorLevel, "Refreshing");
  elements.liquorCopy.textContent = "Loading license activity.";
  elements.liquorTypes.innerHTML = "";
  state.location ? setLoadingText(elements.mtaLevel, "Refreshing") : elements.mtaLevel.textContent = "Needs address";
  elements.mtaCopy.textContent = state.location
    ? "Loading nearby mobility signal."
    : "Enter an exact address to calculate nearby mobility signal.";
  elements.mtaTypes.innerHTML = "";
  setLoadingText(elements.plutoLevel, "Refreshing");
  elements.plutoCopy.textContent = "Loading commercial mix.";
  elements.plutoTypes.innerHTML = "";
  updatePanelTimestamp(".site-intel-panel");
}

function numberLabel(value) {
  return formatInteger(value, "0");
}

function renderSiteIntelligence(data) {
  state.lastSiteIntelResult = data;
  setStatusPill(
    elements.siteIntelSource,
    data.searchContext?.mode === "address-radius" ? "Address radius + area" : "Area-level signals",
    data.fallback ? "Estimated" : "Available"
  );
  clearLoadingText(elements.sidewalkLevel, elements.liquorLevel, elements.mtaLevel, elements.plutoLevel);

  elements.sidewalkLevel.textContent = data.sidewalkCafe.active > 20 ? "Strong outdoor dining signal" : data.sidewalkCafe.active > 5 ? "Moderate outdoor dining signal" : "Limited outdoor dining signal";
  elements.sidewalkCopy.textContent =
    `Outdoor dining activity in ZIP ${data.zip}. Useful for restaurant fit, not a full restaurant count.`;
  elements.sidewalkTypes.innerHTML = miniList(
    data.sidewalkCafe.statusBreakdown.map((item) => ({ type: item.status, count: item.count }))
  );

  elements.liquorLevel.textContent = data.liquor.total > 80 ? "High license activity" : data.liquor.total > 25 ? "Moderate license activity" : "Limited license activity";
  elements.liquorCopy.textContent =
    `License activity ${data.liquor.scope}. Useful for restaurant/bar saturation and nightlife compatibility.`;
  elements.liquorTypes.innerHTML = miniList(data.liquor.topTypes);

  if (data.mta.available) {
    elements.mtaLevel.textContent = data.mta.totalDecember2024Ridership > 250000 ? "Strong mobility signal" : "Moderate mobility signal";
    elements.mtaCopy.textContent =
      `Nearby transit activity ${data.mta.scope}. A mobility signal that feeds the Foot Traffic Model.`;
    elements.mtaTypes.innerHTML = data.mta.topStations
      .slice(0, 4)
      .map((item) => `<span>${item.station}</span>`)
      .join("");
  } else {
    elements.mtaLevel.textContent = "Needs address";
    elements.mtaCopy.textContent = data.mta.scope;
    elements.mtaTypes.innerHTML = "<span>Use exact address search</span>";
  }

  elements.plutoLevel.textContent = data.pluto.retailArea > 500000 ? "Strong commercial base" : data.pluto.retailArea > 150000 ? "Moderate commercial base" : "Limited commercial base";
  const averageYearBuilt = data.pluto.averageYearBuilt >= 1800 ? data.pluto.averageYearBuilt : "n/a";
  elements.plutoCopy.textContent =
    `Commercial mix suggests ${data.pluto.retailArea > 150000 ? "meaningful" : "limited"} retail and service capacity; average building age signal ${averageYearBuilt}.`;
  elements.plutoTypes.innerHTML = miniList(data.pluto.landUseMix);
  updatePanelTimestamp(".site-intel-panel");

  const profile = profileForZip(state.zip);
  if (profile) renderFootTrafficIntelligence(profile);
}

function loadLeases() {
  try {
    const saved = localStorage.getItem(leaseStorageKey);
    if (saved) return JSON.parse(saved);
    const legacy = localStorage.getItem(legacyLeaseStorageKey);
    if (!legacy) return [];
    const leases = JSON.parse(legacy);
    localStorage.setItem(leaseStorageKey, JSON.stringify(leases));
    return leases;
  } catch {
    return [];
  }
}

function saveLeases() {
  localStorage.setItem(leaseStorageKey, JSON.stringify(state.leases));
}

function rentPerSfMonthly(lease) {
  const rent = safeNumber(lease.rent, 0);
  const sf = safeNumber(lease.sf, 0);
  return rent > 0 && sf > 0 ? rent / sf : null;
}

const leaseConceptModels = {
  retail: { label: "Retail", rentShare: [0.08, 0.12], buildoutPerSf: [60, 140], note: "Retail can usually tolerate a moderate rent share if frontage and visibility are strong." },
  cafe: { label: "Cafe", rentShare: [0.08, 0.12], buildoutPerSf: [120, 250], note: "Cafe economics depend heavily on morning flow, repeat customers, and labor control." },
  medical: { label: "Medical", rentShare: [0.07, 0.11], buildoutPerSf: [110, 240], note: "Medical users can pay for access and household income, but appointment demand must be proven." },
  office: { label: "Office", rentShare: [0.07, 0.1], buildoutPerSf: [50, 130], note: "Office fit depends more on layout, access, and operator credit than walk-in demand." },
  industrial: { label: "Industrial", rentShare: [0.05, 0.09], buildoutPerSf: [40, 120], note: "Industrial fit depends on loading, access, ceiling height, and logistics." },
  restaurant: { label: "Restaurant", rentShare: [0.06, 0.1], buildoutPerSf: [250, 550], note: "General restaurant economics need strong sales because kitchen buildout and labor are heavy." },
  "full-service": { label: "Full-service restaurant", rentShare: [0.06, 0.09], buildoutPerSf: [300, 650], note: "Full-service needs higher check average, staff discipline, liquor fit, and strong dinner/weekend demand." },
  italian: { label: "Italian restaurant", rentShare: [0.06, 0.09], buildoutPerSf: [280, 600], note: "Italian can work with strong dinner demand, delivery, and wine/liquor upside." },
  greek: { label: "Greek restaurant", rentShare: [0.065, 0.1], buildoutPerSf: [240, 520], note: "Greek works best with lunch/dinner repeat demand and clear differentiation from Mediterranean competitors." },
  mediterranean: { label: "Mediterranean / halal", rentShare: [0.07, 0.11], buildoutPerSf: [180, 420], note: "Mediterranean/halal can support fast-casual volume if lunch, delivery, and neighborhood repeat demand are strong." },
  japanese: { label: "Japanese / sushi", rentShare: [0.055, 0.085], buildoutPerSf: [320, 700], note: "Japanese/sushi usually needs premium spend, trust, freshness perception, and strong reviews." },
  chinese: { label: "Chinese restaurant", rentShare: [0.07, 0.11], buildoutPerSf: [180, 420], note: "Chinese concepts can work with delivery density, value positioning, and efficient kitchen throughput." },
  korean: { label: "Korean restaurant", rentShare: [0.06, 0.095], buildoutPerSf: [260, 620], note: "Korean concepts need a strong niche, group dining or fast-casual clarity, and ventilation diligence." },
  indian: { label: "Indian restaurant", rentShare: [0.065, 0.105], buildoutPerSf: [220, 500], note: "Indian works best with delivery demand, family/group spend, and clear cuisine gap." },
  mexican: { label: "Mexican restaurant", rentShare: [0.07, 0.11], buildoutPerSf: [170, 420], note: "Mexican can work with lunch volume, late-night demand, and strong price/value positioning." },
  pizza: { label: "Pizza / slice shop", rentShare: [0.08, 0.13], buildoutPerSf: [160, 380], note: "Pizza can tolerate higher rent only with strong slice volume, delivery, schools/offices, or late-night traffic." },
  "fast-casual": { label: "Fast casual", rentShare: [0.075, 0.12], buildoutPerSf: [180, 420], note: "Fast casual needs speed, lunch traffic, delivery, and repeat weekday demand." },
  "cafe-bakery": { label: "Cafe / bakery", rentShare: [0.075, 0.12], buildoutPerSf: [180, 450], note: "Cafe/bakery needs morning habits, visible frontage, and strong repeat neighborhood demand." }
};

function leaseConceptModel(lease) {
  const concept = String(lease.concept || "").toLowerCase();
  const use = String(lease.use || "").toLowerCase();
  if (concept && leaseConceptModels[concept]) return leaseConceptModels[concept];
  if (use.includes("restaurant")) return leaseConceptModels.restaurant;
  if (use.includes("cafe")) return leaseConceptModels.cafe;
  if (use.includes("medical")) return leaseConceptModels.medical;
  if (use.includes("office")) return leaseConceptModels.office;
  if (use.includes("industrial")) return leaseConceptModels.industrial;
  return leaseConceptModels.retail;
}

function leaseFitMath(lease, profile) {
  const rent = safeNumber(lease.rent, 0);
  const sf = safeNumber(lease.sf, 0);
  const sales = safeNumber(lease.sales, 0);
  const buildout = safeNumber(lease.buildout, 0);
  const model = leaseConceptModel(lease);
  const [targetLow, targetHigh] = model.rentShare;
  const neededSalesLow = rent > 0 ? Math.round(rent / targetHigh) : 0;
  const neededSalesHigh = rent > 0 ? Math.round(rent / targetLow) : 0;
  const salesRatio = sales > 0 && rent > 0 ? rent / sales : null;
  const perSfYear = rent > 0 && sf > 0 ? (rent * 12) / sf : null;
  const buildoutPerSf = buildout > 0 && sf > 0 ? buildout / sf : null;
  const buildoutHigh = buildoutPerSf !== null && buildoutPerSf > model.buildoutPerSf[1];
  const buildoutLow = buildoutPerSf !== null && buildoutPerSf < model.buildoutPerSf[0];

  let verdict = "Need sales estimate";
  let tone = "unknown";
  if (salesRatio !== null) {
    if (salesRatio <= targetLow) {
      verdict = "Strong cost fit";
      tone = "good";
    } else if (salesRatio <= targetHigh) {
      verdict = "Workable but tight";
      tone = "tight";
    } else {
      verdict = "Rent likely too high";
      tone = "risky";
    }
  } else if (profile.rent >= 84 || (perSfYear !== null && perSfYear >= 180)) {
    verdict = "Needs high sales";
    tone = "tight";
  }

  const buildoutNote = buildoutPerSf === null
    ? "Buildout not entered"
    : buildoutHigh
      ? "Buildout looks heavy for this concept"
      : buildoutLow
        ? "Buildout budget may be light"
        : "Buildout is within a normal planning range";

  return {
    model,
    rent,
    sf,
    perSfYear,
    sales,
    salesRatio,
    neededSalesLow,
    neededSalesHigh,
    buildoutPerSf,
    buildoutNote,
    verdict,
    tone
  };
}

function rentPressureForLease(lease, profile) {
  const perSf = rentPerSfMonthly(lease);
  if (perSf === null) return "Rent: Needs Validation";
  if (perSf >= 18 || profile.rent >= 84) return "High rent pressure";
  if (perSf >= 10 || profile.rent >= 68) return "Moderate rent pressure";
  return "Manageable rent";
}

function leaseFitLabel(lease, profile) {
  const math = leaseFitMath(lease, profile);
  if (math.salesRatio !== null) return math.verdict;
  const rentPressure = rentPressureForLease(lease, profile);
  const frontage = Number(lease.frontage || 0);
  const use = String(lease.use || "").toLowerCase();

  if (rentPressure === "High rent pressure" && profile.income < 70) return "Risky economics";
  if (use.includes("restaurant") && profile.nightlife >= 60 && frontage >= 15) return "Good restaurant candidate";
  if (use.includes("cafe") && profile.transit >= 70 && profile.density >= 65) return "Good cafe candidate";
  if (frontage >= 20 && profile.transit >= 70) return "Strong visibility";
  if (rentPressure === "Manageable rent") return "Worth touring";
  return "Needs diligence";
}

function listingSearchText() {
  if (state.location?.address) return `${state.location.address} retail storefront availability`;
  return `retail storefront availability ${state.zip} NYC`;
}

function quickSearchUrl(source, zip) {
  const query = encodeURIComponent(listingSearchText());
  const platformQuery = (site, extra = "") => `https://www.google.com/search?q=${encodeURIComponent(`site:${site} ${listingSearchText()} ${extra}`.trim())}`;
  const urls = {
    loopnet: platformQuery("loopnet.com", "retail availability"),
    commercialCafe: platformQuery("commercialcafe.com", "retail availability"),
    storefront: platformQuery("thestorefront.com", "retail pop up space"),
    crexi: platformQuery("crexi.com", "commercial retail availability"),
    craigslist: `https://newyork.craigslist.org/search/off?query=${query}`,
    google: `https://www.google.com/search?q=${query}`
  };
  return urls[source];
}

function renderLeaseSearchLinks() {
  // Each card runs an external web search on a named platform and opens in a
  // new tab. Labels name the source so nothing looks like an in-app feature.
  const links = [
    ["LoopNet", "Commercial listings", quickSearchUrl("loopnet", state.zip)],
    ["CommercialCafe", "Retail availability", quickSearchUrl("commercialCafe", state.zip)],
    ["Storefront", "Pop-up / flexible space", quickSearchUrl("storefront", state.zip)],
    ["Crexi", "Commercial inventory", quickSearchUrl("crexi", state.zip)],
    ["Craigslist", "Local owner posts", quickSearchUrl("craigslist", state.zip)],
    ["Web search", "Broad public listings", quickSearchUrl("google", state.zip)]
  ];

  elements.listingSearchContext.textContent = state.location?.address
    ? `Address search · ${state.location.radiusMiles} mi`
    : `ZIP ${state.zip}`;
  elements.leaseSearchLinks.innerHTML = links
    .map(([label, copy, href]) => `
      <a href="${href}" target="_blank" rel="noopener noreferrer">
        <strong>${escapeText(label)} <span class="ext-mark" aria-hidden="true">↗</span></strong>
        <span>${escapeText(copy)} — external search</span>
      </a>
    `)
    .join("");
}

function listingSearchPayload() {
  return {
    zip: state.zip,
    address: state.location?.address || "",
    radiusMiles: state.location?.radiusMiles || "",
    business: state.business || "retail"
  };
}

function renderListingResults(result) {
  const listings = Array.isArray(result?.listings) ? result.listings : [];
  if (!listings.length) {
    elements.listingResults.innerHTML = `
      <article class="empty-places">
        <strong>No listing links returned yet</strong>
        <p>${result?.note || "Try the manual platform fallback or a nearby ZIP."}</p>
      </article>
    `;
    return;
  }

  elements.listingResults.innerHTML = listings
    .map((listing, index) => {
      const title = listing.title || "Listing source";
      const source = listing.source || "Web result";
      const url = listing.url || "#";
      const snippet = listing.snippet || "Open this source and confirm cost, size, and availability with the listing contact.";
      return `
        <article class="listing-result-card">
          <div>
            <span class="signal-label">${source}</span>
            <h4>${title}</h4>
            <p>${snippet}</p>
          </div>
          <div class="lease-actions">
            <a href="${url}" target="_blank" rel="noreferrer">Open source</a>
            <button type="button" data-listing-result="${index}">Use in calculator</button>
          </div>
        </article>
      `;
    })
    .join("");
  elements.listingResults.dataset.results = JSON.stringify(listings);
}

async function findAvailableSpaces() {
  if (!state.zip) {
    elements.message.textContent = "Enter a ZIP code before searching listings.";
    return;
  }

  elements.listingFinderButton.disabled = true;
  elements.listingFinderButton.textContent = "Searching...";
  elements.listingResults.innerHTML = `
    <article class="empty-places">
      <strong>Searching public listing sources</strong>
      <p>SpotVest is checking public web results and will show source links here.</p>
    </article>
  `;

  try {
    const response = await fetch("/api/listing-finder", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(listingSearchPayload())
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || "Listing search failed");
    renderListingResults(result);
  } catch (error) {
    renderListingResults({
      listings: [],
      note: `${error.message}. Use the manual platform fallback, then save the best listing into the calculator.`
    });
  } finally {
    elements.listingFinderButton.disabled = false;
  elements.listingFinderButton.textContent = "Find available locations";
  }
}

function renderLeases() {
  const profile = profileForZip(state.zip);
  const leases = state.leases.filter((lease) => lease.zip === state.zip);
  renderLeaseSearchLinks();

  if (!leases.length) {
    elements.leaseList.innerHTML = `
      <article class="empty-places">
        <strong>No saved locations for ZIP ${state.zip} yet</strong>
        <p>Add a listing manually, or use the quick links to search public listing sites.</p>
      </article>
    `;
    return;
  }

  elements.leaseList.innerHTML = leases
    .map((lease) => {
      const perSf = rentPerSfMonthly(lease);
      const fit = leaseFitLabel(lease, profile);
      const math = leaseFitMath(lease, profile);
      const rent = safeNumber(lease.rent, 0);
      const sf = safeNumber(lease.sf, 0);
      const link = lease.link
        ? `<a href="${lease.link}" target="_blank" rel="noreferrer">Open source</a>`
        : "";
      const neededSales = safeNumber(math.neededSalesLow) !== null && safeNumber(math.neededSalesHigh) !== null
        ? `${moneyRange(math.neededSalesLow, math.neededSalesHigh)}/mo`
        : "Enter rent";
      const ratioValue = safeNumber(math.salesRatio);
      const ratio = ratioValue !== null ? `${Math.round(ratioValue * 100)}% of sales` : "Add sales estimate";
      const perSfYear = safeNumber(math.perSfYear) !== null ? `${formatCurrency(math.perSfYear)}/SF/yr` : "No rent/SF";
      const conceptLabel = math.model.label;
      return `
        <article class="lease-card lease-fit-${math.tone}">
          <div>
            <h4>${lease.address}</h4>
            <p>${lease.use}${lease.concept ? ` · ${conceptLabel}` : ""} · ${sf ? `${formatInteger(sf)} SF` : "SF: Needs Validation"} · ${rent ? `${formatCurrency(rent)}/mo` : "Cost: Needs Validation"}</p>
            <div class="lease-fit-grid">
              <span><strong>${fit}</strong><small>Cost fit</small></span>
              <span><strong>${neededSales}</strong><small>Sales needed</small></span>
              <span><strong>${ratio}</strong><small>Cost-to-sales</small></span>
              <span><strong>${perSfYear}</strong><small>Annual cost/SF</small></span>
            </div>
            <div class="place-meta">
              <span>${rentPressureForLease(lease, profile)}</span>
              <span>${safeNumber(perSf) !== null ? `$${safeNumber(perSf).toFixed(2)}/SF/mo` : "No rent/SF"}</span>
              <span>${math.buildoutNote}</span>
            </div>
            <small>${math.model.note} ${lease.notes || ""}</small>
          </div>
          <div class="lease-actions">
            ${link}
            <button type="button" data-lease-id="${lease.id}">Delete</button>
          </div>
        </article>
      `;
    })
    .join("");
}

function parseCsvLine(line) {
  const values = [];
  let current = "";
  let quoted = false;

  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];
    const next = line[index + 1];

    if (char === "\"" && quoted && next === "\"") {
      current += "\"";
      index += 1;
    } else if (char === "\"") {
      quoted = !quoted;
    } else if (char === "," && !quoted) {
      values.push(current.trim());
      current = "";
    } else {
      current += char;
    }
  }

  values.push(current.trim());
  return values;
}

function normalizeHeader(header) {
  return String(header || "").trim().toLowerCase().replace(/[^a-z0-9]+/g, "");
}

function leaseFromCsvRow(headers, row) {
  const data = Object.fromEntries(headers.map((header, index) => [normalizeHeader(header), row[index] || ""]));
  const address = data.address || data.listingaddress || data.propertyaddress || data.streetaddress;
  if (!address) return null;

  return {
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    zip: data.zip || data.zipcode || state.zip,
    address,
    rent: Number(String(data.rent || data.monthlyrent || data.askingrent || "").replace(/[^0-9.]/g, "")) || 0,
    sf: Number(String(data.sf || data.sqft || data.squarefeet || data.size || "").replace(/[^0-9.]/g, "")) || 0,
    use: data.use || data.type || data.propertytype || "Retail",
    concept: data.concept || data.restaurantconcept || data.cuisine || "",
    sales: Number(String(data.sales || data.monthlysales || data.expectedsales || "").replace(/[^0-9.]/g, "")) || 0,
    buildout: Number(String(data.buildout || data.buildoutbudget || data.construction || "").replace(/[^0-9.]/g, "")) || 0,
    frontage: Number(String(data.frontage || data.frontageft || "").replace(/[^0-9.]/g, "")) || 0,
    link: data.link || data.url || data.listinglink || "",
    notes: data.notes || data.description || "",
    lat: Number(data.lat || data.latitude || "") || null,
    lng: Number(data.lng || data.longitude || data.lon || "") || null,
    createdAt: new Date().toISOString()
  };
}

async function geocodeLeaseIfNeeded(lease) {
  if (lease.lat && lease.lng) return lease;

  try {
    const response = await fetch(`/api/geocode?address=${encodeURIComponent(`${lease.address}, ${lease.zip}, New York, NY`)}`);
    if (!response.ok) return lease;
    const result = await response.json();
    return {
      ...lease,
      lat: result.lat,
      lng: result.lng,
      address: result.address || lease.address,
      zip: result.zip || lease.zip
    };
  } catch {
    return lease;
  }
}

async function importLeaseCsv(file) {
  const text = await file.text();
  const lines = text.split(/\r?\n/).filter((line) => line.trim());
  if (lines.length < 2) return 0;

  const headers = parseCsvLine(lines[0]);
  const leases = lines
    .slice(1)
    .map((line) => leaseFromCsvRow(headers, parseCsvLine(line)))
    .filter(Boolean);
  const resolvedLeases = await Promise.all(leases.map((lease) => geocodeLeaseIfNeeded(lease)));

  state.leases = [...resolvedLeases, ...state.leases];
  saveLeases();
  renderLeases();
  renderMarketMap();
  return resolvedLeases.length;
}

async function renderSiteIntelCheck() {
  const requestId = ++state.siteIntelRequestId;
  renderSiteIntelLoading();

  const params = new URLSearchParams({ zip: state.zip });
  if (state.location) {
    params.set("lat", state.location.lat);
    params.set("lng", state.location.lng);
    params.set("radius", state.location.radiusMiles);
    params.set("address", state.location.address);
  }

  try {
    const data = await fetchJsonWithTimeout(`/api/site-intelligence?${params.toString()}`, {
      source: "mobility and commercial mix",
      timeoutMs: 26000,
      retries: 1
    });
    if (requestId !== state.siteIntelRequestId) return;
    renderSiteIntelligence(data);
  } catch (error) {
    if (requestId !== state.siteIntelRequestId) return;
    logIntegrationError("mobility and commercial fallback", error, { zip: state.zip });
    // Keep the last confirmed site/mobility signal rather than a neutral fallback.
    if (state.lastSiteIntelResult && contextMatches(state.lastSiteIntelResult) && !state.lastSiteIntelResult.fallback) return;
    renderSiteIntelligence(fallbackSiteIntelligence());
    elements.sidewalkLevel.textContent = "Estimated outdoor activity";
    elements.sidewalkCopy.textContent = "Outdoor activity did not return in time. SpotVest is using a neutral fallback until retry.";
    elements.liquorLevel.textContent = "Estimated license activity";
    elements.liquorCopy.textContent = "License activity did not return in time. SpotVest is using a neutral fallback until retry.";
    elements.mtaLevel.textContent = state.location ? "Estimated mobility signal" : "Needs address";
    elements.mtaCopy.textContent = state.location
      ? "Mobility signal did not return in time. SpotVest is using a neutral fallback until retry."
      : "Enter an exact address to calculate nearby mobility signal.";
    elements.plutoLevel.textContent = "Estimated commercial mix";
    elements.plutoCopy.textContent = "Commercial mix did not return in time. SpotVest is using a neutral fallback until retry.";
  }
}

// Centralized competitor evaluation: how many direct/adjacent operators are
// visible nearby. Used to override "open lane" language everywhere.
function competitiveSetSize(result) {
  const r = result || currentBusinessResult();
  if (!r) return 0;
  return Math.max(
    safeNumber(r?.googlePlaces?.topPlaces?.length, 0),
    safeNumber(r?.googleVisibleCount, 0),
    safeNumber(r?.count, 0)
  );
}
function hasCompetitiveSet(result) {
  return competitiveSetSize(result) > 2;
}

function currentBusinessResult() {
  if (!state.lastBusinessResult) return null;
  if (state.lastBusinessResult.zip !== state.zip) return null;
  if (state.lastBusinessResult.business !== normalizeBusiness(state.business)) return null;
  const currentLocationKey = state.location ? `${state.location.lat},${state.location.lng},${state.location.radiusMiles}` : "zip";
  const resultLocation = state.lastBusinessResult.searchContext;
  const resultLocationKey = resultLocation?.mode === "address-radius"
    ? `${resultLocation.lat},${resultLocation.lng},${resultLocation.radiusMiles}`
    : "zip";
  if (currentLocationKey !== resultLocationKey) return null;
  return state.lastBusinessResult;
}

function contextMatches(result) {
  if (!result || result.zip !== state.zip) return false;
  const currentMode = state.location ? "address-radius" : "zip";
  if ((result.searchContext?.mode || "zip") !== currentMode) return false;
  if (!state.location) return true;
  return String(result.searchContext?.radiusMiles) === String(state.location.radiusMiles);
}

function currentCivicResult() {
  return contextMatches(state.lastCivicResult) ? state.lastCivicResult : null;
}

function currentSiteIntelResult() {
  return contextMatches(state.lastSiteIntelResult) ? state.lastSiteIntelResult : null;
}

function currentConceptFitResult() {
  return contextMatches(state.lastConceptFitResult) ? state.lastConceptFitResult : null;
}

// ---- Deterministic scoring --------------------------------------------------
// The score is a pure function of the resolved signal set. Do not persist this
// signal bundle in browser localStorage: each device has its own storage, which
// made the same address/business score differently on phone vs desktop.
const SIGNAL_CACHE_TTL_MS = 0;
function signalCacheKey() {
  return `sigbundle:${state.zip}|${normalizeBusiness(state.business)}|${state.location?.lat || ""}|${state.location?.lng || ""}|${state.location?.radiusMiles || ""}`;
}
// A signal is "real" (cacheable) when it matches the current location AND is not
// a transient fallback. Business is real only with a live registry/Places match.
function sigReal(r, isBusiness) {
  if (!r || !contextMatches(r)) return false;
  return isBusiness ? Boolean(r.registryExact) : !r.fallback;
}
function readSignalBundleRaw() {
  return null;
}
// Accumulate the best (real) value for EACH signal independently, merging with
// what's already cached — so a signal we obtained earlier is never lost just
// because a different signal (or a later run) flapped.
function persistSignalBundle() {
  clearLegacySignalBundleCache();
}
// For any signal that is currently missing OR a transient fallback, substitute
// the cached real value. This is what makes a flapping/timed-out fetch unable to
// change the score: once a signal has been obtained for a location, it sticks.
function reconcileSignalsFromCache() {
  clearLegacySignalBundleCache();
}
function hydrateSignalBundle() {
  clearLegacySignalBundleCache();
}
function clearLegacySignalBundleCache() {
  try {
    const keys = [];
    for (let i = 0; i < localStorage.length; i += 1) keys.push(localStorage.key(i));
    keys.filter(Boolean).forEach((key) => {
      if (key.startsWith("sigbundle:")) localStorage.removeItem(key);
    });
  } catch (e) { /* storage unavailable — non-fatal */ }
}
// Required score-moving signals are "real" when they're live responses (not a
// transient timeout fallback) for the current location. A genuine empty
// response counts as real (fallback flag is false) — only fetch failures retry.
function requiredSignalsReal() {
  const b = state.lastBusinessResult, c = state.lastCivicResult, s = state.lastSiteIntelResult;
  // Demographics: the score is only real when live Census is loaded for this ZIP
  // (profileForZip otherwise falls back to a static profile whose density swings
  // the competition score). Census is required too.
  const demoReal = Boolean(state.liveProfiles[state.zip]);
  return Boolean(
    demoReal &&
    b && contextMatches(b) && !b.fallback && !b.loading &&
    c && contextMatches(c) && !c.fallback &&
    s && contextMatches(s) && !s.fallback &&
    // PLUTO summary feeds the score (propertyBoost/commercial mix). If it failed,
    // retailArea is null — don't score on a missing signal; require it real.
    s.pluto && s.pluto.summaryAvailable !== false
  );
}
// Close the cold-start gap: don't commit/show the score until every required
// signal has actually arrived. Retry loaders (the server caches a slow first
// fetch, so a later attempt succeeds) within a time budget, then render once.
// Result: a brand-new address scores the same on run 1 as run 2.
// ---- Better Alternatives: ONE source of truth ----------------------------
// Alternatives are scored with the SAME engine as the main report
// (buildInstitutionalAnalysis → successProbability), using each candidate's own
// live competition — so an alternative's shown score equals what the user gets
// running that business directly, and "stronger" means a genuinely higher score.
const altCompCache = new Map();
async function candidateCompetition(business) {
  const key = `${state.zip}|${normalizeBusiness(business)}|${state.location?.lat || ""}|${state.location?.lng || ""}|${state.location?.radiusMiles || ""}`;
  if (altCompCache.has(key)) return altCompCache.get(key);
  let res = null;
  try {
    const params = new URLSearchParams({ zip: state.zip, business });
    if (state.location) {
      params.set("lat", state.location.lat); params.set("lng", state.location.lng);
      params.set("radius", state.location.radiusMiles); params.set("address", state.location.address);
    }
    const r = await fetchJsonWithTimeout(`/api/business-count?${params.toString()}`, { source: "alternative competition", timeoutMs: 26000, retries: 1 });
    if (r && typeof r.count === "number") res = r;
  } catch (e) { res = null; }
  altCompCache.set(key, res);
  return res;
}
// Run the real engine for a hypothetical business at the current location.
// Synchronous swap of the business inputs (civic/site/demographics are
// location-level and reused); restores globals immediately. No await inside.
function successScoreForBusinessHere(business, businessResult, profile) {
  const savedBiz = state.business, savedBr = state.lastBusinessResult;
  try {
    state.business = business;
    state.lastBusinessResult = businessResult;
    const a = buildInstitutionalAnalysis(profile, buildRecommendations(profile));
    return clampScore(a.successProbability);
  } finally {
    state.business = savedBiz;
    state.lastBusinessResult = savedBr;
  }
}
async function computeRealAlternatives(profile, currentScore) {
  const cur = normalizeBusiness(state.business);
  // Exclude the current business by BOTH model id and display name (they can
  // normalize differently), and de-duplicate candidates by name.
  const seen = new Set([cur]);
  const cands = buildRecommendations(profile).filter((r) => {
    const byId = normalizeBusiness(r.business), byName = normalizeBusiness(r.name);
    if (byId === cur || byName === cur || seen.has(byName)) return false;
    seen.add(byName);
    return true;
  }).slice(0, 6);
  const scored = await Promise.all(cands.map(async (c) => {
    const br = await candidateCompetition(c.name);
    return { name: c.name, note: c.note || "", score: successScoreForBusinessHere(c.name, br, profile) };
  }));
  // Only genuinely-stronger options (real score strictly higher), best first.
  return scored.filter((x) => x.score > currentScore).sort((a, b) => b.score - a.score).slice(0, 5);
}

async function commitScoreWhenReady(zip) {
  // Budget covers a slow cache-bypassed fetch (refresh re-pulls take ~22-26s).
  const deadline = Date.now() + (state.forceRefresh ? 38000 : 30000);
  const notReal = (r, isBiz) => !(r && contextMatches(r) && !r.fallback && (!isBiz || !r.loading));
  const resolved = (r) => Boolean(r && contextMatches(r)); // returned at all (real OR fallback)
  // Concept-fit doesn't gate the score (it's flavor) — fire once.
  safeUiUpdate("concept signal loader", () => renderRestaurantConceptFit());
  let round = 0;
  for (;;) {
    reconcileSignalsFromCache();
    const jobs = [];
    if (!state.liveProfiles[state.zip]) jobs.push(safeUiUpdate("demographics loader", () => renderLiveAreaReport(state.zip)));
    if (notReal(state.lastBusinessResult, true)) jobs.push(safeUiUpdate("business signal loader", () => renderBusinessCheck()));
    if (notReal(state.lastCivicResult)) jobs.push(safeUiUpdate("risk signal loader", () => renderCivicCheck()));
    if (notReal(state.lastSiteIntelResult)) jobs.push(safeUiUpdate("site signal loader", () => renderSiteIntelCheck()));
    if (!jobs.length) break; // all required signals are real
    round++;
    // HARD cap: race the loaders against the remaining budget so a signal that
    // never settles (hung fetch) can't freeze the loading screen.
    const remaining = Math.max(0, deadline - Date.now());
    await Promise.race([
      Promise.allSettled(jobs.filter((p) => p && typeof p.then === "function")),
      new Promise((r) => setTimeout(r, remaining))
    ]);
    if (state.zip !== zip) return; // superseded by a newer analysis
    persistSignalBundle();
    // Wait for the REAL signals before committing, so the first analysis uses
    // complete data (no early 56-then-46). The server now locks each location's
    // signals for 7 days, so after the first fetch this resolves instantly and
    // identically for every device/session. Hard 12s cap prevents any hang.
    if (requiredSignalsReal() || Date.now() >= deadline) break;
    await new Promise((r) => setTimeout(r, 900)); // brief pause; lets the server cache warm
  }
  if (state.zip !== zip) return;
  persistSignalBundle();
  // HARD RULE: never commit a score built on fallback/guessed data. If the real
  // Competition + Risk + Site signals didn't all arrive, show "data unavailable"
  // instead of a number — a missing signal must never set or flip the verdict.
  if (!requiredSignalsReal()) {
    state.scoreReady = false;
    state.scoreUnavailable = true;
    const recs = buildRecommendations(profileForZip(state.zip));
    safeUiUpdate("score withheld (data unavailable)", () => renderInstitutionalAnalysis(profileForZip(state.zip), recs));
    updateActionGuards();
    return;
  }
  state.scoreUnavailable = false;
  state.scoreReady = true;
  const recs = buildRecommendations(profileForZip(state.zip));
  safeUiUpdate("final score (settled)", () => renderInstitutionalAnalysis(profileForZip(state.zip), recs));
  updateActionGuards();
  // Better Alternatives are scored with the same engine in the BACKGROUND and
  // patched in when ready, so they never delay the headline score.
  computeAlternativesInBackground(zip);
}

async function computeAlternativesInBackground(zip) {
  try {
    const profile = profileForZip(state.zip);
    const mainAnalysis = buildInstitutionalAnalysis(profile, buildRecommendations(profile));
    const alts = await computeRealAlternatives(profile, clampScore(mainAnalysis.successProbability));
    if (state.zip !== zip || !state.scoreReady) return; // superseded — discard stale work
    state.realAlternatives = alts;
    safeUiUpdate("alternatives (settled)", () => renderInstitutionalAnalysis(profileForZip(state.zip), buildRecommendations(profileForZip(state.zip))));
  } catch (e) { /* leave alternatives as-is; never blocks the score */ }
}

function decisionCopyFor(decision, successProbability, confidenceScore, riskScore) {
  if (decision === "OPEN") {
    return "Strong customer fit and healthy demand support opening, subject to normal site diligence.";
  }
  if (decision === "NEEDS MORE DATA") {
    return "SpotVest needs stronger location and market evidence before making a reliable recommendation.";
  }
  if (decision === "DO NOT OPEN") {
    return riskScore < 35
      ? "Current market conditions show severe risk signals for this business."
      : "Current market conditions appear unfavorable for this business.";
  }
  if (confidenceScore < 70) {
    return `Opportunity exists, but confidence is ${formatScore(confidenceScore)}. More proof is needed before a yes.`;
  }
  return `Evidence is strong enough to screen this as conditional: ${formatScore(successProbability)} viability score, with conditions that must be met before opening.`;
}

function decisionFor(profile, recommendations, businessResult) {
  const analysis = buildInstitutionalAnalysis(profile, recommendations);
  const financial = analysis.scores.find((item) => item.name === "Financial viability")?.value || 50;
  const risk = analysis.scores.find((item) => item.name === "Risk")?.value || 50;

  if (analysis.decision === "OPEN") {
    return {
      answer: "OPEN",
      copy: decisionCopyFor(analysis.decision, analysis.successProbability, analysis.confidenceScore, risk),
      next: "Verify economics",
      nextCopy: "Ask for location cost, frontage, commitment terms, buildout cost, and expected monthly sales before final advice."
    };
  }

  if (analysis.decision === "NEEDS MORE DATA") {
    return {
      answer: "NEEDS MORE DATA",
      copy: decisionCopyFor(analysis.decision, analysis.successProbability, analysis.confidenceScore, risk),
      next: "Load more evidence",
      nextCopy: "Use an exact address, check the business category, and verify location economics before advising a client."
    };
  }

  if (analysis.decision === "DO NOT OPEN") {
    return {
      answer: "DO NOT OPEN",
      copy: decisionCopyFor(analysis.decision, analysis.successProbability, analysis.confidenceScore, risk),
      next: "Find a better fit",
      nextCopy: "Look for stronger demand, lower cost pressure, or a clearer gap in competition."
    };
  }

  if (analysis.decision === "CONDITIONAL") {
    return {
      answer: "CONDITIONAL",
      copy: decisionCopyFor(analysis.decision, analysis.successProbability, analysis.confidenceScore, risk),
      next: "Verify conditions",
      nextCopy: "Confirm max rent, minimum revenue, exact block visibility, and operator strength."
    };
  }

  return {
    answer: "NEEDS MORE DATA",
    copy: "SpotVest needs stronger market evidence before making a recommendation.",
    next: "Load more evidence",
    nextCopy: "Use an exact address, check the business category, and verify location economics before advising a client."
  };
}

function confidenceFor(zip, businessResult) {
  const liveProfile = Boolean(state.liveProfiles[zip]);
  const liveBusiness = Boolean(businessResult?.registryExact);
  const google = Boolean(businessResult?.googlePlaces);
  const demand = Boolean(businessResult?.demandMomentum?.available);
  const sourceCount = [liveProfile, liveBusiness, google, demand].filter(Boolean).length;

  if (sourceCount >= 3) {
    return {
      label: "Strong",
      copy: "Confidence = how much of this report is backed by live data, not the odds of success. Here it is high: demographics, local activity, competitive visibility, and demand momentum are connected where available."
    };
  }

  if (sourceCount === 2) {
    return {
      label: "Good",
      copy: "Confidence = live-data coverage, not the odds of success. Two market signal groups are connected; treat remaining modeled scores as directional."
    };
  }

  if (sourceCount === 1) {
    return {
      label: "Directional",
      copy: "Confidence = live-data coverage, not the odds of success. Only part of the report is live — use this as a first screen, not final client advice."
    };
  }

  return {
    label: "Modeled",
    copy: "Confidence = live-data coverage, not the odds of success. Signals are still loading or unavailable; do not present this as verified research yet."
  };
}

function scoreQualityLabel(value) {
  const score = safeNumber(value, 0);
  if (score >= 85) return "HIGH";
  if (score >= 70) return "MEDIUM";
  return "LOW";
}

function safeNumber(value, fallback = null) {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
}

function formatInteger(value, fallback = "Needs Validation") {
  const number = safeNumber(value);
  return number === null ? fallback : Math.round(number).toLocaleString();
}

function formatCurrency(value, fallback = "Needs Validation") {
  const number = safeNumber(value);
  return number === null ? fallback : `$${Math.round(number).toLocaleString()}`;
}

function formatScore(value, fallback = "Needs more data") {
  const number = safeNumber(value);
  return number === null ? fallback : `${clampScore(number)}/100`;
}

function formatBadgeScore(value, fallback = "Needs more data") {
  const number = safeNumber(value);
  return number === null ? fallback : String(clampScore(number));
}

function moneyRange(low, high) {
  const lowValue = safeNumber(low);
  const highValue = safeNumber(high);
  if (lowValue === null || highValue === null) return "Needs Validation";
  return `${formatCurrency(lowValue)}-${formatCurrency(Math.max(lowValue, highValue))}`;
}

function monthlyRange(low, high, suffix = "estimated factor") {
  const range = moneyRange(low, high);
  return range === "Needs Validation" ? "Needs Validation" : `${range}/mo ${suffix}`;
}

function clampScore(value) {
  const number = safeNumber(value, 50);
  return Math.max(0, Math.min(100, Math.round(number)));
}

function weightedBusinessScore(scoreValue) {
  return scoreValue("Demand") * businessSuccessWeights.demand +
    scoreValue("Customer fit") * businessSuccessWeights.customerFit +
    scoreValue("Competition") * businessSuccessWeights.competition +
    scoreValue("Financial viability") * businessSuccessWeights.financial +
    scoreValue("Location quality") * businessSuccessWeights.location +
    scoreValue("Area momentum") * businessSuccessWeights.growth +
    scoreValue("Risk") * businessSuccessWeights.risk;
}

function calibratedDecisionScore({ weightedScore, scoreValue, confidenceScore, successModel, civicResult }) {
  const demand = scoreValue("Demand");
  const customerFit = scoreValue("Customer fit");
  const competition = scoreValue("Competition");
  const financial = scoreValue("Financial viability");
  const location = scoreValue("Location quality");
  const growth = scoreValue("Area momentum");
  const risk = scoreValue("Risk");
  const weakSignals = [demand, customerFit, competition, financial, location, growth, risk].filter((value) => value < 45).length;
  const strongSignals = [demand, customerFit, competition, financial, location, growth, risk].filter((value) => value >= 72).length;

  let adjustment = 0;
  if (competition < 28) adjustment -= 12;
  else if (competition < 42) adjustment -= 7;
  if (financial < 35) adjustment -= 10;
  else if (financial < 48) adjustment -= 5;
  if (risk < 30) adjustment -= 12;
  else if (risk < 45) adjustment -= 6;
  if (demand < 42) adjustment -= 8;
  if (customerFit < 42) adjustment -= 6;
  if (civicResult?.complaints?.level === "High") adjustment -= 5;
  if (successModel?.competitionPressure >= 90) adjustment -= 6;
  if (weakSignals >= 3) adjustment -= 5;

  if (demand >= 76 && location >= 72) adjustment += 5;
  if (competition >= 64 && financial >= 62) adjustment += 5;
  if (risk >= 68 && strongSignals >= 3) adjustment += 4;
  if (confidenceScore < 55) adjustment -= 4;

  const expanded = 50 + (safeNumber(weightedScore, 50) - 50) * 1.42;
  return clampScore(expanded + adjustment);
}

function categoryFitForBusiness(business, profile) {
  const direct = categoryModels.find((item) => item.business === business);
  if (direct) return scoreCategory(profile, direct);
  const config = modeledBusinessConfig(business);
  return clampScore(config.baseDemand * 0.38 + profile.density * 0.18 + profile.transit * 0.14 + profile.localPreference * 0.14 + profile.income * 0.1 + (100 - profile.rent) * 0.06);
}

function competitionCondition(score) {
  if (score >= 72) return "underserved";
  if (score >= 48) return "balanced";
  return "oversupplied";
}

function updateBudgetFromInput() {
  state.budget = Math.max(0, Number(elements.budgetInput?.value || 0));
}

function budgetSupportScore(config) {
  if (!state.budget) return 50;
  const requiredCapital = 70000 + config.rentSensitivity * 1800 + config.operatingDifficulty * 900;
  return clampScore(35 + Math.min(1.2, state.budget / requiredCapital) * 55);
}

function buildBusinessSuccessModel(profile, recommendations) {
  const businessResult = currentBusinessResult();
  const civicResult = currentCivicResult();
  const siteIntelResult = currentSiteIntelResult();
  const business = normalizeBusiness(state.business);
  const config = modeledBusinessConfig(business);
  const competitionPressure = businessResult?.registryExact
    ? saturationFromCount(businessResult.count, profile)
    : profile.competition;
  const googleReviews = Number(businessResult?.googlePlaces?.reviewCount || 0);
  const googleRating = Number(businessResult?.googlePlaces?.avgRating || 0);
  const demandSignalLabel = demandMomentumLabel(businessResult); // display only
  const reviewMomentum = businessResult?.googlePlaces
    ? clampScore(Math.min(100, Math.log10(googleReviews + 1) * 24 + googleRating * 7))
    : 45;
  const categoryFit = categoryFitForBusiness(business, profile);
  // Missing civic/risk data should reduce confidence, not collapse every score
  // into the same high-risk bucket. Treat unknown as a mild/moderate penalty:
  // conservative enough to avoid optimism, but not so harsh that a timeout makes
  // unrelated businesses and neighborhoods all screen as 46 / high risk.
  const civicUnknown = !civicResult || civicResult.fallback;
  const civicPenalty = civicResult?.complaints?.level === "High" ? 9
    : civicResult?.complaints?.level === "Moderate" ? 4
    : civicUnknown ? 3
    : 0;
  const permitBoost = civicResult?.permits?.level === "Heavy" ? 10 : civicResult?.permits?.level === "Active" ? 6 : 2;
  const propertyBoost = siteIntelResult?.pluto?.retailArea > 500000 ? 6 : siteIntelResult?.pluto?.retailArea > 150000 ? 3 : 0;
  const transitBoost = siteIntelResult?.mta?.available && siteIntelResult.mta.totalDecember2024Ridership > 250000 ? 8 : 0;
  const budgetSupport = budgetSupportScore(config);
  // Google Trends "demand momentum" was a 0.10-weight input but is too flaky
  // (3.5s timeout, in-memory day-cache lost on cold starts) to be deterministic,
  // so it's removed from the SCORE (kept as a display-only signal) and the
  // remaining demand weights are renormalized (÷0.90) to preserve scale. This
  // removes the 39↔45 non-determinism on the same address.
  const demandScore = clampScore((profile.density * 0.18 + profile.transit * 0.14 + profile.office * 0.09 + profile.nightlife * 0.07 + profile.tourist * 0.05 + profile.student * 0.05 + config.baseDemand * 0.18 + reviewMomentum * 0.14) / 0.9);
  const customerFitScore = clampScore(profile.income * 0.24 + profile.families * 0.14 + profile.student * 0.08 + profile.office * 0.12 + profile.localPreference * 0.16 + profile.chainFit * 0.1 + categoryFit * 0.16);
  const competitionScore = clampScore(100 - competitionPressure * 0.78 + (businessResult?.googlePlaces?.avgRating >= 4.5 ? 4 : 0));
  const locationScore = clampScore(profile.transit * 0.34 + profile.density * 0.22 + profile.office * 0.12 + (100 - profile.rent) * 0.1 + propertyBoost + transitBoost + (state.location ? 6 : 0));
  const financialScore = clampScore(profile.income * 0.3 + (100 - profile.rent) * 0.28 + (100 - config.rentSensitivity) * 0.1 + categoryFit * 0.14 + profile.chainFit * 0.1 + budgetSupport * 0.08);
  const growthScore = clampScore(45 + permitBoost + propertyBoost + profile.office * 0.12 + profile.density * 0.1 + profile.transit * 0.08);
  const riskRaw = clampScore(profile.rent * 0.34 + competitionPressure * 0.32 + (100 - profile.income) * 0.1 + (100 - profile.transit) * 0.08 + civicPenalty + (!state.location ? 6 : 0));
  const riskScore = clampScore(100 - riskRaw);
  const successProbability = clampScore(weightedBusinessScore((name) => ({
    Demand: demandScore,
    "Customer fit": customerFitScore,
    Competition: competitionScore,
    "Financial viability": financialScore,
    "Location quality": locationScore,
    "Area momentum": growthScore,
    Risk: riskScore
  }[name] ?? 50)));

  return {
    business,
    config,
    competitionPressure,
    condition: competitionCondition(competitionScore),
    successProbability,
    scores: [
    {
      name: "Demand",
      value: demandScore,
      why: `Verified Signals / Model Insights from category demand, existing activity, review momentum, demand momentum (${demandSignalLabel}), density, mobility, office, tourism, nightlife, and student signals.`
    },
    {
      name: "Customer fit",
      value: customerFitScore,
      why: "Verified Signals / Model Insights from population profile, income, households, education proxy, lifestyle fit, local preference, and business category compatibility."
    },
    {
      name: "Competition",
      value: competitionScore,
      why: `${businessResult?.registryExact ? "Verified Signals from local activity and competitive visibility" : "Estimated Factors until live business check finishes"}; market appears ${competitionCondition(competitionScore)}.`
    },
    {
      name: "Location quality",
      value: locationScore,
      why: "Model Insights from mobility access, walkability proxy, street density, office pull, commercial mix, and exact-address context when provided."
    },
    {
      name: "Financial viability",
      value: financialScore,
      why: `Estimated Factors from cost pressure, income support, category sensitivity, margin potential, budget support (${state.budget ? formatCurrency(state.budget) : "not provided"}), and likely operating difficulty.`
    },
    {
      name: "Area momentum",
      value: growthScore,
      why: "Verified Signals / Model Insights from development activity, commercial base, density, mobility access, and local economic activity."
    },
    {
      name: "Risk",
      value: riskScore,
      why: "Estimated Factors where higher means safer risk-adjusted conditions after cost pressure, saturation, local friction, mobility weakness, and area-level uncertainty."
    }
  ]};
}

function buildInstitutionalAnalysis(profile, recommendations) {
  const businessResult = currentBusinessResult();
  const civicResult = currentCivicResult();
  const siteIntelResult = currentSiteIntelResult();
  const conceptFitResult = currentConceptFitResult();
  const liveProfile = Boolean(state.liveProfiles[state.zip]);
  const liveBusiness = Boolean(businessResult?.registryExact);
  const google = Boolean(businessResult?.googlePlaces);
  const demandSignal = Boolean(businessResult?.demandMomentum?.available);
  const civic = Boolean(civicResult && !civicResult.fallback);
  const siteIntel = Boolean(siteIntelResult && !siteIntelResult.fallback);
  const concepts = Boolean(conceptFitResult?.concepts?.length);
  const foodBusiness = isFoodBusiness(state.business);
  const address = Boolean(state.location);
  const sources = [
    liveProfile && "Market Demographics",
    liveBusiness && "Local Market Activity",
    google && "Competitive Signals",
    demandSignal && "Consumer Demand",
    civic && "Risk and Development Signals",
    siteIntel && "Mobility and Commercial Mix Signals",
    concepts && "Concept Fit Scan",
    address && "Exact address/radius context"
  ].filter(Boolean);
  const missing = [
    !liveProfile && "Market demographics need confirmation before a final decision.",
    !liveBusiness && "Observed nearby business activity needs confirmation.",
    !google && "Competitive ratings and review strength need confirmation.",
    !demandSignal && "Consumer demand momentum needs independent confirmation.",
    !civic && "Local risk and development activity need confirmation.",
    !siteIntel && "Block-level mobility and commercial mix need confirmation.",
    foodBusiness && !concepts && "Cuisine-specific market gaps are limited; broader food and competition signals are being used.",
    !address && "Exact storefront, frontage, visibility, and block position — Site Visit Required.",
    "Dwell time, parking, rent, buildout cost, and operator financials need on-site or operator confirmation."
  ].filter(Boolean);
  const conflicts = [];
  if (businessResult?.openDataCount > 0 && businessResult?.googleVisibleCount > 0) {
    const ratio = Math.max(businessResult.openDataCount, businessResult.googleVisibleCount) / Math.max(1, Math.min(businessResult.openDataCount, businessResult.googleVisibleCount));
    if (ratio >= 4) conflicts.push("Competition intensity is directional because public records and visible search results measure different parts of the market.");
  }
  if (civicResult?.complaints?.level === "High" && profile.rent >= 78) {
    conflicts.push("High local friction plus high cost pressure may raise execution risk.");
  }

  const completeness = Math.max(20, Math.min(96, 28 + sources.length * 9 + (address ? 7 : 0) - conflicts.length * 7));
  const freshness = Math.max(35, Math.min(95, 44 + (liveProfile ? 10 : 0) + (liveBusiness ? 11 : 0) + (google ? 9 : 0) + (demandSignal ? 5 : 0) + (civic ? 9 : 0) + (siteIntel ? 9 : 0) + (concepts ? 7 : 0)));
  const sourceQuality = Math.max(25, Math.min(95, 30 + sources.length * 9 - conflicts.length * 8));
  const demandPenalty = demandSignal ? 0 : 4;
  const confidenceScore = clampScore(Math.max(20, completeness * 0.34 + freshness * 0.28 + sourceQuality * 0.38 - demandPenalty));
  const successModel = buildBusinessSuccessModel(profile, recommendations);
  const scores = successModel.scores;
  const riskScoreItem = scores.find((item) => item.name === "Risk");
  if (civicResult?.complaints?.level === "High") {
    riskScoreItem.value = Math.max(0, riskScoreItem.value - 8);
    riskScoreItem.why = `${riskScoreItem.why} Verified Signals: local friction is high in the selected area.`;
  } else if (!civicResult || civicResult.fallback) {
    riskScoreItem.value = Math.max(0, riskScoreItem.value - 2);
    riskScoreItem.why = `${riskScoreItem.why} Local risk signal is still resolving, so confidence is reduced until it verifies.`;
  }
  if (siteIntelResult?.mta?.available && siteIntelResult.mta.totalDecember2024Ridership > 250000) {
    const demand = scores.find((item) => item.name === "Demand");
    demand.value = Math.min(100, demand.value + 6);
    demand.why = `${demand.why} Verified Signals: nearby mobility is strong.`;
  }
  if (siteIntelResult?.pluto?.retailArea > 500000) {
    const location = scores.find((item) => item.name === "Location quality");
    location.value = Math.min(100, location.value + 5);
    location.why = `${location.why} Verified Signals: the area has meaningful commercial capacity.`;
  }
  const scoreValue = (name) => safeNumber(scores.find((item) => item.name === name)?.value, 50);
  const weightedScore = weightedBusinessScore(scoreValue);
  const opportunityScore = calibratedDecisionScore({ weightedScore, scoreValue, confidenceScore, successModel, civicResult });
  const riskScore = scoreValue("Risk");
  const financialScore = scoreValue("Financial viability");
  const severeRisk =
    riskScore < 25 ||
    (riskScore < 35 && financialScore < 45 && opportunityScore < 62) ||
    (civicResult?.complaints?.level === "High" && successModel.competitionPressure >= 92 && financialScore < 45);
  const decision = confidenceScore < 45
    ? "NEEDS MORE DATA"
    : opportunityScore < 55 || severeRisk
    ? "DO NOT OPEN"
    : opportunityScore >= 75 && confidenceScore >= 70
      ? "OPEN"
      : "CONDITIONAL";
  const failureBase = Math.max(12, Math.min(82, Math.round(84 - opportunityScore * 0.55 + (100 - riskScore) * 0.28 + Math.max(0, 70 - confidenceScore) * 0.25)));
  const revenueBase = {
    restaurant: 165000,
    pizza: 105000,
    deli: 90000,
    cafe: 85000,
    laundromat: 70000,
    gym: 95000,
    daycare: 110000,
    "smoke shop": 65000
  }[successModel.business] || 85000;
  const demandMultiplier = Math.max(0.5, Math.min(1.35, opportunityScore / 75));
  const maxRentShare = profile.rent >= 82 || successModel.config.rentSensitivity >= 76 ? "6-8% of projected sales" : profile.rent >= 65 ? "8-10% of projected sales" : "10-12% of projected sales";
  const requiredTraffic = profile.transit >= 80 || state.location ? "prove block-level walk-in traffic during lunch, evening, and weekend windows" : "prove repeat local customer demand because transit pull is limited";
  const marginCondition = ["restaurant", "pizza", "deli", "cafe"].includes(successModel.business)
    ? "restaurant concept must show labor, food cost, delivery, and rent economics before recommendation"
    : "business must show enough gross margin to survive slow months and marketing ramp";
  const conditions = [
    `Maximum location cost: ${maxRentShare} estimated factor`,
    `Minimum revenue: ${monthlyRange(revenueBase * demandMultiplier * 0.68, revenueBase * demandMultiplier * 1.02, "base-case estimated factor")}`,
    `Target customer: ${profile.audience?.[2]?.[1] || "local customers that match the business category"}`,
    `Store size: use the unit economics calculator; smaller footprint is safer when cost pressure is high`,
    `Operational assumptions: ${marginCondition}`,
    `Minimum demand: ${requiredTraffic}`,
    "Operator quality: reviews, credit, execution history, and differentiation must be verified",
    "Site diligence: confirm frontage, signage, venting, loading, ADA, zoning/use, and commitment terms"
  ];
  const topRisks = [
    profile.rent >= 78 && "High cost pressure can erase demand advantage",
    successModel.competitionPressure >= 78 && `Direct competition is ${successModel.condition}; saturation is elevated`,
    !address && "ZIP-level view may hide weak side-street conditions",
    !google && "Competitive review/rating visibility is not confirmed",
    !demandSignal && "Consumer demand momentum needs more confirmation",
    civicResult?.complaints?.level === "High" && "Recent complaint volume is high",
    "Operator financials and exact location economics — Due Diligence Required"
  ].filter(Boolean);
  const explainability = [
    {
      type: "Verified Signals",
      items: [
        liveProfile
          ? `Market demographics loaded for ZIP ${state.zip}: ${profile.name}.`
          : "Market demographics need confirmation.",
        liveBusiness
          ? `Local market activity confirms observed ${businessResult.business} competition.`
          : "Observed local competition needs confirmation.",
        google
          ? `Competitive visibility and review signals are connected.`
          : "Competitive review visibility needs confirmation.",
        demandSignal
          ? `${demandMomentumLabel(businessResult)} is connected as a demand signal.`
          : "Consumer demand momentum needs more confirmation.",
        civic
          ? `Local risk and development signals are connected.`
          : "Risk and development signal checks are pending."
      ]
    },
    {
      type: "Model Insights",
      items: [
        `${titleCase(successModel.business)} demand is inferred from density, transit, office pull, nightlife, tourism, student, customer profile, category demand, review momentum, and lightly weighted demand momentum.`,
        `Competition pressure is inferred by comparing local activity, competitive visibility, and category saturation.`,
        `Local-vs-chain fit is inferred from income, renter profile, category type, and observed market structure.`
      ]
    },
    {
      type: "Estimated Factors",
      items: [
        `Scenario revenue and failure probability are screening estimates, Due Diligence Required on operator financials.`,
        `Maximum location cost guidance is estimated from category economics and area cost pressure.`,
        `Viability score is weighted as Demand 25%, Customer Fit 20%, Competition 15%, Financial 15%, Location 10%, Growth 10%, Risk 5%, then calibrated with risk gates so weak sites do not stay compressed in the middle.`
      ]
    }
  ];

  return {
    rawData: [
      `Business: ${titleCase(successModel.business)}`,
      `Location: ${state.location ? `${state.location.address} within ${state.location.radiusMiles} mi` : `ZIP ${state.zip} - ${profile.name}`}`,
      `Demographics: density ${formatScore(profile.density)}, income ${formatScore(profile.income)}, families ${formatScore(profile.families)}, student ${formatScore(profile.student)}`,
      `Mobility/demand: transit ${formatScore(profile.transit)}, office ${formatScore(profile.office)}, nightlife ${formatScore(profile.nightlife)}, tourist ${formatScore(profile.tourist)}`,
      `Competition: ${businessResult?.registryExact ? `observed ${businessResult.business} market activity connected` : `modeled area competition ${formatScore(profile.competition)}`}`,
      `Cost pressure: ${formatScore(profile.rent)}`,
      `Consumer signal: ${google ? "competitive visibility connected" : "competitive visibility confirmation needed"}`,
      `Demand momentum: ${demandMomentumLabel(businessResult)}`,
      `Risk inputs: ${civic ? "local risk and development signals connected" : "risk and development confirmation needed"}`,
      `Mobility and commercial mix: ${siteIntel ? "mobility and commercial signals connected" : "mobility and commercial confirmation needed"}`
    ],
    validation: {
      completeness,
      freshness,
      sourceQuality,
      confidenceScore,
      sourceReliability: scoreQualityLabel(sourceQuality),
      missing,
      conflicts
    },
    scores,
    opportunityScore,
    successProbability: opportunityScore,
    confidenceScore,
    decision,
    decisionCopy: decisionCopyFor(decision, opportunityScore, confidenceScore, riskScore),
    summary: `${titleCase(successModel.business)} has a ${formatScore(opportunityScore)} viability screen in this area. ${decisionCopyFor(decision, opportunityScore, confidenceScore, riskScore)}`,
    topRecommendation: {
      name: titleCase(successModel.business),
      score: opportunityScore
    },
    alternatives: recommendations
      .filter((item) => item.business !== successModel.business)
      .slice(0, 5)
      .map((item) => `${item.name} (${formatScore(item.score)}): ${item.note}`),
    explainability,
    conditions,
    topRisks,
    scenarios: [
      {
        name: "BEST CASE",
        traffic: "High repeat traffic with strong operator execution",
        revenue: monthlyRange(revenueBase * demandMultiplier * 0.95, revenueBase * demandMultiplier * 1.35),
        breakeven: "6-12 months estimated factor",
        failure: `${Math.max(8, failureBase - 16)}% estimated factor`
      },
      {
        name: "BASE CASE",
        traffic: "Normal neighborhood demand with some direct competition",
        revenue: monthlyRange(revenueBase * demandMultiplier * 0.68, revenueBase * demandMultiplier * 1.02),
        breakeven: "12-24 months estimated factor",
        failure: `${failureBase}% estimated factor`
      },
      {
        name: "WORST CASE",
        traffic: "Weak conversion, high rent drag, or saturated category",
        revenue: monthlyRange(revenueBase * demandMultiplier * 0.38, revenueBase * demandMultiplier * 0.65),
        breakeven: "24+ months or never estimated factor",
        failure: `${Math.min(88, failureBase + 18)}% estimated factor`
      }
    ]
  };
}

// Deterministic, inspectable score breakdown for every report. Internal/debug
// (window.__spotvestScoreBreakdown + console.debug when window.__spotvestDebug);
// proves every number traces to a deterministic component, not AI/random.
function spotvestScoreBreakdown(analysis, profile) {
  const by = (name) => {
    const s = (analysis.scores || []).find((x) => x.name === name);
    return s ? clampScore(s.value) : null;
  };
  const br = currentBusinessResult();
  const site = currentSiteIntelResult();
  const civic = currentCivicResult();
  const ftNum = Number((String(elements.footTrafficScore?.textContent || "").match(/\d+/) || [null])[0]);
  const dataSourcesUsed = [
    "U.S. Census ACS (demographics)",
    br && br.googlePlaces && "Google Places (competition)",
    br && br.registryExact && "NYC Open Data (business registry)",
    site && !site.fallback && "MTA / PLUTO (mobility & commercial mix)",
    civic && !civic.fallback && "NYC 311 / DOB (risk & development)",
    br && br.demandMomentum && br.demandMomentum.available && "Google Trends (demand momentum)"
  ].filter(Boolean);
  const fallbackDataUsed = [
    !(br && br.registryExact) && "competition (no live registry/Places match → category model fallback)",
    !(site && !site.fallback) && "mobility / site-intelligence (modeled fallback)",
    !(civic && !civic.fallback) && "risk / civic signals (neutral fallback)",
    !(br && br.demandMomentum && br.demandMomentum.available) && "demand momentum (unavailable)"
  ].filter(Boolean);
  return {
    location: { zip: state.zip, business: normalizeBusiness(state.business), address: state.location?.address || null, radiusMiles: state.location?.radiusMiles || null },
    components: {
      demographicsScore: by("Customer fit"),
      competitionScore: by("Competition"),
      demandScore: by("Demand"),
      mobilityScore: by("Location quality"),
      financialViabilityScore: by("Financial viability"),
      areaMomentumScore: by("Area momentum"),
      riskScore: by("Risk"),
      footTrafficEstimateScore: Number.isFinite(ftNum) ? ftNum : null
    },
    weights: businessSuccessWeights,
    finalWeightedScore: clampScore(analysis.successProbability),
    confidenceScore: clampScore(analysis.confidenceScore),
    confidenceMeans: "completeness/reliability of available evidence — NOT odds of success",
    decision: analysis.decision,
    alternatives: (Array.isArray(state.realAlternatives) ? state.realAlternatives : []).map((a) => `${a.name} (${a.score}/100)`),
    dataSourcesUsed,
    missingData: (analysis.validation && analysis.validation.missing) || [],
    fallbackDataUsed
  };
}
function logScoreBreakdown(analysis, profile) {
  try {
    window.__spotvestScoreBreakdown = spotvestScoreBreakdown(analysis, profile);
    if (window.__spotvestDebug) console.debug("[SpotVest score breakdown]", window.__spotvestScoreBreakdown);
  } catch (e) { /* breakdown is best-effort/internal */ }
}

function renderInstitutionalAnalysis(profile, recommendations) {
  const analysis = buildInstitutionalAnalysis(profile, recommendations);
  logScoreBreakdown(analysis, profile);
  renderEvidenceCoverage(analysis);
  setStatusPill(
    elements.institutionalConfidence,
    `Evidence confidence ${formatScore(analysis.confidenceScore)} · ${analysis.validation.sourceReliability}`,
    analysis.confidenceScore >= 70 ? "Available" : "Estimated"
  );
  elements.institutionalDecision.textContent = analysis.decision;
  elements.institutionalDecision.className = `decision-badge decision-${analysis.decision.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
  elements.institutionalSummary.textContent = analysis.summary;
  elements.validationGrid.innerHTML = [
    ["Viability score", formatScore(analysis.successProbability)],
    ["Evidence confidence", formatScore(analysis.confidenceScore)],
    ["Freshness", formatScore(analysis.validation.freshness)],
    ["Source quality", formatScore(analysis.validation.sourceQuality)]
  ].map(([label, value]) => `<div><span>${label}</span><strong>${value}</strong></div>`).join("");
  renderScoreDrivers(analysis);
  elements.scoreBreakdown.innerHTML = analysis.scores
    .filter((score) => ["Demand", "Customer fit", "Location quality", "Area momentum"].includes(score.name) && safeNumber(score.value) >= 55)
    .slice(0, 4)
    .map((score) => `
      <div class="score-row">
        <div>
          <strong>${score.name}</strong>
          <small>${scoreSignalCopy(score)}</small>
        </div>
        <span>${formatBadgeScore(score.value)}</span>
      </div>
    `)
    .join("");
  if (!elements.scoreBreakdown.innerHTML) {
    elements.scoreBreakdown.innerHTML = `<div class="empty-places">Needs more data before naming strong success drivers.</div>`;
  }
  elements.scenarioAnalysis.innerHTML = analysis.topRisks.slice(0, 4)
    .map((risk) => `
      <div class="scenario-card scenario-card--risk">
        <span class="status status--risk"><i class="status__dot"></i>Risk</span>
        <span>${escapeText(risk)}</span>
      </div>
    `)
    .join("");
  if (!elements.scenarioAnalysis.innerHTML) {
    elements.scenarioAnalysis.innerHTML = `<div class="empty-places">No severe risk signals detected yet.</div>`;
  }
  elements.rawDataList.innerHTML = analysis.rawData.map((item) => `<li>${escapeText(item)}</li>`).join("");
  const missingItems = [...analysis.validation.missing, ...analysis.validation.conflicts];
  elements.missingDataList.innerHTML = missingItems.length
    ? missingItems.map((item) => `<li>${escapeText(item)}</li>`).join("")
    : "<li>No major verification gaps detected from the available signals. Still verify rent, operator strength, and final commitment terms before committing.</li>";
  renderSourceMap(analysis);
  elements.explainabilityList.innerHTML = analysis.explainability
    .map((group) => `
      <article class="explainability-card explainability-${group.type.toLowerCase().replace(/[^a-z0-9]+/g, "-")}">
        <strong>${group.type}</strong>
        <ul>${group.items.map((item) => `<li>${escapeText(item)}</li>`).join("")}</ul>
      </article>
    `)
    .join("");
  elements.conditionsList.innerHTML = analysis.conditions.map((item) => `<li>${escapeText(item)}</li>`).join("");
  elements.alternativesList.innerHTML = [
    `Primary screen: ${analysis.topRecommendation.name} (${formatScore(analysis.topRecommendation.score)})`,
    ...analysis.alternatives.map((item) => `Alternative: ${item}`)
  ].map((item) => `<li>${escapeText(item)}</li>`).join("");
  updatePanelTimestamp(".institutional-panel");
  renderSpotVestV3(profile, recommendations, analysis);
}

function sv3Refs() {
  const app = document.querySelector("#sv3-app");
  if (!app) return {};
  return {
    app,
    tabbar: app.querySelector("#sv3-tabbar"),
    screenInput: app.querySelector("#sv3-screen-input"),
    screenReport: app.querySelector("#sv3-screen-report"),
    screenCompare: app.querySelector("#sv3-screen-compare"),
    screenPortfolio: app.querySelector("#sv3-screen-portfolio"),
    portfolioBody: app.querySelector("#sv3-portfolio-body"),
    tabOverview: app.querySelector("#sv3-tab-overview"),
    tabMarket: app.querySelector("#sv3-tab-market"),
    tabRisk: app.querySelector("#sv3-tab-risk"),
    tabMoney: app.querySelector("#sv3-tab-money"),
    tabMethod: app.querySelector("#sv3-tab-method"),
    compareBody: app.querySelector("#sv3-compare-body"),
    biztype: app.querySelector("#sv3-biztype"),
    zip: app.querySelector("#sv3-zip"),
    address: app.querySelector("#sv3-address"),
    budget: app.querySelector("#sv3-budget"),
    radius: app.querySelector("#sv3-radius"),
    stepnote: app.querySelector("#sv3-stepnote")
  };
}

/* ---------- small formatting helpers for the v3 inside app ---------- */
function sv3Pct(value) { return Math.max(0, Math.min(100, Math.round(safeNumber(value, 0)))); }
function sv3Level(value) {
  const v = safeNumber(value, 0);
  if (v >= 80) return "Excellent";
  if (v >= 64) return "Strong";
  if (v >= 48) return "Moderate";
  if (v >= 32) return "Limited";
  return "Low";
}
function sv3CostLevel(value) {
  const v = safeNumber(value, 0);
  if (v >= 80) return "Very high";
  if (v >= 65) return "High";
  if (v >= 45) return "Moderate";
  return "Low";
}
function sv3DecisionMeta(decision) {
  switch (String(decision || "").toUpperCase()) {
    case "OPEN": return { cls: "go", lcls: "go", word: "Strong opportunity" };
    case "DO NOT OPEN": return { cls: "avoid", lcls: "avoid", word: "High risk" };
    case "NEEDS MORE DATA": return { cls: "cond", lcls: "", word: "Needs more data" };
    default: return { cls: "cond", lcls: "", word: "Conditional" };
  }
}
function sv3BannerHeadline(decision, business) {
  const b = business || "this business";
  switch (String(decision || "").toUpperCase()) {
    case "OPEN": return `Open: ${b}`;
    case "DO NOT OPEN": return `High risk for ${b}`;
    case "NEEDS MORE DATA": return `Needs more data: ${b}`;
    default: return `Open with conditions: ${b}`;
  }
}
function sv3GaugeNeedle(score) {
  const f = Math.max(0, Math.min(1, safeNumber(score, 0) / 100));
  const rad = (1 - f) * Math.PI;
  return { cx: (100 + 86 * Math.cos(rad)).toFixed(1), cy: (100 - 86 * Math.sin(rad)).toFixed(1) };
}
function sv3ElText(id) { const el = document.getElementById(id); return el ? el.textContent.trim() : ""; }
function sv3SplitLabel(text) {
  const idx = String(text || "").indexOf(":");
  if (idx === -1) return `<li>${escapeText(text)}</li>`;
  return `<li><b>${escapeText(text.slice(0, idx))}:</b>${escapeText(text.slice(idx + 1))}</li>`;
}

/* ---------- repeated component builders (v3 markup) ---------- */
function sv3Pill(label, status) {
  const warn = ["Modeled", "Light", "Partial", "Estimated"].includes(status);
  return `<span class="pill${warn ? " warn" : ""}"><span class="d"></span>${escapeText(label)} <span class="tag">${escapeText(status)}</span></span>`;
}
function sv3MiniCard(item) {
  const value = sv3Pct(item.value);
  const cls = value >= 70 ? "" : value >= 55 ? " amber" : " amber";
  const copy = value >= 70
    ? "Strong positive signal for this business in the selected area."
    : value >= 50
      ? "Supportive signal, but exact site economics still matter."
      : "Mixed signal that needs more location-specific proof.";
  return `<div class="mini"><div class="badge${cls}">${value}</div><div><div class="t">${escapeText(item.name)}</div><div class="s">${escapeText(copy)}</div></div></div>`;
}
function sv3StepCard(index, title, copy) {
  return `<div class="step"><div class="num">${index}</div><div><div class="st">${escapeText(title)}</div><div class="sd">${escapeText(copy)}</div></div></div>`;
}
function sv3BarRow(name, value, colorClass) {
  return `<div class="bar-row"><div class="bl"><span class="bn">${escapeText(name)}</span><span class="bv">${escapeText(sv3Level(value))}</span></div><div class="track"><div class="fill ${colorClass}" style="width:${sv3Pct(value)}%"></div></div></div>`;
}
function sv3GapCard(score, tag, name, desc) {
  const s = sv3Pct(score);
  const cls = s >= 80 ? "open" : s >= 62 ? "poss" : "sel";
  return `<div class="gap ${cls}"><div class="gscore">${s}</div><div><div class="gt">${escapeText(tag)}</div><div class="gn">${escapeText(name)}</div><div class="gd">${escapeText(desc)}</div></div></div>`;
}
function sv3RiskCardV3(text, index) {
  return `<div class="risk"><div class="rk"><span class="d"></span>${index === 0 ? "High risk" : "Risk"}</div><div class="rt">${escapeText(text)}</div><div class="rs">Verify this before signing or investing.</div></div>`;
}
function sv3CompCard(place, index) {
  const grads = ["linear-gradient(135deg,#3a2a20,#1a1410)", "linear-gradient(135deg,#2a3340,#141a24)", "linear-gradient(135deg,#202f2a,#101a16)", "linear-gradient(135deg,#2f2436,#171022)"];
  const grad = grads[index % grads.length];
  const rating = safeNumber(place.rating);
  const reviews = safeNumber(place.reviews);
  const chips = [
    rating !== null ? `<span class="chip">★ ${rating.toFixed(1)}</span>` : "",
    reviews ? `<span class="chip">${formatInteger(reviews)} reviews</span>` : "",
    `<span class="chip">${place.chain ? "Chain brand" : "Likely local"}</span>`
  ].join("");
  // Real Google Places photo when available (proxied same-origin), otherwise a
  // clean icon placeholder — never a blank/gray box.
  const img = place.photoRef
    ? `<div class="img" style="background-image:url('/api/place-photo?ref=${encodeURIComponent(place.photoRef)}');background-size:cover;background-position:center;background-color:#101827"></div>`
    : `<div class="img sv3-img-ph" style="background:${grad}"><svg viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.5)" stroke-width="1.6"><path d="M4 9h16v10a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9z"/><path d="M3 9l1.4-4.2A1 1 0 0 1 5.3 4h13.4a1 1 0 0 1 .9.8L21 9"/><path d="M9 13h6"/></svg></div>`;
  return `<div class="comp">${img}<div class="cb"><div class="cn">${escapeText(place.name || "Nearby operator")}</div><div class="ca">${escapeText(place.address || "New York, NY")}</div><div class="ct">${chips}</div></div></div>`;
}
function sv3CovCard(title, desc, statusText, statusClass) {
  return `<div class="cov"><div class="cvt">${escapeText(title)}</div><div class="cvd">${escapeText(desc)}</div><span class="stat ${statusClass}">${escapeText(statusText)}</span></div>`;
}

/* ---------- "The space itself" — address-specific PLUTO record (display only) ---------- */
function sv3SpaceItselfCard(ctx) {
  const sqft = (v) => Number.isFinite(v) && v > 0 ? `${formatInteger(v)}<span class="u"> sq ft</span>` : null;
  if (!ctx.spaceAddressMode) {
    return `<div class="card"><div class="section-label"><span class="n">★</span> The space itself</div><div class="desc" style="margin-top:6px">Enter an exact storefront address (not just a ZIP) to pull this building's property record from NYC PLUTO.</div></div>`;
  }
  const lot = ctx.spaceLot;
  if (!lot || !lot.available) {
    return `<div class="card"><div class="section-label"><span class="n">★</span> The space itself</div><div class="desc" style="margin-top:6px">Property data unavailable for this address — NYC PLUTO has no matching tax lot nearby. No value is guessed, and nothing here affects the score.</div></div>`;
  }
  const rows = [];
  const add = (k, v) => { if (v) rows.push(`<div class="metric"><div class="k">${escapeText(k)}</div><div class="v">${v}</div></div>`); };
  add("Building size", sqft(lot.buildingArea));
  add("Lot size", sqft(lot.lotArea));
  add("Floors", Number.isFinite(lot.floors) && lot.floors > 0 ? String(lot.floors) : null);
  add("Year built", lot.yearBuilt ? `${lot.yearBuilt}<span class="u"> PLUTO</span>` : null);
  add("Ground-floor retail", sqft(lot.retailArea));
  const com = lot.commercialArea || 0, res = lot.residentialArea || 0, tot = com + res;
  if (tot > 0) add("Commercial / residential", `${Math.round((com / tot) * 100)}%<span class="u"> / ${Math.round((res / tot) * 100)}%</span>`);
  add("Units", Number.isFinite(lot.unitsTotal) && lot.unitsTotal > 0 ? `${formatInteger(lot.unitsTotal)}${lot.unitsRes ? `<span class="u"> · ${formatInteger(lot.unitsRes)} res</span>` : ""}` : null);
  add("Assessed value", lot.assessedTotal ? `${formatCurrency(lot.assessedTotal)}<span class="u"> NYC DOF, not market price</span>` : null);
  add("Building class", lot.bldgClass ? escapeText(lot.bldgClass) + (lot.landUse ? `<span class="u"> · ${escapeText(lot.landUse)}</span>` : "") : (lot.landUse ? escapeText(lot.landUse) : null));
  const maxFar = Math.max(lot.maxCommercialFar || 0, lot.maxResidentialFar || 0);
  if (maxFar > 0 && Number.isFinite(lot.builtFar) && lot.builtFar >= 0) {
    const headroom = Math.max(0, Math.round((1 - lot.builtFar / maxFar) * 100));
    add("Expansion headroom", `${headroom}%<span class="u"> estimate</span>`);
  }
  const distNote = Number.isFinite(lot.distanceMeters) && lot.distanceMeters > 60 ? ` · nearest lot ~${lot.distanceMeters}m away` : "";
  return `<div class="card">
    <div class="section-label"><span class="n">★</span> The space itself</div>
    <div class="space-grid">${rows.join("")}</div>
    <div class="desc" style="margin-top:8px;opacity:.72">Source: NYC PLUTO tax-lot record${escapeText(distNote)}. Fields shown as recorded; assessed value is the city assessment (not market price); expansion headroom is an estimate from zoning FAR. Display only — not used in the score.</div>
  </div>`;
}

/* ---------- "Nearest transit" — closest subway stations from our MTA data (display only) ---------- */
const MTA_LINE_COLORS = {
  "1": "#EE352E", "2": "#EE352E", "3": "#EE352E",
  "4": "#00933C", "5": "#00933C", "6": "#00933C",
  "7": "#B933AD",
  "A": "#0039A6", "C": "#0039A6", "E": "#0039A6",
  "B": "#FF6319", "D": "#FF6319", "F": "#FF6319", "M": "#FF6319",
  "G": "#6CBE45", "J": "#996633", "Z": "#996633",
  "L": "#A7A9AC", "N": "#FCCC0A", "Q": "#FCCC0A", "R": "#FCCC0A", "W": "#FCCC0A",
  "S": "#808183"
};
function mtaLineBadge(line) {
  const L = String(line || "").toUpperCase().trim();
  if (!L) return "";
  const bg = MTA_LINE_COLORS[L] || "#5A6473";
  const darkText = ["N", "Q", "R", "W"].includes(L); // yellow lines use black glyphs
  return `<span class="mta-badge" style="background:${bg};color:${darkText ? "#16181d" : "#fff"}">${escapeText(L)}</span>`;
}
function milesBetweenPts(lat1, lng1, lat2, lng2) {
  lat1 = Number(lat1); lng1 = Number(lng1); lat2 = Number(lat2); lng2 = Number(lng2);
  const toRad = Math.PI / 180;
  const dLat = (lat2 - lat1) * toRad;
  const dLng = (lng2 - lng1) * toRad * Math.cos(((lat1 + lat2) / 2) * toRad);
  return 3958.8 * Math.sqrt(dLat * dLat + dLng * dLng);
}
function sv3NearestTransitCard(ctx) {
  if (!ctx.spaceAddressMode || !ctx.point) {
    return `<div class="card"><div class="sub">Nearest transit</div><div class="desc" style="margin-top:6px">Enter an exact storefront address to map the closest subway stations.</div></div>`;
  }
  if (ctx.transitLoading) {
    return `<div class="card"><div class="sub">Nearest transit · within 1 mile</div><div class="desc" style="margin-top:6px">Mapping the closest subway stations…</div></div>`;
  }
  const pt = ctx.point;
  const near = (Array.isArray(ctx.mtaNearby) ? ctx.mtaNearby : [])
    .map((s) => ({ ...s, mi: milesBetweenPts(pt.lat, pt.lng, s.lat, s.lng) }))
    .filter((s) => Number.isFinite(s.mi) && s.mi <= 1.0)
    .sort((a, b) => a.mi - b.mi)
    .slice(0, 3);
  if (!near.length) {
    return `<div class="card"><div class="sub">Nearest transit</div><div class="desc" style="margin-top:6px"><b>No subway station within 1 mile.</b> Foot traffic here isn't subway-fed — weigh walk-up, bus, and vehicle access carefully. This is a real consideration, not a default.</div><div class="src">MTA subway ridership (Dec 2024)</div></div>`;
  }
  const maxRide = Math.max(...near.map((s) => s.ridership || 0));
  const rows = near.map((s) => {
    const walk = Math.max(1, Math.round((s.mi * 1609) / 80)); // ~5 km/h
    const badges = (s.lines || []).map(mtaLineBadge).join("");
    const distLabel = s.mi < 0.1 ? s.mi.toFixed(2) : s.mi.toFixed(1);
    const busiest = (s.ridership || 0) === maxRide;
    return `<div class="transit-row">
      <div class="transit-main"><span class="transit-name">${escapeText(s.name)}</span><span class="transit-badges">${badges}</span></div>
      <div class="transit-meta">${distLabel} mi · ${walk} min walk <span class="u">est.</span>${busiest ? ` · <span class="transit-busy">busiest nearby</span>` : ""}</div>
    </div>`;
  }).join("");
  const top = near.reduce((a, b) => ((b.ridership || 0) > (a.ridership || 0) ? b : a), near[0]);
  const topLines = (top.lines || []).join("/");
  return `<div class="card">
    <div class="sub">Nearest transit · within 1 mile</div>
    <div class="transit-list">${rows}</div>
    <div class="desc" style="margin-top:10px">This block is transit-fed: most visitors arrive via the <b>${escapeText(topLines || "subway")}</b> at <b>${escapeText(top.name)}</b>.</div>
    <div class="src">MTA subway ridership (Dec 2024) · walk times estimated from distance</div>
  </div>`;
}

/* ---------- "What's being built nearby" — DOB NOW filings (display only) ---------- */
function sv3TitleCaseAddr(s) {
  return String(s || "").toLowerCase().replace(/\b([a-z])/g, (m, c) => c.toUpperCase());
}
function sv3ConstructionCard(ctx) {
  if (!ctx.spaceAddressMode || !ctx.point) {
    return `<div class="card"><div class="sub">What's being built nearby</div><div class="desc" style="margin-top:6px">Enter an exact storefront address to scan nearby DOB construction filings.</div></div>`;
  }
  if (ctx.constructionLoading) {
    return `<div class="card"><div class="sub">What's being built nearby</div><div class="desc" style="margin-top:6px">Checking DOB construction filings within 0.5 mi…</div></div>`;
  }
  const c = ctx.construction;
  const total = c ? (c.newBuildings || 0) + (c.majorRenos || 0) : 0;
  if (!c || !c.available || total === 0) {
    return `<div class="card"><div class="sub">What's being built nearby</div><div class="desc" style="margin-top:6px">No new construction filings found nearby (within 0.5 mi, last 36 months).</div><div class="src">NYC DOB NOW: Build – Job Application Filings</div></div>`;
  }
  const parts = [];
  if (c.newBuildings) parts.push(`<b>${c.newBuildings}</b> new building${c.newBuildings > 1 ? "s" : ""}`);
  if (c.majorRenos) parts.push(`<b>${c.majorRenos}</b> major renovation${c.majorRenos > 1 ? "s" : ""}`);
  const projects = (c.projects || []).map((p) => `<div class="transit-row">
      <div class="transit-main"><span class="transit-name">${escapeText(sv3TitleCaseAddr(p.address))}</span><span class="cx-tag ${p.type === "New building" ? "nb" : "reno"}">${escapeText(p.type)}</span></div>
      <div class="transit-meta">${p.newUnits ? `${p.newUnits} units · ` : ""}${p.distanceMi} mi · filed ${escapeText(String(p.filed || "").slice(0, 10))}</div>
    </div>`).join("");
  return `<div class="card">
    <div class="sub">What's being built nearby · within 0.5 mi</div>
    <div class="big" style="font-size:19px;margin-top:4px">${parts.join(" + ")} filed <span class="u" style="font-size:13px;color:var(--txt-3)">last 36 mo</span></div>
    ${c.estNewUnits > 0 ? `<div class="desc" style="margin-top:6px">est. <b style="color:var(--teal-bright)">~${c.estNewUnits}</b> new residential units coming <span style="font-style:italic;color:var(--txt-3)">— estimate; proposed in DOB filings, not all will complete</span></div>` : ""}
    <div class="transit-list" style="margin-top:10px">${projects}</div>
    <div class="src">NYC DOB NOW: Build – Job Application Filings · within 0.5 mi · last 36 months. New construction signals future demand. Display only — not used in the score.</div>
  </div>`;
}

/* ---------- tab builders ---------- */
function sv3OverviewHTML(ctx) {
  const m = sv3DecisionMeta(ctx.decision);
  const needle = sv3GaugeNeedle(ctx.score);
  const offset = Math.round(270 * (1 - sv3Pct(ctx.score) / 100));
  const arcStroke = m.cls === "go" ? "#4ADE80" : m.cls === "avoid" ? "#FF6B6B" : "#F5B544";
  const thesis = ctx.strongScores.length ? ctx.strongScores : ctx.scores.slice(0, 3);
  const steps = (ctx.conditions.length ? ctx.conditions : ["Verify site economics before committing."]).slice(0, 4)
    .map((c, i) => {
      const idx = c.indexOf(":");
      const title = idx === -1 ? (i === 0 ? ctx.decisionNext : `Condition ${i + 1}`) : c.slice(0, idx);
      const copy = idx === -1 ? c : c.slice(idx + 1).trim();
      return sv3StepCard(i + 1, title, copy);
    }).join("");
  return `
    <div class="banner ${ctx.scoreReady ? m.cls : ""}" style="--p:${ctx.scoreReady ? sv3Pct(ctx.score) : 0}%">
      <div class="ring"><span class="num">${ctx.scoreReady ? ctx.score : (ctx.scoreUnavailable ? "—" : "···")}</span><span class="of">${ctx.scoreReady ? "/100" : ""}</span></div>
      <div>${ctx.scoreReady
        ? `<div class="vl">${escapeText(m.word)}</div><h2>${escapeText(sv3BannerHeadline(ctx.decision, ctx.business))}</h2><div class="vsub">${escapeText(ctx.decisionCopy)}</div>`
        : ctx.scoreUnavailable
          ? `<div class="vl">Data unavailable</div><h2>Live data didn't confirm in time</h2><div class="vsub">SpotVest won't show a score built on guessed data. The Competition or Risk signal didn't return — tap <b>Refresh data</b> to retry. No verdict is shown until real signals confirm.</div>`
          : `<div class="vl">Analyzing…</div><h2>Loading live signals</h2><div class="vsub">The score finalizes once all market signals arrive — this keeps the result stable and accurate.</div>`}</div>
    </div>
    ${sv3SpaceItselfCard(ctx)}
    <div class="card">
      <div class="gauge-wrap">
        <div class="gauge">
          <svg viewBox="0 0 200 112">
            <defs><linearGradient id="sv3gg" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#FF6B6B"/><stop offset="0.5" stop-color="#F5B544"/><stop offset="1" stop-color="#4ADE80"/></linearGradient></defs>
            <path d="M14 100 A86 86 0 0 1 186 100" fill="none" stroke="rgba(255,255,255,.08)" stroke-width="16" stroke-linecap="round"/>
            <path d="M14 100 A86 86 0 0 1 186 100" fill="none" stroke="url(#sv3gg)" stroke-width="16" stroke-linecap="round" stroke-dasharray="270" stroke-dashoffset="${offset}"/>
            <circle cx="${needle.cx}" cy="${needle.cy}" r="9" fill="#0c1120" stroke="${arcStroke}" stroke-width="4"/>
          </svg>
          <div class="gnum"><div class="v">${ctx.scoreReady ? ctx.score : "··"}</div><div class="l ${m.lcls}">${ctx.scoreReady ? escapeText(m.word) : "Loading"}</div></div>
        </div>
        <div class="gauge-ticks"><span>0 · Avoid</span><span>50</span><span>100 · Go</span></div>
      </div>
    </div>
    <div class="accuracy">
      <div class="badge-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 12l2 2 4-4"/><path d="M12 3l7 4v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V7l7-4z"/></svg></div>
      <div class="av pending">Validation<br>in progress</div>
      <div class="at"><b>Model validation in progress.</b> We're backtesting SpotVest against real NYC business outcomes before publishing an accuracy figure. Until then, treat this score as a structured screen — not a guarantee.</div>
    </div>
    <div class="bottomline">
      <div class="bt">Bottom line for the owner</div>
      <p>${ctx.bottomLine}</p>
      <div class="src">Generated · OpenAI summary over SpotVest signals</div>
    </div>
    ${/CONDITIONAL/i.test(ctx.decision) ? `<div class="section-label"><span class="n">!</span> Conditions to open</div><div class="card accent"><div class="sub">This location works for ${escapeText(ctx.business.toLowerCase())} only if</div><ul class="bullets">${(ctx.conditions || []).slice(0, 5).map(sv3SplitLabel).join("") || "<li>Verify site economics before committing.</li>"}</ul></div>` : ""}
    <div class="duo">
      <div class="metric"><div class="k">Viability score</div><div class="v">${ctx.score}<span class="u">/100</span></div></div>
      <div class="metric good"><div class="k">Evidence confidence</div><div class="v">${ctx.confidence}<span class="u">/100·${escapeText(ctx.confidenceLabel)}</span></div></div>
    </div>
    <div class="section-label">Signals in this report</div>
    <div class="signals">${ctx.signalPills}</div>
    <div class="section-label"><span class="n">01</span> Investment thesis</div>
    <div class="card">${thesis.slice(0, 3).map(sv3MiniCard).join("")}<div class="src">NYC Open Data · Census ACS · Google Places</div></div>
    <div class="section-label"><span class="n">02</span> Why this works</div>
    <div class="card accent"><div class="sub">Decision insight · market data live, model scored</div><h3>${escapeText(ctx.whyHeadline)}</h3><div class="desc">${escapeText(ctx.whyCopy)}</div><div class="src">Generated · OpenAI over verified signals</div></div>
    <div class="section-label"><span class="n">03</span> Move from screen to decision</div>
    <div class="card">${steps}</div>
    <div class="actions">
      <button class="btn" type="button" data-sv3-action="generate">Generate decision report</button>
      <button class="btn ghost sm btn-ico" type="button" data-sv3-action="export-pdf"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3v12m0 0l-4-4m4 4l4-4M5 21h14"/></svg>Export PDF</button>
      <button class="btn ghost sm btn-ico" type="button" data-sv3-action="save"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21H8a2 2 0 01-2-2V7a2 2 0 012-2h7l4 4v10a2 2 0 01-2 2z"/></svg>Save report</button>
      <button class="btn ghost sm btn-ico" type="button" data-sv3-action="copy"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 007 0l3-3a5 5 0 00-7-7l-1 1m-2 8a5 5 0 00-7 0l-3 3a5 5 0 007 7l1-1"/></svg>Copy link</button>
      <button class="btn ghost sm btn-ico" type="button" data-sv3-action="compare"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 3v18M15 3v18M3 9h18M3 15h18"/></svg>Add to compare</button>
      <button class="btn ghost sm btn-ico" type="button" data-sv3-action="refresh" title="Pull fresh live data for this location (overrides the 7-day cache)"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12a9 9 0 11-3-6.7M21 4v4h-4"/></svg>Refresh data</button>
      <button class="btn ghost sm btn-ico" type="button" data-sv3-action="new"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12a9 9 0 109-9 9 9 0 00-7 3.5M3 4v4h4"/></svg>New search</button>
    </div>`;
}

/* ---------- inside-app live map (MapLibre, real competitor pins) ---------- */
let sv3MarketMap = null;
let sv3MarketMapData = null;
// Real foot-traffic data fetched from /api/point (MTA ridership + hourly
// profile) for the analyzed location, keyed by rounded center coords.
let sv3FootReal = null;
let sv3NearbyTransit = null; // { key, loading, stations:[], unavailable }
async function sv3LoadNearbyTransit(lat, lng, key) {
  sv3NearbyTransit = { key, loading: true, stations: [] };
  try {
    const d = await (await fetch(`/api/nearby-transit?lat=${lat}&lng=${lng}`)).json();
    sv3NearbyTransit = { key, loading: false, stations: Array.isArray(d.stations) ? d.stations : [], unavailable: Boolean(d.unavailable) };
  } catch (e) {
    sv3NearbyTransit = { key, loading: false, stations: [], unavailable: true };
  }
  // Re-render so the Nearest transit card fills in (display only; the score is
  // already committed and unaffected).
  if (state.location?.lat && state.location?.lng && `${state.location.lat},${state.location.lng}` === key) {
    try { safeUiUpdate("nearest transit (loaded)", () => renderInstitutionalAnalysis(profileForZip(state.zip), buildRecommendations(profileForZip(state.zip)))); } catch (e) { /* non-fatal */ }
  }
}
let sv3NearbyConstruction = null; // { key, loading, data }
async function sv3LoadNearbyConstruction(lat, lng, key) {
  sv3NearbyConstruction = { key, loading: true, data: null };
  try {
    const d = await (await fetch(`/api/nearby-construction?lat=${lat}&lng=${lng}`)).json();
    sv3NearbyConstruction = { key, loading: false, data: d };
  } catch (e) {
    sv3NearbyConstruction = { key, loading: false, data: { available: false } };
  }
  if (state.location?.lat && state.location?.lng && `${state.location.lat},${state.location.lng}` === key) {
    try { safeUiUpdate("nearby construction (loaded)", () => renderInstitutionalAnalysis(profileForZip(state.zip), buildRecommendations(profileForZip(state.zip)))); } catch (e) { /* non-fatal */ }
  }
}

function sv3Circle(center, radiusM) {
  const pts = 64, coords = [], [lng, lat] = center;
  const dx = radiusM / (111320 * Math.cos(lat * Math.PI / 180)), dy = radiusM / 110540;
  for (let i = 0; i <= pts; i++) { const a = i / pts * 2 * Math.PI; coords.push([lng + dx * Math.cos(a), lat + dy * Math.sin(a)]); }
  return { type: "Feature", geometry: { type: "Polygon", coordinates: [coords] } };
}

function sv3RenderMarketMap() {
  const el = document.getElementById("sv3-market-map");
  if (!el) return;
  const data = sv3MarketMapData || {};
  if (!window.maplibregl) return; // styled container stays as a graceful fallback
  try { if (sv3MarketMap) { sv3MarketMap.remove(); sv3MarketMap = null; } } catch (e) { /* ignore */ }
  const center = data.center || [-73.985, 40.748];
  const map = new maplibregl.Map({
    container: el, style: "https://tiles.openfreemap.org/styles/dark",
    center, zoom: data.isArea ? 12.4 : 14.6, attributionControl: true
  });
  sv3MarketMap = map;
  map.addControl(new maplibregl.NavigationControl({ showCompass: false }), "bottom-right");
  map.on("load", () => {
    const r = data.radiusMeters || 805;
    map.addSource("sv3r", { type: "geojson", data: sv3Circle(center, r) });
    map.addLayer({ id: "sv3r-f", type: "fill", source: "sv3r", paint: { "fill-color": "#39C2D6", "fill-opacity": 0.06 } });
    map.addLayer({ id: "sv3r-l", type: "line", source: "sv3r", paint: { "line-color": "#39C2D6", "line-width": 1, "line-dasharray": [2, 2], "line-opacity": 0.5 } });
    const feats = (data.competitors || []).map((c) => ({ type: "Feature", geometry: { type: "Point", coordinates: [c.lng, c.lat] }, properties: { inRadius: !!c.inRadius } }));
    map.addSource("sv3c", { type: "geojson", data: { type: "FeatureCollection", features: feats } });
    map.addLayer({
      id: "sv3c-p", type: "circle", source: "sv3c", paint: {
        "circle-radius": 5,
        "circle-color": ["case", ["get", "inRadius"], "#FF6B6B", "#64748B"],
        "circle-opacity": 0.85, "circle-stroke-width": 1,
        "circle-stroke-color": ["case", ["get", "inRadius"], "#FF6B6B", "#475569"]
      }
    });
    const dot = document.createElement("div");
    dot.style.cssText = "width:14px;height:14px;border-radius:50%;background:#5B8CFF;border:2px solid #fff;box-shadow:0 0 0 4px rgba(91,140,255,.25)";
    new maplibregl.Marker({ element: dot }).setLngLat(center).addTo(map);
    setTimeout(() => { try { map.resize(); } catch (e) { /* ignore */ } }, 60);
  });
}

/* ---------- data-driven chart geometry (modeled, varies per location) ---------- */
function sv3Bucket(raw) {
  const s = String(raw || "").toLowerCase();
  if (/coffee|caf|bakery|\btea\b|juice|smoothie|dessert|ice cream/.test(s)) return "cafe";
  if (/gym|fitness|yoga|pilates|cycl|crossfit|boxing|martial|dance|\bspa\b|wellness|salon|barber|nail|tattoo|tanning/.test(s)) return "gym";
  if (/\bbar\b|cocktail|wine|beer|tap|hookah|nightclub|night club|lounge/.test(s)) return "bar";
  if (/restaurant|pizza|deli|sandwich|burger|chicken|sushi|ramen|taco|mexican|italian|thai|indian|korean|kitchen|\bfood\b|bbq|steak|grill|diner|brunch|seafood|vegan/.test(s)) return "food";
  return "retail";
}
function sv3Spark(vals, w, h, top, bottom) {
  const n = vals.length, step = w / (n - 1);
  const pts = vals.map((v, i) => [Math.round(i * step), Math.round(bottom - (bottom - top) * Math.max(0, Math.min(1, v)))]);
  const line = "M" + pts.map((p) => p[0] + "," + p[1]).join(" L");
  const area = line + ` L${w},${h} L0,${h} Z`;
  return { line, area, pts };
}
function sv3FootHourSVG(rawBusiness, score, seed, realHourly) {
  let vals;
  if (Array.isArray(realHourly) && realHourly.length === 24 && realHourly.some((v) => v > 0)) {
    // Real MTA hour-of-day ridership near this location, 6am → midnight.
    const hours = [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 0];
    const raw = hours.map((h) => Math.max(0, Math.min(1, Number(realHourly[h]) || 0)));
    const max = Math.max(...raw, 0.001);
    vals = raw.map((v) => Math.max(0.05, v / max));
  } else {
    const shapes = {
      cafe: [.35, .85, 1, .8, .6, .55, .6, .55, .5, .5, .42, .32, .22, .14, .08],
      bar: [.05, .08, .12, .2, .3, .3, .35, .45, .6, .8, 1, .95, .72, .46, .3],
      gym: [.5, .72, .55, .4, .35, .4, .45, .45, .52, .72, .92, 1, .7, .4, .2],
      food: [.1, .2, .35, .6, 1, .7, .45, .5, .72, .96, .9, .6, .4, .22, .12],
      retail: [.1, .3, .5, .66, .76, .82, .86, .9, 1, .94, .8, .6, .4, .25, .12]
    };
    const base = shapes[sv3Bucket(rawBusiness)] || shapes.retail;
    const amp = 0.5 + Math.max(0, Math.min(100, score)) / 200; // taller where score is higher
    vals = base.map((v, i) => {
      const j = (((seed >> (i % 16)) & 7) - 3) / 60; // small deterministic per-location jitter
      return Math.max(0.05, Math.min(1, v * amp + j));
    });
  }
  const { line, area, pts } = sv3Spark(vals, 320, 130, 16, 118);
  // mark the two tallest points
  const order = vals.map((v, i) => [v, i]).sort((a, b) => b[0] - a[0]);
  const dots = [order[0][1], order[1][1]].map((i) => `<circle cx="${pts[i][0]}" cy="${pts[i][1]}" r="3.5" fill="#4FE3D8"/>`).join("");
  return `<path d="${line}" fill="none" stroke="#3BD6C9" stroke-width="2.5" stroke-linejoin="round"/><path d="${area}" fill="rgba(57,194,214,.12)"/>${dots}`;
}
function sv3WeekSVG(weekdayPct) {
  const wd = Math.max(0, Math.min(100, weekdayPct || 60)), we = 100 - wd;
  const rel = [wd, wd * 1.06, wd * 1.1, wd * 1.04, wd * 1.2, we * 1.08, we * 0.92];
  const max = Math.max(...rel);
  return rel.map((d, i) => {
    const hgt = Math.round(22 + (d / max) * 76), y = 120 - hgt, x = 6 + i * 45;
    const fill = i < 5 ? (i === 4 ? "#33A7D8" : "#3BD6C9") : "#5B8CFF";
    return `<rect x="${x}" y="${y}" width="32" height="${hgt}" rx="5" fill="${fill}"/>`;
  }).join("");
}
// Category operating-cost ratio (modeled total monthly cost as a share of
// projected revenue): thin-margin food highest, fitness lowest.
function sv3CostRatio(rawBusiness) {
  return { food: 0.9, cafe: 0.86, bar: 0.82, gym: 0.74, retail: 0.84 }[sv3Bucket(rawBusiness)] || 0.85;
}
function sv3RevCostSVG(beMonth, costFrac) {
  const be = Math.max(3, Math.min(24, beMonth || 14));
  const x = Math.round((be / 24) * 320);
  // Flat-ish cost line whose height reflects the modeled cost level
  // relative to the high-revenue endpoint (y=22 high … y=128 baseline).
  const cf = Math.max(0.25, Math.min(0.85, costFrac || 0.6));
  const yCost = Math.round(128 - (128 - 22) * cf);
  const cy = yCost;
  const costLine = `M0,${yCost + 6} L320,${yCost - 6}`;
  const rev = `M0,128 C${Math.round(x * 0.55)},122 ${Math.round(x * 0.9)},${cy + 8} ${x},${cy} C${Math.round(x + (320 - x) * 0.4)},${cy - 26} ${Math.round(x + (320 - x) * 0.78)},30 320,22`;
  return { x, cy, rev, costLine };
}
function sv3SeasonSVG(rawBusiness, score) {
  const patterns = {
    cafe: [.62, .56, .66, .72, .76, .72, .66, .66, .76, .82, .78, .84],
    bar: [.5, .48, .6, .7, .82, .9, .86, .84, .82, .78, .7, .9],
    gym: [1, .96, .86, .72, .6, .5, .46, .46, .62, .72, .7, .6],
    food: [.5, .46, .66, .76, .86, .92, .82, .8, .86, .72, .56, .62],
    retail: [.5, .46, .56, .62, .66, .62, .6, .66, .72, .78, .92, 1]
  };
  const base = patterns[sv3Bucket(rawBusiness)] || patterns.retail;
  const amp = 0.6 + Math.max(0, Math.min(100, score)) / 250;
  return base.map((v, i) => {
    const val = Math.max(0.12, Math.min(1, v * amp));
    const hgt = Math.round(18 + val * 90), y = 110 - hgt, x = 2 + i * 26;
    const fill = val >= 0.8 ? "#4ADE80" : val >= 0.58 ? "#3BD6C9" : val >= 0.4 ? "#33A7D8" : "#5B8CFF";
    return `<rect x="${x}" y="${y}" width="20" height="${hgt}" rx="4" fill="${fill}"/>`;
  }).join("");
}

/* ---------- v4 section data (modeled from real signals; honest labels) ---------- */
function sv3Money(n) { return "$" + Math.round(n).toLocaleString(); }
function sv3CostStructure(bucket) {
  return {
    food: { cogs: .30, labor: .30, util: .06, mkt: .07, ticket: 32, label: "full-service" },
    cafe: { cogs: .32, labor: .27, util: .06, mkt: .06, ticket: 9, label: "café" },
    bar: { cogs: .25, labor: .25, util: .07, mkt: .07, ticket: 28, label: "bar" },
    gym: { cogs: .10, labor: .38, util: .08, mkt: .08, ticket: 55, label: "fitness" },
    retail: { cogs: .55, labor: .15, util: .05, mkt: .05, ticket: 38, label: "retail" }
  }[bucket] || { cogs: .30, labor: .28, util: .06, mkt: .07, ticket: 30, label: "operator" };
}
function sv3PnL(baseRev, rentDollars, bucket) {
  const cs = sv3CostStructure(bucket);
  const cogs = baseRev * cs.cogs, labor = baseRev * cs.labor, util = baseRev * cs.util, mkt = baseRev * cs.mkt, rent = rentDollars;
  const net = baseRev - cogs - labor - rent - util - mkt;
  const marginPct = baseRev > 0 ? Math.round((net / baseRev) * 100) : 0;
  const pct = (v) => baseRev > 0 ? Math.max(0, Math.round((v / baseRev) * 100)) : 0;
  return { baseRev, cogs, labor, rent, util, mkt, net, marginPct, catLabel: cs.label,
    stack: { cogs: pct(cogs), labor: pct(labor), rent: pct(rent), util: pct(util), mkt: pct(mkt), profit: Math.max(0, pct(net)) } };
}
function sv3CashToOpen(bucket, rentDollars) {
  const food = bucket === "food" || bucket === "cafe" || bucket === "bar";
  // Operating reserve is anchored to fixed rent (≈4 months of rent + a floor),
  // not full labor/COGS which scale with sales — keeps it realistic.
  const reserve = Math.round(Math.max(40000, rentDollars * 4));
  const items = [
    ["Buildout & renovation", food ? 95000 : 55000],
    ["Equipment & fit-out", food ? 70000 : 35000],
    ["Security deposit (3 mo rent)", Math.round(rentDollars * 3)],
    ["Permits & licenses", food ? 18000 : 6000],
    ["Initial inventory & supplies", bucket === "retail" ? 40000 : food ? 22000 : 12000],
    ["Operating reserve", reserve]
  ];
  const total = items.reduce((s, i) => s + i[1], 0);
  return { items, low: total, high: Math.round(total * 1.18) };
}
function sv3PermitRoadmap(bucket) {
  const base = [["Business Certificate / EIN", "~$100", "1–2 wks"]];
  let steps;
  if (bucket === "food" || bucket === "cafe") steps = [...base,
    ["DOH Food Service Establishment Permit", "~$280", "2–4 wks"],
    ["Liquor License (SLA, if serving)", "$4,500+", "3–6 mo"],
    ["DOB permits (buildout / venting)", "varies", "4–12 wks"],
    ["Sidewalk Café Permit (optional)", "~$1,050", "varies"]];
  else if (bucket === "bar") steps = [...base,
    ["DOH Food Service Permit", "~$280", "2–4 wks"],
    ["Liquor License (SLA)", "$4,500+", "3–6 mo"],
    ["DOB permits (buildout)", "varies", "4–12 wks"]];
  else if (bucket === "gym") steps = [...base,
    ["DCWP Business License", "~$150", "2–4 wks"],
    ["DOB permits (buildout / assembly)", "varies", "4–10 wks"],
    ["Certificate of Occupancy update", "varies", "varies"]];
  else steps = [...base,
    ["DCWP Business License (if regulated)", "~$150", "2–4 wks"],
    ["DOB permits (buildout / signage)", "varies", "3–8 wks"]];
  return { steps, total: (bucket === "food" || bucket === "cafe" || bucket === "bar") ? "~3–6 months" : "~1–3 months" };
}
function sv3ScenariosData(revLowNum, revHighNum, rentDollars, bucket) {
  const cs = sv3CostStructure(bucket);
  const varRatio = cs.cogs + cs.labor + cs.util + cs.mkt;
  const profitAt = (revK) => Math.round(revK * 1000 * (1 - varRatio) - rentDollars);
  return {
    worst: { profit: profitAt(revLowNum * 0.9), prob: 25, note: "Slow ramp; competition wins out." },
    base: { profit: profitAt((revLowNum + revHighNum) / 2), prob: 50, note: "Hits modeled revenue & cost targets." },
    best: { profit: profitAt(revHighNum), prob: 25, note: "Strong concept; beats the foot-traffic model." }
  };
}
function sv3WhatToBeTrue(rentDollars, bucket) {
  const cs = sv3CostStructure(bucket);
  const varRatio = cs.cogs + cs.labor + cs.util + cs.mkt;
  const breakevenRev = rentDollars / (1 - varRatio);
  return { custPerDay: Math.max(10, Math.round(breakevenRev / cs.ticket / 26)), ticket: cs.ticket };
}
function sv3DiningDemand(businessResult, hourly) {
  const gp = businessResult && businessResult.googlePlaces;
  const count = safeNumber(gp && gp.count, 0);
  const reviews = safeNumber(gp && gp.reviewCount, 0);
  const rating = safeNumber(gp && gp.avgRating, 0);
  let score = Math.round(Math.min(98, 24 + Math.min(40, count * 2) + Math.min(24, Math.log10(reviews + 1) * 8) + rating * 2));
  if (!count && !reviews) score = 0;
  const label = score >= 72 ? "Busy" : score >= 45 ? "Moderate" : score ? "Quiet" : "Limited data";
  const avg = (a, b) => { if (!Array.isArray(hourly)) return null; let s = 0, n = 0; for (let h = a; h <= b; h++) { s += hourly[h] || 0; n++; } return n ? s / n : null; };
  const dinnerV = hourly ? Math.round((avg(18, 21) || 0) * 100) : Math.min(95, score + 10);
  const lunchV = hourly ? Math.round((avg(12, 14) || 0) * 100) : Math.max(40, score - 7);
  const brunchV = hourly ? Math.round((avg(10, 13) || 0) * 100) : Math.max(45, score - 2);
  const hardest = (gp && gp.topPlaces || []).slice().sort((a, b) => safeNumber(b.reviews, 0) - safeNumber(a.reviews, 0)).slice(0, 3);
  const maxRev = Math.max(1, ...hardest.map((p) => safeNumber(p.reviews, 0)));
  return { score, label, dinnerV, lunchV, brunchV, hourlyReal: Array.isArray(hourly), count,
    hardest: hardest.map((p) => ({ name: p.name || "Operator", pct: Math.max(35, Math.round(safeNumber(p.reviews, 0) / maxRev * 100)) })) };
}
function sv3Survival(bucket, pressure) {
  const baseline = { food: 60, cafe: 60, bar: 55, gym: 62, retail: 65 }[bucket] || 60;
  const pct = Math.max(30, Math.min(85, Math.round(baseline - (sv3Pct(pressure) - 50) * 0.35)));
  return { pct, baseline, ok: pct >= baseline };
}

function sv3MarketHTML(ctx) {
  const areaBars = [
    sv3BarRow("Population density", ctx.profile.density, sv3Pct(ctx.profile.density) >= 55 ? "g" : "a"),
    sv3BarRow("Income strength", ctx.profile.income, sv3Pct(ctx.profile.income) >= 60 ? "g" : "a"),
    sv3BarRow("Transit access", ctx.profile.transit, sv3Pct(ctx.profile.transit) >= 70 ? "g" : "a"),
    `<div class="bar-row"><div class="bl"><span class="bn">Cost pressure</span><span class="bv">${escapeText(sv3CostLevel(ctx.profile.rent))}</span></div><div class="track"><div class="fill ${sv3Pct(ctx.profile.rent) <= 45 ? "g" : "a"}" style="width:${sv3Pct(ctx.profile.rent)}%"></div></div></div>`
  ].join("");
  const concepts = ctx.conceptCards || "";
  const competitors = ctx.competitorCards || "";
  const cuisine = ctx.cuisineRows || "";
  return `
    <div class="section-label" style="margin-top:20px"><span class="n">04</span> Area read</div>
    <div class="card">${areaBars}<div class="src">NYC Open Data · Census ACS · MTA transit feeds</div></div>
    <div class="section-label"><span class="n">05</span> Market map · ${escapeText(ctx.radiusLabel)}</div>
    <div class="map sv3-livemap"><div id="sv3-market-map" class="sv3-mapcanvas"></div>
      <div class="legend"><span class="lg"><span class="d" style="background:#5B8CFF"></span>${escapeText(ctx.mapCenterLabel)}</span><span class="lg"><span class="d" style="background:#FF6B6B"></span>Competitors (in radius)</span><span class="lg"><span class="d" style="background:#64748B"></span>Nearby</span><span class="lg"><span class="d" style="background:#39C2D6"></span>Analysis radius</span></div>
    </div>
    <div class="src" style="margin:-4px 2px 8px">MapLibre · OpenFreeMap · ${ctx.mapCount} live Google Places + NYC competitor pins</div>
    <div class="section-label"><span class="n">06</span> Business fit in this area</div>
    <div class="card accent"><div class="sub">Market pressure</div><div class="big">${ctx.pressureScore}</div><div class="desc">${escapeText(ctx.business)} market pressure — built from local market activity, competitive signals &amp; demand momentum.</div><div class="bar-row" style="margin-top:14px"><div class="bl"><span class="bn">Saturation</span><span class="bv">${escapeText(ctx.pressureLabel)}</span></div><div class="track"><div class="fill a" style="width:${ctx.pressureScore}%"></div></div></div></div>
    <div class="card"><div class="sub">Local vs chain</div><h3>${escapeText(ctx.localChainTitle)}</h3><div class="desc">${escapeText(ctx.localChainCopy)}</div></div>
    <div class="card"><div class="sub">Recommendation</div><h3>${escapeText(ctx.recommendationTitle)}</h3><div class="desc">${escapeText(ctx.recommendationCopy)}</div></div>
    <div class="section-label"><span class="n">07</span> Concept intelligence</div>
    ${concepts}
    <div class="section-label"><span class="n">08</span> Best nearby competitive examples</div>
    ${competitors}
    <div class="src" style="margin:-4px 2px 8px">Google Places · Yelp Fusion API</div>
    <div class="section-label"><span class="n">09</span> Foot traffic intelligence</div>
    ${sv3NearestTransitCard(ctx)}
    ${sv3ConstructionCard(ctx)}
    <div class="card accent"><div class="sub">${ctx.ftReal ? "Live signal · MTA ridership near this point" : "Modeled estimate · SpotVest location model"}</div><div class="k" style="margin-top:4px">Foot traffic score</div><div class="big" style="color:var(--teal-bright)">${ctx.ftScore}<span style="font-size:16px;color:var(--txt-3)">/100</span></div><div class="desc">Estimated activity: ${escapeText(ctx.ftActivity)}. ${ctx.ftReal ? "Derived from MTA subway ridership near this location." : "Modeled from area density, transit, and commercial activity."}</div></div>
    <div class="duo"><div class="metric"><div class="k">Est. daily visitors</div><div class="v" style="font-size:16px">${escapeText(ctx.ftVisitors)}</div><div class="src" style="margin-top:4px">${escapeText(ctx.ftVisitorsTag || "MODELED RANGE")}</div></div><div class="metric"><div class="k">Walkability</div><div class="v">${ctx.ftWalk}<span class="u">/100</span> <span class="src" style="display:inline">MODELED</span></div></div></div>
    <div class="card"><div class="statline"><span class="sl">Peak hours</span><span class="sv">${escapeText(ctx.ftPeak)}</span></div><div class="statline"><span class="sl">Weekday / weekend split</span><span class="sv">${escapeText(ctx.ftSplit)}</span></div><div class="src">Modeled · SpotVest mobility model (peak hours &amp; split)</div></div>
    <div class="card"><div class="sub">Foot traffic by hour</div><div class="chart" style="position:relative">${ctx.ftReal ? "" : `<span class="peaktag" style="left:34%;top:-2px">Lunch peak</span><span class="peaktag" style="left:72%;top:-2px">Dinner peak</span>`}<svg viewBox="0 0 320 130" style="margin-top:14px"><line class="gl" x1="0" y1="30" x2="320" y2="30"/><line class="gl" x1="0" y1="65" x2="320" y2="65"/><line class="gl" x1="0" y1="100" x2="320" y2="100"/>${ctx.footHourSVG}</svg><div style="display:flex;justify-content:space-between" class="axlab"><span>6a</span><span>9a</span><span>12p</span><span>3p</span><span>6p</span><span>9p</span><span>12a</span></div></div><div class="src">${ctx.ftReal ? "Live · MTA subway ridership by hour near this location (Dec 2024)" : "Modeled · category day-pattern scaled by area foot-traffic"}</div></div>
    <div class="card"><div class="sub">Weekday vs weekend demand</div><div class="chart"><svg viewBox="0 0 320 120"><g>${ctx.weekSVG}</g></svg><div style="display:flex;justify-content:space-between" class="axlab"><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span><span>S</span></div></div><div class="legend-row"><span class="li"><span class="sw" style="background:#3BD6C9"></span>Weekday</span><span class="li"><span class="sw" style="background:#5B8CFF"></span>Weekend</span></div></div>
    <div class="card"><div class="sub">Category saturation nearby</div>${cuisine}<div class="src">Google Places density · ${escapeText(ctx.radiusLabel)}</div></div>
    ${sv3DiningHTML(ctx)}`;
}

function sv3DiningHTML(ctx) {
  const d = ctx.dining || {};
  const lvl = (v) => v >= 80 ? "Very busy" : v >= 60 ? "Busy" : v >= 40 ? "Moderate" : "Quiet";
  const cls = (v) => v >= 60 ? "g" : "a";
  const bar = (name, v) => `<div class="bar-row"><div class="bl"><span class="bn">${name}</span><span class="bv">${lvl(v)}</span></div><div class="track"><div class="fill ${cls(v)}" style="width:${Math.max(8, Math.min(100, v))}%"></div></div></div>`;
  const hardest = (d.hardest || []).length
    ? `<div class="card"><div class="sub">Busiest nearby restaurants</div>${d.hardest.map((h) => `<div class="demo-row"><span class="dl" style="min-width:110px">${escapeText(h.name)}</span><div class="dtrack"><div class="dfill" style="width:${h.pct}%"></div></div><span class="dv" style="color:${h.pct >= 80 ? "var(--green)" : "var(--amber)"}">${h.pct}%</span></div>`).join("")}<div class="desc">Ranked by Google review volume — a popularity proxy, not live table availability. Higher = stronger established demand, but also stronger competition.</div><div class="src">Google Places · review volume (popularity proxy)</div></div>`
    : "";
  return `
    <div class="section-label"><span class="n">10</span> Area dining demand</div>
    <div class="card accent">
      <div class="sub">How busy nearby restaurants are at peak</div>
      <div class="big" style="color:var(--teal-bright)">${escapeText(d.label || "Limited data")}<span style="font-size:15px;color:var(--txt-3)"> · ${safeNumber(d.score, 0)}/100</span></div>
      <div class="desc">Modeled from nearby restaurant density, Google review volume${d.hourlyReal ? " and real MTA ridership by hour" : ""}. Strong nearby demand means diners already come to this area — a positive signal for a new food concept.</div>
      ${bar("Dinner (6–9pm)", safeNumber(d.dinnerV, 0))}
      ${bar("Lunch (12–2pm)", safeNumber(d.lunchV, 0))}
      ${bar("Late morning / brunch", safeNumber(d.brunchV, 0))}
      <div class="src">${d.hourlyReal ? "Google Places density · MTA ridership by hour · 0.5 mi" : "Google Places density · area foot-traffic · 0.5 mi"}</div>
    </div>
    ${hardest}`;
}

function sv3RiskHTML(ctx) {
  const risks = (ctx.topRisks.length ? ctx.topRisks : ["No severe risk signals detected yet."]).slice(0, 4).map(sv3RiskCardV3).join("");
  const succeed = (ctx.strongScores.length ? ctx.strongScores : ctx.scores.slice(0, 3)).slice(0, 3).map(sv3MiniCard).join("");
  const conditions = (ctx.conditions.length ? ctx.conditions : ["Verify site economics before committing."]).map(sv3SplitLabel).join("");
  const verify = (ctx.missing.length ? ctx.missing : ["Dwell time, parking, rent, buildout cost, and operator financials need on-site confirmation."]).map((t) => `<li>${escapeText(t)}</li>`).join("");
  const alts = ctx.alternativeCards || "";
  const s = ctx.survival || {};
  const p = ctx.permit || { steps: [], total: "—" };
  const permitRows = p.steps.map((step, i) => `<div class="permit"><div class="pnum">${i + 1}</div><div class="pmid"><div class="pname">${escapeText(step[0])}</div><div class="pmeta"><span><b>${escapeText(step[1])}</b></span><span><b>${escapeText(step[2])}</b></span></div></div></div>`).join("");
  return `
    <div class="section-label" style="margin-top:20px"><span class="n">11</span> Risk register</div>
    ${risks}
    <div class="src" style="margin:-4px 2px 8px">NYC 311 complaints · DOB permits · Health inspections</div>
    <div class="section-label"><span class="n">12</span> Why this may succeed</div>
    <div class="card">${succeed}</div>
    <div class="section-label"><span class="n">13</span> Conditions for success</div>
    <div class="card"><ul class="bullets">${conditions}</ul></div>
    <div class="section-label"><span class="n">14</span> Needs verification</div>
    <div class="card"><ul class="bullets">${verify}</ul></div>
    <div class="section-label"><span class="n">15</span> Better alternatives</div>
    ${alts}
    <div class="section-label"><span class="n">16</span> Viability benchmark</div>
    <div class="survival">
      <div class="k" style="font-size:11px;letter-spacing:1.5px;font-weight:700;text-transform:uppercase;color:var(--txt-3);margin-bottom:6px">Modeled viability benchmark · ${escapeText(ctx.business.toLowerCase())} · ${escapeText(ctx.profile.name || "this area")}</div>
      <div class="surv-big ${s.ok ? "ok" : "warn"}">${safeNumber(s.pct, 55)}%</div>
      <div class="survbar">
        <span class="live" style="width:${safeNumber(s.pct, 55)}%">${safeNumber(s.pct, 55)}% lower risk</span>
        <span class="closed" style="width:${100 - safeNumber(s.pct, 55)}%">${100 - safeNumber(s.pct, 55)}% pressure</span>
      </div>
      <div class="surv-vs"><span>More viable</span><span>More pressure</span></div>
      <div class="desc" style="margin-top:12px"><b>Modeled benchmark — not a measured survival rate.</b> This is a directional screen from category sensitivity and local market pressure. SpotVest does not currently have a validated survival outcome model for this ZIP; treat this as diligence guidance, not proof of survival.</div>
      <div class="src">Modeled · category sensitivity × local saturation</div>
    </div>
    <div class="section-label"><span class="n">17</span> Permit &amp; licensing roadmap</div>
    ${permitRows}
    <div class="permit-total"><span class="ptl">Est. time to legally open</span><span class="ptv">${escapeText(p.total)}</span></div>
    <div class="src" style="margin-top:10px">Typical NYC steps · DOH / SLA / DOB / DCWP · confirm current fees with each agency</div>`;
}

function sv3ProfitK(n) { return `${n >= 0 ? "+" : "−"}$${Math.abs(Math.round(n / 1000))}k`; }
function sv3PnLHTML(ctx) {
  const p = ctx.pnl || {}, c = ctx.cashOpen || { items: [] }, s = ctx.scenarios || {}, w = ctx.wtbt || {};
  const st = p.stack || {};
  const costRow = (color, label, val) => `<div class="prow cost"><span class="pl"><span class="pc" style="background:${color}"></span>${label}</span><span class="pv">−${sv3Money(val)}</span></div>`;
  const scen = (cls, color, title, o) => `<div class="scen ${cls}"><div class="stt">${title}</div><div class="sval" style="color:${color}">${sv3ProfitK(o.profit || 0)}</div><div class="sprob">${o.prob}% likely</div><div class="snote">${escapeText(o.note)}</div></div>`;
  return `
    <div class="section-label"><span class="n">19</span> Monthly profit &amp; loss · base case</div>
    <div class="pnl">
      <div class="prow rev"><span class="pl"><span class="pc" style="background:#4ADE80"></span>Projected revenue</span><span class="pv">${sv3Money(p.baseRev)}</span></div>
      ${costRow("#FF6B6B", "COGS / inventory", p.cogs)}
      ${costRow("#F5B544", "Labor", p.labor)}
      ${costRow("#5B8CFF", "Rent", p.rent)}
      ${costRow("#9B7BFF", "Utilities / insurance", p.util)}
      ${costRow("#FF8AB5", "Marketing / other", p.mkt)}
      <div class="prow profit"><span class="pl">Monthly profit</span><span class="pv${p.net < 0 ? " neg" : ""}">${p.net >= 0 ? "+" : "−"}${sv3Money(Math.abs(p.net))}</span></div>
      <div class="stackbar"><span style="width:${st.cogs}%;background:#FF6B6B"></span><span style="width:${st.labor}%;background:#F5B544"></span><span style="width:${st.rent}%;background:#5B8CFF"></span><span style="width:${st.util}%;background:#9B7BFF"></span><span style="width:${st.mkt}%;background:#FF8AB5"></span><span style="width:${st.profit}%;background:#4ADE80"></span></div>
      <div class="stack-key"><span class="sk"><span class="d" style="background:#FF6B6B"></span>COGS</span><span class="sk"><span class="d" style="background:#F5B544"></span>Labor</span><span class="sk"><span class="d" style="background:#5B8CFF"></span>Rent</span><span class="sk"><span class="d" style="background:#9B7BFF"></span>Utilities</span><span class="sk"><span class="d" style="background:#FF8AB5"></span>Marketing</span><span class="sk"><span class="d" style="background:#4ADE80"></span>Profit</span></div>
      <span class="margin-badge${p.marginPct < 8 ? " warn" : ""}">≈ ${p.marginPct}% net margin · ${p.marginPct >= 8 ? "healthy for " + p.catLabel : "thin — watch costs"}</span>
      <div class="desc" style="margin-top:12px">Revenue is from the SpotVest model; cost ratios are NYC ${escapeText(p.catLabel)} industry standards. Confirm real labor &amp; COGS with a CPA.</div>
      <div class="src">Revenue: SpotVest model · cost ratios: industry standard</div>
    </div>

    <div class="section-label"><span class="n">20</span> Cash needed to open</div>
    <div class="card accent">
      <div class="k">Modeled cash to open + reserve</div>
      <div class="cashbig">${sv3Money(c.low)}<span class="u"> – ${sv3Money(c.high)}</span></div>
      <div class="divider" style="margin:14px 0"></div>
      ${(c.items || []).map((i) => `<div class="cashitem"><span class="ci-l">${escapeText(i[0])}</span><span class="ci-v">${sv3Money(i[1])}</span></div>`).join("")}
      <div class="desc" style="margin-top:12px">Modeled planning range only. This is not live contractor, landlord, bank, or vendor pricing. Verify real rent, buildout, equipment, permits, working capital, and operator costs before signing.</div>
      <div class="src">Estimated planning model · category benchmarks, permit signals, and modeled rent pressure</div>
    </div>

    <div class="section-label"><span class="n">21</span> Scenarios · how the year could go</div>
    <div class="scen-grid">
      ${scen("bad", "var(--red)", "Worst case", s.worst || {})}
      ${scen("base", "var(--teal-bright)", "Base case", s.base || {})}
      ${scen("good", "var(--green)", "Best case", s.best || {})}
    </div>
    <div class="card" style="margin-top:4px"><div class="desc" style="margin-top:0">Modeled monthly profit by scenario, from the revenue range and cost sensitivity. ${(s.worst && s.worst.profit < 0) ? "The worst case loses money — keep the reserve and a rent-to-sales ceiling." : "Even the base case can be thin, so keep the reserve."}</div><div class="src">Modeled · revenue range × cost sensitivity</div></div>

    <div class="section-label"><span class="n">22</span> What would have to be true</div>
    <div class="card accent"><div class="desc" style="margin-top:0">To clear break-even you'd need roughly <b style="color:var(--teal-bright)">${w.custPerDay} customers/day</b> at a <b style="color:var(--teal-bright)">$${w.ticket} average ticket</b>, six days a week. ${ctx.ftReal ? "On a block with this much measured foot traffic, that capture rate is plausible — but it still depends on visibility and concept." : "Whether that capture rate is realistic depends on foot traffic, visibility and concept."}</div><div class="src">Derived · break-even ÷ avg ticket</div></div>`;
}
function sv3MoneyHTML(ctx) {
  const revLow = ctx.revenueLowK;
  const cost = ctx.costK;
  const aud = ctx.profile.audience || [];
  const profileCards = aud.map((row) => `<div style="margin-bottom:14px"><div class="cvt" style="font-size:13.5px;font-weight:650">${escapeText(row[0])}</div><div class="cvd" style="font-size:12px;color:var(--txt-3);margin-top:3px">${escapeText(row[1])}</div></div>`).join("");
  return `
    <div class="note" style="margin-top:18px"><b>Modeled estimates — not live financials.</b> SpotVest has live demographics and competition data, but not per-business revenue, costs, or seasonality. The figures below are projected from category economics, area income and the modeled local rent. Verify against real operator P&amp;Ls.</div>
    <div class="section-label"><span class="n">18</span> Cost vs revenue at a glance</div>
    <div class="cvr">
      <div class="cvr-row"><div class="lab"><span class="n">Projected revenue (low)</span><span class="v" style="color:var(--green)">${escapeText(revLow)}/mo</span></div><div class="tk"><div class="fl rev" style="width:100%"></div></div></div>
      <div class="cvr-row"><div class="lab"><span class="n">Est. total monthly cost</span><span class="v" style="color:var(--amber)">~${escapeText(cost)}/mo</span></div><div class="tk"><div class="fl cost" style="width:${ctx.costPct}%"></div></div></div>
      <div class="desc" style="margin-top:4px">Base-case projected revenue vs. estimated total monthly cost (modeled at ~${ctx.costPct}% of revenue for this category). Confirm real rent and labor before committing.</div>
    </div>
    ${sv3PnLHTML(ctx)}
    <div class="card"><div class="sub">Revenue vs cost · first 24 months</div><div class="chart"><svg viewBox="0 0 320 150" style="margin-top:8px"><line class="gl" x1="0" y1="35" x2="320" y2="35"/><line class="gl" x1="0" y1="75" x2="320" y2="75"/><line class="gl" x1="0" y1="115" x2="320" y2="115"/><path d="${ctx.revCost.costLine}" fill="none" stroke="#FF6B6B" stroke-width="2.5"/><path d="${ctx.revCost.rev}" fill="none" stroke="#4ADE80" stroke-width="2.5"/><line x1="${ctx.revCost.x}" y1="18" x2="${ctx.revCost.x}" y2="140" stroke="rgba(57,194,214,.4)" stroke-width="1.5" stroke-dasharray="4 4"/><circle cx="${ctx.revCost.x}" cy="${ctx.revCost.cy}" r="4.5" fill="#4FE3D8" stroke="#0c1120" stroke-width="2"/></svg><div style="position:relative"><span class="peaktag" style="left:${Math.max(8, Math.min(82, Math.round(ctx.revCost.x / 320 * 100)))}%;top:-2px;transform:translateX(-50%)">Break-even ≈ ${escapeText(ctx.breakevenShort)}</span></div><div style="display:flex;justify-content:space-between;margin-top:10px" class="axlab"><span>Mo 1</span><span>6</span><span>12</span><span>18</span><span>24</span></div></div><div class="legend-row"><span class="li"><span class="sw" style="background:#4ADE80"></span>Projected revenue</span><span class="li"><span class="sw" style="background:#FF6B6B"></span>Total cost</span></div><div class="src">Modeled planning estimate · verify real P&amp;L before using with a client</div></div>
    <div class="card whatif"><div class="sub">What-if · drag to test the deal</div>
      <div style="margin-top:12px"><div class="rng-lab"><span>Monthly rent</span><span class="rv" id="sv3-wf-rent-l">$18,000</span></div><input type="range" class="rng" id="sv3-wf-rent" min="8000" max="35000" step="500" value="18000"></div>
      <div style="margin-top:16px"><div class="rng-lab"><span>Size (sq ft)</span><span class="rv" id="sv3-wf-size-l">1,200</span></div><input type="range" class="rng" id="sv3-wf-size" min="500" max="4000" step="50" value="1200"></div>
      <div class="wf-out"><div class="wf-box"><div class="k">Projected revenue</div><div class="v" id="sv3-wf-rev">$102k–$171k</div></div><div class="wf-box"><div class="k">Break-even</div><div class="v" id="sv3-wf-be">14–28 mo</div></div><div class="wf-box"><div class="k">Rent % of sales</div><div class="v" id="sv3-wf-pct">6%</div></div><div class="wf-box"><div class="k">Verdict</div><div class="v" id="sv3-wf-verd" style="color:var(--amber)">Conditional</div></div></div>
      <div class="src">Live estimate · recalculated locally</div>
    </div>
    <div class="card"><div class="sub">Seasonality · projected demand by month</div><div class="chart"><svg viewBox="0 0 320 110"><g>${ctx.seasonSVG}</g></svg><div style="display:flex;justify-content:space-between" class="axlab"><span>J</span><span>F</span><span>M</span><span>A</span><span>M</span><span>J</span><span>J</span><span>A</span><span>S</span><span>O</span><span>N</span><span>D</span></div></div><div class="desc">Modeled from typical seasonality for this category — plan 2–3 months of runway for the slower months.</div><div class="src">Modeled estimate · category seasonality pattern</div></div>
    <div class="section-label"><span class="n">23</span> Revenue estimator · estimate only</div>
    <div class="card"><div class="statline"><span class="sl">Projected monthly revenue</span><span class="sv" style="color:var(--teal-bright)">${escapeText(ctx.revenueProjection)}</span></div><div class="statline"><span class="sl">Break-even estimate</span><span class="sv">${escapeText(ctx.revenueBreakeven)}</span></div><div class="statline"><span class="sl">Rent %</span><span class="sv">${escapeText(ctx.revenueRentPercent)}</span></div><div class="desc" style="margin-top:12px">${escapeText(ctx.revenueNote)}</div><div class="src">Modeled estimate · SpotVest unit-economics model (area income, rent &amp; category)</div></div>
    <div class="section-label"><span class="n">24</span> Customer profile</div>
    <div class="card">${profileCards}<div class="src">Census ACS 5-year · NYC Open Data</div></div>
    <div class="section-label"><span class="n">25</span> Market pulse</div>
    <div class="card"><div class="statline"><span class="sl">Foot traffic proxy</span><span class="sv" style="color:var(--green)">${escapeText(ctx.pulseFoot)}</span></div><div class="statline"><span class="sl">Customer spend</span><span class="sv" style="color:var(--amber)">${escapeText(ctx.pulseSpend)}</span></div><div class="statline"><span class="sl">Cost pressure</span><span class="sv" style="color:var(--green)">${escapeText(ctx.pulseCost)}</span></div></div>
    <div class="section-label"><span class="n">26</span> Local vs chain fit</div>
    <div class="card accent"><div class="sub">Operator quality matters more than brand type</div><div class="desc" style="margin-top:0">${escapeText(ctx.localChainCopy)}</div><div style="margin-top:16px"><div class="track" style="height:9px"><div class="fill g" style="width:${ctx.chainFitPct}%"></div></div><div style="display:flex;justify-content:space-between;font-size:11px;font-weight:600;color:var(--txt-3);margin-top:9px"><span>Local boutique</span><span>National chain</span></div></div></div>`;
}

function sv3MethodHTML(ctx) {
  const m = sv3DecisionMeta(ctx.decision);
  const breakdown = ctx.breakdownCards || "";
  const coverage = ctx.coverageCards || "";
  const verified = (ctx.methodVerified || []).map((t) => `<li>${escapeText(t)}</li>`).join("");
  const model = (ctx.methodModel || []).map((t) => `<li>${escapeText(t)}</li>`).join("");
  return `
    <div class="section-label" style="margin-top:20px"><span class="n">27</span> Decision rationale</div>
    <div class="card accent"><div class="sub" style="color:var(--teal)">${escapeText(m.word)}</div><div class="desc" style="margin-top:0">${escapeText(ctx.summary)}</div></div>
    <div class="section-label"><span class="n">28</span> Evidence quality</div>
    <div class="duo"><div class="metric"><div class="k">Viability score</div><div class="v">${ctx.score}<span class="u">/100</span></div></div><div class="metric good"><div class="k">Evidence confidence</div><div class="v">${ctx.confidence}<span class="u">/100</span></div></div></div>
    <div class="duo"><div class="metric good"><div class="k">Freshness</div><div class="v">${ctx.freshness}<span class="u">/100</span></div></div><div class="metric good"><div class="k">Source quality</div><div class="v">${ctx.sourceQuality}<span class="u">/100</span></div></div></div>
    <div class="section-label"><span class="n">29</span> Why ${ctx.score}/100?</div>
    ${breakdown}
    <div class="section-label"><span class="n">30</span> Evidence summary — what SpotVest used</div>
    ${coverage}
    <div class="section-label"><span class="n">31</span> Methodology</div>
    <div class="card"><div class="sub">Verified signals</div><ul class="bullets" style="margin-bottom:14px">${verified}</ul><div class="sub">Model insights</div><ul class="bullets" style="margin-bottom:14px">${model}</ul><div class="sub">Weighting</div><ul class="bullets"><li>Viability score weighted: Demand 25%, Customer fit 20%, Competition 15%, Financial 15%, Location 10%, Growth 10%, Risk 5%, then calibrated with risk gates.</li></ul><div class="src">SpotVest scoring engine · OpenAI narrative layer</div></div>`;
}

function renderSpotVestV3(profile, recommendations, analysis) {
  const refs = sv3Refs();
  if (!refs.app || !profile || !analysis) return;

  const businessResult = currentBusinessResult();
  const civicResult = currentCivicResult();
  const siteIntelResult = currentSiteIntelResult();
  const conceptFitResult = currentConceptFitResult();
  const decision = decisionFor(profile, recommendations, businessResult);
  const business = businessDisplayName(state.business || analysis.topRecommendation?.name || "business");
  const score = formatBadgeScore(analysis.successProbability);
  const confidence = formatBadgeScore(analysis.confidenceScore);
  const competitionCount = competitiveSetSize(businessResult);
  const pressure = competitionCount > 0 ? saturationFromCount(competitionCount, profile) : safeNumber(profile.competition, 50);
  const pressureLabel = saturationLabel(pressure);
  const scoreMap = Object.fromEntries(analysis.scores.map((item) => [item.name, item]));
  const strongScores = analysis.scores
    .filter((item) => safeNumber(item.value, 0) >= 62)
    .sort((a, b) => safeNumber(b.value, 0) - safeNumber(a.value, 0));

  // Sync the in-app search fields with current state
  // biztype is a typeable combobox (input + datalist): reflect the analyzed
  // business back into it (works for free-typed values too).
  if (refs.biztype) refs.biztype.value = state.business || refs.biztype.value || "";
  if (refs.zip) refs.zip.value = state.zip || refs.zip.value;
  if (refs.address && state.location?.address) refs.address.value = state.location.address;

  // Bottom line for the owner (composed from real signals). The "stronger fit"
  // claim uses the SAME engine: altTop only exists if its real success score is
  // higher than the current business (computed in computeRealAlternatives).
  const altTop = (Array.isArray(state.realAlternatives) && state.realAlternatives[0]) || null;
  const revRange = sv3ElText("revenue-projection") || elements.revenueProjection?.textContent || "";
  const bottomLine = `${escapeText(decision.copy)} ${competitionCount > 0 ? `There are about <b>${formatInteger(competitionCount)}</b> directly comparable operators nearby, so differentiation and site economics decide the outcome.` : "Competitive density is light, so demand proof and the exact block decide the outcome."}${altTop ? ` If the numbers don't hold, <b>${escapeText(altTop.name.toLowerCase())}</b> screens higher here (${altTop.score}/100 vs ${Number(score)}/100) — see Better alternatives.` : ""}`;

  // signal pills
  const signalPills = [
    sv3Pill("Demographics", state.liveProfiles[state.zip] ? "Verified" : "Estimated"),
    sv3Pill("Competition", businessResult?.googlePlaces || businessResult?.registryExact ? "Verified" : "Estimated"),
    sv3Pill("Mobility", siteIntelResult && !siteIntelResult.fallback ? "Verified" : "Modeled"),
    sv3Pill("Foot traffic", "Modeled"),
    sv3Pill("Risk signals", civicResult && !civicResult.fallback ? "Verified" : "Partial"),
    sv3Pill("Demand", businessResult?.demandMomentum?.available ? "Light" : "Estimated")
  ].join("");

  // concept gap cards (market)
  const conceptCards = conceptFitResult?.concepts?.length
    ? conceptFitResult.concepts.slice(0, 4).map((c) => sv3GapCard(c.score, c.verdict || c.label || "Concept", c.name || c.label || business, c.reason || c.note || "Validate positioning before committing.")).join("")
    : sv3GapCard(analysis.successProbability, "Screen result", business, "Concept-specific data is limited; broader market and competition signals were used.");

  // competitor cards (market)
  const places = (businessResult?.googlePlaces?.topPlaces || businessResult?.googlePlaces?.mapPlaces || []).filter((p) => p && p.name).slice(0, 3);
  const competitorCards = places.length ? places.map(sv3CompCard).join("") : `<div class="card"><div class="desc" style="margin-top:0">No nearby competitor records were returned for this exact search. Treat competition as directional.</div></div>`;

  // cuisine/category saturation rows (market) — from concept fit gaps
  const cuisineRows = conceptFitResult?.concepts?.length
    ? conceptFitResult.concepts.slice(0, 5).map((c) => {
        const s = sv3Pct(100 - safeNumber(c.score, 50));
        const lvl = s >= 70 ? "High" : s >= 45 ? "Med" : "Gap";
        const color = s >= 70 ? "var(--red)" : s >= 45 ? "var(--amber)" : "var(--green)";
        const grad = s >= 70 ? "linear-gradient(90deg,#FF6B6B,#F5B544)" : s >= 45 ? "linear-gradient(90deg,#F5B544,#FF8A5b)" : "var(--grad)";
        return `<div class="demo-row"><span class="dl">${escapeText(c.name || c.label || "Concept")}</span><div class="dtrack"><div class="dfill" style="width:${Math.max(18, s)}%;background:${grad}"></div></div><span class="dv" style="color:${color}">${lvl}</span></div>`;
      }).join("")
    : `<div class="demo-row"><span class="dl">${escapeText(business)}</span><div class="dtrack"><div class="dfill" style="width:${pressure}%;background:linear-gradient(90deg,#FF6B6B,#F5B544)"></div></div><span class="dv" style="color:var(--amber)">${escapeText(pressureLabel)}</span></div>`;

  // alternatives gap cards (risk) — REAL engine scores (successProbability),
  // only options that genuinely outscore the current business. Same source of
  // truth as the headline score; the number shown == running that business.
  const realAlts = Array.isArray(state.realAlternatives) ? state.realAlternatives : [];
  const alternativeCards = realAlts.length
    ? realAlts.map((alt, i) => sv3GapCard(alt.score, i === 0 ? "Stronger option" : "Alternative", `${alt.name} · ${alt.score}/100`, alt.note)).join("")
      + `<div class="card"><div class="desc" style="margin-top:0">Scores use the same engine as the headline (success probability at this exact location). A higher score can still be a high-risk, conditional bet — it's just the stronger relative option here.</div></div>`
    : `<div class="card"><div class="desc" style="margin-top:0">No other business type scored higher than <b>${escapeText(business)}</b> (${Number(score)}/100) at this location — it's the strongest screened option here.</div></div>`;

  // method: score breakdown (contribution per driver)
  const weightByName = {
    Demand: businessSuccessWeights.demand, "Customer fit": businessSuccessWeights.customerFit,
    Competition: businessSuccessWeights.competition, "Financial viability": businessSuccessWeights.financial,
    "Location quality": businessSuccessWeights.location, "Area momentum": businessSuccessWeights.growth, Risk: businessSuccessWeights.risk
  };
  const breakdownCards = analysis.scores.map((s) => {
    const delta = Math.round((safeNumber(s.value, 50) - 50) * (weightByName[s.name] || 0.1));
    const pos = delta >= 0;
    const copy = safeNumber(s.value, 50) >= 60 ? "Strong positive signal in selected area." : safeNumber(s.value, 50) >= 48 ? "Supportive signal, exact site economics still matter." : "Weak signal / risk factor for this business.";
    return `<div class="bd"><div><div class="bdl">${escapeText(s.name)}</div><div class="bds">${escapeText(copy)}</div></div><div class="bdv ${pos ? "pos" : "neg"}">${pos ? "+" : "−"}${Math.abs(delta)}</div></div>`;
  }).join("");

  // method: evidence coverage cov cards
  const liveProfile = Boolean(state.liveProfiles[state.zip]);
  const google = Boolean(businessResult?.googlePlaces);
  const demandSig = Boolean(businessResult?.demandMomentum?.available);
  const civic = Boolean(civicResult && !civicResult.fallback);
  const siteIntel = Boolean(siteIntelResult && !siteIntelResult.fallback);
  const localAct = Boolean(businessResult?.registryExact);
  const coverageCards = [
    sv3CovCard("Market demographics", "Income, age, households, rent pressure, renter profile & education are loaded.", liveProfile ? "Available" : "Estimated", liveProfile ? "ok" : "part"),
    sv3CovCard("Competitive signals", "Nearby operators surfaced with ratings, reviews & visibility.", google ? "Available" : "Partial", google ? "ok" : "part"),
    sv3CovCard("Consumer demand", "Demand momentum included as a light signal in the success score.", demandSig ? "Available" : "Weak demand", demandSig ? "ok" : "part"),
    sv3CovCard("Local market activity", "Verified local activity matches inform category pressure.", localAct ? "Available" : "Partial", localAct ? "ok" : "part"),
    sv3CovCard("Mobility & site signals", "Transit access, commercial mix, licenses & outdoor activity.", siteIntel ? "Available" : "Partial", siteIntel ? "ok" : "part"),
    sv3CovCard("Risk & development", "Quality-of-life, development activity & permit signals included.", civic ? "Available" : "Partial", civic ? "ok" : "part"),
    sv3CovCard("Decision report generation", "Optional client-ready memo only; core scoring still runs without it.", "Partial", "part"),
    sv3CovCard("Still needs verification", "Dwell time, rent, buildout cost, parking & operator financials.", "Manual check", "man")
  ].join("");

  // method narrative
  const verifiedGroup = (analysis.explainability || []).find((g) => g.type === "Verified Signals");
  const modelGroup = (analysis.explainability || []).find((g) => g.type === "Model Insights");

  // money values
  const revenueProjection = elements.revenueProjection?.textContent || "Run a location first";
  const revenueBreakeven = elements.revenueBreakeven?.textContent || "—";
  const revenueRentPercent = elements.revenueRentPercent?.textContent || "—";
  const revenueNote = elements.revenueNote?.textContent || "Modeled ranges — verify against operator P&Ls.";
  const revNums = revenueProjection.match(/\$([\d.,]+)\s*[kK]?/g) || [];
  const parseK = (s) => { const n = Number(String(s).replace(/[^\d.]/g, "")); return /k/i.test(s) ? n : n / 1000; };
  const revLowNum = revNums.length ? parseK(revNums[0]) : 0;            // $k/mo (modeled, low)
  const revHighNum = revNums.length > 1 ? parseK(revNums[1]) : revLowNum * 1.55;
  // Total monthly cost is modeled consistently from the revenue model using a
  // category operating-cost ratio (no invented multiplier).
  const costRatio = sv3CostRatio(state.business);
  const costNum = Math.round(revLowNum * costRatio);
  const revenueLowK = revLowNum ? `$${Math.round(revLowNum)}k` : "$—";
  const costK = revLowNum ? `$${costNum}k` : "$—";
  const costPct = revLowNum ? Math.max(35, Math.min(98, Math.round(costRatio * 100))) : 60;
  const costFrac = revHighNum ? Math.max(0.25, Math.min(0.85, costNum / revHighNum)) : 0.6;
  const beMatch = revenueBreakeven.match(/(\d+)/);
  const breakevenShort = beMatch ? `mo ${beMatch[1]}` : "mo 14";

  // ---- live market map data (real competitor coordinates) ----
  const mapPlaces = businessResult?.googlePlaces?.mapPlaces || [];
  const mapRecs = businessResult?.mapRecords || [];
  const rawPins = [...mapPlaces, ...mapRecs]
    .filter((p) => Number.isFinite(Number(p.lat)) && Number.isFinite(Number(p.lng)))
    .map((p) => ({ lng: Number(p.lng), lat: Number(p.lat) }));
  let mapCenter;
  if (state.location && Number.isFinite(Number(state.location.lng)) && Number.isFinite(Number(state.location.lat))) {
    mapCenter = [Number(state.location.lng), Number(state.location.lat)];
  } else if (rawPins.length) {
    mapCenter = [rawPins.reduce((s, p) => s + p.lng, 0) / rawPins.length, rawPins.reduce((s, p) => s + p.lat, 0) / rawPins.length];
  } else {
    mapCenter = [-73.985, 40.748];
  }
  const mapRadiusM = state.location?.radiusMeters || 805;
  const mapIsArea = !state.location;
  const mapComps = rawPins.slice(0, 80).map((p) => {
    const dx = (p.lng - mapCenter[0]) * 111320 * Math.cos(mapCenter[1] * Math.PI / 180);
    const dy = (p.lat - mapCenter[1]) * 110540;
    return { lng: p.lng, lat: p.lat, inRadius: Math.hypot(dx, dy) <= mapRadiusM };
  });
  sv3MarketMapData = { center: mapCenter, competitors: mapComps, radiusMeters: mapRadiusM, isArea: mapIsArea };

  // ---- chart inputs (modeled, vary per location/business) ----
  let seed = 2166136261; const seedStr = `${state.zip}|${state.business}`;
  for (let i = 0; i < seedStr.length; i++) { seed ^= seedStr.charCodeAt(i); seed = Math.imul(seed, 16777619); }
  seed = seed >>> 0;
  const ftScoreNum = Number((String(elements.footTrafficScore?.textContent || "").match(/\d+/) || [60])[0]);
  const weekdayPct = Number((String(elements.footTrafficWeekSplit?.textContent || "").match(/(\d+)\s*%/) || [0, 64])[1]) || 64;
  const beMonthMatch = String(revenueBreakeven).match(/(\d+)/);
  const beMonth = beMonthMatch ? Number(beMonthMatch[1]) : 14;

  // Real per-location foot traffic from MTA ridership (fetched async below).
  const centerKey = `${mapCenter[0].toFixed(3)},${mapCenter[1].toFixed(3)}`;
  const footReal = sv3FootReal && sv3FootReal.key === centerKey && sv3FootReal.real ? sv3FootReal : null;

  // ---- v4 sections: P&L, cash-to-open, scenarios, what-be-true, permit,
  // area dining, survival (modeled from real signals; honest labels) ----
  const bucket = sv3Bucket(state.business);
  const rentPctNum = Number((String(revenueRentPercent).match(/\d+/) || [0])[0]);
  const baseRev = Math.round(((revLowNum + revHighNum) / 2) * 1000);
  const rentNoteMatch = String(revenueNote).match(/\$([\d,]+)\s*\/?\s*mo/i);
  const rentDollars = rentNoteMatch ? Number(rentNoteMatch[1].replace(/,/g, "")) : Math.round((rentPctNum / 100) * baseRev) || Math.round(baseRev * 0.12);
  const pnl = sv3PnL(baseRev, rentDollars, bucket);
  const cashOpen = sv3CashToOpen(bucket, rentDollars);
  const scenarios = sv3ScenariosData(revLowNum, revHighNum, rentDollars, bucket);
  const wtbt = sv3WhatToBeTrue(rentDollars, bucket);
  const dining = sv3DiningDemand(currentBusinessResult(), footReal ? footReal.hourly : null);
  const survival = sv3Survival(bucket, pressure);
  const permit = sv3PermitRoadmap(bucket);

  const ctx = {
    pnl, cashOpen, scenarios, wtbt, dining, survival, permit,
    spaceLot: currentSiteIntelResult()?.pluto?.lot || null, // "The space itself" (display only)
    spaceAddressMode: Boolean(state.location?.lat && state.location?.lng),
    mtaNearby: (sv3NearbyTransit && state.location && sv3NearbyTransit.key === `${state.location.lat},${state.location.lng}`) ? sv3NearbyTransit.stations : [], // Nearest transit (display only)
    transitLoading: Boolean(sv3NearbyTransit && sv3NearbyTransit.loading && state.location && sv3NearbyTransit.key === `${state.location.lat},${state.location.lng}`),
    construction: (sv3NearbyConstruction && state.location && sv3NearbyConstruction.key === `${state.location.lat},${state.location.lng}`) ? sv3NearbyConstruction.data : null,
    constructionLoading: Boolean(sv3NearbyConstruction && sv3NearbyConstruction.loading && state.location && sv3NearbyConstruction.key === `${state.location.lat},${state.location.lng}`),
    point: state.location?.lat && state.location?.lng ? { lat: state.location.lat, lng: state.location.lng } : null,
    scoreReady: state.scoreReady !== false, // false only while live signals are still loading
    scoreUnavailable: state.scoreUnavailable === true, // real signals couldn't be confirmed
    profile, scores: analysis.scores, strongScores, decision: analysis.decision, decisionCopy: decision.copy,
    decisionNext: decision.next, business, score: Number(score), confidence: Number(confidence),
    confidenceLabel: analysis.confidenceScore >= 80 ? "HIGH" : analysis.confidenceScore >= 60 ? "GOOD" : "REVIEW",
    bottomLine, signalPills, summary: analysis.summary,
    whyHeadline: strongScores.length ? `${strongScores[0].name} is the strongest signal here.` : "Use this as a first-pass screen.",
    whyCopy: `${profile.name} — ${profile.affluenceLabel || "market demographics loaded"}. Strongest current fit is ${(recommendations[0]?.name || business).toLowerCase()}. Treat as a first-pass screen, then verify the exact block, frontage, cost terms, and live competitor data before recommending.`,
    conditions: analysis.conditions || [], missing: analysis.validation?.missing || [], topRisks: analysis.topRisks || [],
    radiusLabel: state.location ? `${state.location.radiusMiles || "0.5"} mi` : "ZIP area",
    pressureScore: sv3Pct(pressure), pressureLabel,
    localChainTitle: chainFitTitleSafe(profile), localChainCopy: chainFitCopySafe(profile),
    recommendationTitle: pressure >= 78 ? "Possible, but competition is heavy." : pressure >= 55 ? "Workable with the right concept." : "Open lane for a sharp operator.",
    recommendationCopy: `${business} is scored against local market structure. Validate category-specific competition, reviews, delivery demand, labor, buildout, and the exact block.`,
    conceptCards, competitorCards, cuisineRows, alternativeCards, breakdownCards, coverageCards,
    methodVerified: verifiedGroup ? verifiedGroup.items : [], methodModel: modelGroup ? modelGroup.items : [],
    ftReal: !!footReal,
    ftScore: footReal ? String(footReal.footPct) : (String(elements.footTrafficScore?.textContent || "").match(/\d+/) || ["60"])[0],
    ftActivity: footReal ? (footReal.footPct >= 74 ? "High" : footReal.footPct >= 48 ? "Medium" : "Low") : (elements.footTrafficActivity?.textContent || "Moderate").replace(/^Estimated Activity:\s*/i, "").replace(/\..*$/, ""),
    ftBacking: footReal ? "live MTA ridership near this location" : "modeled estimate",
    // Rounded to avoid false precision. Real MTA ridership is a verified proxy;
    // the modeled path is already an estimated range. Tagged honestly.
    ftVisitors: footReal
      ? `≈ ${(() => { const n = Number(footReal.footfall); return n >= 10000 ? Math.round(n / 1000) + "k" : n >= 1000 ? (Math.round(n / 100) / 10) + "k" : String(Math.round(n / 100) * 100); })()}/day`
      : (elements.footTrafficVisitors?.textContent || "—").replace(/\s*daily$/i, ""),
    ftVisitorsTag: footReal ? "VERIFIED · MTA ridership proxy" : "MODELED RANGE",
    ftWalk: (String(elements.footTrafficWalkability?.textContent || "").match(/\d+/) || ["60"])[0],
    ftPeak: elements.footTrafficPeaks?.textContent || "Morning / lunch / evening",
    ftSplit: (elements.footTrafficWeekSplit?.textContent || "").replace(/Weekday\s*/i, "").replace(/\s*\/\s*weekend\s*/i, " / ").replace(/\s*modeled split\.?$/i, "") || "64% / 36%",
    freshness: formatBadgeScore(analysis.validation.freshness), sourceQuality: formatBadgeScore(analysis.validation.sourceQuality),
    revenueProjection, revenueBreakeven, revenueRentPercent, revenueNote, revenueLowK, costK, costPct, breakevenShort,
    pulseFoot: sv3Level((String(elements.footTrafficScore?.textContent || "").match(/\d+/) || [String(safeNumber(profile.transit, 50))])[0]), pulseSpend: sv3Level(profile.income),
    pulseCost: safeNumber(profile.rent, 50) >= 70 ? "Elevated" : "Manageable",
    chainFitPct: sv3Pct(safeNumber(profile.chainFit, 50)),
    footHourSVG: sv3FootHourSVG(state.business, ftScoreNum, seed, footReal ? footReal.hourly : null),
    weekSVG: sv3WeekSVG(weekdayPct),
    revCost: sv3RevCostSVG(beMonth, costFrac),
    seasonSVG: sv3SeasonSVG(state.business, ftScoreNum),
    mapCenterLabel: state.location ? "Address" : "ZIP center",
    mapCount: mapComps.length
  };

  // Preserve the tab the user is currently on across late async re-renders;
  // only force the report/overview view when first entering from the search screen.
  const activeTab = refs.app.querySelector("[data-sv3-tab].on")?.dataset.sv3Tab || "overview";
  const showingReport = refs.screenReport?.classList.contains("show");
  const showingCompare = refs.screenCompare?.classList.contains("show");
  const showingPortfolio = refs.screenPortfolio?.classList.contains("show");

  // Only rewrite a tab when its content actually changed — this avoids
  // tearing down the live map / charts on every late async re-render.
  const setIf = (el, html) => { if (!el || el.__sv3html === html) return false; el.__sv3html = html; el.innerHTML = html; return true; };
  setIf(refs.tabOverview, sv3OverviewHTML(ctx));
  const marketChanged = setIf(refs.tabMarket, sv3MarketHTML(ctx));
  setIf(refs.tabRisk, sv3RiskHTML(ctx));
  setIf(refs.tabMoney, sv3MoneyHTML(ctx));
  setIf(refs.tabMethod, sv3MethodHTML(ctx));

  sv3BindActions();
  sv3InitWhatIf();
  if (marketChanged || !sv3MarketMap) sv3RenderMarketMap();
  if (showingPortfolio) {
    sv3RenderPortfolio();
  } else if (!showingReport && !showingCompare) {
    sv3ShowMain("report");
    sv3ShowTab("overview");
  } else {
    sv3ShowTab(activeTab);
  }

  // Fetch real MTA ridership + hourly profile for this location once. Do not
  // re-render the full report after the top-line decision is shown; late async
  // rerenders made overview numbers appear to keep changing after analysis.
  if (mapCenter && (!sv3FootReal || sv3FootReal.key !== centerKey)) {
    sv3LoadFootTraffic(mapCenter, centerKey, profile, recommendations, analysis);
  }
  // Nearest transit (display only): load 1-mile stations async; re-render the
  // card when it arrives. Does NOT gate or affect the score.
  if (state.location?.lat && state.location?.lng) {
    const tKey = `${state.location.lat},${state.location.lng}`;
    if (!sv3NearbyTransit || sv3NearbyTransit.key !== tKey) {
      sv3LoadNearbyTransit(state.location.lat, state.location.lng, tKey);
    }
    if (!sv3NearbyConstruction || sv3NearbyConstruction.key !== tKey) {
      sv3LoadNearbyConstruction(state.location.lat, state.location.lng, tKey);
    }
  }
}

async function sv3LoadFootTraffic(center, key, profile, recommendations, analysis) {
  try {
    const u = `/api/point?lng=${center[0]}&lat=${center[1]}&radius=805&business=all`;
    const d = await (await fetch(u)).json();
    // Only treat as real when the figure is backed by actual MTA ridership.
    sv3FootReal = { key, real: !!d.mtaSource, hourly: Array.isArray(d.hourly) ? d.hourly : null, footfall: safeNumber(d.footfall, 0), footPct: sv3Pct(d.footPct) };
    // Keep the cached mobility signal for the next render/tab refresh without
    // mutating the already-presented executive decision.
  } catch (e) {
    sv3FootReal = { key, real: false }; // mark attempted; keep modeled fallback
  }
}

function chainFitTitleSafe(profile) {
  const v = safeNumber(profile.chainFit, 50);
  if (v >= 64) return "Chain-friendly market";
  if (v <= 40) return "Local-first market";
  return "Mixed market";
}
function chainFitCopySafe() {
  return "Neither side has an automatic advantage. The exact block, signage, price point & operator quality matter more than brand type.";
}

function refreshSpotVestV3Money() { /* values are rebuilt with the Money tab; kept for compatibility */ }

async function generateClientDecisionReport() {
  // Compute the deterministic score here and send it so OpenAI explains it
  // rather than inventing its own numbers.
  let score = null;
  try {
    const profile = profileForZip(state.zip);
    if (profile) {
      const recs = buildRecommendations(profile);
      const a = buildInstitutionalAnalysis(profile, recs);
      score = {
        successProbability: clampScore(a.successProbability),
        confidenceScore: clampScore(a.confidenceScore),
        decision: a.decision,
        topRisks: (a.topRisks || []).slice(0, 4),
        conditions: (a.conditions || []).slice(0, 5),
        footTraffic: (elements.footTrafficActivity?.textContent || "").replace(/^Estimated Activity:\s*/i, "").trim() || (elements.footTrafficScore?.textContent || "").trim(),
        revenue: (elements.revenueProjection?.textContent || "").trim()
      };
    }
  } catch (e) { /* if scoring isn't ready, server will say evidence insufficient */ }
  const response = await fetch("/api/client-memo", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ zip: state.zip, business: state.business, score })
  });
  const result = await response.json().catch(() => ({}));
  if (!response.ok && result.memo) return { memo: result.memo, warning: result.error || "" };
  if (!response.ok) throw new Error(result.error || "Decision report failed");
  return { memo: result.memo || "No decision report returned.", warning: "" };
}

function renderSv3GeneratedDecisionReport(memo, warning = "") {
  const overview = document.getElementById("sv3-tab-overview");
  if (!overview) return;
  let panel = document.getElementById("sv3-generated-decision-report");
  if (!panel) {
    panel = document.createElement("div");
    panel.id = "sv3-generated-decision-report";
    panel.className = "card accent generated-decision-report";
    const actions = overview.querySelector(".actions");
    if (actions) actions.insertAdjacentElement("afterend", panel);
    else overview.appendChild(panel);
  }
  const paragraphs = String(memo || "")
    .split(/\n{2,}/)
    .map((part) => part.trim())
    .filter(Boolean)
    .slice(0, 12)
    .map((part) => `<p>${escapeText(part).replace(/\n/g, "<br>")}</p>`)
    .join("");
  panel.innerHTML = `
    <div class="sub">Generated decision report</div>
    <h3>Client-ready summary</h3>
    <div class="generated-report-copy">${paragraphs || "<p>No report text returned.</p>"}</div>
    ${warning ? `<div class="src">Service note: ${escapeText(warning)}</div>` : '<div class="src">Generated from SpotVest market signals</div>'}
  `;
  panel.scrollIntoView({ behavior: "smooth", block: "start" });
}

/* ---------- what-if slider (self-contained, like v3) ---------- */
function sv3InitWhatIf() {
  const rent = document.getElementById("sv3-wf-rent");
  const size = document.getElementById("sv3-wf-size");
  if (!rent || !size) return;
  if (rent.__wf) return; // already wired (tab not rebuilt)
  rent.__wf = 1;
  const recalc = () => {
    const r = Number(rent.value), s = Number(size.value);
    document.getElementById("sv3-wf-rent-l").textContent = "$" + r.toLocaleString();
    document.getElementById("sv3-wf-size-l").textContent = s.toLocaleString();
    const revLow = Math.round(s * 85), revHigh = Math.round(s * 142);
    document.getElementById("sv3-wf-rev").textContent = "$" + Math.round(revLow / 1000) + "k–$" + Math.round(revHigh / 1000) + "k";
    const pct = Math.round((r / revLow) * 100);
    document.getElementById("sv3-wf-pct").textContent = pct + "%";
    const beLow = Math.round(10 + r / 2200), beHigh = Math.round(beLow * 1.9);
    document.getElementById("sv3-wf-be").textContent = beLow + "–" + beHigh + " mo";
    const v = document.getElementById("sv3-wf-verd");
    if (pct <= 10) { v.textContent = "Go"; v.style.color = "var(--green)"; }
    else if (pct <= 18) { v.textContent = "Conditional"; v.style.color = "var(--amber)"; }
    else { v.textContent = "Caution"; v.style.color = "var(--red)"; }
  };
  rent.addEventListener("input", recalc);
  size.addEventListener("input", recalc);
  recalc();
}

/* ---------- overview action buttons -> existing handlers ---------- */
function sv3BindActions() {
  const map = {
    "export-pdf": "#export-pdf-button",
    "save": "#save-report-button",
    "copy": "#copy-link-button",
    "new": "#new-search-button"
  };
  const flash = (btn, text) => {
    if (btn.__flashing) return;
    btn.__flashing = true;
    const original = btn.innerHTML;
    btn.innerHTML = escapeText(text);
    window.setTimeout(() => { btn.innerHTML = original; btn.__flashing = false; }, 1500);
  };
  document.querySelectorAll("#sv3-app [data-sv3-action]").forEach((btn) => {
    if (btn.dataset.sv3Bound) return;
    btn.dataset.sv3Bound = "1";
    btn.addEventListener("click", () => {
      const action = btn.dataset.sv3Action;
      if (action === "refresh") {
        if (!state.zip) return;
        btn.disabled = true;
        btn.innerHTML = "Refreshing…";
        // Force-bypass the server's 7-day cache for this location, re-fetch the
        // live signals, and re-score. The fresh values re-lock for everyone.
        state.forceRefresh = true;
        state.lastBusinessResult = null;
        state.lastCivicResult = null;
        state.lastSiteIntelResult = null;
        state.lastConceptFitResult = null;
        try { delete state.liveProfiles[state.zip]; } catch {}
        try { render(state.zip, {}); } catch {}
        // Keep the flag on through the commit window (≤12s), then clear it so
        // later normal actions use the cache again.
        window.setTimeout(() => { state.forceRefresh = false; }, 15000);
        return;
      }
      if (action === "compare") {
        try { addToCompare(); } catch {}
        sv3RenderCompare();
        sv3ShowMain("compare");
        return;
      }
      if (action === "generate") {
        if (btn.disabled) return;
        const original = btn.innerHTML;
        btn.disabled = true;
        btn.innerHTML = "Generating…";
        generateClientDecisionReport()
          .then(({ memo, warning }) => {
            renderSv3GeneratedDecisionReport(memo, warning);
            btn.innerHTML = "Report ready ✓";
          })
          .catch(() => {
            renderSv3GeneratedDecisionReport("Could not generate the decision report right now. Check that the decision report service is connected, then try again.");
            btn.innerHTML = "Try again";
          })
          .finally(() => {
            window.setTimeout(() => {
              btn.disabled = false;
              btn.innerHTML = original;
            }, 1400);
          });
        return;
      }
      const sel = map[action];
      if (sel) document.querySelector(sel)?.click();
      // Visible confirmation in the redesigned UI (the underlying handlers
      // live on hidden legacy buttons, so without this the actions look dead).
      if (action === "copy") flash(btn, "Link copied ✓");
      else if (action === "save") flash(btn, (document.querySelector("#save-report-button")?.textContent || "").includes("Saved") ? "Saved ✓" : "Removed");
      else if (action === "export-pdf") flash(btn, "Opening print…");
    });
  });
}

/* ---------- compare view ---------- */
function sv3Short(text, n) {
  const s = String(text || "").trim();
  return s.length > n ? s.slice(0, n - 1).replace(/[ ,;:.]+$/, "") + "…" : s;
}
function sv3CompareCard(it, isWinner) {
  const sc = formatBadgeScore(it.successProbability);
  const scls = safeNumber(it.successProbability, 0) >= 70 ? "g" : "a";
  const loc = it.address || it.area || (it.zip ? `ZIP ${it.zip}` : "Location");
  return `<div class="cmp-col${isWinner ? " win" : ""}">
      <div class="cmp-head"><div class="ct">${escapeText(it.business || "Business")}</div><div class="cl">${escapeText(loc)}</div>${isWinner ? '<span class="winbadge">★ Best fit</span>' : ""}</div>
      <div class="cmp-score"><div class="s ${scls}">${sc}</div><div class="sl">${escapeText(it.decision || "Screened")}</div></div>
      <div class="cmp-rows">
        <div class="r"><span class="rl">Confidence</span><span class="rv">${formatBadgeScore(it.confidenceScore)}${it.confidenceLabel ? ` · ${escapeText(it.confidenceLabel)}` : ""}</span></div>
        <div class="r"><span class="rl">Competition</span><span class="rv">${escapeText(it.competition || "—")}</span></div>
        <div class="r"><span class="rl">ZIP</span><span class="rv">${escapeText(it.zip || "—")}</span></div>
        <div class="r" style="display:block"><span class="rl">Main risk</span><div class="rv" style="font-weight:600;margin-top:4px;line-height:1.4;text-align:left">${escapeText(sv3Short(it.mainRisk, 90))}</div></div>
      </div>
      <div style="padding:0 14px 14px"><button class="btn ghost sm" type="button" data-cmp-remove="${escapeText(it.id)}">Remove</button></div>
    </div>`;
}
function sv3BindCompareControls() {
  document.querySelector("#sv3-cmp-clear")?.addEventListener("click", () => { try { clearCompare(); } catch {} sv3RenderCompare(); });
  document.querySelectorAll("#sv3-compare-body [data-cmp-remove]").forEach((b) => {
    b.addEventListener("click", () => { try { removeFromCompare(b.dataset.cmpRemove); } catch {} sv3RenderCompare(); });
  });
}
function sv3RenderCompare() {
  const refs = sv3Refs();
  if (!refs.compareBody) return;
  // Winner: highest viability score; evidence confidence breaks ties.
  const ranked = (Array.isArray(state.compareList) ? state.compareList : []).slice()
    .sort((a, b) => safeNumber(b.successProbability, 0) - safeNumber(a.successProbability, 0)
      || safeNumber(b.confidenceScore, 0) - safeNumber(a.confidenceScore, 0));

  if (ranked.length < 2) {
    const hint = ranked.length === 1
      ? "One location is saved. Run another business or location, then tap <b>Add current report to compare</b> to rank them."
      : "Run an analysis, tap <b>Add current report to compare</b>, then add a second location to compare side by side.";
    refs.compareBody.innerHTML = `<div class="bottomline"><div class="bt">Compare locations</div><p>Add <b>two or more completed analyses</b> to compare. ${hint}</p></div>` +
      (ranked.length === 1 ? `<div class="cmp-grid">${sv3CompareCard(ranked[0], false)}</div>` : "");
    sv3BindCompareControls();
    return;
  }

  const winnerId = ranked[0].id;
  const winLoc = ranked[0].address || ranked[0].area || `ZIP ${ranked[0].zip}`;
  const summary = `<div class="bottomline"><div class="bt">Which location wins?</div><p><b>${escapeText(ranked[0].business)} · ${escapeText(winLoc)}</b> screens strongest at ${formatBadgeScore(ranked[0].successProbability)}/100, ahead of ${escapeText(ranked[1].business)} (${formatBadgeScore(ranked[1].successProbability)}). Highest viability score wins; evidence confidence breaks ties.</p></div>`;
  const cards = ranked.map((it) => sv3CompareCard(it, it.id === winnerId)).join("");
  refs.compareBody.innerHTML = summary + `<div class="cmp-grid">${cards}</div><div class="actions"><button class="btn ghost sm" type="button" id="sv3-cmp-clear">Clear all (${ranked.length})</button></div>`;
  sv3BindCompareControls();
}

/* ---------- portfolio (enterprise) ---------- */
function sv3GeoDistMi(a, b) {
  if (a.lat == null || a.lng == null || b.lat == null || b.lng == null) return null;
  const R = 3958.8, toRad = (d) => d * Math.PI / 180;
  const dLat = toRad(b.lat - a.lat), dLng = toRad(b.lng - a.lng);
  const s = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(s));
}
function sv3RenderPortfolio() {
  const refs = sv3Refs();
  if (!refs.portfolioBody) return;
  const list = (Array.isArray(state.compareList) ? state.compareList : []).slice()
    .sort((a, b) => safeNumber(b.successProbability, 0) - safeNumber(a.successProbability, 0) || safeNumber(b.confidenceScore, 0) - safeNumber(a.confidenceScore, 0));
  if (!list.length) {
    refs.portfolioBody.innerHTML = `<div class="bottomline"><div class="bt">No sites yet</div><p>Analyze a location and tap <b>Add to compare</b> to build a ranked portfolio. SpotVest scores every site and flags overlap between same-brand locations.</p></div>`;
    return;
  }
  const cls = (s) => s >= 70 ? "g" : s >= 45 ? "a" : "r";
  const go = list.filter((x) => safeNumber(x.successProbability, 0) >= 70).length;
  const cond = list.filter((x) => { const s = safeNumber(x.successProbability, 0); return s >= 45 && s < 70; }).length;
  const avoid = list.filter((x) => safeNumber(x.successProbability, 0) < 45).length;
  // Cannibalization: same-business sites within 0.6 mi (or same ZIP w/o coords).
  const overlaps = {}; let alertMsg = "";
  for (let i = 0; i < list.length; i++) for (let j = i + 1; j < list.length; j++) {
    const a = list[i], b = list[j];
    if (normalizeBusiness(a.business) !== normalizeBusiness(b.business)) continue;
    const d = sv3GeoDistMi(a, b);
    const near = d != null ? d < 0.6 : (a.zip && a.zip === b.zip);
    if (!near) continue;
    const pct = d != null ? Math.max(8, Math.round((0.6 - d) / 0.6 * 30)) : 15;
    overlaps[a.id] = Math.max(overlaps[a.id] || 0, pct); overlaps[b.id] = Math.max(overlaps[b.id] || 0, pct);
    if (!alertMsg) alertMsg = `Opening <b>${escapeText(b.address || b.area || ("ZIP " + b.zip))}</b> would pull an estimated <b>~${pct}%</b> of sales from <b>${escapeText(a.address || a.area || ("ZIP " + a.zip))}</b> ${d != null ? `${d.toFixed(1)} mi away` : "in the same ZIP"}.`;
  }
  const overlapCount = Object.keys(overlaps).length;
  const cann = overlapCount ? `<div class="cann"><div class="ct"><span class="d"></span>Cannibalization alert</div><div class="cm"><b>${overlapCount} site${overlapCount > 1 ? "s" : ""} overlap another in your portfolio.</b> ${alertMsg} Flagged below.</div></div>` : "";
  const sites = list.map((x, i) => {
    const s = safeNumber(x.successProbability, 0);
    const meta = [overlaps[x.id] ? `<span class="flag">⚠ Cannibalizes −${overlaps[x.id]}%</span>` : `<span class="ok">No overlap</span>`];
    if (x.rentLabel) meta.push(`<span>Rent ${escapeText(x.rentLabel)}</span>`);
    if (x.beLabel) meta.push(`<span>BE ${escapeText(x.beLabel)}</span>`);
    meta.push(`<span>Conf ${formatBadgeScore(x.confidenceScore)}</span>`);
    const loc = x.address || x.area || (x.zip ? `ZIP ${x.zip}` : "Location");
    return `<div class="site${i === 0 ? " win" : ""}">${i === 0 ? '<span class="crown">Top pick</span>' : ""}<span class="rank">${i + 1}</span><span class="sc ${cls(s)}">${formatBadgeScore(s)}</span><div class="si"><div class="sn">${escapeText(x.business)}</div><div class="sa">${escapeText(loc)}</div><div class="smeta">${meta.join("")}</div></div><span class="chev">›</span></div>`;
  }).join("");
  refs.portfolioBody.innerHTML = `
    <div class="pf-head">
      <div class="pf-stat"><div class="v">${list.length}</div><div class="l">Sites</div></div>
      <div class="pf-stat"><div class="v" style="color:var(--green)">${go}</div><div class="l">Go</div></div>
      <div class="pf-stat"><div class="v" style="color:var(--amber)">${cond}</div><div class="l">Conditional</div></div>
      <div class="pf-stat"><div class="v" style="color:var(--red)">${avoid}</div><div class="l">Avoid</div></div>
    </div>
    ${cann}
    ${sites}`;
}

/* ---------- screen / tab controls ---------- */
function sv3ShowMain(name) {
  const refs = sv3Refs();
  if (!refs.app) return;
  const target = new Set(["input", "report", "compare", "portfolio"]).has(name) ? name : "input";
  [["input", refs.screenInput], ["report", refs.screenReport], ["compare", refs.screenCompare], ["portfolio", refs.screenPortfolio]].forEach(([key, el]) => {
    if (!el) return;
    el.classList.toggle("show", key === target);
    el.classList.toggle("hide", key !== target);
  });
  if (refs.tabbar) refs.tabbar.classList.toggle("hide", target !== "report");
  refs.app.querySelectorAll("[data-sv3-nav]").forEach((b) => b.classList.toggle("on", b.dataset.sv3Nav === target));
  if (target === "compare") sv3RenderCompare();
  if (target === "portfolio") sv3RenderPortfolio();
  try { window.scrollTo({ top: 0, behavior: "instant" }); } catch {}
}
function sv3ShowTab(name) {
  const refs = sv3Refs();
  if (!refs.app) return;
  ["overview", "market", "risk", "money", "method"].forEach((t) => {
    const el = document.getElementById("sv3-tab-" + t);
    if (el) el.classList.toggle("hide", t !== name);
  });
  refs.app.querySelectorAll("[data-sv3-tab]").forEach((b) => b.classList.toggle("on", b.dataset.sv3Tab === name));
  if (name === "market" && sv3MarketMap) { setTimeout(() => { try { sv3MarketMap.resize(); } catch (e) { /* ignore */ } }, 70); }
  try { window.scrollTo({ top: 0, behavior: "instant" }); } catch {}
}

let spotVestV3ControlsReady = false;
function initSpotVestV3Controls() {
  if (spotVestV3ControlsReady) return;
  const app = document.querySelector("#sv3-app");
  if (!app) return;
  spotVestV3ControlsReady = true;

  app.querySelectorAll("[data-sv3-tab]").forEach((button) => {
    button.addEventListener("click", () => { sv3ShowMain("report"); sv3ShowTab(button.dataset.sv3Tab); });
  });
  app.querySelectorAll("[data-sv3-nav]").forEach((button) => {
    button.addEventListener("click", () => { sv3ShowMain(button.dataset.sv3Nav); if (button.dataset.sv3Nav === "report") sv3ShowTab("overview"); });
  });
  document.querySelector("#sv3-close")?.addEventListener("click", () => sv3ShowMain("input"));
  document.querySelector("#sv3-assistant-button")?.addEventListener("click", () => { try { openAssistant(); } catch {} });
  document.querySelector("#sv3-compare-add")?.addEventListener("click", () => { try { addToCompare(); } catch {} sv3RenderCompare(); });
  document.querySelector("#sv3-compare-back")?.addEventListener("click", () => sv3ShowMain("report"));
  document.querySelector("#sv3-portfolio-clear")?.addEventListener("click", () => { try { clearCompare(); } catch {} sv3RenderPortfolio(); });
  document.querySelector("#sv3-portfolio-search")?.addEventListener("click", () => sv3ShowMain("input"));

  const syncFields = () => {
    const refs = sv3Refs();
    if (refs.biztype?.value && elements.businessInput) { elements.businessInput.value = refs.biztype.value; syncBusinessInput(); }
    if (refs.budget?.value && elements.budgetInput) elements.budgetInput.value = refs.budget.value;
  };
  const runArea = () => {
    const refs = sv3Refs();
    syncFields();
    const zip = (refs.zip?.value || "").trim();
    // Validate before switching to the report so a non-NYC ZIP shows a clear
    // message on the search screen instead of an empty report.
    if (!/^\d{5}$/.test(zip) || !boroughForZip(zip)) {
      if (refs.stepnote) refs.stepnote.textContent = /^\d{5}$/.test(zip)
        ? "🗽 SpotVest currently covers New York City only. Try a NYC ZIP like 10003, 11201, or 10458."
        : "Enter a 5-digit NYC ZIP code (for example 10003).";
      refs.zip?.focus();
      return;
    }
    if (elements.input) elements.input.value = zip;
    if (refs.stepnote) refs.stepnote.textContent = "Analyzing the area…";
    state.location = null;
    sv3ShowMain("report");
    elements.form?.requestSubmit();
  };
  const runAddress = () => {
    const refs = sv3Refs();
    syncFields();
    if (refs.address?.value?.trim() && elements.addressInput) elements.addressInput.value = refs.address.value.trim();
    if (refs.radius?.value && elements.radiusInput) elements.radiusInput.value = refs.radius.value;
    sv3ShowMain("report");
    elements.addressForm?.requestSubmit();
  };
  document.querySelector("#sv3-analyze-address")?.addEventListener("click", runAddress);
  document.querySelector("#sv3-analyze-area")?.addEventListener("click", runArea);
}
initSpotVestV3Controls();

function sourceStatus(connected, partial = false) {
  if (connected) return { label: "Available", className: "connected" };
  if (partial) return { label: "Partial", className: "partial" };
  return { label: "Needs proof", className: "needs-confirmation" };
}

function renderSourceMap(analysis) {
  if (!elements.sourceMapList) return;
  const businessResult = currentBusinessResult();
  const civicResult = currentCivicResult();
  const siteIntelResult = currentSiteIntelResult();
  const conceptFitResult = currentConceptFitResult();
  const rows = [
    {
      section: "Market demographics",
      key: "Market demographics signal",
      powers: "Population, income, age, education, household profile",
      status: sourceStatus(Boolean(state.liveProfiles[state.zip]))
    },
    {
      section: "Competition",
      key: "Local market activity + competitive visibility",
      powers: "Local business records, nearby competitors, ratings, reviews, visibility",
      status: sourceStatus(Boolean(businessResult?.registryExact && businessResult?.googlePlaces), Boolean(businessResult?.registryExact || businessResult?.googlePlaces))
    },
    {
      section: "Food concept fit",
      key: "Cuisine activity + nearby operator visibility",
      powers: "Cuisine-level activity and visible nearby restaurant matches",
      status: sourceStatus(Boolean(conceptFitResult?.concepts?.length))
    },
    {
      section: "Risk and development",
      key: "Local risk and development signals",
      powers: "Quality-of-life activity, construction permits, development momentum",
      status: sourceStatus(Boolean(civicResult && !civicResult.fallback))
    },
    {
      section: "Mobility and commercial mix",
      key: "Mobility and commercial mix signals",
      powers: "Transit proximity, license activity, outdoor dining, commercial mix",
      status: sourceStatus(Boolean(siteIntelResult && !siteIntelResult.fallback))
    },
    {
      section: "Consumer demand",
      key: "Consumer demand momentum",
      powers: "Directional demand momentum; lightly weighted in the score",
      status: sourceStatus(Boolean(businessResult?.demandMomentum?.available))
    },
    {
      section: "Exact address / radius",
      key: "Address and radius intelligence",
      powers: "Address lookup, coordinates, radius-based nearby analysis",
      status: sourceStatus(Boolean(state.location))
    },
    {
      section: "Decision report",
      key: "Decision report generation",
      powers: "Optional written client-ready memo only; core scoring still runs without it",
      status: sourceStatus(false, true)
    },
    {
      section: "Still needs verification",
      key: "Requires on-site or operator proof",
      powers: "Dwell time, rent, buildout cost, parking, and operator financials",
      status: { label: "Manual check", className: "manual" }
    }
  ];

  elements.sourceMapList.innerHTML = rows
    .map(({ section, key, powers, status }) => `
      <div class="source-map-row">
        <div>
          <strong>${escapeText(section)}</strong>
          <span>${escapeText(powers)}</span>
          <small>${escapeText(key)}</small>
        </div>
        <em class="source-map-status ${status.className}">${escapeText(status.label)}</em>
      </div>
    `)
    .join("");
}

function renderScoreDrivers(analysis) {
  if (!elements.scoreDriverList) return;
  const weights = {
    Demand: businessSuccessWeights.demand,
    "Customer fit": businessSuccessWeights.customerFit,
    Competition: businessSuccessWeights.competition,
    "Financial viability": businessSuccessWeights.financial,
    "Location quality": businessSuccessWeights.location,
    "Area momentum": businessSuccessWeights.growth,
    Risk: businessSuccessWeights.risk
  };
  const drivers = analysis.scores
    .map((score) => {
      const value = safeNumber(score.value, 50);
      const contribution = Math.round((value - 50) * (weights[score.name] || 0));
      return {
        name: score.name,
        contribution,
        why: scoreSignalCopy(score)
      };
    })
    .filter((driver) => driver.contribution !== 0)
    .sort((a, b) => Math.abs(b.contribution) - Math.abs(a.contribution))
    .slice(0, 6);

  elements.scoreDriverTitle.textContent = `Why ${formatScore(analysis.successProbability)}?`;
  elements.scoreDriverList.innerHTML = drivers.length
    ? drivers.map((driver) => `
      <div class="score-driver-row ${driver.contribution >= 0 ? "positive" : "negative"}">
        <span>${escapeText(driver.name)}</span>
        <strong>${driver.contribution >= 0 ? "+" : ""}${driver.contribution}</strong>
        <small>${escapeText(driver.why)}</small>
      </div>
    `).join("")
    : `<div class="empty-places">Needs more data before showing score drivers.</div>`;
}

function renderEvidenceCoverage(analysis) {
  if (!elements.evidenceSignalGrid) return;

  const businessResult = currentBusinessResult();
  const civicResult = currentCivicResult();
  const siteIntelResult = currentSiteIntelResult();
  const conceptFitResult = currentConceptFitResult();
  const liveProfile = Boolean(state.liveProfiles[state.zip]);
  const businessFallback = Boolean(businessResult?.fallback);
  const hasCompetitiveExamples = Boolean(businessResult?.googlePlaces?.topPlaces?.length);
  const hasLocalActivity = Boolean(businessResult?.registryExact);
  const hasDemandMomentum = Boolean(businessResult?.demandMomentum?.available);
  const hasSiteSignals = Boolean(siteIntelResult && !siteIntelResult.fallback);
  const hasRiskSignals = Boolean(civicResult && !civicResult.fallback);
  const hasConceptSignals = Boolean(conceptFitResult?.concepts?.length);
  const localMatches = safeNumber(businessResult?.count, null);

  const cards = [
    {
      title: "Market demographics",
      status: liveProfile ? "Available" : "Area model",
      tone: liveProfile ? "good" : "partial",
      copy: liveProfile
        ? "Income, age, households, rent pressure, renter profile, and education are loaded."
        : "Using area profile assumptions until fresh demographic signals return."
    },
    {
      title: "Competitive signals",
      status: hasCompetitiveExamples || hasLocalActivity ? "Available" : businessFallback ? "Estimated" : "Checking",
      tone: hasCompetitiveExamples || hasLocalActivity ? "good" : "partial",
      copy: hasCompetitiveExamples
        ? "Nearby operators surfaced with ratings, reviews, and location visibility."
        : hasLocalActivity
          ? "Observed category activity is connected for this market."
          : businessFallback
            ? "Live competitive visibility did not return in time; modeled pressure is active."
            : "Competitive visibility is still being checked."
    },
    {
      title: "Consumer demand",
      status: hasDemandMomentum ? demandMomentumLabel(businessResult) : "Estimated",
      tone: hasDemandMomentum ? "good" : "partial",
      copy: hasDemandMomentum
        ? "Demand momentum is included as a light signal in the success score."
        : "Demand momentum is estimated from broader market and category signals."
    },
    {
      title: "Local market activity",
      status: hasLocalActivity ? "Available" : "Estimated",
      tone: hasLocalActivity ? "good" : "partial",
      copy: localMatches !== null
        ? businessFallback
          ? "Modeled local activity is active until live matches return."
          : "Verified local activity matches inform category pressure."
        : "SpotVest is using modeled activity until verified matches return."
    },
    {
      title: "Mobility and site signals",
      status: hasSiteSignals ? "Available" : siteIntelResult?.fallback ? "Estimated" : "Checking",
      tone: hasSiteSignals ? "good" : "partial",
      copy: hasSiteSignals
        ? "Transit access, commercial mix, licenses, and outdoor activity signals are available."
        : siteIntelResult?.fallback
          ? "Mobility and commercial mix did not return in time; neutral fallback is active."
          : "Block-level mobility and commercial mix are still loading."
    },
    {
      title: "Risk and development",
      status: hasRiskSignals ? "Available" : civicResult?.fallback ? "Estimated" : "Checking",
      tone: hasRiskSignals ? "good" : "partial",
      copy: hasRiskSignals
        ? "Quality-of-life, development activity, and permit signals are included."
        : civicResult?.fallback
          ? "Risk and development data did not return in time; neutral fallback is active."
          : "Risk and development activity are still loading."
    },
    {
      title: "Concept fit",
      status: hasConceptSignals ? "Available" : "Broader signal",
      tone: hasConceptSignals ? "good" : "partial",
      copy: hasConceptSignals
        ? "Sub-category fit is visible for this business type where enough signal exists."
        : "SpotVest is using broader business-category signals for this search."
    }
  ];

  if (elements.evidenceSource) {
    setStatusPill(elements.evidenceSource, `Confidence ${formatScore(analysis.confidenceScore)}`, "Available");
  }
  updatePanelTimestamp(".evidence-panel");

  elements.evidenceSignalGrid.innerHTML = cards
    .map((card) => `
      <article class="evidence-signal-card evidence-${card.tone}">
        <div>
          <strong>${escapeText(card.title)}</strong>
          <span class="mini-status mini-status-${statusTone(card.status)}">${escapeText(card.status)}</span>
        </div>
        <p>${escapeText(card.copy)}</p>
      </article>
    `)
    .join("");

  renderSignalsStrip();
}

function scoreSignalCopy(score) {
  const value = safeNumber(score?.value);
  if (value === null) return "Needs more data before this signal can be scored.";
  if (value >= 75) return "Strong positive signal for this business in the selected area.";
  if (value >= 60) return "Supportive signal, but exact site economics still matter.";
  if (value >= 45) return "Mixed signal that needs more location-specific proof.";
  return "Weak signal or risk factor for this business in the selected area.";
}

function memoDecisionLabel(decision) {
  if (decision === "OPEN") return "Open here";
  if (decision === "DO NOT OPEN") return "Do not open here";
  if (decision === "NEEDS MORE DATA") return "Do not decide yet";
  return "Open with conditions";
}

function memoRiskSeverity(risk, index) {
  const text = String(risk).toLowerCase();
  if (text.includes("cost") || text.includes("competition") || text.includes("financial") || text.includes("high")) return "High";
  if (index <= 1) return "Medium";
  return "Monitor";
}

function memoRiskMitigation(risk) {
  const text = String(risk).toLowerCase();
  if (text.includes("cost") || text.includes("rent") || text.includes("financial")) {
    return "Set a rent-to-sales ceiling before signing.";
  }
  if (text.includes("competition") || text.includes("saturation")) {
    return "Validate differentiation against nearby operators.";
  }
  if (text.includes("zip-level") || text.includes("address") || text.includes("block")) {
    return "Run exact-address and daypart checks.";
  }
  if (text.includes("demand")) {
    return "Confirm category demand with live and on-site signals.";
  }
  return "Resolve during due diligence before commitment.";
}

function renderInvestmentMemo(analysis, decision) {
  if (!elements.memoDecisionTitle) return;

  const decisionLabel = memoDecisionLabel(analysis.decision);
  elements.memoDecisionTitle.textContent = `${decisionLabel}: ${analysis.topRecommendation.name}`;
  elements.memoDecisionCopy.textContent = analysis.decisionCopy;
  elements.memoSuccessScore.textContent = formatScore(analysis.successProbability);
  elements.memoConfidenceScore.textContent = `${formatScore(analysis.confidenceScore)} · ${analysis.validation.sourceReliability}`;

  const thesis = analysis.scores
    .filter((score) => safeNumber(score.value, 0) >= 55)
    .sort((a, b) => safeNumber(b.value, 0) - safeNumber(a.value, 0))
    .slice(0, 4);

  elements.memoThesisList.innerHTML = thesis.length
    ? thesis.map((score) => `
      <div class="memo-list-row">
        <span>${escapeText(score.name)}</span>
        <strong>${formatBadgeScore(score.value)}</strong>
        <p>${escapeText(scoreSignalCopy(score))}</p>
      </div>
    `).join("")
    : `<div class="empty-places">SpotVest needs stronger evidence before naming the investment thesis.</div>`;

  elements.memoRiskList.innerHTML = analysis.topRisks.slice(0, 4)
    .map((risk, index) => `
      <div class="memo-list-row memo-risk-row">
        <span>${escapeText(memoRiskSeverity(risk, index))} risk</span>
        <strong>${escapeText(risk)}</strong>
        <p>${escapeText(memoRiskMitigation(risk))}</p>
      </div>
    `)
    .join("") || `<div class="empty-places">No severe risk signals detected yet. Still verify rent, operator strength, and the exact site.</div>`;

  const actions = [
    `${decision.next}: ${decision.nextCopy}`,
    ...analysis.conditions.slice(0, 3)
  ];
  elements.memoActionList.innerHTML = actions
    .map((action, index) => `
      <div class="memo-list-row">
        <span>Step ${index + 1}</span>
        <strong>${escapeText(action.split(":")[0])}</strong>
        <p>${escapeText(action.includes(":") ? action.slice(action.indexOf(":") + 1).trim() : action)}</p>
      </div>
    `)
    .join("");
}

function renderDecisionStrip(profile, recommendations) {
  const businessResult = currentBusinessResult();
  const decision = decisionFor(profile, recommendations, businessResult);
  const confidence = confidenceFor(state.zip, businessResult);
  const analysis = buildInstitutionalAnalysis(profile, recommendations);
  renderFullDecisionPanel(profile, decision, confidence, analysis);

  elements.agentAnswer.textContent = decision.answer;
  elements.agentAnswer.className = `decision-badge decision-${decision.answer.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
  elements.agentAnswerCopy.textContent = decision.copy;
  animateScoreText(elements.decisionSuccess, formatScore(analysis.successProbability));
  elements.dataConfidence.textContent = confidence.label;
  elements.dataConfidenceCopy.textContent = confidence.copy;
  elements.nextMove.textContent = decision.next;
  elements.nextMoveCopy.textContent = decision.nextCopy;
  renderInvestmentMemo(analysis, decision);
}

function frontVerdictForDecision(decision, score) {
  const s = clampScore(safeNumber(score, 0));
  const slug = analysisDecisionSlug(decision.answer);
  if (slug === "open") {
    return { label: "VIABLE", color: "#10B981", slug: "viable" };
  }
  if (slug === "do-not-open" || s < 55) {
    return { label: "HIGH RISK", color: "#EF4444", slug: "high-risk" };
  }
  if (slug === "needs-more-data") {
    return { label: "REVIEW", color: "#64748B", slug: "review" };
  }
  return { label: "MODERATE", color: "#F59E0B", slug: "moderate" };
}

function analysisDecisionSlug(value) {
  return String(value || "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function renderFullDecisionPanel(profile, decision, confidence, analysis) {
  if (!elements.fullScoreBadge) return;
  const score = clampScore(analysis.successProbability);
  const verdict = frontVerdictForDecision(decision, score);
  const business = titleCase(state.business || analysis.topRecommendation?.name || "Business");
  const locationScope = state.location
    ? `BLOCK · ${state.location.radiusMiles || "0.5"} MI`
    : `AREA · ZIP ${state.zip || ""}`;
  const risks = analysis.topRisks?.filter(Boolean) || [];
  const strongSignals = analysis.scores
    .filter((item) => safeNumber(item.value, 0) >= 65)
    .slice(0, 2)
    .map((item) => item.name.toLowerCase());
  const why = strongSignals.length
    ? `${business} has support from ${strongSignals.join(" and ")}. ${decision.copy}`
    : decision.copy;
  const risk = risks.length
    ? risks.slice(0, 2).join(" ")
    : "Verify rent, visibility, competition, and operator economics before making a final commitment.";
  const action = `${decision.next}. ${decision.nextCopy}`;

  elements.fullScopePill.innerHTML = `<i class="ti ${state.location ? "ti-map-pin" : "ti-map-2"}"></i>${escapeText(locationScope)}`;
  elements.fullVerdictLabel.textContent = verdict.label;
  animateScoreText(elements.fullScoreValue, String(score));
  elements.fullConfidenceLabel.textContent = `${String(confidence.label || "Checking").toUpperCase()} CONFIDENCE`;
  elements.fullWhyCopy.textContent = why;
  elements.fullRiskCopy.textContent = risk;
  elements.fullActionCopy.textContent = action;

  elements.fullScoreBadge.style.setProperty("--front-verdict-color", verdict.color);
  elements.fullScoreBadge.dataset.verdict = verdict.slug;
}

function businessVerdictFor(score, profile, config, hasCompetitors = false) {
  // If adjacent competitors are visible nearby, never call it an open lane.
  if (hasCompetitors && score < 58) return "Competitive set present; validate differentiation.";
  if (score >= 78 && profile.rent >= 78) return "Risky unless the operator has a sharp niche.";
  if (score >= 78) return "Possible, but competition is heavy.";
  if (score >= 58 && config.baseDemand >= 68) return "Good if the operator is stronger than average.";
  if (score < 38 && config.baseDemand >= 60) {
    return hasCompetitors
      ? "Demand exists, but nearby operator density requires sharper positioning."
      : "Potential gap worth validating.";
  }
  if (profile.income < 48 && config.rentSensitivity > 70) return "Limited fit for this customer base.";
  return "Worth checking at the exact block level.";
}

function applyBusinessResult({ count, business, sourceNote, isLive, result, loading = false, displayBusiness = null }) {
  const profile = profileForZip(state.zip);
  const config = modeledBusinessConfig(business);
  const businessLabel = displayBusiness || businessDisplayName(state.business || business);
  // Include visible nearby competitors (Google Places) so the saturation
  // label + verdict reflect the adjacent competitive set even when NYC
  // open-data has few exact-term matches. Display only — scoring is unchanged.
  const visibleCompetitors = competitiveSetSize(result);
  const effectiveCount = Math.max(safeNumber(count, 0), visibleCompetitors);
  const hasVisibleCompetitors = effectiveCount > 2;
  const saturation = saturationFromCount(effectiveCount, profile);
  const localAdvantage = Math.round((profile.localPreference + config.localBias - config.chainBias) / 2);
  const mix =
    localAdvantage >= 62
      ? "Mostly local"
      : config.chainBias >= 68 && profile.chainFit >= 68
        ? "Chain-friendly"
        : "Mixed market";

  clearLoadingText(elements.businessSaturation, elements.businessMix, elements.businessVerdict);
  elements.businessInput.value = state.business;
  if (loading) {
    elements.businessCount.textContent = "";
    elements.businessCount.classList.add("skeleton-number");
  } else {
    elements.businessCount.classList.remove("skeleton-number");
    animateNumber(elements.businessCount, saturation);
  }
  elements.businessCountLabel.textContent = isLive
    ? `${businessLabel} market pressure`
    : `${businessLabel} directional pressure`;
  elements.businessSourceTags.innerHTML = sourceTagsForResult(result, isLive)
    .map((tag) => `<span>${tag}</span>`)
    .join("");
  if (loading) {
    setLoadingText(elements.businessSaturation, "Refreshing");
  } else {
    elements.businessSaturation.textContent = saturationLabel(saturation);
  }
  elements.businessMeter.value = loading ? 0 : saturation;
  if (loading) {
    setLoadingText(elements.businessMix, "Refreshing");
  } else {
    elements.businessMix.textContent = mix;
  }
  elements.businessMixCopy.textContent = loading
    ? "SpotVest is checking market signals before scoring the business."
    : mix === "Mostly local"
      ? "Independent operators can compete here if they understand the neighborhood and price correctly."
      : mix === "Chain-friendly"
        ? "Recognized brands may have an advantage because customers can support familiar, consistent operators."
        : "The winner depends more on reviews, visibility, price point, and site economics than brand type.";
  if (loading) {
    setLoadingText(elements.businessVerdict, "Refreshing market signals");
  } else {
    elements.businessVerdict.textContent = businessVerdictFor(saturation, profile, config, hasVisibleCompetitors);
  }
  elements.businessReason.textContent = `${businessLabel} demand: ${config.notes} ${sourceNote || (isLive ? "Verified market signals are available." : "Modeled local estimate.")}`;
  elements.heroBusiness.textContent = loading
    ? `Checking ${businessLabel} demand`
    : `${businessLabel} demand · ${saturationLabel(saturation)} competition`;
  setStatusPill(
    elements.heroSource,
    state.location ? `Address radius: ${state.location.radiusMiles} mi` : isLive ? "Verified market signals" : "Modeled while signals load",
    loading ? "Refreshing" : isLive ? "Available" : "Estimated"
  );
  elements.heroMarket.textContent = `${saturationLabel(saturation)} competition`;
  updatePanelTimestamp(".business-checker");
}

async function renderBusinessCheck() {
  syncBusinessInput();
  const profile = profileForZip(state.zip);
  const business = normalizeBusiness(state.business);
  const businessLabel = businessDisplayName(state.business);
  const config = modeledBusinessConfig(business);
  const count = estimateCompetitors(state.zip, business, profile, config);
  const requestId = ++state.businessRequestId;
  // Keep a hydrated last-known-good result while the live check is in flight, so
  // a slow/timed-out fetch doesn't transiently flip competition to the fallback
  // path (which would change the score). Only clear if there's nothing valid.
  if (!contextMatches(state.lastBusinessResult)) state.lastBusinessResult = null;
  state.businessCheckPending = true;
  updateActionGuards();

  applyBusinessResult({
    count: 0,
    business,
    displayBusiness: businessLabel,
    isLive: false,
    loading: true,
    sourceNote: "Checking connected market signals now."
  });

  try {
    const params = new URLSearchParams({
      zip: state.zip,
      business: state.business
    });
    if (state.location) {
      params.set("lat", state.location.lat);
      params.set("lng", state.location.lng);
      params.set("radius", state.location.radiusMiles);
      params.set("address", state.location.address);
    }

    const result = await fetchJsonWithTimeout(`/api/business-count?${params.toString()}`, {
      source: "business competition signals",
      timeoutMs: 26000,
      retries: 1
    });
    if (requestId !== state.businessRequestId) return;

    if (typeof result.count === "number" && result.count > 0) {
      state.lastBusinessResult = result;
      applyBusinessResult({
        count: result.count,
        business: result.business || business,
        displayBusiness: businessLabel,
        isLive: true,
        result,
        sourceNote: "Verified local activity and competitive signals are connected."
      });
      const updatedRecommendations = buildRecommendations(profile);
      renderDecisionStrip(profile, updatedRecommendations);
      renderInstitutionalAnalysis(profile, updatedRecommendations);
      renderCategoryList(updatedRecommendations);
      renderOpportunities(profile);
      renderFootTrafficIntelligence(profile);
      renderRevenueEstimator(profile);
      elements.headline.textContent = headlineFor(updatedRecommendations, profile);
      elements.narrative.textContent = narrativeFor(state.zip, profile, updatedRecommendations);
      elements.verdictTitle.textContent = verdictTitleFor(profile, updatedRecommendations);
      applyVerdictTier(profile, updatedRecommendations);
      renderTopPlaces(result);
      renderMarketMap();
    } else {
      state.lastBusinessResult = result;
      // Even with few exact city-record matches, visible nearby operators are a
      // real competitive set — don't frame it as an empty gap.
      applyBusinessResult({
        count: 0,
        business: result.business || business,
        displayBusiness: businessLabel,
        isLive: true,
        result,
        sourceNote: hasCompetitiveSet(result)
          ? "Competitive set present: several adjacent operators are visible nearby. Demand exists, but nearby operator density requires differentiation."
          : "Few exact city-record matches for this term. Validate the exact block and adjacent operators before committing."
      });
      const updatedRecommendations = buildRecommendations(profile);
      renderDecisionStrip(profile, updatedRecommendations);
      renderInstitutionalAnalysis(profile, updatedRecommendations);
      renderCategoryList(updatedRecommendations);
      renderOpportunities(profile);
      renderFootTrafficIntelligence(profile);
      renderRevenueEstimator(profile);
      elements.headline.textContent = headlineFor(updatedRecommendations, profile);
      elements.narrative.textContent = narrativeFor(state.zip, profile, updatedRecommendations);
      elements.verdictTitle.textContent = verdictTitleFor(profile, updatedRecommendations);
      applyVerdictTier(profile, updatedRecommendations);
      renderTopPlaces(result);
      renderMarketMap();
    }
  } catch (error) {
    if (requestId !== state.businessRequestId) return;
    logIntegrationError("business competition fallback", error, { zip: state.zip, business: state.business });
    // Never downgrade a real signal to a fallback (e.g., a slow refresh that
    // timed out) — keep the last confirmed value so the score stays real.
    if (state.lastBusinessResult && contextMatches(state.lastBusinessResult) && state.lastBusinessResult.registryExact) return;
    state.lastBusinessResult = {
      zip: state.zip,
      business,
      count,
      fallback: true,
      registryExact: false,
      openDataCount: 0,
      googleVisibleCount: 0,
      googlePlaces: null,
      mapRecords: [],
      demandMomentum: { available: false },
      searchContext: fallbackSearchContext()
    };
    applyBusinessResult({
      count,
      business,
      displayBusiness: businessLabel,
      isLive: false,
      result: state.lastBusinessResult,
      sourceNote: "Live lookup failed, so SpotVest is clearly marking this as a modeled estimate."
    });
    const updatedRecommendations = buildRecommendations(profile);
    renderDecisionStrip(profile, updatedRecommendations);
    renderInstitutionalAnalysis(profile, updatedRecommendations);
    renderCategoryList(updatedRecommendations);
    renderOpportunities(profile);
    renderFootTrafficIntelligence(profile);
    renderRevenueEstimator(profile);
    elements.headline.textContent = headlineFor(updatedRecommendations, profile);
    elements.narrative.textContent = narrativeFor(state.zip, profile, updatedRecommendations);
    elements.verdictTitle.textContent = verdictTitleFor(profile, updatedRecommendations);
    applyVerdictTier(profile, updatedRecommendations);
    renderMarketMap();
  } finally {
    // Only the most recent business check should clear the guard; a stale
    // response returning late must not re-enable actions for a newer search.
    if (requestId === state.businessRequestId) {
      state.businessCheckPending = false;
      updateActionGuards();
    }
  }
}

function stableGradeProfile(zip, profile) {
  return zipProfiles[zip] || profile;
}

// SaaS-style decision tier (replaces school letter grades). Maps the success
// probability to a professional tier + recommended action. Keeps the number;
// only the label changes.
function decisionTier(score) {
  const s = clampScore(safeNumber(score, 0));
  if (s >= 81) return { tier: "Definite Fit", action: "Priority Opportunity", slug: "definite" };
  if (s >= 66) return { tier: "Strong Fit", action: "Good Candidate", slug: "strong" };
  if (s >= 51) return { tier: "Conditional", action: "Validate Before Committing", slug: "conditional" };
  return { tier: "High Risk", action: "Do Not Open Without Major Changes", slug: "risk" };
}

// Apply the decision tier (derived from the same viability score) to the
// verdict card so the label and the number always agree.
function applyVerdictTier(profile, recommendations) {
  if (!elements.verdictGrade) return;
  const recs = recommendations || buildRecommendations(profile);
  const analysis = buildInstitutionalAnalysis(profile, recs);
  const t = decisionTier(analysis.successProbability);
  elements.verdictGrade.textContent = t.tier;
  if (elements.verdictLabel) elements.verdictLabel.textContent = t.action;
  const box = elements.verdictGrade.closest(".verdict-score");
  if (box) {
    box.classList.remove("vt-definite", "vt-strong", "vt-conditional", "vt-risk");
    box.classList.add(`vt-${t.slug}`);
  }
}

function verdictTitleFor(profile, recommendations) {
  const top = recommendations[0].name.toLowerCase();
  if (profile.income >= 82 && profile.rent >= 82) return `Strong area, but only for operators with pricing power`;
  if (profile.student >= 68) return `Strong value area with student and local demand`;
  if (profile.office >= 76) return `Good area for routine weekday demand`;
  if (profile.density < 55) return `Selective area for neighborhood-first businesses`;
  return `Good area for ${top} and daily-use retail`;
}

function chainFitCopy(profile) {
  if (profile.chainFit >= 72 && profile.localPreference >= 70) {
    return "Both can work here. National chains benefit from income and brand trust, while strong local operators can win with neighborhood identity and service quality.";
  }
  if (profile.chainFit >= 70) {
    return "National chains have an advantage because customers can support higher prices and familiar brands. Local operators need polished execution to compete.";
  }
  if (profile.localPreference >= 76) {
    return "This area leans local. Customers are likely to reward useful neighborhood businesses, value, convenience, and community familiarity over generic chain concepts.";
  }
  return "Neither side has an automatic advantage. The exact block, signage, price point, and operator quality matter more than brand type.";
}

function localChainTitle(profile) {
  if (profile.chainFit >= 72 && profile.localPreference >= 70) return "Local brands and chains can both work.";
  if (profile.chainFit >= 70) return "National chains have a cleaner fit.";
  if (profile.localPreference >= 76) return "Local neighborhood businesses have the edge.";
  return "Operator quality matters more than brand type.";
}

function headlineFor(recommendations, profile) {
  const strong = recommendations.filter((item) => item.band === "strong").length;
  const highRisk = profile.rent > 82 || profile.competition > 82;

  if (strong >= 4 && highRisk) return "Strong demand, but cost pressure punishes weak operators.";
  if (strong >= 4) return "Multiple categories show real neighborhood demand.";
  if (strong >= 2) return "Selective opportunities are stronger than broad retail bets.";
  return "This area needs cautious, block-level validation before committing.";
}

function narrativeFor(zip, profile, recommendations) {
  const top = recommendations[0];
  const weak = [...recommendations].reverse()[0];
  return `${zip} covers ${profile.name}. This looks like a ${profile.affluenceLabel.toLowerCase()} area. The strongest current fit is ${top.name.toLowerCase()} because the area scores well on the demand signals that category needs. The weakest modeled fit is ${weak.name.toLowerCase()}, mostly because its economics are less protected against this ZIP code's cost pressure, competition, or customer profile. Treat this as a first-pass business decision screen, then verify the exact block, frontage, cost terms, and live competitor data before making a recommendation.`;
}

function render(zip, options = {}) {
  syncBusinessInput();
  const profile = profileForZip(zip);
  if (!profile) {
    elements.message.textContent = /^\d{5}$/.test(zip)
      ? "🗽 SpotVest currently covers New York City only. Try a NYC ZIP like 10003, 11201, or 10458."
      : "Enter a 5-digit NYC ZIP code (for example 10003).";
    elements.message.classList.add("form-message-warn");
    elements.analyzeButton.disabled = false;
    elements.analyzeButton.textContent = "Analyze";
    // Surface the same message inside the SpotVest app and return it to the
    // search screen so it never sits on an empty report.
    const sv3note = document.querySelector("#sv3-stepnote");
    if (sv3note) sv3note.textContent = elements.message.textContent;
    if (document.querySelector("#sv3-app") && typeof sv3ShowMain === "function") sv3ShowMain("input");
    return;
  }
  elements.message.classList.remove("form-message-warn");

  state.zip = zip;
  state.mapRetryCount = 0;
  // Score is "not ready" until every required live signal has arrived — the UI
  // shows a loading state until then so a brand-new address never displays a
  // premature (and therefore different) first-run score.
  if (!options.preserveLiveSignals) { state.scoreReady = false; state.scoreUnavailable = false; state.realAlternatives = null; }
  document.body.classList.remove("landing-mode");
  elements.startScreen.hidden = true;
  elements.results.hidden = false;
  elements.input.value = zip;
  elements.message.textContent = "Loading market signals...";
  elements.analyzeButton.disabled = true;
  elements.analyzeButton.textContent = "Analyzing...";
  elements.areaTitle.textContent = reportAreaTitle(zip, profile);

  ["density", "income", "transit", "rent"].forEach((metric) => {
    elements.meters[metric].value = profile[metric];
    elements.values[metric].textContent = labelFor(metric, profile[metric]);
  });

  const recommendations = buildRecommendations(profile);
  renderCategoryList(recommendations);

  elements.headline.textContent = headlineFor(recommendations, profile);
  elements.narrative.textContent = narrativeFor(zip, profile, recommendations);
  elements.confidence.textContent = state.liveProfiles[zip]
    ? "Market data live, model scored"
    : "Profile model";
  elements.evidence.innerHTML = profile.evidence.map((item) => `<li>${item}</li>`).join("");
  elements.verdictTitle.textContent = verdictTitleFor(profile, recommendations);
  elements.verdictCopy.textContent = profile.verdict;
  applyVerdictTier(profile, recommendations);
  safeUiUpdate("decision strip", () => renderDecisionStrip(profile, recommendations));
  safeUiUpdate("institutional analysis", () => renderInstitutionalAnalysis(profile, recommendations));
  safeUiUpdate("customer profile", () => {
    elements.customerProfile.innerHTML = profile.audience
      .map(
        ([label, copy]) => `
          <div class="profile-row">
            <strong>${label}</strong>
            <span>${copy}</span>
          </div>
        `
      )
      .join("");
    elements.chainTitle.textContent = localChainTitle(profile);
    elements.chainCopy.textContent = chainFitCopy(profile);
    elements.localFitBar.style.width = `${profile.localPreference}%`;
    elements.talkingPoints.innerHTML = profile.talkingPoints.map((item) => `<li>${item}</li>`).join("");
  });
  safeUiUpdate("opportunities", () => renderOpportunities(profile));
  safeUiUpdate("market pulse", () => renderMarketPulse(profile));
  safeUiUpdate("foot traffic intelligence", () => renderFootTrafficIntelligence(profile));
  safeUiUpdate("revenue estimator", () => renderRevenueEstimator(profile));
  if (!options.preserveLiveSignals) {
    // Seed last-known-good signals for this exact location, then load+commit the
    // score only once every required signal is real (retrying the missing ones).
    hydrateSignalBundle();
    commitScoreWhenReady(zip);
  }
  safeUiUpdate("lease options", () => renderLeases());
  safeUiUpdate("market map", () => renderMarketMap());
  updateActionGuards();
  updateSaveButton();
  // Intentionally NOT writing analysis params into the address bar: a plain
  // refresh should return to the restaurant picker, not re-run the last report.
  // Sharing still works — the Share/Copy-link button builds the full URL on
  // demand via shareableUrl(), and opening a shared link still loads the report.
  maybeShowAssistantOnboard();
  if (!state.liveProfiles[zip]) renderLiveAreaReport(zip);
  window.setTimeout(() => {
    if (state.zip !== zip) return;
    elements.message.textContent = state.location
      ? `Loaded ZIP ${zip} with address radius.`
      : `Loaded ZIP ${zip}.`;
    elements.analyzeButton.disabled = false;
    elements.analyzeButton.textContent = "Analyze";
  }, 700);

  elements.presets.forEach((button) => {
    button.classList.toggle("active", button.dataset.zip === zip);
  });
}

async function renderLiveAreaReport(zip) {
  const requestId = ++state.areaRequestId;

  try {
    const report = await fetchJsonWithTimeout(`/api/area-report?zip=${encodeURIComponent(zip)}`, {
      source: "market demographics",
      timeoutMs: 13000,
      retries: 1
    });
    if (requestId !== state.areaRequestId || state.zip !== zip || !report.census) return;

    const current = state.liveProfiles[zip] || zipProfiles[zip] || profileForZip(zip);
    state.liveProfiles[zip] = enrichProfileWithCensus(current, report.census);
    render(zip, { preserveLiveSignals: true });
  } catch (error) {
    logIntegrationError("market demographics fallback", error, { zip });
    if (requestId === state.areaRequestId) {
      elements.evidence.innerHTML += "<li>Market demographics lookup was unavailable; showing local profile assumptions.</li>";
    }
  } finally {
    if (requestId === state.areaRequestId && state.zip === zip) {
      elements.analyzeButton.disabled = false;
      elements.analyzeButton.textContent = "Analyze";
    }
  }
}

function exportSummary() {
  const profile = profileForZip(state.zip);
  const recommendations = buildRecommendations(profile);
  const businessResult = currentBusinessResult();
  const decision = decisionFor(profile, recommendations, businessResult);
  const confidence = confidenceFor(state.zip, businessResult);
  const analysis = buildInstitutionalAnalysis(profile, recommendations);
  const businessLines = businessResult
    ? [
        `Business search: ${titleCase(businessResult.business || state.business)}`,
        `Search area: ${businessResult.searchContext?.mode === "address-radius" ? `${businessResult.searchContext.address} within ${businessResult.searchContext.radiusMiles} mile` : `ZIP ${state.zip}`}`,
        `Competitive pressure: ${saturationLabel(saturationFromCount(businessResult.count || 0, profile))}`,
        `Demand momentum: ${demandMomentumLabel(businessResult)}`,
        `Signals: ${sourceTagsForResult(businessResult, Boolean(businessResult.registryExact)).join(", ")}`,
        "Source note: Verified signals are used for screening; exact provider details are hidden in the default report."
      ]
    : [
        `Business search: ${titleCase(state.business)}`,
        "Competitive pressure: live check not completed yet"
      ];
  const lines = [
    `SpotVest report for ZIP ${state.zip} - ${profile.name}`,
    "",
    "Executive Decision:",
    `${decision.answer}. ${decision.copy}`,
    `Next move: ${decision.next}. ${decision.nextCopy}`,
    `Confidence: ${confidence.label}. ${confidence.copy}`,
    "",
    "Business Success Intelligence:",
    `Decision: ${analysis.decision}`,
    `Viability score: ${formatScore(analysis.successProbability)}`,
    `Confidence score: ${formatScore(analysis.confidenceScore)}`,
    `Top recommendation: ${analysis.topRecommendation.name} (${formatScore(analysis.topRecommendation.score)})`,
    `Summary: ${analysis.summary}`,
    "",
    "Validation:",
    `- Completeness: ${formatScore(analysis.validation.completeness)}`,
    `- Freshness: ${formatScore(analysis.validation.freshness)}`,
    `- Source quality: ${formatScore(analysis.validation.sourceQuality)} (${analysis.validation.sourceReliability})`,
    `- Confidence: ${formatScore(analysis.validation.confidenceScore)}`,
    "",
    "Score breakdown:",
    ...analysis.scores.map((score) => `- ${score.name}: ${formatScore(score.value)}. ${score.why}`),
    "",
    "Scenario analysis:",
    ...analysis.scenarios.map((scenario) => `- ${scenario.name}: ${scenario.revenue}; ${scenario.traffic}; breakeven ${scenario.breakeven}; failure probability ${scenario.failure}`),
    "",
    "Methodology:",
    ...analysis.explainability.flatMap((group) => [
      `${group.type}:`,
      ...group.items.map((item) => `- ${item}`)
    ]),
    "",
    "Required conditions:",
    ...analysis.conditions.map((item) => `- ${item}`),
    "",
    "Still needs verification:",
    ...[...analysis.validation.missing, ...analysis.validation.conflicts].map((item) => `- ${item}`),
    "",
    headlineFor(recommendations, profile),
    "",
    narrativeFor(state.zip, profile, recommendations),
    "",
    "Competition / business check:",
    ...businessLines,
    "",
    "Client verdict:",
    profile.verdict,
    "",
    "Customer profile:",
    ...profile.audience.map(([label, copy]) => `- ${label}: ${copy}`),
    "",
    "Local vs chain fit:",
    `- ${localChainTitle(profile)} ${chainFitCopy(profile)}`,
    "",
    "Decision talking points:",
    ...profile.talkingPoints.map((item) => `- ${item}`),
    "",
    "Alternative businesses:",
    ...recommendations.slice(0, 5).map((item) => `- ${item.name}: ${formatScore(item.score)} (${item.band})`),
    "",
    "Profit note:",
    "Profit ranges in the app are modeled screening estimates, Due Diligence Required on operator profit.",
    "",
    "Research signals:",
    ...profile.evidence.map((item) => `- ${item}`),
    "",
    "Important caution:",
    "This report is a location research screen. Before advising a client, verify the exact address, cost, frontage, nearby competitors, allowed use, licensing, and operator quality."
  ];

  const blob = new Blob([lines.join("\n")], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `spotvest-${state.zip}.txt`;
  anchor.click();
  URL.revokeObjectURL(url);
}

// Print-to-PDF: the browser's "Save as PDF" renders the on-screen report, so
// the Live/Modeled honesty labels carry straight into the exported document.
function setPrintMeta() {
  if (!elements.printMeta) return;
  const profile = profileForZip(state.zip);
  const businessLabel = businessDisplayName(state.business) || "Business screen";
  const areaLabel = profile ? reportAreaTitle(state.zip, profile) : `ZIP ${state.zip}`;
  const today = new Date().toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });
  elements.printMeta.textContent = `${businessLabel} · ${areaLabel} · ${today}`;
}

// Builds the 1-2 page executive summary from the same computed data the report
// uses, so the short PDF and the full report can never disagree.
// Build a professional, prose consulting report (for the PDF export) rather
// than a screenshot of the dashboard. All values come from the same live
// analysis used on screen — one source of truth.
function renderExecSummary() {
  if (!elements.execSummary) return;
  const profile = profileForZip(state.zip);
  if (!profile) return;
  const recommendations = buildRecommendations(profile);
  const businessResult = currentBusinessResult();
  const analysis = buildInstitutionalAnalysis(profile, recommendations);
  const confidence = confidenceFor(state.zip, businessResult);
  const business = businessDisplayName(state.business) || "This business";
  const location = state.location?.address
    ? `${state.location.address}`
    : `${profile.name} (ZIP ${state.zip})`;
  const generated = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  const score = clampScore(analysis.successProbability);
  const conf = clampScore(analysis.confidenceScore);
  const isConditional = /CONDITIONAL/i.test(analysis.decision);

  const li = (arr, fallback) => (arr && arr.length ? arr : [fallback]).map((t) => `<li>${escapeText(t)}</li>`).join("");
  const para = (t) => `<p>${escapeText(t)}</p>`;

  // Market prose from census (profile.audience holds the live ACS lines).
  const marketLines = (profile.audience || []).map((row) => `<li><b>${escapeText(row[0])}:</b> ${escapeText(row[1])}</li>`).join("")
    || `<li>Market demographics for ${escapeText(location)} were used as a first-pass screen.</li>`;

  // Competition prose.
  const gp = businessResult?.googlePlaces;
  const compCount = businessResult ? safeNumber(businessResult.count, 0) : 0;
  const topOps = (gp?.topPlaces || []).slice(0, 5).map((p) => {
    const r = safeNumber(p.rating);
    const rev = safeNumber(p.reviews);
    const bits = [r !== null ? `${r.toFixed(1)}★` : null, rev ? `${formatInteger(rev)} reviews` : null].filter(Boolean).join(", ");
    return `<li>${escapeText(p.name || "Nearby operator")}${bits ? ` — ${escapeText(bits)}` : ""}</li>`;
  }).join("");
  const compPara = compCount > 0
    ? `Public records and visible search results show approximately ${formatInteger(compCount)} comparable ${business.toLowerCase()} operators in this area${gp?.avgRating ? `, averaging ${gp.avgRating.toFixed(1)}★ across rated competitors` : ""}. Differentiation against established operators is a key determinant of success.`
    : `No matching competitor records were returned for this exact search; treat competitive intensity as directional and verify on the block.`;

  // Financials (modeled).
  const revenue = elements.revenueProjection?.textContent?.trim() || "Modeled on request";
  const breakeven = elements.revenueBreakeven?.textContent?.trim() || "—";
  const rentPct = elements.revenueRentPercent?.textContent?.trim() || "—";

  elements.execSummary.innerHTML = `
    <article class="report-doc">
      <header class="rd-head">
        <div class="rd-brand">Spot<span>Vest</span></div>
        <div class="rd-title">Location Decision Report</div>
        <div class="rd-sub">${escapeText(business)} &middot; ${escapeText(location)}</div>
        <div class="rd-meta">Prepared ${escapeText(generated)} &middot; SpotVest Decision Intelligence</div>
      </header>

      <section class="rd-section">
        <h2>Executive Summary</h2>
        ${para(analysis.summary)}
        ${para(`On the evidence reviewed, SpotVest screens this opportunity as ${analysis.decision} with a viability score of ${score}/100 and evidence confidence of ${conf}/100. The sections below set out the recommendation, the conditions and risks that drive it, and the market and financial context.`)}
      </section>

      <section class="rd-section">
        <h2>Recommendation</h2>
        <p class="rd-verdict rd-${analysis.decision.toLowerCase().replace(/[^a-z0-9]+/g, "-")}">${escapeText(analysis.decision)}</p>
        ${para(analysis.decisionCopy)}
      </section>

      <div class="rd-twocol">
        <section class="rd-section"><h2>Viability Score</h2><p class="rd-metric">${score}<span>/100</span></p><p class="rd-metric-note">${escapeText(decisionTier(score).tier)} — a modeled screen of whether this business can work at this location.</p></section>
        <section class="rd-section"><h2>Evidence Confidence</h2><p class="rd-metric">${conf}<span>/100</span></p><p class="rd-metric-note">${escapeText(confidence.label)} — how much of this report is backed by live data, not the odds of success.</p></section>
      </div>

      ${isConditional ? `<section class="rd-section"><h2>Conditions to Open</h2><p>This location can work for ${escapeText(business.toLowerCase())} only if the following conditions are met:</p><ul class="rd-list">${li(analysis.conditions, "Verify site economics before committing.")}</ul></section>` : `<section class="rd-section"><h2>Conditions &amp; Requirements</h2><ul class="rd-list">${li(analysis.conditions, "Verify site economics before committing.")}</ul></section>`}

      <section class="rd-section">
        <h2>Market Analysis</h2>
        ${para(`Demographic and area signals for ${location}:`)}
        <ul class="rd-list">${marketLines}</ul>
      </section>

      <section class="rd-section">
        <h2>Competition Analysis</h2>
        ${para(compPara)}
        ${topOps ? `<p class="rd-subhead">Notable nearby operators</p><ul class="rd-list">${topOps}</ul>` : ""}
      </section>

      <section class="rd-section">
        <h2>Risks</h2>
        <ul class="rd-list">${li(analysis.topRisks, "No severe risk signals detected in this screen.")}</ul>
      </section>

      <section class="rd-section">
        <h2>Financial Considerations</h2>
        ${para(`Modeled estimates (not live financials): projected monthly revenue ${revenue}, break-even ${breakeven}, with rent at approximately ${rentPct} of sales. These are derived from category economics, area income and modeled local rent — verify against real operator P&Ls before committing.`)}
      </section>

      <section class="rd-section">
        <h2>Alternative Concepts</h2>
        <ul class="rd-list">${li((Array.isArray(state.realAlternatives) ? state.realAlternatives : []).map((a) => `${a.name} — ${a.score}/100 success score (same engine as the headline)`), `No other business type scored higher than ${business} (${score}/100) at this location.`)}</ul>
      </section>

      <section class="rd-section">
        <h2>Data Sources</h2>
        <ul class="rd-list">
          <li>U.S. Census ACS 5-year — demographics, income, housing.</li>
          <li>NYC Open Data — business records, licenses, 311, permits.</li>
          <li>Google Places — nearby competitors, ratings, reviews.</li>
          <li>MTA subway ridership — mobility / foot-traffic proxy (modeled).</li>
          <li>SpotVest decision engine &amp; OpenAI narrative layer.</li>
        </ul>
      </section>

      <footer class="rd-foot">
        Generated ${escapeText(generated)} by SpotVest. Modeled values are estimates, not guaranteed outcomes — Due Diligence Required on financials, lease terms, and operator strength. This report is decision-support intelligence, not brokerage, legal, or financial advice.
      </footer>
    </article>
  `;
}

// Default Export PDF: the concise 1-2 page executive summary.
function exportExecPdf() {
  setPrintMeta();
  renderExecSummary();
  document.body.classList.add("print-exec");
  const restore = () => {
    document.body.classList.remove("print-exec");
    window.removeEventListener("afterprint", restore);
  };
  window.addEventListener("afterprint", restore);
  window.print();
}

// Secondary export: the full multi-section report.
function exportFullPdf() {
  setPrintMeta();
  // Expand collapsed <details> so methodology, risk, and site panels are
  // included in the PDF, then restore the on-screen state afterward.
  const collapsibles = [...document.querySelectorAll("#results details")];
  const priorOpen = collapsibles.map((node) => node.open);
  collapsibles.forEach((node) => { node.open = true; });

  const restore = () => {
    collapsibles.forEach((node, index) => { node.open = priorOpen[index]; });
    window.removeEventListener("afterprint", restore);
  };
  window.addEventListener("afterprint", restore);

  window.print();
}

// Multi-location comparison: a device-local shortlist that snapshots the
// decision for each business+location so they can be ranked side by side.
function loadCompare() {
  try {
    const saved = localStorage.getItem(compareStorageKey);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

function saveCompare() {
  try {
    localStorage.setItem(compareStorageKey, JSON.stringify(state.compareList));
  } catch (error) {
    logIntegrationError("compare save", error, {});
  }
}

function currentCompareId() {
  const address = state.location?.address || "";
  return `${state.zip}|${normalizeBusiness(state.business)}|${address}`;
}

function compareScoreNumber(value) {
  const match = String(value || "").match(/(\d+)/);
  return match ? Number(match[1]) : null;
}

// Location-only foot traffic: identical for the same physical site regardless
// of concept. It is the report's foot-traffic model WITHOUT the concept-
// specific restaurant-concentration term (renormalized to the 0-100 scale).
// Concept-specific demand stays in the Success Probability score instead.
function locationFootTraffic(profile) {
  if (!profile) return null;
  const siteIntel = currentSiteIntelResult();
  const mobilityScore = siteIntel?.mta?.available
    ? (siteIntel.mta.totalDecember2024Ridership > 250000 ? 90 : 68)
    : safeNumber(profile.transit, 50);
  const commercialMixScore = siteIntel?.pluto?.retailArea > 500000
    ? 88
    : siteIntel?.pluto?.retailArea > 150000
      ? 68
      : safeNumber(profile.office, 50);
  const locationOnly =
    safeNumber(profile.density, 50) * 0.24 +
    safeNumber(profile.transit, 50) * 0.2 +
    mobilityScore * 0.14 +
    safeNumber(profile.office, 50) * 0.12 +
    safeNumber(profile.nightlife, 50) * 0.1 +
    safeNumber(profile.tourist, 50) * 0.08 +
    commercialMixScore * 0.07;
  return clampScore(locationOnly / 0.95);
}

// Short, comparison-friendly address: keep the street line, drop city/state/zip.
function conciseAddress(snapshot) {
  if (snapshot.address) {
    const street = String(snapshot.address).split(",")[0].trim();
    return street || snapshot.address;
  }
  return snapshot.area;
}

function buildCompareSnapshot() {
  const profile = profileForZip(state.zip);
  if (!profile) return null;
  const recommendations = buildRecommendations(profile);
  const businessResult = currentBusinessResult();
  const analysis = buildInstitutionalAnalysis(profile, recommendations);
  const confidence = confidenceFor(state.zip, businessResult);
  return {
    id: currentCompareId(),
    business: businessDisplayName(state.business) || "Business",
    area: reportAreaTitle(state.zip, profile),
    zip: state.zip,
    address: state.location?.address || null,
    lat: state.location?.lat ?? null,
    lng: state.location?.lng ?? null,
    rentLabel: (() => { const m = String(elements.revenueNote?.textContent || "").match(/\$([\d,]+)\s*\/?\s*mo/i); return m ? `$${Math.round(Number(m[1].replace(/,/g, "")) / 1000)}k` : null; })(),
    beLabel: (String(elements.revenueBreakeven?.textContent || "").match(/\d+\s*(?:–|-)?\s*\d*\s*mo/i) || [null])[0],
    decision: analysis.decision,
    decisionSlug: analysis.decision.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    successProbability: clampScore(analysis.successProbability),
    tier: decisionTier(analysis.successProbability).tier,
    confidenceLabel: confidence.label,
    confidenceScore: clampScore(analysis.confidenceScore),
    competition: elements.businessSaturation?.textContent?.trim() || "Checking",
    mainRisk: (analysis.topRisks && analysis.topRisks[0]) || "Operator financials & exact economics — due diligence required.",
    radius: state.location?.radiusMiles || null,
    // Static, location-level metrics — identical across concepts at the same
    // address. (Concept demand lives in successProbability, not here.)
    density: labelFor("density", safeNumber(profile.density, 50)),
    income: labelFor("income", safeNumber(profile.income, 50)),
    transit: labelFor("transit", safeNumber(profile.transit, 50)),
    costPressure: labelFor("rent", safeNumber(profile.rent, 50)),
    footTraffic: `${locationFootTraffic(profile)}/100`,
    savedAt: Date.now()
  };
}

// --- Compare location-metric helpers ------------------------------------
// Normalize an address for same-location comparison (drop trailing country,
// collapse whitespace, case-insensitive).
function normalizeCompareAddress(address) {
  return String(address || "")
    .toLowerCase()
    .replace(/,?\s*usa\.?\s*$/i, "")
    .replace(/\s+/g, " ")
    .trim();
}
// Same physical location (same ZIP + same normalized address; ZIP-only counts
// as same location for ZIP-level metrics).
function isSameLocation(a, b) {
  if (!a || !b || a.zip !== b.zip) return false;
  return normalizeCompareAddress(a.address) === normalizeCompareAddress(b.address);
}
// Same site AND same radius — for radius-sensitive metrics (foot traffic).
function isSameSite(a, b) {
  return isSameLocation(a, b) && String(a.radius || "") === String(b.radius || "");
}
// Return a column's location metric; if missing (e.g. an older snapshot),
// replicate it from a same-location sibling so shared rows never go blank.
function getLocationMetricForColumn(item, key, list, siteLevel = false) {
  if (item[key] != null && item[key] !== "") return item[key];
  const same = siteLevel ? isSameSite : isSameLocation;
  const sibling = list.find((o) => o !== item && same(o, item) && o[key] != null && o[key] !== "");
  return sibling ? sibling[key] : "—";
}

function signalsReady() {
  return Boolean(state.zip) && !state.businessCheckPending && state.scoreReady !== false;
}

function updateCompareButton() {
  if (!elements.compareAddButton) return;
  const ready = signalsReady();
  elements.compareAddButton.disabled = !ready;
  const inList = state.compareList.some((item) => item.id === currentCompareId());
  const count = state.compareList.length;
  elements.compareAddButton.textContent = state.zip && state.businessCheckPending
    ? "Finishing signals…"
    : inList
      ? "Update in compare"
      : count
        ? `Add to compare (${count})`
        : "Add to compare";
}

// Disable actions that snapshot the report (Export PDF, Add to compare) until
// the business/competition signal has resolved, so they never capture a
// mid-load "Refreshing" value.
function updateActionGuards() {
  updateCompareButton();
  const ready = signalsReady();
  if (elements.exportPdfButton) {
    elements.exportPdfButton.disabled = !ready;
    elements.exportPdfButton.title = ready ? "" : "Available once market signals finish loading.";
  }
  if (elements.exportFullButton) {
    elements.exportFullButton.disabled = !ready;
    elements.exportFullButton.title = ready ? "" : "Available once market signals finish loading.";
  }
  if (elements.saveReportButton) {
    elements.saveReportButton.disabled = !state.zip;
    elements.saveReportButton.title = state.zip ? "" : "Run a location first to save it.";
  }
  document.querySelectorAll("[data-sv3-action='export-pdf']").forEach((button) => {
    button.disabled = !ready;
    button.title = ready ? "" : "Available once market signals finish loading.";
  });
  document.querySelectorAll("[data-sv3-action='save']").forEach((button) => {
    button.disabled = !state.zip;
    button.title = state.zip ? "" : "Run a location first to save it.";
  });
}

function addToCompare() {
  const snapshot = buildCompareSnapshot();
  if (!snapshot) {
    elements.message.textContent = "Run a location first, then add it to compare.";
    return;
  }
  const existingIndex = state.compareList.findIndex((item) => item.id === snapshot.id);
  if (existingIndex >= 0) {
    state.compareList[existingIndex] = snapshot;
  } else {
    state.compareList.push(snapshot);
    if (state.compareList.length > compareMax) state.compareList.shift();
  }
  // Force descending order by viability score so the highest-scoring concept
  // is always the left-most "Top Pick" column.
  state.compareList.sort((a, b) => safeNumber(b.successProbability, 0) - safeNumber(a.successProbability, 0));
  saveCompare();
  sv3RenderCompare();
  updateActionGuards();
}

function removeFromCompare(id) {
  state.compareList = state.compareList.filter((item) => item.id !== id);
  saveCompare();
  sv3RenderCompare();
  updateActionGuards();
}

function clearCompare() {
  state.compareList = [];
  saveCompare();
  sv3RenderCompare();
  updateActionGuards();
}


// --- Save / share -------------------------------------------------------
// Encode the current report into a shareable URL so a recipient lands on the
// same screen, and keep a device-local list of saved reports to reopen.
function shareableUrl() {
  const params = new URLSearchParams();
  if (state.business) params.set("business", state.business);
  if (state.zip) params.set("zip", state.zip);
  if (state.location?.address) {
    params.set("address", state.location.address);
    if (state.location.radiusMiles) params.set("radius", state.location.radiusMiles);
  }
  if (state.budget) params.set("budget", String(state.budget));
  const query = params.toString();
  return `${location.origin}${location.pathname}${query ? `?${query}` : ""}`;
}

function syncUrl() {
  if (!state.zip) return;
  try {
    history.replaceState(null, "", shareableUrl());
  } catch {
    /* history may be blocked in some embeds; the report still works */
  }
}

function legacyCopy(text) {
  try {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "absolute";
    textarea.style.left = "-9999px";
    document.body.appendChild(textarea);
    textarea.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(textarea);
    return ok;
  } catch {
    return false;
  }
}

async function copyShareLink() {
  if (!state.zip) {
    elements.message.textContent = "Run a location first to copy a link.";
    return;
  }
  const url = shareableUrl();
  const flash = (label) => {
    if (!elements.copyLinkButton) return;
    elements.copyLinkButton.textContent = label;
    window.setTimeout(() => { elements.copyLinkButton.textContent = "Copy link"; }, 1800);
  };
  // Native share sheet on mobile.
  try {
    if (navigator.share && /Mobi|Android/i.test(navigator.userAgent)) {
      await navigator.share({ title: "SpotVest report", url });
      return;
    }
  } catch {
    /* user dismissed the share sheet; fall through to clipboard */
  }
  // Async Clipboard API (https / focused contexts).
  try {
    await navigator.clipboard.writeText(url);
    flash("Link copied ✓");
    return;
  } catch {
    /* blocked (no focus / insecure context) — fall back below */
  }
  // execCommand fallback so copy still works where the Clipboard API is blocked.
  if (legacyCopy(url)) {
    flash("Link copied ✓");
    return;
  }
  elements.message.textContent = `Share link: ${url}`;
  flash("Copy this link");
}

function loadSaved() {
  try {
    const saved = localStorage.getItem(savedStorageKey);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

function persistSaved() {
  try {
    localStorage.setItem(savedStorageKey, JSON.stringify(state.savedReports));
  } catch (error) {
    logIntegrationError("saved report save", error, {});
  }
}

function buildSavedSnapshot() {
  const profile = profileForZip(state.zip);
  if (!profile) return null;
  const recommendations = buildRecommendations(profile);
  const analysis = buildInstitutionalAnalysis(profile, recommendations);
  return {
    id: currentCompareId(),
    business: businessDisplayName(state.business) || "Business",
    businessRaw: state.business,
    area: reportAreaTitle(state.zip, profile),
    zip: state.zip,
    address: state.location?.address || null,
    radius: state.location?.radiusMiles || null,
    budget: state.budget || null,
    decision: analysis.decision,
    decisionSlug: analysis.decision.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    successProbability: clampScore(analysis.successProbability),
    tier: decisionTier(analysis.successProbability).tier,
    url: shareableUrl(),
    savedAt: Date.now()
  };
}

function isCurrentSaved() {
  return state.savedReports.some((item) => item.id === currentCompareId());
}

function toggleSaveReport() {
  if (!state.zip) {
    elements.message.textContent = "Run a location first to save it.";
    return;
  }
  if (isCurrentSaved()) {
    removeSaved(currentCompareId());
    elements.message.textContent = "Report removed from saved reports.";
    return;
  }
  const snapshot = buildSavedSnapshot();
  if (!snapshot) {
    elements.message.textContent = "Could not save this report yet. Run the analysis again after signals finish.";
    return;
  }
  state.savedReports.unshift(snapshot);
  if (state.savedReports.length > savedMax) state.savedReports.pop();
  persistSaved();
  renderSaved();
  updateSaveButton();
  elements.message.textContent = "Report saved.";
}

function removeSaved(id) {
  state.savedReports = state.savedReports.filter((item) => item.id !== id);
  persistSaved();
  renderSaved();
  updateSaveButton();
}

function openSaved(id) {
  const report = state.savedReports.find((item) => item.id === id);
  if (report) runSavedSearch(report);
}

// Reopen a saved report by replaying it through the real search handlers.
function runSavedSearch(report) {
  if (elements.businessInput) elements.businessInput.value = report.businessRaw || report.business;
  state.business = report.businessRaw || report.business;
  syncBusinessInput();
  if (elements.budgetInput) elements.budgetInput.value = report.budget || "";
  if (report.address) {
    if (elements.radiusInput && report.radius) elements.radiusInput.value = report.radius;
    elements.addressInput.value = report.address;
    elements.addressForm.requestSubmit();
  } else {
    state.location = null;
    elements.addressInput.value = "";
    elements.input.value = report.zip;
    elements.form.requestSubmit();
  }
}

function updateSaveButton() {
  if (!elements.saveReportButton) return;
  const hasReport = Boolean(state.zip);
  elements.saveReportButton.disabled = !hasReport;
  elements.saveReportButton.textContent = hasReport && isCurrentSaved() ? "Saved ✓" : "Save report";
}

function renderSaved() {
  if (!elements.savedReportsPanel || !elements.savedReportsList) return;
  if (!state.savedReports.length) {
    elements.savedReportsPanel.hidden = true;
    elements.savedReportsList.innerHTML = "";
    return;
  }
  elements.savedReportsPanel.hidden = false;
  elements.savedReportsList.innerHTML = state.savedReports
    .map((report) => `
      <div class="saved-report-row">
        <button class="saved-open" type="button" data-id="${escapeText(report.id)}">
          <strong>${escapeText(report.business)}</strong>
          <span>${escapeText(report.address || report.area)}</span>
          <em class="decision-${report.decisionSlug}">${escapeText(report.decision)} · ${formatScore(report.successProbability)}</em>
        </button>
        <button class="saved-remove" type="button" data-id="${escapeText(report.id)}" aria-label="Remove saved report">&times;</button>
      </div>
    `)
    .join("");
}

// Deep-link: load a report directly from URL params (zip required).
function applyUrlState() {
  const params = new URLSearchParams(location.search);
  const zip = params.get("zip");
  if (!zip) return false;
  // Pre-fill the picker from a shared/old link, but NEVER auto-run the report.
  // Every page load (incl. refresh) lands on the business picker so the user
  // can choose. We also clean the URL so subsequent refreshes start fresh.
  const business = params.get("business");
  const address = params.get("address");
  const radius = params.get("radius");
  const budget = params.get("budget");
  try {
    if (business && elements.businessInput) { elements.businessInput.value = business; state.business = business; syncBusinessInput(); }
    if (budget && elements.budgetInput) elements.budgetInput.value = budget;
    if (radius && elements.radiusInput) elements.radiusInput.value = radius;
    if (address && elements.addressInput) elements.addressInput.value = address;
    if (elements.input) elements.input.value = zip;
  } catch { /* pre-fill is best-effort */ }
  try { history.replaceState(null, "", `${location.origin}${location.pathname}`); } catch { /* ignore */ }
  return false; // show the start/picker screen, never the old report
}

elements.form.addEventListener("submit", (event) => {
  event.preventDefault();
  updateBudgetFromInput();
  syncBusinessInput();
  state.location = null;
  elements.addressMessage.textContent = "";
  render(elements.input.value.trim());
});

elements.addressForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  updateBudgetFromInput();
  syncBusinessInput();
  const address = elements.addressInput.value.trim();
  if (!address) {
    elements.addressMessage.textContent = "Enter a full NYC address.";
    return;
  }

  elements.addressMessage.textContent = "Finding address...";
  try {
    const result = await fetchJsonWithTimeout(`/api/geocode?address=${encodeURIComponent(address)}`, {
      source: "address geocoding",
      timeoutMs: 9000,
      retries: 1
    });
    if (!/^\d{5}$/.test(result.zip) || !boroughForZip(result.zip)) {
      elements.addressMessage.textContent = "🗽 That address isn't in a supported New York City area yet. SpotVest currently covers NYC only — try a NYC address or ZIP.";
      return;
    }

    state.location = {
      address: result.address,
      zip: result.zip,
      lat: String(result.lat),
      lng: String(result.lng),
      radiusMiles: elements.radiusInput.value
    };
    elements.addressInput.value = result.address;
    elements.addressMessage.textContent = `Using ${result.address} within ${state.location.radiusMiles} mile.`;
    render(result.zip);
  } catch (error) {
    logIntegrationError("address geocoding fallback", error, { address });
    elements.addressMessage.textContent = "Could not find that address. Try a fuller address or use ZIP-level analysis.";
  }
});

elements.clearAddress.addEventListener("click", () => {
  state.location = null;
  elements.addressInput.value = "";
  elements.addressMessage.textContent = "Using ZIP-level search.";
  if (state.zip) render(state.zip);
});

elements.presets.forEach((button) => {
  button.addEventListener("click", () => {
    state.location = null;
    elements.addressInput.value = "";
    render(button.dataset.zip);
  });
});

elements.filter.addEventListener("change", (event) => {
  state.filter = event.target.value;
  if (state.zip) render(state.zip);
});

elements.businessForm.addEventListener("submit", (event) => {
  event.preventDefault();
  updateBudgetFromInput();
  syncBusinessInput();
  hideBusinessSuggestions();
  if (!state.zip) {
    elements.message.textContent = "Enter a ZIP code before checking a business type.";
    return;
  }
  renderBusinessCheck();
  renderRestaurantConceptFit();
});

elements.businessInput?.addEventListener("focus", () => showBusinessSuggestions({ showAll: true }));
elements.businessInput?.addEventListener("click", () => {
  elements.businessInput.select();
  showBusinessSuggestions({ showAll: true });
});
elements.businessInput?.addEventListener("input", () => showBusinessSuggestions());

elements.businessInput?.addEventListener("keydown", (event) => {
  if (event.key === "Escape") hideBusinessSuggestions();
});

elements.businessSuggestions?.addEventListener("pointerdown", (event) => {
  const button = event.target.closest("button[data-business]");
  if (!button) return;
  event.preventDefault();
  selectBusinessSuggestion(button.dataset.business);
});

document.addEventListener("pointerdown", (event) => {
  if (!elements.businessForm?.contains(event.target)) hideBusinessSuggestions();
});

elements.radiusInput.addEventListener("change", () => {
  if (!state.location) return;
  state.location.radiusMiles = elements.radiusInput.value;
  elements.addressMessage.textContent = `Using ${state.location.address} within ${state.location.radiusMiles} mile.`;
  renderBusinessCheck();
  renderRestaurantConceptFit();
});

elements.budgetInput?.addEventListener("change", () => {
  updateBudgetFromInput();
  if (!state.zip) return;
  const profile = profileForZip(state.zip);
  const recommendations = buildRecommendations(profile);
  renderDecisionStrip(profile, recommendations);
  renderInstitutionalAnalysis(profile, recommendations);
});

["input", "change"].forEach((eventName) => {
  [elements.revenueRent, elements.revenueSize, elements.revenueCategory].forEach((input) => {
    input?.addEventListener(eventName, () => {
      const profile = profileForZip(state.zip);
      renderRevenueEstimator(profile);
    });
  });
});

elements.leaseForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const address = elements.leaseAddress.value.trim();
  if (!address) return;

  const lease = {
    id: String(Date.now()),
    zip: state.zip,
    address,
    rent: Number(elements.leaseRent.value || 0),
    sf: Number(elements.leaseSf.value || 0),
    use: elements.leaseUse.value,
    concept: elements.leaseConcept.value,
    sales: Number(elements.leaseSales.value || 0),
    buildout: Number(elements.leaseBuildout.value || 0),
    frontage: Number(elements.leaseFrontage.value || 0),
    link: elements.leaseLink.value.trim(),
    notes: elements.leaseNotes.value.trim(),
    createdAt: new Date().toISOString()
  };

  elements.leaseMessage.textContent = "Saving and locating option...";
  const resolvedLease = await geocodeLeaseIfNeeded(lease);
  state.leases.unshift(resolvedLease);
  saveLeases();
  elements.leaseForm.reset();
  elements.leaseMessage.textContent = `Saved ${resolvedLease.address || address} for ZIP ${resolvedLease.zip || state.zip}.`;
  renderLeases();
  renderMarketMap();
});

elements.leaseList.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-lease-id]");
  if (!button) return;

  state.leases = state.leases.filter((lease) => lease.id !== button.dataset.leaseId);
  saveLeases();
  elements.leaseMessage.textContent = "Location removed.";
  renderLeases();
  renderMarketMap();
});

elements.leaseCsv.addEventListener("change", async () => {
  const file = elements.leaseCsv.files?.[0];
  if (!file) return;

  elements.leaseMessage.textContent = "Importing CSV...";
  try {
    const count = await importLeaseCsv(file);
    elements.leaseMessage.textContent = count
      ? `Imported ${count} options from CSV.`
      : "No options imported. Make sure the CSV has an address column.";
  } catch {
    elements.leaseMessage.textContent = "Could not import CSV. Check the headers and try again.";
  } finally {
    elements.leaseCsv.value = "";
  }
});

elements.listingFinderButton.addEventListener("click", findAvailableSpaces);

elements.listingResults.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-listing-result]");
  if (!button) return;
  const listings = JSON.parse(elements.listingResults.dataset.results || "[]");
  const listing = listings[Number(button.dataset.listingResult)];
  if (!listing) return;

  elements.leaseAddress.value = listing.title || "";
  elements.leaseLink.value = listing.url || "";
  elements.leaseNotes.value = [listing.source, listing.snippet].filter(Boolean).join(" - ");
  elements.leaseMessage.textContent = "Location link copied into the calculator. Add cost and square feet, then save.";
  elements.leaseAddress.focus();
});

elements.exportButton.addEventListener("click", exportSummary);
elements.exportPdfButton?.addEventListener("click", exportExecPdf);
elements.exportFullButton?.addEventListener("click", exportFullPdf);
elements.compareAddButton?.addEventListener("click", addToCompare);
elements.compareClear?.addEventListener("click", clearCompare);
elements.compareBody?.addEventListener("click", (event) => {
  const button = event.target.closest(".compare-remove");
  if (button) removeFromCompare(button.dataset.id);
});
elements.copyLinkButton?.addEventListener("click", copyShareLink);
elements.saveReportButton?.addEventListener("click", toggleSaveReport);
elements.newSearchButton?.addEventListener("click", newSearch);

// Clear the active report + URL params and return to a clean start screen.
// Saved reports and the compare shortlist persist (localStorage untouched).
function newSearch() {
  state.zip = "";
  state.business = "restaurant";
  state.location = null;
  state.lastBusinessResult = null;
  if (elements.input) elements.input.value = "";
  if (elements.businessInput) elements.businessInput.value = "";
  if (elements.addressInput) elements.addressInput.value = "";
  if (elements.budgetInput) elements.budgetInput.value = "";
  if (elements.addressMessage) elements.addressMessage.textContent = "";
  try { history.replaceState(null, "", `${location.origin}${location.pathname}`); } catch { /* ignore */ }
  const sv3App = document.querySelector("#sv3-app");
  const stayInApp = sv3App && !document.body.classList.contains("landing-mode");
  if (stayInApp) {
    if (elements.results) elements.results.hidden = false;
    if (elements.startScreen) elements.startScreen.hidden = true;
    if (typeof sv3ShowMain === "function") sv3ShowMain("input");
    document.querySelector("#sv3-biztype")?.focus({ preventScroll: true });
  } else {
    if (elements.results) elements.results.hidden = true;
    if (elements.startScreen) elements.startScreen.hidden = false;
    document.body.classList.add("landing-mode");
  }
  elements.message.textContent = "Enter a ZIP code or use an exact storefront address to start.";
  window.scrollTo({ top: 0, behavior: "smooth" });
}
elements.savedReportsList?.addEventListener("click", (event) => {
  const remove = event.target.closest(".saved-remove");
  if (remove) { removeSaved(remove.dataset.id); return; }
  const open = event.target.closest(".saved-open");
  if (open) openSaved(open.dataset.id);
});

elements.memoButton.addEventListener("click", async () => {
  elements.memoCopy.textContent = "Generating memo...";

  try {
    const result = await generateClientDecisionReport();
    elements.memoCopy.textContent = `${result.memo}${result.warning?.includes("quota") ? " The decision report service says this key is out of quota or billing is not enabled." : ""}`;
  } catch {
    elements.memoCopy.textContent = "Could not generate the report. Check that the decision report service is connected and the server is running.";
  }
});

function renderZipOptions() {
  elements.zipOptions.innerHTML = allNycZipCodes.map((zip) => `<option value="${zip}"></option>`).join("");
}

renderZipOptions();
state.leases = loadLeases();
state.compareList = loadCompare();
state.savedReports = loadSaved();
sv3RenderCompare();
renderSaved();
updateActionGuards();
updateSaveButton();

// --- Launch revenue / admin workflows -----------------------------------
// These forms do not affect the report engine. They turn SpotVest into a
// customer-ready site: report requests, consultation requests, and contact capture.
const launchEls = {
  signupForm: document.querySelector("#signup-form"),
  signupStatus: document.querySelector("#signup-status"),
  loginForm: document.querySelector("#login-form"),
  loginStatus: document.querySelector("#login-status"),
  passwordResetRequestForm: document.querySelector("#password-reset-request-form"),
  passwordResetRequestStatus: document.querySelector("#password-reset-request-status"),
  passwordResetCompleteForm: document.querySelector("#password-reset-complete-form"),
  passwordResetCompleteStatus: document.querySelector("#password-reset-complete-status"),
  accountStatus: document.querySelector("#account-status"),
  resendVerificationButton: document.querySelector("#resend-verification"),
  logoutButton: document.querySelector("#logout-button"),
  accountProfileForm: document.querySelector("#account-profile-form"),
  accountProfileStatus: document.querySelector("#account-profile-status"),
  changePasswordForm: document.querySelector("#change-password-form"),
  changePasswordStatus: document.querySelector("#change-password-status"),
  paidReportForm: document.querySelector("#paid-report-form"),
  paidReportStatus: document.querySelector("#paid-report-status"),
  advisorForm: document.querySelector("#advisor-form"),
  advisorStatus: document.querySelector("#advisor-status"),
  contactForm: document.querySelector("#contact-form"),
  contactStatus: document.querySelector("#contact-status")
};

function saveAccountSession(result) {
  if (!result?.account) return;
  try {
    localStorage.setItem("areaIntelAccount", JSON.stringify(result.account));
    localStorage.removeItem("areaIntelSession");
  } catch {
    // Account access still works server-side if browser storage is unavailable.
  }
}

function storedAccount() {
  try {
    return JSON.parse(localStorage.getItem("areaIntelAccount") || "null");
  } catch {
    return null;
  }
}

function closePublicActionPanels(exceptPanel = null) {
  document.querySelectorAll(".public-action-section").forEach((panel) => {
    if (panel === exceptPanel) return;
    panel.hidden = true;
    panel.classList.remove("is-public-open");
  });
}

function openPublicActionPanel(selector, options = {}) {
  const panel = document.querySelector(selector);
  if (!panel) return;
  closePublicActionPanels(panel);
  panel.hidden = false;
  panel.classList.add("is-public-open");
  document.body.classList.add("landing-mode");

  if (selector === "#paid-report" && options.package && launchEls.paidReportForm?.elements.package) {
    launchEls.paidReportForm.elements.package.value = options.package;
  }

  panel.scrollIntoView({ behavior: "smooth", block: "start" });
  const focusTarget = panel.querySelector("input, select, textarea, button");
  window.setTimeout(() => focusTarget?.focus({ preventScroll: true }), 260);
}

function renderAccountStatus(account) {
  if (!launchEls.accountStatus) return;
  document.body.classList.toggle("account-signed-in", Boolean(account));
  if (!account) {
    launchEls.accountStatus.className = "launch-status";
    launchEls.accountStatus.textContent = "Sign in to manage account security.";
    return;
  }
  launchEls.accountStatus.className = `launch-status ${account.emailVerified ? "launch-status-ok" : "launch-status-error"}`;
  launchEls.accountStatus.textContent = account.emailVerified
    ? `Signed in as ${account.email}. Email verified.`
    : `Signed in as ${account.email}. Email verification is still required.`;
  if (launchEls.accountProfileForm) {
    launchEls.accountProfileForm.elements.name.value = account.name || "";
    launchEls.accountProfileForm.elements.company.value = account.company || "";
    launchEls.accountProfileForm.elements.role.value = account.role || "restaurant-owner";
  }
}

async function refreshAccountStatus() {
  renderAccountStatus(storedAccount());
  try {
    const response = await fetch("/api/me", { credentials: "same-origin" });
    const result = await response.json().catch(() => ({}));
    if (!response.ok) {
      renderAccountStatus(null);
      return null;
    }
    saveAccountSession(result);
    renderAccountStatus(result.account);
    return result.account;
  } catch {
    return storedAccount();
  }
}

function formPayload(form) {
  const data = new FormData(form);
  const payload = {};
  for (const [key, value] of data.entries()) payload[key] = String(value || "").trim();
  return payload;
}

async function postAccountForm(endpoint, form, statusEl, successCopy) {
  if (!form || !statusEl) return;
  statusEl.textContent = "Saving...";
  statusEl.className = "launch-status";
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      credentials: "same-origin",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formPayload(form))
    });
    const result = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(result.error || "Account request failed");
    saveAccountSession(result);
    statusEl.classList.add("launch-status-ok");
    statusEl.textContent = result.message || `${successCopy} ${result.account?.email || ""}`.trim();
    if (result.devVerificationUrl) {
      statusEl.innerHTML = `${escapeText(statusEl.textContent)} <a href="${escapeText(result.devVerificationUrl)}" target="_blank" rel="noopener">Open verification link</a>.`;
    }
    renderAccountStatus(result.account);
    form.reset();
  } catch (error) {
    statusEl.classList.add("launch-status-error");
    statusEl.textContent = error.message || "Could not complete account request.";
  }
}

async function postSecurityForm(endpoint, form, statusEl, successCopy) {
  if (!form || !statusEl) return;
  statusEl.textContent = "Saving...";
  statusEl.className = "launch-status";
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      credentials: "same-origin",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formPayload(form))
    });
    const result = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(result.error || "Request failed");
    if (result.account) {
      saveAccountSession(result);
      renderAccountStatus(result.account);
    }
    statusEl.classList.add("launch-status-ok");
    statusEl.textContent = result.message || successCopy;
    if (result.devVerificationUrl) {
      statusEl.innerHTML = `${escapeText(statusEl.textContent)} <a href="${escapeText(result.devVerificationUrl)}" target="_blank" rel="noopener">Open verification link</a>.`;
    }
    form.reset();
  } catch (error) {
    statusEl.classList.add("launch-status-error");
    statusEl.textContent = error.message || "Request failed.";
  }
}

function currentReportContext() {
  if (!state.zip) return null;
  const profile = profileForZip(state.zip);
  const businessResult = currentBusinessResult();
  const recommendations = profile ? buildRecommendations(profile) : [];
  const analysis = profile ? buildInstitutionalAnalysis(profile, recommendations) : null;
  return {
    business: businessDisplayName(state.business),
    zip: state.zip,
    address: state.location?.address || "",
    radiusMiles: state.location?.radiusMiles || "",
    decision: analysis?.decision || "",
    successProbability: analysis ? clampScore(analysis.successProbability) : null,
    confidence: analysis ? clampScore(analysis.confidenceScore) : null,
    competition: businessResult ? {
      count: businessResult.count,
      saturation: elements.businessSaturation?.textContent?.trim() || ""
    } : null
  };
}

async function postLaunchForm(endpoint, form, statusEl, successCopy) {
  if (!form || !statusEl) return;
  statusEl.textContent = "Saving...";
  statusEl.className = "launch-status";
  try {
    const payload = {
      ...formPayload(form),
      reportContext: currentReportContext()
    };
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const result = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(result.error || "Request failed");
    statusEl.classList.add("launch-status-ok");
    if (result.checkout?.url) {
      statusEl.innerHTML = `${escapeText(successCopy)} <a href="${escapeText(result.checkout.url)}" target="_blank" rel="noopener">Continue to checkout</a>.`;
    } else {
      statusEl.textContent = result.checkout?.message || result.message || successCopy;
    }
    form.reset();
  } catch (error) {
    statusEl.classList.add("launch-status-error");
    statusEl.textContent = error.message || "Could not save this request. Try again.";
  }
}

document.querySelectorAll(".launch-scroll").forEach((button) => {
  button.addEventListener("click", () => {
    const target = button.dataset.scroll;
    if (!target) return;
    closePublicActionPanels();
    document.querySelector(target)?.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

document.querySelectorAll("[data-open-panel]").forEach((button) => {
  button.addEventListener("click", () => {
    openPublicActionPanel(button.dataset.openPanel, {
      package: button.dataset.package
    });
  });
});

document.querySelectorAll("[data-start-analysis]").forEach((button) => {
  button.addEventListener("click", () => {
    closePublicActionPanels();
    document.body.classList.remove("landing-mode");
    if (elements.startScreen) elements.startScreen.hidden = true;
    if (elements.results) elements.results.hidden = false;
    const sv3App = document.querySelector("#sv3-app");
    if (typeof sv3ShowMain === "function") sv3ShowMain("input");
    document.querySelector("#sv3-biztype")?.focus({ preventScroll: true });
    sv3App?.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

launchEls.paidReportForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  postLaunchForm("/api/report-request", launchEls.paidReportForm, launchEls.paidReportStatus, "Report request saved.");
});

launchEls.signupForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  postAccountForm("/api/signup", launchEls.signupForm, launchEls.signupStatus, "Account created for");
});

launchEls.loginForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  postAccountForm("/api/login", launchEls.loginForm, launchEls.loginStatus, "Signed in as");
});

launchEls.passwordResetRequestForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  postSecurityForm(
    "/api/password-reset/request",
    launchEls.passwordResetRequestForm,
    launchEls.passwordResetRequestStatus,
    "If that email exists, a reset link has been queued."
  );
});

launchEls.passwordResetCompleteForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  postSecurityForm(
    "/api/password-reset/complete",
    launchEls.passwordResetCompleteForm,
    launchEls.passwordResetCompleteStatus,
    "Password reset complete. You can sign in now."
  );
});

launchEls.accountProfileForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  postSecurityForm("/api/account", launchEls.accountProfileForm, launchEls.accountProfileStatus, "Account updated.");
});

launchEls.changePasswordForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  postSecurityForm(
    "/api/change-password",
    launchEls.changePasswordForm,
    launchEls.changePasswordStatus,
    "Password updated."
  );
});

launchEls.resendVerificationButton?.addEventListener("click", async () => {
  const status = launchEls.accountStatus;
  if (!status) return;
  status.className = "launch-status";
  status.textContent = "Sending verification...";
  try {
    const response = await fetch("/api/resend-verification", { method: "POST", credentials: "same-origin" });
    const result = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(result.error || "Could not send verification.");
    if (result.account) {
      saveAccountSession(result);
      renderAccountStatus(result.account);
    }
    if (result.devVerificationUrl) {
      status.className = "launch-status launch-status-ok";
      status.innerHTML = `${escapeText(result.message || "Verification email queued.")} <a href="${escapeText(result.devVerificationUrl)}" target="_blank" rel="noopener">Open verification link</a>.`;
    }
  } catch (error) {
    status.className = "launch-status launch-status-error";
    status.textContent = error.message || "Could not send verification.";
  }
});

launchEls.logoutButton?.addEventListener("click", async () => {
  try {
    await fetch("/api/logout", { method: "POST", credentials: "same-origin" });
  } finally {
    localStorage.removeItem("areaIntelAccount");
    localStorage.removeItem("areaIntelSession");
    renderAccountStatus(null);
  }
});

launchEls.advisorForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  postLaunchForm("/api/advisor-request", launchEls.advisorForm, launchEls.advisorStatus, "Consultation request saved.");
});

launchEls.contactForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  postLaunchForm("/api/contact", launchEls.contactForm, launchEls.contactStatus, "Message saved. SpotVest will follow up.");
});

if (!applyUrlState()) {
  elements.startScreen.hidden = false;
  elements.results.hidden = true;
  document.body.classList.add("landing-mode");
  elements.message.textContent = "Enter a ZIP code or use an exact storefront address to start.";
}

const accountUrl = new URL(window.location.href);
const resetToken = accountUrl.searchParams.get("token");
if (accountUrl.pathname.endsWith("/reset-password") && resetToken && launchEls.passwordResetCompleteForm) {
  document.body.classList.add("landing-mode");
  launchEls.passwordResetCompleteForm.hidden = false;
  launchEls.passwordResetCompleteForm.elements.token.value = resetToken;
  openPublicActionPanel("#account-access");
}

if (accountUrl.pathname.endsWith("/verify-email") && resetToken) {
  fetch(`/api/verify-email?token=${encodeURIComponent(resetToken)}`, { credentials: "same-origin" })
    .then((response) => response.json().then((result) => ({ response, result })))
    .then(({ response, result }) => {
      if (!response.ok) throw new Error(result.error || "Verification failed.");
      saveAccountSession(result);
      renderAccountStatus(result.account);
      if (launchEls.accountStatus) {
        launchEls.accountStatus.className = "launch-status launch-status-ok";
        launchEls.accountStatus.textContent = result.message || "Email verified.";
      }
    })
    .catch((error) => {
      if (launchEls.accountStatus) {
        launchEls.accountStatus.className = "launch-status launch-status-error";
        launchEls.accountStatus.textContent = error.message || "Verification failed.";
      }
    });
  document.body.classList.add("landing-mode");
  openPublicActionPanel("#account-access");
}

refreshAccountStatus();

// --- Phase 6: SpotVest Assistant ---------------------------------------
// A floating chat that explains the current report. It only sends a compact,
// already-computed context to our own /api/assistant backend (the OpenAI key
// stays server-side); it never changes scoring or the data lifecycle.
const assistantEls = {
  toggle: document.querySelector("#assistant-toggle"),
  panel: document.querySelector("#assistant-panel"),
  close: document.querySelector("#assistant-close"),
  messages: document.querySelector("#assistant-messages"),
  suggestions: document.querySelector("#assistant-suggestions"),
  form: document.querySelector("#assistant-form"),
  input: document.querySelector("#assistant-input"),
  send: document.querySelector("#assistant-send"),
  cta: document.querySelector(".assistant-cta")
};

const assistantPrompts = [
  "Why did this location get this score?",
  "What are the biggest risks?",
  "Is the foot traffic strong enough?",
  "What does data confidence mean?",
  "Should I export this report?",
  "Should I compare another location?",
  "Should I request a consultation?"
];

let assistantGreeted = false;

const assistantOnboardClose = document.querySelector("#assistant-onboard-close");

// Queried lazily so these can be called from render() during bootstrap (when a
// shared link / refresh has URL params) before this module's consts initialize.
function assistantOnboardNode() { return document.querySelector("#assistant-onboard"); }

function assistantSeen() {
  try { return localStorage.getItem("areaintel-assistant-seen") === "1"; } catch { return true; }
}
function markAssistantSeen() {
  try { localStorage.setItem("areaintel-assistant-seen", "1"); } catch { /* ignore */ }
  const el = assistantOnboardNode();
  if (el) el.hidden = true;
}
// Subtle one-time nudge, shown once a report is on screen. Fully lazy (no
// module consts) so it is safe to call during bootstrap render().
function maybeShowAssistantOnboard() {
  const el = assistantOnboardNode();
  const panel = document.querySelector("#assistant-panel");
  if (!el || assistantSeen()) return;
  if (state.zip) {
    el.hidden = true;
    return;
  }
  if (!panel || !panel.hidden) return;
  el.hidden = false;
}
assistantOnboardClose?.addEventListener("click", markAssistantSeen);

// Compact, honest report context for the model — only values already shown.
function buildAssistantContext() {
  if (!state.zip) return null;
  const profile = profileForZip(state.zip);
  if (!profile) return null;
  const recommendations = buildRecommendations(profile);
  const businessResult = currentBusinessResult();
  const analysis = buildInstitutionalAnalysis(profile, recommendations);
  const confidence = confidenceFor(state.zip, businessResult);
  return {
    business: businessDisplayName(state.business),
    area: reportAreaTitle(state.zip, profile),
    address: state.location?.address || null,
    decision: analysis.decision,
    successProbability: `${clampScore(analysis.successProbability)}/100`,
    successTier: `${decisionTier(analysis.successProbability).tier} — ${decisionTier(analysis.successProbability).action}`,
    dataConfidence: `${confidence.label} (${clampScore(analysis.confidenceScore)}/100) — this is live-data coverage, not the odds of success`,
    footTraffic: {
      score: elements.footTrafficScore?.textContent?.trim() || "needs data",
      modeledDailyVisitors: elements.footTrafficVisitors?.textContent?.trim() || "needs analysis",
      note: "SpotVest Foot Traffic Model — estimated from mobility, transit, density, and commercial activity"
    },
    competition: {
      saturation: elements.businessSaturation?.textContent?.trim() || "checking",
      localVsChain: elements.businessMix?.textContent?.trim() || "mixed",
      readout: elements.businessVerdict?.textContent?.trim() || ""
    },
    topReasons: analysis.scores
      .slice()
      .sort((a, b) => safeNumber(b.value, 0) - safeNumber(a.value, 0))
      .slice(0, 3)
      .map((s) => `${s.name} ${formatScore(s.value)}`),
    risks: analysis.topRisks.slice(0, 5),
    alternatives: analysis.alternatives.slice(0, 3),
    revenueEstimate: {
      projection: elements.revenueProjection?.textContent?.trim() || "needs inputs",
      breakeven: elements.revenueBreakeven?.textContent?.trim() || "needs inputs",
      note: "modeled range, Due Diligence Required on operator financials"
    },
    dataHonesty: "Some signals are modeled or estimated; verify on-site before deciding."
  };
}

function assistantAppend(role, text, options = {}) {
  if (!assistantEls.messages) return null;
  const node = document.createElement("div");
  node.className = `assistant-msg assistant-msg-${role}`;
  if (options.loading) {
    node.classList.add("assistant-msg-loading");
    node.innerHTML = '<span class="assistant-dots"><i></i><i></i><i></i></span>';
  } else {
    node.textContent = text;
  }
  assistantEls.messages.appendChild(node);
  assistantEls.messages.scrollTop = assistantEls.messages.scrollHeight;
  return node;
}

function renderAssistantSuggestions() {
  if (!assistantEls.suggestions) return;
  assistantEls.suggestions.innerHTML =
    `<span class="assistant-suggestions-label">Suggested questions</span>` +
    assistantPrompts
      .map((p) => `<button type="button" class="assistant-chip">${escapeText(p)}</button>`)
      .join("");
}

function openAssistant() {
  if (!assistantEls.panel) return;
  markAssistantSeen();
  assistantEls.panel.hidden = false;
  document.body.classList.add("assistant-open");
  assistantEls.toggle?.setAttribute("aria-expanded", "true");
  if (!assistantGreeted) {
    const greeting = state.zip
      ? `Hi — ask me anything about ${businessDisplayName(state.business)} in ${reportAreaTitle(state.zip, profileForZip(state.zip))}. I can explain the recommendation, confidence, foot traffic, competition, risks, and next steps.`
      : "Hi — run an analysis first (a business type and a NYC ZIP or address) and I'll explain the recommendation, risks, foot traffic, and next steps.";
    assistantAppend("bot", greeting);
    assistantGreeted = true;
  }
  renderAssistantSuggestions();
  window.setTimeout(() => assistantEls.input?.focus(), 50);
}

function closeAssistant() {
  if (!assistantEls.panel) return;
  assistantEls.panel.hidden = true;
  document.body.classList.remove("assistant-open");
  assistantEls.toggle?.setAttribute("aria-expanded", "false");
}

async function sendAssistant(question) {
  const text = String(question || "").trim();
  if (!text || !assistantEls.send) return;
  if (text.length > 500) {
    assistantAppend("bot", "Please keep your question under 500 characters.");
    return;
  }
  assistantAppend("user", text);
  if (assistantEls.input) assistantEls.input.value = "";
  assistantEls.send.disabled = true;
  const loadingNode = assistantAppend("bot", "", { loading: true });

  try {
    const response = await fetch("/api/assistant", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: text, context: buildAssistantContext() })
    });
    const result = await response.json().catch(() => ({}));
    const answer = result.answer || "The assistant is unavailable right now. Please try again shortly.";
    if (loadingNode) {
      loadingNode.classList.remove("assistant-msg-loading");
      loadingNode.textContent = answer;
    }
  } catch {
    if (loadingNode) {
      loadingNode.classList.remove("assistant-msg-loading");
      loadingNode.textContent = "I couldn't reach the assistant. Check your connection and try again — or use Export PDF / Request Consultation.";
    }
  } finally {
    assistantEls.send.disabled = false;
    assistantEls.messages.scrollTop = assistantEls.messages.scrollHeight;
  }
}

function handleAssistantCta(type) {
  if (type === "export") {
    if (!state.zip) { assistantAppend("bot", "Run an analysis first, then I can export it as a one-page PDF."); return; }
    if (!signalsReady()) { assistantAppend("bot", "Market signals are still loading — give it a second, then export so the PDF is complete."); return; }
    exportExecPdf();
    assistantAppend("bot", "Opening the print dialog — choose “Save as PDF” to keep the one-page executive summary.");
  } else if (type === "compare") {
    if (!state.zip) { assistantAppend("bot", "Run an analysis first, then I can add it to your compare shortlist."); return; }
    if (!signalsReady()) { assistantAppend("bot", "Signals are still loading — once they finish I can add a clean snapshot to compare."); return; }
    addToCompare();
    assistantAppend("bot", `Added ${businessDisplayName(state.business)} to your compare shortlist. Run another ZIP or address and I'll rank them side by side.`);
  } else if (type === "advisor") {
    const where = state.zip ? ` for ${businessDisplayName(state.business)} in ${reportAreaTitle(state.zip, profileForZip(state.zip))}` : "";
    assistantAppend("bot", `Consultation request noted${where}. SpotVest can capture this request for follow-up when consultation support is available. This is not brokerage, legal, or financial service.`);
  }
}

assistantEls.toggle?.addEventListener("click", () => {
  if (assistantEls.panel?.hidden) openAssistant();
  else closeAssistant();
});
assistantEls.close?.addEventListener("click", closeAssistant);
assistantEls.form?.addEventListener("submit", (event) => {
  event.preventDefault();
  sendAssistant(assistantEls.input?.value);
});
assistantEls.input?.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    sendAssistant(assistantEls.input.value);
  }
});
assistantEls.suggestions?.addEventListener("click", (event) => {
  const chip = event.target.closest(".assistant-chip");
  if (chip) sendAssistant(chip.textContent);
});
assistantEls.cta?.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-cta]");
  if (button) handleAssistantCta(button.dataset.cta);
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !assistantEls.panel?.hidden) closeAssistant();
});
