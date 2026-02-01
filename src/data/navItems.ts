import { Home, BookOpen, PlusCircle, Heart, ShoppingCart } from 'lucide-react';
import type { NavItem } from "./types";

export const navItems: NavItem[] = [
    {
        icon: Home,
        label: 'Home',
        path: '/',
    },
    {
        icon: BookOpen,
        label: 'Browse',
        path: '/browse',
    },
    {
        icon: PlusCircle,
        label: 'Create Recipe',
        path: '/create',
    },
    {
        icon: Heart,
        label: 'Favorites',
        path: '/favorites',
    },
    {
        icon: ShoppingCart,
        label: 'Shopping',
        path: '/shopping-list',
    },
]