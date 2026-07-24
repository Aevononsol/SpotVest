# Legacy single-score engine — full reference (archived)

**Status:** superseded by the two-score model (Market Fit + Financial Viability).
**Why this file exists:** so the legacy engine can be understood, audited, or
rebuilt from scratch later without digging through git history.

Everything below documents the ORIGINAL scoring engine as it existed in `app.js`
before the two-score model became the default for all users.

---

## 1. What it was

A **single 0–100 "viability score"** (`opportunityScore`, surfaced as
`successProbability`) plus a **verdict** (`decision`) of OPEN / CONDITIONAL /
DO NOT OPEN / NEEDS MORE DATA.

It differed from the current model in one fundamental way:

| | Legacy single-score | Current two-score |
|---|---|---|
| Headline | one blended score of 7 components | `min(marketFit, financialViability)` |
| Risk | **fed the score** (a component + `severeRisk` override) | **display only**, never scores |
| Competition | inside the blend AND inside Risk | only inside Market Fit |
| Verdict bands | `>=75` + confidence `>=70` OPEN; `<55` or severeRisk DO NOT OPEN | `>=70` OPEN, `>=50` CONDITIONAL, else DO NOT OPEN |

---

## 2. The seven component scores

All are `clampScore`d to 0–100. These are still computed today (the two-score
model reads some of them via `scoreValue()`), so the formulas remain live.

```js
// Demand — Google Trends momentum was REMOVED (too flaky/non-deterministic);
// remaining weights renormalised by /0.9 to preserve scale.
demandScore = clamp((profile.density*0.18 + profile.transit*0.14
  + effectiveOffice(profile)*0.09 + effectiveNightlife(profile)*0.07
  + effectiveTourist(profile)*0.05 + profile.student*0.05
  + config.baseDemand*0.18 + reviewMomentum*0.14) / 0.9)

customerFitScore = clamp(profile.income*0.24 + profile.families*0.14
  + profile.student*0.08 + effectiveOffice(profile)*0.12
  + profile.localPreference*0.16 + profile.chainFit*0.1 + categoryFit*0.16)

competitionScore = clamp(100 - competitionPressure*0.78
  + (googlePlaces.avgRating >= 4.5 ? 4 : 0))     // higher = LESS saturated

locationScore = clamp(profile.transit*0.34 + profile.density*0.22
  + effectiveOffice(profile)*0.12 + (100-effectiveRent)*0.1
  + propertyBoost + transitBoost + (state.location ? 6 : 0))

financialScore = clamp(profile.income*0.3 + (100-effectiveRent)*0.28
  + (100-config.rentSensitivity)*0.1 + categoryFit*0.14
  + profile.chainFit*0.1 + budgetSupport*0.08)

growthScore = clamp(45 + permitBoost + propertyBoost
  + effectiveOffice(profile)*0.12 + profile.density*0.1 + profile.transit*0.08)

// Risk — inverted so HIGHER = SAFER
riskRaw   = clamp(effectiveRent*0.34 + competitionPressure*0.32
  + (100-profile.income)*0.1 + (100-profile.transit)*0.08
  + (!state.location ? 6 : 0))
riskScore = clamp(100 - riskRaw)
```

**Rent-quote penalty** (when the user supplies an actual monthly rent):
```js
rentPenalty       = rentBurdenPenalty(rentQuote)
financialScoreAdj = clamp(financialScore - rentPenalty)
riskScoreAdj      = clamp(riskScore - round(rentPenalty * 0.6))
```

### Supporting inputs
- `profile.*` — density, transit, income, rent, families, student,
  localPreference, chainFit, competition (borough model fallback)
- `effectiveOffice/Nightlife/Tourist/Transit(profile)` — real-data overrides
- `config` from `modeledBusinessConfig(business)` — `baseDemand`, `rentSensitivity`
- `categoryFitForBusiness(business, profile)`, `budgetSupportScore(config)`
- `reviewMomentum` = `clamp(min(100, log10(googleReviews+1)*24 + googleRating*7))`, else 45
- `competitionPressure` from `saturationFromCount(count, profile)`
  (tolerance 24 / 18 / 12 by density band; floor 8, ceiling 98)
- `permitBoost` (Heavy 10 / Active 6 / else 2), `propertyBoost` (PLUTO retail
  area >500k → 6, >150k → 3), `transitBoost` (MTA >250k monthly → 8)
- **311 complaints were deliberately NOT scored** — raw counts track population
  density more than business risk; scoring them penalised every dense
  neighbourhood. Display-only.

---

## 3. Blending into the headline

```js
successProbability = clamp(weightedBusinessScore(name => ({
  Demand: demandScore,
  "Customer fit": customerFitScore,
  Competition: competitionScore,
  "Financial viability": financialScoreAdj,
  "Location quality": locationScore,
  "Area momentum": growthScore,
  Risk: riskScoreAdj
}[name] ?? 50)))
```
(`weightedBusinessScore` applies per-business-type component weights.)

Then the **calibration layer** produced the final `opportunityScore`:

```js
function calibratedDecisionScore({ weightedScore, scoreValue, confidenceScore, successModel }) {
  // reads Demand, Customer fit, Competition, Financial viability,
  // Location quality, Area momentum, Risk
  weakSignals   = count(components <  45)
  strongSignals = count(components >= 72)

  adjustment = 0
  if (competition < 28) adjustment -= 8; else if (competition < 42) adjustment -= 4
  if (financial   < 35) adjustment -= 10; else if (financial   < 48) adjustment -= 5
  if (risk        < 30) adjustment -= 8;  else if (risk        < 45) adjustment -= 3
  if (demand      < 42) adjustment -= 8
  if (customerFit < 42) adjustment -= 6
  if (weakSignals >= 3) adjustment -= 5

  if (demand >= 70 && location >= 70)      adjustment += 4
  if (competition >= 64 && financial >= 62) adjustment += 5
  if (risk >= 68 && strongSignals >= 3)     adjustment += 4
  if (confidenceScore < 55)                 adjustment -= 4

  expanded = 50 + (weightedScore - 50) * 1.42   // spread around the midpoint
  return clamp(expanded + adjustment)
}
```

**Design note kept from the code:** competition must be counted ONCE. It already
sits in the weighted score (0.15) *and* inside Risk (0.32 of `riskRaw`). The
original stack charged a saturated block ~30 points for one fact (a −12 cliff +
a −6 pressure penalty + the risk cliff), which pushed ~80% of NYC analyses below
the 55 "DO NOT OPEN" line and contradicted the app's own best-fit
recommendation. The cliffs above are the softened replacement.

---

## 4. Verdict bands and `severeRisk`

```js
severeRisk = riskScore < 25
          || (riskScore < 35 && financialScore < 45 && opportunityScore < 62)

decision = confidenceScore < 45                      ? "NEEDS MORE DATA"
         : opportunityScore < 55 || severeRisk       ? "DO NOT OPEN"
         : opportunityScore >= 75 && confidenceScore >= 70 ? "OPEN"
         : "CONDITIONAL"
```

`decisionCopyFor(decision, successProbability, confidenceScore, riskScore)`
produced the sentence under the verdict:
- **OPEN** → "Strong customer fit and healthy demand support opening, subject to normal site diligence."
- **NEEDS MORE DATA** → "SpotVest needs stronger location and market evidence before making a reliable recommendation."
- **DO NOT OPEN** → `riskScore < 35` ? "…severe risk signals…" : "…conditions appear unfavorable…"
- **CONDITIONAL**, confidence < 70 → "Opportunity exists, but confidence is N. More proof is needed before a yes."
- **CONDITIONAL**, otherwise → "Evidence is strong enough to screen this as conditional: N viability score, with conditions…"

---

## 5. What is SHARED with the current engine (must not be removed)

These were built for the legacy engine but the **two-score model depends on them**:

- **The `scores` array** (the 7 components) — the two-score model reads it via
  `scoreValue("Competition")`, `scoreValue("Customer fit")`, etc.
- **`competitionScore` / `competitionPressure`** — feed Market Fit directly.
- **`confidenceScore`** — still gates `NEEDS MORE DATA` in the two-score verdict.
- **`successProbability`** — in two-score mode this is set to `headlineScore`,
  and is consumed by saved reports, comparisons, exports, PDF, and
  `computeRealAlternatives` (which scores candidates by their own
  `successProbability`).
- **`failureBase`** — the Best/Base/Worst-case failure percentages shown in
  every current report:
  ```js
  failureBase = clamp(84 - opportunityScore*0.55 + (100-riskScore)*0.28
                       + max(0, 70-confidenceScore)*0.25, 12, 82)
  ```
  **This is why `opportunityScore` and `riskScore` cannot simply be deleted.**

## 6. What was LEGACY-ONLY (safe to remove)

Verified to have **zero live consumers**:

- `severeRisk` — local only, fed the legacy `decision` ternary
- `decision` (the legacy 4-way verdict) and the `twoScore ? … : …` fallbacks
- `opportunityScore` + `calibratedDecisionScore` + the `weightedScore` call
- `successModel.successProbability` — **dead code**: computed at the end of
  `buildBusinessSuccessModel` then never read (also stale — computed before the
  foot-traffic/PLUTO mutations of the `scores` array)
- `analysis.opportunityScore` (returned field) — no reader anywhere
- `sv3CostMarketSplit(ctx)` — the only render branch gated OFF in two-score mode
- `isTwoScorePreview()` and the `?preview=0` rollback

### ⚠️ Two leaks that must be repointed BEFORE deleting `opportunityScore`
These are **not** gated by `twoScore`, so they run in the current product:
1. `topRecommendation.score = opportunityScore` → repoint to `headlineScore`
2. `failureBase` (scenario failure %) uses `opportunityScore` + `riskScore` →
   repoint to `headlineScore`

### ⚠️ Do NOT delete `decisionCopyFor` / `decisionFor`
`decisionFor()` is **not** gated and calls `decisionCopyFor` in BOTH engines. Its
prose feeds the hero subtitle, decision strip, memo action steps, full decision
panel and the `.txt` export. Removing it breaks the current two-score reports.

### Also keep (shared infrastructure, built for legacy but used by two-score)
`scores` array (all 7 components + `why` strings), `businessSuccessWeights`,
`confidenceScore`, `rentQuoteAssessment`/`rentBurdenPenalty`,
`categoryFitForBusiness`, `saturationFromCount`, `modeledBusinessConfig`,
`blendedFootTraffic`, `footTrafficScoreFor`, `decisionTier`, `topRisks`,
`conditions`, `explainability`.

### Note on already-saved data
Saved reports and compare entries on users' devices store legacy-computed
`decision`/`successProbability` and are re-rendered from storage without
recomputation — old entries keep their original numbers regardless.

---

## 7. How to bring it back

1. Restore `severeRisk`, `decision`, and `decisionCopyFor` from §4.
2. Re-add the `twoScore ? newValue : legacyValue` branches for
   `successProbability`, `decision`, `decisionCopy`, and the summary string.
3. `opportunityScore` and `calibratedDecisionScore` (§3) are still present in
   the code — the legacy verdict can be rebuilt on top of them with no other
   changes.

Git history also holds the original implementation; search for
`calibratedDecisionScore` and `severeRisk`.
