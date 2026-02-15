import { CloseIcon } from "../icons/CloseIcon";
import { ButtonCustom } from "./Button";
import { useState } from "react";

const COLORS = [
  "#EF4444", // red
  "#F97316", // orange
  "#EAB308", // yellow
  "#22C55E", // green
  "#06B6D4", // cyan
  "#3B82F6", // blue
  "#8B5CF6", // violet
  "#EC4899", // pink
  "#6B7280", // gray
];

interface CreateWorkspaceModalProps {
  open: boolean;
  onClose: () => void;
  onCreate: (name: string, color: string) => Promise<void>;
}

export function CreateWorkspaceModal({ open, onClose, onCreate }: CreateWorkspaceModalProps) {
  const [name, setName] = useState("");
  const [color, setColor] = useState(COLORS[5]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const handleSubmit = async () => {
    if (!name.trim()) {
      setError("Workspace name is required");
      return;
    }
    setLoading(true);
    try {
      await onCreate(name.trim(), color);
      setName("");
      setColor(COLORS[5]);
      setError("");
      onClose();
    } catch (err) {
      setError("Failed to create workspace");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 backdrop-blur-lg bg-black/30 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-sm relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition"
        >
          <CloseIcon />
        </button>

        <h2 className="text-lg font-semibold text-gray-900 mb-5">New Workspace</h2>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1.5">Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. React Learning, Work Notes..."
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400"
              autoFocus
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-500 mb-2">Color</label>
            <div className="flex gap-2 flex-wrap">
              {COLORS.map((c) => (
                <button
                  key={c}
                  onClick={() => setColor(c)}
                  className={`w-8 h-8 rounded-full transition-all ${
                    color === c ? "ring-2 ring-offset-2 ring-gray-900 scale-110" : "hover:scale-110"
                  }`}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </div>

          {/* Preview */}
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <div className="w-5 h-5 rounded" style={{ backgroundColor: color }} />
            <span className="text-sm font-medium text-gray-700">{name || "Workspace Name"}</span>
          </div>
        </div>

        <div className="mt-6">
          <ButtonCustom
            onClick={handleSubmit}
            varient="primary"
            text={loading ? "Creating..." : "Create Workspace"}
            icon={undefined}
          />
        </div>
      </div>
    </div>
  );
}
