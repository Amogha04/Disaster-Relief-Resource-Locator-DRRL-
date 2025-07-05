import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import L from "leaflet";
import userIconUrl from "../assets/user-icon.png";
import reliefIconUrl from "../assets/relief-icon.png";

// Icons
const reliefIcon = new L.Icon({
  iconUrl: reliefIconUrl,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -35],
  className: "drop-shadow-xl",
});

const userIcon = new L.Icon({
  iconUrl: userIconUrl,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -35],
  className: "animate-pulse",
});

function FlyToUserLocation({ position }) {
  const map = useMap();
  useEffect(() => {
    if (position) map.flyTo(position, 14);
  }, [position, map]);
  return null;
}

export default function MapView() {
  const [reliefCenters, setReliefCenters] = useState([]);
  const [userPos, setUserPos] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/relief-centers")
      .then((res) => setReliefCenters(res.data))
      .catch((err) => console.error("Failed to fetch centers", err));
  }, []);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setUserPos([pos.coords.latitude, pos.coords.longitude]),
        (err) => console.error("Geolocation error", err)
      );
    }
  }, []);

  return (
    <div className="relative h-screen w-full bg-black">

      {/* 🌞 / 🌙 Toggle Button */}
<div className="absolute top-5 right-5 z-[1000]">
  <button
    onClick={() => setDarkMode((prev) => !prev)}
    className={`w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-all duration-300
      ${darkMode ? "bg-white text-black" : "bg-black text-white"} hover:scale-110`}
    title="Toggle Theme"
  >
    {darkMode ? "🌞" : "🌙"}
  </button>
</div>


      {/* 📍 Header */}
      <div className="absolute top-5 left-1/2 transform -translate-x-1/2 z-[1000] bg-white/10 backdrop-blur-lg border border-white/30 text-white px-6 py-3 rounded-xl shadow-xl text-lg font-semibold">
        📍 Real-Time Disaster Relief Map
      </div>

      {/* 🗺️ Map */}
      <MapContainer
        center={[12.9716, 77.5946]}
        zoom={13}
        className="h-full w-full z-0"
      >
        <TileLayer
  attribution='© <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
  url={
    darkMode
      ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  }
/>


        {userPos && (
          <Marker position={userPos} icon={userIcon}>
            <Popup>You are here 🚶</Popup>
          </Marker>
        )}

        {reliefCenters.map((center) => (
          <Marker
            key={center._id}
            position={[center.lat, center.lng]}
            icon={reliefIcon}
          >
            <Popup>
              <strong>{center.name}</strong>
              <br />
              {center.details}
            </Popup>
          </Marker>
        ))}

        <FlyToUserLocation position={userPos} />
      </MapContainer>

      {/* ➕ Floating Add Button */}
      <div className="absolute bottom-6 right-6 z-[1000]">
        <button className="bg-indigo-600 hover:bg-indigo-800 text-white px-5 py-3 rounded-full shadow-xl text-lg font-semibold transition transform hover:scale-105">
          ➕ Add Relief Center
        </button>
      </div>
    </div>
  );
}
