import axios from "axios";
import { CloseIcon } from "../icons/CloseIcon";
import { Button } from "./Button";
import { InputComponent } from "./Input";
import { useRef, useState } from "react";
import { BACKEND_URL } from "./config";

const ContentType = {
    Youtube: "youtube",
    Twitter: "twitter"
} as const;

type ContentTypeVal = typeof ContentType[keyof typeof ContentType];

export function CreateContentModal({ open, onClose }: { open: boolean; onClose: () => void }) {

    const titleRef = useRef<HTMLInputElement>(null);
    const linkRef = useRef<HTMLInputElement>(null);
    const [type, setType] = useState<ContentTypeVal>(ContentType.Youtube);

    function addContent(){
        const title = titleRef.current?.value;
        const link = linkRef.current?.value;

        axios.post(`${BACKEND_URL}/api/v1/content`, {
            link, 
            title, 
            type
        }, {
            headers : {
                "Authorization" : localStorage.getItem("token")
            }
        })
        onClose();
    } 

    return (
        <>
            {open &&
                <div className="h-screen w-screen backdrop-blur-lg bg-white/20 fixed top-0 left-0 flex justify-center items-center z-50">
                    <div className="bg-white text-gray-900 p-10 rounded-2xl shadow-lg relative max-w-sm w-full flex flex-col items-center">
                        <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition">
                            <div onClick={onClose}>
                                <CloseIcon />
                            </div>
                        </button>
                        <h2 className="text-xl font-semibold mb-4 text-center">Create New Content</h2>
                        <div className="text-black space-y-3 ">
                            <InputComponent ref={titleRef} placeholder={"Title"} />
                            <InputComponent ref={linkRef} placeholder={"Link"} />
                        </div>
                        <div className="text-left font-medium">
                            <h1 className="p-2">Type</h1>
                            <div className="flex gap-2">

                           
                            <Button text = "Youtube" varient={type===ContentType.Youtube?
                                "primary" : "secondary"}
                                onClick={() => setType(ContentType.Youtube)}
                                ></Button>
                            <Button text = "Twitter" varient={type===ContentType.Twitter?
                                "primary" : "secondary"} 
                                onClick={() => setType(ContentType.Twitter)}
                                ></Button>
                                 </div>
                        </div>
                        <div className="pt-6 ">
                            <Button onClick={addContent} varient="primary" text="Submit" icon={undefined} />
                        </div>
                    </div>
                </div>}
        </>
    );
}

