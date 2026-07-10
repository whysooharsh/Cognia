import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="absolute top-0 inset-x-0 z-50 flex items-center justify-between px-6 lg:px-20 py-6 font-sans">
      <div className="flex items-center gap-9">
        <Link 
          to="/" 
          className="relative inline-flex items-center gap-2 text-xl font-bold tracking-tight text-ink hover:opacity-90 transition-opacity"
        >
          <img 
            src="https://res.cloudinary.com/dpwqggym0/image/upload/v1783667924/cogniaLogo_lk0ivj.png" 
            alt="Cognia Logo" 
            className="w-8 h-8 object-contain"
          />
          <span className="font-semibold text-lg text-ink select-none tracking-tight">Cognia</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          <a 
            href="#features" 
            className="inline-flex items-center rounded-lg px-4 py-2 text-sm font-medium text-ink/75 transition-colors hover:bg-ink/[0.04] hover:text-ink"
          >
            Features
          </a>
          <Link 
            to="/dashboard" 
            className="inline-flex items-center rounded-lg px-4 py-2 text-sm font-medium text-ink/75 transition-colors hover:bg-ink/[0.04] hover:text-ink"
          >
            Dashboard
          </Link>
        </nav>
      </div>

      <div className="flex items-center gap-3">
        <Link 
          to="/signin" 
          className="relative hidden md:inline-flex items-center justify-center rounded-full bg-paper/60 px-5 py-2 text-sm font-semibold leading-none text-ink ring-1 ring-ink/10 backdrop-blur-md transition-all duration-150 hover:bg-paper/90 active:scale-[0.96]"
        >
          Login
        </Link>
        <Link 
          to="/signup" 
          className="relative hidden md:inline-flex items-center justify-center rounded-full bg-ink px-5 py-2.5 text-sm font-semibold leading-none text-paper transition-all duration-150 hover:opacity-90 active:scale-[0.96]"
        >
          Get Started
        </Link>

        <button
          onClick={() => setIsOpen(!isOpen)}
          type="button"
          aria-label="Toggle menu"
          className="relative inline-flex md:hidden size-9 items-center justify-center rounded-full bg-paper/60 text-ink outline-none ring-1 ring-ink/10 backdrop-blur-md transition-all active:scale-[0.96]"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 19h16" />
            )}
          </svg>
        </button>
      </div>

      {isOpen && (
        <div className="absolute top-20 left-4 right-4 bg-paper/95 backdrop-blur-lg border border-ink/10 rounded-2xl p-6 flex flex-col gap-4 shadow-xl z-50 md:hidden animate-in fade-in slide-in-from-top-5 duration-200">
          <a 
            href="#features" 
            onClick={() => setIsOpen(false)}
            className="text-lg font-medium text-ink py-2 border-b border-ink/5"
          >
            Features
          </a>
          <Link 
            to="/dashboard" 
            onClick={() => setIsOpen(false)}
            className="text-lg font-medium text-ink py-2 border-b border-ink/5"
          >
            Dashboard
          </Link>
          <div className="flex flex-col gap-2 pt-4">
            <Link 
              to="/signin" 
              onClick={() => setIsOpen(false)}
              className="flex justify-center items-center rounded-xl bg-ink/5 py-3 text-sm font-semibold text-ink"
            >
              Login
            </Link>
            <Link 
              to="/signup" 
              onClick={() => setIsOpen(false)}
              className="flex justify-center items-center rounded-xl bg-ink py-3 text-sm font-semibold text-paper"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
