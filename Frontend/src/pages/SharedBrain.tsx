import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import { BACKEND_URL } from "../components";

interface Content {
  _id: string;
  title: string;
  type: "twitter" | "youtube" | "todo";
  link: string;
  tags: string[];
  createdAt?: string;
}

interface SharedBrainData {
  username: string;
  content: Content[];
}

function PremiumCard({ item }: { item: Content }) {
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    if (item.type === "twitter") {
      const twttr = (window as unknown as { twttr?: { widgets?: { load: () => void } } }).twttr;
      twttr?.widgets?.load();
    }
  }, [item.type]);

  const getTypeConfig = () => {
    switch (item.type) {
      case "youtube":
        return {
          icon: (
            <svg
              className="w-4 h-4 text-red-500"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.108C19.522 3.5 12 3.5 12 3.5s-7.522 0-9.388.555A3.002 3.002 0 0 0 .503 6.163C0 8.03 0 12 0 12s0 3.97.503 5.837a3.002 3.002 0 0 0 2.11 2.108C4.478 20.5 12 20.5 12 20.5s7.522 0 9.388-.555a3.002 3.002 0 0 0 2.11-2.108C24 15.97 24 12 24 12s0-3.97-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
          ),
          label: "Video",
          bg: "bg-red-50",
          text: "text-red-700",
        };
      case "twitter":
        return {
          icon: (
            <svg
              className="w-4 h-4 text-ink"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          ),
          label: "Tweet",
          bg: "bg-ink/5",
          text: "text-ink",
        };
      case "todo":
        return {
          icon: (
            <svg
              className="w-4 h-4 text-blue-500"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
            </svg>
          ),
          label: "Notes",
          bg: "bg-blue-50",
          text: "text-blue-700",
        };
      default:
        return {
          icon: null,
          label: "Content",
          bg: "bg-ink/5",
          text: "text-ink/80",
        };
    }
  };

  const getPreviewContent = () => {
    if (item.type === "youtube") {
      const videoId = item.link.includes("watch?v=")
        ? item.link.split("watch?v=")[1]?.split("&")[0]
        : item.link.split("youtu.be/")[1]?.split("?")[0];

      if (videoId && !imageError) {
        return (
          <div className="relative aspect-video bg-ink/5 rounded-xl overflow-hidden group">
            <img
              src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
              alt="Video thumbnail"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
              onError={() => setImageError(true)}
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
          </div>
        );
      }
    }

    if (item.type === "twitter") {
      const fixedLink = item.link.replace("x.com", "twitter.com");
      const tweetId = fixedLink.split("/status/")[1]?.split("?")[0];

      if (tweetId) {
        return (
          <div className="bg-white rounded-xl border border-ink/10 overflow-hidden">
            <iframe
              src={`https://platform.twitter.com/embed/Tweet.html?id=${tweetId}`}
              className="w-full h-auto min-h-[200px] border-0"
              allowTransparency={true}
            />
          </div>
        );
      } else {
        return (
          <div className="bg-white rounded-xl border border-ink/10 p-4 overflow-hidden">
            <blockquote
              className="twitter-tweet"
              data-theme="light"
              data-conversation="none"
            >
              <a href={fixedLink}>Loading Tweet...</a>
            </blockquote>
          </div>
        );
      }
    }

    return (
      <div className="aspect-video bg-ink/5 rounded-xl flex items-center justify-center group hover:bg-ink/10 transition-colors duration-300">
        <div className="text-ink/40 group-hover:text-ink/60 transition-colors">
          {getTypeConfig().icon || (
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          )}
        </div>
      </div>
    );
  };

  const typeConfig = getTypeConfig();

  return (
    <div className="group cursor-pointer">
      <div className="bg-white rounded-2xl border border-ink/10 hover:border-ink/20 transition-all duration-300 hover:shadow-lg p-5">
        {item.type === "twitter" ? (
          <div className="mb-4">{getPreviewContent()}</div>
        ) : (
          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="block mb-4"
          >
            {getPreviewContent()}
          </a>
        )}

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div
              className={`inline-flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider ${typeConfig.bg} ${typeConfig.text}`}
            >
              {typeConfig.icon}
              <span>{typeConfig.label}</span>
            </div>
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <svg
                className="w-4 h-4 text-ink/40"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </div>
          </div>

          <h3 className="font-semibold text-ink text-sm leading-snug line-clamp-2 transition-colors">
            {item.title}
          </h3>

          {item.tags && item.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4 pt-3 border-t border-ink/5">
              {item.tags.slice(0, 3).map((tag, i) => (
                <span
                  key={i}
                  className="text-[10px] font-bold font-mono text-ink/50 bg-ink/[0.04] px-2.5 py-1 rounded-md transition-colors hover:bg-ink/[0.08] hover:text-ink"
                >
                  #{tag}
                </span>
              ))}
              {item.tags.length > 3 && (
                <span className="text-[10px] font-mono text-ink/40 px-2.5 py-1">
                  +{item.tags.length - 3}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function SharedBrain() {
  const { shareLink } = useParams();
  const [data, setData] = useState<SharedBrainData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSharedBrain = async () => {
      try {
        const response = await axios.get(
          `${BACKEND_URL}/api/v1/brain/${shareLink}`,
        );
        setData(response.data);
      } catch (err: unknown) {
        const axiosErr = err as { response?: { data?: { message?: string } } };
        setError(axiosErr.response?.data?.message || "Failed to load shared brain");
      } finally {
        setLoading(false);
      }
    };

    if (shareLink) {
      fetchSharedBrain();
    }
  }, [shareLink]);

  if (loading) {
    return (
      <div className="min-h-screen bg-paper flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-3 border-ink/10 border-t-ink rounded-full animate-spin mx-auto"></div>
          <p className="mt-6 text-ink/75 font-semibold font-mono text-sm">
            Loading brain...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-paper flex items-center justify-center p-4">
        <div className="text-center max-w-md bg-white border border-ink/10 rounded-2xl p-8 shadow-xl">
          <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-8 h-8 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
              />
            </svg>
          </div>
          <h2 className="font-serif text-2xl font-medium text-ink mb-3">
            Unable to load brain
          </h2>
          <p className="text-ink/65 mb-8 leading-relaxed text-sm">{error}</p>
          <a
            href="/"
            className="inline-flex items-center px-6 py-3 bg-ink text-paper rounded-full hover:opacity-90 transition-opacity font-semibold text-sm active:scale-95 shadow-sm"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to home
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-paper text-ink font-sans relative">
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-25"
        style={{
          backgroundImage: `radial-gradient(var(--color-ink) 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
        }}
      />
      <div className="absolute top-[10%] left-[20%] w-[300px] h-[300px] bg-amber-200/5 rounded-full blur-3xl pointer-events-none" />

      <div className="bg-white/40 backdrop-blur-md border-b border-ink/10 relative z-10">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <div className="space-y-2">
              <h1 className="font-serif text-5xl font-medium text-ink tracking-tight">
                {data?.username}
              </h1>
              <p className="text-lg text-ink/75 font-semibold font-mono uppercase tracking-wider">
                Knowledge Collection
              </p>
              <div className="flex items-center gap-2 pt-1">
                <div className="h-2 w-2 bg-emerald-500 rounded-full"></div>
                <span className="text-xs text-ink/50 font-bold font-mono uppercase tracking-wider">
                  Shared publicly
                </span>
              </div>
            </div>
            <div className="text-left sm:text-right select-none">
              <div className="font-serif text-7xl font-light text-ink/20 leading-none">
                {String(data?.content?.length || 0).padStart(2, "0")}
              </div>
              <div className="text-[10px] text-ink/40 font-bold font-mono tracking-widest mt-1">
                ITEMS
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 relative z-10">
        {data?.content && data.content.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {data.content.map((item) => (
              <PremiumCard key={item._id} item={item} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-white border border-ink/10 rounded-2xl p-12 max-w-xl mx-auto shadow-sm">
            <div className="w-16 h-16 bg-ink/5 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-8 h-8 text-ink/40"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0-1.125.504-1.125 1.125V11.25a9 9 0 00-9-9z"
                />
              </svg>
            </div>
            <h3 className="font-serif text-2xl font-medium text-ink mb-3">
              Empty collection
            </h3>
            <p className="text-ink/65 text-sm max-w-md mx-auto leading-relaxed">
              This brain hasn't been populated with content yet. Check back soon
              to see what gets added.
            </p>
          </div>
        )}
      </div>

      <div className="bg-white/40 backdrop-blur-md border-t border-ink/10 mt-20 relative z-10">
        <div className="max-w-7xl mx-auto px-6 py-16 text-center">
          <h2 className="font-serif text-3xl font-medium text-ink mb-4">
            Ready to build your own brain?
          </h2>
          <p className="text-ink/75 text-sm mb-8 max-w-xl mx-auto leading-relaxed">
            Create your personal knowledge collection and share it with the
            world. Organize everything from YouTube videos to Twitter links to
            notes in one beautiful space.
          </p>
          <a
            href="/signup"
            className="inline-flex items-center px-8 py-3.5 bg-ink text-paper rounded-full hover:opacity-90 transition-opacity font-semibold text-sm shadow-md active:scale-95"
          >
            Start building
            <svg
              className="w-4 h-4 ml-2"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
