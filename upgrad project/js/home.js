const events = [
  {id:101, name:"Dev Tech", category:"Tech & Innovations", date:"2026-03-04", time:"15:15"},
  {id:102, name:"MCT Summit", category:"Tech & Innovations", date:"2026-03-09", time:"14:15"},
  {id:103, name:"Client Summit", category:"Industrial Event", date:"2026-03-17", time:"15:00"}
];

const container = document.getElementById("homeEvents");
events.forEach(ev => {
  container.innerHTML += `
    <div class="col-md-4">
      <div class="card shadow-sm mb-3">
        <div class="card-body">
          <h5 class="card-title">${ev.name}</h5>
          <p>Category: ${ev.category}</p>
          <p>Date: ${ev.date}</p>
          <p>Time: ${ev.time}</p>
          <a href="register.html?id=${ev.id}" class="btn btn-primary">Register</a>
        </div>
      </div>
    </div>
  `;
});
