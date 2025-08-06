import type { ReactElement } from "react";

interface ButtonProps{
    varient : "primary" | "secondary";
    text : string;
    icon? : ReactElement | undefined;
    onClick? : () => void;
    fullWidth? : boolean;
    loading? : boolean;
}

const varientClasses = {
    "primary" : "bg-gray-500 text-white ",
    "secondary" : "bg-gray-200 text-gray-800 "
};


const defaultStyles = "px-4 py-3 rounded-lg font-medium flex items-center justify-center text-center transition-all duration-200 ";

export function ButtonCustom({varient, text, icon, onClick, fullWidth = false, loading=false}: ButtonProps){
    const widthClass = fullWidth ? "w-full" : "";
    const loadingClass = loading ? "opacity-70" : ""; 
    return <button onClick={onClick} className={`${varientClasses[varient]} ${defaultStyles} ${widthClass} ${loadingClass} hover:cursor-pointer hover:shadow-md`}>
  <span className="flex items-center">
    {icon && <span className="pr-2">{icon}</span>}
    <span>{text}</span>
  </span>
</button>

}