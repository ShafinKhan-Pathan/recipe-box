import type { Recipe } from "../data/types";
import {
  CookingPot,
  Flame,
  Heart,
  Tag,
  Timer,
  User,
  UtensilsCrossed,
} from "lucide-react";
import { useRecipeImage } from "../hooks/useRecipeImage";

interface RecipeCardProps {
  recipe: Recipe;
  imageSrc?: string;
  onClick?: () => void;
  onToggleFavorite?: () => void;
}

const RecipeCard = ({ recipe, onClick, onToggleFavorite }: RecipeCardProps) => {
  const imageSrc = useRecipeImage(recipe.imageId, recipe.imageURL);
  return (
    <div
      className="bg-black/60 hover:border-b-flamingo/30 hover:shadow-2xl hover:shadow-white/5 border border-white/10 rounded-xl overflow-hidden cursor-pointer hover:scale-[1.01] transition"
      onClick={onClick}
    >
      <div className="relative">
        <img
          src={imageSrc}
          alt={`${recipe.name} recipe image`}
          loading="lazy"
          decoding="async"
          width={400}
          height={300}
          className="h-48 w-full object-cover"
        />
        <p
          className={`absolute bottom-0 flex text-sm justify-center items-center bg-black/60 p-1 rounded-r-sm transition ${recipe.difficulty === "Easy" ? "text-emerald-400 drop-shadow-[0_0_6px_rgba(52,211,153,0.6)]" : recipe.difficulty === "Medium" ? "text-amber-400 drop-shadow-[0_0_6px_rgba(251,191,36,0.6)]" : "text-rose-500 drop-shadow-[0_0_6px_rgba(244,63,94,0.6)]"}`}
        >
          <span>
            <Flame className="h-4 w-4" />
          </span>
          {recipe.difficulty}
        </p>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite?.();
          }}
          aria-label={
            recipe.isFavorite ? "Remove from favorites" : "Add to favorites"
          }
          className="absolute top-3 right-3 bg-black/60 p-2 rounded-full transition"
        >
          {!recipe.isFavorite ? (
            <Heart
              size={"20"}
              className="hover:fill-red-500 hover:text-red-500"
            />
          ) : (
            <Heart size={"20"} className="fill-red-500 text-red-500" />
          )}
        </button>
      </div>
      <div className="p-4 space-y-2">
        <h3 className="text-lg font-semibold">
          <span className="text-flamingo">{recipe.name}</span>
        </h3>
        <p className="text-sm text-gray-300">{recipe.description}</p>
        <div className="flex gap-4">
          <p className="flex justify-center gap-1 items-center text-xs text-gray-400">
            <UtensilsCrossed className="w-4 h-4" />
            {recipe.cuisine}
          </p>
          <p className="flex justify-center gap-1 items-center text-xs text-gray-400">
            <Timer className="w-4 h-4" />
            {recipe.prepTime} Mins
          </p>
        </div>
        <div className="flex gap-4">
          <p className="flex justify-center gap-1 items-center text-xs text-gray-400">
            <CookingPot className="w-4 h-4" />
            {recipe.cookTime} Mins
          </p>
          <p className="flex justify-center gap-1 items-center text-xs text-gray-400">
            <User className="w-4 h-4" />
            {recipe.servings} People
          </p>
        </div>
        <div className="flex flex-wrap gap-2 pt-4">
          {recipe.tags?.slice(0, 2).map((tag, i) => (
            <span
              key={i}
              className="flex items-center gap-1 px-3 py-1 text-xs rounded-full bg-purple-900"
            >
              <Tag className="w-3 h-3" />
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
