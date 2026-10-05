import supabase from "./crediantials.js";

$("#f").onsubmit = async (e) => {
  e.preventDefault();
  const name = $("#name").value.trim(),
    em = $("#email").value.trim().toLowerCase(),
    p = $("#pass").value;
  if (p.length < 6) return toast("Password must be 6+ characters", "err");
  if (p !== $("#pass2").value) return toast("Passwords do not match", "err");

  const { data, error } = await supabase.auth.signUp({
    email: em,
    password: p,
  });
  if (error) return toast(error.message, "err");
  
  toast("Account created! Redirecting...");

  setTimeout(() => (location.href = "login.html"), 1200);
};
