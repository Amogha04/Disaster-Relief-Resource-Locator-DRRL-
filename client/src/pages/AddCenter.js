// src/pages/AddCenter.js
import { useState } from "react";
import axios from "axios";

export default function AddCenter() {
  const [form, setForm] = useState({
    name: "",
    lat: "",
    lng: "",
    details: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/relief-centers", {
        name: form.name,
        lat: parseFloat(form.lat),
        lng: parseFloat(form.lng),
        details: form.details,
      });
      setMessage("✅ Center added successfully!");
      setForm({ name: "", lat: "", lng: "", details: "" });
    } catch (err) {
      setMessage("❌ Error adding center");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
      <form
        onSubmit={handleSubmit}
        className="bg-white text-black p-8 rounded-xl shadow-lg w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">Add Relief Center</h2>

        <input
          type="text"
          name="name"
          placeholder="Center Name"
          value={form.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="number"
          name="lat"
          placeholder="Latitude"
          value={form.lat}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="number"
          name="lng"
          placeholder="Longitude"
          value={form.lng}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          name="details"
          placeholder="Details (food, water, shelter, etc.)"
          value={form.details}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          rows={3}
          required
        />

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white font-bold py-2 rounded hover:bg-indigo-700"
        >
          Add Center
        </button>

        {message && <p className="text-center mt-2">{message}</p>}
      </form>
    </div>
  );
}
