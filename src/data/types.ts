import type { LucideIcon } from "lucide-react";
// Navigation item type
export interface NavItem {
    icon: LucideIcon;
    label: string;
    path: string;
    disabled?: boolean;
}
// Recipe-related types
export interface Ingredient {
    item: string;
    quantity: number | string;
    unit: string;
}
export type Difficulty = 'Easy' | 'Medium' | 'Hard';
export interface Recipe {
    id: string;
    name: string;
    description: string;
    cuisine: string;
    difficulty: Difficulty | "";
    prepTime: number | "";
    cookTime: number | "";
    servings: number | "";
    imageId: string;
    imageURL?:string;
    tags?: string[];
    ingredients: Ingredient[];
    instructions: string[];
    notes?: string;
    isFavorite?: boolean;
    isShoppingList?:boolean;
    createdAt?: string;
}
export interface TotalIngredient {
  item: string;
  unit: string;
  quantity: number;
  count: number;
}