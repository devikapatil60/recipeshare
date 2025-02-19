import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav style={styles.navbar}>
      <h2 style={styles.logo}>TasteHub</h2>
      <div style={styles.links}>
        <StyledLink to="/">Home</StyledLink>
        <StyledLink to="/add-recipe">Add Recipe</StyledLink>
        <StyledLink to="/login">Login</StyledLink>
        <Link to="/register" style={styles.registerButton}>Register</Link>
      </div>
    </nav>
  );
};

// ✅ Inline CSS
const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#333",
    padding: "15px 30px",
    position: "sticky",
    top: 0,
    zIndex: 1000,
    boxShadow: "0 4px 10px rgba(193, 120, 3, 0.1)",
    transition: "background-color 0.3s ease, box-shadow 0.3s ease",
  },
  logo: {
    color: "white",
    fontSize: "24px",
    fontWeight: "bold",
    textDecoration: "none",
  },
  links: {
    display: "flex",
    alignItems: "center",
  },
  link: {
    color: "white",
    textDecoration: "none",
    padding: "10px",
    marginRight: "10px",
    fontWeight: "500",
    transition: "background-color 0.3s ease",
  },
  linkHover: {
    backgroundColor: "#e91e63", // Adding hover effect color
  },
  registerButton: {
    padding: "8px 12px",
    backgroundColor: "#28a745",
    color: "white",
    borderRadius: "5px",
    textDecoration: "none",
  },
};

// Hover effect on links
const handleHover = (event) => {
  event.target.style.backgroundColor = "#e91e63";
};

const handleHoverOut = (event) => {
  event.target.style.backgroundColor = "";
};

// Wrap the hover effect in a function component
const StyledLink = ({ to, children }) => (
  <Link
    to={to}
    style={styles.link}
    onMouseEnter={handleHover}
    onMouseLeave={handleHoverOut}
  >
    {children}
  </Link>
);

export default Navbar;
