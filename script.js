// add this point we search in internet to use of some API and we use ipinfo the free edition

//rhis part set the longhitude and latitude to null 
let userLat = null;
let userLon = null;
let placeLat = null;
let placeLon = null;

// Initialize map with Nasugbu, Batangas coordinates
let map;
let userMarker = null;
let placeMarker = null;

// Nasugbu, Batangas coordinates
const nasugbuLat = 14.0647;
const nasugbuLon = 120.6319;

//this function use to get the longhitude and latitude came from internet and modify it
function getDistance(lat1, lon1, lat2, lon2) {
  const R = 6371000;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

//int this parct checking user location and ip address
function checkLocation() {
  const userName = document.getElementById('name').value || "Guest";
  document.getElementById('status').innerText = "Checking location...";

  fetch('https://ipinfo.io/json?token=ea61dd951650c1')
    .then(response => response.json())
    .then(data => {
      const loc = data.loc.split(',');
      userLat = parseFloat(loc[0]);
      userLon = parseFloat(loc[1]);
      const userIP = data.ip;

      document.getElementById('user-status').innerText = `Hello ${userName}, your location is detected.`;
      document.getElementById('ip-address').innerText = `Your IP: ${userIP}`;
      document.getElementById('user-coords').innerText = `Your Coordinates: ${userLat.toFixed(5)}, ${userLon.toFixed(5)}`;

      // Remove existing user marker if any
      if (userMarker) {
        map.removeLayer(userMarker);
      }
      
      // Add user location marker
      userMarker = L.marker([userLat, userLon])
        .addTo(map)
        .bindPopup(`${userName}'s Location`)
        .openPopup();
      
      // Fit map to show both user and place if place exists
      if (placeLat !== null) {
        map.fitBounds([[userLat, userLon], [placeLat, placeLon]], { padding: [20, 20] });
      } else {
        map.setView([userLat, userLon], 13);
      }

      updateDistance();
    })
    .catch(error => {
      document.getElementById('status').innerText = "Failed to get your location.";
      console.error(error);
    });
}

//this fuction is search to place what you want
function searchPlace() {
  const place = document.getElementById('place').value;
  if (!place) {
    alert("Please enter a place to search.");
    return;
  }

  document.getElementById('status').innerText = `Searching for "${place}"...`;

  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(place)}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.length === 0) {
        document.getElementById('status').innerText = "Place not found.";
        return;
      }

      placeLat = parseFloat(data[0].lat);
      placeLon = parseFloat(data[0].lon);

      document.getElementById('place-coords').innerText = `Place Coordinates: ${placeLat.toFixed(5)}, ${placeLon.toFixed(5)}`;
      document.getElementById('status').innerText = `Found: ${data[0].display_name}`;
      
      // Remove existing place marker if any
      if (placeMarker) {
        map.removeLayer(placeMarker);
      }
      
      // Add place marker with custom icon color
      placeMarker = L.marker([placeLat, placeLon])
        .addTo(map)
        .bindPopup(`📍 ${data[0].display_name}`)
        .openPopup();
      
      // Fit map to show both locations if user location exists
      if (userLat !== null) {
        map.fitBounds([[userLat, userLon], [placeLat, placeLon]], { padding: [20, 20] });
      } else {
        map.setView([placeLat, placeLon], 14);
      }
      
      updateDistance();
    })
    .catch(error => {
      document.getElementById('status').innerText = "Error finding place.";
      console.error(error);
    });
}

// Clear all pins function
function clearPins() {
  // Remove user marker
  if (userMarker) {
    map.removeLayer(userMarker);
    userMarker = null;
  }
  
  // Remove place marker
  if (placeMarker) {
    map.removeLayer(placeMarker);
    placeMarker = null;
  }
  
  // Reset coordinates
  userLat = null;
  userLon = null;
  placeLat = null;
  placeLon = null;
  
  // Reset display information
  document.getElementById('user-status').innerText = "Status: Waiting for action...";
  document.getElementById('ip-address').innerText = "Your IP: Not detected yet";
  document.getElementById('user-coords').innerText = "Your Coordinates: ";
  document.getElementById('status').innerText = "Status: Waiting for action...";
  document.getElementById('place-coords').innerText = "Place Coordinates: ";
  document.getElementById('distance-info').innerText = "Distance: ";
  
  // Reset map view to Nasugbu
  map.setView([nasugbuLat, nasugbuLon], 13);
}

//this fucntion is to compute the distance of user and searched location 
function updateDistance() {
  if (userLat !== null && placeLat !== null) {
    const dist = getDistance(userLat, userLon, placeLat, placeLon);
    document.getElementById('distance-info').innerText = `Distance: ${Math.round(dist)} meters`;
  }
}

// Initialize map when page loads
window.onload = function() {
  map = L.map('map').setView([nasugbuLat, nasugbuLon], 13);
  
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);
};
ipinfo.io