import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

const Home = lazy(() => import("./pages/Home"));
const BrowseRecipes = lazy(() => import("./pages/BrowseRecipes"));
const RecipeDetail = lazy(() => import("./pages/RecipeDetail"));
const CreateRecipe = lazy(() => import("./pages/CreateRecipe"));
const Favorites = lazy(() => import("./pages/Favorites"));
const ShoppingList = lazy(() => import("./pages/ShoppingList"));

import NavBar from "./components/NavBar";
import { useEffect } from "react";
import { seedRecipes } from "./data/seedRecipes";
function App() {
  // This useEffect helps to seed the recipes for the first time.
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("recipes") || "[]");
    if (!Array.isArray(stored) || stored.length === 0) {
      localStorage.setItem("recipes", JSON.stringify(seedRecipes));
    }
  }, []);
  return (
    <Router>
      <div className="bg-dot-grid min-h-screen text-white">
        <main className="pb-20 md:pb-0">
          <div className="max-w-[1200px] mx-auto">
            <NavBar />
            <Suspense
              fallback={<div className="p-6 text-center">Loading...</div>}
            >
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/create" element={<CreateRecipe />} />
                <Route path="/browse" element={<BrowseRecipes />} />
                <Route path="/recipe/:id" element={<RecipeDetail />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="/shopping-list" element={<ShoppingList />} />
              </Routes>
            </Suspense>
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App;
