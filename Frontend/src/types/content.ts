export type ContentType = "note" | "youtube" | "twitter" | "link";

export const CONTENT_TYPES: Record<string, ContentType> = {
  Note: "note",
  Youtube: "youtube",
  Twitter: "twitter",
  Link: "link",
};

export interface ContentItem {
  _id: string;
  title: string;
  link?: string;
  content?: string;
  type: ContentType;
  tags?: string[];
  workspaceId?: string | null;
  isPinned?: boolean;
  createdAt?: string;
  updatedAt?: string;
}
