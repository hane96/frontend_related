

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (username === "admin" && password === "admin123") {
      login("adminToken");
      setError("");
      navigate("/admin", { replace: true });
    } 
    else if (username === "user" && password === "user123") {
      login("userToken");
      setError("");
      navigate("/user", { replace: true });
    } 
    else {
      setError("帳號或密碼錯誤");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center">登入</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded"
          >
            登入
          </button>

          {error && <p className="text-red-500 text-center">{error}</p>}
        </form>
        <p className="text-gray-500 mt-2">測試用帳號(user權限): user</p>
        <p className="text-gray-500">測試用密碼(user權限): user123</p>
        <p className="text-gray-500 mt-2">測試用帳號(admin權限): admin</p>
        <p className="text-gray-500">測試用密碼(admin權限): admin123</p>
      </div>
    </div>
  );
}

export default Login;

