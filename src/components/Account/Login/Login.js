import React, { useState } from "react";
import "./Login.css";
import { auth } from "../../../Firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      setSuccess(true);
      setTimeout(() => {
        navigate("/panel");
      }, 800);
    } catch {
      setError("Email ose fjalëkalim i pasaktë.");
    }
    setLoading(false);
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1>Hyrje</h1>
        <p className="subtitle">Shkruaj kredencialet për të vazhduar</p>

        <div className="form-grid">
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Fjalëkalimi</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Duke u futur..." : "Hyr"}
        </button>

        {error && (
          <p className="error">
            {error}
          </p>
        )}

        {success && (
          <p className="success">
            Mirë se u ktheve përsëri!
          </p>
        )}

        <p className="redirect-text">
          Nuk ke llogari?{" "}
          <a href="/register" className="register-link">
            Regjistrohu këtu
          </a>
        </p>
      </form>
    </div>
  );
}