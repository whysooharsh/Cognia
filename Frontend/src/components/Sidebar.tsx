import { DocIcon } from "../icons/DocIcon";
import { Youtube } from "../icons/VideoIcon";
import { XIcon } from "../icons/XIcon";
import { MainLogo } from "../icons/MainLogo";
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
    onFilterSelect: (val: string | any) => void;
    selectedType: string | null;
}



export function SideBar({ isOpen, setIsOpen, onFilterSelect, selectedType }: SidebarProps) {

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
                setUsername(userData.username);
            } catch (err) {
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
        { icon: <DocIcon />, label: "Notes", type: "note" },
        { icon: <Youtube />, label: "Videos", type: "youtube" },
        { icon: <XIcon />, label: "Tweets", type: "twitter" },
        { icon: <ShareLink />, label: "Links", type: "link" },

    ];

    return (
        <div className={`h-screen ${isOpen ? "w-64" : "w-20"} bg-white fixed left-0 top-0 hidden md:flex md:flex-col border-r border-gray-200 transition-all duration-300 ease-in-out z-20`}>

            <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
                {isOpen ? (
                    <>
                        <div className="flex items-center gap-2 text-xl font-semibold text-gray-900">
                            <div className="text-gray-700">
                                <MainLogo />
                            </div>
                            <span>Cognia</span>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors text-gray-600"
                            title="Collapse sidebar"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                    </>
                ) : (
                    <button
                        onClick={() => setIsOpen(true)}
                        className="flex justify-center w-full hover:bg-gray-100 rounded-lg p-2 transition-colors"
                        title="Expand sidebar"
                    >
                        <MainLogo />
                    </button>
                )}
            </div>

            <div className="flex flex-col flex-1 py-6 px-3 gap-2">
                {menuItems.map((item, idx) => (
                    <button
                        key={idx}
                        onClick={() => onFilterSelect(item.type)}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all cursor-pointer
                                ${isOpen ? "" : "justify-center"} ${selectedType === item.type 
                                    ? "bg-gray-900 text-white shadow-md" 
                                    : "text-gray-700 hover:bg-gray-100"}`}
                        title={item.label}
                    >
                        <div className="text-xl">{item.icon}</div>
                        {isOpen && (
                            <span className="text-sm font-medium">
                                {item.label}
                            </span>
                        )}
                    </button>
                ))}
            </div>

            <div className="border-t border-gray-200 p-4">
                <div className={`flex items-center gap-3 ${isOpen ? "" : "justify-center"}`}>
                    <div className="w-10 h-10 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center text-gray-700">
                        <UserIcon />
                    </div>
                    {isOpen && (
                        <div className="flex-1 flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-900 truncate">{username || "User"}</span>
                            <button
                                onClick={handleClick}
                                className="p-1.5 hover:bg-red-50 rounded-lg transition-colors text-gray-600 hover:text-red-600"
                                title="Logout"
                            >
                                <LogoutIcon />
                            </button>
                        </div>
                    )}
                </div>
            </div>

        </div>
    );
};  