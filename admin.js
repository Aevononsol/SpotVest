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
