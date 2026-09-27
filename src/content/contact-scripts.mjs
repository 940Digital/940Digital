/**
 * Trailing scripts for /contact: the Altcha module loader and the form
 * submit handler. Extracted verbatim from contact.html on 2026-09-27, with the
 * altcha.min.js path made absolute. js/main.js and the tracker are emitted by
 * the shared chrome, so they were removed here to avoid loading them twice.
 */
export const scripts = String.raw`  <script async defer src="/js/altcha.min.js" type="module"></script>
  <script>
    (function () {
      var SITE_ID = "496da1ce-3717-434d-865b-c61ef8f15c4e";
      var form = document.getElementById("contactForm");
      var msg = document.getElementById("contactFormMsg");

      function sessionId() {
        try {
          var raw = sessionStorage.getItem("_940t_session");
          return raw ? JSON.parse(raw).id : null;
        } catch (e) {
          return null;
        }
      }

      form.addEventListener("submit", function (e) {
        e.preventDefault();
        msg.className = "form-msg";
        msg.textContent = "";

        var altchaInput = form.querySelector('input[name="altcha"]');
        if (!altchaInput || !altchaInput.value) {
          msg.className = "form-msg err";
          msg.textContent = "Please wait for the verification to finish, then try again.";
          return;
        }

        var submitBtn = form.querySelector('button[type="submit"]');
        submitBtn.disabled = true;

        var payload = {
          name: form.name.value,
          business: form.business.value,
          email: form.email.value,
          service: form.service.value,
          message: form.message.value,
          website: form.website.value,
          altcha: altchaInput.value,
          site_id: SITE_ID,
          session_id: sessionId(),
        };

        fetch("/api/submit-contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        })
          .then(function (res) {
            if (!res.ok) throw new Error("failed");
            msg.className = "form-msg ok";
            msg.textContent = "Thanks. I'll try to be in touch within one business day.";
            form.reset();
            if (window.altcha) form.querySelectorAll("altcha-widget").forEach(function (w) { w.reset && w.reset(); });
          })
          .catch(function () {
            msg.className = "form-msg err";
            msg.textContent = "Something went wrong sending your message. Please try again or email me directly.";
          })
          .finally(function () {
            submitBtn.disabled = false;
          });
      });
    })();
  </script>`;
