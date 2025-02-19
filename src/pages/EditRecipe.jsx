import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditRecipe = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState({
    title: "",
    description: "",
    image: "",
  });

  useEffect(() => {
    const allRecipes = JSON.parse(localStorage.getItem("recipes")) || [];
    const existingRecipe = allRecipes.find((r) => r.id === parseInt(id));

    if (existingRecipe) {
      setRecipe(existingRecipe);
    } else {
      alert("Recipe not found!");
      navigate("/");
    }
  }, [id, navigate]);

  const handleChange = (e) => {
    setRecipe({ ...recipe, [e.target.name]: e.target.value });
  };

  // Convert image to Base64 for storage
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setRecipe({ ...recipe, image: reader.result });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let allRecipes = JSON.parse(localStorage.getItem("recipes")) || [];
    allRecipes = allRecipes.map((r) => (r.id === parseInt(id) ? recipe : r));
    localStorage.setItem("recipes", JSON.stringify(allRecipes));

    alert("Recipe updated successfully!");
    navigate("/");
  };

  return (
    <div className="form-container">
      <h2>Edit Recipe</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Recipe Title"
          value={recipe.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Recipe Description"
          value={recipe.description}
          onChange={handleChange}
          required
        />
        <input type="file" accept="image/*" onChange={handleImageChange} />
        
        {recipe.image && (
          <img
            src={recipe.image}
            alt="Preview"
            style={{ width: "100px", height: "100px", marginTop: "10px" }}
          />
        )}
        
        <button type="submit">Update Recipe</button>
      </form>
    </div>
  );
};

export default EditRecipe;
