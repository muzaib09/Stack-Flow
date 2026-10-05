shell("dashboard");
const day = (n) => new Date(Date.now() - n * 864e5).toISOString().slice(0, 10);
function draw() {
  const S = SF.get("sales"),
    P = SF.get("purchases"),
    E = SF.get("expenses"),
    I = SF.get("products");
  const rev = sum(S, (s) => s.total),
    exp = sum(E, (e) => e.amount),
    buy = sum(P, (p) => p.total);
  const profit =
    sum(S, (s) => sum(s.items, (i) => (i.price - i.cost) * i.qty)) - exp;
  const cards = [
    ["💰 Revenue", rev, "#7c5cff"],
    ["📦 Purchases", buy, "#00d4ff"],
    ["💸 Expenses", exp, "#ff5c7a"],
    ["📈 Net Profit", profit, "#2ee59d"],
    ["🏬 Stock Value", sum(I, (p) => p.qty * p.cost), "#ffb84d"],
  ];
  $("#stats").innerHTML = cards
    .map(
      (c) =>
        `<div class="card stat" style="--c:${c[2]}"><small>${c[0]}</small><b>${SF.money(c[1])}</b></div>`,
    )
    .join("");
  const days = [6, 5, 4, 3, 2, 1, 0].map((n) => {
    const d = day(n);
    return {
      l: d.slice(5),
      s: sum(
        S.filter((x) => x.date == d),
        (x) => x.total,
      ),
      e: sum(
        E.filter((x) => x.date == d),
        (x) => x.amount,
      ),
    };
  });
  const mx = Math.max(1, ...days.map((d) => Math.max(d.s, d.e)));
  $("#chart").innerHTML = days
    .map(
      (d) =>
        `<div class="day"><div class="bars"><div class="bar" style="height:${(d.s / mx) * 100}%" title="Sales ${d.s}"></div><div class="bar e" style="height:${(d.e / mx) * 100}%" title="Expenses ${d.e}"></div></div><span>${d.l}</span></div>`,
    )
    .join("");
  const rs = S.slice(-6).reverse();
  $("#recent").innerHTML = rs.length
    ? rs
        .map(
          (s) =>
            `<tr><td>${s.inv}</td><td>${esc(s.customer)}</td><td>${s.date}</td><td>${SF.money(s.total)}</td></tr>`,
        )
        .join("")
    : '<tr><td colspan=4 class="empty">No sales yet</td></tr>';
  const low = I.filter((p) => p.qty <= 5);
  $("#low").innerHTML = low.length
    ? low
        .map(
          (p) =>
            `<tr><td>${esc(p.name)}</td><td><span class="badge low">${p.qty} left</span></td></tr>`,
        )
        .join("")
    : '<tr><td class="empty">All stock levels healthy ✅</td></tr>';
  $("#seed").style.display = I.length || S.length ? "none" : "inline-block";
}
function seed() {
  const pr = [
    ["Basmati Rice 5kg", 40, 900, 1100],
    ["Cooking Oil 1L", 3, 480, 560],
    ["Sugar 1kg", 60, 130, 155],
    ["Tea Pack", 4, 320, 390],
    ["Detergent", 25, 210, 260],
  ].map((x) => ({
    id: SF.uid(),
    name: x[0],
    qty: x[1],
    cost: x[2],
    price: x[3],
  }));
  SF.set("products", pr);
  SF.set(
    "purchases",
    pr.map((p, i) => ({
      id: SF.uid(),
      date: day(i + 3),
      name: p.name,
      qty: p.qty + 10,
      cost: p.cost,
      supplier: "Metro Traders",
      total: (p.qty + 10) * p.cost,
    })),
  );
  SF.set(
    "sales",
    [6, 5, 4, 3, 2, 1, 0].map((n, k) => {
      const p = pr[n % 5],
        q = 2 + (n % 4);
      return {
        id: SF.uid(),
        date: day(n),
        inv: "SF-" + String(k + 1).padStart(4, "0"),
        customer: "Walk-in",
        items: [{ name: p.name, qty: q, price: p.price, cost: p.cost }],
        total: q * p.price,
      };
    }),
  );
  SF.set(
    "expenses",
    [
      ["Shop Rent", "Rent", 15000],
      ["Electricity", "Utilities", 4200],
      ["Staff Salary", "Salary", 9000],
    ].map((x, i) => ({
      id: SF.uid(),
      date: day(i * 2),
      title: x[0],
      cat: x[1],
      amount: x[2],
    })),
  );
  draw();
  toast("Demo data loaded");
}
draw();
