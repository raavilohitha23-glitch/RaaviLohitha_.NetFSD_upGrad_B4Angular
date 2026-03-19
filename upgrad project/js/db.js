
let db;

function openDB(callback) {
  const request = indexedDB.open("UpgradEMS", 1);

  request.onupgradeneeded = function(e) {
    db = e.target.result;
    if (!db.objectStoreNames.contains("events")) {
      const store = db.createObjectStore("events", { keyPath: "id" });

    
      store.put({
        id: "101",
        name: "Dev Tech",
        category: "Tech & Innovations",
        date: "2026-03-04",
        time: "15:15",
        url: "https://example.com/devtech"
      });
      store.put({
        id: "102",
        name: "MCT Summit",
        category: "Tech & Innovations",
        date: "2026-03-09",
        time: "14:15",
        url: "https://example.com/mctsummit"
      });
      store.put({
        id: "103",
        name: "Client Summit",
        category: "Industrial Event",
        date: "2026-03-17",
        time: "15:00",
        url: "https://example.com/clientsummit"
      });
    }
  };

  request.onsuccess = function(e) {
    db = e.target.result;
    if (callback) callback();
  };

  request.onerror = function(e) {
    console.error("IndexedDB error:", e.target.errorCode);
  };
}

// Add event (used in Events page)
function addEvent(eventObj) {
  const tx = db.transaction("events", "readwrite");
  const store = tx.objectStore("events");
  store.put(eventObj);
}


function searchEvents(query, callback) {
  const tx = db.transaction("events", "readonly");
  const store = tx.objectStore("events");
  const results = [];

  store.openCursor().onsuccess = function(e) {
    const cursor = e.target.result;
    if (cursor) {
      const event = cursor.value;
      const text = `${event.id} ${event.name} ${event.category}`.toLowerCase();
      if (text.includes(query.toLowerCase())) {
        results.push(event);
      }
      cursor.continue();
    } else {
      callback(results);
    }
  };
}


function deleteEvent(id, callback) {
  const tx = db.transaction("events", "readwrite");
  const store = tx.objectStore("events");
  store.delete(id);
  if (callback) callback();
}


function getEventById(id, callback) {
  const tx = db.transaction("events", "readonly");
  const store = tx.objectStore("events");
  const req = store.get(id);

  req.onsuccess = function() {
    callback(req.result);
  };
}
