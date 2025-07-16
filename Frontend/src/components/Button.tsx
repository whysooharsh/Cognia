import type { ReactElement } from "react";

interface ButtonProps{
    varient : "primary" | "secondary";
    text : string;
    icon : ReactElement | undefined;
}

const varientClasses = {
    "primary" : "bg-purple-400 text-white ",
    "secondary" : "bg-purple-100 text-purple-800 "
};


const defaultStyles = "px-4 py-2 rounded-sm font-light flex items-center justify-center text-center";

export function Button({varient, text, icon}: ButtonProps){
    return <button className={varientClasses[varient] + defaultStyles }>
        <div className="pr-2">
        {icon}
            
        </div>
        {text}
    </button>
}