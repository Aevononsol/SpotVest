/* Dedicated sign-in / sign-up page. On success the account is mirrored to
   localStorage (the app's storedAccount()) and the visitor returns to the
   app — honoring ?intent=analyze so the analysis they tried to run opens
   immediately after auth. */
(function () {
  const forms = {
    login: document.querySelector("#auth-login"),
    signup: document.querySelector("#auth-signup"),
    reset: document.querySelector("#auth-reset")
  };
  const tabs = document.querySelectorAll("[data-auth-tab]");
  const statusEl = document.querySelector("#auth-status");
  const titleEl = document.querySelector("#auth-title");
  const subEl = document.querySelector("#auth-sub");

  const copy = {
    login: ["Sign in", "Access your reports and run new location analyses."],
    signup: ["Create your free account", "One free account unlocks the free analysis for any NYC location."],
    reset: ["Reset your password", "We'll email you a secure reset link."]
  };

  function setStatus(text, kind) {
    statusEl.textContent = text || "";
    statusEl.className = `status${kind ? ` ${kind}` : ""}`;
  }

  function show(view) {
    Object.entries(forms).forEach(([key, form]) => form.classList.toggle("show", key === view));
    tabs.forEach((tab) => tab.classList.toggle("on", tab.dataset.authTab === view));
    titleEl.textContent = copy[view][0];
    subEl.textContent = copy[view][1];
    setStatus("");
  }

  tabs.forEach((tab) => tab.addEventListener("click", () => show(tab.dataset.authTab)));
  document.querySelector("#forgot-link")?.addEventListener("click", () => show("reset"));
  document.querySelector("#back-to-login")?.addEventListener("click", () => show("login"));

  function finishAuth(result) {
    try { localStorage.setItem("areaIntelAccount", JSON.stringify(result.account)); } catch { /* cookie session still works */ }
    const intent = new URLSearchParams(window.location.search).get("intent");
    window.location.href = intent === "analyze" ? "/?start=analysis" : "/";
  }

  async function postJson(endpoint, payload) {
    const response = await fetch(endpoint, {
      method: "POST",
      credentials: "same-origin",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const result = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(result.error || "Request failed. Try again.");
    return result;
  }

  function payloadOf(form) {
    const data = {};
    new FormData(form).forEach((value, key) => { data[key] = String(value).trim(); });
    return data;
  }

  forms.login.addEventListener("submit", async (event) => {
    event.preventDefault();
    const button = forms.login.querySelector("button[type=submit]");
    button.disabled = true;
    setStatus("Signing in…");
    try {
      const result = await postJson("/api/login", payloadOf(forms.login));
      setStatus("Signed in ✓", "ok");
      finishAuth(result);
    } catch (error) {
      button.disabled = false;
      setStatus(error.message, "err");
    }
  });

  forms.signup.addEventListener("submit", async (event) => {
    event.preventDefault();
    const button = forms.signup.querySelector("button[type=submit]");
    button.disabled = true;
    setStatus("Creating your account…");
    try {
      const result = await postJson("/api/signup", payloadOf(forms.signup));
      if (result.account) {
        setStatus("Account created ✓", "ok");
        finishAuth(result);
      } else {
        // Non-enumerating signup response (email may already exist).
        button.disabled = false;
        setStatus(result.message || "Check your inbox to continue.", "ok");
        show("login");
      }
    } catch (error) {
      button.disabled = false;
      setStatus(error.message, "err");
    }
  });

  forms.reset.addEventListener("submit", async (event) => {
    event.preventDefault();
    const button = forms.reset.querySelector("button[type=submit]");
    button.disabled = true;
    setStatus("Sending…");
    try {
      const result = await postJson("/api/password-reset/request", payloadOf(forms.reset));
      setStatus(result.message || "If that email has an account, a reset link is on the way.", "ok");
    } catch (error) {
      setStatus(error.message, "err");
    } finally {
      button.disabled = false;
    }
  });

  // "Continue with Google" — only shown when the server has a client id.
  // The GIS script is loaded on demand so the page works fine without it.
  (async function initGoogle() {
    let clientId = null;
    try {
      const response = await fetch("/api/auth/config");
      clientId = (await response.json()).googleClientId;
    } catch { /* no Google button */ }
    if (!clientId) return;
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.onload = () => {
      try {
        window.google.accounts.id.initialize({
          client_id: clientId,
          callback: async (gsiResponse) => {
            setStatus("Verifying with Google…");
            try {
              const result = await postJson("/api/auth/google", { credential: gsiResponse.credential });
              setStatus("Signed in with Google ✓", "ok");
              finishAuth(result);
            } catch (error) {
              setStatus(error.message, "err");
            }
          }
        });
        const slot = document.querySelector("#google-slot");
        window.google.accounts.id.renderButton(slot, {
          theme: "filled_black",
          size: "large",
          shape: "pill",
          width: 320,
          text: "continue_with"
        });
        slot.classList.add("show");
        document.querySelector("#google-divider").classList.add("show");
      } catch { /* keep email-only auth */ }
    };
    document.head.appendChild(script);
  })();
})();
