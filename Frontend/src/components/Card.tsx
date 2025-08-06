import { DeleteIcon } from "../icons/DeleteIcon";
import { DocIcon } from "../icons/DocIcon";
import { useEffect } from "react";
import { Youtube } from "../icons/VideoIcon";
import { XIcon } from "../icons/XIcon";
import axios from "axios";
import { BACKEND_URL } from "./config";
import { ShareLink } from "../icons/ShareLink";

interface CardProps {
  id: string;
  title: string;
  link: string;
  content: string;
  type: "twitter" | "youtube" | "note" | "link";
  tags?: string[];
  onDelete?: (id: string) => void;
  isSharedView?: boolean;
}

export function Card({ id, title, link, type, content, tags, onDelete, isSharedView = false }: CardProps) {
 
  useEffect(() => {
    if (type === "twitter" && (window as any).twttr?.widgets) {
      (window as any).twttr.widgets.load();
    }
  }, [type]);

  const getCardClasses = () => {
    return "rounded-xl bg-white shadow-sm p-4 flex flex-col space-y-4 border border-gray-200 w-full h-fit";
  };

  const renderContent = () => {
    if (type === "youtube") {
      const embedLink = link
        .replace("watch?v=", "embed/")
        .replace("youtu.be/", "youtube.com/embed/");

      return (
        <iframe
          className="w-full h-48"
          src={embedLink}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      );
    }

    if (type === "twitter") {
      const fixedLink = link.replace("x.com", "twitter.com");
      return (
        <div className="max-h-64 overflow-auto">
          <blockquote className="twitter-tweet" data-theme="light">
            <a href={fixedLink}>Loading Tweet...</a>
          </blockquote>
        </div>
      );
    }

 if (type === "note") {
    return (
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 space-y-2">  
        <p className="text-sm text-gray-800 whitespace-pre-wrap leading-relaxed">
          {content  || 'No content available'}
        </p>
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

  return (
    <div className={getCardClasses()}>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2 text-gray-600">
          {getIconType()}
          <h3 className="text-sm font-medium text-gray-800">{title}</h3>
        </div>
        {!isSharedView && (
          <div className="flex items-center gap-3 text-gray-600">
            <button
              onClick={async () => {
                try {
                  const token = localStorage.getItem("token");
                  await axios.delete(`${BACKEND_URL}/api/v1/content/${id}`, {
                    headers: {
                      Authorization: token,
                    }
                  });
                  alert("Deleted successfully!");

                  if (onDelete) {
                    onDelete(id);
                  }
                } catch (error) {
                  console.error("Delete failed", error);
                  alert("Failed to delete content");
                }
              }}
              className="hover:text-red-500 transition-colors"
            >
              <DeleteIcon />
            </button>
          </div>
        )}
      </div>

      <div className="flex-grow">{renderContent()}</div>

      <div className="mt-auto space-y-3">
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, i) => (
              <span
                key={i}
                className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}


      </div>
    </div>
  );
}
