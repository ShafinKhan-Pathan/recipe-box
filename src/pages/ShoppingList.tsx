import { useEffect, useState } from "react";
import type { Recipe, TotalIngredient } from "../data/types";
import { ArrowDownToDot, Trash2 } from "lucide-react";
import PageHeader from "../components/PageHeader";

const ShoppingList = () => {
  const [selectedRecipes, setSelectedRecipes] = useState<Recipe[]>([]);
  const [totals, setTotals] = useState<TotalIngredient[]>([]);

  useEffect(() => {
    const stored: Recipe[] = JSON.parse(
      localStorage.getItem("recipes") || "[]",
    );

    const selected = stored.filter((r) => r.isShoppingList);
    setSelectedRecipes(selected);
  }, []);
  useEffect(() => {
    if (selectedRecipes.length > 0) {
      calculateTotals();
    } else {
      setTotals([]);
    }
  }, [selectedRecipes]);

  const calculateTotals = () => {
    const result = selectedRecipes
      .flatMap((recipe) =>
        recipe.ingredients.map((ing) => ({
          ...ing,
          recipeId: recipe.id,
        })),
      )
      .reduce((acc: TotalIngredient[], ing) => {
        const qty = Number(ing.quantity) || 0;

        const found = acc.find(
          (i) => i.item === ing.item && i.unit === ing.unit,
        );

        if (found) {
          found.quantity += qty;
          found.count += 1;
        } else {
          acc.push({
            item: ing.item,
            unit: ing.unit,
            quantity: qty,
            count: 1,
          });
        }
        return acc;
      }, []);

    setTotals(result);
  };

  const removeFromShoppingList = (id: string) => {
    const stored: Recipe[] = JSON.parse(
      localStorage.getItem("recipes") || "[]",
    );

    const updated = stored.map((recipe) =>
      recipe.id === id ? { ...recipe, isShoppingList: false } : recipe,
    );

    localStorage.setItem("recipes", JSON.stringify(updated));
    window.dispatchEvent(new Event("shopping-updated"));
    loadShoppingRecipes();
  };
  const loadShoppingRecipes = () => {
    const stored: Recipe[] = JSON.parse(
      localStorage.getItem("recipes") || "[]",
    );

    const selected = stored.filter((r) => r.isShoppingList);
    setSelectedRecipes(selected);
  };
  const commonItems = totals.filter((i) => i.count > 1);
  const otherItems = totals.filter((i) => i.count === 1);
  const IngredientRow = ({ item, quantity, unit }: TotalIngredient) => (
    <div className="flex justify-between items-center p-2 bg-black/40 border border-white/10 rounded-lg">
      <span className="text-gray-300">{item}</span>
      <span className="text-gray-400 w-28 text-right">
        {quantity} {unit}
      </span>
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-8">
      <PageHeader
        title={
          <>
            Your <span className="text-flamingo">Shopping List</span>
          </>
        }
        subTitle="Combined ingredients from all selected recipes."
      />
      {selectedRecipes.length === 0 && (
        <p className="text-center text-4xl mt-10 text-gray-400">
          No recipes added to shopping list.
        </p>
      )}
      {selectedRecipes.length > 0 && (
        <div className="bg-black/60 border border-white/10 rounded-xl p-5">
          <h2 className="text-xl font-semibold mb-4">Selected Recipes</h2>

          <div className="space-y-3">
            {selectedRecipes.map((recipe) => (
              <div
                key={recipe.id}
                className="flex items-center justify-between bg-black/40 border border-white/10 rounded-lg px-4 py-3"
              >
                <span className="text-gray-200">{recipe.name}</span>
                <button
                  aria-label={`Remove ${recipe.name} from shopping list`}
                  title="Remove from shopping list"
                  onClick={() => removeFromShoppingList(recipe.id)}
                  className="text-gray-400 hover:text-red-500 transition"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>

          <div className="text-center mt-4 text-gray-300">
            <span className=" text-flamingo flex flex-col justify-center items-center gap-2">
              All set! Here’s what you need to shop
              <span>
                <ArrowDownToDot />
              </span>
            </span>
          </div>
        </div>
      )}
      {totals.length > 0 && (
        <div className="space-y-6">
          {commonItems.length > 0 && (
            <div className="bg-black/60 border border-white/10 rounded-xl p-5">
              <h2 className="text-xl font-semibold mb-4">Common Ingredients</h2>

              <div className="space-y-2">
                {commonItems.map((ing, i) => (
                  <IngredientRow key={i} {...ing} />
                ))}
              </div>
            </div>
          )}
          {otherItems.length > 0 && (
            <div className="bg-black/60 border border-white/10 rounded-xl p-5">
              <h2 className="text-xl font-semibold mb-4">
                {selectedRecipes.length === 1
                  ? "Ingredients"
                  : "Other Ingredients"}
              </h2>

              <div className="gap-2 grid grid-col-1 md:grid-cols-2">
                {otherItems.map((ing, i) => (
                  <IngredientRow key={i} {...ing} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ShoppingList;
