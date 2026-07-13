import { supabase, SUPPORT_EMAIL } from "/dashboard/supabase-client.js";

const passwordStep = document.getElementById("passwordStep");
const otpStep = document.getElementById("otpStep");
const setPasswordStep = document.getElementById("setPasswordStep");
const forgotLink = document.getElementById("forgotLink");
const msgEl = document.getElementById("loginMsg");

let pendingEmail = null;

function getHashParams() {
  return new URLSearchParams(window.location.hash.replace(/^#/, ""));
}

const authType = getHashParams().get("type");
if (authType === "invite" || authType === "recovery") {
  passwordStep.classList.add("hidden");
  setPasswordStep.classList.add("active");
}

if (new URLSearchParams(window.location.search).get("expired") === "1") {
  history.replaceState(null, "", window.location.pathname);
  setMsg(
    "That link expired or was already used — this can happen if your email app previews links automatically. Please sign in again to get a fresh one.",
    "err"
  );
}

document.querySelectorAll(".pw-toggle").forEach((btn) => {
  btn.addEventListener("click", () => {
    const input = document.getElementById(btn.dataset.toggleFor);
    const showing = input.type === "text";
    input.type = showing ? "password" : "text";
    btn.textContent = showing ? "Show" : "Hide";
  });
});

setPasswordStep.addEventListener("submit", async (e) => {
  e.preventDefault();
  setMsg("");

  const newPassword = document.getElementById("newPassword").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  if (newPassword !== confirmPassword) {
    setMsg("Passwords don't match.", "err");
    return;
  }

  setBusy(setPasswordStep, true, "Saving...");

  const { data: sessionData } = await supabase.auth.getSession();
  if (!sessionData.session) {
    setBusy(setPasswordStep, false);
    setMsg("This link has expired. Ask 940Digital to send a new one.", "err");
    return;
  }

  const { error } = await supabase.auth.updateUser({ password: newPassword });
  setBusy(setPasswordStep, false);

  if (error) {
    setMsg(error.message, "err");
    return;
  }

  await supabase.auth.signOut();
  history.replaceState(null, "", window.location.pathname);
  setPasswordStep.classList.remove("active");
  passwordStep.classList.remove("hidden");
  setMsg("Password set — sign in below to continue.", "info");
});

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
    setMsg("Incorrect password.", "err");
    forgotLink.dataset.email = email;
    forgotLink.classList.add("show");
  } else {
    setMsg(
      `This email is not registered. Please contact ${SUPPORT_EMAIL} for support, or try a different email.`,
      "err"
    );
  }
}

forgotLink.addEventListener("click", async (e) => {
  e.preventDefault();
  const email = forgotLink.dataset.email;
  if (!email) return;

  forgotLink.classList.remove("show");
  setMsg("Sending a password reset link...", "info");

  const redirectUrl = new URL("/dashboard/login.html", window.location.href).toString();
  const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: redirectUrl });

  if (error) {
    setMsg(error.status === 429 ? error.message : "Could not send a reset link. Please try again.", "err");
    return;
  }

  setMsg("Check your email for a link to reset your password. You'll need to verify your email to continue.", "info");
});

passwordStep.addEventListener("submit", async (e) => {
  e.preventDefault();
  setMsg("");
  forgotLink.classList.remove("show");
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
      `This email is not registered. Please contact ${SUPPORT_EMAIL} for support, or try a different email.`,
      "err"
    );
    return;
  }

  if (account.role === "client") {
    window.location.href = "/dashboard/index.html";
    return;
  }

  // master: discard the password-only session and require a fresh OTP every login
  await supabase.auth.signOut();
  pendingEmail = email;

  const { error: otpError } = await supabase.auth.signInWithOtp({
    email,
    options: { shouldCreateUser: false },
  });

  setBusy(passwordStep, false);

  if (otpError) {
    if (otpError.status === 429) {
      setMsg(otpError.message, "err");
    } else {
      setMsg("Could not send verification code. Please try again.", "err");
    }
    return;
  }

  passwordStep.classList.add("hidden");
  otpStep.classList.add("active");
  setMsg("Code sent — check your email for the 6-digit code.", "info");
  const firstBox = otpBoxes[0];
  if (firstBox) firstBox.focus();
});

const otpBoxes = Array.from(document.querySelectorAll("#otpBoxes input"));

otpBoxes.forEach((box, i) => {
  box.addEventListener("input", () => {
    box.value = box.value.replace(/\D/g, "").slice(0, 1);
    if (box.value && i < otpBoxes.length - 1) {
      otpBoxes[i + 1].focus();
    }
    if (otpBoxes.every((b) => b.value)) {
      otpStep.requestSubmit();
    }
  });
  box.addEventListener("keydown", (e) => {
    if (e.key === "Backspace" && !box.value && i > 0) {
      otpBoxes[i - 1].focus();
    }
  });
  box.addEventListener("paste", (e) => {
    e.preventDefault();
    const digits = (e.clipboardData.getData("text") || "").replace(/\D/g, "").slice(0, 6);
    if (!digits) return;
    digits.split("").forEach((d, j) => {
      if (otpBoxes[j]) otpBoxes[j].value = d;
    });
    const nextEmpty = otpBoxes.find((b) => !b.value) || otpBoxes[otpBoxes.length - 1];
    nextEmpty.focus();
    if (otpBoxes.every((b) => b.value)) otpStep.requestSubmit();
  });
});

otpStep.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (!pendingEmail) return;

  const token = otpBoxes.map((b) => b.value).join("");
  if (token.length !== 6) return;

  setBusy(otpStep, true, "Verifying...");

  const { data, error } = await supabase.auth.verifyOtp({
    email: pendingEmail,
    token,
    type: "email",
  });

  if (error || !data.session) {
    setBusy(otpStep, false);
    setMsg("Invalid or expired code. Please try again.", "err");
    otpBoxes.forEach((b) => (b.value = ""));
    otpBoxes[0].focus();
    return;
  }

  window.location.href = "/dashboard/index.html";
});
