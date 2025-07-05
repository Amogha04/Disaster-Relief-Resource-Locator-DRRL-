import { Link } from "react-router-dom";
import { FaGlobeAmericas, FaHome, FaMapMarkerAlt, FaShieldAlt } from "react-icons/fa";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white/10 backdrop-blur-lg border-b border-white/20 text-white px-6 py-4 shadow-md flex items-center justify-between">
      {/* 🔵 Logo on the left */}
      <div className="flex items-center gap-2 text-2xl font-bold">
        <FaGlobeAmericas className="text-blue-300" />
        <span>DRRL</span>
      </div>

      {/* 🗺️ Links on the right */}
      <div className="flex items-center gap-6 text-lg font-medium">
        <Link to="/" className="flex items-center gap-2 hover:text-blue-200 transition">
          <FaHome />
          Home
        </Link>
        <Link to="/map" className="flex items-center gap-2 hover:text-blue-200 transition">
          <FaMapMarkerAlt />
          Map
        </Link>
        <Link to="/admin" className="flex items-center gap-2 hover:text-blue-200 transition">
          <FaShieldAlt />
          Admin
        </Link>
      </div>
    </nav>
  );
}
