import { useEffect, useState } from "react";
import axios from "axios";

export default function Admin() {
  const [centers, setCenters] = useState([]);
  const [newCenter, setNewCenter] = useState({ name: "", lat: "", lng: "", details: "" });

  // 🔁 Fetch centers
  useEffect(() => {
    axios.get("http://localhost:5000/api/relief-centers")
      .then(res => setCenters(res.data))
      .catch(err => console.error(err));
  }, []);

  // ➕ Add center
  const addCenter = () => {
    axios.post("http://localhost:5000/api/relief-centers", newCenter)
      .then(res => {
        setCenters([...centers, res.data]);
        setNewCenter({ name: "", lat: "", lng: "", details: "" });
      })
      .catch(err => console.error(err));
  };

  // ❌ Delete center
  const deleteCenter = (id) => {
    axios.delete(`http://localhost:5000/api/relief-centers/${id}`)
      .then(() => setCenters(centers.filter(c => c._id !== id)))
      .catch(err => console.error(err));
  };

  return (
    <div className="p-8 text-gray-800 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">🛠 Admin Dashboard</h1>

      {/* Add Form */}
      <div className="space-y-2 mb-6 bg-white p-4 rounded shadow">
        <input type="text" placeholder="Name" className="input" value={newCenter.name} onChange={e => setNewCenter({ ...newCenter, name: e.target.value })} />
        <input type="text" placeholder="Latitude" className="input" value={newCenter.lat} onChange={e => setNewCenter({ ...newCenter, lat: e.target.value })} />
        <input type="text" placeholder="Longitude" className="input" value={newCenter.lng} onChange={e => setNewCenter({ ...newCenter, lng: e.target.value })} />
        <input type="text" placeholder="Details" className="input" value={newCenter.details} onChange={e => setNewCenter({ ...newCenter, details: e.target.value })} />
        <button onClick={addCenter} className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">Add Center</button>
      </div>

      {/* List */}
      <div className="space-y-3">
        {centers.map(center => (
          <div key={center._id} className="bg-white p-4 rounded shadow flex justify-between items-center">
            <div>
              <h2 className="font-bold">{center.name}</h2>
              <p className="text-sm text-gray-500">📍 {center.lat}, {center.lng}</p>
              <p className="text-sm">{center.details}</p>
            </div>
            <button onClick={() => deleteCenter(center._id)} className="text-red-500 font-bold">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}
