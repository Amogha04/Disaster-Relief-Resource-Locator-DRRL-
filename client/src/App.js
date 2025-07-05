import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import MapView from "./pages/MapView";
import AddCenter from "./pages/AddCenter";
import ManageCenters from "./pages/ManageCenters";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLogin from "./pages/AdminLogin";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/map" element={<MapView />} />
        <Route path="/admin" element={<AddCenter />} />
        <Route path="/manage" element={<ManageCenters />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        {/* Admin panel will come soon */}
      </Routes>
    </Router>
  );
}

export default App;
