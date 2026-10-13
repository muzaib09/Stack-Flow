import supabase from "./crediantials.js";
let btn = document.querySelector(".btn");

$("#f").onsubmit = async (e) => {
  e.preventDefault();
  const em = $("#email").value.trim().toLowerCase();

  btn.disabled = true;
  btn.classList.add("loading");
  const { error } = await supabase.auth.resetPasswordForEmail(em, {
    redirectTo: "http://127.0.0.1:5500/pages/reset.html",
  });
  if (error) {
    btn.disabled = false;
    btn.classList.remove("loading");
    toast(error.message, "err");
    return;
  }
  toast("A password reset link has been sent to your email address.");
};
