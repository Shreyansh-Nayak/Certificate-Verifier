import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import API from "../services/api";
import { auth, googleProvider } from "../firebase";
import { signInWithPopup } from "firebase/auth";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const login = async () => {
    if (!username || !password) {
      setError("Please enter both username/email and password");
      return;
    }

    try {
      setLoading(true);
      setError("");
      const res = await API.post("/auth/login", { email: username, password });

      localStorage.setItem("token", res.data.token);
      navigate("/admin/upload");

    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Login failed. Please check credentials.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      setError("");
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      const token = await user.getIdToken();

      // Send token to backend
      const res = await API.post("/auth/google-login", { token });

      localStorage.setItem("token", res.data.token);
      navigate("/admin/upload");

    } catch (err) {
      console.error("Google Login Error:", err);
      setError("Google Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container flex items-center justify-center" style={{ minHeight: "80vh" }}>
      <div className="card" style={{ maxWidth: "400px", width: "100%" }}>
        <h2 className="text-center mb-4">Admin Login</h2>

        <div className="input-group">
          <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "500" }}>Email / Username</label>
          <input
            className="input-field"
            placeholder="Enter email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && login()}
          />
        </div>

        <div className="input-group">
          <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "500" }}>Password</label>
          <input
            className="input-field"
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && login()}
          />
        </div>

        {error && (
          <div style={{ marginBottom: "1rem", color: "var(--danger-color)", fontSize: "0.9rem", textAlign: "center" }}>
            {error}
          </div>
        )}

        <div className="flex flex-col gap-4">
          <button
            className="btn btn-primary"
            style={{ width: "100%" }}
            onClick={login}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <div className="text-center text-muted">- OR -</div>

          <button
            className="btn btn-secondary"
            style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}
            onClick={handleGoogleLogin}
            disabled={loading}
          >
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" style={{ width: "20px" }} />
            Sign in with Google
          </button>
        </div>

        <div className="text-center mt-4">
          <Link to="/" className="text-primary" style={{ fontSize: "0.9rem" }}>Back to Home</Link>
        </div>
      </div>
    </div>
  );
}
