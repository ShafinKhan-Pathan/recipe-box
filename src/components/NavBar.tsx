import { Link } from "react-router-dom";
import { navItems } from "../data/navItems";
import { useEffect, useState } from "react";
import type { Recipe } from "../data/types";

const NavBar = () => {
  const [shoppingCount, setShoppingCount] = useState(0);
  // This function helps to get the shopping cart length.
  const loadShoppingCount = () => {
    const stored: Recipe[] = JSON.parse(
      localStorage.getItem("recipes") || "[]",
    );
    const getShopCartLength = stored.filter(
      (recipe) => recipe.isShoppingList,
    ).length;
    setShoppingCount(getShopCartLength);
  };

  useEffect(() => {
    loadShoppingCount();
    window.addEventListener("shopping-updated", loadShoppingCount)
    return () => {
      window.removeEventListener("shopping-update", loadShoppingCount)
    }
  }, []);

  return (
    <nav className="fixed w-full left-0 bottom-0 md:static flex justify-between items-center gap-4 md:rounded-md p-2 bg-black z-50">
      <figure>
        <img src="/vite.svg" loading="lazy" alt="app_logo" />
      </figure>
      <ul className="flex space-x-4 p-4">
        {navItems.map((item) => (
          <li key={item.label} className={`flex items-center gap-2 text-sm relative`}>
            <Link
              to={item.path}
              className="flex items-center gap-2 text-white hover:text-gray-400"
            >
              <item.icon className="w-5 h-5" />
              <span className="hidden md:block">{item.label}</span>
              {item.label === "Shopping" && shoppingCount > 0 && (
                <span className="absolute top-3 left-2 bg-flamingo text-black text-[10px] min-w-[18px] h-[18px] flex items-center justify-center font-bold rounded-full">
                  {shoppingCount}
                </span>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
