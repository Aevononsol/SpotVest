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

function renderLeads(leads) {
  if (!adminEls.leads) return;
  adminEls.leads.innerHTML = leads.length ? leads.slice(0, 50).map((lead) => `
    <div class="admin-row">
      <strong>${escapeText(lead.name || lead.email || "New lead")}</strong>
      <span>${escapeText(lead.type || "lead")} · ${escapeText(lead.business || "No business")} · ${escapeText(lead.location || "No location")}</span>
      <small>${escapeText(lead.email || lead.phone || "No contact")} · ${lead.createdAt ? new Date(lead.createdAt).toLocaleString() : "No timestamp"}</small>
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
      <small>${email.createdAt ? new Date(email.createdAt).toLocaleString() : "No timestamp"}</small>
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
        <small>${run.createdAt ? new Date(run.createdAt).toLocaleString() : "No timestamp"}</small>
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
  const subject = "Evidence for your listings — SpotVest location reports";
  const body = [
    `Hi ${prospect.name} team,`,
    "",
    "I'm Maher, founder of SpotVest (https://spotvest.ai). We turn any NYC address into a location viability report for a retail or restaurant tenant — live MTA foot traffic, competitor density, demographics, and a clear 0-100 score with a verdict.",
    "",
    "Brokers use it to back a listing with evidence: \"this corner scores 78/100 for a coffee shop\" closes faster than a hunch. Reports are $9 each, with a 30-day unlimited pass for teams.",
    "",
    "I'd be glad to run a few free reports on your current listings so you can judge the quality yourself — just reply with an address or two.",
    "",
    "Best,",
    "Maher",
    "SpotVest — Know before you open",
    "https://spotvest.ai"
  ].join("\n");
  return { subject, body };
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
  if (!saved) {
    return `<div class="admin-row">
      <strong>${escapeText(prospect.name)}</strong>
      <span>${escapeText(meta)} · ${site}</span>
      <small><button type="button" data-prospect-save='${escapeText(JSON.stringify(prospect))}' style="padding:7px 14px;font-size:12px">Save prospect</button></small>
    </div>`;
  }
  const pitch = prospectPitch(prospect);
  const mailto = `mailto:?subject=${encodeURIComponent(pitch.subject)}&body=${encodeURIComponent(pitch.body)}`;
  return `<div class="admin-row">
    <strong>${escapeText(prospect.name)}</strong>
    <span>${escapeText(meta)} · ${site}</span>
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
    const pitch = prospectPitch(prospect);
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
