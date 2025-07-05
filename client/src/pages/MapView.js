import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";

// 🔍 Component to move map to user location
function FlyToUserLocation({ position }) {
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.flyTo(position, 14); // zoom level 14
    }
  }, [position, map]);
  return null;
}

// 📏 Haversine formula to calculate distance in km between 2 lat/lng points
function getDistanceInKm(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth radius in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export default function MapView() {
  const [reliefCenters, setReliefCenters] = useState([]);
  const [userPos, setUserPos] = useState(null);
  const [filterRadius, setFilterRadius] = useState(5); // default 5km

  // 🌐 Fetch centers
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/relief-centers")
      .then((res) => setReliefCenters(res.data))
      .catch((err) => console.error("Failed to fetch centers", err));
  }, []);

  // 📍 Get user location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setUserPos([pos.coords.latitude, pos.coords.longitude]);
        },
        (err) => {
          console.error("Geolocation denied or error", err);
        }
      );
    }
  }, []);

  return (
    <div className="relative h-screen w-full z-0">
      {/* 🔘 Filter Dropdown */}
      <div className="p-4 bg-white shadow z-10 absolute top-4 left-4 rounded-lg">
        <label className="text-sm font-medium text-gray-800 mr-2">Show within:</label>
        <select
          value={filterRadius}
          onChange={(e) => setFilterRadius(Number(e.target.value))}
          className="border border-gray-300 rounded px-2 py-1 text-sm"
        >
          <option value={1}>1 km</option>
          <option value={5}>5 km</option>
          <option value={10}>10 km</option>
          <option value={25}>25 km</option>
          <option value={50}>50 km</option>
        </select>
      </div>

      <MapContainer center={[12.9716, 77.5946]} zoom={13} className="h-full w-full">
        <TileLayer
          attribution='© <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* 🎯 Show user location */}
        {userPos && (
          <Marker position={userPos}>
            <Popup>You are here</Popup>
          </Marker>
        )}

        {/* 🚑 Show filtered relief centers */}
        {reliefCenters
          .filter((center) => {
            if (!userPos) return true; // show all if user position unknown
            const dist = getDistanceInKm(userPos[0], userPos[1], center.lat, center.lng);
            return dist <= filterRadius;
          })
          .map((center) => (
            <Marker key={center._id} position={[center.lat, center.lng]}>
              <Popup>
                <strong>{center.name}</strong>
                <br />
                {center.details}
              </Popup>
            </Marker>
          ))}

        <FlyToUserLocation position={userPos} />
      </MapContainer>
    </div>
  );
}
