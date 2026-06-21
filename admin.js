const adminEls = {
  form: document.querySelector("#admin-auth-form"),
  token: document.querySelector("#admin-token"),
  status: document.querySelector("#admin-status"),
  leads: document.querySelector("#admin-leads"),
  accounts: document.querySelector("#admin-accounts"),
  purchases: document.querySelector("#admin-purchases"),
  emails: document.querySelector("#admin-emails"),
  tasks: document.querySelector("#admin-tasks"),
  runs: document.querySelector("#admin-runs"),
  agents: document.querySelector("#admin-agents"),
  runButton: document.querySelector("#admin-run-agents"),
  runStatus: document.querySelector("#admin-run-status"),
  taskForm: document.querySelector("#admin-task-form"),
  taskStatus: document.querySelector("#admin-task-status")
};

function escapeText(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function adminToken() {
  return adminEls.token?.value?.trim() || sessionStorage.getItem("areaIntelAdminToken") || "";
}

// Send the admin token in the Authorization header — never in the URL,
// which would leak it into access logs, history and Referer headers.
function authHeaders(extra = {}) {
  const token = adminToken();
  return token ? { ...extra, Authorization: `Bearer ${token}` } : { ...extra };
}

function setStatus(message, type = "") {
  if (!adminEls.status) return;
  adminEls.status.className = `launch-status ${type}`.trim();
  adminEls.status.textContent = message;
}

async function getJson(path) {
  const response = await fetch(path, { headers: authHeaders() });
  const result = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(result.error || "Admin request failed.");
  return result;
}

async function postJson(path, payload = {}) {
  const response = await fetch(path, {
    method: "POST",
    headers: authHeaders({ "Content-Type": "application/json" }),
    body: JSON.stringify(payload)
  });
  const result = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(result.error || "Admin request failed.");
  return result;
}

let leadsCache = [];
function renderLeads(leads) {
  leadsCache = leads || [];
  if (!adminEls.leads) return;
  adminEls.leads.innerHTML = leads.length ? leads.slice(0, 50).map((lead) => `
    <div class="admin-row">
      <strong>${escapeText(lead.name || lead.email || "New lead")}</strong>
      <span>${escapeText(lead.type || "lead")} · ${escapeText(lead.business || "No business")} · ${escapeText(lead.location || "No location")}</span>
      ${lead.draftReply ? `<span style="white-space:pre-line;background:rgba(57,194,214,.07);border:1px solid rgba(57,194,214,.2);border-radius:10px;padding:10px 12px;margin-top:6px">✉️ <b>AI draft reply:</b>\n${escapeText(lead.draftReply)}</span>` : ""}
      <small style="display:flex;align-items:center;gap:10px;flex-wrap:wrap">${escapeText(lead.email || lead.phone || "No contact")} · ${lead.createdAt ? new Date(lead.createdAt).toLocaleString() : "No timestamp"}
        ${lead.draftReply ? `<button type="button" data-copy-reply="${escapeText(lead.id || "")}" style="padding:5px 11px;font-size:11px;background:var(--surface);color:var(--txt);border:1px solid var(--border-strong);box-shadow:none">Copy reply</button>
        <a href="mailto:${escapeText(lead.email || "")}?subject=${encodeURIComponent("Re: your SpotVest message")}&body=${encodeURIComponent(lead.draftReply)}" style="padding:5px 11px;font-size:11px;border-radius:12px;background:linear-gradient(135deg,#3BD6C9,#33A7D8);color:#04222a;font-weight:700;text-decoration:none">Send reply</a>` : ""}
        <button type="button" data-lead-del="${escapeText(lead.id || "")}" style="padding:5px 11px;font-size:11px;background:rgba(255,107,107,.12);color:#FF8585;border:1px solid rgba(255,107,107,.3);box-shadow:none">Delete</button>
      </small>
    </div>
  `).join("") : '<p class="launch-status">No leads yet.</p>';
}

function renderAccounts(result) {
  if (!adminEls.accounts) return;
  const accounts = result.accounts || [];
  adminEls.accounts.innerHTML = accounts.length ? [
    `<p class="launch-status launch-status-ok">${result.total} account${result.total === 1 ? "" : "s"} total</p>`,
    ...accounts.slice(0, 100).map((account) => `
      <div class="admin-row">
        <strong>${escapeText(account.name || account.email)}</strong>
        <span>${escapeText(account.email)} · ${account.emailVerified ? "verified ✓" : "NOT verified"}${account.google ? " · Google" : ""}</span>
        <small>${account.createdAt ? new Date(account.createdAt).toLocaleString() : "No timestamp"}</small>
      </div>
    `)
  ].join("") : '<p class="launch-status">No signups yet.</p>';
}

function renderPurchases(result) {
  if (!adminEls.purchases) return;
  const purchases = result.purchases || [];
  adminEls.purchases.innerHTML = purchases.length ? [
    `<p class="launch-status launch-status-ok">${result.total} purchase${result.total === 1 ? "" : "s"} · $${((result.revenueCents || 0) / 100).toFixed(2)} total</p>`,
    ...purchases.slice(0, 100).map((purchase) => `
      <div class="admin-row">
        <strong>${escapeText(purchase.product || "purchase")} · $${((Number(purchase.amountTotal) || 0) / 100).toFixed(2)}</strong>
        <span>${escapeText(purchase.email || "no email")} · code ${escapeText(purchase.code)}</span>
        <small>${purchase.passExpiresAt ? `Pro Pass until ${new Date(purchase.passExpiresAt).toLocaleDateString()}` : `${purchase.creditsUsed}/${purchase.credits} credits used`} · ${purchase.createdAt ? new Date(purchase.createdAt).toLocaleString() : ""}</small>
      </div>
    `)
  ].join("") : '<p class="launch-status">No purchases yet.</p>';
}

function renderEmails(result) {
  if (!adminEls.emails) return;
  const emails = result.emails || [];
  adminEls.emails.innerHTML = emails.length ? emails.slice(0, 100).map((email) => `
    <div class="admin-row">
      <strong>${escapeText(email.subject || email.type || "email")}</strong>
      <span>to ${escapeText(email.to || "—")} · ${escapeText(email.status || "")}</span>
      <small style="display:flex;align-items:center;gap:10px">${email.createdAt ? new Date(email.createdAt).toLocaleString() : "No timestamp"}
        <button type="button" data-email-del="${escapeText(email.id || "")}" style="padding:5px 11px;font-size:11px;background:rgba(255,107,107,.12);color:#FF8585;border:1px solid rgba(255,107,107,.3);box-shadow:none">Delete</button>
      </small>
    </div>
  `).join("") : '<p class="launch-status">No emails sent yet.</p>';
}

function renderTasks(tasks) {
  if (!adminEls.tasks) return;
  adminEls.tasks.innerHTML = tasks.length ? tasks.slice(0, 80).map((task) => `
    <div class="admin-row">
      <strong>${escapeText(task.title || "Internal task")}</strong>
      <span>${escapeText(task.agentId || "agent")} · ${escapeText(task.priority || "normal")} priority · ${escapeText(task.status || "open")}</span>
      <small>${escapeText(task.nextAction || "Review and take action.")}</small>
      ${task.outputSummary ? `<small><strong>Output:</strong> ${escapeText(task.outputSummary)}</small>` : ""}
    </div>
  `).join("") : '<p class="launch-status">No agent tasks yet.</p>';
}

function renderRuns(runs) {
  if (!adminEls.runs) return;
  adminEls.runs.innerHTML = runs.length ? runs.slice(0, 60).map((run) => {
    const actions = Array.isArray(run.actions) ? run.actions.slice(0, 3) : [];
    return `
      <div class="admin-row">
        <strong>${escapeText(run.agentName || run.agentId || "AreaIntel agent")}</strong>
        <span>${escapeText(run.summary || "Agent work completed.")}</span>
        ${actions.length ? `<small>${actions.map((action) => `• ${escapeText(action)}`).join("<br>")}</small>` : ""}
        <small style="display:flex;align-items:center;gap:10px">${run.createdAt ? new Date(run.createdAt).toLocaleString() : "No timestamp"}
          <button type="button" data-run-del="${escapeText(run.id || "")}" style="padding:5px 11px;font-size:11px;background:rgba(255,107,107,.12);color:#FF8585;border:1px solid rgba(255,107,107,.3);box-shadow:none">Delete</button>
        </small>
      </div>
    `;
  }).join("") : '<p class="launch-status">No agent output yet. Run agents after tasks are created.</p>';
}

function renderAgents(agents) {
  if (!adminEls.agents) return;
  adminEls.agents.innerHTML = agents.length ? agents.map((agent) => `
    <article class="agent-card">
      <span>${escapeText(agent.cadence || "internal")} agent</span>
      <strong>${escapeText(agent.name)}</strong>
      <p>${escapeText(agent.goal)}</p>
      <em>${Number(agent.openTasks || 0)} open task${Number(agent.openTasks || 0) === 1 ? "" : "s"}</em>
    </article>
  `).join("") : '<p class="launch-status">No agents configured.</p>';
}

async function loadAdmin() {
  if (!adminToken()) {
    setStatus("Enter the admin token first.", "launch-status-error");
    return;
  }

  sessionStorage.setItem("areaIntelAdminToken", adminEls.token.value.trim());
  setStatus("Loading admin operations...");

  try {
    const [leadsResult, tasksResult, agentsResult, runsResult, accountsResult, purchasesResult, emailsResult] = await Promise.all([
      getJson("/api/admin/leads"),
      getJson("/api/admin/agent-tasks"),
      getJson("/api/admin/agents"),
      getJson("/api/admin/agent-runs"),
      getJson("/api/admin/accounts"),
      getJson("/api/admin/purchases"),
      getJson("/api/admin/emails")
    ]);
    renderAccounts(accountsResult);
    renderPurchases(purchasesResult);
    renderEmails(emailsResult);
    renderLeads(leadsResult.leads || []);
    renderTasks(tasksResult.tasks || []);
    renderAgents(agentsResult.agents || []);
    renderRuns(runsResult.runs || []);
    loadProspects();
    loadAdminReviews();
    loadSecuritySweeps();
    loadBriefs();
    setStatus("Admin operations loaded.", "launch-status-ok");
  } catch (error) {
    setStatus(error.message || "Could not load admin operations.", "launch-status-error");
  }
}

function formPayload(form) {
  const data = new FormData(form);
  const payload = {};
  for (const [key, value] of data.entries()) payload[key] = String(value || "").trim();
  return payload;
}

adminEls.form?.addEventListener("submit", (event) => {
  event.preventDefault();
  loadAdmin();
});

adminEls.runButton?.addEventListener("click", async () => {
  if (!adminToken()) {
    adminEls.runStatus.textContent = "Enter the admin token first.";
    adminEls.runStatus.className = "launch-status launch-status-error";
    return;
  }

  adminEls.runStatus.textContent = "Running agents...";
  adminEls.runStatus.className = "launch-status";
  adminEls.runButton.disabled = true;

  try {
    const result = await postJson("/api/admin/agents/run", { limit: 12 });
    adminEls.runStatus.className = "launch-status launch-status-ok";
    adminEls.runStatus.textContent = result.processed
      ? `${result.processed} agent task${result.processed === 1 ? "" : "s"} completed.`
      : "No open agent tasks to run.";
    await loadAdmin();
  } catch (error) {
    adminEls.runStatus.className = "launch-status launch-status-error";
    adminEls.runStatus.textContent = error.message || "Could not run agents.";
  } finally {
    adminEls.runButton.disabled = false;
  }
});

adminEls.taskForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!adminToken()) {
    adminEls.taskStatus.textContent = "Enter the admin token first.";
    adminEls.taskStatus.className = "launch-status launch-status-error";
    return;
  }

  adminEls.taskStatus.textContent = "Creating task...";
  adminEls.taskStatus.className = "launch-status";

  try {
    await postJson("/api/admin/agent-tasks", formPayload(adminEls.taskForm));
    adminEls.taskStatus.className = "launch-status launch-status-ok";
    adminEls.taskStatus.textContent = "Internal task created.";
    adminEls.taskForm.reset();
    await loadAdmin();
  } catch (error) {
    adminEls.taskStatus.className = "launch-status launch-status-error";
    adminEls.taskStatus.textContent = error.message || "Could not create task.";
  }
});

const savedToken = sessionStorage.getItem("areaIntelAdminToken");
if (savedToken && adminEls.token) {
  adminEls.token.value = savedToken;
}

/* ---------- Outreach: prospect finder + pitch drafts ---------- */
const prospectEls = {
  form: document.querySelector("#admin-prospect-form"),
  query: document.querySelector("#prospect-query"),
  area: document.querySelector("#prospect-area"),
  status: document.querySelector("#prospect-status"),
  results: document.querySelector("#prospect-results"),
  saved: document.querySelector("#prospect-saved")
};

function prospectPitch(prospect) {
  const subject = "Close retail leases faster — SpotVest";
  const body = [
    `Hi ${prospect.name} team,`,
    "",
    "I'm Maher, founder of SpotVest (https://spotvest.ai). The thing that stalls a retail lease is the tenant's doubt — \"will my business actually work in this space?\"",
    "",
    "SpotVest answers that in seconds. Type any NYC address and a business type and you get a 0-100 viability score backed by real foot-traffic counts from the venues on that block (including how busy it is right now and the busiest days and hours), the actual competitors nearby, demographics, and rent-vs-revenue math — e.g. \"this corner scores 78/100 for a coffee shop.\" Hand that to a hesitant tenant and they sign with confidence.",
    "",
    "There's also a Spaces tool that pulls vacant storefronts and building-owner info for any ZIP, so you can source and qualify spaces faster.",
    "",
    "It's $29/month with a 3-day free trial. I'd be glad to run a few free reports on spaces you're showing right now — just reply with an address or two.",
    "",
    "Best,",
    "Maher — SpotVest, spotvest.ai"
  ].join("\n");
  return { subject, body };
}

// Build the pitch for a saved prospect, routing the SpotVest link through the
// click tracker (/r/{id}) so we can see who actually clicked through.
function pitchFor(prospect) {
  const base = prospect.draftPitch
    ? { subject: "Close retail leases faster — SpotVest", body: prospect.draftPitch }
    : prospectPitch(prospect);
  if (!prospect.id) return base;
  const tracked = `https://spotvest.ai/r/${prospect.id}`;
  let body = base.body.replace(/https?:\/\/spotvest\.ai\b/gi, tracked);
  if (!body.includes(tracked)) body += `\n\nSee a live example: ${tracked}`;
  return { subject: base.subject, body };
}

function prospectEngagement(prospect) {
  const clicks = Number(prospect.clicks) || 0;
  if (!clicks) return `<span style="display:block;margin-top:2px;color:var(--txt-3)">○ no clicks yet</span>`;
  const when = prospect.lastClickAt ? new Date(prospect.lastClickAt).toLocaleDateString() : "";
  return `<span style="display:block;margin-top:2px;color:#4FE3D8;font-weight:600">● clicked ${clicks}×${when ? ` · last ${when}` : ""}</span>`;
}

function renderProspectRow(prospect, saved) {
  const meta = [
    prospect.address,
    prospect.rating ? `${prospect.rating}★ (${prospect.reviews})` : "",
    prospect.phone
  ].filter(Boolean).join(" · ");
  const site = prospect.website
    ? `<a href="${escapeText(prospect.website)}" target="_blank" rel="noopener" style="color:var(--teal)">website</a>`
    : "no website listed";
  const emailLine = prospect.email
    ? `<span style="display:block;margin-top:2px;color:var(--teal)">✉ <a href="mailto:${escapeText(prospect.email)}" style="color:var(--teal)">${escapeText(prospect.email)}</a></span>`
    : `<span style="display:block;margin-top:2px;color:var(--txt-3)">✉ no email found — check website</span>`;
  if (!saved) {
    return `<div class="admin-row">
      <strong>${escapeText(prospect.name)}</strong>
      <span>${escapeText(meta)} · ${site}</span>
      ${emailLine}
      <small><button type="button" data-prospect-save='${escapeText(JSON.stringify(prospect))}' style="padding:7px 14px;font-size:12px">Save prospect</button></small>
    </div>`;
  }
  const pitch = pitchFor(prospect);
  const mailto = `mailto:${encodeURIComponent(prospect.email || "")}?subject=${encodeURIComponent(pitch.subject)}&body=${encodeURIComponent(pitch.body)}`;
  return `<div class="admin-row">
    <strong>${escapeText(prospect.name)}</strong>
    <span>${escapeText(meta)} · ${site}</span>
    ${emailLine}
    ${prospectEngagement(prospect)}
    <small style="display:flex;gap:8px;align-items:center;flex-wrap:wrap">
      <a href="${mailto}" style="color:#04222a;background:linear-gradient(135deg,#3BD6C9,#33A7D8);border-radius:9px;padding:7px 13px;font-weight:700;text-decoration:none;font-family:Sora,sans-serif">Draft email</a>
      <button type="button" data-prospect-copy="${escapeText(prospect.id)}" style="padding:7px 13px;font-size:12px;background:var(--surface);color:var(--txt);border:1px solid var(--border-strong);box-shadow:none">Copy pitch</button>
      <select data-prospect-status="${escapeText(prospect.id)}" style="width:auto;padding:7px 10px;font-size:12px">
        ${["new", "emailed", "replied", "skip"].map((option) => `<option value="${option}"${prospect.status === option ? " selected" : ""}>${option}</option>`).join("")}
      </select>
    </small>
  </div>`;
}

let prospectCache = [];

function renderSavedProspects(prospects) {
  prospectCache = prospects || [];
  if (!prospectEls.saved) return;
  prospectEls.saved.innerHTML = prospectCache.length
    ? prospectCache.map((prospect) => renderProspectRow(prospect, true)).join("")
    : '<p class="launch-status">No saved prospects yet — search above and save the offices worth contacting.</p>';
}

async function loadProspects() {
  if (!adminToken()) return;
  try {
    const result = await getJson("/api/admin/prospects");
    renderSavedProspects(result.prospects || []);
  } catch { /* token panel already reports auth problems */ }
}

prospectEls.form?.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!adminToken()) {
    prospectEls.status.textContent = "Enter the admin token first.";
    prospectEls.status.className = "launch-status launch-status-error";
    return;
  }
  prospectEls.status.textContent = "Searching Google Places…";
  prospectEls.status.className = "launch-status";
  try {
    const params = new URLSearchParams({
      query: prospectEls.query.value.trim() || "real estate agency",
      area: prospectEls.area.value.trim()
    });
    const result = await getJson(`/api/admin/prospect-search?${params}`);
    const prospects = result.prospects || [];
    prospectEls.results.innerHTML = prospects.length
      ? prospects.map((prospect) => renderProspectRow(prospect, false)).join("")
      : '<p class="launch-status">No offices found there — try a different area.</p>';
    prospectEls.status.textContent = `${prospects.length} office${prospects.length === 1 ? "" : "s"} found.`;
    prospectEls.status.className = "launch-status launch-status-ok";
  } catch (error) {
    prospectEls.status.textContent = error.message || "Search failed.";
    prospectEls.status.className = "launch-status launch-status-error";
  }
});

const revokeEls = {
  form: document.querySelector("#admin-revoke-form"),
  email: document.querySelector("#revoke-email"),
  status: document.querySelector("#revoke-status")
};
revokeEls.form?.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!adminToken()) {
    revokeEls.status.textContent = "Enter the admin token first.";
    revokeEls.status.className = "launch-status launch-status-error";
    return;
  }
  const email = revokeEls.email.value.trim();
  if (!email || !confirm(`Cancel all subscriptions and lock access for ${email}?`)) return;
  revokeEls.status.textContent = "Revoking…";
  revokeEls.status.className = "launch-status";
  try {
    const result = await postJson("/api/admin/revoke-access", { email });
    revokeEls.status.textContent =
      `Done — ${result.subscriptionsCancelled}/${result.subscriptionsFound} subscription(s) cancelled, ${result.purchasesRevoked} purchase record(s) locked.`
      + (result.errors && result.errors.length ? ` Issues: ${result.errors.join("; ")}` : "");
    revokeEls.status.className = "launch-status launch-status-ok";
  } catch (error) {
    revokeEls.status.textContent = error.message || "Revoke failed.";
    revokeEls.status.className = "launch-status launch-status-error";
  }
});

const besttimeEls = {
  form: document.querySelector("#admin-besttime-form"),
  q: document.querySelector("#besttime-q"),
  status: document.querySelector("#besttime-status"),
  result: document.querySelector("#besttime-result")
};
besttimeEls.form?.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!adminToken()) {
    besttimeEls.status.textContent = "Enter the admin token first.";
    besttimeEls.status.className = "launch-status launch-status-error";
    return;
  }
  const params = new URLSearchParams();
  if (besttimeEls.q.value.trim()) params.set("q", besttimeEls.q.value.trim());
  besttimeEls.status.textContent = "Calling BestTime (uses ~5 credits)…";
  besttimeEls.status.className = "launch-status";
  besttimeEls.result.style.display = "none";
  try {
    const r = await getJson(`/api/admin/besttime-test?${params}`);
    if (r.configured === false) {
      besttimeEls.status.textContent = "BESTTIME_API_KEY is not set in Render yet.";
      besttimeEls.status.className = "launch-status launch-status-error";
    } else if (!r.available) {
      besttimeEls.status.textContent = `No usable data returned${r.error ? ` — ${r.error}` : ""}. (Returned ${r.venuesReturned || 0} venues.)`;
      besttimeEls.status.className = "launch-status launch-status-error";
    } else {
      besttimeEls.status.textContent = `✓ Works — ${r.venuesWithData}/${r.venuesReturned} venues had busyness. Busiest around ${r.peakLabel} (peak ${r.peakBusyness}%).`;
      besttimeEls.status.className = "launch-status launch-status-ok";
    }
    besttimeEls.result.textContent = JSON.stringify(r, null, 2).slice(0, 4000);
    besttimeEls.result.style.display = "block";
  } catch (error) {
    besttimeEls.status.textContent = error.message || "Test failed.";
    besttimeEls.status.className = "launch-status launch-status-error";
  }
});

const mtaEls = {
  form: document.querySelector("#admin-mta-form"),
  status: document.querySelector("#mta-status"),
  result: document.querySelector("#mta-result"),
  refreshBtn: document.querySelector("#mta-refresh-btn")
};
async function mtaCheck() {
  if (!adminToken()) {
    mtaEls.status.textContent = "Enter the admin token first.";
    mtaEls.status.className = "launch-status launch-status-error";
    return;
  }
  mtaEls.status.textContent = "Querying the MTA dataset…";
  mtaEls.status.className = "launch-status";
  mtaEls.result.style.display = "none";
  try {
    const r = await getJson("/api/admin/mta-window");
    mtaEls.status.textContent = r.sumRidershipWorks
      ? `✓ sum(ridership) works. Frozen window: ${r.window?.label}. Citywide this window: ${Number(r.citywideRidershipThisWindow).toLocaleString()}. Data through ${r.datasetMaxTimestamp}.`
      : `⚠ sum(ridership) returned no number${r.error ? ` — ${r.error}` : ""}.`;
    mtaEls.status.className = `launch-status ${r.sumRidershipWorks ? "launch-status-ok" : "launch-status-error"}`;
    mtaEls.result.textContent = JSON.stringify(r, null, 2).slice(0, 4000);
    mtaEls.result.style.display = "block";
  } catch (error) {
    mtaEls.status.textContent = error.message || "Check failed.";
    mtaEls.status.className = "launch-status launch-status-error";
  }
}
mtaEls.form?.addEventListener("submit", (event) => { event.preventDefault(); mtaCheck(); });
mtaEls.refreshBtn?.addEventListener("click", async () => {
  if (!adminToken()) {
    mtaEls.status.textContent = "Enter the admin token first.";
    mtaEls.status.className = "launch-status launch-status-error";
    return;
  }
  if (!confirm("Run the monthly MTA window refresh now?")) return;
  mtaEls.status.textContent = "Refreshing window…";
  mtaEls.status.className = "launch-status";
  try {
    const r = await postJson("/api/admin/mta-window", { action: "refresh" });
    mtaEls.status.textContent = `✓ Refreshed. ${r.before?.label} → ${r.after?.label} (refreshed ${r.after?.refreshedAt}).`;
    mtaEls.status.className = "launch-status launch-status-ok";
    mtaEls.result.textContent = JSON.stringify(r, null, 2).slice(0, 4000);
    mtaEls.result.style.display = "block";
  } catch (error) {
    mtaEls.status.textContent = error.message || "Refresh failed.";
    mtaEls.status.className = "launch-status launch-status-error";
  }
});

const blockEls = {
  form: document.querySelector("#admin-block-form"),
  address: document.querySelector("#block-address"),
  status: document.querySelector("#block-status"),
  result: document.querySelector("#block-result")
};
blockEls.form?.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!adminToken()) {
    blockEls.status.textContent = "Enter the admin token first.";
    blockEls.status.className = "launch-status launch-status-error";
    return;
  }
  const addr = (blockEls.address?.value || "").trim();
  if (!addr) return;
  blockEls.status.textContent = "Checking block…";
  blockEls.status.className = "launch-status";
  blockEls.result.style.display = "none";
  try {
    const r = await getJson(`/api/admin/block-check?address=${encodeURIComponent(addr)}`);
    blockEls.status.textContent = r.error
      ? `Error: ${r.error}`
      : `${r.verdict} · block-face commercial ${Number(r.blockFaceCommercialSqft).toLocaleString()} sq ft (aliveness ${r.blockAliveness01}) · street "${r.addrStreet}"`;
    blockEls.status.className = `launch-status ${r.error ? "launch-status-error" : "launch-status-ok"}`;
    blockEls.result.textContent = JSON.stringify(r, null, 2).slice(0, 6000);
    blockEls.result.style.display = "block";
  } catch (error) {
    blockEls.status.textContent = error.message || "Check failed.";
    blockEls.status.className = "launch-status launch-status-error";
  }
});

const bizEls = {
  form: document.querySelector("#admin-bizexport-form"),
  q: document.querySelector("#bizexport-q"),
  status: document.querySelector("#bizexport-status"),
  result: document.querySelector("#bizexport-result"),
  csvBtn: document.querySelector("#bizexport-csv")
};
let bizExportData = null;
bizEls.form?.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!adminToken()) {
    bizEls.status.textContent = "Enter the admin token first.";
    bizEls.status.className = "launch-status launch-status-error";
    return;
  }
  const q = (bizEls.q?.value || "").trim();
  if (!q) return;
  bizEls.status.textContent = `Pulling "${q}" from city data…`;
  bizEls.status.className = "launch-status";
  bizEls.result.style.display = "none";
  bizExportData = null;
  try {
    const r = await getJson(`/api/admin/business-export?q=${encodeURIComponent(q)}`);
    if (r.error) {
      bizEls.status.textContent = `Error: ${r.error}`;
      bizEls.status.className = "launch-status launch-status-error";
      return;
    }
    bizExportData = r;
    bizEls.status.textContent = `✓ ${r.count} businesses matching "${r.query}". Click Download CSV to save the full list.`;
    bizEls.status.className = "launch-status launch-status-ok";
    bizEls.result.textContent = (r.businesses || []).slice(0, 60)
      .map((b) => `${b.name} — ${b.category || "—"} — ${b.address} ${b.zip} [${b.source}]`).join("\n")
      + (r.count > 60 ? `\n…and ${r.count - 60} more (in the CSV)` : "");
    bizEls.result.style.display = "block";
  } catch (error) {
    bizEls.status.textContent = error.message || "Pull failed.";
    bizEls.status.className = "launch-status launch-status-error";
  }
});
bizEls.csvBtn?.addEventListener("click", () => {
  if (!bizExportData?.businesses?.length) {
    bizEls.status.textContent = "Pull a list first.";
    bizEls.status.className = "launch-status launch-status-error";
    return;
  }
  const esc = (v) => `"${String(v ?? "").replaceAll('"', '""')}"`;
  const rows = [["name", "category", "address", "zip", "lat", "lng", "source"].join(",")]
    .concat(bizExportData.businesses.map((b) => [b.name, b.category, b.address, b.zip, b.lat, b.lng, b.source].map(esc).join(",")));
  const blob = new Blob([rows.join("\n")], { type: "text/csv" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `spotvest-${bizExportData.query.toLowerCase().replace(/\s+/g, "-")}-businesses.csv`;
  document.body.appendChild(a); a.click(); a.remove();
  URL.revokeObjectURL(a.href);
});

document.addEventListener("click", async (event) => {
  const saveButton = event.target.closest("[data-prospect-save]");
  if (saveButton) {
    try {
      const prospect = JSON.parse(saveButton.dataset.prospectSave);
      saveButton.disabled = true;
      saveButton.textContent = "Saved ✓";
      const result = await postJson("/api/admin/prospects", { action: "save", prospect });
      renderSavedProspects(result.prospects || []);
    } catch {
      saveButton.disabled = false;
      saveButton.textContent = "Save prospect";
    }
    return;
  }
  const copyButton = event.target.closest("[data-prospect-copy]");
  if (copyButton) {
    const prospect = prospectCache.find((candidate) => candidate.id === copyButton.dataset.prospectCopy);
    if (!prospect) return;
    const pitch = pitchFor(prospect);
    try {
      await navigator.clipboard.writeText(`Subject: ${pitch.subject}\n\n${pitch.body}`);
      copyButton.textContent = "Copied ✓";
      setTimeout(() => { copyButton.textContent = "Copy pitch"; }, 1500);
    } catch { /* clipboard unavailable */ }
  }
});

document.addEventListener("change", async (event) => {
  const statusSelect = event.target.closest("[data-prospect-status]");
  if (!statusSelect) return;
  try {
    const result = await postJson("/api/admin/prospects", {
      action: "status",
      id: statusSelect.dataset.prospectStatus,
      status: statusSelect.value
    });
    renderSavedProspects(result.prospects || []);
  } catch { /* keep current view */ }
});

/* ---------- Review moderation ---------- */
const reviewListEl = document.querySelector("#admin-reviews");

function renderAdminReviews(reviews) {
  if (!reviewListEl) return;
  reviewListEl.innerHTML = (reviews || []).length ? reviews.map((review) => `
    <div class="admin-row">
      <strong>${"★".repeat(review.rating)}${"☆".repeat(5 - review.rating)} — ${escapeText(review.name)}${review.role ? ` · ${escapeText(review.role)}` : ""}</strong>
      <span>${escapeText(review.text)}</span>
      <small style="display:flex;gap:8px;align-items:center;flex-wrap:wrap">
        ${review.status === "approved" ? "✅ live on the site" : "⏳ pending"}
        ${review.status !== "approved" ? `<button type="button" data-review-act="approve" data-review-id="${escapeText(review.id)}" style="padding:7px 14px;font-size:12px">Approve</button>` : ""}
        <button type="button" data-review-act="delete" data-review-id="${escapeText(review.id)}" style="padding:7px 14px;font-size:12px;background:rgba(255,107,107,.15);color:#FF8585;border:1px solid rgba(255,107,107,.35);box-shadow:none">Delete</button>
      </small>
    </div>
  `).join("") : '<p class="launch-status">No reviews yet.</p>';
}

async function loadAdminReviews() {
  if (!adminToken() || !reviewListEl) return;
  try {
    const result = await getJson("/api/admin/reviews");
    renderAdminReviews(result.reviews || []);
  } catch { /* auth errors surface in the token panel */ }
}

document.addEventListener("click", async (event) => {
  const actButton = event.target.closest("[data-review-act]");
  if (!actButton) return;
  actButton.disabled = true;
  try {
    const result = await postJson("/api/admin/reviews", {
      action: actButton.dataset.reviewAct,
      id: actButton.dataset.reviewId
    });
    renderAdminReviews(result.reviews || []);
  } catch {
    actButton.disabled = false;
  }
});

/* ---------- Security sentinel panel ---------- */
const securityEls = {
  list: document.querySelector("#admin-security"),
  run: document.querySelector("#admin-run-security"),
  status: document.querySelector("#admin-security-status")
};

function renderSecuritySweeps(sweeps) {
  if (!securityEls.list) return;
  securityEls.list.innerHTML = (sweeps || []).length ? sweeps.slice(0, 5).map((sweep) => {
    const sev = { critical: "🔴", high: "🟠", info: "🔵" };
    const lines = [
      ...(sweep.findings || []).map((finding) => `${sev[finding.sev] || "🔵"} ${escapeText(finding.msg)}`),
      ...(sweep.passed || []).map((msg) => `✅ ${escapeText(msg)}`)
    ];
    const seriousCount = (sweep.findings || []).filter((finding) => finding.sev !== "info").length;
    return `<div class="admin-row">
      <strong>${seriousCount ? `${seriousCount} issue${seriousCount === 1 ? "" : "s"} found` : "All clear"} · ${sweep.at ? new Date(sweep.at).toLocaleString() : ""}</strong>
      <span style="white-space:pre-line">${lines.join("\n")}</span>
    </div>`;
  }).join("") : '<p class="launch-status">No sweeps recorded yet — the first runs ~15 seconds after each deploy.</p>';
}

async function loadSecuritySweeps() {
  if (!adminToken() || !securityEls.list) return;
  try {
    const result = await getJson("/api/admin/security");
    renderSecuritySweeps(result.sweeps || []);
  } catch { /* token panel reports auth problems */ }
}

securityEls.run?.addEventListener("click", async () => {
  if (!adminToken()) {
    securityEls.status.textContent = "Enter the admin token first.";
    securityEls.status.className = "launch-status launch-status-error";
    return;
  }
  securityEls.run.disabled = true;
  securityEls.status.textContent = "Sweeping…";
  securityEls.status.className = "launch-status";
  try {
    const result = await postJson("/api/admin/security");
    renderSecuritySweeps([result.sweep]);
    const serious = (result.sweep.findings || []).filter((finding) => finding.sev !== "info").length;
    securityEls.status.textContent = serious ? `${serious} issue${serious === 1 ? "" : "s"} found — details below.` : "All clear ✅";
    securityEls.status.className = `launch-status ${serious ? "launch-status-error" : "launch-status-ok"}`;
  } catch (error) {
    securityEls.status.textContent = error.message || "Sweep failed.";
    securityEls.status.className = "launch-status launch-status-error";
  } finally {
    securityEls.run.disabled = false;
  }
});


/* ---------- delete controls: email log + lead queue ---------- */
document.addEventListener("click", async (event) => {
  const emailDel = event.target.closest("[data-email-del]");
  if (emailDel) {
    emailDel.disabled = true;
    try {
      const result = await postJson("/api/admin/emails", { action: "delete", id: emailDel.dataset.emailDel });
      renderEmails(result);
    } catch { emailDel.disabled = false; }
    return;
  }
  const leadDel = event.target.closest("[data-lead-del]");
  if (leadDel) {
    leadDel.disabled = true;
    try {
      const result = await postJson("/api/admin/leads", { action: "delete", id: leadDel.dataset.leadDel });
      renderLeads(result.leads || []);
    } catch { leadDel.disabled = false; }
    return;
  }
  const clearBtn = event.target.closest("#admin-clear-emails");
  if (clearBtn) {
    if (!window.confirm("Delete the entire email log? This cannot be undone.")) return;
    clearBtn.disabled = true;
    try {
      const result = await postJson("/api/admin/emails", { action: "clear" });
      renderEmails(result);
    } finally { clearBtn.disabled = false; }
  }
});


/* ---------- delete controls: agent output ---------- */
document.addEventListener("click", async (event) => {
  const runDel = event.target.closest("[data-run-del]");
  if (runDel) {
    runDel.disabled = true;
    try {
      const result = await postJson("/api/admin/agent-runs", { action: "delete", id: runDel.dataset.runDel });
      renderRuns(result.runs || []);
    } catch { runDel.disabled = false; }
    return;
  }
  const clearRuns = event.target.closest("#admin-clear-runs");
  if (clearRuns) {
    if (!window.confirm("Delete all agent output? This cannot be undone.")) return;
    clearRuns.disabled = true;
    try {
      const result = await postJson("/api/admin/agent-runs", { action: "clear" });
      renderRuns(result.runs || []);
    } finally { clearRuns.disabled = false; }
  }
});


/* ---------- SpotVest AI agents panel ---------- */
const aiEls = {
  brief: document.querySelector("#ai-run-brief"),
  replies: document.querySelector("#ai-run-replies"),
  pitches: document.querySelector("#ai-run-pitches"),
  status: document.querySelector("#ai-status"),
  briefs: document.querySelector("#ai-briefs")
};

function renderBriefs(briefs) {
  if (!aiEls.briefs) return;
  aiEls.briefs.innerHTML = (briefs || []).length ? briefs.slice(0, 5).map((brief) => `
    <div class="admin-row">
      <strong>📊 Brief · ${brief.createdAt ? new Date(brief.createdAt).toLocaleString() : ""}</strong>
      <span style="white-space:pre-line">${escapeText(brief.text)}</span>
    </div>
  `).join("") : '<p class="launch-status">No briefs yet — generate one, or wait for the daily run (it emails you too).</p>';
}

async function loadBriefs() {
  if (!adminToken() || !aiEls.briefs) return;
  try {
    const result = await getJson("/api/admin/ai");
    renderBriefs(result.briefs || []);
  } catch { /* token panel reports auth issues */ }
}

function aiStatus(text, kind) {
  if (!aiEls.status) return;
  aiEls.status.textContent = text;
  aiEls.status.className = `launch-status ${kind || ""}`.trim();
}

async function runAgent(button, agent, after) {
  if (!adminToken()) { aiStatus("Enter the admin token first.", "launch-status-error"); return; }
  button.disabled = true;
  aiStatus("Agent working… (10-30 seconds)");
  try {
    const result = await postJson("/api/admin/ai", { agent });
    await after(result);
  } catch (error) {
    aiStatus(error.message || "Agent run failed.", "launch-status-error");
  } finally {
    button.disabled = false;
  }
}

aiEls.brief?.addEventListener("click", () => runAgent(aiEls.brief, "brief", async (result) => {
  renderBriefs([result.brief]);
  loadBriefs();
  aiStatus("Brief ready — also emailed to you.", "launch-status-ok");
}));
aiEls.replies?.addEventListener("click", () => runAgent(aiEls.replies, "lead-replies", async (result) => {
  const leadsResult = await getJson("/api/admin/leads");
  renderLeads(leadsResult.leads || []);
  aiStatus(result.drafted ? `${result.drafted} repl${result.drafted === 1 ? "y" : "ies"} drafted — see the Lead queue.` : "No leads waiting for a draft.", "launch-status-ok");
}));
aiEls.pitches?.addEventListener("click", () => runAgent(aiEls.pitches, "prospect-pitches", async (result) => {
  await loadProspects();
  aiStatus(result.drafted ? `${result.drafted} pitch${result.drafted === 1 ? "" : "es"} written — see Saved prospects.` : "No new prospects waiting (save some in Outreach first).", "launch-status-ok");
}));

document.addEventListener("click", async (event) => {
  const copyReply = event.target.closest("[data-copy-reply]");
  if (!copyReply) return;
  const lead = leadsCache.find((candidate) => candidate.id === copyReply.dataset.copyReply);
  if (!lead?.draftReply) return;
  try {
    await navigator.clipboard.writeText(lead.draftReply);
    copyReply.textContent = "Copied ✓";
    setTimeout(() => { copyReply.textContent = "Copy reply"; }, 1500);
  } catch { /* clipboard unavailable */ }
});
