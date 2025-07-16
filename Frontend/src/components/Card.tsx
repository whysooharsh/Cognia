import { DeleteIcon } from "../icons/DeleteIcon";
import { DocIcon } from "../icons/DocIcon";
import { ShareIcon } from "../icons/ShareIcon";

interface CardProps {
    title: string,
    link: string,
    type: "twitter" | "youtube" | "todo",
    tasks?: string[],
    tags?: string[];
}

export function Card({ title, link, type, tasks, tags }: CardProps) {

    const renderContent = () => {
        if (type === "youtube") {
            return (
                <iframe
                    className="w-full"
                    src={link}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                ></iframe>
            );
        }
        if (type === "twitter") {
            return (
                <>
                    <blockquote className="twitter-tweet">
                        <a href={link}></a>
                    </blockquote>
                    <script
                        async
                        src="https://platform.twitter.com/widgets.js"
                        charSet="utf-8"
                    ></script>
                </>
            )
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

            )
        }
        return null;
    };

    return (
        <div className="max-w-72 max-h-80 rounded-xl bg-white shadow-sm p-4 flex flex-col space-y-4 border border-gray-200">


            <div className="flex justify-between items-center">
                <div className="flex items-center gap-2 text-gray-600">
                    <DocIcon />
                    <h3 className="text-sm font-medium text-gray-800">{title}</h3>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                    <ShareIcon />
                    <DeleteIcon />
                </div>
            </div>

            <div className="pt-6 pb-2">

                {renderContent()}
            </div>
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
    );
}
