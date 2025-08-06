import { DocIcon } from "../icons/DocIcon";
import { Youtube } from "../icons/VideoIcon";
import { XIcon } from "../icons/XIcon";
import { HashIcon } from "../icons/HashIcon";
import { MainLogo } from "../icons/MainLogo";
import { SidebarIcon } from "../icons/SidebarIcon";
import { ShareLink } from "../icons/ShareLink";
import { UserIcon } from "../icons/UserIcon";
import { LogoutIcon } from "../icons/LogoutIcon";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "./config";
import axios from "axios";

interface SidebarProps {
    isOpen: boolean;
    setIsOpen: (val: boolean) => void;
}



export function SideBar({ isOpen, setIsOpen }: SidebarProps) {

    const navigate = useNavigate();
    const [username, setUsername] = useState("");

    useEffect(() => {

        async function fetchUsername() {
            try {
                const response = await axios.get(`${BACKEND_URL}/api/v1/user`, {
                    headers: {
                        Authorization: `${localStorage.getItem("token")}`,
                    },
                });
                const userData = response.data;
                console.log(userData);
                setUsername(userData.username);
            } catch(err){
                console.error(err);
            }
        }
        fetchUsername();

    }, []);


    const handleClick = () => {
        localStorage.removeItem("token");
        navigate("/");
    }


    const menuItems = [
        { icon: <DocIcon />, label: "Notes" },
        { icon: <Youtube />, label: "Video" },
        { icon: <XIcon />, label: "Tweet" },
        { icon: <ShareLink />, label: "Links" },
        { icon: <HashIcon />, label: "Tags" },
    ];

    return (
        <div className={`h-screen ${isOpen ? "w-72" : "w-16"} bg-white fixed left-0 top-0 hidden md:flex md:flex-col border border-black/20 p-4 backdrop-blur-2xl overflow-hidden shadow-2xl transition-all duration-300 ease-in-out`}>

            <div className="flex items-center justify-between">
                {isOpen && (
                    <div className="flex items-center gap-2 text-xl font-medium">
                        <div className="text-gray-600 ">
                            <MainLogo />
                        </div>
                        <span className="">Cognia</span>
                    </div>
                )}
                <div className="w-8 h-8 flex items-center justify-center hover:bg-gray-200 cursor-pointer rounded-full ml-auto hover:rotate-180 transition-transform duration-500"
                    onClick={() => setIsOpen(!isOpen)}>
                    <SidebarIcon />
                </div>
            </div>
            <div className="flex flex-col mt-8 gap-4">
                {menuItems.map((item, idx) => (
                    <div
                        key={idx}
                        className={`flex items-center px-3 py-2 gap-3 rounded-xl hover:bg-gray-200 transition-all ease-in-out
                                ${isOpen ? "" : "justify-center"}`

                        }
                    >
                        <div className="text-lg">{item.icon}</div>
                        {isOpen && (
                            <span className="font-medium group-hover:text-indigo-500 text-neutral-500 transition-all ease-in-out">{item.label}</span>
                        )}
                    </div>
                ))}


            </div>

            <div className={`mt-auto pt-4 border-t border-gray-300 flex items-center gap-3 px-3  ${isOpen ? "justify-between" : "justify-center"}`}>
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                        <UserIcon />
                    </div>
                    {isOpen && (
                        <span className="text-sm font-medium text-gray-900">{username || "User"}</span>
                    )}
                </div>
                {isOpen && (
                    <button
                        onClick={handleClick}
                        className="p-2 hover:bg-gray-200 rounded-lg transition-colors duration-200 text-gray-600 hover:text-red-600"
                    >
                        {<LogoutIcon />}
                    </button>

                )}

            </div>

        </div>
    );
};  