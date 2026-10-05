shell("expenses");
$("#date").value = SF.today();
function draw() {
  const E = SF.get("expenses")
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date));
  const cats = {};
  E.forEach((e) => (cats[e.cat] = (cats[e.cat] || 0) + e.amount));
  $("#chips").innerHTML =
    `<span class="chip"><b>Total: ${SF.money(sum(E, (e) => e.amount))}</b></span>` +
    Object.entries(cats)
      .map(([k, v]) => `<span class="chip">${esc(k)}: ${SF.money(v)}</span>`)
      .join("");
  $("#list").innerHTML = E.length
    ? E.map(
        (e) =>
          `<tr><td>${e.date}</td><td>${esc(e.title)}</td><td>${esc(e.cat)}</td><td>${SF.money(e.amount)}</td><td><button class="btn red sm" onclick="del('${e.id}')">Delete</button></td></tr>`,
      ).join("")
    : '<tr><td colspan=5 class="empty">No expenses recorded</td></tr>';
}
function del(id) {
  SF.set(
    "expenses",
    SF.get("expenses").filter((e) => e.id !== id),
  );
  draw();
}
$("#f").onsubmit = (e) => {
  e.preventDefault();
  const E = SF.get("expenses");
  E.push({
    id: SF.uid(),
    date: $("#date").value,
    title: $("#title").value.trim(),
    cat: $("#cat").value,
    amount: +$("#amount").value,
  });
  SF.set("expenses", E);
  $("#title").value = "";
  $("#amount").value = "";
  draw();
  toast("Expense added");
};
draw();
