import React, { useEffect, useState } from "react";
import { FiSun, FiMoon } from "react-icons/fi";


const Navbar: React.FC = () => {
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [darkMode, setDarkMode] = useState(false);

  const controlNavbar = () => {
    if (typeof window !== "undefined") {
      if (window.scrollY > lastScrollY && window.scrollY > 50) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }
      setLastScrollY(window.scrollY);
    }
  };

  const applyDarkMode = (isDark: boolean) => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", controlNavbar);
      return () => window.removeEventListener("scroll", controlNavbar);
    }
  }, [lastScrollY]);

  useEffect(() => {
    const stored: boolean = localStorage.getItem("theme") === "dark";
    setDarkMode(stored);
    applyDarkMode(stored);
  }, [])

  const toggleTheme = () => {
    const newTheme = !darkMode;
    setDarkMode(newTheme);
    applyDarkMode(newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
  }

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Features", href: "/" },
    { name: "Dashboard", href: "/dashboard" },
    { name: "Contact", href: "/" },
  ];

  return (
    <div
      className={`fixed top-4 left-0 w-full z-50 transition-transform duration-300 ${showNavbar ? "translate-y-0" : "-translate-y-full"
        }`}
    >
      <div className="mx-auto max-w-4xl px-4">
        <div className="flex justify-evenly items-center h-14 bg-white/80 dark:bg-neutral-900 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 rounded-xl shadow-sm ">
          <nav className="flex space-x-8 text-sm font-medium text-neutral-950 dark:text-gray-300">
            {navItems.map((item) =>

              <a
                key={item.name}
                href={item.href}
                className="relative group transition-colors duration-200 hover:text-gray-900 dark:hover:text-white"
              >
                {item.name}
                <span className="absolute left-0 -bottom-0.5 h-0.5 w-0 bg-gray-900 dark:bg-white transition-all duration-300 group-hover:w-full"></span>
              </a>
            )}
          </nav>

          <button 
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-gray-00 dark:hover:bg-gray-950 transition-colors text-gray-700 dark:text-gray-300"
            aria-label="Toggle theme"
          >
            {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
          </button>

        </div>
      </div>
    </div>
  );
};

export default Navbar;
