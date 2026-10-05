const $ = (s, r = document) => r.querySelector(s);
const sum = (a, f) => a.reduce((t, x) => t + f(x), 0);
const esc = (s) =>
  String(s).replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
const SF = {
  users: () => JSON.parse(localStorage.getItem("sf_users") || "[]"),
  saveUsers: (u) => localStorage.setItem("sf_users", JSON.stringify(u)),
  me: () => localStorage.getItem("sf_session"),
  get: (n) => JSON.parse(localStorage.getItem(`sf_${SF.me()}_${n}`) || "[]"),
  set: (n, v) => localStorage.setItem(`sf_${SF.me()}_${n}`, JSON.stringify(v)),
  hash: (s) => btoa(unescape(encodeURIComponent(s))),
  money: (n) => "Rs " + Number(n || 0).toLocaleString(),
  today: () => new Date().toISOString().slice(0, 10),
  uid: () => Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
};
function toast(msg, type, ms = 3000) {
  let t = $("#toast");
  if (!t) {
    t = document.createElement("div");
    t.id = "toast";
    document.body.append(t);
  }
  const d = document.createElement("div");
  d.className = "tst " + (type || "");
  d.textContent = msg;
  t.append(d);
  setTimeout(() => d.remove(), ms);
}
function logout() {
  localStorage.removeItem("sf_session");
  location.href = "login.html";
}
function shell(active) {
  const me = SF.users().find((u) => u.email === SF.me());
  if (!me) {
    location.href = "login.html";
    return;
  }
  const L = [
    ["dashboard", "📊", "Dashboard"],
    ["buy", "📦", "Buy Stock"],
    ["sell", "🧾", "Sell"],
    ["expenses", "💸", "Expenses"],
  ];
  $("#sidebar").innerHTML =
    `<div class="logo"><i>⚡</i><span>Stack Flow</span></div>` +
    L.map(
      (l) =>
        `<a class="nav ${l[0] == active ? "on" : ""}" href="${l[0]}.html">${l[1]}<span class="lbl">${l[2]}</span></a>`,
    ).join("") +
    `<div class="user"><b>${esc(me.name)}</b><div style="color:var(--mu);margin:2px 0 10px;overflow:hidden;text-overflow:ellipsis">${esc(me.email)}</div><button class="btn ghost sm" onclick="logout()">Logout</button></div>`;
}
