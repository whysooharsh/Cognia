import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import { Footer, Navbar } from "../components";

const YoutubeIcon = () => (
  <svg className="w-5 h-5 text-red-500" viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.108C19.522 3.5 12 3.5 12 3.5s-7.522 0-9.388.555A3.002 3.002 0 0 0 .503 6.163C0 8.03 0 12 0 12s0 3.97.503 5.837a3.002 3.002 0 0 0 2.11 2.108C4.478 20.5 12 20.5 12 20.5s7.522 0 9.388-.555a3.002 3.002 0 0 0 2.11-2.108C24 15.97 24 12 24 12s0-3.97-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

const TwitterIcon = () => (
  <svg className="w-5 h-5 text-ink" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const DocIcon = () => (
  <svg
    className="w-5 h-5 text-blue-500"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10 9 9 9 8 9" />
  </svg>
);

const LinkIcon = () => (
  <svg
    className="w-5 h-5 text-emerald-500"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
  </svg>
);

const TrashIcon = () => (
  <svg
    className="w-4 h-4 text-ink/40 hover:text-red-500 transition-colors"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
  </svg>
);

const PinIcon = () => (
  <svg className="w-4 h-4 text-amber-500 fill-current" viewBox="0 0 24 24">
    <path d="M16 12V4h1V2H7v2h1v8l-2 2v2h5.2v6h1.6v-6H18v-2l-2-2z" />
  </svg>
);

interface MockCard {
  type: "youtube" | "twitter" | "document" | "link";
  title: string;
  content: string;
  tags: string[];
  isPinned?: boolean;
}

const MOCK_CARDS: MockCard[] = [
  {
    type: "youtube",
    title: "Designing with Constraints",
    content:
      "A talk on how limiting your color palette and type scale early actually speeds up decision-making later in a project.",
    tags: ["design", "watch-later"],
    isPinned: true,
  },
  {
    type: "twitter",
    title: "On note-taking",
    content:
      "Most people don't have a note problem, they have a retrieval problem. Doesn't matter how much you write down if you can never find it again.",
    tags: ["notes", "thread"],
  },
  {
    type: "document",
    title: "Freelance Contract Checklist",
    content:
      "Scope of work, payment milestones, revision limits, kill fee clause, and who owns the final files. Send before any kickoff call.",
    tags: ["work", "reference"],
  },
  {
    type: "link",
    title: "Tailwind CSS Documentation",
    content:
      "Official docs for the utility-first framework. Good bookmark for looking up arbitrary value syntax and the default spacing scale.",
    tags: ["dev", "bookmark"],
  },
];

export default function LandingPage() {
  const [activeCards, setActiveCards] = useState<MockCard[]>([]);

  useEffect(() => {
    setActiveCards([MOCK_CARDS[0]]);
    const timers = [
      setTimeout(
        () => setActiveCards((prev) => [...prev, MOCK_CARDS[1]]),
        1000,
      ),
      setTimeout(
        () => setActiveCards((prev) => [...prev, MOCK_CARDS[2]]),
        2000,
      ),
      setTimeout(
        () => setActiveCards((prev) => [...prev, MOCK_CARDS[3]]),
        3000,
      ),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="bg-paper text-ink min-h-screen relative font-sans selection:bg-ink selection:text-paper overflow-x-hidden">
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-25"
        style={{
          backgroundImage: `radial-gradient(var(--color-ink) 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
        }}
      />
      <div className="absolute top-[10%] left-[20%] w-[500px] h-[500px] bg-amber-200/10 rounded-full blur-3xl animate-pulse-slow pointer-events-none" />
      <div className="absolute top-[40%] right-[10%] w-[600px] h-[600px] bg-orange-100/15 rounded-full blur-3xl animate-pulse-slow pointer-events-none" />

      <Navbar />

      <section className="relative z-10 pt-36 pb-20 px-6 lg:px-20 max-w-7xl mx-auto flex flex-col items-center text-center gap-8">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white/70 px-3.5 py-1.5 text-xs font-semibold text-ink font-mono shadow-[0_2px_12px_rgba(28,27,23,0.03)]"
        >
          <span className="inline-flex items-center rounded-full bg-ink px-2 py-0.5 text-[10px] font-bold tracking-wider text-paper uppercase">
            New
          </span>
          <span>Workspace Filters v1.2</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="max-w-4xl font-serif text-[clamp(40px,6.5vw,76px)] font-medium leading-[1.05] tracking-tight text-ink"
        >
          Meet Cognia, your
          <br />
          <span className="font-serif-italic text-ink/90">
            personal digital brain.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-2xl text-base md:text-lg text-ink/75 leading-relaxed text-pretty font-normal"
        >
          Cognia is a minimal second brain application designed to save and
          organize YouTube videos, Twitter links, documents, and web resources
          in one centralized, distraction-free space.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center gap-4 mt-2"
        >
          <Link
            to="/signup"
            className="premium-btn inline-flex items-center gap-2 bg-ink text-paper px-8 py-3.5 rounded-full text-sm font-semibold hover:opacity-90 transition-all shadow-md active:scale-[0.97]"
          >
            Create Your Second Brain
          </Link>
          <Link
            to="/signin"
            className="inline-flex items-center border border-ink/15 bg-white/40 hover:bg-white/80 transition-all px-8 py-3.5 rounded-full text-sm font-semibold active:scale-[0.97] backdrop-blur-sm"
          >
            Sign In
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="w-full max-w-5xl mt-12 relative"
        >
          <div className="absolute inset-x-12 -bottom-6 h-12 bg-ink/5 rounded-full blur-3xl z-0" />

          <div className="relative border border-ink/10 rounded-2xl bg-white shadow-[0_24px_60px_-15px_rgba(28,27,23,0.12)] overflow-hidden w-full z-10">
            <div className="bg-ink/5 border-b border-ink/10 px-4 py-3 flex items-center justify-between select-none">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
                <div className="w-3 h-3 rounded-full bg-green-400/80" />
              </div>
              <span className="font-mono text-xs font-bold text-ink/40">
                cognia.app/dashboard
              </span>
              <div className="w-12" />
            </div>

            <div className="p-6 md:p-8 bg-paper/40 min-h-[400px] text-left">
              <div className="flex items-center justify-between gap-4 mb-8">
                <div className="bg-white border border-ink/10 rounded-xl px-4 py-2 text-xs font-mono text-ink/40 max-w-md w-full select-none">
                  Search your brain...
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-ink/10" />
                  <div className="w-12 h-6 bg-white border border-ink/10 rounded-full" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <AnimatePresence>
                  {activeCards.map((card, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 20, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                      }}
                      className="border border-ink/10 bg-white rounded-2xl p-5 shadow-xs flex flex-col justify-between h-[220px]"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <div className="w-8 h-8 rounded-lg bg-paper border border-ink/5 flex items-center justify-center">
                            {" "}
                            {card.type === "youtube" && <YoutubeIcon />}
                            {card.type === "twitter" && <TwitterIcon />}
                            {card.type === "document" && <DocIcon />}
                            {card.type === "link" && <LinkIcon />}
                          </div>
                          <div className="flex items-center gap-1.5">
                            {card.isPinned && <PinIcon />}
                            <TrashIcon />
                          </div>
                        </div>

                        <h3 className="text-sm font-bold text-ink mb-1 line-clamp-1 select-none">
                          {card.title}
                        </h3>

                        <p className="text-xs text-ink/60 line-clamp-4 select-none leading-relaxed">
                          {card.content}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-2 mt-4 ">
                        {card.tags.map((tag, tidx) => (
                          <span
                            key={tidx}
                            className="bg-ink/5 text-ink/50 text-[10px] font-bold font-mono uppercase tracking-wide px-2.5 py-1 rounded-full"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="py-24 px-6 lg:px-20 max-w-5xl mx-auto text-center relative z-10">
        <div className="flex flex-col items-center gap-6 rounded-3xl border border-white/50 bg-white/30 backdrop-blur-xl px-8 py-12 md:px-16 md:py-14 shadow-[0_24px_70px_-20px_rgba(28,27,23,0.25)]">
          <div className="w-16 h-16 rounded-2xl bg-ink/10 flex items-center justify-center font-bold text-ink shadow-[0_12px_24px_-10px_rgba(28,27,23,0.2)] overflow-hidden select-none">
            <span className="font-serif text-2xl font-bold text-ink">M</span>
          </div>
          <blockquote className="font-serif text-2xl md:text-3xl leading-relaxed text-ink/90 font-medium select-none">
            "Cognia keeps every link, note, and idea exactly where I left it. No
            more digging through tabs or old messages — everything's organized
            before I even think to look for it."
          </blockquote>
          <cite className="font-mono text-xs uppercase tracking-widest text-ink/60 not-italic block mt-2 select-none">
            – Maha, Creative Director
          </cite>
        </div>
      </section>

      <section className="py-24 px-6 lg:px-20 max-w-7xl mx-auto flex flex-col gap-24 relative z-10">
        <div className="text-center max-w-2xl mx-auto flex flex-col gap-3">
          <span className="text-xs font-bold font-mono uppercase tracking-widest text-ink/50 select-none">
            Key Features
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-medium tracking-tight text-ink">
            What is inside Cognia.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col gap-6 items-start">
            <div className="font-mono text-xs font-bold text-ink bg-ink/5 px-3 py-1 rounded-full select-none">
              01
            </div>
            <h3 className="font-serif text-3xl font-medium text-ink tracking-tight">
              Structured workspace layout.
            </h3>
            <p className="text-ink/75 leading-relaxed text-pretty">
              Cognia categorizes your saved items by type automatically. Sort,
              filter, search, and navigate through a clean, unified dashboard
              built for fast information retrieval.
            </p>
            <ul className="flex flex-col gap-2 text-sm text-ink/70 font-medium">
              <li className="flex items-center gap-2">
                ✓ Category tags (YouTube, Twitter, Doc, Link)
              </li>
              <li className="flex items-center gap-2">
                ✓ Grid & List workspace views
              </li>
              <li className="flex items-center gap-2">
                ✓ Pin feature for priority items
              </li>
            </ul>
          </div>

          <div className="relative aspect-video rounded-3xl border border-ink/10 bg-white/40 backdrop-blur-xs flex items-center justify-center overflow-hidden shadow-xs">
            <div className="absolute w-12 h-12 rounded-2xl bg-white border border-ink/10 flex items-center justify-center z-10 shadow-md p-2">
              <img
                src="https://res.cloudinary.com/dpwqggym0/image/upload/v1783667924/cogniaLogo_lk0ivj.png"
                alt="Cognia Logo"
                className="w-full h-full object-contain"
              />
            </div>

            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 16, ease: "linear" }}
              className="absolute w-44 h-44 rounded-full border border-dashed border-ink/25 flex items-center justify-between"
            >
              <div className="w-8 h-8 rounded-full bg-white shadow-xs border border-ink/5 flex items-center justify-center -m-4">
                <YoutubeIcon />
              </div>
              <div className="w-8 h-8 rounded-full bg-white shadow-xs border border-ink/5 flex items-center justify-center -m-4">
                <TwitterIcon />
              </div>
            </motion.div>

            <motion.div
              animate={{ rotate: -360 }}
              transition={{ repeat: Infinity, duration: 24, ease: "linear" }}
              className="absolute w-64 h-64 rounded-full border border-dashed border-ink/40 flex items-center justify-between"
            >
              <div className="w-8 h-8 rounded-full bg-white shadow-xs border border-ink/5 flex items-center justify-center -m-4">
                <DocIcon />
              </div>
              <div className="w-8 h-8 rounded-full bg-white shadow-xs border border-ink/5 flex items-center justify-center -m-4">
                <LinkIcon />
              </div>
            </motion.div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1 relative aspect-video rounded-3xl border border-ink/10 bg-white/40 backdrop-blur-xs p-6 flex flex-col gap-3 justify-center shadow-xs">
            <div className="border border-ink/10 bg-white rounded-2xl p-4 shadow-2xs flex items-center justify-between select-none">
              <span className="font-mono text-xs font-semibold text-ink">
                One-Click Save & Organize
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 font-mono">
                Instant Archive
              </span>
            </div>

            <div className="border border-ink/10 bg-white rounded-2xl p-4 shadow-2xs flex items-center justify-between select-none">
              <span className="font-mono text-xs font-semibold text-ink">
                Works on Any Device
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-500 font-mono">
                Synced Instantly
              </span>
            </div>

            <div className="border border-ink/10 bg-white rounded-2xl p-4 shadow-2xs flex items-center justify-between select-none">
              <span className="font-mono text-xs font-semibold text-ink">
                Your Data, Private
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 font-mono">
                Encrypted
              </span>
            </div>
          </div>

          <div className="order-1 lg:order-2 flex flex-col gap-6 items-start">
            <div className="font-mono text-xs font-bold text-ink bg-ink/5 px-3 py-1 rounded-full select-none">
              02
            </div>
            <h3 className="font-serif text-3xl font-medium text-ink tracking-tight">
              Focus on speed and clarity.
            </h3>
            <p className="text-ink/75 leading-relaxed text-pretty">
              Designed as a distraction-free repository. Drop any YouTube video
              link or Twitter thread to instantly parse, categorize, tag, and
              structure your references securely.
            </p>
            <ul className="flex flex-col gap-2 text-sm text-ink/70 font-medium">
              <li className="flex items-center gap-2">
                ✓ Distraction-free, minimal experience
              </li>
              <li className="flex items-center gap-2">
                ✓ Immediate links indexing
              </li>
              <li className="flex items-center gap-2">
                ✓ Seamless tag management
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="py-32 px-6 lg:px-20 text-center max-w-4xl mx-auto flex flex-col items-center gap-8 relative z-10">
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-ink/50 select-none">
          Start Organizing
        </span>
        <h2 className="font-serif text-5xl md:text-7xl font-medium tracking-tight text-ink leading-none">
          Ready to clear the clutter?
        </h2>
        <p className="text-ink/75 leading-relaxed max-w-xl font-normal">
          Create your minimal second brain to keep YouTube videos, X/Twitter
          threads, and important bookmarks in one clean workspace.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 mt-4 w-full justify-center">
          <Link
            to="/signup"
            className="premium-btn w-full sm:w-auto bg-ink text-paper px-8 py-4 rounded-full text-sm font-semibold hover:opacity-90 transition shadow-md select-none active:scale-[0.98]"
          >
            Create Your Free Brain
          </Link>
          <Link
            to="/signin"
            className="w-full sm:w-auto border border-ink/10 bg-white/40 hover:bg-white transition-all px-8 py-4 rounded-full text-sm font-semibold select-none active:scale-[0.98]"
          >
            Go to Dashboard
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
