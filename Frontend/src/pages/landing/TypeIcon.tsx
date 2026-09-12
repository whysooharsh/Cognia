import { DocIcon, ShareLink, XIcon, Youtube } from "../../icons";
import type { ContentType } from "../../types/content";

interface TypeIconProps {
  type: ContentType;
}

export default function TypeIcon({ type }: TypeIconProps) {
  return (
    <span
      aria-hidden="true"
      className="inline-flex [&_div]:contents [&_svg]:h-4 [&_svg]:w-4"
    >
      {type === "youtube" ? (
        <Youtube />
      ) : type === "twitter" ? (
        <XIcon />
      ) : type === "link" ? (
        <ShareLink />
      ) : (
        <DocIcon />
      )}
    </span>
  );
}
