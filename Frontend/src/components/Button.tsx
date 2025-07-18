import type { ReactElement } from "react";

interface ButtonProps{
    varient : "primary" | "secondary";
    text : string;
    icon : ReactElement | undefined;
    onClick? : () => void;
}

const varientClasses = {
    "primary" : "bg-purple-400 text-white ",
    "secondary" : "bg-purple-100 text-purple-800 "
};


const defaultStyles = "px-4 py-2 rounded-sm font-light flex items-center justify-center text-center ";

export function Button({varient, text, icon, onClick}: ButtonProps){
    return <button onClick={onClick} className={varientClasses[varient] + defaultStyles + "hover:cursor-pointer"}>
  <span className="flex items-center">
    {icon && <span className="pr-2">{icon}</span>}
    <span>{text}</span>
  </span>
</button>

}