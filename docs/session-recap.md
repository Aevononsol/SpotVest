# SpotVest — What We Built & How It Works (Session Recap)

_Prepared: June 2026. Plain-English summary for the founder._

This covers everything we changed, what's **LIVE for customers** vs. what's in
the **hidden preview**, what **BestTime** is doing (and whether it's in the
score), and the decisions we made about data.

---

## TL;DR — the two most important things

1. **BestTime IS in the score now.** Real venue foot traffic (BestTime) is
   blended with subway ridership (MTA) and feeds the score — not just the
   display cards. Details below.
2. **There are two "modes" right now:**
   - **LIVE site (every customer):** the original **single 0–100 score**, but
     upgraded under the hood (fresh MTA data, BestTime blended in, better
     competitor matching).
   - **Hidden preview (only you, via `spotvest.ai/?preview=2`):** the new
     **two-score system** (Market Fit + Financial Viability). Customers do NOT
     see this. `?preview=0` turns it off.

---

## BestTime — what it's for, and is it in the score?

**Yes, it's in the score.** Here's exactly how:

- **In the live single score:** the foot-traffic part of the **Demand** factor is
  a blend of **65% BestTime (real venue busyness) + 35% MTA (subway ridership)**.
  This replaced the old "subway-only" foot-traffic input.
- **In the hidden two-score preview:** the same BestTime+MTA blend feeds the
  **Market Fit** score's foot-traffic signal, plus BestTime's per-street busyness
  helps judge the block.
- **On the display (both modes):** BestTime also powers the cards you see —
  "busy right now," busiest days/hours, and busiest blocks.

**How it stays accurate/stable:** BestTime data is **frozen per area (snapshot)**
so the same address scores the same every time. One caveat: the *very first* run
on a brand-new area may use subway-only until BestTime "warms up" in the
background — run an address twice and it's settled.

---

## What's LIVE for every customer now (deployed)

These shipped to the real site this session:

1. **Fresh subway data.** Switched from the old dataset (frozen at Dec 2024) to
   the current one (**"MTA Subway Hourly Ridership: Beginning 2025"**), now using
   **May 2026** data, and it **auto-updates to the latest complete month every
   month** (frozen so scores stay stable between updates).
2. **BestTime + MTA blended into the score** (the foot-traffic part of Demand),
   calibrated against real ridership numbers.
3. **Competitor matching fixed two ways:**
   - **Radius searches** now scan **every ZIP inside the circle** (a 1-mile
     search no longer misses competitors one block over in the next ZIP).
   - **Category precision:** a "coffee" search now keeps **actual coffee shops**
     and drops groceries/bodegas/pharmacies/gas stations that Google's keyword
     search wrongly pulled in. (Bars→bars, gyms→gyms, etc.)
   - **Indian/curry** cuisine now also counts Bangladeshi, Pakistani, Nepali,
     etc. (the real competitive set on "Curry Row").

## Admin tools added (for you, not customers)

4. **Outreach upgrades:** the broker pitch email was rewritten with current
   features; the prospect finder now returns **commercial brokers only** (drops
   residential agencies + auto-leasing companies); it **finds broker emails**;
   and outreach links are **click-tracked** so you can see who engaged.
5. **MTA ridership window** panel — shows the frozen month, confirms the data
   works, and can force the monthly refresh.
6. **Block check** panel — type an address, see exactly what the engine reads for
   that block (same-street commercial space vs. around-the-corner lots).
7. **Business export** panel — pull every NYC business matching a keyword (e.g.
   `hookah`, `coffee`), optionally by **ZIP**, and download as CSV.

---

## The hidden two-score preview (only you see it: `?preview=2`)

We designed and built a new scoring model behind a secret link. **It is NOT live
for customers.** It shows **two scores instead of one:**

- **Market Fit (0–100):** will customers come? (demand, foot traffic,
  competition, demographics, nightlife — weighted **by business type**).
- **Financial Viability (0–100):** can it make money here? (driven by **rent**
  vs. estimated revenue and category cost ratios).
- **Verdict = the LOWER of the two:** 70+ = OPEN, 50–69 = OPEN WITH CONDITIONS,
  below 50 = DO NOT OPEN. The wording matches the number (a 60 reads "workable,
  with conditions," never a confident "open").

What we built into it, in order:
- **Phase 1:** the two scores + lower-of-two verdict + one consistent story.
- **Phase 2:** Market Fit weighting **varies by business type** (coffee leans on
  foot traffic, upscale on demographics, bars on nightlife, services on
  competition).
- **Phase 3:** Financial Viability rebuilt as **real economics** — your **rent**
  now dominates it (cheap rent → high, expensive rent → low), against each
  business type's healthy rent/labor/COGS ratios.
- **Phase 4:** calibrated the revenue numbers.
- **Phase 5:** wired the **BestTime+MTA blend into Market Fit**, added **block
  vitality**, and made transit come from **real MTA** (not a borough guess).
- **Phase 6:** in **address mode**, the **block** drives the score (not the
  whole area), plus a **"same-block competition" penalty** (opening a pizza spot
  next to pizzas screens worse).
- **Phase 7:** measures the **exact block face** (same street) for "is this block
  alive?" using PLUTO commercial floor area — so a dead side street stops being
  propped up by a rich ZIP.

**Honest status of the preview:** it's a strong screening tool, but it kept
hitting the limits of free public data at the block level (e.g. a quiet
residential block with apartment-over-store space can still read "alive," and
some businesses are mis-categorized). It's good for screening; it's not
perfect ground truth.

---

## Data decisions we made

- **NYC open data** (free, legal to store) = the base for most categories.
- **Hookah and similar niches** can't be found reliably in city data (NYC doesn't
  register "hookah lounge," and the spots are named "Cafe/Lounge"). Proven:
  searching "hookah" in 10009 returned 0 even though ~10 exist.
- **Yelp** would help find those niches **but it's too expensive** ($229–643/mo),
  so we're **not** using it for now.
- **Google** (already integrated, ~free at our volume) stays our live lookup.
- **Decision: keep what we have now.** Revisit paid data only if revenue
  justifies it. A free "add business by hand" curation tool is available to build
  later if you want to own the niche lists.

---

## Where things stand

- **Live customers:** upgraded single-score (fresh MTA, BestTime blended in,
  better competitor matching) — working now.
- **You:** can preview the two-score system anytime at **`spotvest.ai/?preview=2`**
  (turn off with `?preview=0`), plus the new admin tools.
- **Nothing half-finished is exposed to customers.** The two-score system stays
  behind the preview flag until you decide to promote it.
