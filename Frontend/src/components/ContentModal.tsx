import { CloseIcon } from "../icons/CloseIcon";
import { Button } from "./Button";
import { InputComponent } from "./Input";
export function CreateContentModal({ open, onClose }: { open: boolean; onClose: () => void }) {

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
                            <InputComponent placeholder={"Title"} />
                            <InputComponent placeholder={"Link"} />
                        </div>
                        <div className="pt-6 ">
                            <Button varient="primary" text="Submit" icon={undefined} />
                        </div>
                    </div>
                </div>}
        </>
    );
}

