$("#email").value = new URLSearchParams(location.search).get("email") || "";
$("#f").onsubmit = (e) => {
  e.preventDefault();
  const r = JSON.parse(localStorage.getItem("sf_reset") || "null"),
    em = $("#email").value.trim().toLowerCase(),
    p = $("#pass").value;
  if (
    !r ||
    r.email !== em ||
    r.code !== $("#code").value.trim() ||
    Date.now() > r.exp
  )
    return toast("Invalid or expired code", "err");
  if (p.length < 6) return toast("Password must be 6+ characters", "err");
  const U = SF.users();
  U.find((u) => u.email === em).pass = SF.hash(p);
  SF.saveUsers(U);
  localStorage.removeItem("sf_reset");
  toast("Password updated!");
  setTimeout(() => (location.href = "login.html"), 1200);
};
