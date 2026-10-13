import supabase from "./crediantials.js";
let btn = document.querySelector(".btn");

$("#f").onsubmit = async (e) => {
  e.preventDefault();
  const p = $("#pass").value;
  if (p.length < 6) return toast("Password must be 6+ characters", "err");
  btn.disabled = true;
  btn.classList.add("loading");
  const { error } = await supabase.auth.updateUser({ password: p });
  if (error) {
    btn.disabled = false;
    btn.classList.remove("loading");
    toast(error.message, "err");
    return
  }
  toast("Password updated!");
  setTimeout(() => (window.location.replace('login.html')), 1200);
};
