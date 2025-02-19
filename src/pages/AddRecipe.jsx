import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddRecipe = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    if (!title || !description) {
      setError("Please fill all fields.");
      return;
    }

    const loggedInUser = localStorage.getItem("loggedInUser");

    if (!loggedInUser) {
      // ✅ Store data in sessionStorage before redirecting
      sessionStorage.setItem("tempRecipe", JSON.stringify({ title, description, image }));
      navigate("/login");  // Redirect to login page
      return;
    }

    // ✅ If logged in, save the recipe
    const newRecipe = {
      id: Date.now(),
      title,
      description,
      image,
      userEmail: loggedInUser,
    };

    const existingRecipes = JSON.parse(localStorage.getItem("recipes")) || [];
    existingRecipes.push(newRecipe);
    localStorage.setItem("recipes", JSON.stringify(existingRecipes));

    alert("Recipe added successfully!");
    navigate("/");
  };

  // ✅ Restore data if user was redirected to login and came back
  useState(() => {
    const tempRecipe = JSON.parse(sessionStorage.getItem("tempRecipe"));
    if (tempRecipe) {
      setTitle(tempRecipe.title || "");
      setDescription(tempRecipe.description || "");
      setImage(tempRecipe.image || null);
      sessionStorage.removeItem("tempRecipe");  // Clear stored data
    }
  }, []);

  return (
    <div style={styles.container}>
      <h2>Add New Recipe</h2>
      {error && <p style={styles.error}>{error}</p>}
      
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Recipe Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={styles.input}
        />
        <textarea
          placeholder="Recipe Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={styles.textarea}
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files[0];
            if (file) {
              const reader = new FileReader();
              reader.onloadend = () => {
                setImage(reader.result); // Convert image to Base64
              };
              reader.readAsDataURL(file);
            }
          }}
          style={styles.fileInput}
        />
        <button type="submit" style={styles.submitBtn}>Add Recipe</button>
      </form>
    </div>
  );
};

// ✅ Inline Styles
const styles = {
  container: {
    textAlign: "center",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f8f9fa",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    width: "300px",
    margin: "0 auto",
    gap: "10px",
  },
  input: {
    padding: "10px",
    fontSize: "1rem",
    border: "1px solid #ccc",
    borderRadius: "5px",
  },
  textarea: {
    padding: "10px",
    fontSize: "1rem",
    border: "1px solid #ccc",
    borderRadius: "5px",
    height: "80px",
  },
  fileInput: {
    padding: "10px",
  },
  submitBtn: {
    padding: "10px",
    fontSize: "1rem",
    border: "none",
    cursor: "pointer",
    borderRadius: "5px",
    color: "white",
    background: "#007bff",
  },
  error: {
    color: "red",
    fontSize: "1rem",
  },
};

export default AddRecipe;
