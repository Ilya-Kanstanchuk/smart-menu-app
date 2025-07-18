import React, { useState } from "react";
import InputField from "../components/InputField";
import type { ValidateResponse } from "../types/validate";
import Header from "../components/Header";
import axios from "axios";

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSucceeded, setIsSucceeded] = useState<boolean>(true);
  const [attempted, setAttempted] = useState(false);
  const API_URL = import.meta.env.VITE_API_URL;

  const handleSending = async () => {
    if (!email.includes("@") || !email.includes(".")) {
      setErrorMessage("Please enter a valid email address");
      return;
    }
    try {
      const response = await axios.post<ValidateResponse>(
        `${API_URL}/credentials/sendlink`,
        { email }
      );
      if (response.data.success) {
        setErrorMessage("");
        setAttempted(true);
        setIsSucceeded(true);
      } else {
        console.error(response.data.errorMessage);
        setAttempted(true);
        setIsSucceeded(false);
      }
    } catch (error) {
      console.error(error);
      setAttempted(true);
      setIsSucceeded(false);
    }
  };

  return (
    <div className="min-h-screen bg-white font-lexend text-[#111714]">
      <Header pageName="Forgot password" />

      <main className="flex justify-center px-6 py-10">
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-bold text-center pt-6 pb-2">
            Forgot password
          </h2>
          <div className="space-y-4 px-2 py-2">
            {errorMessage && (
              <div className="text-red-600 text-sm font-medium px-2 md:px-0 pt-2">
                {errorMessage}
              </div>
            )}
            {attempted &&
              (isSucceeded ? (
                <div className="text-green-600 text-sm font-medium px-2 md:px-0 pt-2">
                  Reset link was sent successfully
                </div>
              ) : (
                <div className="text-red-600 text-sm font-medium px-2 md:px-0 pt-2">
                  Failed to send reset link for this email
                </div>
              ))}
            <InputField placeholder="Email" value={email} onChange={setEmail} />
          </div>

          <div className="px-2 py-3">
            <button
              onClick={handleSending}
              className="cursor-pointer w-full bg-[#38e07b] h-12 rounded-xl text-base font-bold tracking-wide text-[#111714]"
            >
              Send a reset link
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ForgotPassword;
