import { useRef, useState } from "react";
import { Button } from "../components/Button";
import { InputComponent } from "../components/Input";
import axios from "axios";
import { BACKEND_URL } from "../components/config";
import { useNavigate } from "react-router-dom";
import { Spinner } from "../components/Spinner";
export function Signup() {
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const navigate = useNavigate();

    async function signup() {
        try {
            const username = usernameRef.current?.value;
            const password = passwordRef.current?.value;

            if (!username || !password) {
                setErrorMessage("All fields are required");
                setShowErrorModal(true);
                return;
            }

            await axios.post(BACKEND_URL + "/api/v1/signup", {
                username,
                password
            });

            setSuccessMessage("SignUp Successful! Redirecting to login page");
            setShowSuccessModal(true);

            setTimeout(() => {
                navigate("/signin");
            }, 1000);

        } catch (error) {
            setShowErrorModal(true);
            setErrorMessage("Signup failed. Please try again.");
        }
    }
    return (
        <div className="h-screen w-screen bg-gradient-to-br from-purple-100 to-blue-50 flex justify-center items-center p-4">
            <div className="bg-white rounded-2xl shadow-xl border-gray-100 max-w-md p-8">
                <div className="text-center ">
                    <h1 className="text-2xl font-medium p-4 mb-2">Create an account</h1>
                </div>
                <div className="space-y-4">
                    <InputComponent ref={usernameRef} placeholder="username" />
                    <InputComponent ref={passwordRef} placeholder="password" />

                    <Button onClick={signup} varient="primary" text="Signup" fullWidth={true} />

                </div>
            </div>

            {showSuccessModal && (
                <div className="h-screen w-screen backdrop-blur-lg bg-white/20 fixed top-0 left-0 flex justify-center items-center z-50">
                    <div className="bg-white text-gray-900 p-10 rounded-2xl shadow-lg relative max-w-sm w-full flex flex-col items-center">
                        <h2 className="text-xl font-semibold mb-4 text-center text-gray-600">Your account is ready!</h2>
                        <span> Redirecting to login... </span>
                        <p className="text-center">{successMessage}</p>
                        <div className="mt-4">
                            <Spinner />
                        </div>
                    </div>
                </div>
            )}

            {showErrorModal && (
                 <div className="h-screen w-screen backdrop-blur-lg bg-white/20 fixed top-0 left-0 flex justify-center items-center z-50">
                    <div className="bg-white text-gray-900 p-10 rounded-2xl shadow-lg relative max-w-sm w-full flex flex-col items-center">
                        <h2 className="text-xl font-semibold mb-3 text-center text-red-500">
                            Oops, your brainwave got scrambled.
                        </h2>
                        <p className="text-sm text-gray-400 text-center mb-6">
                            {errorMessage || "Something went wrong. Please try signing up again."}
                        </p>
                        <Button
                            onClick={() => setShowErrorModal(false)}
                            varient="primary"
                            text="Try Again"
                        />
                    </div>
                </div>
                
            )}
        </div>
    )
}