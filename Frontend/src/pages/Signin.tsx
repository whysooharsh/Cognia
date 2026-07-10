import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import {
  BACKEND_URL,
  ButtonCustom,
  InputComponent,
  Spinner,
} from "../components";

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
        password,
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
    <div className="h-screen w-screen bg-paper text-ink font-sans selection:bg-ink selection:text-paper flex justify-center items-center p-4 relative overflow-hidden">
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-25"
        style={{
          backgroundImage: `radial-gradient(var(--color-ink) 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
        }}
      />
      <div className="absolute top-[10%] left-[20%] w-[300px] h-[300px] bg-amber-200/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[10%] right-[20%] w-[300px] h-[300px] bg-orange-100/10 rounded-full blur-3xl pointer-events-none" />

      <div className="bg-white/80 border border-ink/10 rounded-3xl shadow-xl backdrop-blur-lg max-w-md w-full p-8 relative z-10">
        <div className="text-center mb-6">
          <img
            src="https://res.cloudinary.com/dpwqggym0/image/upload/v1783667924/cogniaLogo_lk0ivj.png"
            alt="Cognia Logo"
            className="w-12 h-12 object-contain mx-auto mb-4"
          />
          <h1 className="font-serif text-3xl font-medium text-ink">
            Welcome back!
          </h1>
        </div>

        <div className="space-y-4">
          <InputComponent ref={usernameRef} placeholder="username" />
          <InputComponent
            ref={passwordRef}
            placeholder="password"
            type="password"
          />

          <ButtonCustom
            onClick={signin}
            varient="primary"
            text="Sign In"
            fullWidth={true}
          />

          <div className="text-center mt-6">
            <p className="text-ink/65 text-sm font-medium">
              Don't have an account?{" "}
              <button
                onClick={() => navigate("/signup")}
                className="text-ink hover:text-ink/80 underline font-semibold transition-colors"
              >
                Sign up here
              </button>
            </p>
          </div>
        </div>
      </div>

      {showSuccessModal && (
        <div className="h-screen w-screen backdrop-blur-md bg-white/20 fixed top-0 left-0 flex justify-center items-center z-50">
          <div className="bg-white border border-ink/10 text-ink p-10 rounded-2xl shadow-2xl relative max-w-sm w-full flex flex-col items-center">
            <h2 className="font-serif text-2xl font-medium mb-4 text-center text-ink">
              Signing In
            </h2>
            <p className="text-center mb-6 text-sm text-ink/70">
              {successMessage}
            </p>
            <Spinner />
          </div>
        </div>
      )}

      {showErrorModal && (
        <div className="h-screen w-screen backdrop-blur-md bg-white/20 fixed top-0 left-0 flex justify-center items-center z-50">
          <div className="bg-white border border-ink/10 text-ink p-10 rounded-2xl shadow-2xl relative max-w-sm w-full flex flex-col items-center">
            <h2 className="font-serif text-2xl font-medium mb-3 text-center text-red-500">
              Authentication Error
            </h2>
            <p className="text-sm text-ink/60 text-center mb-6">
              {errorMessage}
            </p>
            <div className="flex gap-3 w-full justify-center">
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
  );
}
