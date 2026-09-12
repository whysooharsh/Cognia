import { useEffect } from "react";
import axios from "axios";
import MDEditor from "@uiw/react-md-editor";
import { toast } from "react-hot-toast";

import { DeleteIcon, DocIcon, ShareLink, XIcon, Youtube } from "../icons";
import { BACKEND_URL } from "./config";

interface WindowWithTwitter {
  twttr?: {
    widgets?: {
      load: () => void;
    };
  };
}

interface CardProps {
  id: string;
  title: string;
  link: string;
  content: string;
  type: "twitter" | "youtube" | "note" | "link";
  tags?: string[];
  isPinned?: boolean;
  createdAt?: string;
  onDelete?: (id: string) => void;
  isSharedView?: boolean;
  onExpand?: () => void;
  onPin?: (id: string) => void;
  onTagClick?: (tag: string) => void;
}

function PinIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      className="w-4 h-4"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      viewBox="0 0 24 24"
      strokeWidth={2}
      aria-hidden="true"
    >
      <path d="M16 12V4h1V2H7v2h1v8l-2 2v2h5.2v6h1.6v-6H18v-2l-2-2z" />
    </svg>
  );
}

export function Card({ id, title, link, type, content, tags, isPinned = false, createdAt, onDelete, isSharedView = false, onExpand, onPin, onTagClick }: CardProps) {

  useEffect(() => {
    if (type === "twitter") {
      const twttr = (window as unknown as WindowWithTwitter).twttr;
      twttr?.widgets?.load();
    }
  }, [type, link]);

  const cardClasses = `group relative rounded-xl bg-white shadow-sm hover:shadow-md p-5 flex flex-col gap-4 border h-full w-full transition-shadow duration-200 ${isPinned ? "border-amber-300 ring-1 ring-amber-100" : "border-gray-200 hover:border-gray-300"}`;

  const renderContent = () => {
    if (type === "youtube") {
      const embedLink = link
        .replace("watch?v=", "embed/")
        .replace("youtu.be/", "youtube.com/embed/");

      return (
        <div className="overflow-hidden rounded-lg">
          <iframe
            className="w-full h-48 border-0"
            src={embedLink}
            title={title}
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
      );
    }

    if (type === "twitter") {
      const fixedLink = link.replace("x.com", "twitter.com");
      return (
        <div className="max-h-72 overflow-hidden rounded-lg">
          <blockquote className="twitter-tweet" data-theme="light">
            <a href={fixedLink}>Loading Tweet...</a>
          </blockquote>
        </div>
      );
    }

    if (type === "note") {
      return (
        <div
          className="bg-gray-50 p-4 rounded-lg border border-gray-200 max-h-48 overflow-hidden relative cursor-pointer"
          onClick={onExpand}
          data-color-mode="light"
        >
          <MDEditor.Markdown
            source={content || "No content available"}
            style={{ background: "transparent", fontSize: "0.875rem" }}
          />
          {content && content.length > 200 && (
            <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-gray-50 to-transparent flex items-end justify-center pb-1">
              <span className="text-xs text-gray-500 font-medium">Click to expand</span>
            </div>
          )}
        </div>
      );
    }

    if (type === "link") {
      return (
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 space-y-2">
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-blue-600 font-medium hover:underline break-words text-sm"
          >
            {link}
          </a>
        </div>
      );
    }

    return null;
  };

  const getIconType = () => {
    switch (type) {
      case "youtube":
        return <Youtube />;
      case "twitter":
        return <XIcon />;
      case "note":
        return <DocIcon />;
      case "link":
        return <ShareLink />
      default:
        return <DocIcon />;
    }
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${BACKEND_URL}/api/v1/content/${id}`, {
        headers: { Authorization: token }
      });

      toast.success("Content deleted successfully!");

      if (onDelete) {
        onDelete(id);
      }
    }
    catch (error) {
      console.error("Delete error:", error);
      toast.error("Failed to delete content");
    }
  }

  const formattedDate = createdAt
    ? new Date(createdAt).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })
    : null;

  return (
    <div className={cardClasses}>
      <div className="flex justify-between items-start gap-3">
        <div className="flex items-center gap-2.5 text-gray-600 flex-1 min-w-0">
          <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center shrink-0 group-hover:bg-gray-900 group-hover:text-white transition-colors">
            {getIconType()}
          </div>
          <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 flex-1">{title}</h3>
        </div>
        {!isSharedView && (
          <div className="flex items-center gap-0.5 shrink-0">
            <button
              onClick={() => onPin?.(id)}
              className={`p-2 rounded-lg transition-all ${
                isPinned
                  ? "text-amber-500 hover:bg-amber-50"
                  : "text-gray-400 hover:text-amber-500 hover:bg-amber-50 lg:opacity-0 lg:group-hover:opacity-100 lg:focus-visible:opacity-100"
              }`}
              title={isPinned ? "Unpin" : "Pin to top"}
              aria-label={isPinned ? "Unpin" : "Pin to top"}
            >
              <PinIcon filled={isPinned} />
            </button>
            <button
              onClick={handleDelete}
              className="p-2 hover:bg-red-50 rounded-lg text-gray-400 hover:text-red-600 transition-all lg:opacity-0 lg:group-hover:opacity-100 lg:focus-visible:opacity-100"
              title="Delete"
              aria-label="Delete"
            >
              <DeleteIcon />
            </button>
          </div>
        )}
      </div>

      <div className="flex-grow">{renderContent()}</div>

      <div className="mt-auto flex items-end justify-between gap-3 border-t border-gray-100 pt-3">
        <div className="flex flex-wrap gap-1.5 flex-1 min-w-0">
          {tags && tags.length > 0 ? (
            tags.slice(0, 4).map((tag) => (
              <button
                key={tag}
                onClick={() => onTagClick?.(tag)}
                className="bg-gray-100 text-gray-700 text-xs px-2.5 py-1 rounded-md font-medium hover:bg-gray-900 hover:text-white transition-colors cursor-pointer"
              >
                #{tag}
              </button>
            ))
          ) : (
            <span className="text-xs text-gray-300">No tags</span>
          )}
          {tags && tags.length > 4 && (
            <span className="text-xs text-gray-400 self-center">+{tags.length - 4}</span>
          )}
        </div>
        {formattedDate && (
          <span className="text-xs text-gray-400 shrink-0">{formattedDate}</span>
        )}
      </div>
    </div>
  );
}
