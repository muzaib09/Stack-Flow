$("#f").onsubmit = (e) => {
  e.preventDefault();
  const em = $("#email").value.trim().toLowerCase();
  if (!SF.users().some((u) => u.email === em))
    return toast("No account with this email", "err");
  const code = String(Math.floor(100000 + Math.random() * 900000));
  localStorage.setItem(
    "sf_reset",
    JSON.stringify({ email: em, code, exp: Date.now() + 10 * 60000 }),
  );
  const i = $(".info");
  i.style.display = "block";
  i.innerHTML = `Demo mode (no email server): your reset code is <b style="font-size:1.2rem">${code}</b><br><a href="reset.html?email=${encodeURIComponent(em)}" style="color:var(--p2)">Continue to reset →</a>`;
};
