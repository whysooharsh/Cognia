import { DeleteIcon } from "../icons/DeleteIcon";
import { DocIcon } from "../icons/DocIcon";
import { useEffect, useState } from "react";
import { Youtube } from "../icons/VideoIcon";
import { XIcon } from "../icons/XIcon";
import axios from "axios";
import { BACKEND_URL } from "./config";
import { ShareLink } from "../icons/ShareLink";
import { toast } from "react-hot-toast";
import MDEditor from "@uiw/react-md-editor";

interface CardProps {
  id: string;
  title: string;
  link: string;
  content: string;
  type: "twitter" | "youtube" | "note" | "link";
  tags?: string[];
  onDelete?: (id: string) => void;
  isSharedView?: boolean;
  onExpand?: () => void;
}

export function Card({ id, title, link, type, content, tags, onDelete, isSharedView = false, onExpand }: CardProps) {

  useEffect(() => { 
    if (type === "twitter" && (window as any).twttr?.widgets) {
      (window as any).twttr.widgets.load();
    }
  }, [type]);

  const getCardClasses = () => {
    return "group rounded-xl bg-white shadow-sm hover:shadow-xl p-5 flex flex-col space-y-4 border border-gray-200 hover:border-gray-300 w-full h-fit transition-all duration-200 hover:scale-[1.02]";
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
        headers : {Authorization : token}
      });

      toast.success("Content deleted successfully!");
      
      if (onDelete) {
        onDelete(id);
      }
    }
    catch (error){
      toast.error("Failed to delete content");
    }
  }

  return (
    <div className={getCardClasses()}>
      <div className="flex justify-between items-start gap-3">
        <div className="flex items-center gap-2.5 text-gray-600 flex-1">
          <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center group-hover:bg-gray-900 group-hover:text-white transition-colors">
            {getIconType()}
          </div>
          <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 flex-1">{title}</h3>
        </div>
        {!isSharedView && (
          <button
            onClick={handleDelete}
            className="opacity-0 group-hover:opacity-100 p-2 hover:bg-red-50 rounded-lg text-gray-400 hover:text-red-600 transition-all"
            title="Delete"
          >
            <DeleteIcon />
          </button>
        )}
      </div>

      <div className="flex-grow">{renderContent()}</div>

      <div className="mt-auto space-y-3">
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {tags.map((tag, i) => (
              <span
                key={i}
                className="bg-gray-100 text-gray-700 text-xs px-2.5 py-1 rounded-md font-medium hover:bg-gray-200 transition-colors"
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
