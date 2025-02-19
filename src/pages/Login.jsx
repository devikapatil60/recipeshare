import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser) {
      setError("No registered user found!");
      return;
    }

    if (storedUser.email === credentials.email && storedUser.password === credentials.password) {
      localStorage.setItem("loggedInUser", storedUser.email); // ✅ Save logged-in user
      alert("Login Successful!");
      navigate("/");
    } else {
      setError("Invalid email or password!");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Login</h2>
      {error && <p style={styles.error}>{error}</p>}
      <form onSubmit={handleLogin} style={styles.form}>
        <input type="email" name="email" placeholder="Email" value={credentials.email} onChange={handleChange} style={styles.input} />
        <input type="password" name="password" placeholder="Password" value={credentials.password} onChange={handleChange} style={styles.input} />
        <button type="submit" style={styles.button}>Login</button>
      </form>
      
      {/* ✅ Register Here Button */}
      <p style={styles.registerText}>
        Don't have an account? <Link to="/register" style={styles.registerLink}>Register here</Link>
      </p>
    </div>
  );
};

// ✅ Inline CSS Styles
const styles = {
  container: {
    maxWidth: "400px",
    margin: "50px auto",
    padding: "20px",
    background: "white",
    borderRadius: "8px",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
  },
  heading: { marginBottom: "15px" },
  error: { color: "red", marginBottom: "10px" },
  form: { display: "flex", flexDirection: "column" },
  input: {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    border: "1px solid #ddd",
    borderRadius: "5px",
  },
  button: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    cursor: "pointer",
    borderRadius: "5px",
    transition: "0.3s",
  },
  registerText: {
    marginTop: "15px",
  },
  registerLink: {
    color: "#28a745",
    textDecoration: "none",
    fontWeight: "bold",
  },
};

export default Login;
