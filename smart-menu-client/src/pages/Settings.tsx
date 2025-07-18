import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import SubmitButton from "../components/SubmitButton";
import FormInput from "../components/FormInput";
import axios from "axios";
import type { UpdateResponse } from "../types/update";

const Settings: React.FC = () => {
  const [successMessage, setSuccessMessage] = useState("");
  const API_URL = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const handleSubmit = async () => {
    if (password.length < 6) {
      setErrorMessage("Password supposed to be at least 6 characters long");
      return;
    }
    if (!email.includes("@") || !email.includes(".")) {
      setErrorMessage("Please enter a valid email address");
      return;
    }
    try {
      const response = await axios.put<UpdateResponse>(
        `${API_URL}/credentials/change`,
        {
          email,
          password,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        setErrorMessage("");
        console.log(response.data.content.message);
        setSuccessMessage("Credentials updated successfully");
      } else {
        if (response.data.errorMessage != null) {
          console.error(response.data.errorMessage);
          setErrorMessage(response.data.errorMessage);
        }
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Failed to change your credentials");
    }
  };
  return (
    <div className="relative flex min-h-screen flex-col bg-white group/design-root overflow-x-hidden font-lexend">
      <div className="layout-container flex h-full grow flex-col">
        <div className="gap-1 px-6 flex flex-1 justify-center py-5">
          <Sidebar />
          <main className="layout-content-container flex flex-col max-w-full flex-1">
            <div className="p-4">
              <h2 className="text-[#111714] text-2xl sm:text-3xl font-bold">
                Settings
              </h2>
            </div>

            {/* Account Section */}
            <h3 className="text-[#111714] text-lg font-bold tracking-[-0.015em] px-4 pb-2 pt-4">
              Change credentials
            </h3>
            {errorMessage && (
              <div className="text-red-600 text-sm font-medium px-2 md:px-0 pt-2">
                {errorMessage}
              </div>
            )}
            {successMessage && (
              <div className="text-green-600 text-sm font-medium px-2 md:px-0 pt-2">
                {successMessage}
              </div>
            )}
            <FormInput
              value={email}
              onChange={setEmail}
              label="Email"
              type="email"
            />
            <FormInput
              value={password}
              onChange={setPassword}
              label="Password"
              type="password"
            />
            <SubmitButton onClick={handleSubmit} label="Update Account" />
          </main>
        </div>
      </div>
    </div>
  );
};

export default Settings;
