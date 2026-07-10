import type { ReactElement } from "react";

interface ButtonProps {
  varient: "primary" | "secondary";
  text: string;
  icon?: ReactElement | undefined;
  onClick?: () => void;
  fullWidth?: boolean;
  loading?: boolean;
}

const varientClasses = {
  primary: "bg-ink text-paper hover:opacity-90 active:scale-[0.98]",
  secondary: "bg-ink/5 text-ink hover:bg-ink/10 active:scale-[0.98]"
};

const defaultStyles = "px-5 py-3 rounded-full font-semibold flex items-center justify-center text-center transition-all duration-150 select-none ";

export function ButtonCustom({ varient, text, icon, onClick, fullWidth = false, loading = false }: ButtonProps) {
  const widthClass = fullWidth ? "w-full" : "";
  const loadingClass = loading ? "opacity-70" : ""; 
  
  return (
    <button 
      onClick={onClick} 
      className={`${varientClasses[varient]} ${defaultStyles} ${widthClass} ${loadingClass} hover:cursor-pointer`}
    >
      <span className="flex items-center">
        {icon && <span className="pr-2">{icon}</span>}
        <span>{text}</span>
      </span>
    </button>
  );
}