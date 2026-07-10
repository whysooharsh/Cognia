import { Link } from "react-router-dom";

import { GithubIcon } from "../icons";

const Footer: React.FC = () => {
  return (
    <footer className="bg-paper border-t border-ink/10 text-ink/70 font-sans py-16 px-6 lg:px-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:justify-between gap-12 relative z-10">

        <div className="flex flex-col gap-4 max-w-sm">
          <Link to="/" className="flex items-center gap-2 text-xl font-bold tracking-tight text-ink">
            <img
              src="https://res.cloudinary.com/dpwqggym0/image/upload/v1783667924/cogniaLogo_lk0ivj.png"
              alt="Cognia Logo"
              className="w-7 h-7 object-contain"
            />
            <span>Cognia</span>
          </Link>
          <p className="text-sm text-ink/60 leading-relaxed font-normal">
            Cognia is a minimal second brain application designed to save and organize YouTube videos and Twitter links in one centralized, structured space.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <h4 className="text-xs font-bold tracking-wider uppercase text-ink select-none font-mono">Workspace</h4>
          <a href="#features" className="text-sm text-ink/65 hover:text-ink transition-colors font-medium">Features</a>
          <Link to="/dashboard" className="text-sm text-ink/65 hover:text-ink transition-colors font-medium">Dashboard</Link>
          <Link to="/signup" className="text-sm text-ink/65 hover:text-ink transition-colors font-medium">Get Started</Link>
        </div>

      </div>

      <div className="max-w-7xl mx-auto border-t border-ink/5 mt-16 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10">
        <span className="text-xs text-ink/50 font-normal">
          &copy; {new Date().getFullYear()} Cognia. All rights reserved.
        </span>

        <div className="flex items-center gap-1.5 text-xs text-ink/50 font-normal">
          <span>Created by</span>
          <a
            className="flex items-center gap-1 font-semibold text-ink/75 hover:text-ink transition-colors"
            href="https://www.github.com/whysooharsh"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GithubIcon />
            <span>harsh</span>
          </a>
        </div>
      </div>

      <div className="absolute -bottom-48 -right-48 w-96 h-96 bg-ink/5 rounded-full blur-3xl pointer-events-none"></div>
    </footer>
  );
};

export default Footer;
