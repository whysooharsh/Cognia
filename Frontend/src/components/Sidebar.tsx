import { useState } from "react";
import { DocIcon } from "../icons/DocIcon";
import { SearchIcon } from "../icons/SearchIcon";
import { Youtube } from "../icons/VideoIcon";
import { XIcon } from "../icons/XIcon";

export function SideBar () {

    const [open, setOpen] = useState(false);

    return (
        <div className="h-screen bg-white w-72 fixed left-0 right-0 border border-black/20 p-4 backdrop-blur-2xl overflow-hidden shadow-2xl">
              <div className="flex border bg-transparent px-3 py-1 hover:bg-neutral-100 rounded-full" >
                    <input className="w-full bg-transparent outline-none placeholder:text-sm placeholder:text-neutral-400" type="text" placeholder="Search... "></input>
                    <div className="text-neutral-400 " ><SearchIcon/></div>
              </div>
              <div className="flex flex-col mt-6 text-[16px]">
                
              <h1 className="text-[16px] text-neutral-500 font-medium mb-2">Platform</h1>
              <div className="space-y-4 text-neutral-500 font-medium">
                    <div className="flex items-center px-3 py-2 gap-3 rounded-xl hover:bg-purple-100 transition-all ease-in-out ">
                        <div className="ml-2 ">
                            <DocIcon/>
                        </div>
                        <p className="text-[16px] font-medium group-hover:text-indigo-500 text-neutral-500 transition-all ease-in-out">Notes</p>
                    </div>
                    <div className="text-sm flex items-center px-3 py-2 gap-3 rounded-xl hover:bg-purple-100 transition-all ease-in-out ">
                        <div className="ml-2 scale-[1.2]">
                            <Youtube/>
                        </div>
                        <p className="text-[16px] font-medium group-hover:text-indigo-500 text-neutral-500 transition-all ease-in-out">Video</p>
                    </div>
                     <div className="text-[16px] flex items-center px-3 py-2 gap-3 rounded-xl hover:bg-purple-100 transition-all ease-in-out ">
                        <div className="ml-2 ">
                            <XIcon></XIcon>
                        </div>
                        <p className=" font-medium group-hover:text-indigo-500 text-neutral-500 transition-all ease-in-out">Tweet</p>
                    </div>
                   
              </div>
              </div>



        </div>
    );
};  