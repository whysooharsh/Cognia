import axios from "axios";
import { CloseIcon } from "../icons/CloseIcon";
import { ButtonCustom } from "./Button";
import { InputComponent } from "./Input";
import { useRef, useState } from "react";
import { BACKEND_URL } from "./config";

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
}: {
  open: boolean;
  onClose: () => void;
  onContentAdded: () => void;
}) {
  const [noteContent, setNoteContent] = useState("");
  const [error, setError] = useState("");
  const titleRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);
  const [type, setType] = useState<ContentTypeVal>(ContentType.Youtube);

  function addContent() {
    const title = titleRef.current?.value;
    const link = linkRef.current?.value;

    // Clear previous errors
    setError("");

    const payload: any = {
      title,
      type,
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
          <div className="bg-white text-gray-900 p-10 rounded-2xl shadow-lg relative max-w-md w-full flex flex-col items-center">
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
                <div>
                  <label className="block text-xs text-gray-500 mb-1">
                    Content
                  </label>
                  <textarea
                    value={noteContent}
                    onChange={(e) => setNoteContent(e.target.value)}
                    placeholder="Write your note..."
                    rows={4}
                    className="w-full px-4 py-2 rounded-md border border-gray-300 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 resize-vertical"
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
