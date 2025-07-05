import { useState } from "react";
import axios from "axios";

export default function AddCenter() {
  const [formData, setFormData] = useState({
    name: "",
    lat: "",
    lng: "",
    details: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("drrl_admin_token");

    try {
      const res = await axios.post("http://localhost:5000/api/relief-centers", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 201) {
        setMessage("✅ Relief center added successfully.");
        setFormData({ name: "", lat: "", lng: "", details: "" });
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to add relief center.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-md p-6 w-full max-w-lg"
      >
        <h2 className="text-2xl font-bold text-indigo-700 mb-4">Add Relief Center</h2>

        <label className="block mb-2 text-sm font-medium text-gray-700">
          Center Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="mt-1 w-full px-3 py-2 border rounded-lg shadow-sm"
          />
        </label>

        <label className="block mb-2 text-sm font-medium text-gray-700">
          Latitude:
          <input
            type="number"
            name="lat"
            value={formData.lat}
            onChange={handleChange}
            required
            step="any"
            className="mt-1 w-full px-3 py-2 border rounded-lg shadow-sm"
          />
        </label>

        <label className="block mb-2 text-sm font-medium text-gray-700">
          Longitude:
          <input
            type="number"
            name="lng"
            value={formData.lng}
            onChange={handleChange}
            required
            step="any"
            className="mt-1 w-full px-3 py-2 border rounded-lg shadow-sm"
          />
        </label>

        <label className="block mb-4 text-sm font-medium text-gray-700">
          Details:
          <textarea
            name="details"
            value={formData.details}
            onChange={handleChange}
            rows="3"
            className="mt-1 w-full px-3 py-2 border rounded-lg shadow-sm"
          ></textarea>
        </label>

        <button
          type="submit"
          className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          Add Center
        </button>

        {message && <p className="mt-4 text-sm">{message}</p>}
      </form>
    </div>
  );
}
