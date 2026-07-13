(function () {
  "use strict";

  if (navigator.doNotTrack === "1" || window.doNotTrack === "1" || navigator.msDoNotTrack === "1") {
    return;
  }

  var COLLECT_URL = "https://vcivhrzdvwkqebevplgs.supabase.co/functions/v1/collect";

  function getSiteId() {
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
    if (!script || !script.src) return null;
    var match = script.src.match(/[?&]site=([^&]+)/);
    return match ? decodeURIComponent(match[1]) : null;
  }

  var siteId = getSiteId();
  if (!siteId) return;

  function send(payload) {
    var body = JSON.stringify(payload);
    if (navigator.sendBeacon) {
      var blob = new Blob([body], { type: "application/json" });
      navigator.sendBeacon(COLLECT_URL, blob);
    } else {
      fetch(COLLECT_URL, { method: "POST", body: body, headers: { "Content-Type": "application/json" }, keepalive: true }).catch(function () {});
    }
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

  if (isNewSession) {
    send({
      action: "session_start",
      site_id: siteId,
      session_id: state.id,
      referrer: document.referrer || null,
    });
  }

  function markInteracted() {
    if (!state.interacted) {
      state.interacted = true;
      persist();
    }
  }

  function fireEvent(eventType, eventTarget) {
    send({
      action: "event",
      site_id: siteId,
      session_id: state.id,
      event_type: eventType,
      event_target: eventTarget,
    });
    markInteracted();
  }

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

  document.addEventListener(
    "click",
    function (e) {
      var el = e.target;
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

  function endSession() {
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

  document.addEventListener("pagehide", endSession);
})();
