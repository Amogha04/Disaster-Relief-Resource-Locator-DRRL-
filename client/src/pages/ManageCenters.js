import { useEffect, useState } from "react";
import axios from "axios";

export default function ManageCenters() {
  const [centers, setCenters] = useState([]);
  const [error, setError] = useState("");

  // ✅ Fetch centers
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/relief-centers")
      .then((res) => setCenters(res.data))
      .catch((err) => {
        console.error("Fetch error:", err);
        setError("Failed to load relief centers");
      });
  }, []);

  // ❌ Delete handler
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/relief-centers/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCenters(centers.filter((c) => c._id !== id));
    } catch (err) {
      console.error("Delete error:", err);
      setError("Deletion failed");
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-indigo-700 mb-4">Manage Relief Centers</h1>
      {error && <p className="text-red-600 mb-4">{error}</p>}
      <div className="space-y-4">
        {centers.map((center) => (
          <div
            key={center._id}
            className="bg-white shadow p-4 rounded flex justify-between items-center"
          >
            <div>
              <h2 className="text-lg font-semibold text-gray-800">{center.name}</h2>
              <p className="text-sm text-gray-600">{center.details}</p>
              <p className="text-xs text-gray-400">
                📍 {center.lat}, {center.lng}
              </p>
            </div>
            <button
              onClick={() => handleDelete(center._id)}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
