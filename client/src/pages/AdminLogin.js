import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      localStorage.setItem("drrl_admin_token", res.data.token);
      navigate("/admin"); // 🔁 Redirect to Admin Dashboard
    } catch (err) {
      setErrorMsg("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-indigo-800 text-white">
      <div className="bg-white p-8 rounded-xl shadow w-80 text-gray-800">
        <h2 className="text-xl font-bold mb-4 text-center text-indigo-700">Admin Login</h2>
        {errorMsg && <p className="text-red-600 text-sm mb-3">{errorMsg}</p>}

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-indigo-700 text-white py-2 rounded hover:bg-indigo-800"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
