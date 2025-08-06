import { useRef, useState } from "react";
import { ButtonCustom } from "../components/Button";
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

    // add loading state
    const [isLoading, setIsLoading] = useState(false);

    async function signup() {
        // prevent duplicate submissions
        if (isLoading) return;

        try {
            setIsLoading(true);
            const username = usernameRef.current?.value;
            const password = passwordRef.current?.value;

            if (!username || !password) {
                setErrorMessage("All fields are required");
                setShowErrorModal(true);
                setIsLoading(false);
                return;
            }
            if (password.length < 6) {
                setErrorMessage("Password must be at least 6 characters long");
                setShowErrorModal(true);
                setIsLoading(false);
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

        } catch (error: any) {
            setShowErrorModal(true);
            setErrorMessage(
                error.response?.data?.message ||
                "Signup failed. Please try again."
            );
        } finally {
            setIsLoading(false);
        }
    }    return (
        <div className="h-screen w-screen bg-gradient-to-br from-purple-100 to-blue-50 flex justify-center items-center p-4">
            <div className="bg-white rounded-2xl shadow-xl border-gray-100 max-w-md p-8">
                <div className="text-center ">
                    <h1 className="text-2xl font-medium p-4 mb-2">Create an account</h1>
                </div>
                <div className="space-y-4">
                    <InputComponent ref={usernameRef} placeholder="username" />
                    <InputComponent ref={passwordRef} placeholder="password" type="password"  />
                    <ButtonCustom onClick={signup} varient="primary" text="Signup" fullWidth={true} />
                     <div className="text-center mt-4">
                        <p className="text-gray-600 text-sm">
                            Already have an account?{" "}
                            <button
                                onClick={() => navigate("/signin")}
                                className="text-gray-600 hover:text-gray-800 underline font-medium"
                            >
                                Sign in here
                            </button>
                        </p>
                    </div>
                </div>
            </div>

            {showSuccessModal && (
                <div className="h-screen w-screen backdrop-blur-lg bg-white/20 fixed top-0 left-0 flex justify-center items-center z-50">
                    <div className="bg-white text-gray-900 p-10 rounded-2xl shadow-lg relative max-w-sm w-full flex flex-col items-center">
                        <h2 className="text-xl font-semibold mb-4 text-center text-gray-600">Your account is ready!</h2>
                        <span className="p-2"> Redirecting to login... </span>
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
                        <ButtonCustom
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