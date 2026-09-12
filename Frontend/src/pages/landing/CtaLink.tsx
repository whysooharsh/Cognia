import { Link } from "react-router-dom";
import type { ReactNode } from "react";

type CtaVariant = "primary" | "secondary";

interface CtaLinkProps {
  to: string;
  variant: CtaVariant;
  children: ReactNode;
}

const VARIANT_CLASSES: Record<CtaVariant, string> = {
  primary: "bg-ink text-paper hover:opacity-90",
  secondary: "border border-ink/15 bg-white/60 text-ink hover:bg-white",
};

export default function CtaLink({ to, variant, children }: CtaLinkProps) {
  return (
    <Link
      to={to}
      className={`inline-flex w-full items-center justify-center rounded-full px-8 py-3.5 text-sm font-semibold transition active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink sm:w-auto ${VARIANT_CLASSES[variant]}`}
    >
      {children}
    </Link>
  );
}
