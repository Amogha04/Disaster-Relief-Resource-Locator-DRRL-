import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
      <h1 className="text-xl font-bold text-indigo-700">DRRL</h1>
      <div className="space-x-4 text-sm sm:text-base">
        <Link to="/" className="text-gray-700 hover:text-indigo-700 font-medium">Home</Link>
        <Link to="/map" className="text-gray-700 hover:text-indigo-700 font-medium">Map</Link>
        <Link to="/admin/login" className="text-gray-700 hover:text-indigo-700 font-medium">Admin</Link>
        <Link to="/manage" className="text-gray-700 hover:text-indigo-700 font-medium">Manage</Link>
      </div>
    </nav>
  );
}
