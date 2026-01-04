import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

interface FeatureCardProps {
  title: string;
  desc: string;
  icon: React.ReactNode;
  buttonText: string;
  bgColor?: string;
  iconColor?: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, desc, icon, buttonText, bgColor = "bg-gray-100", iconColor = "text-gray-700" }) => {
  return (
    <div className={`${bgColor} rounded-2xl p-8 flex flex-col justify-between h-80 group hover:shadow-lg transition-all duration-300 cursor-pointer`}>
      <div className="flex-1 flex items-center justify-center mb-6">
        <div className={`text-6xl ${iconColor} group-hover:scale-110 transition-transform duration-300`}>
          {icon}
        </div>
      </div>

      <div className="text-left">
        <h3 className="text-xl font-bold text-gray-900 mb-3">
          {title}
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          {desc}
        </p>
        <button className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors group/btn">
          <span className="uppercase tracking-wide">{buttonText}</span>
        </button>
      </div>
    </div>
  );
};


export default function Home() {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  useEffect(() => {
    if (isVideoModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isVideoModalOpen]);

  const features = [
    {
      title: "Shared Brain",
      desc: "Collaborate with friends or teammates and build a collective second brain together.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M7 4.5a3 3 0 0 0-2.567 4.554a3.001 3.001 0 0 0 0 5.893M7 4.5a2.5 2.5 0 0 1 5 0v15a2.5 2.5 0 0 1-5 0a3 3 0 0 1-2.567-4.553M7 4.5c0 .818.393 1.544 1 2m-3.567 8.447A3 3 0 0 1 6 13.67m13.25-8.92L17 7h-2m3.5-2.25a.75.75 0 1 0 1.5 0a.75.75 0 0 0-1.5 0m.75 14.5L17 17h-2m3.5 2.25a.75.75 0 1 1 1.5 0a.75.75 0 0 1-1.5 0m.75-7.25H15m3.5 0a.75.75 0 1 0 1.5 0a.75.75 0 0 0-1.5 0"
          />
        </svg>
      ),
      buttonText: "Start Collaborating",
      bgColor: "bg-gray-300",
      iconColor: "text-neutral-600",
    },
    {
      title: "Embed Anything",
      desc: "Save tweets, videos, links, and snippets seamlessly in one organized space.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 16 16"
        >
          <path
            fill="currentColor"
            d="m9 11.5l1.5 1.5l5-5l-5-5L9 4.5L12.5 8zm-2-7L5.5 3l-5 5l5 5L7 11.5L3.5 8z"
          />
        </svg>
      ),
      buttonText: "Explore Embeds",
      bgColor: "bg-gray-300",
      iconColor: "text-neutral-600",
    },
    {
      title: "Secure & Private",
      desc: "Your data stays encrypted and fully under your control—privacy by design.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="m12 .44l10 3.5V12c0 4.127-2.533 7.012-4.896 8.803a19.7 19.7 0 0 1-4.65 2.595l-.087.033l-.025.009l-.007.002l-.003.001c-.001 0-.002 0-.332-.943l-.331.944h-.001l-.003-.002l-.007-.002l-.025-.01l-.087-.032a18 18 0 0 1-1.39-.606a20 20 0 0 1-3.26-1.989C4.534 19.012 2 16.127 2 12V3.94zm0 22.06l-.331.944l.331.116l.331-.116zm0-1.072l.009-.004a17.8 17.8 0 0 0 3.887-2.215C18.034 17.59 20 15.223 20 12V5.36l-8-2.8l-8 2.8V12c0 3.223 1.966 5.588 4.104 7.21A17.8 17.8 0 0 0 12 21.428m6.072-13.085l-7.071 7.071l-4.243-4.242l1.415-1.415L11 12.586l5.657-5.657z"
          />
        </svg>
      ),
      buttonText: "Learn Security",
      bgColor: "bg-gray-300",
      iconColor: "text-neutral-600",
    },
    {
      title: "Smart Organization",
      desc: "Tags, categories, and lightning-fast search keep everything easy to find.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M20.01 10.99h-7v-2h-2v2H3.47v4h2v-2h5.54v2h2v-2h5.5v2h2v-4z"
          />
          <circle cx="12.01" cy="4.51" r="2.5" fill="currentColor" />
          <circle cx="4.47" cy="19.49" r="2.5" fill="currentColor" />
          <circle cx="12.01" cy="19.49" r="2.5" fill="currentColor" />
          <circle cx="19.51" cy="19.49" r="2.5" fill="currentColor" />
        </svg>
      ),
      buttonText: "Get Organized",
      bgColor: "bg-gray-300",
      iconColor: "text-neutral-600",
    },
  ];


  return (
    <div className="min-h-screen w-full relative font-inter bg-gradient-to-br from-gray-50 to-gray-200 text-gray-900">
      {/* {dotted bg gradient component} */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, #a8a29e 1px, transparent 1px),
            linear-gradient(to bottom, #a8a29e 1px, transparent 1px)
          `,
          backgroundSize: "20px 20px",
          backgroundPosition: "0 0, 0 0",
          maskImage: `
            repeating-linear-gradient(
              to right,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            repeating-linear-gradient(
              to bottom,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%)
          `,
          WebkitMaskImage: `
            repeating-linear-gradient(
              to right,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            repeating-linear-gradient(
              to bottom,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%)
          `,
          maskComposite: "intersect",
          WebkitMaskComposite: "source-in",
        }}
      />
      <Navbar />

      <section className="relative z-10 pt-20 sm:pt-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-lg text-gray-600">
            Your Second Brain for Clarity & Focus
          </h1>
          <div className="mt-5 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
            Offload your thoughts and
            <br />
            <span className="lg:text-6xl py-1 block">turn them into</span>
            <span className="relative inline-flex mt-2">
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-neutral-600 via-neutral-300 to-neutral-600 blur-lg opacity-30"></span>
              <span className="relative">actionable insights</span>
            </span>
          </div>


          <div className="flex flex-col mt-8 space-y-4 sm:flex-row sm:justify-center sm:space-x-5 sm:space-y-0">
            <Link to="/signup" className="px-8 py-3 text-lg font-bold text-white bg-gray-900 rounded-xl hover:bg-gray-700 transition">
              Start Organizing
            </Link>

            <button 
              onClick={() => setIsVideoModalOpen(true)}
              className="px-6 py-3 text-lg font-bold text-gray-900 border-2 border-gray-300 rounded-xl hover:bg-gray-900 hover:text-white transition flex items-center justify-center"
            >
              <svg
                className="w-5 h-5 mr-2"
                viewBox="0 0 18 18"
                fill="none"
                stroke="currentColor"
              >
                <path
                  d="M8.2 13.4C6.9 14.4 5 13.4 5 11.8V5.4C5 3.8 6.9 2.8 8.2 3.8L12.5 7c1.1.8 1.1 2.4 0 3.2L8.2 13.4z"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Watch Demo
            </button>
          </div>
        </div>

        <div className="relative mt-12 pb-12">
          <div className="relative mx-auto lg:max-w-4xl px-6">
            <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-white/20">
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-br from-neutral-400 to-neutral-600 rounded-full opacity-60 blur-xl"></div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-neutral-400 to-neutral-600-600 rounded-full opacity-50 blur-xl"></div>
              
              <div 
                className="relative aspect-video w-full overflow-hidden rounded-xl shadow-lg cursor-pointer transition-transform "
                onClick={() => setIsVideoModalOpen(true)}
              >
                <iframe
                  src="https://player.cloudinary.com/embed/?cloud_name=dlvjrvhak&public_id=cursorful-video-1767530346250_lgohot&profile=cld-looping"
                  className="w-full h-full pointer-events-none"
                  allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
                  frameBorder="0"
                ></iframe>
              </div>
              
              <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-white/5 rounded-2xl pointer-events-none"></div>
            </div>
          </div>
        </div>

        {isVideoModalOpen && (
          <div 
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black backdrop-blur-sm p-4"
            onClick={() => setIsVideoModalOpen(false)}
          >
            <div 
              className="relative w-full max-w-5xl bg-gray-900 rounded-2xl shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsVideoModalOpen(false)}
                className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center bg-black/10 hover:bg-black/20 rounded-full transition-colors"
              >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="relative w-full" style={{ aspectRatio: '640 / 360' }}>
                <iframe
                  src="https://player.cloudinary.com/embed/?cloud_name=dlvjrvhak&public_id=cursorful-video-1767530346250_lgohot&profile=cld-looping"
                  className="absolute inset-0 w-full h-full"
                  allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
                  allowFullScreen
                  frameBorder="0"
                ></iframe>
              </div>
            </div>
          </div>
        )}
      </section>
      <section id="features" className="relative z-10 bg-gray-200/20 py-24">
        <div className="max-w-5xl mx-auto text-center px-6">
          <span className="inline-block text-sm font-medium uppercase tracking-wide text-gray-500">
            Why Cognia?
          </span>
          <h2 className="mt-3 text-4xl sm:text-5xl font-extrabold text-gray-900">
            Why YOU will love Cognia
          </h2>
          <p className="mt-4 mb-6 text-lg text-gray-600 max-w-2xl mx-auto">
            Cognia helps you declutter your mind, capture and organize your
            thoughts, and share knowledge effortlessly-your true digital second
            brain.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {features.map((feature, idx) => (
              <FeatureCard
                key={idx}
                title={feature.title}
                desc={feature.desc}
                icon={feature.icon}
                buttonText={feature.buttonText}
                bgColor={feature.bgColor}
                iconColor={feature.iconColor}
              />
            ))}
          </div>
        </div>  
      </section>
      <section id="contact" className="relative z-10"><Footer /></section>

    </div>
  );
}
