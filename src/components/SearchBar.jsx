import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    if (typeof onSearch === "function") {
      onSearch(searchTerm);
    } else {
      console.error("onSearch is not a function. Make sure it's passed as a prop.");
    }
  };

  return (
    <div style={styles.searchContainer}>
      <input
        type="text"
        placeholder="Search recipes..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={styles.searchInput}
      />
      <button onClick={handleSearch} style={styles.searchButton}>Search</button>
    </div>
  );
};

// Inline CSS Styles
const styles = {
  searchContainer: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "20px",
  },
  searchInput: {
    padding: "10px",
    width: "250px",
    fontSize: "1rem",
    border: "1px solid #ccc",
    borderRadius: "5px",
  },
  searchButton: {
    padding: "10px 15px",
    marginLeft: "10px",
    fontSize: "1rem",
    background: "#007bff",
    color: "white",
    border: "none",
    cursor: "pointer",
    borderRadius: "5px",
  },
};

export default SearchBar;