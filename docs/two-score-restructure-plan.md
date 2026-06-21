# SpotVest Two-Score Restructure — Audit & Phased Plan

_Status: **AUDIT + PLAN ONLY. No engine code changed.**_
_Prepared: June 2026_

Goal: split the single blended score into **two separate 0–100 scores** —
**Market Fit** (will customers come?) and **Financial Viability** (can it make
money here?) — with a verdict driven by the **lower** of the two.

---

## 1. How "Cost side / Market side" works today

You already have a two-way split — but it's **display-only cosmetic text**, not
two real scores, and it does NOT drive the verdict. From `sv3CostMarketSplit`
(app.js ~4246):

- **Market side** = average of `Demand`, `Customer fit`, `Competition`
- **Cost side**   = average of `Financial viability` + `Risk`
- It prints "STRONG / OK / WEAK" + a sentence. The **actual headline** is still
  the single blended `opportunityScore`.

So you're ~30% there: the *idea* of two sides exists; the *plumbing* (two real
0–100 scores + a min-driven verdict) does not.

---

## 2. The current engine in one picture

- **7 components, FIXED weights for every business**: Demand .25, Customer-fit
  .20, Competition .15, Financial .15, Location .10, Growth .10, Risk .05.
- Foot traffic (BestTime+MTA blend, just shipped) and nightlife both fold into
  **Demand**. Demographics → **Customer fit**.
- **Rent burden**: `rentQuoteAssessment` + `rentBurdenPenalty` — real, and it
  already scales hard when rent runs over the healthy band. BUT it only touches
  the headline **when the user types a rent quote**.
- **Revenue**: a forward model exists — `revenue = sqft × sales-per-sqft ×
  locationFactor` (per-category `salesPerSf` bands, adjusted by demand/foot/
  income) + break-even + rent% — but it lives in the **Money tab, not the score**.

---

## 3. Spec → current: what maps, changes, is missing

| Spec piece | Status today |
|---|---|
| Two-sided framing | exists (display only) → promote to two real scores |
| Market Fit = demand/competition/foot/demographics/nightlife | all signals exist → merge into one score |
| Per-business-type signal weighting (coffee→foot, upscale→demographics, bar→nightlife, services→competition) | **MISSING** — weights identical for every business |
| Financial Viability standalone 0–100 | partial — Financial + Risk exist but **mix in competition** (spec: competition is Market-only) |
| Rent burden under Viability, scaled by severity | logic exists (`rentBurdenPenalty`) → make it the backbone, and work without a typed quote |
| Per-category healthy **rent %** bands | exists (`rentShare`) |
| Per-category **labor % + COGS %** bands | **MISSING** — only rent% is modeled |
| Estimated revenue driving the score | sqft model exists but isn't in the score |
| Verdict = **lower of the two** | **MISSING** — today it's a weighted blend + thresholds |

Also to fix: today **competition** feeds both the Market side AND the Risk/Cost
side, and **rent** leaks around. Spec is strict: competition = Market Fit only,
rent = Viability only. Phase 1 de-mixes these.

---

## 4. The honest gap — the revenue model

The spec wants **revenue = foot traffic × price-per-head × capture-rate**.
What exists is a **sqft × sales-per-sqft** model. Both are legitimate; the catch:

Our foot-traffic signals (BestTime busyness 0–100, MTA ridership) are **relative
indices, not "N people walk past your door."** Converting them to absolute
customers needs a **capture-rate + passersby calibration** — the one genuinely
uncertain number, and every viability figure leans on it. I will NOT invent it.
Proposal:

- Add **price-per-head** and **capture-rate** constants per business type
  (defensible industry ranges, documented and tunable).
- Convert foot-traffic indices → estimated daily passersby anchored to the
  **absolute MTA ridership** we already pull (a real number), not a guess.
- **Cross-check** the per-head estimate against the existing **sqft sales model**
  and reconcile (more conservative / blend), so no viability number rides on a
  single shaky input.
- Add **labor% + COGS%** bands → operating-cost model → real break-even →
  viability.

Result: revenue = two independent estimates agreeing, assumptions visible — not
a fabricated precise number.

### Healthy cost ratios to encode (from the spec)
| Business | Rent | Labor | COGS |
|---|---|---|---|
| Bar / nightlife | ≤8% | ~25% | ~20% (liquor) |
| Casual / sit-down | ≤10% | ~30% | ~30% |
| Upscale dining | ≤8% | ~32% | ~32% |
| Quick-service / counter | ≤10% | ~25% | ~30% |
| Fast-casual | ≤10% | ~27% | ~28% |
| Coffee / grab-and-go | ≤10% | ~25% | ~20% |
| Retail / shops | ≤12% | ~15% | ~50% |
| Substitutable services (nails, barber, gym) | ≤15% | ~35% | low |
| Targeted services (office, dental, legal) | ≤15% | ~40% | low |
| Destination / specialty (daycare, grooming, tutoring) | ≤15% | ~40% | low |

### Market Fit lead signals to encode (from the spec)
- Grab-and-go drinks: FootTraffic #1, Competition #2, Demographics low
- Quick-service food: FootTraffic #1, Competition #2, Demographics low
- Retail / shops: FootTraffic #1, Competition #2, Demographics #3
- Fast-casual ($12–18): FootTraffic #1, Demographics #2, Competition #3
- Casual sit-down ($20–30): Demographics #1, Competition #2, FootTraffic #3
- Upscale dining ($50+): Demographics #1, Accessibility/Destination #2, Competition #3, FootTraffic low
- Bars / nightlife: Nightlife #1, Competition #2, Demographics #3, FootTraffic #4
- Substitutable services: Competition #1, Demographics #2, FootTraffic #3
- Targeted / appointment: Demographics #1, Accessibility #2, Competition #3, FootTraffic low
- Destination / specialty: Demographics #1, Accessibility #2, Competition #3, FootTraffic low
- Spine: cheaper & faster → foot traffic leads; pricier & destination → demographics lead.

---

## 5. Verdict & severity rules (target behavior)

**Verdict = the LOWER of the two halves** (a business fails if EITHER fails;
never average into a misleadingly-fine number):
- High fit / High viability → **OPEN**
- High fit / Low viability  → **CONDITIONAL** ("busy but rent-risky")
- Low fit  / High viability → **CONDITIONAL** ("affordable but slow")
- Low fit  / Low viability  → **DO NOT OPEN**

**Severity:** the viability number and its text must match. Rent significantly
over the cap ⇒ viability drops into the **low-40s/50s, not the 60s**. Rent is
the #1 killer and hardest to fix. Rent risks live under Viability, never Market
Fit.

---

## 6. Phased plan

Each phase: **before/after on 4–5 real NYC addresses (incl. a busy-but-expensive
block)**; nothing deploys without explicit approval.

- **Phase 1 — Two real scores + min verdict, using today's signals.**
  Build `Market Fit` and `Financial Viability` as separate 0–100s from existing
  components; de-mix competition out of Viability; verdict = lower of the two;
  show both + a one-line reason. No new revenue model yet (uses the existing
  sqft model, clearly labeled). Fastest visible win.

- **Phase 2 — Per-business-type Market Fit weighting.**
  Implement the lead-signal table; make nightlife and accessibility first-class.
  Show the same address scoring differently for coffee vs upscale vs bar.

- **Phase 3 — Real revenue + operating-cost model (the gap).**
  price-per-head × capture × passersby, cross-checked vs sqft; add labor%/COGS%
  bands → break-even → rebuild Viability with the severity rule.

- **Phase 4 — Calibrate + finalize.**
  Tune constants on real addresses; verify the severity rule and verdict copy;
  lock it in.

---

## 7. Heads-up

Switching from a blended headline to "lower-of-two" will **pull some scores
down** — exactly the busy-but-rent-expensive spots (high fit / low viability).
That's the intended behavior; every phase ships with a before/after table so it's
never a surprise.

**Nothing in the engine has been changed. Next step on approval: Phase 1.**
