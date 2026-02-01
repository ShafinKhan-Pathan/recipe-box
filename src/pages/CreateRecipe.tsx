import { useState } from "react";
import type { Recipe, Ingredient, Difficulty } from "../data/types";
import { Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { saveImageToDB, deleteImageFromDB } from "../utils/imageDB";
import PageHeader from "../components/PageHeader";

const CreateRecipe = () => {
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState<string>("");
  const STORAGE_KEY = "recipes";
  const [recipe, setRecipe] = useState<Recipe>({
    id: "",
    name: "",
    description: "",
    cuisine: "",
    difficulty: "" as Difficulty,
    prepTime: "",
    cookTime: "",
    servings: "",
    imageId: "",
    tags: [],
    ingredients: [],
    instructions: [""],
    notes: "",
    isFavorite: false,
    isShoppingList: false,
    createdAt: "",
  });
  const [ingredients, setIngredients] = useState<Ingredient[]>([
    {
      item: "",
      quantity: "",
      unit: "",
    },
  ]);
  const [tagInput, setTagInput] = useState("");
  const isFormValid = () => {
    if (
      !recipe.name.trim() ||
      !recipe.cuisine.trim() ||
      !recipe.difficulty.trim() ||
      !recipe.description.trim() ||
      !recipe.imageId ||
      Number(recipe.servings) <= 0 ||
      Number(recipe.cookTime) <= 0 ||
      Number(recipe.prepTime) <= 0
    ) {
      return false;
    }
    const isValidIngredients = ingredients.filter(
      (ingredient) =>
        ingredient.item.trim() && ingredient.quantity && ingredient.unit.trim(),
    );
    if (isValidIngredients.length === 0) return false;
    const isValidSteps = recipe.instructions.filter((step) => step.trim());
    if (isValidSteps.length === 0) return false;
    return true;
  };
  const handleSubmit = () => {
    if (!isFormValid()) {
      alert("Please fill all fields before submitting");
      return;
    }
    const copyOfRecipe: Recipe = {
      ...recipe,
      ingredients,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    const existing: Recipe[] = JSON.parse(
      localStorage.getItem(STORAGE_KEY) || "[]",
    );
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify([...existing, copyOfRecipe]),
    );
    alert("Recipe Saved !");
    setRecipe({
      id: "",
      name: "",
      description: "",
      cuisine: "",
      difficulty: "" as Difficulty,
      prepTime: "",
      cookTime: "",
      servings: "",
      imageId: "",
      tags: [],
      ingredients: [],
      instructions: [""],
      notes: "",
      isFavorite: false,
      isShoppingList: false,
      createdAt: "",
    });
    setIngredients([{ item: "", quantity: "", unit: "" }]);
    setTagInput("");
    navigate("/browse");
  };

  return (
    <main className="flex flex-col gap-12 py-10 sm:py-16">
      <PageHeader
        title={
          <>
            Create Your Own <span className="text-flamingo">Recipe</span>
          </>
        }
        subTitle="Add ingredients, steps, and cooking details to build your personal recipe collection."
      />
      <section className="bg-black/60 border border-white/10 rounded-xl p-6 md:p-8 space-y-6">
        <h2 className="text-xl font-semibold">Recipe Details</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="sr-only" htmlFor="recipe-name">
            Recipe name
          </label>
          <input
            id="recipe-name"
            placeholder="Recipe name"
            className="input"
            required
            value={recipe.name}
            onChange={(e) => {
              setRecipe({ ...recipe, name: e.target.value });
            }}
          />
          <label className="sr-only" htmlFor="cuisine-type">
            Cuisine type
          </label>
          <input
            id="cuisine-type"
            placeholder="Cuisine type, e.g. American, Italian "
            className="input"
            required
            value={recipe.cuisine}
            onChange={(e) => {
              setRecipe({ ...recipe, cuisine: e.target.value });
            }}
          />
          <select
            className="input bg-black text-white"
            value={recipe.difficulty}
            onChange={(e) => {
              setRecipe({
                ...recipe,
                difficulty: e.target.value as Difficulty,
              });
            }}
          >
            <option className="bg-black" value="">
              Difficulty level
            </option>
            <option className="bg-black">Easy</option>
            <option className="bg-black">Medium</option>
            <option className="bg-black">Hard</option>
          </select>
          <label className="sr-only" htmlFor="servings">
            Servings
          </label>
          <input
            id="servings"
            type="number"
            placeholder="Servings"
            className="input"
            required
            value={recipe.servings}
            onChange={(e) => {
              setRecipe({
                ...recipe,
                servings: e.target.value === "" ? 0 : Number(e.target.value),
              });
            }}
          />
          <label className="sr-only" htmlFor="preparation-time">
            Preparation time
          </label>
          <input
            id="preparation-time"
            type="number"
            placeholder="Prep time (min)"
            className="input"
            required
            value={recipe.prepTime}
            onChange={(e) => {
              setRecipe({
                ...recipe,
                prepTime: e.target.value === "" ? 0 : Number(e.target.value),
              });
            }}
          />
          <label className="sr-only" htmlFor="cook-time">
            Cook time
          </label>
          <input
            id="cook-time"
            type="number"
            placeholder="Cook time (min)"
            className="input"
            required
            value={recipe.cookTime}
            onChange={(e) => {
              setRecipe({
                ...recipe,
                cookTime: e.target.value === "" ? 0 : Number(e.target.value),
              });
            }}
          />
        </div>
        <label className="sr-only" htmlFor="recipe-description">
          Description
        </label>
        <textarea
          id="recipe-description"
          placeholder="Recipe description"
          className="input h-28 resize-none w-full"
          value={recipe.description}
          onChange={(e) => {
            setRecipe({ ...recipe, description: e.target.value });
          }}
        />
        <div>
          <label className="label">
            Recipe Image <span className="text-flamingo">*</span>
          </label>
          <input
            type="file"
            accept="image/*"
            id="recipe-image"
            required
            className="hidden"
            onChange={async (e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              // If very large file
              if (file.size > 6 * 1024 * 1024) {
                alert("Please upload an image under 5MB");
                return;
              }
              if (recipe.imageId) {
                await deleteImageFromDB(recipe.imageId);
              }
              const imageId = await saveImageToDB(file);
              setRecipe({ ...recipe, imageId });
              const url = URL.createObjectURL(file);
              setImagePreview(url);
            }}
          />
          <label
            htmlFor="recipe-image"
            className="border border-dashed border-white/20 rounded-lg p-6 text-center text-sm text-gray-400 hover:border-flamingo cursor-pointer transition block"
          >
            Click to upload image or paste image URL
          </label>
          {recipe.imageId && (
            <>
              <div className="mt-4 relative">
                <img
                  src={imagePreview}
                  loading="lazy"
                  alt="Recipe preview image"
                  className="max-h-48 rounded-lg object-cover"
                />
                <button
                  type="button"
                  aria-label="Remove recipe image"
                  className="absolute top-2 left-2 bg-black/70 p-2 rounded-full hover:bg-red-500 transition"
                  onClick={async () => {
                    if (recipe.imageId) {
                      await deleteImageFromDB(recipe.imageId);
                    }
                    setRecipe({ ...recipe, imageId: "" });
                    setImagePreview("");
                  }}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </>
          )}
        </div>
        <div>
          <label className="label" htmlFor="tags">
            Tags
          </label>
          <input
            id="tags"
            placeholder="e.g. Pasta, Quick, Comfort Food"
            className="input"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
          />
          <button
            type="button"
            aria-label={`Add tag`}
            className="px-4 py-2 m-2 bg-flamingo text-black rounded-md font-medium"
            onClick={() => {
              if (!tagInput.trim()) return;
              setRecipe({
                ...recipe,
                tags: [...(recipe.tags ?? []), tagInput.trim()],
              });
              setTagInput("");
            }}
          >
            Add
          </button>
          <p className="text-xs text-gray-400 mt-1">
            Tags help users discover recipes on the browse page
          </p>
          <div className="flex flex-wrap gap-2 mt-3 items-center">
            {recipe.tags?.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 text-sm bg-purple-900 rounded-full inline-flex items-center gap-1"
              >
                {tag}
                <button
                  type="button"
                  aria-label={`Remove tag ${tag}`}
                  className="ml-1 flex items-center justify-center w-4 h-4 rounded-full hover:bg-white/20"
                  onClick={() => {
                    setRecipe({
                      ...recipe,
                      tags: recipe.tags!.filter((_, i) => i !== index),
                    });
                  }}
                >
                  <Trash2 />
                </button>
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-black/60 border border-white/10 rounded-xl p-6 md:p-8 space-y-6">
        <h2 className="text-xl font-semibold">Ingredients</h2>
        {ingredients.map((ingredient, index) => {
          const isFilled =
            ingredient.item.trim() ||
            ingredient.quantity.toString().trim() ||
            ingredient.unit.trim();
          const nameId = `ingredient-name-${index}`;
          const qtyId = `ingredient-qty-${index}`;
          const unitId = `ingredient-unit-${index}`;
          return (
            <div
              key={index}
              className="grid grid-cols-1 sm:grid-cols-[1fr,1fr,1fr_auto] gap-3"
            >
              <label className="sr-only" htmlFor={nameId}>
                Ingredient name
              </label>
              <input
                id={nameId}
                placeholder="Ingredient name"
                className="input"
                required
                value={ingredient.item}
                onChange={(e) => {
                  const updated = [...ingredients];
                  updated[index].item = e.target.value;
                  setIngredients(updated);
                }}
              />
              <label className="sr-only" htmlFor={qtyId}>
                Ingredient Quantity
              </label>
              <input
                id={qtyId}
                placeholder="Quantity"
                className="input"
                required
                value={ingredient.quantity}
                onChange={(e) => {
                  const updated = [...ingredients];
                  updated[index].quantity = e.target.value;
                  setIngredients(updated);
                }}
              />
              <label className="sr-only" htmlFor={unitId}>
                Ingredient Unit
              </label>

              <input
                id={unitId}
                placeholder="Unit"
                className="input"
                required
                value={ingredient.unit}
                onChange={(e) => {
                  const updated = [...ingredients];
                  updated[index].unit = e.target.value;
                  setIngredients(updated);
                }}
              />

              {isFilled && ingredients.length > 1 && (
                <button
                  type="button"
                  aria-label="Remove Ingredient"
                  className="text-red-400 hover:text-red-500 mt-2"
                  onClick={() => {
                    setIngredients(ingredients.filter((_, i) => i !== index));
                  }}
                >
                  <Trash2 />
                </button>
              )}
            </div>
          );
        })}

        <button
          className="text-flamingo text-sm hover:underline"
          aria-label="Add more Ingredients"
          onClick={() => {
            const lastItems = ingredients[ingredients.length - 1];
            if (!lastItems.item || !lastItems.quantity || !lastItems.unit)
              return;
            setIngredients([
              ...ingredients,
              { item: "", quantity: "", unit: "" },
            ]);
          }}
        >
          + Add more ingredient
        </button>
      </section>
      <section className="bg-black/60 border border-white/10 rounded-xl p-6 md:p-8 space-y-6">
        <h2 className="text-xl font-semibold">Instructions</h2>

        {recipe.instructions.map((step, index) => {
          const isFilled = step.trim();
          const stepId = `recipe-instruction-${index}`;
          return (
            <div key={index} className="flex justify-center items-center gap-4">
              <label className="sr-only" htmlFor={stepId}>
                Instructions
              </label>

              <textarea
                id={stepId}
                key={index}
                placeholder={`Step ${index + 1}`}
                value={step}
                onChange={(e) => {
                  const updatedStep = [...recipe.instructions];
                  updatedStep[index] = e.target.value;
                  setRecipe({ ...recipe, instructions: updatedStep });
                }}
                className="input h-24 w-full resize-none"
              />
              {isFilled && recipe.instructions.length > 1 && (
                <button
                  type="button"
                  aria-label="Remove instruction"
                  className="text-red-400 hover:text-red-500 mt-2"
                  onClick={() => {
                    const updatedSteps = recipe.instructions.filter(
                      (_, i) => i !== index,
                    );
                    setRecipe({ ...recipe, instructions: updatedSteps });
                  }}
                >
                  <Trash2 />
                </button>
              )}
            </div>
          );
        })}

        <button
          className="text-flamingo text-sm hover:underline"
          aria-label="Add more steps"
          onClick={() => {
            if (recipe.instructions.at(-1) === "") return;
            setRecipe({
              ...recipe,
              instructions: [...recipe.instructions, ""],
            });
          }}
        >
          + Add more steps
        </button>
      </section>
      <section className="flex justify-center">
        <button
          type="button"
          aria-label="Create Recipe"
          className="bg-flamingo text-black font-semibold px-8 py-3 rounded-lg hover:opacity-90 transition"
          onClick={handleSubmit}
        >
          Create Recipe
        </button>
      </section>
    </main>
  );
};

export default CreateRecipe;
