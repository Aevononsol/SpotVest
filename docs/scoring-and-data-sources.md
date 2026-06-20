# SpotVest — Scoring & Data Sources (plain-English reference)

_Last reviewed against the live code: June 2026_

This explains how the 0–100 score is built, where every number comes from,
and exactly how foot traffic works (BestTime vs MTA).

---

## 1. The 7 score components

The final 0–100 score is a weighted blend of these seven, then adjusted by
risk gates and a rent penalty.

| Component | Weight | What feeds it (plain English) | Where that data comes from |
|---|---|---|---|
| **Demand** | **25%** | Neighborhood density, transit access, office presence, nightlife, tourism, students, category base-demand, + Google **review momentum** (rating × review count) | Demographics profile (Census, cached) + Google Places (cached) |
| **Customer fit** | **20%** | Income, families/households, students, office workers, local-vs-chain preference, and how well the business category matches the area | Demographics profile (Census, cached) |
| **Competition** | **15%** | Count of nearby competitors → market saturation | **NYC city registry** (DOHMH restaurants + DCWP licenses) when available; else **live Google Places** count; else an estimate |
| **Financial** | **15%** | Area income, **rent pressure** (or **your quoted rent** if you typed it), category rent-sensitivity, margin fit, your budget. Big penalty if quoted rent is too high a share of sales | Demographics + PLUTO + **your input** |
| **Location quality** | **10%** | Transit access, street density, office pull, rent level, building commercial/retail floor area, subway ridership, exact-address bonus | Demographics + **PLUTO** + **MTA** (all cached) |
| **Area momentum** (growth) | **10%** | Nearby **construction permits**, commercial base, office, density, transit | **DOB permits** + PLUTO (cached) |
| **Risk** | **5%** | Rent pressure, competition saturation, low income, weak transit, area uncertainty (inverted, so higher = safer) | Demographics + competition + your rent input |

**Notes worth knowing:**
- **311 complaints** and **Google "demand momentum / Trends"** are shown on the
  report but are **NOT** in the score (too noisy / non-deterministic).
- Your **quoted rent**, if entered, overrides the area's average rent inside
  Financial, Location, and Risk — so you're scoring your actual deal.

---

## 2. Foot traffic: BestTime or MTA? → **Both, but for different jobs**

| Source | Feeds the SCORE? | Feeds the DISPLAY? |
|---|---|---|
| **MTA subway ridership** (data.ny.gov) | ✅ **Yes** — it's the foot-traffic proxy inside Demand & Location (transit signal + a ridership boost) | ✅ Yes (fallback hourly curve) |
| **BestTime.app** (real venue foot traffic) | ❌ **No** — does not move the 0–100 score | ✅ **Yes** — powers "busy right now," busiest days/hours, busiest blocks, and the hourly curve |

**How they combine on the hourly chart:** it uses **BestTime's real curve** when
available (normalized to 0–1); if BestTime has no data for that spot, it **falls
back to the MTA hourly ridership** curve. The score itself is computed from
**MTA + demographics regardless**.

➡️ **Right now the paid BestTime data is presentation, not scoring.** If you want
BestTime to actually influence the score (so the $30 data changes the number,
not just the cards), that's a deliberate change — it should be blended lightly so
it doesn't cause wild score swings.

---

## 3. Every external source the app calls

| Source (host) | What it provides | Cached or live? |
|---|---|---|
| **Google Places** — Nearby / Text / Details / Photo / Geocode (`maps.googleapis.com`) | Competitor counts, ratings/reviews, address geocoding, photos, prospect finder | Competitor count **frozen 365 days** (snapshot); everything else **cached 7 days** |
| **NYC Open Data / Socrata** (`data.cityofnewyork.us`) | DOHMH restaurant inspections, DCWP active licenses, **PLUTO** lots + owner, vacant storefronts, 311, DOB permits, sidewalk/other city licenses | **Cached 7 days** |
| **NY State Open Data** (`data.ny.gov`) | **MTA subway ridership**, NY State **liquor licenses** | **Cached 7 days** |
| **US Census** (`api.census.gov`) | Demographics (ACS 2023) + business patterns (ZBP) | **Cached 7 days** |
| **BestTime.app** (`besttime.app`) | Real venue foot traffic | Area forecast **cached 7 days**; live "busy now" **cached 12 min** |
| **OpenAI** (`api.openai.com`) | Writes the narrative wording + listing search (the **numbers come from the SpotVest engine, not the AI**) | Listings **cached 6h**; narrative **live** |
| **ACRIS** (`a836-acris.nyc.gov`) | Owner deed / contact lookup | **Link only — the server never calls it** |
| **Broker websites** (various) | Email discovery in the prospect finder | **Cached 7 days** |

**Bottom line:** almost everything is cached (mostly 7 days) so the score stays
stable and the page loads fast. The only true per-visit live calls are the
OpenAI narrative writing and the 12-minute "busy right now" tap.

**The headline:** _MTA drives the foot-traffic in the score; BestTime drives the
foot-traffic you see on the cards._
