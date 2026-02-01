import { Link } from "react-router-dom";
import { navItems } from "../data/navItems";

const NavBar = () => {
  return (
    <nav className="fixed w-full left-0 bottom-0 md:static flex justify-between items-center gap-4 md:rounded-md p-2 bg-black z-50">
      <figure>
        <img src="/vite.svg" loading="lazy" alt="app_logo" />
      </figure>
      <ul className="flex space-x-4 p-4">
        {navItems.map((item) => (
          <li key={item.label} className={`flex items-center gap-2 text-sm`}>
            <Link
              to={item.path}
              className="flex items-center gap-2 text-white hover:text-gray-400"
            >
              <item.icon className="w-5 h-5" />
              <span className="hidden md:block">{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
