shell("sell");
let cart = [];
const sel = $("#prod");
function opts() {
  const P = SF.get("products").filter((p) => p.qty > 0);
  sel.innerHTML = P.length
    ? P.map(
        (p) =>
          `<option value="${p.id}">${esc(p.name)} — ${p.qty} left · ${SF.money(p.price)}</option>`,
      ).join("")
    : '<option value="">No stock — buy first</option>';
}
function drawCart() {
  $("#cart").innerHTML = cart.length
    ? cart
        .map(
          (c, i) =>
            `<tr><td>${esc(c.name)}</td><td>${c.qty}</td><td>${SF.money(c.price)}</td><td>${SF.money(c.qty * c.price)}</td><td><button class="btn red sm" onclick="cart.splice(${i},1);drawCart()">✕</button></td></tr>`,
        )
        .join("")
    : '<tr><td colspan=5 class="empty">Cart is empty</td></tr>';
  $("#total").textContent =
    "Total: " + SF.money(sum(cart, (c) => c.qty * c.price));
}
function hist() {
  const S = SF.get("sales").slice().reverse().slice(0, 10);
  $("#hist").innerHTML = S.length
    ? S.map(
        (s) =>
          `<tr><td>${s.inv}</td><td>${s.date}</td><td>${esc(s.customer)}</td><td>${SF.money(s.total)}</td><td><button class="btn ghost sm" onclick="invoice(SF.get('sales').find(x=>x.id==='${s.id}'))">⬇ Invoice</button></td></tr>`,
      ).join("")
    : '<tr><td colspan=5 class="empty">No sales yet</td></tr>';
}
$("#add").onclick = () => {
  const p = SF.get("products").find((x) => x.id === sel.value),
    q = +$("#qty").value;
  if (!p || q < 1) return toast("Select product & quantity", "err");
  const c = cart.find((c) => c.id === p.id);
  if ((c ? c.qty : 0) + q > p.qty) return toast("Not enough stock", "err");
  c
    ? (c.qty += q)
    : cart.push({
        id: p.id,
        name: p.name,
        qty: q,
        price: p.price,
        cost: p.cost,
      });
  drawCart();
};
$("#checkout").onclick = () => {
  if (!cart.length) return toast("Cart is empty", "err");
  const P = SF.get("products");
  cart.forEach((c) => (P.find((p) => p.id === c.id).qty -= c.qty));
  SF.set("products", P);
  const S = SF.get("sales");
  const sale = {
    id: SF.uid(),
    date: SF.today(),
    inv: "SF-" + String(S.length + 1).padStart(4, "0"),
    customer: $("#cust").value.trim() || "Walk-in",
    items: cart.map(({ name, qty, price, cost }) => ({
      name,
      qty,
      price,
      cost,
    })),
    total: sum(cart, (c) => c.qty * c.price),
  };
  S.push(sale);
  SF.set("sales", S);
  cart = [];
  drawCart();
  opts();
  hist();
  toast("Sale completed");
  invoice(sale);
};
function invoice(s) {
  const me = SF.users().find((u) => u.email === SF.me());
  const rows = s.items
    .map(
      (i, n) =>
        `<tr><td>${n + 1}</td><td>${esc(i.name)}</td><td>${i.qty}</td><td>${SF.money(i.price)}</td><td>${SF.money(i.qty * i.price)}</td></tr>`,
    )
    .join("");
  const h = `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>${s.inv}</title><style>body{font-family:Segoe UI,sans-serif;max-width:720px;margin:40px auto;padding:0 20px;color:#1c2040}.h{display:flex;justify-content:space-between;border-bottom:4px solid #7c5cff;padding-bottom:16px}h1{margin:0;color:#7c5cff}table{width:100%;border-collapse:collapse;margin-top:24px}th{background:#7c5cff;color:#fff;text-align:left}td,th{padding:10px;border-bottom:1px solid #e5e7f5}.t{text-align:right;font-size:1.4rem;font-weight:700;margin-top:20px}button{margin-top:30px;padding:10px 20px;border:0;border-radius:8px;background:#7c5cff;color:#fff;cursor:pointer}@media print{button{display:none}}</style></head><body><div class="h"><div><h1>⚡ Stack Flow</h1><div>${esc(me.name)}</div></div><div style="text-align:right"><b>INVOICE ${s.inv}</b><br>${s.date}<br>Customer: ${esc(s.customer)}</div></div><table><tr><th>#</th><th>Item</th><th>Qty</th><th>Price</th><th>Total</th></tr>${rows}</table><div class="t">Total: ${SF.money(s.total)}</div><p style="color:#888">Thank you for your business!</p><button onclick="print()">Print / Save as PDF</button></body></html>`;
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([h], { type: "text/html" }));
  a.download = s.inv + ".html";
  a.click();
}
opts();
drawCart();
hist();
