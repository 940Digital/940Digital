import { supabase, SUPABASE_URL, SUPABASE_ANON_KEY } from "/dashboard/supabase-client.js";
// build marker: caching/live-refresh test push

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

const STAT_DEFS = {
  visitors: { label: "Visitors", group: "Traffic", color: "#3194E0", description: "Real visits from actual people. Bots and crawlers are counted separately, not included here.", inDetails: true },
  bots: { label: "Bots", group: "Traffic", color: "#7B7E85", description: "Automated traffic — search engine crawlers, scanners, scripts. Not real customers.", inDetails: true },
  avgDuration: { label: "Avg. Time on Site", group: "Engagement", color: "#8A8272", description: "How long the average real visitor stays before leaving.", inDetails: false },
  bounceRate: { label: "Bounce Rate", group: "Engagement", color: "#DC2626", description: "The share of visits where someone left without clicking anything or looking at a second page.", inDetails: false },
  leads: { label: "Lead Follow-Through", group: "Leads & Social", color: "#16A34A", description: "Form submissions, phone taps, and email clicks — real interest, not just a page view.", inDetails: true },
  social: { label: "Social Clicks", group: "Leads & Social", color: "#A855F7", description: "Clicks on your Instagram, Facebook, and other social links.", inDetails: true },
};

function fmtTime(iso) {
  if (!iso) return "—";
  return new Date(iso).toLocaleString(undefined, { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" });
}

function leadLabel(target) {
  if (target === "phone_click") return "Phone tap";
  if (target === "email_click") return "Email click";
  if (!target || target === "form") return "Form submission";
  return "Form: " + target;
}

function computeDashboardData(buckets, sess, evts) {
  const visitors = sess.filter((s) => !s.is_bot);
  const bots = sess.filter((s) => s.is_bot);
  const leads = evts.filter((e) => e.event_type === "lead_submit");
  const social = evts.filter((e) => e.event_type === "social_click");

  function countSeries(items, dateField) {
    const arr = new Array(buckets.length).fill(0);
    items.forEach((it) => {
      const idx = bucketIndexFor(buckets, new Date(it[dateField]));
      if (idx !== -1) arr[idx] += 1;
    });
    return arr;
  }

  const visitorsSeries = countSeries(visitors, "session_start");
  const botsSeries = countSeries(bots, "session_start");
  const leadsSeries = countSeries(leads, "created_at");
  const socialSeries = countSeries(social, "created_at");

  const durationSums = new Array(buckets.length).fill(0);
  const durationCounts = new Array(buckets.length).fill(0);
  const bounceCounts = new Array(buckets.length).fill(0);
  visitors.forEach((s) => {
    const idx = bucketIndexFor(buckets, new Date(s.session_start));
    if (idx === -1) return;
    if (typeof s.duration_seconds === "number") {
      durationSums[idx] += s.duration_seconds;
      durationCounts[idx] += 1;
    }
    if (s.is_bounce) bounceCounts[idx] += 1;
  });
  const avgDurationSeries = buckets.map((_, i) => (durationCounts[i] ? durationSums[i] / durationCounts[i] : 0));
  const bounceRateSeries = buckets.map((_, i) => (visitorsSeries[i] ? (bounceCounts[i] / visitorsSeries[i]) * 100 : 0));

  const totalVisitors = visitors.length;
  const totalDuration = visitors.reduce((sum, s) => sum + (s.duration_seconds || 0), 0);
  const durationCount = visitors.filter((s) => typeof s.duration_seconds === "number").length;
  const avgDuration = durationCount ? totalDuration / durationCount : 0;
  const bounceCount = visitors.filter((s) => s.is_bounce).length;
  const bounceRate = totalVisitors ? (bounceCount / totalVisitors) * 100 : 0;
  const leadRate = totalVisitors ? (leads.length / totalVisitors) * 100 : 0;

  const socialCounts = {};
  social.forEach((e) => {
    const p = e.event_target || "other";
    socialCounts[p] = (socialCounts[p] || 0) + 1;
  });

  return {
    buckets,
    raw: { visitors, bots, leads, social },
    series: { visitors: visitorsSeries, bots: botsSeries, avgDuration: avgDurationSeries, bounceRate: bounceRateSeries, leads: leadsSeries, social: socialSeries },
    totals: { visitors: totalVisitors, bots: bots.length, avgDuration, bounceRate, leads: leads.length, leadRate, social: social.length, socialCounts },
  };
}

async function renderSiteView(site, { backTo }) {
  clearActivePoll();
  let currentRangeKey = "month";
  let activeView = "summary";
  let activeDetailStat = "visitors";
  const checkedStats = new Set(["visitors", "bots"]);
  const charts = {};
  let graphChart = null;
  let currentData = null;

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
    <p class="dash-sub" id="lastUpdated" style="margin:-.5rem 0 1rem"></p>
    <div id="dashErrorBanner" style="display:none;background:#FEE2E2;color:#991B1B;padding:.6rem 1rem;border-radius:var(--radius);font-size:.85rem;margin-bottom:1rem"></div>
    <div class="view-tabs" id="viewTabs">
      <button data-view="summary" class="active">Summary</button>
      <button data-view="graphs">Graphs</button>
      <button data-view="details">Details</button>
    </div>
    <div id="tabBody"></div>`;

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

  document.getElementById("viewTabs").addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-view]");
    if (!btn) return;
    activeView = btn.dataset.view;
    document.querySelectorAll("#viewTabs button").forEach((b) => b.classList.toggle("active", b === btn));
    renderActiveTab();
  });

  function lineChart(canvasId, buckets, values, color) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (charts[canvasId]) charts[canvasId].destroy();
    charts[canvasId] = new Chart(ctx, {
      type: "line",
      data: {
        labels: buckets.map((b) => b.label),
        datasets: [{ data: values, borderColor: color, backgroundColor: color + "22", fill: true, tension: 0.3, pointRadius: 0, borderWidth: 2 }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false }, tooltip: { enabled: true } },
        scales: { x: { display: false }, y: { display: false, beginAtZero: true } },
      },
    });
  }

  function renderSummaryTab() {
    const { totals } = currentData;
    const platforms = Object.keys(totals.socialCounts).sort((a, b) => totals.socialCounts[b] - totals.socialCounts[a]);
    document.getElementById("tabBody").innerHTML = `
      <div class="metric-grid">
        <div class="metric-card"><h3>Visitors</h3><div class="metric-value">${totals.visitors.toLocaleString()}</div><canvas id="cVisitors"></canvas></div>
        <div class="metric-card"><h3>Bots</h3><div class="metric-value">${totals.bots.toLocaleString()}</div><canvas id="cBots"></canvas></div>
        <div class="metric-card"><h3>Avg. Time on Site</h3><div class="metric-value">${fmtDuration(totals.avgDuration)}</div><canvas id="cDuration"></canvas></div>
        <div class="metric-card"><h3>Bounce Rate</h3><div class="metric-value">${totals.bounceRate.toFixed(0)}%</div><canvas id="cBounce"></canvas></div>
        <div class="metric-card"><h3>Lead Follow-Through</h3><div class="metric-value">${totals.leads} <small>(${totals.leadRate.toFixed(0)}%)</small></div><canvas id="cLeads"></canvas></div>
        <div class="metric-card">
          <h3>Social Clicks</h3>
          <div class="metric-value">${totals.social.toLocaleString()}</div>
          <div class="social-breakdown">${
            platforms.length
              ? platforms.map((p) => `<div class="social-row"><span>${escapeHtml(p)}</span><span>${totals.socialCounts[p]}</span></div>`).join("")
              : '<p class="dash-empty" style="padding:0.5rem 0">No social clicks yet.</p>'
          }</div>
        </div>
      </div>`;

    lineChart("cVisitors", currentData.buckets, currentData.series.visitors, STAT_DEFS.visitors.color);
    lineChart("cBots", currentData.buckets, currentData.series.bots, STAT_DEFS.bots.color);
    lineChart("cDuration", currentData.buckets, currentData.series.avgDuration, STAT_DEFS.avgDuration.color);
    lineChart("cBounce", currentData.buckets, currentData.series.bounceRate, STAT_DEFS.bounceRate.color);
    lineChart("cLeads", currentData.buckets, currentData.series.leads, STAT_DEFS.leads.color);
  }

  function renderGraphChart() {
    const canvas = document.getElementById("cGraph");
    const emptyEl = document.getElementById("graphEmpty");
    if (!canvas) return;
    const activeKeys = Object.keys(STAT_DEFS).filter((k) => checkedStats.has(k));
    if (graphChart) {
      graphChart.destroy();
      graphChart = null;
    }
    if (!activeKeys.length) {
      canvas.style.display = "none";
      if (emptyEl) emptyEl.style.display = "block";
      return;
    }
    canvas.style.display = "block";
    if (emptyEl) emptyEl.style.display = "none";
    graphChart = new Chart(canvas.getContext("2d"), {
      type: "line",
      data: {
        labels: currentData.buckets.map((b) => b.label),
        datasets: activeKeys.map((key) => ({
          label: STAT_DEFS[key].label,
          data: currentData.series[key],
          borderColor: STAT_DEFS[key].color,
          backgroundColor: STAT_DEFS[key].color + "22",
          fill: false,
          tension: 0.3,
          pointRadius: 0,
          borderWidth: 2,
        })),
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: true, position: "bottom", labels: { boxWidth: 10, font: { size: 11 } } } },
        scales: { x: { display: true, ticks: { font: { size: 10 } } }, y: { display: true, beginAtZero: true } },
      },
    });
  }

  function renderGraphsTab() {
    const groups = {};
    Object.entries(STAT_DEFS).forEach(([key, def]) => {
      (groups[def.group] ||= []).push(key);
    });
    const groupsHtml = Object.entries(groups)
      .map(
        ([group, keys]) => `
      <div class="stat-group">
        <div class="stat-group-label">${escapeHtml(group)}</div>
        ${keys
          .map((key) => {
            const def = STAT_DEFS[key];
            return `
          <div class="stat-toggle-item">
            <div class="stat-toggle-row">
              <label><input type="checkbox" data-stat="${key}" ${checkedStats.has(key) ? "checked" : ""}><span class="stat-swatch" style="background:${def.color}"></span>${escapeHtml(def.label)}</label>
              <button type="button" class="stat-info-btn" data-info="${key}" aria-label="What is ${escapeHtml(def.label)}?">i</button>
            </div>
            <p class="stat-desc" id="desc-${key}">${escapeHtml(def.description)}</p>
          </div>`;
          })
          .join("")}
      </div>`
      )
      .join("");

    document.getElementById("tabBody").innerHTML = `
      <div class="graphs-layout">
        <div>${groupsHtml}</div>
        <div class="graph-panel">
          <canvas id="cGraph"></canvas>
          <p class="graph-empty" id="graphEmpty" style="display:none">Check a stat on the left to see it charted here.</p>
        </div>
      </div>`;

    document.querySelectorAll('#tabBody input[type="checkbox"][data-stat]').forEach((cb) => {
      cb.addEventListener("change", () => {
        if (cb.checked) checkedStats.add(cb.dataset.stat);
        else checkedStats.delete(cb.dataset.stat);
        renderGraphChart();
      });
    });
    document.querySelectorAll("#tabBody .stat-info-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        document.getElementById("desc-" + btn.dataset.info).classList.toggle("show");
      });
    });

    renderGraphChart();
  }

  const DETAIL_COLUMNS = {
    visitors: { headers: ["Time", "Duration", "Bounced?", "Referrer"], row: (r) => [fmtTime(r.session_start), fmtDuration(r.duration_seconds), r.is_bounce ? "Yes" : "No", r.referrer || "Direct"] },
    bots: { headers: ["Time", "Referrer", "User Agent"], row: (r) => [fmtTime(r.session_start), r.referrer || "—", (r.user_agent || "—").slice(0, 60)] },
    leads: { headers: ["Time", "Type"], row: (r) => [fmtTime(r.created_at), leadLabel(r.event_target)] },
    social: { headers: ["Time", "Platform"], row: (r) => [fmtTime(r.created_at), r.event_target] },
  };

  function renderDetailsTab() {
    const selectorHtml = Object.entries(STAT_DEFS)
      .filter(([, def]) => def.inDetails)
      .map(([key, def]) => `<button type="button" data-detail="${key}" class="${key === activeDetailStat ? "active" : ""}">${escapeHtml(def.label)}</button>`)
      .join("");

    const col = DETAIL_COLUMNS[activeDetailStat];
    const dateField = activeDetailStat === "visitors" || activeDetailStat === "bots" ? "session_start" : "created_at";
    const records = (currentData.raw[activeDetailStat] || [])
      .slice()
      .sort((a, b) => new Date(b[dateField]) - new Date(a[dateField]))
      .slice(0, 20);

    const tableHtml = records.length
      ? `<div class="detail-table-wrap"><table class="detail-table"><thead><tr>${col.headers
          .map((h) => `<th>${escapeHtml(h)}</th>`)
          .join("")}</tr></thead><tbody>${records
          .map((r) => `<tr>${col.row(r).map((c) => `<td>${escapeHtml(String(c))}</td>`).join("")}</tr>`)
          .join("")}</tbody></table></div>`
      : `<p class="dash-empty">No ${escapeHtml(STAT_DEFS[activeDetailStat].label.toLowerCase())} yet in this range.</p>`;

    document.getElementById("tabBody").innerHTML = `<div class="details-selector">${selectorHtml}</div>${tableHtml}`;

    document.querySelectorAll("#tabBody [data-detail]").forEach((btn) => {
      btn.addEventListener("click", () => {
        activeDetailStat = btn.dataset.detail;
        renderDetailsTab();
      });
    });
  }

  function renderActiveTab() {
    if (!currentData) return;
    if (activeView === "summary") renderSummaryTab();
    else if (activeView === "graphs") renderGraphsTab();
    else renderDetailsTab();
  }

  async function loadAndRender() {
    const buckets = getBuckets(currentRangeKey);
    const since = buckets[0].start.toISOString();
    const errorBanner = document.getElementById("dashErrorBanner");
    const lastUpdatedEl = document.getElementById("lastUpdated");

    let sessionsResult, eventsResult;
    try {
      [sessionsResult, eventsResult] = await Promise.all([
        supabase
          .from("sessions")
          .select("session_start, duration_seconds, is_bounce, referrer, user_agent, is_bot")
          .eq("site_id", site.id)
          .gte("session_start", since),
        supabase
          .from("events")
          .select("event_type, event_target, created_at")
          .eq("site_id", site.id)
          .gte("created_at", since),
      ]);
    } catch (err) {
      console.error("Dashboard fetch threw:", err);
      errorBanner.textContent = `Couldn't refresh: ${err.message || "network error"}. Retrying automatically.`;
      errorBanner.style.display = "block";
      return;
    }

    if (sessionsResult.error || eventsResult.error) {
      const err = sessionsResult.error || eventsResult.error;
      console.error("Dashboard query error:", err);
      errorBanner.textContent = `Couldn't refresh: ${err.message} (${err.code || "no code"}). Retrying automatically.`;
      errorBanner.style.display = "block";
      return;
    }

    errorBanner.style.display = "none";
    if (lastUpdatedEl) lastUpdatedEl.textContent = "Last updated " + new Date().toLocaleTimeString();

    currentData = computeDashboardData(buckets, sessionsResult.data || [], eventsResult.data || []);
    renderActiveTab();
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
