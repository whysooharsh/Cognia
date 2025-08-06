import { ButtonCustom } from "../components/Button";
import { InputComponent } from "../components/Input";
import { useRef, useState } from "react";
import { Spinner } from "../components/Spinner";
import axios from "axios";
import { BACKEND_URL } from "../components/config";
import { useNavigate } from "react-router-dom";

export function Signin() {
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const navigate = useNavigate();

    async function signin() {
        try {
            const username = usernameRef.current?.value;
            const password = passwordRef.current?.value;
            if (!username || !password) {
                setErrorMessage("Please fill in all fields");
                setShowErrorModal(true);
                return;
            }
            setSuccessMessage("Signing you in...");
            setShowSuccessModal(true);

            const response = await axios.post(BACKEND_URL + "/api/v1/signin", {
                username,
                password
            });

            const jwt = response.data.token;
            localStorage.setItem("token", jwt);
            setSuccessMessage("Login successful! Redirecting to dashboard...");
            setTimeout(() => {
                navigate("/dashboard");
            }, 1500);

        } catch (error: any) {
            setShowSuccessModal(false); 
            if (error.response) {
                const status = error.response.status;
                const message = error.response.data?.message;
                
                if (status === 411) {
                    setErrorMessage("User doesn't exist. Please sign up first.");
                } else if (status === 403) {
                    setErrorMessage("Incorrect password. Please try again.");
                } else {
                    setErrorMessage(message || "Login failed. Please try again.");
                }
            } else {
                setErrorMessage("Network error. Please check your connection.");
            }
            
            setShowErrorModal(true);
        }
    }
    return (
        <div className="h-screen w-screen bg-gradient-to-br from-purple-100 to-blue-50 flex justify-center items-center p-4">
            <div className="bg-white rounded-2xl shadow-xl border-gray-100 max-w-md p-8">
                <div className="text-center ">
                    <h1 className="text-2xl font-medium p-4 mb-2">Welcome back!</h1>
                </div>
                <div className="space-y-4">
                    <InputComponent ref={usernameRef} placeholder="username" />
                    <InputComponent ref={passwordRef} placeholder="password" />

                    <ButtonCustom onClick={signin} varient="primary" text="Signin" fullWidth={true} />
                    
                    <div className="text-center mt-4">
                        <p className="text-gray-600 text-sm">
                            Don't have an account?{" "}
                            <button
                                onClick={() => navigate("/signup")}
                                className="text-gray-600 hover:text-gray-800 underline font-medium"
                            >
                                Sign up here
                            </button>
                        </p>
                    </div>
                </div>
            </div>

            {showSuccessModal && (
                <div className="h-screen w-screen backdrop-blur-lg bg-white/20 fixed top-0 left-0 flex justify-center items-center z-50">
                    <div className="bg-white text-gray-900 p-10 rounded-2xl shadow-lg relative max-w-sm w-full flex flex-col items-center">
                        <h2 className="text-xl font-semibold mb-4 text-center text-gray-600">Welcome back!</h2>
                        <p className="text-center mb-4">{successMessage}</p>
                        <div className="mt-2">
                            <Spinner />
                        </div>
                    </div>
                </div>
            )}

            {showErrorModal && (
                <div className="h-screen w-screen backdrop-blur-lg bg-white/20 fixed top-0 left-0 flex justify-center items-center z-50">
                    <div className="bg-white text-gray-900 p-10 rounded-2xl shadow-lg relative max-w-sm w-full flex flex-col items-center">
                        <h2 className="text-xl font-semibold mb-3 text-center text-red-500">
                            Login Failed
                        </h2>
                        <p className="text-sm text-gray-600 text-center mb-6">
                            {errorMessage}
                        </p>
                        <div className="flex gap-3">
                            <ButtonCustom
                                onClick={() => setShowErrorModal(false)}
                                varient="primary"
                                text="Try Again"
                            />
                            <ButtonCustom
                                onClick={() => navigate("/signup")}
                                varient="secondary"
                                text="Sign Up"
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}