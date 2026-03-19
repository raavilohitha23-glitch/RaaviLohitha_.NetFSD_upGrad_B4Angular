document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  if (!loginForm) return;

  loginForm.addEventListener("submit", function(e) {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (email === "admin@upgrad.com" && password === "12345") {
      alert("Login successful!");
      sessionStorage.setItem("isLoggedIn", "true");
      window.location.href = "events.html";
    } else {
      alert("Invalid email or password!");
    }
  });
});
