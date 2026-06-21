# SpotVest — ZIP-Profile Audit & Phase 5 (Block-Level Signal) Plan

_Status: **AUDIT + PLAN ONLY. No code changed.**_
_Prepared: June 2026_

Context: validation finding — two addresses within 0.5 mi (101 E 4th St / 10003,
a dead side street; 184 1st Ave / 10009, a busy avenue) scored the **side street
HIGHER** Market Fit for both coffee and sushi, despite the side street having
MORE direct competitors. Root causes below.

---

## 1. The ZIP-profile situation

SpotVest recognizes **183 NYC ZIPs**. Of those:
- **5 are hand-tuned "premium" profiles** (one per borough): `10003` East
  Village, `11201` Brooklyn Heights, `11101` LIC, `10458` Fordham, `10301`
  St. George.
- **The other 178 fall back to one of 5 generic borough templates**, then get
  partially overwritten by Census where it loads.

### Hand-set values (density / income / transit / rent / competition / nightlife / office / tourist)

| Profile | dens | inc | trans | rent | comp | night | office | tour |
|---|---|---|---|---|---|---|---|---|
| 10003 East Village | 92 | 86 | 94 | 90 | 88 | 92 | 68 | 78 |
| 11201 Bklyn Heights | 78 | 91 | 83 | 87 | 74 | 58 | 74 | 69 |
| 11101 LIC | 72 | 82 | 88 | 76 | 57 | 54 | 82 | 42 |
| 10458 Fordham | 86 | 38 | 78 | 45 | 63 | 46 | 34 | 35 |
| 10301 St. George | 48 | 62 | 58 | 42 | 39 | 36 | 42 | 38 |
| **Manhattan (generic)** | 88 | 82 | 91 | 88 | 82 | 72 | 78 | 68 |
| **Bronx (generic)** | 78 | 45 | 70 | 48 | 58 | 42 | 34 | 28 |
| **Brooklyn (generic)** | 76 | 66 | 72 | 66 | 66 | 56 | 46 | 36 |
| **Queens (generic)** | 68 | 62 | 66 | 56 | 58 | 42 | 42 | 26 |
| **Staten Island (generic)** | 46 | 62 | 42 | 42 | 40 | 28 | 34 | 22 |

### Where the numbers came from
- The hand-tuned 5 and the 5 borough templates are **hand-authored estimates** —
  no dataset is cited in the code for them.
- The only profile fields backed by **real data (Census ACS 2023)** are the 7
  that `enrichProfileWithCensus` overwrites when Census loads:
  **density, income, rent, families, student, chainFit, localPreference**.

### What is NOT set by Census
**5 fields are never Census-set:** `transit, competition, nightlife, office,
tourist`. For the 178 generic ZIPs these are **borough-uniform constants** —
every non-premium Manhattan ZIP carries nightlife 72 / office 78 / tourist 68 /
transit 91, identical, whether it's Times Square or a sleepy residential pocket.

### Important nuance (softens the picture in address mode)
When you run an **exact address**, four of those five get replaced by **live
data**:
- `nightlife` ← SLA liquor licenses nearby
- `office` ← PLUTO office area
- `tourist` ← PLUTO hotels
- `competition` ← real nearby counts
- (+ MTA ridership for foot traffic)

What **never** gets a live override is **`transit`** (still the hand/borough
value). And **everything reverts to the template** if Census or the live calls
haven't resolved (cold cache, timeout).

### Net consistency verdict
- **Reliable** cross-ZIP for the 7 Census fields.
- **Reliable** in address-mode for nightlife / office / tourist / competition.
- **Unreliable** for `transit`, and **unreliable whenever Census/live data is
  missing** — at which point a premium ZIP (10003) and a generic ZIP (10009)
  diverge purely on hand-set template values.

That ZIP-template divergence, **on top of the block-not-measured issue**, is what
contaminated the two-address test (10003 premium vs 10009 generic).

### Recommendation beyond Phase 5
Also **derive `transit` from the real MTA ridership we already pull** (instead of
the hand/borough constant), so it stops being a citywide-inconsistent field.
Small change; removes the last non-real area signal. Fold into Phase 5 or do as a
quick follow-up.

---

## 2. How the foot-traffic / demand radius works today

Everything feeding Market Fit is **area-level, not block-level**:

| Signal | Resolution today |
|---|---|
| Demographics, density, transit, nightlife, office (the `profile`) | ZIP-level |
| MTA foot traffic | 0.5 mi circle |
| BestTime foot traffic | ~0.75 mi area |
| Competition count | 0.5 mi circle |

The only thing that looks at the actual block is a **competition proximity
boost** (rivals within ~0.1 mi add saturation) — but that only *penalizes*.
There is **no block-level foot-traffic/demand signal**. That's the gap.

### Is competition weighted hard enough?
It's in the score (more competitors → lower Competition sub-signal, weighted 0.25
for coffee up to 0.40 for services), but it's **outweighed by area demand**, and
for **walk-in** businesses raw competitor count is **ambiguous** (168 coffee
shops on a block = a very busy block). So the fix is **block-level resolution**,
not just cranking the competition weight.

---

## 3. Phase 5 plan — block-level vitality (behind `?preview=2`)

**Goal:** make the storefront's *block* count, so a live avenue beats a dead
side street in the same area.

**New signal — "block vitality" (0–100), from data we already have:**
1. **Avenue vs. mid-block side street** (from the address string): major
   corridors (numbered Avenues, Broadway, Bowery, named streets, major
   cross-streets like 14/23/34/42/Canal) score high; numbered mid-block side
   streets score low — with a bump if the side street is a busy cross-street.
2. **On-block retail density**: count business/storefront records (already
   fetched with coordinates) within ~75–100 m of the exact point → live retail
   block scores up, dead block scores down.
3. *(Optional v2)* **BestTime per-street busyness** — the area forecast already
   returns busiest streets; match the storefront's street.

**How it feeds the score:** block vitality becomes a **modifier on the
foot-traffic sub-signal** inside Market Fit, **weighted by business type** —
strong for walk-in (coffee, quick-service, retail), light/none for destination
(daycare, dental, upscale-by-appointment). So the block matters where it should
and doesn't distort destination businesses.

**Guardrails:** it's a bounded *modifier* (e.g. ±10–15 pts on the foot signal),
not a new dominant term — refines, doesn't whipsaw; gated behind `?preview=2`;
live untouched.

**Validation (your requirement):** test on a **same-ZIP pair** to isolate the
block effect from the ZIP artifact — e.g. in **10003**: a dead mid-block side
street vs. a busy avenue/corridor. Before/after table showing the avenue now
scores higher foot/Market Fit, with the side street no longer winning. Also
re-run the original cross-ZIP pair to show the combined effect.

**Caveat:** I can build and reason about it, but I can't run live addresses from
my environment — the before/after will use the model with realistic block
inputs, and you confirm on the preview with real addresses.

---

## 4. Open decisions before building Phase 5
- Build Phase 5 to the spec above? (avenue/side-street + on-block retail density)
- Include the **`transit`-from-MTA** consistency fix?
- Any change to the block-vitality weighting or the ±10–15 pt guardrail?

**Nothing has been changed. Phase 5 build is pending your go-ahead.**
