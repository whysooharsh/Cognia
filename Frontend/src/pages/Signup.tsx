import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import {
  BACKEND_URL,
  ButtonCustom,
  InputComponent,
  Spinner,
} from "../components";

export function Signup() {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  async function signup() {
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
        password,
      });

      setSuccessMessage("SignUp Successful! Redirecting to login page");
      setShowSuccessModal(true);

      setTimeout(() => {
        navigate("/signin");
      }, 1000);
    } catch (error: unknown) {
      setShowErrorModal(true);
      const axiosErr = error as { response?: { data?: { message?: string } } };
      setErrorMessage(
        axiosErr.response?.data?.message || "Signup failed. Please try again.",
      );
    } finally {
      setIsLoading(false);
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
            Create an account
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
            onClick={signup}
            varient="primary"
            text="Sign Up"
            fullWidth={true}
          />

          <div className="text-center mt-6">
            <p className="text-ink/65 text-sm font-medium">
              Already have an account?{" "}
              <button
                onClick={() => navigate("/signin")}
                className="text-ink hover:text-ink/80 underline font-semibold transition-colors"
              >
                Sign in here
              </button>
            </p>
          </div>
        </div>
      </div>

      {showSuccessModal && (
        <div className="h-screen w-screen backdrop-blur-md bg-white/20 fixed top-0 left-0 flex justify-center items-center z-50">
          <div className="bg-white border border-ink/10 text-ink p-10 rounded-2xl shadow-2xl relative max-w-sm w-full flex flex-col items-center">
            <h2 className="font-serif text-2xl font-medium mb-4 text-center text-ink">
              Account Ready
            </h2>
            <span className="text-sm text-ink/65 mb-2 select-none">
              Redirecting to login...
            </span>
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
              Registration Error
            </h2>
            <p className="text-sm text-ink/60 text-center mb-6">
              {errorMessage ||
                "Something went wrong. Please try signing up again."}
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
  );
}
