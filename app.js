if (window.location.protocol === "file:") {
  window.location.replace("http://localhost:5174/");
}

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
  liveProfiles: {},
  lastBusinessResult: null,
  lastCivicResult: null,
  lastSiteIntelResult: null,
  lastConceptFitResult: null,
  leases: []
};
const leaseStorageKey = "areaintel-leases";
const legacyLeaseStorageKey = "tenantfit-leases";

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
  institutionalConfidence: document.querySelector("#institutional-confidence"),
  institutionalDecision: document.querySelector("#institutional-decision"),
  institutionalSummary: document.querySelector("#institutional-summary"),
  validationGrid: document.querySelector("#validation-grid"),
  scoreBreakdown: document.querySelector("#score-breakdown"),
  scenarioAnalysis: document.querySelector("#scenario-analysis"),
  rawDataList: document.querySelector("#raw-data-list"),
  missingDataList: document.querySelector("#missing-data-list"),
  explainabilityList: document.querySelector("#explainability-list"),
  conditionsList: document.querySelector("#conditions-list"),
  alternativesList: document.querySelector("#alternatives-list"),
  customerProfile: document.querySelector("#customer-profile"),
  chainTitle: document.querySelector("#chain-title"),
  chainCopy: document.querySelector("#chain-copy"),
  localFitBar: document.querySelector("#local-fit-bar"),
  talkingPoints: document.querySelector("#talking-points"),
  exportButton: document.querySelector("#export-button"),
  businessForm: document.querySelector("#business-form"),
  businessInput: document.querySelector("#business-input"),
  restaurantType: document.querySelector("#restaurant-type"),
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

let marketMap = null;
let mapLayers = [];

const zipCenters = {
  "10003": [40.7316, -73.9891],
  "11201": [40.6955, -73.9893],
  "11101": [40.7447, -73.9485],
  "10458": [40.8622, -73.8860],
  "10301": [40.6312, -74.0929]
};

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

function ensureMap() {
  if (!window.L || !elements.map) {
    elements.mapStatus.textContent = "Map library loading";
    return null;
  }

  if (!marketMap) {
    marketMap = L.map(elements.map, { scrollWheelZoom: false });
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors"
    }).addTo(marketMap);
  }

  return marketMap;
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

function renderMarketMap() {
  const map = ensureMap();
  if (!map) return;

  clearMapLayers();
  const center = mapCenterForZip(state.zip);
  map.setView(center, state.location ? 15 : 13);

  if (state.location) {
    addMapMarker(state.location.lat, state.location.lng, "address-marker", `<strong>${state.location.address}</strong><br>Search center`);
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
  const records = businessResult?.mapRecords || [];
  records.forEach((record) => {
    addMapMarker(
      record.lat,
      record.lng,
      "registry-marker",
      `<strong>${record.name}</strong><br>${record.category || "Local activity"}<br>${record.address || ""}<br><small>Local market activity</small>`
    );
  });

  const places = businessResult?.googlePlaces?.mapPlaces || businessResult?.googlePlaces?.topPlaces || [];
  places.forEach((place) => {
    addMapMarker(
      place.lat,
      place.lng,
      "competitor-marker",
      `<strong>${place.name}</strong><br>${place.rating || "No"} rating · ${Number(place.reviews || 0).toLocaleString()} reviews`
    );
  });

  state.leases
    .filter((lease) => lease.zip === state.zip && lease.lat && lease.lng)
    .forEach((lease) => {
      addMapMarker(
        lease.lat,
        lease.lng,
        "lease-marker",
        `<strong>${lease.address}</strong><br>${lease.sf ? `${Number(lease.sf).toLocaleString()} SF` : "SF unknown"} · ${lease.rent ? `$${Number(lease.rent).toLocaleString()}/mo` : "Cost unknown"}`
      );
    });

  elements.mapStatus.textContent = state.location
    ? `Address radius · ${state.location.radiusMiles} mi`
    : `Area view · ZIP ${state.zip}`;
  window.setTimeout(() => map.invalidateSize(), 120);
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
      `AreaIntel can analyze this ${borough} ZIP. The first pass uses market profile assumptions plus live local activity signals; verify the exact block before making a final business decision.`,
    talkingPoints: [
      "Use competitive intensity as the first screen for category saturation.",
      "Validate the exact avenue, corner visibility, frontage, and nearby anchors.",
      "Treat broad customer profile signals as directional until stronger area evidence is connected."
    ],
    evidence: [
      "ZIP is recognized as an NYC ZIP code in AreaIntel.",
      "Business checker can query local market activity and competitive signals.",
      "Customer profile is directional until market demographics are connected."
    ]
  };
}

function enrichProfileWithCensus(baseProfile, census) {
  if (!census || census.error) return baseProfile;

  const medianIncome = census.medianIncome ? `$${Math.round(census.medianIncome).toLocaleString()}` : "not available";
  const medianRent = census.medianRent ? `$${Math.round(census.medianRent).toLocaleString()}` : "not available";
  const renterShare = census.renterShare !== null && census.renterShare !== undefined ? `${census.renterShare}%` : "not available";
  const bachelorShare = census.bachelorShare !== null && census.bachelorShare !== undefined ? `${census.bachelorShare}%` : "not available";
  const medianAge = census.medianAge ? `${Math.round(census.medianAge)}` : "not available";

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
      ["Household profile", `Population is ${census.population?.toLocaleString() || "not available"} with ${census.households?.toLocaleString() || "not available"} households and ${renterShare} renter occupancy.`],
      ["Education / age", `Median age is ${medianAge}; bachelor-plus education share is ${bachelorShare}.`]
    ],
    evidence: [
      `Market Demographics: median household income ${medianIncome}.`,
      `Market Demographics: renter share ${renterShare}, median gross rent ${medianRent}.`,
      `Market Demographics: population ${census.population?.toLocaleString() || "not available"}, median age ${medianAge}.`
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
    return total + ((profile[metric] || 50) - 50) * weight * 2.25;
  }, 56);

  const competition = opportunityCompetition(state.zip, model.business, profile, options);
  const localFit = model.business === "restaurant"
    ? Math.round((profile.nightlife + profile.transit + profile.density - profile.rent * 0.45) / 3)
    : Math.round((profile.localPreference + profile.density - profile.rent * 0.35) / 2.2);
  const contextAdjustment = Math.max(-8, Math.min(8, Math.round((localFit - 50) / 8)));

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

function normalizeBusiness(input) {
  const value = input.trim().toLowerCase();
  const match = Object.entries(businessTypes).find(([, config]) => {
    return config.aliases.some((alias) => value.includes(alias));
  });

  return match ? match[0] : value || "business";
}

function titleCase(value) {
  return value
    .split(" ")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
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
  const demandFactor = item.score / 100;
  const incomeFactor = Math.max(0.75, profile.income / 80);
  const rentDrag = Math.max(0.68, 1 - profile.rent / 260);
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
  return `$${low.toLocaleString()}-${high.toLocaleString()}/mo`;
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
  return signal ? Number(signal.momentumScore || 50) : 50;
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
    ? "competition still modeled"
    : `${competition.label.toLowerCase()} market pressure`;

  return `Driven by ${positiveDrivers.join(" and ")}${drag ? `; watch ${drag}` : ""}. Competition: ${competitionCopy}.`;
}

function renderOpportunities(profile) {
  const recommendations = buildRecommendations(profile).slice(0, 5);
  const liveCompetition = currentBusinessResult()?.registryExact;
  elements.opportunitySource.textContent = liveCompetition
    ? "Verified signals + model ranges"
    : "Directional model";
  elements.opportunityList.innerHTML = recommendations
    .map((item) => {
      const profit = estimateMonthlyProfit(item, profile);
      const competition = opportunityCompetition(state.zip, item.business, profile);
      const risk = item.score >= 72 ? "Good fit" : item.score >= 58 ? "Selective" : "Risky";
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
            <span>${risk} · ${scoreType} score ${item.score}</span>
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

  elements.categorySource.textContent = liveCompetition
    ? `Signal-adjusted for ${currentBusinessResult().business}`
    : "Directional area model";
  elements.categoryList.innerHTML = visibleRecommendations
    .map(
      (item) => `
        <article class="category-item">
          <div>
            <h4>${item.name}</h4>
            <p>${item.note}</p>
          </div>
          <div class="score ${item.band}" aria-label="${item.band} fit score">${item.score}</div>
        </article>
      `
    )
    .join("");
}

function renderTopPlaces(result) {
  const places = result?.googlePlaces?.topPlaces || [];
  elements.placesTitle.textContent = `Best nearby competitive examples`;
  elements.placesSource.textContent = result?.searchContext?.mode === "address-radius"
    ? `Competitive Signals · ${result.searchContext.radiusMiles} mi`
    : result?.googlePlaces ? "Competitive Signals" : "Waiting for competitive signals";

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
      const tenure = result.tenure?.text || "Business age unavailable";
      return `
        <article class="place-card">
          ${photo}
          <div>
            <h4>${place.name}</h4>
            <p>${place.address || "Address unavailable"}</p>
            <div class="place-meta">
              <span>${place.rating ? `${place.rating} rating` : "No rating"}</span>
              <span>${place.reviews?.toLocaleString() || 0} reviews</span>
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

function renderCivicLoading() {
  elements.civicSource.textContent = state.location ? "Local activity + address radius" : "Local Market Activity";
  elements.complaintLevel.textContent = "Checking";
  elements.complaintCopy.textContent = "Loading recent quality-of-life signals.";
  elements.complaintTypes.innerHTML = "";
  elements.permitLevel.textContent = "Checking";
  elements.permitCopy.textContent = "Loading development activity.";
  elements.permitTypes.innerHTML = "";
}

function miniList(items) {
  if (!items?.length) return "<span>No verified signal returned</span>";
  return items
    .slice(0, 4)
    .map((item) => `<span>${item.type}</span>`)
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
  elements.complaintLevel.textContent = `${data.complaints.level} local activity`;
  elements.complaintCopy.textContent =
    `Recent quality-of-life signal ${radiusText}. Use this as a risk indicator, not a foot-traffic count.`;
  elements.complaintTypes.innerHTML = miniList(data.complaints.topTypes);
  elements.permitLevel.textContent = `${data.permits.level} permit activity`;
  elements.permitCopy.textContent =
    `Development activity signal in ZIP ${data.zip}. This shows area momentum, not current availability.`;
  elements.permitTypes.innerHTML = miniList(data.permits.topTypes);

  const profile = profileForZip(state.zip);
  if (profile) renderInstitutionalAnalysis(profile, buildRecommendations(profile));
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
    const response = await fetch(`/api/civic-signals?${params.toString()}`);
    if (!response.ok) throw new Error("Civic lookup failed");
    const data = await response.json();
    if (requestId !== state.civicRequestId) return;
    renderCivicSignals(data);
  } catch {
    if (requestId !== state.civicRequestId) return;
    state.lastCivicResult = null;
    elements.complaintLevel.textContent = "Unavailable";
    elements.complaintCopy.textContent = "Quality-of-life signal lookup failed. Try again later.";
    elements.permitLevel.textContent = "Unavailable";
    elements.permitCopy.textContent = "Development activity lookup failed. Try again later.";
  }
}

function renderConceptLoading() {
  elements.conceptSource.textContent = state.location ? "Address radius" : "Area concept scan";
  elements.conceptFitList.innerHTML = `
    <article class="empty-places">
      <strong>Checking cuisine gaps</strong>
      <p>AreaIntel is comparing competitive visibility with local restaurant activity.</p>
    </article>
  `;
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
  elements.conceptSource.textContent = data.searchContext?.mode === "address-radius"
    ? `Competitive Signals · ${data.searchContext.radiusMiles} mi`
    : "Competitive Signals";

  if (!concepts.length) {
    elements.conceptFitList.innerHTML = `
      <article class="empty-places">
        <strong>No concept signal returned</strong>
        <p>Try checking a specific restaurant type in the Business Checker.</p>
      </article>
    `;
    return;
  }

  elements.conceptFitList.innerHTML = concepts.slice(0, 6).map((concept) => {
    const topNames = concept.topNames?.length
      ? concept.topNames.slice(0, 3).map(escapeText).join(", ")
      : "No visible examples returned";
    return `
      <article class="concept-card concept-${concept.tone}">
        <div>
          <span class="signal-label">${escapeText(concept.verdict)}</span>
          <h4>${escapeText(concept.label)}</h4>
          <p>${concept.verdict} competitive intensity${concept.avgRating ? ` · ${concept.avgRating} average rating signal` : ""}</p>
          <small>Visible examples: ${topNames}</small>
        </div>
        <strong>${concept.score}</strong>
      </article>
    `;
  }).join("");

  const profile = profileForZip(state.zip);
  if (profile) renderInstitutionalAnalysis(profile, buildRecommendations(profile));
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

  const params = new URLSearchParams({ zip: state.zip });
  if (state.location) {
    params.set("lat", state.location.lat);
    params.set("lng", state.location.lng);
    params.set("radius", state.location.radiusMiles);
    params.set("address", state.location.address);
  }

  try {
    const response = await fetch(`/api/restaurant-concepts?${params.toString()}`);
    if (!response.ok) throw new Error("Concept lookup failed");
    const data = await response.json();
    if (requestId !== state.conceptRequestId) return;
    renderConceptFit(data);
  } catch {
    if (requestId !== state.conceptRequestId) return;
    state.lastConceptFitResult = null;
    elements.conceptSource.textContent = "Unavailable";
    elements.conceptFitList.innerHTML = `
      <article class="empty-places">
        <strong>Concept fit unavailable</strong>
        <p>Competitive and local activity signals did not return concept data right now.</p>
      </article>
    `;
  }
}

function renderSiteIntelLoading() {
  elements.siteIntelSource.textContent = state.location ? "Address + area signals" : "Area-level signals";
  elements.sidewalkLevel.textContent = "Checking";
  elements.sidewalkCopy.textContent = "Loading outdoor dining activity.";
  elements.sidewalkTypes.innerHTML = "";
  elements.liquorLevel.textContent = "Checking";
  elements.liquorCopy.textContent = "Loading license activity.";
  elements.liquorTypes.innerHTML = "";
  elements.mtaLevel.textContent = state.location ? "Checking" : "Needs address";
  elements.mtaCopy.textContent = state.location
    ? "Loading nearby mobility signal."
    : "Enter an exact address to calculate nearby mobility signal.";
  elements.mtaTypes.innerHTML = "";
  elements.plutoLevel.textContent = "Checking";
  elements.plutoCopy.textContent = "Loading commercial mix.";
  elements.plutoTypes.innerHTML = "";
}

function numberLabel(value) {
  return Number(value || 0).toLocaleString();
}

function renderSiteIntelligence(data) {
  state.lastSiteIntelResult = data;
  elements.siteIntelSource.textContent = data.searchContext?.mode === "address-radius"
    ? "Address radius + area"
    : "Area-level signals";

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
      `Nearby transit activity ${data.mta.scope}. Use as a mobility proxy, not exact foot traffic.`;
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

  const profile = profileForZip(state.zip);
  if (profile) renderInstitutionalAnalysis(profile, buildRecommendations(profile));
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
  const rent = Number(lease.rent || 0);
  const sf = Number(lease.sf || 0);
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
  const rent = Number(lease.rent || 0);
  const sf = Number(lease.sf || 0);
  const sales = Number(lease.sales || 0);
  const buildout = Number(lease.buildout || 0);
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
  if (perSf === null) return "Rent unknown";
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
  const links = [
    ["Market listing search", "Established commercial platforms", quickSearchUrl("loopnet", state.zip)],
    ["Retail availability", "Commercial space directories", quickSearchUrl("commercialCafe", state.zip)],
    ["Flexible space", "Pop-up / short-term options", quickSearchUrl("storefront", state.zip)],
    ["Commercial inventory", "Additional public listings", quickSearchUrl("crexi", state.zip)],
    ["Local posts", "Owner / local posts", quickSearchUrl("craigslist", state.zip)],
    ["Broad web search", "General public listings", quickSearchUrl("google", state.zip)]
  ];

  elements.listingSearchContext.textContent = state.location?.address
    ? `Address search · ${state.location.radiusMiles} mi`
    : `ZIP ${state.zip}`;
  elements.leaseSearchLinks.innerHTML = links
    .map(([label, copy, href]) => `
      <a href="${href}" target="_blank" rel="noreferrer">
        <strong>${label}</strong>
        <span>${copy}</span>
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
      <p>AreaIntel is checking public web results and will show source links here.</p>
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
      const rent = Number(lease.rent || 0);
      const sf = Number(lease.sf || 0);
      const link = lease.link
        ? `<a href="${lease.link}" target="_blank" rel="noreferrer">Open source</a>`
        : "";
      const neededSales = math.neededSalesLow && math.neededSalesHigh
        ? `$${math.neededSalesLow.toLocaleString()}-${math.neededSalesHigh.toLocaleString()}/mo`
        : "Enter rent";
      const ratio = math.salesRatio !== null ? `${Math.round(math.salesRatio * 100)}% of sales` : "Add sales estimate";
      const perSfYear = math.perSfYear !== null ? `$${Math.round(math.perSfYear).toLocaleString()}/SF/yr` : "No rent/SF";
      const conceptLabel = math.model.label;
      return `
        <article class="lease-card lease-fit-${math.tone}">
          <div>
            <h4>${lease.address}</h4>
            <p>${lease.use}${lease.concept ? ` · ${conceptLabel}` : ""} · ${sf ? `${sf.toLocaleString()} SF` : "SF unknown"} · ${rent ? `$${rent.toLocaleString()}/mo` : "Cost unknown"}</p>
            <div class="lease-fit-grid">
              <span><strong>${fit}</strong><small>Cost fit</small></span>
              <span><strong>${neededSales}</strong><small>Sales needed</small></span>
              <span><strong>${ratio}</strong><small>Cost-to-sales</small></span>
              <span><strong>${perSfYear}</strong><small>Annual cost/SF</small></span>
            </div>
            <div class="place-meta">
              <span>${rentPressureForLease(lease, profile)}</span>
              <span>${perSf ? `$${perSf.toFixed(2)}/SF/mo` : "No rent/SF"}</span>
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
    const response = await fetch(`/api/site-intelligence?${params.toString()}`);
    if (!response.ok) throw new Error("Site intelligence lookup failed");
    const data = await response.json();
    if (requestId !== state.siteIntelRequestId) return;
    renderSiteIntelligence(data);
  } catch {
    if (requestId !== state.siteIntelRequestId) return;
    state.lastSiteIntelResult = null;
    elements.sidewalkLevel.textContent = "Unavailable";
    elements.sidewalkCopy.textContent = "Outdoor dining activity lookup failed.";
    elements.liquorLevel.textContent = "Unavailable";
    elements.liquorCopy.textContent = "License activity lookup failed.";
    elements.mtaLevel.textContent = "Unavailable";
    elements.mtaCopy.textContent = "Mobility signal lookup failed.";
    elements.plutoLevel.textContent = "Unavailable";
    elements.plutoCopy.textContent = "Commercial mix lookup failed.";
  }
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

function decisionCopyFor(decision, successProbability, confidenceScore, riskScore) {
  if (decision === "OPEN") {
    return "Strong customer fit and healthy demand support opening, subject to normal site diligence.";
  }
  if (decision === "DO NOT OPEN") {
    return riskScore < 35
      ? "Current market conditions show severe risk signals for this business."
      : "Current market conditions appear unfavorable for this business.";
  }
  if (confidenceScore < 70) {
    return `Opportunity exists, but confidence is ${confidenceScore}/100. More proof is needed before a yes.`;
  }
  return `Opportunity exists with a ${successProbability}/100 success probability, but conditions must be met.`;
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
    answer: "DO NOT OPEN",
    copy: `${titleCase(state.business)} does not currently clear the success threshold for this location.`,
    next: "Find a better fit",
    nextCopy: "Look for a stronger customer base, lower cost pressure, or a clearer gap in competition."
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
      copy: "Market demographics, local activity, competitive visibility, and demand momentum are connected where available."
    };
  }

  if (sourceCount === 2) {
    return {
      label: "Good",
      copy: "Two market signal groups are connected. Treat remaining modeled scores as directional."
    };
  }

  if (sourceCount === 1) {
    return {
      label: "Directional",
      copy: "Only part of the report is live. Use this as a first screen, not final client advice."
    };
  }

  return {
    label: "Modeled",
    copy: "Market signals are still loading or unavailable. Do not present this as verified research yet."
  };
}

function scoreQualityLabel(value) {
  if (value >= 85) return "HIGH";
  if (value >= 70) return "MEDIUM";
  return "LOW";
}

function moneyRange(low, high) {
  return `$${Math.round(low).toLocaleString()}-${Math.round(high).toLocaleString()}`;
}

function clampScore(value) {
  return Math.max(0, Math.min(100, Math.round(value)));
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
  const demandSignalLabel = demandMomentumLabel(businessResult);
  const demandSignalScore = demandMomentumScore(businessResult);
  const reviewMomentum = businessResult?.googlePlaces
    ? clampScore(Math.min(100, Math.log10(googleReviews + 1) * 24 + googleRating * 7))
    : 45;
  const categoryFit = categoryFitForBusiness(business, profile);
  const civicPenalty = civicResult?.complaints?.level === "High" ? 9 : civicResult?.complaints?.level === "Moderate" ? 4 : 0;
  const permitBoost = civicResult?.permits?.level === "Heavy" ? 10 : civicResult?.permits?.level === "Active" ? 6 : 2;
  const propertyBoost = siteIntelResult?.pluto?.retailArea > 500000 ? 6 : siteIntelResult?.pluto?.retailArea > 150000 ? 3 : 0;
  const transitBoost = siteIntelResult?.mta?.available && siteIntelResult.mta.totalDecember2024Ridership > 250000 ? 8 : 0;
  const budgetSupport = budgetSupportScore(config);
  const demandScore = clampScore(profile.density * 0.18 + profile.transit * 0.14 + profile.office * 0.09 + profile.nightlife * 0.07 + profile.tourist * 0.05 + profile.student * 0.05 + config.baseDemand * 0.18 + reviewMomentum * 0.14 + demandSignalScore * 0.1);
  const customerFitScore = clampScore(profile.income * 0.24 + profile.families * 0.14 + profile.student * 0.08 + profile.office * 0.12 + profile.localPreference * 0.16 + profile.chainFit * 0.1 + categoryFit * 0.16);
  const competitionScore = clampScore(100 - competitionPressure * 0.78 + (businessResult?.googlePlaces?.avgRating >= 4.5 ? 4 : 0));
  const locationScore = clampScore(profile.transit * 0.34 + profile.density * 0.22 + profile.office * 0.12 + (100 - profile.rent) * 0.1 + propertyBoost + transitBoost + (state.location ? 6 : 0));
  const financialScore = clampScore(profile.income * 0.3 + (100 - profile.rent) * 0.28 + (100 - config.rentSensitivity) * 0.1 + categoryFit * 0.14 + profile.chainFit * 0.1 + budgetSupport * 0.08);
  const growthScore = clampScore(45 + permitBoost + propertyBoost + profile.office * 0.12 + profile.density * 0.1 + profile.transit * 0.08);
  const riskRaw = clampScore(profile.rent * 0.34 + competitionPressure * 0.32 + (100 - profile.income) * 0.1 + (100 - profile.transit) * 0.08 + civicPenalty + (!state.location ? 6 : 0));
  const riskScore = clampScore(100 - riskRaw);
  const successProbability = clampScore(
    demandScore * businessSuccessWeights.demand +
      customerFitScore * businessSuccessWeights.customerFit +
      competitionScore * businessSuccessWeights.competition +
      financialScore * businessSuccessWeights.financial +
      locationScore * businessSuccessWeights.location +
      growthScore * businessSuccessWeights.growth +
      riskScore * businessSuccessWeights.risk
  );

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
      why: `Estimated Factors from cost pressure, income support, category sensitivity, margin potential, budget support (${state.budget ? `$${state.budget.toLocaleString()}` : "not provided"}), and likely operating difficulty.`
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
  const civic = Boolean(civicResult);
  const siteIntel = Boolean(siteIntelResult);
  const concepts = Boolean(conceptFitResult?.concepts?.length);
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
    !liveProfile && "Fresh market demographics not loaded yet",
    !liveBusiness && "Observed local activity not confirmed yet",
    !google && "Competitive ratings/review visibility not confirmed yet",
    !demandSignal && "Consumer demand momentum not confirmed yet",
    !civic && "Risk and development signals not loaded yet",
    !siteIntel && "Mobility and commercial mix signals not loaded yet",
    !concepts && "Restaurant cuisine concept scan not loaded yet",
    !address && "Exact address, frontage, cost, and block visibility missing",
    "True foot traffic, dwell time, parking, location cost, and operator financials are not directly verified"
  ].filter(Boolean);
  const conflicts = [];
  if (businessResult?.openDataCount > 0 && businessResult?.googleVisibleCount > 0) {
    const ratio = Math.max(businessResult.openDataCount, businessResult.googleVisibleCount) / Math.max(1, Math.min(businessResult.openDataCount, businessResult.googleVisibleCount));
    if (ratio >= 4) conflicts.push("Competitive signal sources disagree materially; treat saturation as directional.");
  }
  if (civicResult?.complaints?.level === "High" && profile.rent >= 78) {
    conflicts.push("High local friction plus high cost pressure raises execution risk.");
  }

  const completeness = Math.max(20, Math.min(96, 28 + sources.length * 9 + (address ? 7 : 0) - conflicts.length * 7));
  const freshness = Math.max(35, Math.min(95, 44 + (liveProfile ? 10 : 0) + (liveBusiness ? 11 : 0) + (google ? 9 : 0) + (demandSignal ? 5 : 0) + (civic ? 9 : 0) + (siteIntel ? 9 : 0) + (concepts ? 7 : 0)));
  const sourceQuality = Math.max(25, Math.min(95, 30 + sources.length * 9 - conflicts.length * 8));
  const demandPenalty = demandSignal ? 0 : 4;
  const confidenceScore = Math.max(20, Math.round(completeness * 0.34 + freshness * 0.28 + sourceQuality * 0.38 - demandPenalty));
  const successModel = buildBusinessSuccessModel(profile, recommendations);
  const scores = successModel.scores;
  const riskScoreItem = scores.find((item) => item.name === "Risk");
  if (civicResult?.complaints?.level === "High") {
    riskScoreItem.value = Math.max(0, riskScoreItem.value - 8);
    riskScoreItem.why = `${riskScoreItem.why} Verified Signals: local friction is high in the selected area.`;
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
  const opportunityScore = clampScore(
    scores.find((item) => item.name === "Demand").value * businessSuccessWeights.demand +
      scores.find((item) => item.name === "Customer fit").value * businessSuccessWeights.customerFit +
      scores.find((item) => item.name === "Competition").value * businessSuccessWeights.competition +
      scores.find((item) => item.name === "Financial viability").value * businessSuccessWeights.financial +
      scores.find((item) => item.name === "Location quality").value * businessSuccessWeights.location +
      scores.find((item) => item.name === "Area momentum").value * businessSuccessWeights.growth +
      scores.find((item) => item.name === "Risk").value * businessSuccessWeights.risk
  );
  const riskScore = scores.find((item) => item.name === "Risk").value;
  const severeRisk = riskScore < 35 || (civicResult?.complaints?.level === "High" && successModel.competitionPressure >= 82);
  const decision = opportunityScore < 55 || severeRisk
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
    `Minimum revenue: ${moneyRange(revenueBase * demandMultiplier * 0.68, revenueBase * demandMultiplier * 1.02)}/mo base-case estimated factor`,
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
    !demandSignal && "Consumer demand momentum is unavailable or only partially estimated",
    civicResult?.complaints?.level === "High" && "Recent complaint volume is high",
    "Operator financials and exact location economics are not verified"
  ].filter(Boolean);
  const explainability = [
    {
      type: "Verified Signals",
      items: [
        liveProfile
          ? `Market demographics loaded for ZIP ${state.zip}: ${profile.name}.`
          : "Fresh market demographics are not loaded yet.",
        liveBusiness
          ? `Local market activity confirms observed ${businessResult.business} competition.`
          : "Observed local competition is not confirmed yet.",
        google
          ? `Competitive visibility and review signals are connected.`
          : "Competitive review visibility is not confirmed yet.",
        demandSignal
          ? `${demandMomentumLabel(businessResult)} is connected as a demand signal.`
          : "Consumer demand momentum is unavailable.",
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
        `Scenario revenue and failure probability are screening estimates, not verified operator financials.`,
        `Maximum location cost guidance is estimated from category economics and area cost pressure.`,
        `Success probability is weighted as Demand 25%, Customer Fit 20%, Competition 15%, Financial 15%, Location 10%, Growth 10%, Risk 5%.`
      ]
    }
  ];

  return {
    rawData: [
      `Business: ${titleCase(successModel.business)}`,
      `Location: ${state.location ? `${state.location.address} within ${state.location.radiusMiles} mi` : `ZIP ${state.zip} - ${profile.name}`}`,
      `Demographics: density ${profile.density}/100, income ${profile.income}/100, families ${profile.families}/100, student ${profile.student}/100`,
      `Mobility/demand: transit ${profile.transit}/100, office ${profile.office}/100, nightlife ${profile.nightlife}/100, tourist ${profile.tourist}/100`,
      `Competition: ${businessResult?.registryExact ? `observed ${businessResult.business} market activity connected` : `modeled area competition ${profile.competition}/100`}`,
      `Cost pressure: ${profile.rent}/100`,
      `Consumer signal: ${google ? "competitive visibility connected" : "competitive visibility not confirmed yet"}`,
      `Demand momentum: ${demandMomentumLabel(businessResult)}`,
      `Risk inputs: ${civic ? "local risk and development signals connected" : "risk sources not loaded yet"}`,
      `Mobility and commercial mix: ${siteIntel ? "mobility and commercial signals connected" : "site intelligence signals not loaded yet"}`
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
    summary: `${titleCase(successModel.business)} has a ${opportunityScore}/100 success probability screen in this area. ${decisionCopyFor(decision, opportunityScore, confidenceScore, riskScore)}`,
    topRecommendation: {
      name: titleCase(successModel.business),
      score: opportunityScore
    },
    alternatives: recommendations
      .filter((item) => item.business !== successModel.business)
      .slice(0, 5)
      .map((item) => `${item.name} (${item.score}/100): ${item.note}`),
    explainability,
    conditions,
    topRisks,
    scenarios: [
      {
        name: "BEST CASE",
        traffic: "High repeat traffic with strong operator execution",
        revenue: `${moneyRange(revenueBase * demandMultiplier * 0.95, revenueBase * demandMultiplier * 1.35)}/mo estimated factor`,
        breakeven: "6-12 months estimated factor",
        failure: `${Math.max(8, failureBase - 16)}% estimated factor`
      },
      {
        name: "BASE CASE",
        traffic: "Normal neighborhood demand with some direct competition",
        revenue: `${moneyRange(revenueBase * demandMultiplier * 0.68, revenueBase * demandMultiplier * 1.02)}/mo estimated factor`,
        breakeven: "12-24 months estimated factor",
        failure: `${failureBase}% estimated factor`
      },
      {
        name: "WORST CASE",
        traffic: "Weak conversion, high rent drag, or saturated category",
        revenue: `${moneyRange(revenueBase * demandMultiplier * 0.38, revenueBase * demandMultiplier * 0.65)}/mo estimated factor`,
        breakeven: "24+ months or never estimated factor",
        failure: `${Math.min(88, failureBase + 18)}% estimated factor`
      }
    ]
  };
}

function renderInstitutionalAnalysis(profile, recommendations) {
  const analysis = buildInstitutionalAnalysis(profile, recommendations);
  elements.institutionalConfidence.textContent = `Confidence ${analysis.confidenceScore}/100 · ${analysis.validation.sourceReliability}`;
  elements.institutionalDecision.textContent = analysis.decision;
  elements.institutionalSummary.textContent = analysis.summary;
  elements.validationGrid.innerHTML = [
    ["Completeness", `${analysis.validation.completeness}/100`],
    ["Freshness", `${analysis.validation.freshness}/100`],
    ["Source quality", `${analysis.validation.sourceQuality}/100`],
    ["Confidence", `${analysis.confidenceScore}/100`]
  ].map(([label, value]) => `<div><span>${label}</span><strong>${value}</strong></div>`).join("");
  elements.scoreBreakdown.innerHTML = analysis.scores
    .map((score) => `
      <div class="score-row">
        <div>
          <strong>${score.name}</strong>
          <small>${score.why}</small>
        </div>
        <span>${score.value}</span>
      </div>
    `)
    .join("");
  elements.scenarioAnalysis.innerHTML = analysis.scenarios
    .map((scenario) => `
      <div class="scenario-card">
        <strong>${scenario.name}</strong>
        <span>${scenario.revenue}</span>
        <small>${scenario.traffic}; breakeven ${scenario.breakeven}; failure probability ${scenario.failure}.</small>
      </div>
    `)
    .join("");
  elements.rawDataList.innerHTML = analysis.rawData.map((item) => `<li>${escapeText(item)}</li>`).join("");
  const missingItems = [...analysis.validation.missing, ...analysis.validation.conflicts];
  elements.missingDataList.innerHTML = missingItems.map((item) => `<li>${escapeText(item)}</li>`).join("");
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
    `Top recommendation: ${analysis.topRecommendation.name} (${analysis.topRecommendation.score}/100)`,
    ...analysis.alternatives.map((item) => `Alternative: ${item}`),
    ...analysis.topRisks.slice(0, 4).map((item) => `Risk: ${item}`)
  ].map((item) => `<li>${escapeText(item)}</li>`).join("");
}

function renderDecisionStrip(profile, recommendations) {
  const businessResult = currentBusinessResult();
  const decision = decisionFor(profile, recommendations, businessResult);
  const confidence = confidenceFor(state.zip, businessResult);
  const analysis = buildInstitutionalAnalysis(profile, recommendations);

  elements.agentAnswer.textContent = decision.answer;
  elements.agentAnswer.className = `decision-badge decision-${decision.answer.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
  elements.agentAnswerCopy.textContent = decision.copy;
  elements.decisionSuccess.textContent = `${analysis.successProbability}/100`;
  elements.dataConfidence.textContent = confidence.label;
  elements.dataConfidenceCopy.textContent = confidence.copy;
  elements.nextMove.textContent = decision.next;
  elements.nextMoveCopy.textContent = decision.nextCopy;
}

function businessVerdictFor(score, profile, config) {
  if (score >= 78 && profile.rent >= 78) return "Risky unless the operator has a sharp niche.";
  if (score >= 78) return "Possible, but competition is heavy.";
  if (score >= 58 && config.baseDemand >= 68) return "Good if the operator is stronger than average.";
  if (score < 38 && config.baseDemand >= 60) return "Potential gap worth validating.";
  if (profile.income < 48 && config.rentSensitivity > 70) return "Weak fit for this customer base.";
  return "Worth checking at the exact block level.";
}

function applyBusinessResult({ count, business, sourceNote, isLive, result, loading = false }) {
  const profile = profileForZip(state.zip);
  const config = modeledBusinessConfig(business);
  const saturation = saturationFromCount(count, profile);
  const localAdvantage = Math.round((profile.localPreference + config.localBias - config.chainBias) / 2);
  const mix =
    localAdvantage >= 62
      ? "Mostly local"
      : config.chainBias >= 68 && profile.chainFit >= 68
        ? "Chain-friendly"
        : "Mixed market";

  elements.businessInput.value = state.business;
  if (elements.restaurantType) {
    const hasOption = [...elements.restaurantType.options].some((option) => option.value === business);
    elements.restaurantType.value = hasOption ? business : "";
  }
  elements.businessCount.textContent = loading ? "..." : saturationLabel(saturation);
  elements.businessCountLabel.textContent = isLive
    ? `${titleCase(business)} market pressure`
    : `${titleCase(business)} directional pressure`;
  elements.businessSourceTags.innerHTML = sourceTagsForResult(result, isLive)
    .map((tag) => `<span>${tag}</span>`)
    .join("");
  elements.businessSaturation.textContent = loading ? "Checking" : saturationLabel(saturation);
  elements.businessMeter.value = loading ? 0 : saturation;
  elements.businessMix.textContent = loading ? "Checking" : mix;
  elements.businessMixCopy.textContent = loading
    ? "AreaIntel is checking market signals before scoring the business."
    : mix === "Mostly local"
      ? "Independent operators can compete here if they understand the neighborhood and price correctly."
      : mix === "Chain-friendly"
        ? "Recognized brands may have an advantage because customers can support familiar, consistent operators."
        : "The winner depends more on reviews, visibility, price point, and site economics than brand type.";
  elements.businessVerdict.textContent = loading ? "Checking market signals." : businessVerdictFor(saturation, profile, config);
  elements.businessReason.textContent = `${titleCase(business)} demand: ${config.notes} ${sourceNote || (isLive ? "Verified signals are connected." : "Modeled local estimate.")}`;
  elements.heroBusiness.textContent = loading
    ? `Checking ${titleCase(business)} demand`
    : `${titleCase(business)} demand · ${saturationLabel(saturation)} competition`;
  elements.heroSource.textContent = state.location
    ? `Address radius: ${state.location.radiusMiles} mi`
    : isLive ? "Verified market signals" : "Modeled while signals load";
  elements.heroMarket.textContent = `${saturationLabel(saturation)} competition`;
}

async function renderBusinessCheck() {
  const profile = profileForZip(state.zip);
  const business = normalizeBusiness(state.business);
  const config = modeledBusinessConfig(business);
  const count = estimateCompetitors(state.zip, business, profile, config);
  const requestId = ++state.businessRequestId;
  state.lastBusinessResult = null;

  applyBusinessResult({
    count: 0,
    business,
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

    const response = await fetch(`/api/business-count?${params.toString()}`);
    if (!response.ok) throw new Error("Live lookup failed");
    const result = await response.json();
    if (requestId !== state.businessRequestId) return;

    if (typeof result.count === "number" && result.count > 0) {
      state.lastBusinessResult = result;
      applyBusinessResult({
        count: result.count,
        business: result.business || business,
        isLive: true,
        result,
        sourceNote: "Verified local activity and competitive signals are connected."
      });
      const updatedRecommendations = buildRecommendations(profile);
      renderDecisionStrip(profile, updatedRecommendations);
      renderInstitutionalAnalysis(profile, updatedRecommendations);
      renderCategoryList(updatedRecommendations);
      renderOpportunities(profile);
      elements.headline.textContent = headlineFor(updatedRecommendations, profile);
      elements.narrative.textContent = narrativeFor(state.zip, profile, updatedRecommendations);
      elements.verdictTitle.textContent = verdictTitleFor(profile, updatedRecommendations);
      elements.verdictGrade.textContent = verdictGrade(profile, updatedRecommendations);
      renderTopPlaces(result);
      renderMarketMap();
    } else {
      state.lastBusinessResult = result;
      applyBusinessResult({
        count: 0,
        business: result.business || business,
        isLive: true,
        result,
        sourceNote: "Market signals found limited exact matches for this area and search term. Try a broader term or verify the exact block."
      });
      const updatedRecommendations = buildRecommendations(profile);
      renderDecisionStrip(profile, updatedRecommendations);
      renderInstitutionalAnalysis(profile, updatedRecommendations);
      renderCategoryList(updatedRecommendations);
      renderOpportunities(profile);
      elements.headline.textContent = headlineFor(updatedRecommendations, profile);
      elements.narrative.textContent = narrativeFor(state.zip, profile, updatedRecommendations);
      elements.verdictTitle.textContent = verdictTitleFor(profile, updatedRecommendations);
      elements.verdictGrade.textContent = verdictGrade(profile, updatedRecommendations);
      renderTopPlaces(result);
      renderMarketMap();
    }
  } catch {
    if (requestId !== state.businessRequestId) return;
    applyBusinessResult({
      count,
      business,
      isLive: false,
      sourceNote: "Live lookup failed, so AreaIntel is clearly marking this as a modeled estimate."
    });
    const updatedRecommendations = buildRecommendations(profile);
    renderDecisionStrip(profile, updatedRecommendations);
    renderInstitutionalAnalysis(profile, updatedRecommendations);
    renderCategoryList(updatedRecommendations);
    renderOpportunities(profile);
    elements.headline.textContent = headlineFor(updatedRecommendations, profile);
    elements.narrative.textContent = narrativeFor(state.zip, profile, updatedRecommendations);
    elements.verdictTitle.textContent = verdictTitleFor(profile, updatedRecommendations);
    elements.verdictGrade.textContent = verdictGrade(profile, updatedRecommendations);
    renderMarketMap();
  }
}

function stableGradeProfile(zip, profile) {
  return zipProfiles[zip] || profile;
}

function verdictGrade(profile) {
  const gradeProfile = stableGradeProfile(state.zip, profile);
  const stableRecommendations = buildRecommendations(gradeProfile, { includeLiveCompetition: false });
  const topAverage = stableRecommendations.slice(0, 3).reduce((total, item) => total + item.score, 0) / 3;
  const riskPenalty = gradeProfile.rent > 84 && gradeProfile.competition > 78 ? 8 : gradeProfile.rent > 84 ? 4 : 0;
  const score = Math.round(topAverage - riskPenalty);

  if (score >= 82) return "A";
  if (score >= 75) return "A-";
  if (score >= 68) return "B+";
  if (score >= 60) return "B";
  return "C+";
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

function render(zip) {
  const profile = profileForZip(zip);
  if (!profile) {
    elements.message.textContent = "Enter a valid NYC ZIP code.";
    elements.analyzeButton.disabled = false;
    elements.analyzeButton.textContent = "Analyze";
    return;
  }

  state.zip = zip;
  elements.startScreen.hidden = true;
  elements.results.hidden = false;
  elements.input.value = zip;
  elements.message.textContent = "Loading market signals...";
  elements.analyzeButton.disabled = true;
  elements.analyzeButton.textContent = "Analyzing...";
  elements.areaTitle.textContent = state.location
    ? `${state.location.address} - ZIP ${zip}`
    : `ZIP ${zip} - ${profile.name}`;

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
  elements.verdictGrade.textContent = verdictGrade(profile, recommendations);
  elements.verdictLabel.textContent = profile.rent > 82 ? "Good but risky" : "Success fit";
  renderDecisionStrip(profile, recommendations);
  renderInstitutionalAnalysis(profile, recommendations);
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
  renderOpportunities(profile);
  renderMarketPulse(profile);
  renderBusinessCheck();
  renderRestaurantConceptFit();
  renderCivicCheck();
  renderSiteIntelCheck();
  renderLeases();
  renderMarketMap();
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
    const response = await fetch(`/api/area-report?zip=${encodeURIComponent(zip)}`);
    if (!response.ok) throw new Error("Market demographics lookup failed");
    const report = await response.json();
    if (requestId !== state.areaRequestId || state.zip !== zip || !report.census) return;

    const current = state.liveProfiles[zip] || zipProfiles[zip] || profileForZip(zip);
    state.liveProfiles[zip] = enrichProfileWithCensus(current, report.census);
    render(zip);
  } catch {
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
    `AreaIntel report for ZIP ${state.zip} - ${profile.name}`,
    "",
    "Executive Decision:",
    `${decision.answer}. ${decision.copy}`,
    `Next move: ${decision.next}. ${decision.nextCopy}`,
    `Confidence: ${confidence.label}. ${confidence.copy}`,
    "",
    "Business Success Intelligence:",
    `Decision: ${analysis.decision}`,
    `Success probability: ${analysis.successProbability}/100`,
    `Confidence score: ${analysis.confidenceScore}/100`,
    `Top recommendation: ${analysis.topRecommendation.name} (${analysis.topRecommendation.score}/100)`,
    `Summary: ${analysis.summary}`,
    "",
    "Validation:",
    `- Completeness: ${analysis.validation.completeness}/100`,
    `- Freshness: ${analysis.validation.freshness}/100`,
    `- Source quality: ${analysis.validation.sourceQuality}/100 (${analysis.validation.sourceReliability})`,
    `- Confidence: ${analysis.validation.confidenceScore}/100`,
    "",
    "Score breakdown:",
    ...analysis.scores.map((score) => `- ${score.name}: ${score.value}/100. ${score.why}`),
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
    "Unknown Factors:",
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
    ...recommendations.slice(0, 5).map((item) => `- ${item.name}: ${item.score} (${item.band})`),
    "",
    "Profit note:",
    "Profit ranges in the app are modeled screening estimates, not verified operator profit.",
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
  anchor.download = `areaintel-${state.zip}.txt`;
  anchor.click();
  URL.revokeObjectURL(url);
}

elements.form.addEventListener("submit", (event) => {
  event.preventDefault();
  updateBudgetFromInput();
  state.location = null;
  elements.addressMessage.textContent = "";
  render(elements.input.value.trim());
});

elements.addressForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  updateBudgetFromInput();
  const address = elements.addressInput.value.trim();
  if (!address) {
    elements.addressMessage.textContent = "Enter a full NYC address.";
    return;
  }

  elements.addressMessage.textContent = "Finding address...";
  try {
    const response = await fetch(`/api/geocode?address=${encodeURIComponent(address)}`);
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || "Address lookup failed");
    if (!/^\d{5}$/.test(result.zip) || !boroughForZip(result.zip)) {
      elements.addressMessage.textContent = "That address did not resolve to a supported NYC ZIP.";
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
  } catch {
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
  state.business = elements.businessInput.value.trim() || elements.restaurantType?.value || "";
  elements.businessInput.value = state.business;
  if (elements.restaurantType) {
    const hasOption = [...elements.restaurantType.options].some((option) => option.value === state.business);
    elements.restaurantType.value = hasOption ? state.business : "";
  }
  if (!state.zip) {
    elements.message.textContent = "Enter a ZIP code before checking a business type.";
    return;
  }
  renderBusinessCheck();
});

elements.restaurantType?.addEventListener("change", () => {
  if (!elements.restaurantType.value) return;
  updateBudgetFromInput();
  state.business = elements.restaurantType.value;
  elements.businessInput.value = state.business;
  if (state.zip) renderBusinessCheck();
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

elements.memoButton.addEventListener("click", async () => {
  elements.memoCopy.textContent = "Generating memo...";

  try {
    const response = await fetch("/api/client-memo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ zip: state.zip, business: state.business })
    });

    const result = await response.json();
    if (!response.ok && result.memo) {
      elements.memoCopy.textContent = `${result.memo} ${result.error?.includes("quota") ? "The decision report service says this key is out of quota or billing is not enabled." : ""}`;
      return;
    }
    if (!response.ok) throw new Error("Memo failed");
    elements.memoCopy.textContent = result.memo || "No memo returned.";
  } catch {
    elements.memoCopy.textContent = "Could not generate the report. Check that the decision report service is connected and the server is running.";
  }
});

function renderZipOptions() {
  elements.zipOptions.innerHTML = allNycZipCodes.map((zip) => `<option value="${zip}"></option>`).join("");
}

renderZipOptions();
state.leases = loadLeases();
elements.startScreen.hidden = false;
elements.results.hidden = true;
elements.message.textContent = "Enter a ZIP code or use an exact storefront address to start.";
