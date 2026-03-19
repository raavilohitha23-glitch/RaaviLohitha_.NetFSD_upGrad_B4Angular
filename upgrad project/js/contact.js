document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contactForm");
  if (!contactForm) return;

  contactForm.addEventListener("submit", function(e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const description = document.getElementById("description").value.trim();

    if (name && email && description) {
      alert(`Thank you, ${name}! Your query has been submitted successfully.`);
      contactForm.reset();
    } else {
      alert("Please fill out all fields before submitting.");
    }
  });
});
