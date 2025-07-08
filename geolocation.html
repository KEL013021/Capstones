<!DOCTYPE html>
<html>
<head>
  <title>OpenStreetMap + Address Search + Distance</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 0px; }
    .navbar {
      background-color: rgba(55, 120, 194, 0.83);
      padding: 10px 20px;
      display: flex;
      align-items: center;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.7);
      margin-bottom: 20px;
    }
    .navbar-container { 
        width: 100%; 
        text-align: center; 
    }
    .section-name { 
        font-size: 30px;
        font-weight: 600; 
    }
    .container { 
        display: flex;
        justify-content: center; 
        align-items: flex-start; 
        padding: 20px; 
    }
    .left-panel {
      width: 35%;
      padding: 20px;
      border: 1px solid #ccc;
      border-radius: 10px;
      background-color: #f9f9f9;
      margin-right: 20px;
      height:560px;
    }
    .search-input, .place-input {
      width: 90%;
      padding: 10px;
      font-size: 16px;
      border: 2px solid #ccc;
      border-radius: 8px;
      margin-top: 10px;
      margin-bottom: 10px;
    }
    button {
      padding: 10px 15px;
      font-size: 16px;
      border-radius: 8px;
      border: none;
      background-color: lightblue;
      cursor: pointer;
      margin-top: 10px;
    }
    #status, #ip-address, #user-coords, #place-coords, #distance-info {
      margin-top: 15px;
      font-weight: bold;
      font-size: 15px;
    }
    .right-panel { width: 60%; }
    #map {
      width: 100%;
      height: 600px;
      border: 1px solid #ccc;
      background-color: #e0e0e0;
      background-size: cover;
      background-position: center;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #555;
      font-weight: bold;
      font-size: 18px;
      border-radius: 10px;
    }
  </style>
</head>
<body>

<nav class="navbar">
  <div class="navbar-container">
    <div class="section-name">OpenStreetMap + Address Search + Distance</div>
  </div>
</nav>

<div class="container">
  <div class="left-panel">
    <label for="name">Your Name:</label><br>
    <input type="text" class="search-input" id="name" placeholder="Enter Your Name..."><br>
    <button onclick="checkLocation()">📍 My Location</button>

    <p id="user-status">Status: Waiting for action...</p>
    <p id="ip-address">Your IP: Not detected yet</p>
    <p id="user-coords">Your Coordinates: </p>

    <hr style="margin-top: 20px;">

    <label for="place">Where do you want to go?</label><br>
    <input type="text" class="place-input" id="place" placeholder="e.g. SM Batangas, Nasugbu"><br>
    <button onclick="searchPlace()">🔍 Search Place</button>

    <p id="status">Status: Waiting for action...</p>
    <p id="place-coords">Place Coordinates: </p>
    <p id="distance-info">Distance: </p>
  </div>

  <div class="right-panel">
    <div id="map">Map will load here...</div>
  </div>
</div>

<script>
  // add this point we search in internet to use of some API and we use ipinfo the free edition

  //rhis part set the longhitude and latitude to null 
  let userLat = null;
  let userLon = null;
  let placeLat = null;
  let placeLon = null;

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
    document.getElementById('map').innerText = "Loading map...";

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

        showMap(userLat, userLon, 13);
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
    document.getElementById('map').innerText = "Loading map...";

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
        
        showMap(placeLat, placeLon, 14);
        updateDistance();
      })
      .catch(error => {
        document.getElementById('status').innerText = "Error finding place.";
        console.error(error);
      });
  }
  //this fucntion is to compute the distance of user and searched location 
  function updateDistance() {
    if (userLat !== null && placeLat !== null) {
      const dist = getDistance(userLat, userLon, placeLat, placeLon);
      document.getElementById('distance-info').innerText = `Distance: ${Math.round(dist)} meters`;
    }
  }

  // this fuction is the show map
  function showMap(lat, lon, zoom) {
    const tileX = Math.floor((lon + 180) / 360 * Math.pow(2, zoom));
    const tileY = Math.floor((1 - Math.log(Math.tan(lat * Math.PI / 180) + 1 / Math.cos(lat * Math.PI / 180)) / Math.PI) / 2 * Math.pow(2, zoom));
    const mapURL = `https://tile.openstreetmap.org/${zoom}/${tileX}/${tileY}.png`;

    document.getElementById('map').style.backgroundImage = `url('${mapURL}')`;
    document.getElementById('map').innerText = '';
  }
  
</script>

</body>
</html>
