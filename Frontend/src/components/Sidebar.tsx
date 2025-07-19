import { useState } from "react";
import { DocIcon } from "../icons/DocIcon";
import { SearchIcon } from "../icons/SearchIcon";
import { Youtube } from "../icons/VideoIcon";
import { XIcon } from "../icons/XIcon";
import { ShareIcon } from "../icons/ShareIcon";
import { HashIcon } from "../icons/HashIcon";

export function SideBar() {

    const [open, setOpen] = useState(false);

    return (
        <div className="h-screen bg-white w-72 fixed left-0 top-0 border border-black/20 p-4 backdrop-blur-2xl overflow-hidden shadow-2xl">

            <div className="flex flex-col text-[16px] ">
                <div className="flex text-2xl pt-4 items-center">
                    <div className="mx-2 text-purple-600"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6.429 9.75 2.25 12l4.179 2.25m0-4.5 5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0 4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0-5.571 3-5.571-3" />
                    </svg>
                    </div>
                    <div className="">Brainly</div>
                </div>
                <div className="space-y-4 text-neutral-500 font-medium mt-4">
                    <div className="flex items-center px-3 py-2 gap-3 rounded-xl hover:bg-gray-200 transition-all ease-in-out ">
                        <div className="ml-2 ">
                            <DocIcon />
                        </div>
                        <p className="text-[16px] font-medium group-hover:text-indigo-500 text-neutral-500 transition-all ease-in-out">Notes</p>
                    </div>
                    <div className="text-sm flex items-center px-3 py-2 gap-3 rounded-xl hover:bg-gray-200 transition-all ease-in-out ">
                        <div className="ml-2 scale-[1.2]">
                            <Youtube />
                        </div>
                        <p className="text-[16px] font-medium group-hover:text-indigo-500 text-neutral-500 transition-all ease-in-out">Video</p>
                    </div>
                    <div className="text-[16px] flex items-center px-3 py-2 gap-3 rounded-xl hover:bg-gray-200 transition-all ease-in-out ">
                        <div className="ml-2 ">
                            <XIcon></XIcon>
                        </div>
                        <p className=" font-medium group-hover:text-indigo-500 text-neutral-500 transition-all ease-in-out">Tweet</p>
                    </div>
                    <div className="text-[16px] flex items-center px-3 py-2 gap-3 rounded-xl hover:bg-gray-200 transition-all ease-in-out ">
                        <div className="ml-2 ">
                            <ShareIcon/>
                        </div>
                        <p className=" font-medium group-hover:text-indigo-500 text-neutral-500 transition-all ease-in-out">Links</p>
                    </div>
                    <div className="text-[16px] flex items-center px-3 py-2 gap-3 rounded-xl hover:bg-gray-200 transition-all ease-in-out ">
                        <div className="ml-2 ">
                            <HashIcon/>
                        </div>
                        <p className=" font-medium group-hover:text-indigo-500 text-neutral-500 transition-all ease-in-out">Tags</p>
                    </div>

                </div>
            </div>



        </div>
    );
};  