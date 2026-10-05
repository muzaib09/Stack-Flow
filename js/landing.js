if (localStorage.getItem("sf_session")) {
  $("#cta").href = "pages/dashboard.html";
  $("#cta").textContent = "Open Dashboard";
  $("#nvl").style.display = "none";
}
const io = new IntersectionObserver((e) =>
  e.forEach((x) => x.isIntersecting && x.target.classList.add("show")),
);
document.querySelectorAll(".feat .card").forEach((c) => {
  c.classList.add("hide");
  io.observe(c);
});
