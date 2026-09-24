import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const navigate = useNavigate();

  const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/admin/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.detail || "Invalid admin credentials"
        );
      }

      localStorage.setItem(
        "tech4life_admin_token",
        data.access_token
      );

      navigate("/admin/dashboard");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-card">

        <div className="admin-login-icon">
          🛡️
        </div>

        <h1>Tech4Life Admin</h1>

        <p>Secure Administration Portal</p>

        <form onSubmit={handleLogin}>

          <label>Username</label>

          <input
            type="text"
            placeholder="Enter admin username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <label>Password</label>

          <input
            type="password"
            placeholder="Enter admin password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && (
            <div className="admin-error">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="admin-login-button"
          >
            {loading ? "Signing in..." : "Admin Login"}
          </button>

        </form>

        <button
          className="admin-back-button"
          onClick={() => navigate("/")}
        >
          ← Back to Website
        </button>

      </div>
    </div>
  );
}

export default AdminLogin;