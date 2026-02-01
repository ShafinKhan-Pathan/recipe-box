import { useEffect, useState } from "react";
import type { Recipe } from "../data/types";
import RecipeCard from "../components/RecipeCard";
import { useNavigate } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import PageHeader from "../components/PageHeader";
import RecipeCardSkeleton from "../components/RecipeCardSkeleton";

const BrowseRecipes = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const getStoredRecipes = JSON.parse(
      localStorage.getItem("recipes") || "[]",
    );
    const validRecipes = getStoredRecipes.filter(
      (recipe: any) => recipe && recipe.id,
    );
    setRecipes(validRecipes);
    setLoading(false);
  }, []);
  useEffect(() => {
    setFilteredRecipes(recipes);
  }, [recipes]);
  useEffect(() => {
    const timeout = setTimeout(() => {
      let result = [...recipes];
      if (search.trim()) {
        const query = search.toLowerCase();
        result = result.filter(
          (r) =>
            r.name.toLowerCase().includes(query) ||
            r.cuisine.toLowerCase().includes(query) ||
            r.tags?.some((tag) => tag.toLowerCase().includes(query)),
        );
      }
      if (filter === "difficulty") {
        result.sort((a, b) => {
          if (a.difficulty === "Easy") return -1;
          if (b.difficulty === "Easy") return 1;
          if (a.difficulty === "Medium") return -1;
          if (b.difficulty === "Medium") return 1;
          return 0;
        });
      }
      if (filter === "cookTime") {
        result.sort(
          (a, b) => Number(a.cookTime || 0) - Number(b.cookTime || 0),
        );
      }
      if (filter === "servings") {
        result.sort(
          (a, b) => Number(a.servings || 0) - Number(b.servings || 0),
        );
      }
      setFilteredRecipes(result);
    }, 300);
    return () => clearTimeout(timeout);
  }, [search, recipes, filter]);

  const toggleFavorite = (id: string) => {
    const updated = recipes.map((recipe) =>
      recipe.id === id ? { ...recipe, isFavorite: !recipe.isFavorite } : recipe,
    );
    setRecipes(updated);
    localStorage.setItem("recipes", JSON.stringify(updated));
  };

  return (
    <div className="p-4 space-y-4 md:p-10">
      <PageHeader
        title={
          <>
            Discover <span className="text-flamingo">Great Recipes</span>
          </>
        }
        subTitle="Find and explore recipes tailored to your taste."
      />
      <div className="flex flex-col md:flex-row justify-center items-center gap-4">
        <div className="relative w-full">
          <input
            type="text"
            className="input w-full bg-black border-2 p-2 text-gray-400 rounded-xl"
            placeholder="Search for recipes"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="relative w-full">
          <select
            name="Filter"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="input w-full bg-black border-2 p-2 text-gray-400 rounded-xl appearance-none"
          >
            <option className="bg-black" value="">
              Filter
            </option>
            <option className="bg-black" value="difficulty">
              By Difficulty
            </option>
            <option className="bg-black" value="cookTime">
              By Cook Time
            </option>
            <option className="bg-black" value="servings">
              By Servings
            </option>
            {/* <option value="">By Difficulty</option> */}
          </select>
          <ChevronDown className="absolute top-2 right-4 cursor-pointer" />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-2 sm:p-10">
        {loading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <RecipeCardSkeleton key={i} />
          ))
        ) : filteredRecipes.length === 0 ? (
          <div className="col-span-full text-center text-gray-400 space-y-2">
            <h3 className="text-xl md:text-3xl font-semibold">
              No recipes found
            </h3>
            <p className="text-lg md:text-2xl">
              Try searching with a different keyword or clear filters.
            </p>
          </div>
        ) : (
          filteredRecipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onClick={() => navigate(`/recipe/${recipe.id}`)}
              onToggleFavorite={() => toggleFavorite(recipe.id)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default BrowseRecipes;
