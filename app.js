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
      "Pitch tenants with strong brand identity, high repeat purchase, or premium ticket size.",
      "Avoid generic food or retail concepts unless the operator already has reviews, delivery volume, or a clear niche.",
      "Ask the tenant how they will survive rent pressure during slow months."
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
      "Show tenants the gap between growing density and lower competition.",
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
      "Push tenants to prove repeat local demand before signing.",
      "Be cautious with businesses that need constant walk-in traffic."
    ],
    evidence: [
      "Lower competition and lower rent can help neighborhood services break even.",
      "Demand is more local and repeat-driven than tourist or office-driven.",
      "Foot traffic assumptions should be validated block by block before lease signing."
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
      ["Money profile", "Generally strong spending power, but rent forces tenants to protect margins."],
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
    weights: { density: 0.2, income: 0.16, transit: 0.18, office: 0.16, student: 0.1, competition: -0.12, rent: -0.1 },
    note: "Works best near transit, offices, universities, and dense morning routes."
  },
  {
    name: "Boutique fitness",
    weights: { density: 0.12, income: 0.26, transit: 0.1, families: 0.08, office: 0.1, rent: -0.12, competition: -0.08 },
    note: "Needs disposable income, routine traffic, and enough room for class economics."
  },
  {
    name: "Fast casual lunch",
    weights: { density: 0.18, transit: 0.12, office: 0.24, student: 0.08, nightlife: 0.04, competition: -0.14, rent: -0.12 },
    note: "Strong when daytime workers and repeat weekly traffic are nearby."
  },
  {
    name: "Daycare / enrichment",
    weights: { families: 0.32, income: 0.18, density: 0.12, rent: -0.08, competition: -0.06, transit: 0.06 },
    note: "Favors family density, reliable household income, and local referral networks."
  },
  {
    name: "Med spa / beauty clinic",
    weights: { income: 0.3, density: 0.1, transit: 0.08, office: 0.08, tourist: 0.06, competition: -0.1, rent: -0.1 },
    note: "Needs premium spend, appointment flow, and trust-building local marketing."
  },
  {
    name: "Discount retail",
    weights: { density: 0.16, income: -0.08, rent: -0.18, families: 0.14, competition: -0.08, transit: 0.06 },
    note: "Works with lower rent, family volume, and practical daily demand."
  },
  {
    name: "Full-service restaurant",
    weights: { income: 0.16, nightlife: 0.16, tourist: 0.12, density: 0.1, rent: -0.18, competition: -0.16, transit: 0.08 },
    note: "Can do well, but only if concept, reviews, and labor economics are sharp."
  },
  {
    name: "Laundry / wash-and-fold",
    weights: { density: 0.24, families: 0.12, rent: -0.12, income: -0.06, competition: -0.1, transit: 0.04 },
    note: "Best for dense residential pockets with repeat household need."
  }
];

const businessTypes = {
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
  }
};

const competitorCounts = {
  "10003": { deli: 24, pizza: 31, laundromat: 9, gym: 18, "smoke shop": 16, daycare: 8, cafe: 42 },
  "11201": { deli: 14, pizza: 19, laundromat: 7, gym: 15, "smoke shop": 7, daycare: 13, cafe: 29 },
  "11101": { deli: 12, pizza: 16, laundromat: 6, gym: 12, "smoke shop": 6, daycare: 8, cafe: 20 },
  "10458": { deli: 30, pizza: 24, laundromat: 18, gym: 7, "smoke shop": 15, daycare: 17, cafe: 10 },
  "10301": { deli: 11, pizza: 10, laundromat: 8, gym: 5, "smoke shop": 6, daycare: 9, cafe: 7 }
};

const labels = {
  density: ["Low", "Moderate", "High", "Very high"],
  income: ["Limited", "Moderate", "High", "Very high"],
  transit: ["Limited", "Useful", "Strong", "Excellent"],
  rent: ["Low", "Manageable", "High", "Severe"]
};

const state = {
  zip: "10003",
  filter: "all",
  business: "deli",
  location: null,
  businessRequestId: 0,
  areaRequestId: 0,
  civicRequestId: 0,
  siteIntelRequestId: 0,
  liveProfiles: {},
  lastBusinessResult: null,
  leases: []
};

const elements = {
  form: document.querySelector("#zip-form"),
  input: document.querySelector("#zip-input"),
  analyzeButton: document.querySelector("#analyze-button"),
  zipOptions: document.querySelector("#nyc-zip-options"),
  message: document.querySelector("#form-message"),
  addressForm: document.querySelector("#address-form"),
  addressInput: document.querySelector("#address-input"),
  radiusInput: document.querySelector("#radius-input"),
  clearAddress: document.querySelector("#clear-address"),
  addressMessage: document.querySelector("#address-message"),
  heroBusiness: document.querySelector("#hero-business"),
  heroSource: document.querySelector("#hero-source"),
  heroMarket: document.querySelector("#hero-market"),
  map: document.querySelector("#market-map"),
  mapStatus: document.querySelector("#map-status"),
  photoCards: document.querySelectorAll(".photo-strip figure"),
  photoModal: document.querySelector("#photo-modal"),
  photoModalClose: document.querySelector("#photo-modal-close"),
  photoModalImage: document.querySelector("#photo-modal-image"),
  photoModalTitle: document.querySelector("#photo-modal-title"),
  photoModalCopy: document.querySelector("#photo-modal-copy"),
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
  dataConfidence: document.querySelector("#data-confidence"),
  dataConfidenceCopy: document.querySelector("#data-confidence-copy"),
  nextMove: document.querySelector("#next-move"),
  nextMoveCopy: document.querySelector("#next-move-copy"),
  customerProfile: document.querySelector("#customer-profile"),
  chainTitle: document.querySelector("#chain-title"),
  chainCopy: document.querySelector("#chain-copy"),
  localFitBar: document.querySelector("#local-fit-bar"),
  talkingPoints: document.querySelector("#talking-points"),
  exportButton: document.querySelector("#export-button"),
  apiKeyForm: document.querySelector("#api-key-form"),
  apiKeyMessage: document.querySelector("#api-key-message"),
  businessForm: document.querySelector("#business-form"),
  businessInput: document.querySelector("#business-input"),
  businessExamples: document.querySelector("#business-examples"),
  businessCount: document.querySelector("#business-count"),
  businessCountLabel: document.querySelector("#business-count-label"),
  businessSourceTags: document.querySelector("#business-source-tags"),
  businessSaturation: document.querySelector("#business-saturation"),
  businessMeter: document.querySelector("#business-meter"),
  businessMix: document.querySelector("#business-mix"),
  businessMixCopy: document.querySelector("#business-mix-copy"),
  businessVerdict: document.querySelector("#business-verdict"),
  businessReason: document.querySelector("#business-reason"),
  opportunityList: document.querySelector("#opportunity-list"),
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
  leaseFrontage: document.querySelector("#lease-frontage"),
  leaseLink: document.querySelector("#lease-link"),
  leaseNotes: document.querySelector("#lease-notes"),
  leaseCsv: document.querySelector("#lease-csv"),
  leaseMessage: document.querySelector("#lease-message"),
  leaseList: document.querySelector("#lease-list"),
  leaseSearchLinks: document.querySelector("#lease-search-links"),
  keyStatus: {
    census: document.querySelector("#census-status"),
    googlePlaces: document.querySelector("#google-status"),
    nycOpenData: document.querySelector("#nyc-status"),
    openai: document.querySelector("#openai-status")
  },
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

  const places = currentBusinessResult()?.googlePlaces?.topPlaces || [];
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
        `<strong>${lease.address}</strong><br>${lease.sf ? `${Number(lease.sf).toLocaleString()} SF` : "SF unknown"} · ${lease.rent ? `$${Number(lease.rent).toLocaleString()}/mo` : "Rent unknown"}`
      );
    });

  elements.mapStatus.textContent = state.location ? `Radius ${state.location.radiusMiles} mi` : `ZIP ${state.zip}`;
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
      `TenantFit can analyze this ${borough} ZIP. The first pass uses borough-level profile assumptions plus live NYC Open Data business counts; verify the exact block before using it for a lease recommendation.`,
    talkingPoints: [
      "Use the live competition count as the first screen for tenant saturation.",
      "Validate the exact avenue, corner visibility, frontage, and nearby anchors.",
      "Treat borough-level customer profile as directional until Census and Google Places are connected."
    ],
    evidence: [
      "ZIP is recognized as an NYC ZIP code in TenantFit.",
      "Business checker can query live NYC Open Data for licensed businesses and restaurant records.",
      "Customer profile is borough-level until Census ZIP data is connected."
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
    affluenceLabel: `Census ZIP profile with median income ${medianIncome}, median age ${medianAge}, and renter share ${renterShare}`,
    audience: [
      ["Money profile", `Median household income is ${medianIncome}; median gross rent is ${medianRent}.`],
      ["Household profile", `Population is ${census.population?.toLocaleString() || "not available"} with ${census.households?.toLocaleString() || "not available"} households and ${renterShare} renter occupancy.`],
      ["Education / age", `Median age is ${medianAge}; bachelor-plus education share is ${bachelorShare}.`]
    ],
    evidence: [
      `${census.source}: median household income ${medianIncome}.`,
      `${census.source}: renter share ${renterShare}, median gross rent ${medianRent}.`,
      `${census.source}: population ${census.population?.toLocaleString() || "not available"}, median age ${medianAge}.`
    ],
    verdict: `${baseProfile.verdict} Census data is now connected for income, age, households, rent, renter profile, and education.`
  };
}

function scoreCategory(profile, model) {
  const raw = Object.entries(model.weights).reduce((total, [metric, weight]) => {
    return total + ((profile[metric] || 50) - 50) * weight * 1.55;
  }, 56);

  return Math.max(5, Math.min(98, Math.round(raw)));
}

function bandFor(score) {
  if (score >= 72) return "strong";
  if (score >= 55) return "mixed";
  return "weak";
}

function buildRecommendations(profile) {
  return categoryModels
    .map((model) => {
      const score = scoreCategory(profile, model);
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
      notes: "This is a modeled category until Google Places is connected for live competitor search."
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
  if (!isLive) return ["Modeled estimate"];

  const tags = [];
  if (result?.openDataCount > 0) tags.push(`${result.openDataCount} city-record matches`);
  if (result?.googleVisibleCount > 0) {
    const radius = result.searchContext?.mode === "address-radius" ? ` within ${result.searchContext.radiusMiles} mi` : "";
    tags.push(`${result.googleVisibleCount} Google visible results${radius}`);
  }
  if (!tags.length) tags.push("No verified matches found");
  return tags;
}

function scoreDrivers(profile, item) {
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

  return `Driven by ${positiveDrivers.join(" and ")}${drag ? `; watch ${drag}` : ""}.`;
}

function renderOpportunities(profile) {
  const recommendations = buildRecommendations(profile).slice(0, 5);
  elements.opportunityList.innerHTML = recommendations
    .map((item) => {
      const profit = estimateMonthlyProfit(item, profile);
      const risk = item.score >= 72 ? "Good fit" : item.score >= 58 ? "Selective" : "Risky";
      return `
        <article class="opportunity-item">
          <div>
            <h4>${item.name}</h4>
            <p>${item.note}</p>
            <p>${scoreDrivers(profile, item)}</p>
          </div>
          <div class="opportunity-metrics">
            <strong>${profit}</strong>
            <span>${risk} · modeled score ${item.score}</span>
          </div>
        </article>
      `;
    })
    .join("");
}

function renderTopPlaces(result) {
  const places = result?.googlePlaces?.topPlaces || [];
  elements.placesTitle.textContent = `Top reviewed ${result?.business || state.business} places`;
  elements.placesSource.textContent = result?.searchContext?.mode === "address-radius"
    ? `Google within ${result.searchContext.radiusMiles} mi`
    : result?.googlePlaces ? "Google top results" : "Waiting for Google Places";

  if (!places.length) {
    elements.placesList.innerHTML = `
      <article class="empty-places">
        <strong>No Google Places matches yet</strong>
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
  elements.civicSource.textContent = state.location ? "NYC Open Data + address radius" : "NYC Open Data by ZIP";
  elements.complaintLevel.textContent = "Checking";
  elements.complaintCopy.textContent = "Loading recent 311 complaints.";
  elements.complaintTypes.innerHTML = "";
  elements.permitLevel.textContent = "Checking";
  elements.permitCopy.textContent = "Loading DOB permit records.";
  elements.permitTypes.innerHTML = "";
}

function miniList(items) {
  if (!items?.length) return "<span>No records returned</span>";
  return items
    .slice(0, 4)
    .map((item) => `<span>${item.type}: ${Number(item.count || 0).toLocaleString()}</span>`)
    .join("");
}

function renderCivicSignals(data) {
  const radiusText = data.searchContext?.mode === "address-radius"
    ? `within ${data.searchContext.radiusMiles} mile`
    : `in ZIP ${data.zip}`;

  elements.civicSource.textContent = data.searchContext?.mode === "address-radius"
    ? `311 radius + DOB ZIP`
    : "ZIP-level records";
  elements.complaintLevel.textContent = `${data.complaints.level} 311 volume`;
  elements.complaintCopy.textContent =
    `${data.complaints.total180Days.toLocaleString()} 311 requests ${radiusText} in the last 180 days. Use this as a quality-of-life risk signal, not a foot-traffic count.`;
  elements.complaintTypes.innerHTML = miniList(data.complaints.topTypes);
  elements.permitLevel.textContent = `${data.permits.level} permit activity`;
  elements.permitCopy.textContent =
    `${data.permits.totalRecords.toLocaleString()} DOB permit records in ZIP ${data.zip}. This shows construction/development intensity, not current availability.`;
  elements.permitTypes.innerHTML = miniList(data.permits.topTypes);
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
    elements.complaintLevel.textContent = "Unavailable";
    elements.complaintCopy.textContent = "311 lookup failed. Try again after checking the NYC Open Data connection.";
    elements.permitLevel.textContent = "Unavailable";
    elements.permitCopy.textContent = "DOB lookup failed. Try again after checking the NYC Open Data connection.";
  }
}

function renderSiteIntelLoading() {
  elements.siteIntelSource.textContent = state.location ? "Address + ZIP sources" : "ZIP-level sources";
  elements.sidewalkLevel.textContent = "Checking";
  elements.sidewalkCopy.textContent = "Loading sidewalk cafe records.";
  elements.sidewalkTypes.innerHTML = "";
  elements.liquorLevel.textContent = "Checking";
  elements.liquorCopy.textContent = "Loading NYS liquor license records.";
  elements.liquorTypes.innerHTML = "";
  elements.mtaLevel.textContent = state.location ? "Checking" : "Needs address";
  elements.mtaCopy.textContent = state.location
    ? "Loading nearby station ridership."
    : "Enter an exact address to calculate nearby subway ridership.";
  elements.mtaTypes.innerHTML = "";
  elements.plutoLevel.textContent = "Checking";
  elements.plutoCopy.textContent = "Loading tax-lot land-use mix.";
  elements.plutoTypes.innerHTML = "";
}

function numberLabel(value) {
  return Number(value || 0).toLocaleString();
}

function renderSiteIntelligence(data) {
  elements.siteIntelSource.textContent = data.searchContext?.mode === "address-radius"
    ? "Address radius + ZIP"
    : "ZIP-level sources";

  elements.sidewalkLevel.textContent = `${numberLabel(data.sidewalkCafe.active)} active cafe records`;
  elements.sidewalkCopy.textContent =
    `${numberLabel(data.sidewalkCafe.totalApplications)} sidewalk cafe license/application records in ZIP ${data.zip}. Useful for outdoor dining fit, not a full restaurant count.`;
  elements.sidewalkTypes.innerHTML = miniList(
    data.sidewalkCafe.statusBreakdown.map((item) => ({ type: item.status, count: item.count }))
  );

  elements.liquorLevel.textContent = `${numberLabel(data.liquor.total)} active liquor licenses`;
  elements.liquorCopy.textContent =
    `Liquor license records ${data.liquor.scope}. Useful for restaurant/bar saturation and nightlife compatibility.`;
  elements.liquorTypes.innerHTML = miniList(data.liquor.topTypes);

  if (data.mta.available) {
    elements.mtaLevel.textContent = `${numberLabel(data.mta.totalDecember2024Ridership)} subway rides`;
    elements.mtaCopy.textContent =
      `Estimated December 2024 station ridership ${data.mta.scope}. Use as a transit foot-traffic proxy.`;
    elements.mtaTypes.innerHTML = data.mta.topStations
      .slice(0, 4)
      .map((item) => `<span>${item.station}: ${numberLabel(item.ridership)}</span>`)
      .join("");
  } else {
    elements.mtaLevel.textContent = "Needs address";
    elements.mtaCopy.textContent = data.mta.scope;
    elements.mtaTypes.innerHTML = "<span>Use exact storefront search</span>";
  }

  elements.plutoLevel.textContent = `${numberLabel(data.pluto.taxLots)} tax lots`;
  elements.plutoCopy.textContent =
    `${numberLabel(data.pluto.retailArea)} sq ft retail area, ${numberLabel(data.pluto.commercialArea)} sq ft commercial area, average year built ${data.pluto.averageYearBuilt || "n/a"}.`;
  elements.plutoTypes.innerHTML = miniList(data.pluto.landUseMix);
}

function loadLeases() {
  try {
    return JSON.parse(localStorage.getItem("tenantfit-leases") || "[]");
  } catch {
    return [];
  }
}

function saveLeases() {
  localStorage.setItem("tenantfit-leases", JSON.stringify(state.leases));
}

function rentPerSfMonthly(lease) {
  const rent = Number(lease.rent || 0);
  const sf = Number(lease.sf || 0);
  return rent > 0 && sf > 0 ? rent / sf : null;
}

function rentPressureForLease(lease, profile) {
  const perSf = rentPerSfMonthly(lease);
  if (perSf === null) return "Rent unknown";
  if (perSf >= 18 || profile.rent >= 84) return "High rent pressure";
  if (perSf >= 10 || profile.rent >= 68) return "Moderate rent pressure";
  return "Manageable rent";
}

function leaseFitLabel(lease, profile) {
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

function quickSearchUrl(source, zip) {
  const query = encodeURIComponent(`retail space for lease ${zip} NYC`);
  const area = encodeURIComponent(`${zip} New York NY`);
  const urls = {
    loopnet: `https://www.loopnet.com/search/retail-space/${area}/for-lease/`,
    commercialCafe: `https://www.commercialcafe.com/commercial-real-estate/us/ny/new-york/?SearchType=ForLease&PropertyType=Retail`,
    craigslist: `https://newyork.craigslist.org/search/off?query=${query}`,
    google: `https://www.google.com/search?q=${query}`
  };
  return urls[source];
}

function renderLeaseSearchLinks() {
  const links = [
    ["LoopNet", quickSearchUrl("loopnet", state.zip)],
    ["CommercialCafe", quickSearchUrl("commercialCafe", state.zip)],
    ["Craigslist", quickSearchUrl("craigslist", state.zip)],
    ["Google", quickSearchUrl("google", state.zip)]
  ];

  elements.leaseSearchLinks.innerHTML = links
    .map(([label, href]) => `<a href="${href}" target="_blank" rel="noreferrer">${label}</a>`)
    .join("");
}

function renderLeases() {
  const profile = profileForZip(state.zip);
  const leases = state.leases.filter((lease) => lease.zip === state.zip);
  renderLeaseSearchLinks();

  if (!leases.length) {
    elements.leaseList.innerHTML = `
      <article class="empty-places">
        <strong>No saved spaces for ZIP ${state.zip} yet</strong>
        <p>Add a listing manually, or use the quick links to search public listing sites.</p>
      </article>
    `;
    return;
  }

  elements.leaseList.innerHTML = leases
    .map((lease) => {
      const perSf = rentPerSfMonthly(lease);
      const fit = leaseFitLabel(lease, profile);
      const rent = Number(lease.rent || 0);
      const sf = Number(lease.sf || 0);
      const link = lease.link
        ? `<a href="${lease.link}" target="_blank" rel="noreferrer">Open listing</a>`
        : "";
      return `
        <article class="lease-card">
          <div>
            <h4>${lease.address}</h4>
            <p>${lease.use} · ${sf ? `${sf.toLocaleString()} SF` : "SF unknown"} · ${rent ? `$${rent.toLocaleString()}/mo` : "Rent unknown"}</p>
            <div class="place-meta">
              <span>${fit}</span>
              <span>${rentPressureForLease(lease, profile)}</span>
              <span>${perSf ? `$${perSf.toFixed(2)}/SF/mo` : "No rent/SF"}</span>
            </div>
            <small>${lease.notes || "No notes yet"}</small>
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
    elements.sidewalkLevel.textContent = "Unavailable";
    elements.sidewalkCopy.textContent = "Sidewalk cafe lookup failed.";
    elements.liquorLevel.textContent = "Unavailable";
    elements.liquorCopy.textContent = "Liquor license lookup failed.";
    elements.mtaLevel.textContent = "Unavailable";
    elements.mtaCopy.textContent = "MTA ridership lookup failed.";
    elements.plutoLevel.textContent = "Unavailable";
    elements.plutoCopy.textContent = "PLUTO property lookup failed.";
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

function decisionFor(profile, recommendations, businessResult) {
  const topScore = recommendations[0]?.score || 50;
  const observedCount = businessResult?.registryExact ? businessResult.count : null;
  const hasLiveCompetition = typeof observedCount === "number";
  const saturation = hasLiveCompetition ? saturationFromCount(observedCount, profile) : profile.competition;
  const rentRisk = profile.rent >= 78;
  const crowded = saturation >= 78;

  if (topScore >= 72 && !rentRisk && !crowded) {
    return {
      answer: "Good area to pitch",
      copy: "The area has enough demand signal and the competition/rent pressure is not flashing red.",
      next: "Price the lease",
      nextCopy: "Ask for rent, frontage, term, buildout cost, and expected monthly sales before final advice."
    };
  }

  if (topScore >= 72 && (rentRisk || crowded)) {
    return {
      answer: "Good demand, high risk",
      copy: "There is real customer demand, but rent pressure or saturation can hurt an average operator.",
      next: "Verify operator strength",
      nextCopy: "Only recommend it if the tenant has reviews, a niche, delivery strength, or pricing power."
    };
  }

  if (topScore >= 58) {
    return {
      answer: "Selective yes",
      copy: "This can work for the right tenant, but it is not a broad green light for every operator.",
      next: "Check the exact block",
      nextCopy: "Walk the block, compare direct competitors, and confirm daytime/evening foot traffic."
    };
  }

  return {
    answer: "Be careful",
    copy: "The ZIP signal is weak or too uncertain for a confident recommendation.",
    next: "Find a better fit",
    nextCopy: "Look for a stronger customer base, lower rent pressure, or a clearer gap in competition."
  };
}

function confidenceFor(zip, businessResult) {
  const liveProfile = Boolean(state.liveProfiles[zip]);
  const liveBusiness = Boolean(businessResult?.registryExact);
  const google = Boolean(businessResult?.googlePlaces);
  const sourceCount = [liveProfile, liveBusiness, google].filter(Boolean).length;

  if (sourceCount === 3) {
    return {
      label: "Strong",
      copy: "Census demographics, observed business records, and Google Places visibility are connected."
    };
  }

  if (sourceCount === 2) {
    return {
      label: "Good",
      copy: "Two live source groups are connected. Treat remaining modeled scores as directional."
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
    copy: "Live sources are still loading or unavailable. Do not present this as verified research yet."
  };
}

function renderDecisionStrip(profile, recommendations) {
  const businessResult = currentBusinessResult();
  const decision = decisionFor(profile, recommendations, businessResult);
  const confidence = confidenceFor(state.zip, businessResult);

  elements.agentAnswer.textContent = decision.answer;
  elements.agentAnswerCopy.textContent = decision.copy;
  elements.dataConfidence.textContent = confidence.label;
  elements.dataConfidenceCopy.textContent = confidence.copy;
  elements.nextMove.textContent = decision.next;
  elements.nextMoveCopy.textContent = decision.nextCopy;
}

function businessVerdictFor(score, profile, config) {
  if (score >= 78 && profile.rent >= 78) return "Risky unless the tenant has a sharp niche.";
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
  elements.businessCount.textContent = loading ? "..." : String(count);
  elements.businessCountLabel.textContent = isLive
    ? `city-record ${business} matches`
    : `estimated ${business} matches`;
  elements.businessSourceTags.innerHTML = sourceTagsForResult(result, isLive)
    .map((tag) => `<span>${tag}</span>`)
    .join("");
  elements.businessSaturation.textContent = loading ? "Checking" : saturationLabel(saturation);
  elements.businessMeter.value = loading ? 0 : saturation;
  elements.businessMix.textContent = loading ? "Checking" : mix;
  elements.businessMixCopy.textContent = loading
    ? "TenantFit is checking connected sources before scoring the market."
    : mix === "Mostly local"
      ? "Independent operators can compete here if they understand the neighborhood and price correctly."
      : mix === "Chain-friendly"
        ? "Recognized brands may have an advantage because customers can support familiar, consistent operators."
        : "The winner depends more on reviews, visibility, price point, and lease terms than brand type.";
  elements.businessVerdict.textContent = loading ? "Checking connected sources." : businessVerdictFor(saturation, profile, config);
  elements.businessReason.textContent = `${titleCase(business)} demand: ${config.notes} ${sourceNote || (isLive ? "Observed source count." : "Modeled local estimate.")}`;
  elements.heroBusiness.textContent = loading
    ? `Checking ${titleCase(business)} demand`
    : `${titleCase(business)} demand · ${count} city records`;
  elements.heroSource.textContent = state.location
    ? `Address radius: ${state.location.radiusMiles} mi`
    : isLive ? "City records + Google visibility" : "Modeled while live sources load";
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
    sourceNote: "Checking live NYC Open Data and Google Places now."
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
        sourceNote: `${result.note} ${result.sources?.length ? `Breakdown: ${result.sources.join("; ")}.` : ""}`
      });
      renderDecisionStrip(profile, buildRecommendations(profile));
      renderTopPlaces(result);
      renderMarketMap();
    } else {
      state.lastBusinessResult = result;
      applyBusinessResult({
        count: 0,
        business: result.business || business,
        isLive: true,
        result,
        sourceNote: "Connected sources found no exact observed matches for this ZIP and search term. Try a broader term or verify the exact block."
      });
      renderDecisionStrip(profile, buildRecommendations(profile));
      renderTopPlaces(result);
      renderMarketMap();
    }
  } catch {
    if (requestId !== state.businessRequestId) return;
    applyBusinessResult({
      count,
      business,
      isLive: false,
      sourceNote: "Live lookup failed, so TenantFit is clearly marking this as a modeled estimate."
    });
    renderDecisionStrip(profile, buildRecommendations(profile));
    renderMarketMap();
  }
}

function verdictGrade(profile, recommendations) {
  const topAverage = recommendations.slice(0, 3).reduce((total, item) => total + item.score, 0) / 3;
  const riskPenalty = profile.rent > 84 && profile.competition > 78 ? 8 : profile.rent > 84 ? 4 : 0;
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
    return "National chains have an advantage because customers can support higher prices and familiar brands. Local tenants need polished execution to compete.";
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

  if (strong >= 4 && highRisk) return "Strong demand, but rent punishes weak operators.";
  if (strong >= 4) return "Multiple categories show real neighborhood demand.";
  if (strong >= 2) return "Selective opportunities are stronger than broad retail bets.";
  return "This area needs cautious, block-level validation before leasing.";
}

function narrativeFor(zip, profile, recommendations) {
  const top = recommendations[0];
  const weak = [...recommendations].reverse()[0];
  return `${zip} covers ${profile.name}. This looks like a ${profile.affluenceLabel.toLowerCase()} area. The strongest current fit is ${top.name.toLowerCase()} because the area scores well on the demand signals that category needs. The weakest modeled fit is ${weak.name.toLowerCase()}, mostly because its economics are less protected against this ZIP code's rent, competition, or customer profile. Treat this as a first-pass broker research memo, then verify the exact block, frontage, lease terms, and live competitor data before pitching a tenant.`;
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
  elements.input.value = zip;
  elements.message.textContent = "Loading live sources...";
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
  const visibleRecommendations =
    state.filter === "all"
      ? recommendations
      : recommendations.filter((item) => item.band === state.filter);

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

  elements.headline.textContent = headlineFor(recommendations, profile);
  elements.narrative.textContent = narrativeFor(zip, profile, recommendations);
  elements.confidence.textContent = state.liveProfiles[zip]
    ? "Census live, model scored"
    : "Profile estimate";
  elements.evidence.innerHTML = profile.evidence.map((item) => `<li>${item}</li>`).join("");
  elements.verdictTitle.textContent = verdictTitleFor(profile, recommendations);
  elements.verdictCopy.textContent = profile.verdict;
  elements.verdictGrade.textContent = verdictGrade(profile, recommendations);
  elements.verdictLabel.textContent = profile.rent > 82 ? "Good but risky" : "Tenant fit";
  renderDecisionStrip(profile, recommendations);
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
    if (!response.ok) throw new Error("Census lookup failed");
    const report = await response.json();
    if (requestId !== state.areaRequestId || state.zip !== zip || !report.census) return;

    const current = state.liveProfiles[zip] || zipProfiles[zip] || profileForZip(zip);
    state.liveProfiles[zip] = enrichProfileWithCensus(current, report.census);
    render(zip);
  } catch {
    if (requestId === state.areaRequestId) {
      elements.evidence.innerHTML += "<li>Census lookup was unavailable; showing local profile assumptions.</li>";
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
  const businessLines = businessResult
    ? [
        `Business search: ${titleCase(businessResult.business || state.business)}`,
        `Search area: ${businessResult.searchContext?.mode === "address-radius" ? `${businessResult.searchContext.address} within ${businessResult.searchContext.radiusMiles} mile` : `ZIP ${state.zip}`}`,
        `City-record matches: ${businessResult.count}`,
        `Google visible results: ${businessResult.googleVisibleCount ?? businessResult.googlePlaces?.count ?? "not available"}`,
        `Source breakdown: ${businessResult.sources?.join("; ") || "No live source breakdown available"}`,
        `Source note: ${businessResult.note || "No note available"}`
      ]
    : [
        `Business search: ${titleCase(state.business)}`,
        "City-record matches: live check not completed yet"
      ];
  const lines = [
    `TenantFit NYC report for ZIP ${state.zip} - ${profile.name}`,
    "",
    "Agent answer:",
    `${decision.answer}. ${decision.copy}`,
    `Next move: ${decision.next}. ${decision.nextCopy}`,
    `Data confidence: ${confidence.label}. ${confidence.copy}`,
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
    "Agent talking points:",
    ...profile.talkingPoints.map((item) => `- ${item}`),
    "",
    "Top categories:",
    ...recommendations.slice(0, 5).map((item) => `- ${item.name}: ${item.score} (${item.band})`),
    "",
    "Profit note:",
    "Profit ranges in the app are modeled screening estimates, not verified operator profit.",
    "",
    "Research signals:",
    ...profile.evidence.map((item) => `- ${item}`),
    "",
    "Important caution:",
    "This report is a ZIP-level research screen. Before advising a client, verify the exact storefront, rent, frontage, nearby competitors, allowed use, licensing, and operator quality."
  ];

  const blob = new Blob([lines.join("\n")], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `tenantfit-nyc-${state.zip}.txt`;
  anchor.click();
  URL.revokeObjectURL(url);
}

elements.form.addEventListener("submit", (event) => {
  event.preventDefault();
  state.location = null;
  elements.addressMessage.textContent = "";
  render(elements.input.value.trim());
});

elements.addressForm.addEventListener("submit", async (event) => {
  event.preventDefault();
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
    elements.addressMessage.textContent = "Could not find that address. Check the Google key and try a fuller address.";
  }
});

elements.clearAddress.addEventListener("click", () => {
  state.location = null;
  elements.addressInput.value = "";
  elements.addressMessage.textContent = "Using ZIP-level search.";
  render(state.zip);
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
  render(state.zip);
});

elements.businessForm.addEventListener("submit", (event) => {
  event.preventDefault();
  state.business = elements.businessInput.value.trim();
  renderBusinessCheck();
});

elements.businessExamples.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-business]");
  if (!button) return;

  state.business = button.dataset.business;
  renderBusinessCheck();
});

elements.radiusInput.addEventListener("change", () => {
  if (!state.location) return;
  state.location.radiusMiles = elements.radiusInput.value;
  elements.addressMessage.textContent = `Using ${state.location.address} within ${state.location.radiusMiles} mile.`;
  renderBusinessCheck();
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
    frontage: Number(elements.leaseFrontage.value || 0),
    link: elements.leaseLink.value.trim(),
    notes: elements.leaseNotes.value.trim(),
    createdAt: new Date().toISOString()
  };

  elements.leaseMessage.textContent = "Saving and locating space...";
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
  elements.leaseMessage.textContent = "Space removed.";
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
      ? `Imported ${count} spaces from CSV.`
      : "No spaces imported. Make sure the CSV has an address column.";
  } catch {
    elements.leaseMessage.textContent = "Could not import CSV. Check the headers and try again.";
  } finally {
    elements.leaseCsv.value = "";
  }
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
      elements.memoCopy.textContent = `${result.memo} ${result.error?.includes("quota") ? "OpenAI says this key is out of quota or billing is not enabled." : ""}`;
      return;
    }
    if (!response.ok) throw new Error("Memo failed");
    elements.memoCopy.textContent = result.memo || "No memo returned.";
  } catch {
    elements.memoCopy.textContent = "Could not generate the memo. Check that the OpenAI key is connected and the server is running.";
  }
});

if (elements.apiKeyForm) {
  elements.apiKeyForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    elements.apiKeyMessage.textContent = "Saving keys...";

    const formData = new FormData(elements.apiKeyForm);
    const payload = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/api/save-keys", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!response.ok) throw new Error("Save failed");

      elements.apiKeyForm.reset();
      elements.apiKeyMessage.textContent = "Keys saved locally.";
      await renderKeyStatus();
    } catch {
      elements.apiKeyMessage.textContent = "Could not save. Make sure the Node server is running.";
    }
  });
}

async function renderKeyStatus() {
  try {
    const response = await fetch("/api/key-status");
    if (!response.ok) throw new Error("No backend");
    const status = await response.json();
    const canSaveKeys = status.canSaveKeys !== false;

    if (elements.apiKeyForm) {
      elements.apiKeyForm.classList.toggle("hosted-key-mode", !canSaveKeys);
      elements.apiKeyForm.querySelectorAll("input, button").forEach((field) => {
        field.disabled = !canSaveKeys;
      });
      if (!canSaveKeys) {
        elements.apiKeyMessage.textContent = "Keys are managed in Render environment variables.";
      }
    }

    Object.entries(elements.keyStatus).forEach(([key, element]) => {
      const connected = Boolean(status[key]);
      element.textContent = connected ? "Key connected" : "Key missing";
      element.classList.toggle("connected", connected);
    });
  } catch {
    Object.values(elements.keyStatus).forEach((element) => {
      element.textContent = "Run Node server";
      element.classList.remove("connected");
    });
  }
}

function renderZipOptions() {
  elements.zipOptions.innerHTML = allNycZipCodes.map((zip) => `<option value="${zip}"></option>`).join("");
}

function openPhotoModal(card) {
  const image = card.querySelector("img");
  elements.photoModalImage.src = image.src.replace("w=900", "w=1600");
  elements.photoModalImage.alt = image.alt;
  elements.photoModalTitle.textContent = card.dataset.title || "NYC field signal";
  elements.photoModalCopy.textContent = card.dataset.copy || "";
  elements.photoModal.hidden = false;
  elements.photoModalClose.focus();
}

function closePhotoModal() {
  elements.photoModal.hidden = true;
  elements.photoModalImage.src = "";
}

elements.photoCards.forEach((card) => {
  card.addEventListener("click", () => openPhotoModal(card));
  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openPhotoModal(card);
    }
  });
});

elements.photoModal.addEventListener("click", (event) => {
  if (event.target === elements.photoModal) closePhotoModal();
});

elements.photoModalClose.addEventListener("click", closePhotoModal);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !elements.photoModal.hidden) closePhotoModal();
});

renderZipOptions();
state.leases = loadLeases();
render(state.zip);
renderKeyStatus();
