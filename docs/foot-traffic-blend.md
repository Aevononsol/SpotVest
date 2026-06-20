# BestTime + MTA Foot-Traffic Blend — Audit, Design & Before/After

_Status: **NOT deployed.** Staged on branch `claude/new-session-wa6fmp`; `main` is untouched._
_Prepared: June 2026_

---

## What you asked for

Blend BestTime.app foot traffic and MTA ridership into ONE foot-traffic signal that
actually influences the 0–100 score (today BestTime only feeds the display).
Requirements: combine (don't replace) at a 65/35 BestTime/MTA weight on a shared
0–1 scale; keep MTA's transit role in Location quality; no double-counting;
deterministic (snapshotted like the competitor count); light touch. Audit first,
show before/after, don't deploy.

---

## 1. Audit — what I confirmed before changing anything

- **MTA → Demand** lived in exactly ONE place: a *binary* `+6` boost applied when
  Dec-2024 ridership within the radius was > 250,000. **This is the old "MTA-only
  foot-traffic input in Demand" — it's what I replaced.**
- **MTA → Location quality** is a SEPARATE `+8` transit-access boost (same ridership
  threshold). **Left untouched**, exactly per spec.
- No other live foot-traffic path feeds Demand, so there's no hidden double-count.
- BestTime already loads for the display cards and is cached per area for 7 days;
  I reused that cache and added a write-once snapshot for determinism.

---

## 2. What I built (maps 1:1 to your 5 requirements)

1. **Combine, don't replace** — one blended 0–1 value:
   `blended = 0.65 × (BestTime ÷ 100) + 0.35 × (MTA ÷ MTA_CITYWIDE_MAX)`
2. **MTA keeps its Location job** — the transit-access `+8` in Location quality is
   untouched. This change only touches the Demand foot-traffic input.
3. **No double-counting** — the blended value REPLACES the old binary `+6`; a busy
   area is counted once, not twice.
4. **Deterministic** — BestTime is frozen in a write-once snapshot (same pattern as
   the Google competitor count); MTA is cached and uses a fixed historical window.
   Same address → identical score, run to run.
5. **Light touch** — Demand contribution = `round(blended × 8)`, grading 0–8 instead
   of the old 0/6 binary.

**Fallback logic (so no address loses its signal):**
- BestTime + MTA both present → blend 65/35.
- BestTime has no data → **MTA alone** (normalized).
- No subway nearby (e.g. Staten Island) → **BestTime alone**.

---

## 3. Before / after across the QA locations (business: cafe)

| ZIP | Area | btNorm | mtaNorm | blended | mode | Demand old→new | HEADLINE old→new (Δ) |
|---|---|---|---|---|---|---|---|
| 10003 | East Village/Union Sq | 0.72 | 1.00 | 0.82 | blend | 84→85 | **68→68 (0)** |
| 11201 | Bklyn Heights/DUMBO | 0.58 | 0.47 | 0.54 | blend | 74→72 | **71→70 (−1)** |
| 11101 | Long Island City | — | 0.60 | 0.60 | **MTA fallback** ⚠️ | 72→71 | **76→76 (0)** |
| 10458 | Fordham/Belmont | 0.64 | 0.40 | 0.56 | blend | 70→68 | **65→64 (−1)** |
| 10301 | St. George (SI) | 0.40 | — | 0.40 | **BestTime-only** ⚠️ | 51→54 | **60→61 (+1)** |

**Determinism check:** East Village run 5× → `68, 68, 68, 68, 68` → **IDENTICAL ✓**

**Fallback flags:**
- ⚠️ **11101 (LIC)** — BestTime returned no venue data → fell back to MTA alone.
- ⚠️ **10301 (Staten Island)** — no subway, MTA blind → blend used BestTime alone.
  This is the headline win: MTA-only gave SI nothing; BestTime now supplies real
  foot traffic (+3 Demand).

---

## 4. How to read it

- Headline swings are **±1** at realistic inputs — it refines, it doesn't whipsaw. ✓
- Sensible pattern: transit-heavy areas that used to get a flat +6 now get a
  *graded* boost (slightly lower); places MTA couldn't see (Staten Island) finally
  get a real foot-traffic signal.
- No decision labels flipped.

---

## 5. The one open knob — needs your real numbers

`MTA_CITYWIDE_MAX` (the divisor that normalizes ridership to 0–1) is currently
**1,500,000** — a reasonable guess, but the sandbox **can't fetch real ridership**,
so the ridership/BestTime values in the table above are *assumed*. If the divisor is
off, MTA's share of the blend is off.

To calibrate precisely: I can add a one-line log to capture real Dec-2024 ridership
for the QA addresses in production, then set the divisor exactly.

---

## 6. Tunable parameters (where they live in the code)

| Knob | Current | Meaning |
|---|---|---|
| `FT_BESTTIME_WEIGHT` | 0.65 | BestTime share of the blend |
| `FT_MTA_WEIGHT` | 0.35 | MTA share of the blend |
| `MTA_CITYWIDE_MAX` | 1,500,000 | ridership that normalizes to 1.0 (needs calibration) |
| `FT_DEMAND_SCALE` | 8 | max points the blend adds to Demand |

All four sit at the top of `buildInstitutionalAnalysis` in `app.js`. Server-side
snapshot/cache logic is in `resolveAreaFootTraffic` / `warmAreaFootTraffic` in
`server.js`, attached to `siteIntelligence` as `footTraffic`.

---

## 7. Deploy status & next step

- Code committed to branch `claude/new-session-wa6fmp` (commit "Rework: blend
  BestTime+MTA into one Demand foot-traffic signal").
- **Not merged to `main`, `index.html` cache version not bumped → live site
  unaffected.**
- To ship: bump the cache version, merge to `main`, push (Render auto-deploys).
- Or adjust weights/scale/divisor first and I'll re-run the before/after table.
