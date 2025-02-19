import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import AddRecipe from "./pages/AddRecipe";
import EditRecipe from "./pages/EditRecipe";
import RecipeDetails from "./pages/RecipeDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "./App.css";

const App = () => {
  const [recipes, setRecipes] = useState([]);

  const addNewRecipe = (newRecipe) => {
    const updatedRecipes = [newRecipe, ...recipes];
    setRecipes(updatedRecipes);
  };

  const deleteRecipe = (id) => {
    const updatedRecipes = recipes.filter((recipe) => recipe.id !== id);
    setRecipes(updatedRecipes);
  };

  return (
    <Router>
      <Navbar />
      <Routes>
        {/* ✅ Pass full recipes state to Home (since filtering is handled inside Home now) */}
        <Route path="/" element={<Home recipes={recipes} deleteRecipe={deleteRecipe} />} />
        <Route path="/add-recipe" element={<AddRecipe addNewRecipe={addNewRecipe} />} />
        <Route path="/edit-recipe/:id" element={<EditRecipe />} />
        <Route path="/recipe/:id" element={<RecipeDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
};

export default App;
