import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MapView from "./pages/MapView";
import Admin from "./pages/Admin";
import AddCenter from "./pages/AddCenter"; 
import ManageCenters from "./pages/ManageCenters"; 
import AdminLogin from "./pages/AdminLogin"; 
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/map" element={<MapView />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/add" element={<AddCenter />} />
         {/* 🔐 Protected Routes */}
        <Route
          path="/admin/add"
          element={
            <ProtectedRoute>
              <AddCenter />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/manage"
          element={
            <ProtectedRoute>
              <ManageCenters />
            </ProtectedRoute>
          }/>
        <Route path="/admin/login" element={<AdminLogin />} />
      </Routes>
    </Router>
  );
}

export default App;
