import supabase from "./crediantials.js";

$("#f").onsubmit =async (e) => {
  e.preventDefault();
  const em = $("#email").value.trim().toLowerCase();
  const p = $("#pass").value

    const { data, error } = await supabase.auth.signInWithPassword({
      email: em,
      password: p,
    });
    console.log("🚀 ~ data:", data)
    if (error) return toast(error.message,"err");
  }
  // location.href = "dashboard.html";

