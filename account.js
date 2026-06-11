/* Dedicated sign-in / sign-up page. On success the account is mirrored to
   localStorage (the app's storedAccount()) and the visitor returns to the
   app — honoring ?intent=analyze so the analysis they tried to run opens
   immediately after auth. */
(function () {
  const forms = {
    login: document.querySelector("#auth-login"),
    signup: document.querySelector("#auth-signup"),
    reset: document.querySelector("#auth-reset"),
    resetComplete: document.querySelector("#auth-reset-complete")
  };
  const tabs = document.querySelectorAll("[data-auth-tab]");
  const statusEl = document.querySelector("#auth-status");
  const titleEl = document.querySelector("#auth-title");
  const subEl = document.querySelector("#auth-sub");

  const copy = {
    login: ["Sign in", "Access your reports and run new location analyses."],
    signup: ["Create your free account", "One free account unlocks the free analysis for any NYC location."],
    reset: ["Reset your password", "We'll email you a secure reset link."],
    resetComplete: ["Choose a new password", "Set the new password for your account."]
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
      // Verification is enforced: signing in works, but the app stays closed
      // until the emailed link has been clicked.
      if (result.account && !result.account.emailVerified) {
        button.disabled = false;
        resendButton.hidden = false;
        setStatus("Almost there — open the verification link we emailed you, then sign in again.", "err");
        return;
      }
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
      button.disabled = false;
      show("login");
      if (result.account) {
        resendButton.hidden = false;
        setStatus(`Account created ✓ — we emailed a verification link to ${result.account.email}. Open it, then sign in here.`, "ok");
      } else {
        // Non-enumerating signup response (email may already exist).
        setStatus(result.message || "Check your inbox to continue.", "ok");
      }
    } catch (error) {
      button.disabled = false;
      setStatus(error.message, "err");
    }
  });

  const resendButton = document.querySelector("#auth-resend-verification");
  resendButton?.addEventListener("click", async () => {
    resendButton.disabled = true;
    setStatus("Sending a fresh verification link…");
    try {
      const response = await fetch("/api/resend-verification", { method: "POST", credentials: "same-origin" });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error || "Could not resend. Sign in first, then try again.");
      setStatus(result.message || "Verification email sent — check your inbox.", "ok");
    } catch (error) {
      setStatus(error.message, "err");
    } finally {
      resendButton.disabled = false;
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

  // Email-link landings: /verify-email and /reset-password serve this page,
  // so the links from our emails resolve on the dedicated auth screen
  // instead of the marketing front page.
  const linkToken = new URLSearchParams(window.location.search).get("token");
  const pagePath = window.location.pathname;

  if (pagePath.endsWith("/verify-email") && linkToken) {
    show("login");
    setStatus("Verifying your email…");
    (async () => {
      try {
        const response = await fetch(`/api/verify-email?token=${encodeURIComponent(linkToken)}`, { credentials: "same-origin" });
        const result = await response.json().catch(() => ({}));
        if (!response.ok) throw new Error(result.error || "Verification failed.");
        try { localStorage.setItem("areaIntelAccount", JSON.stringify(result.account)); } catch { /* ignore */ }
        // If the signup session is still alive in this browser, skip the
        // extra sign-in and go straight into the app.
        const me = await fetch("/api/me", { credentials: "same-origin" });
        if (me.ok) {
          setStatus("Email verified ✓ — taking you to SpotVest…", "ok");
          window.location.href = "/?start=analysis";
          return;
        }
        setStatus("Email verified ✓ — sign in to continue.", "ok");
      } catch (error) {
        setStatus(error.message, "err");
        resendButton.hidden = false;
      }
    })();
  } else if (pagePath.endsWith("/reset-password") && linkToken) {
    show("resetComplete");
  }

  forms.resetComplete.addEventListener("submit", async (event) => {
    event.preventDefault();
    const button = forms.resetComplete.querySelector("button[type=submit]");
    button.disabled = true;
    setStatus("Updating your password…");
    try {
      const result = await postJson("/api/password-reset/complete", { token: linkToken, ...payloadOf(forms.resetComplete) });
      show("login");
      setStatus(result.message || "Password updated ✓ — sign in with your new password.", "ok");
    } catch (error) {
      button.disabled = false;
      setStatus(error.message, "err");
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
