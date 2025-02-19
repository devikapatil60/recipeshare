import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const RecipeDetails = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`/api/recipes/${id}`)
      .then((res) => setRecipe(res.data))
      .catch(() => setError("Recipe not found."));
  }, [id]);

  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!recipe) return <p>Loading...</p>;

  return (
    <div className="recipe-details">
      <h2>{recipe.title}</h2>
      <img src={recipe.imageUrl} alt={recipe.title} width="300px" />
      <p><strong>Description:</strong> {recipe.description}</p>
      <p><strong>Ingredients:</strong> {recipe.ingredients}</p>
      <p><strong>Instructions:</strong> {recipe.instructions}</p>

      {/* Link to Edit Recipe Page */}
      <Link to={`/edit-recipe/${recipe.id}`}>
        <button>Edit Recipe</button>
      </Link>
    </div>
  );
};

export default RecipeDetails;
