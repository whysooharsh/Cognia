import { CloseIcon } from "../icons/CloseIcon";
import { useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import axios from "axios";
import { BACKEND_URL } from "./config";
import { toast } from "react-hot-toast";

interface ContentDetailModalProps {
  open: boolean;
  onClose: () => void;
  id: string;
  title: string;
  content: string;
  type: string;
  link: string;
  tags?: string[];
  onUpdated?: () => void;
}

export function ContentDetailModal({
  open,
  onClose,
  id,
  title,
  content,
  type,
  link,
  tags,
  onUpdated,
}: ContentDetailModalProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(content);
  const [editTitle, setEditTitle] = useState(title);
  const [saving, setSaving] = useState(false);

  if (!open) return null;

  const handleSave = async () => {
    setSaving(true);
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${BACKEND_URL}/api/v1/content/${id}`,
        {
          title: editTitle,
          content: editContent,
        },
        { headers: { Authorization: token } }
      );
      toast.success("Content updated!");
      setIsEditing(false);
      onUpdated?.();
    } catch (err) {
      toast.error("Failed to update content");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setEditContent(content);
    setEditTitle(title);
    setIsEditing(false);
  };

  return (
    <div
      className="fixed inset-0 backdrop-blur-lg bg-black/30 flex justify-center items-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[85vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          {isEditing ? (
            <input
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="text-xl font-semibold text-gray-900 flex-1 mr-4 px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          ) : (
            <h2 className="text-xl font-semibold text-gray-900 flex-1 mr-4 truncate">
              {title}
            </h2>
          )}
          <div className="flex items-center gap-2">
            {type === "note" && !isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg className="w-4 h-4 inline mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Edit
              </button>
            )}
            {isEditing && (
              <>
                <button
                  onClick={handleCancel}
                  className="px-3 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="px-3 py-1.5 text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 rounded-lg transition-colors disabled:opacity-50"
                >
                  {saving ? "Saving..." : "Save"}
                </button>
              </>
            )}
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <CloseIcon />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6" data-color-mode="light">
          {type === "note" ? (
            isEditing ? (
              <MDEditor
                value={editContent}
                onChange={(val) => setEditContent(val || "")}
                preview="live"
                height={400}
                textareaProps={{
                  placeholder: "Write your note in markdown...",
                }}
              />
            ) : (
              <div className="prose prose-gray max-w-none">
                <MDEditor.Markdown
                  source={content || "No content available"}
                  style={{ background: "transparent" }}
                />
              </div>
            )
          ) : type === "youtube" ? (
            <div className="aspect-video w-full">
              <iframe
                className="w-full h-full rounded-lg"
                src={link
                  .replace("watch?v=", "embed/")
                  .replace("youtu.be/", "youtube.com/embed/")}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          ) : type === "twitter" ? (
            <div>
              <blockquote className="twitter-tweet" data-theme="light">
                <a href={link.replace("x.com", "twitter.com")}>
                  Loading Tweet...
                </a>
              </blockquote>
            </div>
          ) : type === "link" ? (
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 font-medium hover:underline break-words"
              >
                {link}
              </a>
            </div>
          ) : null}
        </div>

        {/* Footer with tags */}
        {tags && tags.length > 0 && (
          <div className="px-6 py-3 border-t border-gray-200 flex flex-wrap gap-1.5">
            {tags.map((tag, i) => (
              <span
                key={i}
                className="bg-gray-100 text-gray-700 text-xs px-2.5 py-1 rounded-md font-medium"
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
