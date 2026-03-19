// register.js
document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.getElementById("registerForm");
  const eventDetails = document.getElementById("eventDetails");
  if (!registerForm) return;

  // Get event ID from URL
  const urlParams = new URLSearchParams(window.location.search);
  const eventId = urlParams.get("id");

  // Open DB and fetch event details
  openDB(() => {
    if (eventId) {
      getEventById(eventId, (event) => {
        if (event) {
          eventDetails.innerHTML = `
            <p><strong>ID:</strong> ${event.id}</p>
            <p><strong>Name:</strong> ${event.name}</p>
            <p><strong>Category:</strong> ${event.category}</p>
            <p><strong>Date:</strong> ${event.date}</p>
            <p><strong>Time:</strong> ${event.time}</p>
            <a href="${event.url}" target="_blank" class="btn btn-success">Join Event</a>
          `;
        } else {
          eventDetails.innerHTML = "<p>Event not found.</p>";
        }
      });
    }
  });

  registerForm.addEventListener("submit", function(e) {
    e.preventDefault();
    alert("You are successfully registered to this event!");
    registerForm.reset();
  });
});
