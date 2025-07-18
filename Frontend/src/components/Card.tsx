import { DeleteIcon } from "../icons/DeleteIcon";
import { DocIcon } from "../icons/DocIcon";
import { ShareIcon } from "../icons/ShareIcon";
import { useEffect } from "react";
import { Youtube } from "../icons/VideoIcon";
import { XIcon } from "../icons/XIcon";

interface CardProps {
  title: string;
  link: string;
  type: "twitter" | "youtube" | "todo";
  tasks?: string[];
  tags?: string[];
}


export function Card({ title, link, type, tasks, tags }: CardProps) {
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
        .replace("watch", "embed");

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

    if (type === "todo" && tasks) {
      return (
        <>
          <h1 className="text-lg font-semibold text-gray-900">Tasks</h1>
          <ul className="list-disc list-inside space-y-1 text-gray-800 text-sm">
            {tasks.map((task, i) => (
              <li key={i}>{task}</li>
            ))}
          </ul>
        </>
      );
    }

    return null;
  };
  const getIconType = () => {
    switch(type) {
      case "youtube" :
        return <Youtube/>;
      case "twitter" :
        return <XIcon/>;
      case "todo" : 
        return <DocIcon/>;
      default :
        return <DocIcon/>;
    }
  };

  return (
    <div className={getCardClasses()}>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2 text-gray-600">
          {getIconType()}
          <h3 className="text-sm font-medium text-gray-800">{title}</h3>
        </div>
        <div className="flex items-center gap-3 text-gray-600">
          <ShareIcon />
          <DeleteIcon />
        </div>
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

        <div className="text-xs text-gray-400">Added on 12/05/23</div>
      </div>
    </div>
  );
}
