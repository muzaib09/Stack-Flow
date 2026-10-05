shell("buy");
function draw() {
  const P = SF.get("products"),
    q = $("#q").value.toLowerCase(),
    H = SF.get("purchases");
  $("#names").innerHTML = P.map((p) => `<option value="${esc(p.name)}">`).join(
    "",
  );
  const L = P.filter((p) => p.name.toLowerCase().includes(q));
  $("#stock").innerHTML = L.length
    ? L.map(
        (p) =>
          `<tr><td>${esc(p.name)}</td><td>${p.qty} <span class="badge ${p.qty <= 5 ? "low" : ""}">${p.qty <= 5 ? "Low" : "OK"}</span></td><td>${SF.money(p.cost)}</td><td>${SF.money(p.price)}</td><td><button class="btn red sm" onclick="del('${p.id}')">Delete</button></td></tr>`,
      ).join("")
    : '<tr><td colspan=5 class="empty">No products yet</td></tr>';
  $("#hist").innerHTML = H.length
    ? H.slice()
        .reverse()
        .slice(0, 10)
        .map(
          (h) =>
            `<tr><td>${h.date}</td><td>${esc(h.name)}</td><td>${h.qty}</td><td>${esc(h.supplier)}</td><td>${SF.money(h.total)}</td></tr>`,
        )
        .join("")
    : '<tr><td colspan=5 class="empty">No purchases yet</td></tr>';
}
function del(id) {
  if (!confirm("Delete this product?")) return;
  SF.set(
    "products",
    SF.get("products").filter((p) => p.id !== id),
  );
  draw();
}
$("#q").oninput = draw;
$("#f").onsubmit = (e) => {
  e.preventDefault();
  const name = $("#name").value.trim(),
    qty = +$("#qty").value,
    cost = +$("#cost").value,
    price = +$("#price").value,
    P = SF.get("products");
  let p = P.find((x) => x.name.toLowerCase() == name.toLowerCase());
  if (p) {
    p.qty += qty;
    p.cost = cost;
    p.price = price;
  } else P.push({ id: SF.uid(), name, qty, cost, price });
  SF.set("products", P);
  const H = SF.get("purchases");
  H.push({
    id: SF.uid(),
    date: SF.today(),
    name,
    qty,
    cost,
    supplier: $("#sup").value.trim() || "—",
    total: qty * cost,
  });
  SF.set("purchases", H);
  e.target.reset();
  draw();
  toast("Stock added");
};
draw();
