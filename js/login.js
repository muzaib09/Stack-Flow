import supabase from "./crediantials.js";
let btn = document.querySelector(".btn")
$("#f").onsubmit =async (e) => {
  e.preventDefault();
  const em = $("#email").value.trim().toLowerCase();
  const p = $("#pass").value;
  btn.disabled = true;
  btn.classList.add("loading");

  const { data, error } = await supabase.auth.signInWithPassword({
  email: em,
  password: p,
});
  if (error) {
      btn.disabled = false;
      btn.classList.remove("loading");
      toast(error.message, "err");
      return
  }
      toast(data.user.aud);
  location.href = "dashboard.html";
}

