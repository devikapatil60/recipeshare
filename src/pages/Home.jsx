import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // ✅ Search state
  const [loggedInUser, setLoggedInUser] = useState(localStorage.getItem("loggedInUser"));
  const navigate = useNavigate();

  useEffect(() => {
    const allRecipes = JSON.parse(localStorage.getItem("recipes")) || [];
    setRecipes(allRecipes);
  }, []);

  const deleteRecipe = (id) => {
    if (!loggedInUser) {
      alert("You must be logged in to delete a recipe!");
      return;
    }

    const updatedRecipes = recipes.filter((recipe) => recipe.id !== id);
    localStorage.setItem("recipes", JSON.stringify(updatedRecipes));
    setRecipes(updatedRecipes);
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    setLoggedInUser(null);
    navigate("/login");
  };

  // ✅ Filter Recipes Based on Search Term
  const filteredRecipes = recipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={styles.homeContainer}>
      <div style={styles.navbar}>
        <h2 style={styles.title}>Delicious Recipes</h2>
        {loggedInUser ? (
          <button onClick={handleLogout} style={styles.logoutBtn}>Sign Out</button>
        ) : (
          <Link to="/login" style={styles.loginBtn}>Login</Link>
        )}
      </div>

      {/* ✅ Search Bar */}
      <div style={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search recipes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={styles.searchInput}
        />
      </div>

      <div style={styles.recipeGrid}>
        {filteredRecipes.length === 0 ? (
          <p style={styles.noRecipes}>No recipes found.</p>
        ) : (
          filteredRecipes.map((recipe) => (
            <div key={recipe.id} style={styles.recipeCard}>
              <div style={styles.imageContainer}>
                <img
                  src={recipe.image ? recipe.image : "/default-image.jpg"} 
                  alt={recipe.title}
                  style={styles.recipeImg}
                />
              </div>
              <div style={styles.recipeContent}>
                <h3 style={styles.recipeTitle}>{recipe.title}</h3>
                <p style={styles.recipeDesc}>{recipe.description}</p>
                <p style={styles.postedBy}><strong>Posted by:</strong> {recipe.userEmail}</p>

                <div style={styles.recipeActions}>
                  <Link to={`/recipe/${recipe.id}`} style={styles.viewBtn}>View</Link>
                  {loggedInUser === recipe.userEmail && (
                    <>
                      <Link to={`/edit-recipe/${recipe.id}`} style={styles.editBtn}>Edit</Link>
                      <button onClick={() => deleteRecipe(recipe.id)} style={styles.deleteBtn}>Delete</button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <Link to="/add-recipe" style={styles.addRecipeBtn}>+ Add Recipe</Link>
    </div>
  );
};

// ✅ Updated Styles for Search Input
const styles = {
  homeContainer: {
    textAlign: "center",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f8f9fa",
  },
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    background: "#007bff",
    color: "white",
    borderRadius: "8px",
  },
  title: {
    fontSize: "1.8rem",
  },
  logoutBtn: {
    background: "#dc3545",
    color: "white",
    padding: "8px 12px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  loginBtn: {
    background: "#28a745",
    color: "white",
    padding: "8px 12px",
    textDecoration: "none",
    borderRadius: "5px",
  },
  searchContainer: {
    textAlign: "center",
    margin: "20px 0",
  },
  searchInput: {
    width: "80%",
    maxWidth: "400px",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  recipeGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "20px",
    padding: "20px",
  },
  recipeCard: {
    background: "#fff",
    borderRadius: "12px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    overflow: "hidden",
    padding: "15px",
    textAlign: "left",
  },
  imageContainer: {
    width: "100%",
    height: "200px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    background: "#f9f9f9",
  },
  recipeImg: {
    maxWidth: "100%",
    height: "100%",
    objectFit: "cover",
  },
  recipeContent: {
    padding: "10px",
  },
  recipeTitle: {
    fontSize: "1.5rem",
    color: "#222",
    margin: "10px 0",
  },
  recipeDesc: {
    fontSize: "1rem",
    color: "#666",
    marginBottom: "10px",
  },
  postedBy: {
    fontSize: "0.9rem",
    color: "#777",
  },
  recipeActions: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "10px",
  },
  viewBtn: {
    padding: "8px 12px",
    fontSize: "0.9rem",
    textDecoration: "none",
    borderRadius: "5px",
    color: "white",
    background: "#28a745",
  },
  editBtn: {
    padding: "8px 12px",
    fontSize: "0.9rem",
    textDecoration: "none",
    borderRadius: "5px",
    color: "white",
    background: "#ffc107",
  },
  deleteBtn: {
    padding: "8px 12px",
    fontSize: "0.9rem",
    border: "none",
    cursor: "pointer",
    borderRadius: "5px",
    color: "white",
    background: "#dc3545",
  },
  addRecipeBtn: {
    display: "inline-block",
    marginTop: "20px",
    padding: "12px 20px",
    background: "#007bff",
    color: "white",
    textDecoration: "none",
    borderRadius: "8px",
    fontSize: "1.2rem",
  },
  noRecipes: {
    fontSize: "1.2rem",
    color: "#777",
  },
};

export default Home;
