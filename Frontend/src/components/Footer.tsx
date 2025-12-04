import React from "react";
import { GithubIcon } from "../icons/GitHubIcon";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-200/10 to-gray-300 text-gray-700 overflow-hidden relative">
      <div className="relative z-10 flex flex-col min-h-screen pl-6 md:pl-20">
        <div className="flex-1 flex flex-col justify-center md:px-16 lg:px-20 max-w-4xl">
          <div className="mb-4">
            <p className="text-gray-400 text-sm md:text-base font-medium tracking-wide uppercase">
              DIVE INTO THE FUTURE
            </p>
          </div>

          <div className="mb-10">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-light leading-tight mb-3">
              START YOUR JOURNEY
            </h1>
            <h2 className="text-6xl md:text-8xl lg:text-[220px] font-extrabold bg-gradient-to-r from-gray-800 via-gray-600 to-gray-400 bg-clip-text text-transparent leading-none -ml-2 lg:-ml-4">
              NOW!
            </h2>
          </div>

          <div className="mb-10 max-w-md">
            <p className="text-gray-600 text-base md:text-lg leading-relaxed">
              Start building your Second Brain today and join the pioneers
              shaping the future of knowledge and productivity.
            </p>
          </div>

          <div className="mb-12">
             <Link to="/signup" className="px-8 py-3 text-lg font-bold text-white bg-gray-900 rounded-xl hover:bg-gray-700 transition">
              Get Started
            </Link>
          </div>
        </div>

        <div className="absolute bottom-6 right-6 flex flex-row items-end text-right gap-2">
          <span className="text-gray-500 text-sm font-bold px-2">Created by : </span>
          <a
            className="flex items-center gap-1 text-gray-600 hover:text-gray-800 transition"
            href="https://www.github.com/whysooharsh"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GithubIcon />
            <span className="text-sm font-medium">harsh</span>
          </a>
        </div>
      </div>

      <div className="absolute bottom-0 right-0 w-[1000px] h-[1000px] overflow-hidden pointer-events-none">
        <div className="absolute -bottom-[576px] -right-[576px] w-[1000px] h-[1000px] rounded-full border border-gray-200 bg-gradient-to-br from-white via-gray-50 to-transparent blur-xl shadow-[0_0_100px_40px_rgba(200,200,200,0.2)]"></div>
      </div>
    </div>
  );
};

export default Footer;
