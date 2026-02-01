import { useEffect, useState } from "react";
import type { Recipe } from "../data/types";
import RecipeCard from "../components/RecipeCard";
import { useNavigate } from "react-router-dom";
import PageHeader from "../components/PageHeader";

const Favorites = () => {
  const [favorites, setFavorites] = useState<Recipe[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedRecipe = JSON.parse(localStorage.getItem("recipes") || "[]");
    setFavorites(storedRecipe.filter((rec: Recipe) => rec.isFavorite));
  }, []);
  return (
    <div className="p-4 md:p-10">
      <PageHeader
        title={
          <>
            My <span className="text-flamingo">Favorites</span>
          </>
        }
        subTitle="All the recipes you love, saved in one place."
      />
      {favorites.length === 0 ? (
        <p className="text-center text-4xl mt-10 text-gray-400">No favorite recipes yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {favorites.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onClick={() => navigate(`/recipe/${recipe.id}`)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
