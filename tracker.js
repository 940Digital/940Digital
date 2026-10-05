(function () {
  "use strict";

  // Safe no-op so a site calling window.t940.track(...) never throws, even when
  // tracking is switched off (Do Not Track) or the rest of this script bails.
  window.t940 = window.t940 || { track: function () {} };

  if (navigator.doNotTrack === "1" || window.doNotTrack === "1" || navigator.msDoNotTrack === "1") {
    return;
  }

  var COLLECT_URL = "https://www.940digital.com/api/collect";

  function getScriptEl() {
    var script = document.currentScript;
    if (!script) {
      var scripts = document.getElementsByTagName("script");
      for (var i = 0; i < scripts.length; i++) {
        if (scripts[i].src && scripts[i].src.indexOf("tracker.js") !== -1) {
          script = scripts[i];
          break;
        }
      }
    }
    return script;
  }

  var scriptEl = getScriptEl();
  if (!scriptEl || !scriptEl.src) return;

  function paramFromScript(name) {
    var match = scriptEl.src.match(new RegExp("[?&]" + name + "=([^&]+)"));
    return match ? decodeURIComponent(match[1]) : null;
  }

  var siteId = paramFromScript("site");
  if (!siteId) return;

  // Optional page tag (e.g. ?tag=qr_business_card) fires a page_view
  // event so a specific landing page (QR code, campaign link, etc.) can be
  // identified in the dashboard without changing behavior for untagged pages.
  var pageTag = paramFromScript("tag");

  function post(payload) {
    var body = JSON.stringify(payload);
    if (navigator.sendBeacon) {
      var blob = new Blob([body], { type: "application/json" });
      navigator.sendBeacon(COLLECT_URL, blob);
    } else {
      fetch(COLLECT_URL, { method: "POST", body: body, headers: { "Content-Type": "application/json" }, keepalive: true }).catch(function () {});
    }
  }

  // Everything after session_start waits until the server has actually created
  // the session. Beacons race each other, and a pageview that lands first is
  // rejected as belonging to an unknown session.
  var ready = false;
  var queue = [];

  function send(payload) {
    if (!ready) {
      queue.push(payload);
      return;
    }
    post(payload);
  }

  function markReady() {
    if (ready) return;
    ready = true;
    var pending = queue;
    queue = [];
    for (var i = 0; i < pending.length; i++) post(pending[i]);
  }

  function uuid() {
    if (crypto.randomUUID) return crypto.randomUUID();
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
      var r = (Math.random() * 16) | 0;
      var v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  var STORAGE_KEY = "_940t_session";
  var VISITOR_KEY = "_940t_vid";
  var state;
  try {
    var raw = sessionStorage.getItem(STORAGE_KEY);
    state = raw ? JSON.parse(raw) : null;
  } catch (e) {
    state = null;
  }

  var isNewSession = false;
  if (!state) {
    isNewSession = true;
    state = {
      id: uuid(),
      start: Date.now(),
      pageCount: 1,
      interacted: false,
    };
  } else {
    state.pageCount += 1;
  }

  function persist() {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {}
  }
  persist();

  // Anonymous first-party visitor id, used only to tell new visitors from
  // returning ones. A random UUID in this browser's own storage: no cookie, no
  // fingerprinting, and it never leaves the first-party endpoint.
  function getVisitorId() {
    try {
      var id = localStorage.getItem(VISITOR_KEY);
      if (!id) {
        id = uuid();
        localStorage.setItem(VISITOR_KEY, id);
      }
      return id;
    } catch (e) {
      return null;
    }
  }

  function queryParam(name) {
    try {
      return new URLSearchParams(location.search).get(name);
    } catch (e) {
      return null;
    }
  }

  function clickIdType() {
    var ids = ["gclid", "msclkid", "fbclid", "ttclid", "li_fat_id"];
    for (var i = 0; i < ids.length; i++) {
      if (queryParam(ids[i])) return ids[i];
    }
    return null;
  }

  if (isNewSession) {
    var tz = null;
    try {
      tz = Intl.DateTimeFormat().resolvedOptions().timeZone || null;
    } catch (e) {}
    var startPayload = {
      action: "session_start",
      site_id: siteId,
      session_id: state.id,
      referrer: document.referrer || null,
      webdriver: navigator.webdriver === true,
      visitor_id: getVisitorId(),
      landing_page: location.pathname,
      utm_source: queryParam("utm_source"),
      utm_medium: queryParam("utm_medium"),
      utm_campaign: queryParam("utm_campaign"),
      utm_term: queryParam("utm_term"),
      utm_content: queryParam("utm_content"),
      click_id_type: clickIdType(),
      screen_w: window.screen ? window.screen.width : null,
      screen_h: window.screen ? window.screen.height : null,
      language: navigator.language || null,
      timezone: tz,
    };
    var startBody = JSON.stringify(startPayload);
    if (window.fetch) {
      fetch(COLLECT_URL, { method: "POST", body: startBody, headers: { "Content-Type": "application/json" }, keepalive: true })
        .then(markReady, markReady);
      setTimeout(markReady, 3000);
    } else {
      post(startPayload);
      setTimeout(markReady, 800);
    }
  } else {
    markReady();
  }

  function markInteracted() {
    if (!state.interacted) {
      state.interacted = true;
      persist();
    }
  }

  // Only the original lead and social events count as an interaction. The newer
  // passive events (outbound clicks, downloads, scrolling and so on) are
  // recorded but do not change what counts as a bounce, so existing bounce and
  // follow-through numbers stay comparable with the history.
  var COUNTS_AS_INTERACTION = { lead_submit: true, social_click: true };

  function fireEvent(eventType, eventTarget, extra) {
    var payload = {
      action: "event",
      site_id: siteId,
      session_id: state.id,
      event_type: eventType,
      event_target: eventTarget,
      path: location.pathname,
    };
    if (extra) {
      if (extra.value !== undefined) payload.event_value = extra.value;
      if (extra.props) payload.event_props = extra.props;
    }
    send(payload);
    if (COUNTS_AS_INTERACTION[eventType]) markInteracted();
  }

  // Page views don't count as "interacted". A glance-and-leave scan of a
  // tagged page (e.g. a QR code) should still be able to register as a bounce.
  if (pageTag) {
    send({
      action: "event",
      site_id: siteId,
      session_id: state.id,
      event_type: "page_view",
      event_target: pageTag,
    });
  }

  /* ---------------- Per-page tracking ---------------- */

  var pv = null; // the pageview currently on screen
  var lastPath = null;
  try {
    var prevStored = sessionStorage.getItem("_940t_lastpath");
    lastPath = prevStored || null;
  } catch (e) {}

  var vitals = { lcp: null, cls: null, inp: null, fcp: null, ttfb: null };
  var hardLoadPending = true; // vitals belong to the first, full page load only

  function pageHeight() {
    var d = document.documentElement;
    var b = document.body;
    return Math.max(d ? d.scrollHeight : 0, b ? b.scrollHeight : 0);
  }

  function currentScrollPct() {
    var h = pageHeight();
    var vh = window.innerHeight || 0;
    if (!h || h <= vh + 8) return 100;
    var seen = (window.pageYOffset || (document.documentElement && document.documentElement.scrollTop) || 0) + vh;
    return Math.max(0, Math.min(100, Math.round((seen / h) * 100)));
  }

  function newPageview(path, prevPath) {
    return {
      id: uuid(),
      path: path,
      visibleSince: document.visibilityState === "visible" ? Date.now() : null,
      engagedMs: 0,
      maxScroll: currentScrollPct(),
      useVitals: hardLoadPending,
      errors: 0,
      formsStarted: {},
      mediaStarted: {},
    };
  }

  function titleLooksLike404() {
    return /(^|\W)404(\W|$)|page not found|not found/i.test(document.title || "");
  }

  var SEARCH_PARAMS = ["q", "s", "search", "query", "keyword", "k"];

  function startPageview(path, prevPath) {
    pv = newPageview(path, prevPath);
    try {
      sessionStorage.setItem("_940t_lastpath", path);
    } catch (e) {}
    send({
      action: "pageview",
      site_id: siteId,
      session_id: state.id,
      pv_id: pv.id,
      path: path,
      title: (document.title || "").slice(0, 200),
      prev_path: prevPath || null,
    });
    lastPath = path;

    for (var i = 0; i < SEARCH_PARAMS.length; i++) {
      var term = queryParam(SEARCH_PARAMS[i]);
      if (term && term.trim()) {
        fireEvent("site_search", term.trim().slice(0, 100));
        break;
      }
    }
    if (titleLooksLike404()) fireEvent("not_found", path.slice(0, 100));
  }

  function finishPageview() {
    if (!pv) return;
    if (pv.visibleSince !== null) {
      pv.engagedMs += Date.now() - pv.visibleSince;
      pv.visibleSince = document.visibilityState === "visible" ? Date.now() : null;
    }
    var payload = {
      action: "pageview_end",
      site_id: siteId,
      session_id: state.id,
      pv_id: pv.id,
      scroll_pct: pv.maxScroll,
      engaged_seconds: Math.round(pv.engagedMs / 1000),
    };
    if (pv.useVitals) {
      payload.lcp_ms = vitals.lcp;
      payload.cls = vitals.cls;
      payload.inp_ms = vitals.inp;
      payload.fcp_ms = vitals.fcp;
      payload.ttfb_ms = vitals.ttfb;
    }
    send(payload);
  }

  // Scroll depth, sampled at most once per frame.
  var scrollQueued = false;
  window.addEventListener(
    "scroll",
    function () {
      if (scrollQueued || !pv) return;
      scrollQueued = true;
      (window.requestAnimationFrame || setTimeout)(function () {
        scrollQueued = false;
        if (!pv) return;
        var pct = currentScrollPct();
        if (pct > pv.maxScroll) pv.maxScroll = pct;
      });
    },
    { passive: true }
  );

  // Core Web Vitals, via the browser's own PerformanceObserver. Each observer
  // is wrapped separately: an unsupported entry type must never break tracking.
  function observe(type, handler, opts) {
    try {
      var o = new PerformanceObserver(function (list) {
        var entries = list.getEntries();
        for (var i = 0; i < entries.length; i++) handler(entries[i]);
      });
      var init = { type: type, buffered: true };
      if (opts) for (var k in opts) init[k] = opts[k];
      o.observe(init);
    } catch (e) {}
  }

  try {
    var nav = performance.getEntriesByType && performance.getEntriesByType("navigation")[0];
    if (nav && nav.responseStart > 0) vitals.ttfb = Math.round(nav.responseStart);
  } catch (e) {}

  observe("paint", function (entry) {
    if (entry.name === "first-contentful-paint") vitals.fcp = Math.round(entry.startTime);
  });
  observe("largest-contentful-paint", function (entry) {
    vitals.lcp = Math.round(entry.startTime);
  });

  // CLS as the worst "session window": shifts less than 1s apart, window capped
  // at 5s, the same definition Google's tooling reports.
  var clsWindow = 0;
  var clsWindowStart = 0;
  var clsLastShift = 0;
  var clsMax = 0;
  observe("layout-shift", function (entry) {
    if (entry.hadRecentInput) return;
    if (clsWindow && entry.startTime - clsLastShift < 1000 && entry.startTime - clsWindowStart < 5000) {
      clsWindow += entry.value;
    } else {
      clsWindow = entry.value;
      clsWindowStart = entry.startTime;
    }
    clsLastShift = entry.startTime;
    if (clsWindow > clsMax) clsMax = clsWindow;
    vitals.cls = Math.round(clsMax * 1000) / 1000;
  });

  // Interaction latency: the slowest real interaction seen on the page, a close
  // stand-in for INP on a small site.
  observe(
    "event",
    function (entry) {
      if (!entry.interactionId) return;
      var d = Math.round(entry.duration);
      if (vitals.inp === null || d > vitals.inp) vitals.inp = d;
    },
    { durationThreshold: 40 }
  );

  /* ---------------- Clicks: contact, social, outbound, downloads ---------------- */

  var SOCIAL_DOMAINS = {
    "instagram.com": "instagram",
    "facebook.com": "facebook",
    "twitter.com": "twitter",
    "x.com": "twitter",
    "linkedin.com": "linkedin",
    "tiktok.com": "tiktok",
    "youtube.com": "youtube",
    "pinterest.com": "pinterest",
  };

  function socialPlatformFor(href) {
    for (var domain in SOCIAL_DOMAINS) {
      if (href.indexOf(domain) !== -1) return SOCIAL_DOMAINS[domain];
    }
    return null;
  }

  var DOWNLOAD_RE = /\.(pdf|docx?|xlsx?|pptx?|csv|zip|rar|7z|txt|rtf|mp3|wav|mp4|mov|avi|dmg|exe|apk|epub)$/i;

  function bareHost(h) {
    return (h || "").toLowerCase().replace(/^www\./, "");
  }

  document.addEventListener(
    "click",
    function (e) {
      var el = e.target;

      // Any element can be tracked as a named custom event, no JavaScript
      // needed: <a data-940-event="book_now">.
      var tagged = el;
      while (tagged && tagged.nodeType === 1 && !(tagged.getAttribute && tagged.getAttribute("data-940-event"))) {
        tagged = tagged.parentElement;
      }
      if (tagged && tagged.getAttribute) {
        var name = tagged.getAttribute("data-940-event");
        var val = parseFloat(tagged.getAttribute("data-940-value"));
        window.t940.track(name, isNaN(val) ? undefined : { value: val });
      }

      while (el && el.tagName !== "A") el = el.parentElement;
      if (!el || !el.href) return;

      if (el.href.indexOf("tel:") === 0) {
        fireEvent("lead_submit", "phone_click");
        return;
      }
      if (el.href.indexOf("mailto:") === 0) {
        fireEvent("lead_submit", "email_click");
        return;
      }
      var platform = socialPlatformFor(el.href);
      if (platform) {
        fireEvent("social_click", platform);
        return;
      }

      var url;
      try {
        url = new URL(el.href, location.href);
      } catch (err) {
        return;
      }
      if (url.protocol !== "http:" && url.protocol !== "https:") return;
      if (DOWNLOAD_RE.test(url.pathname)) {
        fireEvent("file_download", decodeURIComponent(url.pathname.split("/").pop() || "").slice(0, 100));
        return;
      }
      if (bareHost(url.hostname) !== bareHost(location.hostname)) {
        fireEvent("outbound_click", (bareHost(url.hostname) + url.pathname).slice(0, 100));
      }
    },
    true
  );

  document.addEventListener(
    "submit",
    function (e) {
      var form = e.target;
      var target = (form && (form.id || form.name)) || "form";
      fireEvent("lead_submit", target);
    },
    true
  );

  // First time someone touches a field in a form: the start of the funnel whose
  // end is lead_submit.
  document.addEventListener(
    "focusin",
    function (e) {
      var t = e.target;
      if (!t || !t.tagName || !/^(INPUT|SELECT|TEXTAREA)$/.test(t.tagName) || !pv) return;
      var form = t.form;
      if (!form) return;
      var key = form.id || form.name || "form";
      if (pv.formsStarted[key]) return;
      pv.formsStarted[key] = true;
      fireEvent("form_start", key.slice(0, 100));
    },
    true
  );

  // Media events do not bubble, but they can be caught in the capture phase.
  document.addEventListener(
    "play",
    function (e) {
      var m = e.target;
      if (!m || !m.tagName || !/^(VIDEO|AUDIO)$/.test(m.tagName) || !pv) return;
      var src = m.currentSrc || m.src || "";
      var label = decodeURIComponent((src.split("?")[0].split("/").pop() || "") || m.getAttribute("title") || m.tagName.toLowerCase()).slice(0, 100);
      if (pv.mediaStarted[label]) return;
      pv.mediaStarted[label] = true;
      fireEvent("video_play", label);
    },
    true
  );

  window.addEventListener("error", function (e) {
    if (!pv || pv.errors >= 5) return;
    var msg = (e && e.message) || "";
    if (!msg || /^script error\.?$/i.test(msg) || /ResizeObserver/i.test(msg)) return;
    pv.errors += 1;
    var where = e.filename ? " @ " + String(e.filename).split("/").pop().split("?")[0] + ":" + (e.lineno || 0) : "";
    fireEvent("js_error", (msg + where).slice(0, 100));
  });

  /* ---------------- Public API for custom events ----------------
     window.t940.track("quote_requested")
     window.t940.track("purchase", { value: 149.99, props: { sku: "mug" } })
     The value field is how revenue gets recorded for ecommerce. */
  window.t940.track = function (name, opts) {
    if (typeof name !== "string" || !name) return;
    var extra = null;
    if (opts && typeof opts === "object") {
      extra = {};
      if (typeof opts.value === "number") extra.value = opts.value;
      if (opts.props && typeof opts.props === "object") extra.props = opts.props;
    }
    fireEvent("custom", name.slice(0, 100), extra);
  };

  /* ---------------- Single-page apps ---------------- */

  function onRouteChange() {
    if (!pv || location.pathname === pv.path) return;
    finishPageview();
    hardLoadPending = false;
    state.pageCount += 1;
    persist();
    startPageview(location.pathname, pv.path);
  }

  try {
    if (!window.__t940History) {
      window.__t940History = true;
      ["pushState", "replaceState"].forEach(function (fn) {
        var original = history[fn];
        history[fn] = function () {
          var result = original.apply(this, arguments);
          setTimeout(onRouteChange, 0);
          return result;
        };
      });
      window.addEventListener("popstate", function () {
        setTimeout(onRouteChange, 0);
      });
    }
  } catch (e) {}

  startPageview(location.pathname, lastPath !== location.pathname ? lastPath : null);

  /* ---------------- Session heartbeat ---------------- */

  var HEARTBEAT_MS = 20000;
  var heartbeatTimer = null;

  function sendSessionUpdate() {
    var duration = Math.round((Date.now() - state.start) / 1000);
    var isBounce = state.pageCount <= 1 && !state.interacted;
    send({
      action: "session_end",
      site_id: siteId,
      session_id: state.id,
      duration_seconds: duration,
      is_bounce: isBounce,
    });
  }

  function startHeartbeat() {
    stopHeartbeat();
    heartbeatTimer = setInterval(sendSessionUpdate, HEARTBEAT_MS);
  }

  function stopHeartbeat() {
    if (heartbeatTimer) {
      clearInterval(heartbeatTimer);
      heartbeatTimer = null;
    }
  }

  // visibilitychange is the reliable cross-platform signal for "the user is
  // probably leaving": it fires for tab switches and mobile backgrounding,
  // which pagehide/unload can miss (especially on mobile). pagehide stays as
  // a fallback for actual navigation/close, and the heartbeat is a safety
  // net so a hard crash only loses ~20s of data instead of the whole visit.
  document.addEventListener("visibilitychange", function () {
    if (document.visibilityState === "hidden") {
      markReady();
      if (pv && pv.visibleSince !== null) {
        pv.engagedMs += Date.now() - pv.visibleSince;
        pv.visibleSince = null;
      }
      finishPageview();
      sendSessionUpdate();
      stopHeartbeat();
    } else {
      if (pv) pv.visibleSince = Date.now();
      startHeartbeat();
    }
  });

  window.addEventListener("pageshow", function () {
    if (document.visibilityState === "visible") startHeartbeat();
  });

  document.addEventListener("pagehide", function () {
    markReady();
    finishPageview();
    sendSessionUpdate();
  });

  if (document.visibilityState === "visible") {
    startHeartbeat();
  }
})();
