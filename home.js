/* ================================================================
   SpotVest — Public homepage interactive layer (home.js)
   ----------------------------------------------------------------
   MAP: lifted verbatim from the approved prototype
   (areaintel_production_homepage.html) — initMap / setPin /
   circleGeo / refreshPoint / updateReadout / simPoint + the layer
   and business-filter handlers. The ONLY changes from the approved
   file are:
     • container id 'map' -> 'home-map' (the id "map" is already used
       by the Leaflet report map in app.js)
     • refreshPoint reads the live /api/point endpoint (API contract)
       instead of a placeholder API base; simPoint stays as the
       built-in fallback exactly as in the prototype.

   DEMO PANEL: reuses the real in-page SpotVest engine (profileForZip
   / enrichProfileWithCensus / buildRecommendations / decisionFor /
   confidenceFor) fed by /api/area-report, /api/business-count and
   /api/geocode — no duplicated scoring, no sample numbers.
   ================================================================ */
(function () {
  "use strict";

  const homeMapEl = document.getElementById("home-map");
  const bizGridEl = document.getElementById("bizGrid");
  const analyzeBtn = document.getElementById("analyzeBtn");
  if (!homeMapEl || !bizGridEl || !analyzeBtn) return; // public landing only

  const CONFIG = {
    // INTEGRATE #1 (verbatim): OpenFreeMap dark style — free, no key.
    MAP_STYLE: "https://tiles.openfreemap.org/styles/dark",
    // INTEGRATE #2: live /point endpoint on this backend (API contract).
    POINT_URL: "/api/point",
    DEFAULT_CENTER: [-73.9905, 40.7488], // ~ ZIP 10001
    DEFAULT_ZOOM: 13,
    RADIUS_METERS: 800
  };

  const ZIP_CENTROIDS = {
    "10001": { c: [-73.9967, 40.7506], city: "Manhattan, NY" },
    "10003": { c: [-73.989, 40.732], city: "Manhattan, NY" },
    "10011": { c: [-74.0008, 40.742], city: "Manhattan, NY" },
    "11201": { c: [-73.9903, 40.6939], city: "Brooklyn, NY" },
    "11211": { c: [-73.9571, 40.7128], city: "Brooklyn, NY" }
  };
  const NYC_DEFAULT = { c: CONFIG.DEFAULT_CENTER, city: "New York, NY" };

  // Demo categories. appTerm is the EXACT business label from the app's
  // picker (index.html datalist): the engine scores and the server searches
  // competitors with the term it's given, so the demo must send the same
  // string a user would select in-app or the scores diverge.
  const BIZ = [
    { id: "coffee", label: "Coffee Shop", cat: "cafe", noun: "coffee shop", search: "coffee shop", appTerm: "Specialty coffee" },
    { id: "gym", label: "Fitness Gym", cat: "gym", noun: "gym", search: "gym", appTerm: "Gym / health club" },
    { id: "pizza", label: "Pizza Place", cat: "pizza", noun: "pizza place", search: "pizza", appTerm: "Pizza" },
    { id: "salon", label: "Hair Salon", cat: "salon", noun: "salon", search: "hair salon", appTerm: "Hair salon" }
  ];
  const bizById = (id) => BIZ.find((b) => b.id === id) || BIZ[0];

  /* tiny deterministic hash — used only by the simulation fallback */
  function hash(s) { let h = 2166136261; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }

  /* ================================================================
     MAP  (lifted from the approved prototype)
     ================================================================ */
  let map, pinMarker, layer = "foot", mapBiz = "all";
  let mapCenter = CONFIG.DEFAULT_CENTER.slice();

  function initMap() {
    if (!window.maplibregl) {
      const t = document.getElementById("readoutTxt");
      if (t) t.textContent = "Map library failed to load";
      return;
    }
    map = new maplibregl.Map({
      container: "home-map", style: CONFIG.MAP_STYLE,
      center: CONFIG.DEFAULT_CENTER, zoom: CONFIG.DEFAULT_ZOOM, attributionControl: true
    });
    map.addControl(new maplibregl.NavigationControl({ showCompass: false }), "bottom-right");

    map.on("load", () => {
      // analysis radius (a GeoJSON circle approximated as a polygon)
      map.addSource("radius", { type: "geojson", data: circleGeo(mapCenter, CONFIG.RADIUS_METERS) });
      map.addLayer({ id: "radius-fill", type: "fill", source: "radius", paint: { "fill-color": "#06B6D4", "fill-opacity": 0.06 } });
      map.addLayer({ id: "radius-line", type: "line", source: "radius", paint: { "line-color": "#06B6D4", "line-width": 1, "line-dasharray": [2, 2], "line-opacity": 0.5 } });

      // competitor points
      map.addSource("competitors", { type: "geojson", data: { type: "FeatureCollection", features: [] } });
      map.addLayer({
        id: "comp-pts", type: "circle", source: "competitors", paint: {
          "circle-radius": 5,
          "circle-color": ["case", ["get", "inRadius"], "#EF4444", "#64748B"],
          "circle-opacity": 0.85,
          "circle-stroke-width": 1, "circle-stroke-color": ["case", ["get", "inRadius"], "#EF4444", "#475569"]
        }
      });

      // center pin
      const el = document.createElement("div");
      el.style.cssText = "width:14px;height:14px;border-radius:50%;background:#06B6D4;box-shadow:0 0 0 4px rgba(6,182,212,.25)";
      pinMarker = new maplibregl.Marker({ element: el }).setLngLat(mapCenter).addTo(map);

      refreshPoint(mapCenter);

      // Show the visitor THEIR area instead of a fixed midtown pin. iOS
      // Safari often ignores geolocation requests that don't come from a
      // user tap, so the silent attempt on load is best-effort and the
      // "Near me" button (a real tap) is the reliable path.
      const locateVisitor = (fromTap) => {
        if (!navigator.geolocation) return;
        const label = document.getElementById("mapLocLabel");
        if (fromTap && label) label.textContent = "Locating you…";
        navigator.geolocation.getCurrentPosition((pos) => {
          const lng = pos.coords.longitude, lat = pos.coords.latitude;
          const inNyc = lat > 40.49 && lat < 40.93 && lng > -74.27 && lng < -73.68;
          // Always show the visitor where THEY are — refusing to move outside
          // NYC read as "broken". Outside coverage, the label says so.
          map.flyTo({ center: [lng, lat], zoom: inNyc ? 13.5 : 11 });
          setPin([lng, lat]);
          if (label) label.textContent = inNyc ? "Your location · live" : "Your location — live data covers NYC only";
        }, (err) => {
          if (!fromTap || !label) return;
          // Spell out WHICH layer refused — "not working" hides three
          // different problems (site permission vs OS Location Services vs
          // no GPS fix) with three different fixes.
          const code = err && err.code;
          label.textContent = code === 1
            ? "Blocked by browser site permission (aA → Website Settings → Location → Allow)"
            : code === 2
              ? "Phone location unavailable — check Settings → Privacy → Location Services (on, + Safari Websites: While Using)"
              : code === 3
                ? "Timed out getting a GPS fix — try again near a window"
                : `Location error: ${(err && err.message) || "unknown"}`;
        }, { maximumAge: 0, timeout: 12000, enableHighAccuracy: false });
      };
      const mapWrap = document.getElementById("home-map")?.parentElement;
      if (mapWrap) {
        const geoBtn = document.createElement("button");
        geoBtn.type = "button";
        geoBtn.textContent = "◎ Near me";
        geoBtn.style.cssText = "position:absolute;top:10px;right:10px;z-index:5;border:1px solid rgba(6,182,212,.5);background:rgba(7,17,31,.85);color:#06B6D4;font-weight:700;font-size:12px;padding:8px 14px;border-radius:999px;cursor:pointer";
        geoBtn.addEventListener("click", () => locateVisitor(true));
        mapWrap.style.position = mapWrap.style.position || "relative";
        mapWrap.appendChild(geoBtn);
      }
      locateVisitor(false);
    });

    map.on("click", (e) => { setPin([e.lngLat.lng, e.lngLat.lat]); });
  }

  function setPin(lngLat) {
    mapCenter = lngLat;
    if (pinMarker) pinMarker.setLngLat(lngLat);
    if (map.getSource("radius")) map.getSource("radius").setData(circleGeo(lngLat, CONFIG.RADIUS_METERS));
    refreshPoint(lngLat);
  }

  /* GeoJSON circle polygon */
  function circleGeo(center, radiusM) {
    const pts = 64, coords = [], [lng, lat] = center;
    const dx = radiusM / (111320 * Math.cos(lat * Math.PI / 180)), dy = radiusM / 110540;
    for (let i = 0; i <= pts; i++) { const a = i / pts * 2 * Math.PI; coords.push([lng + dx * Math.cos(a), lat + dy * Math.sin(a)]); }
    return { type: "Feature", geometry: { type: "Polygon", coordinates: [coords] } };
  }

  /* Pull live data for a point (competitors + readout), with simulation fallback */
  async function refreshPoint(center) {
    let data;
    try {
      // INTEGRATE #2: GET /api/point?lng=&lat=&radius=&business=
      const u = `${CONFIG.POINT_URL}?lng=${center[0]}&lat=${center[1]}&radius=${CONFIG.RADIUS_METERS}&business=${mapBiz}`;
      data = await (await fetch(u)).json();
      if (!data || !Array.isArray(data.competitors)) throw new Error("bad /point payload");
    } catch (err) { console.warn("API /point failed, using simulation", err); data = simPoint(center); }

    // competitor features
    const feats = data.competitors
      .filter((c) => mapBiz === "all" || c.business === mapBiz)
      .map((c) => ({ type: "Feature", geometry: { type: "Point", coordinates: [c.lng, c.lat] }, properties: { inRadius: !!c.inRadius } }));
    if (map.getSource("competitors")) map.getSource("competitors").setData({ type: "FeatureCollection", features: feats });

    updateReadout(data);
  }

  function updateReadout(d) {
    const r = document.getElementById("readout"), t = document.getElementById("readoutTxt"), ic = r.querySelector("i");
    if (layer === "foot") { ic.className = "ti ti-walk"; t.textContent = `Peak footfall ${d.footfall.toLocaleString()}/day · top ${d.footPct}%`; }
    else if (layer === "comp") { const n = d.competitors.filter((c) => (mapBiz === "all" || c.business === mapBiz) && c.inRadius).length; const lbl = mapBiz === "all" ? "competitor" : mapBiz + " competitor"; ic.className = "ti ti-building-store"; t.textContent = `${n} ${lbl}${n === 1 ? "" : "s"} within ${(CONFIG.RADIUS_METERS / 1609).toFixed(1)} mi`; }
    else { ic.className = "ti ti-trending-up"; t.textContent = `Unmet demand index ${d.demand}/100`; }
  }

  /* ---- SIMULATION (fallback when /api/point is unavailable) ---- */
  function simPoint(center) {
    const s = hash(center[0].toFixed(4) + "_" + center[1].toFixed(4));
    const cats = ["coffee", "coffee", "coffee", "gym", "pizza", "pizza", "salon", "gym", "coffee"];
    const comps = cats.map((cat, i) => {
      const h2 = hash(s + "_" + i);
      const dx = ((h2 % 200) / 200 - 0.5) * 0.012, dy = (((h2 >> 4) % 200) / 200 - 0.5) * 0.012;
      const lng = center[0] + dx, lat = center[1] + dy;
      const distM = Math.hypot(dx * 111320 * Math.cos(lat * Math.PI / 180), dy * 110540);
      return { lng, lat, business: cat, inRadius: distM <= CONFIG.RADIUS_METERS };
    });
    return { footfall: 4000 + (s % 14000), footPct: 5 + (s % 30), demand: 52 + (s % 47), competitors: comps };
  }

  /* layer + business filter wiring */
  document.querySelectorAll(".lbtn").forEach((b) => b.onclick = () => {
    layer = b.dataset.layer;
    document.querySelectorAll(".lbtn").forEach((x) => x.classList.toggle("on", x === b));
    refreshPoint(mapCenter);
  });
  document.querySelectorAll(".cgroup .bchip").forEach((b) => b.onclick = () => {
    mapBiz = b.dataset.b;
    document.querySelectorAll(".cgroup .bchip").forEach((x) => x.classList.toggle("on", x === b));
    layer = "comp"; document.querySelectorAll(".lbtn").forEach((x) => x.classList.toggle("on", x.dataset.layer === "comp"));
    refreshPoint(mapCenter);
  });

  /* ================================================================
     DEMO PANEL  (real in-page SpotVest engine)
     ================================================================ */
  let selBiz = "coffee", mode = "area", selZip = "10001";

  function buildBiz() {
    bizGridEl.innerHTML = BIZ.map((b) => `<div class="chip${b.id === selBiz ? " sel" : ""}" data-biz="${b.id}">${b.label}</div>`).join("");
    bizGridEl.querySelectorAll(".chip").forEach((el) => (el.onclick = () => { selBiz = el.dataset.biz; buildBiz(); }));
  }
  function buildLoc() {
    const w = document.getElementById("locWrap");
    if (!w) return;
    if (mode === "area") {
      w.innerHTML = `<span class="aLbl">ZIP code</span><input class="field" id="zipInput" value="${selZip}" placeholder="Enter a NYC ZIP code" inputmode="numeric" />`;
      analyzeBtn.innerHTML = "Analyze Area &#8594;";
    } else {
      w.innerHTML = `<span class="aLbl">Street address</span><input class="field" id="addrInput" value="350 5th Ave, New York, NY" placeholder="123 Main St, Brooklyn, NY" autocomplete="street-address" />`;
      analyzeBtn.innerHTML = "Analyze Block &#8594;";
    }
  }
  document.querySelectorAll("#segCtl button").forEach((b) => b.onclick = () => {
    mode = b.dataset.mode; document.querySelectorAll("#segCtl button").forEach((x) => x.classList.toggle("on", x === b)); buildLoc();
  });

  async function fetchJson(url, opts) { const res = await fetch(url, opts); if (!res.ok) throw new Error(`${url} -> ${res.status}`); return res.json(); }

  async function resolveLocation(value) {
    if (mode === "area") {
      const zip = (value.match(/\b\d{5}\b/) || [value])[0];
      // The hardcoded centroid table only covered 5 ZIPs — every other ZIP
      // pinned the map to midtown. Geocode the real ZIP center (the server
      // caches it for 7 days); the table and NYC default are fallbacks only.
      let hit = ZIP_CENTROIDS[zip] || null;
      try {
        const g = await fetchJson(`/api/geocode?address=${encodeURIComponent(`${zip}, New York, NY`)}`);
        const lng = Number(g.lng), lat = Number(g.lat);
        if (Number.isFinite(lng) && Number.isFinite(lat)) {
          hit = { c: [lng, lat], city: g.borough || (hit && hit.city) || "New York, NY" };
        }
      } catch (err) { console.warn("[home] ZIP geocode failed, using fallback center", err); }
      hit = hit || NYC_DEFAULT;
      return { zip, center: hit.c, label: `ZIP ${zip} · ${hit.city}`, scope: `AREA · ZIP ${zip}`, isArea: true };
    }
    let center = NYC_DEFAULT.c, zip = "10001";
    try {
      const g = await fetchJson(`/api/geocode?address=${encodeURIComponent(value)}`);
      if (Array.isArray(g.center)) center = g.center;
      else if (typeof g.lng === "number" && typeof g.lat === "number") center = [g.lng, g.lat];
      const z = (g.zip || g.label || value).toString().match(/\b\d{5}\b/);
      if (z) zip = z[0];
    } catch (err) {
      console.warn("[home] geocode failed, using ZIP from address", err);
      const z = value.match(/\b\d{5}\b/); if (z) zip = z[0];
    }
    return { zip, center, label: value, scope: `BLOCK · ${value}`, isArea: false };
  }

  function rentLabel(profile) {
    const r = safeNumber(profile && profile.rent, 50);
    if (r >= 80) return "VERY HIGH"; if (r >= 65) return "HIGH"; if (r >= 45) return "MODERATE"; return "LOW";
  }
  function verdictFor(score) {
    if (score >= 80) return { label: "VIABLE", color: "#10B981" };
    if (score >= 68) return { label: "MODERATE", color: "#F59E0B" };
    return { label: "HIGH RISK", color: "#EF4444" };
  }

  function submitForm(form) {
    if (!form) return;
    window.sv3Debug?.(`home: submitting #${form.id}`);
    // The legacy forms are hidden while the landing is shown; requestSubmit()
    // runs constraint validation, and an invalid+hidden control makes Chrome
    // abort the submit SILENTLY (it can't show the bubble on a hidden field) —
    // a dead click with no error anywhere. Skip native validation; the app's
    // submit handlers do their own.
    form.noValidate = true;
    if (typeof form.requestSubmit === "function") {
      form.requestSubmit();
      return;
    }
    form.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
  }

  function openFullReport(r) {
    // Account gate: the demo is public, the full app is not. This path
    // submits the analysis forms directly, so it must enforce the same
    // verified-account rule as the in-app Analyze button.
    let account = null;
    try { account = JSON.parse(localStorage.getItem("areaIntelAccount") || "null"); } catch { /* treat as signed out */ }
    let vip = "";
    try { vip = localStorage.getItem("spotvestVip") || ""; } catch { /* none */ }
    if (!vip && !account?.emailVerified) {
      window.location.href = "/account?intent=analyze";
      return;
    }
    const businessInput = document.getElementById("business-input");
    const zipInput = document.getElementById("zip-input");
    const zipForm = document.getElementById("zip-form");
    const addressInput = document.getElementById("address-input");
    const addressForm = document.getElementById("address-form");
    const radiusInput = document.getElementById("radius-input");

    if (businessInput) {
      businessInput.value = r.business || "";
      businessInput.dispatchEvent(new Event("input", { bubbles: true }));
      businessInput.dispatchEvent(new Event("change", { bubbles: true }));
    }
    const businessSuggestions = document.getElementById("business-suggestions");
    if (businessSuggestions) businessSuggestions.hidden = true;
    businessInput?.setAttribute("aria-expanded", "false");

    document.body.classList.remove("landing-mode");
    document.body.classList.remove("business-picker-open");

    if (r.address && addressInput && addressForm) {
      addressInput.value = r.address;
      if (radiusInput) radiusInput.value = r.radius || "0.5";
      addressInput.dispatchEvent(new Event("input", { bubbles: true }));
      submitForm(addressForm);
    } else if (zipInput && zipForm) {
      zipInput.value = r.zip || "";
      zipInput.dispatchEvent(new Event("input", { bubbles: true }));
      submitForm(zipForm);
    }

    window.requestAnimationFrame(() => {
      document.getElementById("results")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  function renderResult(r) {
    const v = r.verdict;
    document.getElementById("resultPanel").innerHTML = `
      <div class="rev scopepill"><i class="ti ${r.isArea ? "ti-map-2" : "ti-map-pin"}"></i>${r.scope}</div>
      <div class="rev scorebadge" style="background:${v.color}14;border:1px solid ${v.color}55">
        <span style="width:8px;height:8px;border-radius:50%;background:${v.color}"></span>
        <span style="font-size:12px;font-weight:600;color:${v.color}">${v.label}</span>
        <span style="font-size:26px;font-weight:700;color:${v.color}">${r.score}</span>
        <span style="font-size:13px;color:${v.color}88">/100</span>
        <span style="font-size:10px;color:#334155;margin-left:auto">${r.confidence}</span>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:9px">
        <div class="rev icard" style="border-top:2px solid #10B981;animation-delay:.1s"><h4 style="color:#10B981">Why it works</h4><p>${r.why}</p></div>
        <div class="rev icard" style="border-top:2px solid #F59E0B;animation-delay:.18s"><h4 style="color:#F59E0B">Risk factors</h4><p>${r.risk}</p></div>
        <div class="rev icard" style="border-top:2px solid #06B6D4;animation-delay:.26s"><h4 style="color:#06B6D4">Next action</h4><p>${r.action}</p></div>
      </div>
      <div class="rev" style="display:flex;align-items:center;justify-content:space-between;gap:10px;margin-top:10px;animation-delay:.34s">
        <p style="font-family:'IBM Plex Mono',monospace;font-size:9px;color:#1E3A5F;margin:0">Powered by the live SpotVest decision engine</p>
        <button type="button" id="homeFullReportBtn" style="border:0;border-radius:999px;background:#0E7490;color:#fff;font-weight:800;padding:10px 14px;box-shadow:0 10px 24px rgba(14,116,144,.22);cursor:pointer">View full report</button>
      </div>`;
    document.getElementById("homeFullReportBtn")?.addEventListener("click", () => { window.sv3Debug?.(`home: View full report clicked (zip=${r.zip} address="${r.address}")`); openFullReport(r); });
  }
  function renderError(msg) {
    document.getElementById("resultPanel").innerHTML = `
      <div class="ph"><i class="ti ti-alert-triangle" style="font-size:26px;color:#F59E0B;margin-bottom:10px"></i>
      <p style="color:#94A3B8">${msg}</p>
      <p style="font-size:11px;max-width:240px;margin-top:6px">Try a NYC ZIP (e.g. 10001) or a full street address, or use “Start Free Analysis” for the full report.</p></div>`;
  }

  async function runAnalysis() {
    window.sv3Debug?.(`home: runAnalysis mode=${mode}`);
    const panel = document.getElementById("resultPanel");
    const value = mode === "area"
      ? ((document.getElementById("zipInput") || {}).value || selZip).trim()
      : ((document.getElementById("addrInput") || {}).value || "").trim();

    if (mode === "area" && !/\b\d{5}\b/.test(value)) { renderError("Enter a five-digit NYC ZIP code to run the area analysis."); return; }
    if (mode === "block" && value.length < 6) { renderError("Enter a full street address to run the block analysis."); return; }

    panel.innerHTML = `<div class="ph"><div class="spin"></div><p style="color:#94A3B8;font-weight:500">${mode === "area" ? "Analyzing area…" : "Analyzing block…"}</p><p style="font-size:11px;max-width:240px;margin-top:4px">${mode === "area" ? "Scanning the ZIP — demographics, competition, demand momentum" : "Scanning this block — neighbors, demand, local fit"}</p></div>`;

    const biz = bizById(selBiz);
    let loc;
    try { loc = await resolveLocation(value); }
    catch (err) { console.warn("[home] resolveLocation failed", err); renderError("Could not resolve that location."); return; }
    if (mode === "area") selZip = loc.zip;

    // move the live map to the analyzed location (prototype map drives /api/point)
    if (map) { map.flyTo({ center: loc.center, zoom: mode === "area" ? 12.5 : 15.5 }); setPin(loc.center); }
    const locLabelEl = document.getElementById("mapLocLabel");
    if (locLabelEl) locLabelEl.textContent = `${loc.label} · live`;

    try {
      // Same engine as the in-app report: spotvestQuickAnalysis (app.js) runs
      // the identical signal fetches and scoring, so the demo score matches
      // what the same search shows inside the app.
      const quick = await window.spotvestQuickAnalysis({
        zip: loc.zip,
        business: biz.appTerm,
        lat: loc.center[1],
        lng: loc.center[0],
        address: loc.label || value || `${loc.zip}, New York, NY`,
        radiusMiles: 0.5
      });
      const profile = quick.profile;
      const recommendations = quick.recommendations;
      const businessResult = quick.businessResult || state.lastBusinessResult;
      const score = quick.score;
      const decision = decisionFor(profile, recommendations, businessResult);
      const confidence = confidenceFor(loc.zip, businessResult);
      const verdict = verdictFor(score);

      const compCount = businessResult ? safeNumber(businessResult.count, 0) : 0;
      const saturation = saturationLabel(saturationFromCount(compCount, profile));
      let demandSentence = "";
      try { demandSentence = demandMomentumLabel(businessResult); } catch (e) { demandSentence = ""; }
      if (/unavailable/i.test(demandSentence)) demandSentence = "";

      const scopeWord = loc.isArea ? "across the ZIP" : "within 0.5 mi";
      const why = `${biz.label} scores ${score}/100 here — ${decision.copy}`;
      const risk = `${compCount} competing ${biz.noun}${compCount === 1 ? "" : "s"} ${scopeWord}. Competitive pressure: ${saturation}. Rent pressure: ${rentLabel(profile)}.${demandSentence ? ` Demand momentum: ${demandSentence}.` : ""}`;
      const action = `${decision.next}. ${decision.nextCopy}`;

      renderResult({
        score,
        verdict,
        confidence: `${String(confidence.label || "").toUpperCase()} CONFIDENCE`.trim(),
        scope: loc.scope,
        isArea: loc.isArea,
        why,
        risk,
        action,
        // The exact business term the score was computed with — the handed-off
        // report must rescore identically.
        business: biz.appTerm,
        zip: loc.zip,
        address: mode === "block" ? value : "",
        radius: "0.5"
      });
    } catch (err) {
      console.error("[home] analysis failed", err);
      renderError("The analysis engine hit an error. Please try again.");
    }
  }

  analyzeBtn.onclick = runAnalysis;

  /* ---------- boot ---------- */
  buildBiz();
  buildLoc();
  initMap();
})();

// "What is SpotVest" — scroll-reveal + count-up stats. CSS handles the
// motion; this only flips the .in class and animates the numbers once.
(function animateWhatIsSpotvest() {
  const section = document.querySelector("#what-is-spotvest");
  if (!section) return;
  const reveals = section.querySelectorAll(".reveal");
  const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  if (reduced || !("IntersectionObserver" in window)) {
    reveals.forEach((el) => el.classList.add("in"));
    return;
  }
  let counted = false;
  const runCounters = () => {
    if (counted) return;
    counted = true;
    section.querySelectorAll("[data-count]").forEach((el) => {
      const target = Number(el.dataset.count) || 0;
      const suffix = el.dataset.suffix || "";
      const started = performance.now();
      const tick = (now) => {
        const progress = Math.min(1, (now - started) / 1200);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = `${Math.round(target * eased)}${suffix}`;
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
  };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("in");
      if (entry.target.classList.contains("ws-stats")) runCounters();
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.2 });
  reveals.forEach((el) => observer.observe(el));
})();

// Extend the scroll-reveal to every landing card grid (Inside a report,
// How it works, Solutions, Pricing). Classes are added here at runtime so
// cards stay fully visible if JS or IntersectionObserver is unavailable.
(function animateLandingCards() {
  const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  if (reduced || !("IntersectionObserver" in window)) return;
  const cards = document.querySelectorAll("#inside .aic, #how .aic, #solutions .aic, .pricing-grid .pricing-card");
  if (!cards.length) return;
  cards.forEach((card) => {
    card.classList.add("reveal");
    const siblings = Array.from(card.parentElement.children);
    card.style.transitionDelay = `${(siblings.indexOf(card) % 6) * 0.08}s`;
  });
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("in");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.15 });
  cards.forEach((card) => observer.observe(card));
})();

/* ---------- Reviews: render approved, submit new (verified accounts) ---------- */
(function initReviews() {
  const grid = document.getElementById("reviews-grid");
  if (!grid) return;
  const esc = (value) => String(value ?? "")
    .replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;").replaceAll("'", "&#039;");
  const initials = (name) => String(name || "?").trim().split(/\s+/).slice(0, 2).map((part) => part[0] || "").join("").toUpperCase() || "?";
  const stars = (rating) => Array.from({ length: 5 }, (_, index) =>
    `<span${index < rating ? "" : ' class="off"'}>★</span>`).join("");

  (async () => {
    try {
      const data = await (await fetch("/api/reviews")).json();
      if (Array.isArray(data.reviews) && data.reviews.length) {
        grid.innerHTML = data.reviews.map((review) => `
          <article class="review-card reveal in">
            <div class="review-head">
              ${review.picture
                ? `<img class="review-avatar review-avatar-img" src="${esc(review.picture)}" alt="" referrerpolicy="no-referrer" loading="lazy" onerror="this.outerHTML='<div class=&quot;review-avatar&quot;>${esc(initials(review.name))}</div>'" />`
                : `<div class="review-avatar">${esc(initials(review.name))}</div>`}
              <div><strong>${esc(review.name)}</strong>${review.role ? `<small>${esc(review.role)}</small>` : ""}</div>
            </div>
            <div class="review-stars">${stars(review.rating)}${review.verifiedCustomer ? '<span class="rv-badge">✓ Verified customer</span>' : '<span class="rv-badge">✓ Verified</span>'}</div>
            <p>${esc(review.text)}</p>
          </article>`).join("");
        const subh = document.getElementById("reviews-subh");
        if (subh && data.average) subh.textContent = `${data.average}/5 from ${data.count} verified SpotVest account${data.count === 1 ? "" : "s"}.`;
      }
    } catch { /* keep the empty-state line */ }
  })();

  const form = document.getElementById("review-form");
  const openButton = document.getElementById("review-open");
  const statusEl = document.getElementById("review-status");
  const starButtons = Array.from(document.querySelectorAll("#review-stars button"));
  let rating = 5;
  const paintStars = () => starButtons.forEach((button) => button.classList.toggle("on", Number(button.dataset.star) <= rating));
  paintStars();
  starButtons.forEach((button) => button.addEventListener("click", () => {
    rating = Number(button.dataset.star) || 5;
    paintStars();
  }));
  openButton?.addEventListener("click", () => {
    form.hidden = !form.hidden;
    if (!form.hidden) {
      try {
        const account = JSON.parse(localStorage.getItem("areaIntelAccount") || "null");
        if (account?.name && form.elements.name && !form.elements.name.value) form.elements.name.value = account.name;
      } catch { /* fine */ }
      form.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  });
  form?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const submit = form.querySelector("button[type=submit]");
    submit.disabled = true;
    statusEl.textContent = "Submitting…";
    statusEl.className = "launch-status";
    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          rating,
          name: form.elements.name.value.trim(),
          role: form.elements.role.value.trim(),
          text: form.elements.text.value.trim()
        })
      });
      const result = await response.json().catch(() => ({}));
      if (response.status === 401) {
        statusEl.innerHTML = 'Reviews come from real accounts — <a href="/account" style="color:#4FE3D8">sign in</a> first, then come back.';
        statusEl.className = "launch-status launch-status-error";
        submit.disabled = false;
        return;
      }
      if (!response.ok) throw new Error(result.error || "Could not submit the review.");
      statusEl.textContent = result.message || "Thanks! Your review will appear after a quick check.";
      statusEl.className = "launch-status launch-status-ok";
      form.reset();
      paintStars();
    } catch (error) {
      statusEl.textContent = error.message;
      statusEl.className = "launch-status launch-status-error";
      submit.disabled = false;
    }
  });
})();
