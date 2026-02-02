import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Recipe } from "../data/types";
import { useRecipeImage } from "../hooks/useRecipeImage";
import PageHeader from "../components/PageHeader";

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState<Recipe | null>(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("recipes") || "[]");
    const found = stored.find((r: Recipe) => r.id === id);
    setRecipe(found);
  }, [id]);

  const imageSrc = useRecipeImage(recipe?.imageId, recipe?.imageURL);

  if (!recipe) return <p className="text-center mt-10">Recipe not found</p>;
  const addToShoppingList = (id: string) => {
    const recipes: Recipe[] = JSON.parse(
      localStorage.getItem("recipes") || "[]",
    );

    const updated = recipes.map((recipe) =>
      recipe.id === id ? { ...recipe, isShoppingList: true } : recipe,
    );

    localStorage.setItem("recipes", JSON.stringify(updated));
    // updateRecipe helps to check add to shopping button state.
    const updatedRecipe = updated.find((recipe) => recipe.id === id);
    setRecipe(updatedRecipe || null);
    window.dispatchEvent(new Event("shopping-updated"));
    // alert("Added to shopping list !");
  };
  return (
    <div className="max-w-6xl mx-auto p-4 space-y-8">
      <PageHeader
        title={
          <>
            Recipe <span className="text-flamingo">Details</span>
          </>
        }
        subTitle="Everything you need to cook this dish - ingredients, steps, and tips."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <img
          src={imageSrc}
          alt={`${recipe.name} recipe image`}
          loading="lazy"
          className="w-full h-80 md:h-full object-cover rounded-xl"
        />
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-flamingo">{recipe.name}</h1>

          <p className="text-gray-300 text-xl">{recipe.description}</p>

          <div className="grid grid-cols-2 gap-4 text-gray-400">
            <p>🍽 Cuisine: {recipe.cuisine}</p>
            <p>🔥 Difficulty: {recipe.difficulty}</p>
            <p>⏱ Prep: {recipe.prepTime} mins</p>
            <p>🍳 Cook: {recipe.cookTime} mins</p>
            <p>👤 Servings: {recipe.servings}</p>
          </div>

          <div className="flex flex-wrap gap-2">
            {recipe.tags?.map((tag, i) => (
              <span
                key={i}
                className="px-3 py-1 text-sm rounded-full bg-purple-900"
              >
                {tag}
              </span>
            ))}
          </div>
          <section className="flex">
            <button
              type="button"
              aria-label={
                recipe.isShoppingList
                  ? `${recipe.name} already in shopping list`
                  : `Add ${recipe.name} to shopping list`
              }
              disabled={recipe.isShoppingList}
              className={`w-full md:w-auto font-semibold px-8 py-2 rounded-lg transition ${recipe.isShoppingList ? "bg-gray-600 text-gray-300 cursor-not-allowed" : "bg-flamingo text-black hover:opacity-90"}`}
              onClick={() => addToShoppingList(recipe.id)}
            >
              {recipe.isShoppingList ? "Added to Shopping" : "Add to Shopping"}
            </button>
          </section>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-black/60 border border-white/10 rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">Ingredients:</h2>
          <ul className="space-y-2 text-gray-300">
            {recipe.ingredients.map((ing, i) => (
              <li key={i}>
                • {ing.item} – {ing.quantity} {ing.unit}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-black/60 border border-white/10 rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">Steps:</h2>
          <ol className="space-y-3 text-gray-300 list-decimal list-inside">
            {recipe.instructions.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
