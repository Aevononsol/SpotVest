// Cross-location QA harness for SpotVest.
//
// Drives headless Chrome through real analyses and captures every section's
// committed values, so we can confirm each signal varies by location and the
// score is deterministic.
//
//   node qa/cross-location-qa.mjs                 # default 10 locations on prod
//   BASE=http://localhost:5199 node qa/cross-location-qa.mjs
//   node qa/cross-location-qa.mjs --stability     # also reruns #1 to prove stability
//
// IMPORTANT — why this polls scoreReady, not the banner text:
//   The banner shows "Analyzing…" until commit, then the final score. But
//   window.__spotvestScoreBreakdown is a DEBUG object that holds *preliminary*
//   values while signals are still loading (e.g. office 78 before PLUTO lands,
//   competition before the business count settles). An earlier harness broke its
//   wait loop on `.vl !== "Analyzing…"` and sometimes read those preliminary
//   numbers, reporting a "flicker" the UI never displayed. The correct gate is
//   state.scoreReady === true && state.scoreUnavailable !== true — the same gate
//   commitScoreWhenReady() uses. We then require the snapshot to be identical
//   across two reads, so any micro-settle right at commit can't be captured.

import fs from "node:fs";
import { spawn } from "node:child_process";

const BASE = process.env.BASE || "https://spotvest.ai";
const PORT = Number(process.env.CDP_PORT || 9321);
const CHROME = process.env.CHROME ||
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const WANT_STABILITY = process.argv.includes("--stability");
const OUT = new URL("./last-run.json", import.meta.url);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const LOCATIONS = [
  { id: 1, biz: "Italian restaurant", addr: "156 1st Ave, New York, NY 10009", zip: "10009", note: "East Village" },
  { id: 2, biz: "Specialty coffee", addr: "1500 Broadway, New York, NY 10036", zip: "10036", note: "Midtown / Times Sq" },
  { id: 3, biz: "Gym", addr: "200 7th Ave, Brooklyn, NY 11215", zip: "11215", note: "Park Slope" },
  { id: 4, biz: "Tacos", addr: "136-20 Roosevelt Ave, Flushing, NY 11354", zip: "11354", note: "Flushing" },
  { id: 5, biz: "Bakery", addr: "31-01 Steinway St, Astoria, NY 11103", zip: "11103", note: "Astoria" },
  { id: 6, biz: "Pizza", addr: "161 E 161st St, Bronx, NY 10451", zip: "10451", note: "Bronx" },
  { id: 7, biz: "Specialty coffee", addr: "1450 Hylan Blvd, Staten Island, NY 10305", zip: "10305", note: "Staten Island" },
  { id: 8, biz: "Full service restaurant", addr: "200-05 32nd Ave, Bayside, NY 11361", zip: "11361", note: "Bayside (no subway)" },
  { id: 9, biz: "Bar", addr: "620 Atlantic Ave, Brooklyn, NY 11217", zip: "11217", note: "Atlantic / Barclays" },
  { id: 10, biz: "Gym", addr: "1500 3rd Ave, New York, NY 10028", zip: "10028", note: "Upper East Side" }
];

// ---- CDP plumbing -----------------------------------------------------------
let chromeProc = null;
async function launchChrome() {
  chromeProc = spawn(CHROME, [
    "--headless=new", "--use-gl=angle", "--use-angle=swiftshader",
    "--enable-unsafe-swiftshader", `--remote-debugging-port=${PORT}`,
    `--user-data-dir=/tmp/sv-qa-${PORT}`, "about:blank"
  ], { stdio: "ignore" });
  for (let i = 0; i < 30; i++) {
    try {
      const r = await fetch(`http://localhost:${PORT}/json/version`);
      if ((await r.json()).webSocketDebuggerUrl) return;
    } catch { /* not up yet */ }
    await sleep(500);
  }
  throw new Error("Chrome CDP did not come up");
}

async function connect() {
  const tabs = await (await fetch(`http://localhost:${PORT}/json`)).json();
  const ws = new WebSocket(tabs.find((t) => t.type === "page").webSocketDebuggerUrl);
  const pend = new Map();
  let id = 0;
  ws.addEventListener("message", (e) => {
    const m = JSON.parse(e.data);
    if (m.id && pend.has(m.id)) { pend.get(m.id)(m); pend.delete(m.id); }
  });
  await new Promise((r) => ws.addEventListener("open", r));
  const send = (method, params = {}) => new Promise((res) => {
    const i = ++id; pend.set(i, res);
    try { ws.send(JSON.stringify({ id: i, method, params })); } catch { res({}); }
  });
  await send("Page.enable"); await send("Runtime.enable");
  const ev = async (expr) => {
    try {
      const r = await send("Runtime.evaluate", { expression: expr, returnByValue: true });
      return r.result?.result?.value;
    } catch { return null; }
  };
  return { ws, send, ev };
}

// ---- the corrected gate -----------------------------------------------------
// Waits for the SAME condition commitScoreWhenReady() commits on. Returns
// "ready" | "unavailable" | "timeout".
async function waitForCommit(ev, budgetMs = 45000) {
  const start = Date.now();
  while (Date.now() - start < budgetMs) {
    await sleep(700);
    const st = await ev(`(function(){return JSON.stringify({ready:state.scoreReady,unavail:state.scoreUnavailable});})()`);
    let s = {}; try { s = JSON.parse(st); } catch { /* page not ready */ }
    if (s.unavail === true) return "unavailable";
    if (s.ready === true) return "ready";
  }
  return "timeout";
}

// After commit, require the captured snapshot to be byte-identical across two
// reads ~700ms apart, so a micro-settle at the instant of commit can't leak in.
async function readStable(ev, capExpr, tries = 12) {
  let prev = null;
  for (let i = 0; i < tries; i++) {
    const cur = await ev(capExpr);
    if (cur && cur === prev) return cur;
    prev = cur;
    await sleep(700);
  }
  return prev;
}

const CAP = `(function(){
  var b=window.__spotvestScoreBreakdown||{};var c=b.components||{};
  var p=(state.liveProfiles||{})[state.zip]||{};
  var br=state.lastBusinessResult||{};var civ=(state.lastCivicResult||{}).complaints||{};
  var si=currentSiteIntelResult()||{};var pl=si.pluto||{};var lq=si.liquor||{};
  function eo(){try{return effectiveOffice(p)}catch(e){return null}}
  function en(){try{return effectiveNightlife(p)}catch(e){return null}}
  function et(){try{return effectiveTourist(p)}catch(e){return null}}
  return JSON.stringify({
    score:b.finalWeightedScore, verdict:b.decision, conf:b.confidenceScore,
    comp:c.competitionScore, compCount:br.count, googleVis:br.googleVisibleCount, registry:br.registryExact,
    risk:c.riskScore, c311:civ.level, c311n:civ.total180Days,
    demand:c.demandScore, foot:c.footTrafficEstimateScore,
    office:eo(), nightlife:en(), tourist:et(),
    officeArea:pl.officeArea, onPrem:lq.onPremise, hotels:pl.hotelLots,
    density:p.density, income:p.income,
    revenue:(elements.revenueProjection||{}).textContent
  });
})()`;

async function analyze(ev, send, loc) {
  await send("Page.navigate", { url: BASE + "/" }); await sleep(1200);
  await ev(`try{localStorage.clear()}catch(e){}`);
  await send("Page.navigate", { url: BASE + "/" }); await sleep(5500);
  await ev(`(function(){
    document.body.classList.remove('landing-mode');
    var r=document.getElementById('results'); if(r)r.hidden=false;
    sv3ShowMain('input');
    document.getElementById('sv3-biztype').value=${JSON.stringify(loc.biz)};
    document.getElementById('sv3-zip').value=${JSON.stringify(loc.zip)};
    document.getElementById('sv3-address').value=${JSON.stringify(loc.addr)};
    document.getElementById('sv3-analyze-address').click();
  })()`);
  const status = await waitForCommit(ev);              // <-- polls scoreReady, not the banner
  if (status !== "ready") return { id: loc.id, note: loc.note, biz: loc.biz, zip: loc.zip, status };
  let snap = {}; try { snap = JSON.parse(await readStable(ev, CAP)); } catch { snap = { parseErr: true }; }
  return { id: loc.id, note: loc.note, biz: loc.biz, zip: loc.zip, status, ...snap };
}

// ---- run --------------------------------------------------------------------
(async () => {
  console.log(`SpotVest cross-location QA · ${BASE}`);
  await launchChrome();
  const { ws, send, ev } = await connect();
  const out = [];
  const runs = WANT_STABILITY ? [...LOCATIONS, { ...LOCATIONS[0], id: 99, note: LOCATIONS[0].note + " (rerun)" }] : LOCATIONS;
  for (const loc of runs) {
    const rec = await analyze(ev, send, loc);
    out.push(rec);
    if (rec.status === "ready") {
      console.log(`#${rec.id} ${rec.note.padEnd(22)} score=${String(rec.score).padEnd(3)} ${String(rec.verdict || "").padEnd(11)} comp=${rec.comp} 311=${rec.c311} off=${rec.office} night=${rec.nightlife} tour=${rec.tourist} rev=${rec.revenue}`);
    } else {
      console.log(`#${rec.id} ${rec.note.padEnd(22)} -> ${rec.status.toUpperCase()} (no committed score)`);
    }
    fs.writeFileSync(OUT, JSON.stringify(out, null, 1));
  }
  // Stability summary if the rerun was requested.
  if (WANT_STABILITY) {
    const a = out.find((r) => r.id === 1), b = out.find((r) => r.id === 99);
    if (a && b) {
      const keys = ["score", "verdict", "comp", "risk", "demand", "foot", "office", "nightlife", "tourist", "c311", "revenue"];
      const diffs = keys.filter((k) => a[k] !== b[k]);
      console.log(`\nStability (#1 vs rerun): ${diffs.length ? "DIFFER -> " + diffs.join(", ") : "ALL IDENTICAL ✓"}`);
    }
  }
  console.log(`\nWrote ${OUT.pathname}`);
  try { ws.close(); } catch { /* ignore */ }
  if (chromeProc) chromeProc.kill();
  process.exit(0);
})();
