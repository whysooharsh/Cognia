import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../components/config";

// build using calude 3.5 tired of writing css and all copy pasted half, vibe coded other half 

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
    if (item.type === "twitter" && (window as any).twttr?.widgets) {
      (window as any).twttr.widgets.load();
    }
  }, [item.type]);

  const getTypeConfig = () => {
    switch (item.type) {
      case "youtube":
        return {
          icon: (
            <svg className="w-4 h-4" fill="#FF0000" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
          ),
          label: "Video",
          bg: "bg-red-50",
          text: "text-red-700"
        };
      case "twitter":
        return {
          icon: (
            <svg className="w-4 h-4" fill="#1DA1F2" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          ),
          label: "Tweet",
          bg: "bg-blue-50",
          text: "text-blue-700"
        };
      case "todo":
        return {
          icon: (
            <svg className="w-4 h-4" fill="#10B981" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd"/>
            </svg>
          ),
          label: "Notes",
          bg: "bg-emerald-50",
          text: "text-emerald-700"
        };
      default:
        return {
          icon: null,
          label: "Content",
          bg: "bg-gray-50",
          text: "text-gray-700"
        };
    }
  };

  const getPreviewContent = () => {
    if (item.type === "youtube") {
      const videoId = item.link.includes('watch?v=') 
        ? item.link.split('watch?v=')[1]?.split('&')[0]
        : item.link.split('youtu.be/')[1]?.split('?')[0];
      
      if (videoId && !imageError) {
        return (
          <div className="relative aspect-video bg-gray-100 rounded-xl overflow-hidden group">
            <img 
              src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
              alt="Video thumbnail"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              onError={() => setImageError(true)}
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
            <div className="absolute bottom-3 right-3 bg-black/80 text-white px-2 py-1 rounded text-xs font-medium">
              {Math.floor(Math.random() * 10) + 1}:{Math.floor(Math.random() * 60).toString().padStart(2, '0')}
            </div>
          </div>
        );
      }
    }

    if (item.type === "twitter") {
      const fixedLink = item.link.replace("x.com", "twitter.com");
      
      // Get tweet ID for direct iframe embedding
      const tweetId = fixedLink.split('/status/')[1]?.split('?')[0];
      
      if (tweetId) {
        // Use Twitter's embed iframe directly
        return (
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <iframe
              src={`https://platform.twitter.com/embed/Tweet.html?id=${tweetId}`}
              className="w-full h-auto min-h-[200px] border-0"
              allowTransparency={true}
              frameBorder="0"
              scrolling="no"
            />
          </div>
        );
      } else {
        // Fallback to blockquote method
        return (
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <blockquote className="twitter-tweet" data-theme="light" data-conversation="none">
              <a href={fixedLink}>Loading Tweet...</a>
            </blockquote>
          </div>
        );
      }
    }
    
    return (
      <div className="aspect-video bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl flex items-center justify-center group hover:from-gray-100 hover:to-gray-200 transition-all duration-300">
        <div className="text-gray-400 group-hover:text-gray-500 transition-colors">
          {getTypeConfig().icon || (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          )}
        </div>
      </div>
    );
  };

  const typeConfig = getTypeConfig();

  return (
    <div className="group cursor-pointer">
      <div className="bg-white rounded-2xl border border-gray-200/60 hover:border-gray-300/80 transition-all duration-300 hover:shadow-xl hover:shadow-gray-100/50 p-5">
        {/* Preview */}
        {item.type === "twitter" ? (
          <div className="mb-4">
            {getPreviewContent()}
          </div>
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
            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg ${typeConfig.bg} ${typeConfig.text}`}>
              {typeConfig.icon}
              <span className="text-xs font-semibold uppercase tracking-wide">
                {typeConfig.label}
              </span>
            </div>
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </div>
          </div>
           
          <h3 className="font-semibold text-gray-900 text-sm leading-snug line-clamp-2 group-hover:text-gray-700 transition-colors">
            {item.title}
          </h3>
           
          {item.tags && item.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {item.tags.slice(0, 3).map((tag, i) => (
                <span key={i} className="text-xs text-gray-500 bg-gray-100 hover:bg-gray-200 px-2.5 py-1 rounded-full transition-colors">
                  #{tag}
                </span>
              ))}
              {item.tags.length > 3 && (
                <span className="text-xs text-gray-400 px-2.5 py-1">
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
        const response = await axios.get(`${BACKEND_URL}/api/v1/brain/${shareLink}`);
        setData(response.data);
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to load shared brain");
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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-10 h-10 border-3 border-gray-200 border-t-gray-900 rounded-full animate-spin mx-auto"></div>
            <div className="absolute inset-0 w-10 h-10 border-3 border-transparent border-r-gray-400 rounded-full animate-spin mx-auto" style={{ animationDirection: 'reverse', animationDuration: '0.8s' }}></div>
          </div>
          <p className="mt-6 text-gray-600 font-medium">Loading brain...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Unable to load brain</h2>
          <p className="text-gray-600 mb-8 leading-relaxed">{error}</p>
          <a 
            href="/" 
            className="inline-flex items-center px-6 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors font-medium shadow-sm"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to home
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
     
      <div className="bg-white border-b border-gray-200/60">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex items-end justify-between">
            <div className="space-y-2">
              <h1 className="text-5xl font-bold text-gray-900 tracking-tight">
                {data?.username}
              </h1>
              <p className="text-xl text-gray-600 font-medium">
                Knowledge Collection
              </p>
              <div className="flex items-center gap-3 pt-2">
                <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-500 font-medium">Shared publicly</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-7xl font-light text-gray-300 leading-none">
                {String(data?.content?.length || 0).padStart(2, '0')}
              </div>
              <div className="text-sm text-gray-500 font-semibold tracking-widest mt-1">
                ITEMS
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {data?.content && data.content.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {data.content.map((item) => (
              <PremiumCard key={item._id} item={item} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0-1.125.504-1.125 1.125V11.25a9 9 0 00-9-9z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Empty collection</h3>
            <p className="text-gray-600 text-lg max-w-md mx-auto leading-relaxed">
              This brain hasn't been populated with content yet. Check back soon to see what gets added.
            </p>
          </div>
        )}
      </div>

      {/* Footer CTA */}
      <div className="bg-white border-t border-gray-200/60 mt-20">
        <div className="max-w-7xl mx-auto px-6 py-16 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to build your own brain?
          </h2>
          <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
            Create your personal knowledge collection and share it with the world. 
            Organize everything from videos to articles to notes in one beautiful space.
          </p>
          <a 
            href="/signup" 
            className="inline-flex items-center px-8 py-4 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Start building
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}