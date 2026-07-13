import { supabase, SUPABASE_URL, SUPABASE_ANON_KEY } from "/dashboard/supabase-client.js";

const app = document.getElementById("app");
const userLabel = document.getElementById("userLabel");
const signOutBtn = document.getElementById("signOutBtn");

const RANGES = [
  { key: "week", label: "Week" },
  { key: "month", label: "Month" },
  { key: "year", label: "Year" },
  { key: "2y", label: "2 Years" },
];

let currentRole = null;
let currentAccountId = null;
let activePollInterval = null;

function clearActivePoll() {
  if (activePollInterval) {
    clearInterval(activePollInterval);
    activePollInterval = null;
  }
}

signOutBtn.addEventListener("click", async () => {
  clearActivePoll();
  await supabase.auth.signOut();
  window.location.href = "/dashboard/login.html";
});

function escapeHtml(str) {
  return String(str ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

function fmtDuration(seconds) {
  if (!seconds || !isFinite(seconds)) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.round(seconds % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}

function getBuckets(rangeKey) {
  const now = new Date();
  const buckets = [];
  if (rangeKey === "week" || rangeKey === "month") {
    const days = rangeKey === "week" ? 7 : 30;
    for (let i = days - 1; i >= 0; i--) {
      const start = new Date(now);
      start.setHours(0, 0, 0, 0);
      start.setDate(start.getDate() - i);
      const end = new Date(start);
      end.setDate(end.getDate() + 1);
      buckets.push({ label: `${start.getMonth() + 1}/${start.getDate()}`, start, end });
    }
  } else {
    const months = rangeKey === "year" ? 12 : 24;
    for (let i = months - 1; i >= 0; i--) {
      const start = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const end = new Date(start.getFullYear(), start.getMonth() + 1, 1);
      buckets.push({ label: start.toLocaleString("en-US", { month: "short" }), start, end });
    }
  }
  return buckets;
}

function bucketIndexFor(buckets, date) {
  for (let i = 0; i < buckets.length; i++) {
    if (date >= buckets[i].start && date < buckets[i].end) return i;
  }
  return -1;
}

function looksLikeAuthCallback() {
  return window.location.hash.includes("access_token") || window.location.search.includes("code=");
}

async function requireSession() {
  const { data } = await supabase.auth.getSession();
  if (data.session) return data.session;

  if (looksLikeAuthCallback()) {
    // Landed here straight from an emailed link — supabase-js processes the
    // token asynchronously, so wait briefly for it instead of bouncing early.
    const session = await new Promise((resolve) => {
      let settled = false;
      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((_event, s) => {
        if (s && !settled) {
          settled = true;
          clearTimeout(timer);
          subscription.unsubscribe();
          resolve(s);
        }
      });
      const timer = setTimeout(() => {
        if (!settled) {
          settled = true;
          subscription.unsubscribe();
          resolve(null);
        }
      }, 4000);
    });
    if (session) {
      history.replaceState(null, "", window.location.pathname);
      return session;
    }
    window.location.href = "/dashboard/login.html?expired=1";
    return null;
  }

  window.location.href = "/dashboard/login.html";
  return null;
}

async function loadAccount(userId) {
  const { data } = await supabase.from("accounts").select("id, role, display_name, email").eq("id", userId).maybeSingle();
  return data;
}

function trackerSnippetFor(siteId) {
  const src = new URL("/tracker.js", window.location.href).toString();
  return `<script>(function(d,s,src,site){var e=d.createElement(s);e.async=true;e.src=src+'?site='+site;d.head.appendChild(e);})(document,'script','${src}','${siteId}');<\/script>`;
}

function siteListMarkup(sites, opts) {
  const heading = opts.heading || "Your sites";
  const showSnippet = !!opts.showSnippet;
  const rows = sites
    .map(
      (s) => `
    <div class="site-card" data-site-id="${s.id}">
      <div>
        <div class="site-name">${escapeHtml(s.name)}</div>
        <div class="site-domain">${escapeHtml(s.domain)}${s.ownerLabel ? " · " + escapeHtml(s.ownerLabel) : ""}</div>
      </div>
      <div style="display:flex;align-items:center;gap:.6rem">
        ${showSnippet ? `<button type="button" class="btn-add-site" data-copy-site-id="${s.id}" style="margin:0">Copy snippet</button>` : ""}
        <span>&rsaquo;</span>
      </div>
    </div>`
    )
    .join("");
  return `<h2 style="font-size:1rem;margin:1.5rem 0 0">${heading}</h2><div class="site-list">${
    rows || '<p class="dash-empty">No sites yet.</p>'
  }</div>`;
}

function attachSiteListHandlers(container, sites, onSelect) {
  container.querySelectorAll(".site-card").forEach((card) => {
    card.addEventListener("click", () => {
      const site = sites.find((s) => s.id === card.dataset.siteId);
      onSelect(site);
    });
  });
  container.querySelectorAll("[data-copy-site-id]").forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      e.stopPropagation();
      const snippet = trackerSnippetFor(btn.dataset.copySiteId);
      try {
        await navigator.clipboard.writeText(snippet);
        const original = btn.textContent;
        btn.textContent = "Copied!";
        setTimeout(() => (btn.textContent = original), 1500);
      } catch {
        window.prompt("Copy this snippet:", snippet);
      }
    });
  });
}

async function renderMasterOverview() {
  clearActivePoll();
  app.innerHTML = `<div class="dash-header"><div><h1>All Sites</h1><p class="dash-sub">Master overview</p></div></div>
    <div id="masterSiteList"><p class="dash-empty">Loading sites...</p></div>
    <div class="dash-form" id="createAccountForm">
      <h2>Add a client</h2>
      <div id="createMsg" class="form-msg"></div>
      <label for="newEmail">Client email</label>
      <input type="email" id="newEmail" required>
      <label for="newDisplayName">Display name</label>
      <input type="text" id="newDisplayName" required>
      <div id="siteRows">
        <label style="margin-top:1rem">Site</label>
        <div class="site-row">
          <input type="text" placeholder="Site name" class="site-name-input">
          <input type="text" placeholder="Domain" class="site-domain-input">
        </div>
      </div>
      <button type="button" class="btn-add-site" id="addSiteRowBtn">+ Add another site</button>
      <br>
      <button type="button" class="btn btn-primary" id="createAccountBtn" style="margin-top:1rem">Create account</button>
    </div>`;

  const { data: sites } = await supabase
    .from("sites")
    .select("id, name, domain, accounts(display_name)")
    .order("created_at", { ascending: false });

  const enriched = (sites || []).map((s) => ({ ...s, ownerLabel: s.accounts ? s.accounts.display_name : "" }));
  const listEl = document.getElementById("masterSiteList");
  listEl.innerHTML = siteListMarkup(enriched, { heading: "", showSnippet: true });
  attachSiteListHandlers(listEl, enriched, (site) => renderSiteView(site, { backTo: renderMasterOverview }));

  document.getElementById("addSiteRowBtn").addEventListener("click", () => {
    const row = document.createElement("div");
    row.className = "site-row";
    row.innerHTML = `<input type="text" placeholder="Site name" class="site-name-input"><input type="text" placeholder="Domain" class="site-domain-input">`;
    document.getElementById("siteRows").appendChild(row);
  });

  document.getElementById("createAccountBtn").addEventListener("click", async (e) => {
    const btn = e.currentTarget;
    const msgEl = document.getElementById("createMsg");
    msgEl.textContent = "";
    msgEl.className = "form-msg";

    const email = document.getElementById("newEmail").value.trim();
    const displayName = document.getElementById("newDisplayName").value.trim();
    const siteRows = Array.from(document.querySelectorAll("#siteRows .site-row"))
      .map((row) => ({
        name: row.querySelector(".site-name-input").value.trim(),
        domain: row.querySelector(".site-domain-input").value.trim(),
      }))
      .filter((s) => s.name && s.domain);

    if (!email || !displayName || siteRows.length === 0) {
      msgEl.textContent = "Fill in email, display name, and at least one site.";
      msgEl.className = "form-msg err";
      return;
    }

    btn.disabled = true;
    btn.textContent = "Creating...";

    const { data: sessionData } = await supabase.auth.getSession();
    const token = sessionData.session.access_token;

    try {
      const res = await fetch(`${SUPABASE_URL}/functions/v1/admin-create-account`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          apikey: SUPABASE_ANON_KEY,
        },
        body: JSON.stringify({ email, display_name: displayName, sites: siteRows }),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Failed to create account");

      msgEl.textContent = `Invite sent to ${email}.`;
      msgEl.className = "form-msg ok";
      document.getElementById("newEmail").value = "";
      document.getElementById("newDisplayName").value = "";
      document.getElementById("siteRows").innerHTML = `<label style="margin-top:1rem">Site</label>
        <div class="site-row"><input type="text" placeholder="Site name" class="site-name-input"><input type="text" placeholder="Domain" class="site-domain-input"></div>`;
      renderMasterOverview();
    } catch (err) {
      msgEl.textContent = err.message;
      msgEl.className = "form-msg err";
    } finally {
      btn.disabled = false;
      btn.textContent = "Create account";
    }
  });
}

async function renderClientEntry(accountId) {
  clearActivePoll();
  const { data: sites } = await supabase.from("sites").select("id, name, domain").eq("account_id", accountId);

  if (!sites || sites.length === 0) {
    app.innerHTML = `<div class="dash-header"><h1>Dashboard</h1></div><p class="dash-empty">No sites are linked to your account yet. Contact 940Digital if this seems wrong.</p>`;
    return;
  }

  if (sites.length === 1) {
    renderSiteView(sites[0], { backTo: null });
    return;
  }

  app.innerHTML = `<div class="dash-header"><h1>Your Sites</h1></div><div id="clientSiteList"></div>`;
  const listEl = document.getElementById("clientSiteList");
  listEl.innerHTML = siteListMarkup(sites, { heading: "" });
  attachSiteListHandlers(listEl, sites, (site) => renderSiteView(site, { backTo: () => renderClientEntry(accountId) }));
}

async function renderSiteView(site, { backTo }) {
  clearActivePoll();
  let currentRangeKey = "month";
  const charts = {};

  app.innerHTML = `
    ${backTo ? `<a href="#" class="back-link" id="backLink">&larr; Back to all sites</a>` : ""}
    <div class="dash-header">
      <div><h1>${escapeHtml(site.name)}</h1><p class="dash-sub">${escapeHtml(site.domain)}</p></div>
      <div style="display:flex;align-items:center;gap:.6rem">
        <div class="range-tabs" id="rangeTabs">
          ${RANGES.map((r) => `<button data-range="${r.key}" class="${r.key === currentRangeKey ? "active" : ""}">${r.label}</button>`).join("")}
        </div>
        <button type="button" class="btn-add-site" id="refreshBtn" style="margin:0" title="Refresh now">&#8635;</button>
      </div>
    </div>
    <div class="metric-grid">
      <div class="metric-card">
        <h3>Visitors</h3>
        <div class="metric-value" id="mVisitors">-</div>
        <canvas id="cVisitors"></canvas>
      </div>
      <div class="metric-card">
        <h3>Avg. Time on Site</h3>
        <div class="metric-value" id="mDuration">-</div>
        <canvas id="cDuration"></canvas>
      </div>
      <div class="metric-card">
        <h3>Bounce Rate</h3>
        <div class="metric-value" id="mBounce">-</div>
        <canvas id="cBounce"></canvas>
      </div>
      <div class="metric-card">
        <h3>Lead Follow-Through</h3>
        <div class="metric-value" id="mLeads">-</div>
        <canvas id="cLeads"></canvas>
      </div>
      <div class="metric-card">
        <h3>Social Clicks</h3>
        <div class="metric-value" id="mSocial">-</div>
        <div class="social-breakdown" id="socialBreakdown"></div>
      </div>
    </div>`;

  if (backTo) {
    document.getElementById("backLink").addEventListener("click", (e) => {
      e.preventDefault();
      backTo();
    });
  }

  document.getElementById("rangeTabs").addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-range]");
    if (!btn) return;
    currentRangeKey = btn.dataset.range;
    document.querySelectorAll("#rangeTabs button").forEach((b) => b.classList.toggle("active", b === btn));
    loadAndRender();
  });

  document.getElementById("refreshBtn").addEventListener("click", () => loadAndRender());

  function lineChart(canvasId, buckets, values, color) {
    const ctx = document.getElementById(canvasId).getContext("2d");
    if (charts[canvasId]) charts[canvasId].destroy();
    charts[canvasId] = new Chart(ctx, {
      type: "line",
      data: {
        labels: buckets.map((b) => b.label),
        datasets: [
          {
            data: values,
            borderColor: color,
            backgroundColor: color + "22",
            fill: true,
            tension: 0.3,
            pointRadius: 0,
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false }, tooltip: { enabled: true } },
        scales: { x: { display: false }, y: { display: false, beginAtZero: true } },
      },
    });
  }

  async function loadAndRender() {
    const buckets = getBuckets(currentRangeKey);
    const since = buckets[0].start.toISOString();

    const [{ data: sessions }, { data: events }] = await Promise.all([
      supabase
        .from("sessions")
        .select("session_start, duration_seconds, is_bounce")
        .eq("site_id", site.id)
        .gte("session_start", since),
      supabase
        .from("events")
        .select("event_type, event_target, created_at")
        .eq("site_id", site.id)
        .gte("created_at", since),
    ]);

    const sess = sessions || [];
    const evts = events || [];

    const visitorBuckets = new Array(buckets.length).fill(0);
    const durationSums = new Array(buckets.length).fill(0);
    const durationCounts = new Array(buckets.length).fill(0);
    const bounceCounts = new Array(buckets.length).fill(0);

    sess.forEach((s) => {
      const idx = bucketIndexFor(buckets, new Date(s.session_start));
      if (idx === -1) return;
      visitorBuckets[idx] += 1;
      if (typeof s.duration_seconds === "number") {
        durationSums[idx] += s.duration_seconds;
        durationCounts[idx] += 1;
      }
      if (s.is_bounce) bounceCounts[idx] += 1;
    });

    const avgDurationBuckets = buckets.map((_, i) => (durationCounts[i] ? durationSums[i] / durationCounts[i] : 0));
    const bounceRateBuckets = buckets.map((_, i) => (visitorBuckets[i] ? (bounceCounts[i] / visitorBuckets[i]) * 100 : 0));

    const leadBuckets = new Array(buckets.length).fill(0);
    const socialCounts = {};
    let totalLeads = 0;
    let totalSocial = 0;

    evts.forEach((e) => {
      const idx = bucketIndexFor(buckets, new Date(e.created_at));
      if (e.event_type === "lead_submit") {
        totalLeads += 1;
        if (idx !== -1) leadBuckets[idx] += 1;
      } else if (e.event_type === "social_click") {
        totalSocial += 1;
        const platform = e.event_target || "other";
        socialCounts[platform] = (socialCounts[platform] || 0) + 1;
      }
    });

    const totalSessions = sess.length;
    const totalDuration = sess.reduce((sum, s) => sum + (s.duration_seconds || 0), 0);
    const durationCount = sess.filter((s) => typeof s.duration_seconds === "number").length;
    const avgDuration = durationCount ? totalDuration / durationCount : 0;
    const bounceCount = sess.filter((s) => s.is_bounce).length;
    const bounceRate = totalSessions ? (bounceCount / totalSessions) * 100 : 0;
    const leadRate = totalSessions ? (totalLeads / totalSessions) * 100 : 0;

    document.getElementById("mVisitors").textContent = totalSessions.toLocaleString();
    document.getElementById("mDuration").textContent = fmtDuration(avgDuration);
    document.getElementById("mBounce").textContent = `${bounceRate.toFixed(0)}%`;
    document.getElementById("mLeads").innerHTML = `${totalLeads} <small>(${leadRate.toFixed(0)}%)</small>`;
    document.getElementById("mSocial").textContent = totalSocial.toLocaleString();

    const socialEl = document.getElementById("socialBreakdown");
    const platforms = Object.keys(socialCounts).sort((a, b) => socialCounts[b] - socialCounts[a]);
    socialEl.innerHTML = platforms.length
      ? platforms.map((p) => `<div class="social-row"><span>${escapeHtml(p)}</span><span>${socialCounts[p]}</span></div>`).join("")
      : '<p class="dash-empty" style="padding:0.5rem 0">No social clicks yet.</p>';

    lineChart("cVisitors", buckets, visitorBuckets, "#3194E0");
    lineChart("cDuration", buckets, avgDurationBuckets, "#8A8272");
    lineChart("cBounce", buckets, bounceRateBuckets, "#DC2626");
    lineChart("cLeads", buckets, leadBuckets, "#16A34A");
  }

  loadAndRender();
  clearActivePoll();
  activePollInterval = setInterval(loadAndRender, 45000);
}

async function init() {
  const session = await requireSession();
  if (!session) return;

  const account = await loadAccount(session.user.id);
  if (!account) {
    await supabase.auth.signOut();
    window.location.href = "/dashboard/login.html";
    return;
  }

  currentRole = account.role;
  currentAccountId = account.id;
  userLabel.textContent = account.display_name + (account.role === "master" ? " · Master" : "");

  if (account.role === "master") {
    renderMasterOverview();
  } else {
    renderClientEntry(account.id);
  }
}

init();
