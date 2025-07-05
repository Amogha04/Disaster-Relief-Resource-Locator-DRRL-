import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-600 to-indigo-800 text-white">
      <Navbar />
      <div className="flex flex-col items-center justify-center mt-20 px-4">
        <h1 className="text-4xl sm:text-6xl font-bold mb-4 text-center">
          🚨 Disaster Relief Resource Locator
        </h1>
        <p className="text-lg sm:text-xl max-w-xl text-center mb-6">
          Find the nearest aid centers, shelters, and help points during emergencies in real-time.
        </p>
        <button className="bg-white text-indigo-700 font-semibold px-6 py-3 rounded-xl shadow hover:bg-indigo-100 transition">
          Get Started
        </button>
      </div>
    </div>
  );
}
