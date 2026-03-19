
document.addEventListener("DOMContentLoaded", () => {

  if (sessionStorage.getItem("isLoggedIn") !== "true") {
    alert("Unauthorized access! Please login first.");
    window.location.href = "login.html";
    return;
  }


  openDB(() => {
    const addEventForm = document.getElementById("addEventForm");
    if (addEventForm) {
      addEventForm.addEventListener("submit", function(e) {
        e.preventDefault();
        const eventObj = {
          id: document.getElementById("eventId").value.trim(),
          name: document.getElementById("eventName").value.trim(),
          category: document.getElementById("eventCategory").value,
          date: document.getElementById("eventDate").value,
          time: document.getElementById("eventTime").value,
          url: document.getElementById("eventUrl").value.trim()
        };
        addEvent(eventObj);
        addEventForm.reset();
        alert("Event added successfully! Use the search bar to view it.");
      });
    }

    const searchInput = document.getElementById("searchInput");
    if (searchInput) {
      searchInput.addEventListener("keyup", function() {
        searchEvents(searchInput.value.trim(), (results) => {
          const eventsList = document.getElementById("eventsList");
          eventsList.innerHTML = "";
          results.forEach(event => {
            const card = document.createElement("div");
            card.className = "col-md-4 mb-3";
            card.innerHTML = `
              <div class="card h-100 shadow-sm">
                <div class="card-body">
                  <h5 class="card-title">${event.name}</h5>
                  <p><strong>ID:</strong> ${event.id}</p>
                  <p><strong>Category:</strong> ${event.category}</p>
                  <p><strong>Date:</strong> ${event.date}</p>
                  <p><strong>Time:</strong> ${event.time}</p>
                  <a href="${event.url}" target="_blank" class="btn btn-success">Join Event</a>
                  <button class="btn btn-danger ms-2" onclick="deleteEvent('${event.id}', () => searchEvents(searchInput.value.trim(), displayEvents))">Delete</button>
                </div>
              </div>
            `;
            eventsList.appendChild(card);
          });
        });
      });
    }

    // Logout
    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
      logoutBtn.addEventListener("click", function() {
        sessionStorage.removeItem("isLoggedIn");
        window.location.href = "login.html";
      });
    }
  });
});
