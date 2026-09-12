import type { ContentType } from "../../types/content";

export interface PreviewItem {
  id: string;
  type: ContentType;
  typeLabel: string;
  title: string;
  content: string;
  source: string;
  savedAt: string;
  tags: string[];
  isPinned?: boolean;
}

export interface SavedType {
  type: ContentType;
  label: string;
  description: string;
}

export interface HowItWorksStep {
  index: string;
  title: string;
  description: string;
  bullets: string[];
}

export const PREVIEW_ITEMS: PreviewItem[] = [
  {
    id: "design-constraints",
    type: "youtube",
    typeLabel: "YouTube",
    title: "Designing with Constraints",
    content:
      "How limiting palette and type scale early speeds up decisions later in a project.",
    source: "youtube.com",
    savedAt: "2d ago",
    tags: ["design", "watch-later"],
    isPinned: true,
  },
  {
    id: "note-taking",
    type: "twitter",
    typeLabel: "X Thread",
    title: "On note-taking",
    content:
      "Most people don't have a note problem, they have a retrieval problem.",
    source: "x.com",
    savedAt: "5d ago",
    tags: ["notes", "thread"],
  },
  {
    id: "contract-checklist",
    type: "note",
    typeLabel: "Note",
    title: "Freelance Contract Checklist",
    content:
      "Scope, milestones, revision limits, kill fee, file ownership. Send before kickoff.",
    source: "written note",
    savedAt: "1w ago",
    tags: ["work", "reference"],
  },
  {
    id: "tailwind-docs",
    type: "link",
    typeLabel: "Link",
    title: "Tailwind CSS Documentation",
    content:
      "Utility-first reference for spacing scale and arbitrary value syntax.",
    source: "tailwindcss.com",
    savedAt: "2w ago",
    tags: ["dev", "bookmark"],
  },
];

export const PREVIEW_FILTERS = ["All", "YouTube", "X", "Notes", "Links"];

export interface PreviewWorkspace {
  id: string;
  name: string;
  color: string;
  count: number;
}

export const PREVIEW_WORKSPACES: PreviewWorkspace[] = [
  { id: "design", name: "Design", color: "#D97706", count: 12 },
  { id: "reading", name: "Reading", color: "#2563EB", count: 8 },
  { id: "work", name: "Work", color: "#059669", count: 5 },
];

export const SAVED_TYPES: SavedType[] = [
  {
    type: "youtube",
    label: "YouTube",
    description: "Save videos with title and context intact.",
  },
  {
    type: "twitter",
    label: "X / Twitter",
    description: "Keep threads and posts retrievable.",
  },
  {
    type: "note",
    label: "Notes & docs",
    description: "Write and keep reference notes together.",
  },
  {
    type: "link",
    label: "Links",
    description: "Bookmark articles and resources.",
  },
];

export const HOW_IT_WORKS_STEPS: HowItWorksStep[] = [
  {
    index: "01",
    title: "Save in one click",
    description:
      "Drop a YouTube link, X post, note, or URL. Cognia parses and stores it with its context.",
    bullets: ["One-click save", "Automatic type detection"],
  },
  {
    index: "02",
    title: "Organize without effort",
    description:
      "Tag items, pin priorities, and group related saves into workspaces.",
    bullets: ["Tags and pins", "Workspaces", "Grid and list views"],
  },
  {
    index: "03",
    title: "Find it instantly",
    description:
      "Search across titles, content, and tags. Share a workspace when you need to.",
    bullets: ["Full-text search", "Sort and filter", "Shareable brain link"],
  },
];
