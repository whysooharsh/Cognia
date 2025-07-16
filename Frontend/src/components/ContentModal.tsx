import { CloseIcon } from "../icons/CloseIcon";
import { Button } from "./Button";

export function CreateContentModal({ open, onClose }) {
    
    return (
        <div className="h-screen w-screen backdrop-blur-lg bg-white/20 fixed top-0 left-0 flex justify-center items-center z-50">
            <div className="bg-white text-black px-10 py-8 rounded-2xl shadow-lg relative max-w-sm w-full flex flex-col items-center">
                <button onClick={onClose} className="absolute top-4 right-4">
                    <CloseIcon />
                </button>
                <div className="text-black ">
                    <InputComponent placeholder={"Title"} />
                    <InputComponent placeholder={"Link"} />
                </div>
                <div className="pt-4">

                <Button varient="primary" text="Submit" icon={undefined}/>
                </div>
            </div>
        </div>
    );
}


function InputComponent({ onChange, placeholder }: { onChange: () => void }) {
    return (
        <div>
            <input
                type="text"
                placeholder={placeholder}
                className="px-4 py-2 max-w-72 rounded-sm focus:border-gray-800 text-black border-2 border-gray-600 mt-2"
                onChange={onChange}
            />

        </div>
    )
}