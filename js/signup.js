import supabase from "./crediantials.js";
let btn = document.querySelector(".btn");
$("#f").onsubmit = async (e) => {
  e.preventDefault();
  const name = $("#name").value.trim(),
    em = $("#email").value.trim().toLowerCase(),
    p = $("#pass").value;
  if (p.length < 6) return toast("Password must be 6+ characters", "err");
  if (p !== $("#pass2").value) return toast("Passwords do not match", "err");

   btn.disabled = true;
   btn.classList.add("loading");

  const { data, error } = await supabase.auth.signUp({
    email: em,
    password: p,
  });
  if (error) {
    btn.disabled = false;
    btn.classList.remove("loading");
    toast(error.message, "err");
    return
  }

  toast("Account created! Redirecting...");
  setTimeout(() => (location.href = "login.html"), 1200);
};
