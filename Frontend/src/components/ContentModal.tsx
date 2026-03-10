import axios from "axios";
import { CloseIcon } from "../icons/CloseIcon";
import { ButtonCustom } from "./Button";
import { InputComponent } from "./Input";
import { useRef, useState } from "react";
import { BACKEND_URL } from "./config";
import MDEditor from "@uiw/react-md-editor";
import type { Workspace } from "../hooks/useWorkspaces";

const ContentType = {
  Youtube: "youtube",
  Twitter: "twitter",
  Note: "note",
  Link: "link",
} as const;

type ContentTypeVal = typeof ContentType[keyof typeof ContentType];

export function CreateContentModal({
  open,
  onClose,
  onContentAdded,
  workspaces = [],
  defaultWorkspaceId = null,
}: {
  open: boolean;
  onClose: () => void;
  onContentAdded: () => void;
  workspaces?: Workspace[];
  defaultWorkspaceId?: string | null;
}) {
  const [noteContent, setNoteContent] = useState("");
  const [error, setError] = useState("");
  const titleRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);
  const [type, setType] = useState<ContentTypeVal>(ContentType.Youtube);
  const [selectedWorkspace, setSelectedWorkspace] = useState<string | null>(defaultWorkspaceId);
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  function handleTagKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if ((e.key === "Enter" || e.key === ",") && tagInput.trim()) {
      e.preventDefault();
      const newTag = tagInput.trim().replace(/^#/, "");
      if (newTag && !tags.includes(newTag)) {
        setTags((prev) => [...prev, newTag]);
      }
      setTagInput("");
    }
    if (e.key === "Backspace" && !tagInput && tags.length > 0) {
      setTags((prev) => prev.slice(0, -1));
    }
  }

  function removeTag(tag: string) {
    setTags((prev) => prev.filter((t) => t !== tag));
  }

  function addContent() {
    const title = titleRef.current?.value;
    const link = linkRef.current?.value;

    // Clear previous errors
    setError("");

    const payload: any = {
      title,
      type,
      tags,
      ...(selectedWorkspace && { workspaceId: selectedWorkspace }),
    };

    if (!title?.trim()) {
      setError("Title is required!");
      return;
    }

    if (type === "note") {
      if (!noteContent.trim()) {
        setError("Content is required for notes!");
        return;
      }
      payload.content = noteContent;
    } else {
      if (!link?.trim()) {
        setError("Link is required!");
        return;
      }
      payload.link = link;
    }

    axios
      .post(`${BACKEND_URL}/api/v1/content`, payload, {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      })
      .then(() => {
        if (titleRef.current) titleRef.current.value = "";
        if (linkRef.current) linkRef.current.value = "";
        setNoteContent("");
        setTags([]);
        setTagInput("");
        setError("");
        onContentAdded();
        onClose();
      })
      .catch((err) => {
        console.error("Failed to add content:", err);
        const errorMessage = err.response?.data?.message || err.message || "Unknown error occurred";
        setError("Failed to add content: " + errorMessage);
      });
  }

  return (
    <>
      {open && (
        <div className="h-screen w-screen backdrop-blur-lg bg-white/20 fixed top-0 left-0 flex justify-center items-center z-50">
          <div className="bg-white text-gray-900 p-10 rounded-2xl shadow-lg relative max-w-lg w-full flex flex-col items-center">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition"
            >
              <div onClick={onClose}>
                <CloseIcon />
              </div>
            </button>

            <h2 className="text-xl font-semibold mb-4 text-center">
              Create New Content
            </h2>

            {error && (
              <div className="w-full mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
                <p className="text-red-700 text-sm" role="alert" aria-live="polite">
                  {error}
                </p>
              </div>
            )}

            <div className="text-black space-y-3 w-full">
              <InputComponent ref={titleRef} placeholder={"Title"} />

              {(type === "youtube" ||
                type === "link" ||
                type === "twitter") && (
                <InputComponent ref={linkRef} placeholder={"Link"} />
              )}

              {type === "note" && (
                <div data-color-mode="light">
                  <label className="block text-xs text-gray-500 mb-1">
                    Content (Markdown supported)
                  </label>
                  <MDEditor
                    value={noteContent}
                    onChange={(val) => setNoteContent(val || "")}
                    preview="edit"
                    height={200}
                    textareaProps={{
                      placeholder: "Write your note in markdown...\n\n# Heading\n**bold** *italic* ~~strikethrough~~\n- list item\n> blockquote\n`code`",
                    }}
                  />
                </div>
              )}
            </div>

            <div className="text-left font-medium w-full">
              <h1 className="p-2">Type</h1>
              <div className="flex gap-2 flex-wrap">
                {Object.entries(ContentType).map(([key, val]) => (
                  <ButtonCustom
                    key={val}
                    text={key}
                    varient={type === val ? "primary" : "secondary"}
                    onClick={() => setType(val)}
                  />
                ))}
              </div>
            </div>

            {/* Tags input */}
            <div className="text-left w-full mt-3">
              <label className="block text-sm font-medium text-gray-700 px-2 mb-1.5">Tags</label>
              <div className="flex flex-wrap items-center gap-1.5 w-full px-3 py-2 rounded-lg border border-gray-300 bg-white focus-within:ring-2 focus-within:ring-gray-400 min-h-[42px]">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-1 rounded-md"
                  >
                    #{tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                  </span>
                ))}
                <input
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleTagKeyDown}
                  placeholder={tags.length === 0 ? "Type a tag and press Enter" : ""}
                  className="flex-1 min-w-[80px] text-sm outline-none bg-transparent"
                />
              </div>
            </div>

            {workspaces.length > 0 && (
              <div className="text-left w-full mt-2">
                <label className="block text-sm font-medium text-gray-700 px-2 mb-1.5">Workspace</label>
                <select
                  value={selectedWorkspace || ""}
                  onChange={(e) => setSelectedWorkspace(e.target.value || null)}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-gray-400"
                >
                  <option value="">No workspace</option>
                  {workspaces.map((ws) => (
                    <option key={ws._id} value={ws._id}>{ws.name}</option>
                  ))}
                </select>
              </div>
            )}

            <div className="pt-6">
              <ButtonCustom
                onClick={addContent}
                varient="primary"
                text="Submit"
                icon={undefined}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
