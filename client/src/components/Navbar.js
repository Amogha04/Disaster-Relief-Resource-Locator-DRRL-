import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("drrl_admin_token");

  const handleLogout = () => {
    localStorage.removeItem("drrl_admin_token");
    navigate("/admin");
  };

  return (
    <nav className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
      <h1 className="text-xl font-bold text-indigo-700">DRRL</h1>

      <div className="space-x-4 text-sm sm:text-base flex items-center">
        <Link to="/" className="text-gray-700 hover:text-indigo-700 font-medium">Home</Link>
        <Link to="/map" className="text-gray-700 hover:text-indigo-700 font-medium">Map</Link>
        
        {!token ? (
          <Link to="/admin" className="text-gray-700 hover:text-indigo-700 font-medium">Admin</Link>
        ) : (
          <>
            <Link to="/admin/add" className="text-gray-700 hover:text-indigo-700 font-medium">Add Center</Link>
            <Link to="/admin/manage" className="text-gray-700 hover:text-indigo-700 font-medium">Manage</Link>
            <button
              onClick={handleLogout}
              className="text-red-500 hover:text-red-700 font-medium ml-2"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
