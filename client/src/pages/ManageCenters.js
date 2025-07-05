// src/pages/ManageCenters.js
import { useEffect, useState } from "react";
import axios from "axios";

export default function ManageCenters() {
  const [centers, setCenters] = useState([]);
  const [message, setMessage] = useState("");

  const fetchCenters = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/relief-centers");
      setCenters(res.data);
    } catch (err) {
      console.error("Failed to load centers", err);
    }
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this center?");
    if (!confirm) return;

    try {
      await axios.delete(`http://localhost:5000/api/relief-centers/${id}`);
      setMessage("✅ Center deleted successfully!");
      setCenters((prev) => prev.filter((c) => c._id !== id));
    } catch (err) {
      console.error("Delete failed", err);
      setMessage("❌ Error deleting center");
    }
  };

  useEffect(() => {
    fetchCenters();
  }, []);

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-red-100 to-orange-200">
      <h2 className="text-2xl font-bold text-center mb-6 text-red-800">Manage Relief Centers</h2>
      {message && <p className="text-center mb-4 text-green-600">{message}</p>}

      <div className="grid gap-4 max-w-3xl mx-auto">
        {centers.map((center) => (
          <div key={center._id} className="bg-white p-4 rounded-lg shadow flex justify-between items-center">
            <div>
              <h3 className="font-semibold text-lg">{center.name}</h3>
              <p className="text-sm text-gray-600">{center.details}</p>
              <p className="text-xs text-gray-500">
                📍 {center.lat}, {center.lng}
              </p>
            </div>
            <button
              onClick={() => handleDelete(center._id)}
              className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
