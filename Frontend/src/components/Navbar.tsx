import React, { useEffect, useState } from "react";


const Navbar: React.FC = () => {
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

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

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", controlNavbar);
      return () => window.removeEventListener("scroll", controlNavbar);
    }
  }, [lastScrollY]);

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "Features", href: "#features" },
    { name: "Dashboard", href: "/dashboard" },
    { name: "Contact", href: "/contact"},
  ];

  return (
    <div
      className={`fixed top-0 left-0 w-full z-50 transition-transform duration-300 ${
        showNavbar ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="mx-auto max-w-4xl px-4">
        <div className="flex justify-center items-center h-14 bg-white/80 backdrop-blur-md border-b border-gray-200 rounded-b-xl shadow-sm">
          <nav className="flex space-x-8 text-sm font-medium text-gray-700">
             {navItems.map((item) =>
              
              <a
                key={item.name}
                href={item.href}
                className="relative group transition-colors duration-200 hover:text-gray-900"
              >
                {item.name}
                <span className="absolute left-0 -bottom-0.5 h-0.5 w-0 bg-gray-900 transition-all duration-300 group-hover:w-full"></span>
              </a>
            )}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
