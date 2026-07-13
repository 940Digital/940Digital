import { supabase, SUPPORT_EMAIL } from "./supabase-client.js";

const passwordStep = document.getElementById("passwordStep");
const otpStep = document.getElementById("otpStep");
const msgEl = document.getElementById("loginMsg");

let pendingEmail = null;

function setMsg(text, kind) {
  msgEl.textContent = text || "";
  msgEl.className = "login-msg" + (kind ? " " + kind : "");
}

function setBusy(form, busy, busyLabel) {
  const btn = form.querySelector('button[type="submit"]');
  if (busy) {
    btn.dataset.originalText = btn.textContent;
    btn.textContent = busyLabel;
    btn.disabled = true;
  } else {
    btn.textContent = btn.dataset.originalText || btn.textContent;
    btn.disabled = false;
  }
}

async function noAccountOrGenericError(email) {
  const { data: exists } = await supabase.rpc("account_exists_for_email", { check_email: email });
  if (exists) {
    setMsg("Incorrect email or password. Please try again.", "err");
  } else {
    setMsg(
      `Sorry, there's no account linked to that email. Contact ${SUPPORT_EMAIL} for support, or try a different email.`,
      "err"
    );
  }
}

passwordStep.addEventListener("submit", async (e) => {
  e.preventDefault();
  setMsg("");
  const email = document.getElementById("email").value.trim().toLowerCase();
  const password = document.getElementById("password").value;

  setBusy(passwordStep, true, "Signing in...");

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error || !data.session) {
    setBusy(passwordStep, false);
    await noAccountOrGenericError(email);
    return;
  }

  const { data: account } = await supabase
    .from("accounts")
    .select("role")
    .eq("id", data.user.id)
    .maybeSingle();

  if (!account) {
    await supabase.auth.signOut();
    setBusy(passwordStep, false);
    setMsg(
      `Sorry, there's no account linked to that email. Contact ${SUPPORT_EMAIL} for support, or try a different email.`,
      "err"
    );
    return;
  }

  if (account.role === "client") {
    window.location.href = "index.html";
    return;
  }

  // master: discard the password-only session and require a fresh OTP every login
  await supabase.auth.signOut();
  pendingEmail = email;

  const redirectUrl = new URL("index.html", window.location.href).toString();
  const { error: otpError } = await supabase.auth.signInWithOtp({
    email,
    options: { shouldCreateUser: false, emailRedirectTo: redirectUrl },
  });

  setBusy(passwordStep, false);

  if (otpError) {
    setMsg("Could not send verification email. Please try again.", "err");
    return;
  }

  passwordStep.classList.add("hidden");
  otpStep.classList.add("active");
  setMsg("Code sent — check your email. You can also just click the sign-in link in that email instead.", "info");
});

otpStep.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (!pendingEmail) return;

  const token = document.getElementById("otpCode").value.trim();
  setBusy(otpStep, true, "Verifying...");

  const { data, error } = await supabase.auth.verifyOtp({
    email: pendingEmail,
    token,
    type: "email",
  });

  if (error || !data.session) {
    setBusy(otpStep, false);
    setMsg("Invalid or expired code. Please try again.", "err");
    return;
  }

  window.location.href = "index.html";
});
