"use client";

import { useState } from "react";

const DeleteAccount = () => {
  const [fields, setFields] = useState({
    email: "",
    token: "",
  });
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isVerified, setIsVerified] = useState(false); // Added to track OTP verification state
  const [error, setError] = useState(""); // Added to store and display error messages

  // Send OTP request
  const sendOTP = async () => {
    setIsLoading(true);
    setError(""); // Clear any previous errors

    try {
      const response = await fetch(
        "https://api.bartergram.co/api/v1/auth/recover-account",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: fields.email }),
        }
      );

      const data = await response.json();

      if (data.success) {
        setIsOtpSent(true);
      } else {
        setError(data.message || "Failed to send OTP. Please try again.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  // Verify OTP request
  const verifyOTP = async () => {
    setIsLoading(true);
    setError(""); // Clear previous errors

    try {
      const response = await fetch(
        "https://api.bartergram.co/api/v1/verify/account",
        {
          method: "POST", // Changed to POST
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: fields.email, token: fields.token }), // Pass email and token
        }
      );

      const data = await response.json();

      if (data.success) {
        setIsVerified(true);
      } else {
        setError(data.message || "OTP verification failed. Please try again.");
      }
    } catch (error) {
      setError("Unable to verify OTP. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  // Request account deletion
  const requestDeletion = async () => {
    setIsLoading(true);
    setError(""); // Clear previous errors

    try {
      const response = await fetch(
        "https://api.bartergram.co/api/v1/users?mode=soft",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (data.success) {
        setIsOtpSent(false);
        setFields({ email: "", token: "" });
        setIsVerified(false);
      } else {
        setError(data.message || "Failed to delete account. Please try again.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center my-2 gap-3">
        <label className="font-semibold">Delete your account</label>
        <div className="flex justify-between w-full gap-x-3 h-10">
          <input
            type="text"
            disabled={isVerified}
            placeholder="Email address"
            className="px-2 py-0.5 h-full bg-black outline-none rounded-md w-full"
            value={fields.email}
            onChange={(e) =>
              setFields((prev) => ({ ...prev, email: e.target.value }))
            }
          />
          {isOtpSent && (
            <input
              type="text"
              disabled={isVerified}
              placeholder="OTP here"
              className="px-2 py-0.5 h-full bg-black outline-none rounded-md w-full"
              value={fields.token}
              onChange={(e) =>
                setFields((prev) => ({ ...prev, token: e.target.value }))
              }
            />
          )}
          {isOtpSent && (
            <button
              className="flex items-center gap-x-2 px-4 py-2 rounded-lg bg-purple-500 text-white text-xs font-bold capitalize"
              disabled={
                !fields.email.length ||
                !fields.token.length ||
                isLoading ||
                isVerified
              }
              onClick={verifyOTP} // Call verifyOTP instead of requestDeletion
            >
              {isLoading && (
                <div className="w-5 h-5 bg-transparent border-2 rounded-full border-white animate-spin"></div>
              )}
              Verify OTP
            </button>
          )}
        </div>
      </div>
      {/* Display error */}
      {error && <div className="text-red-500 font-medium">{error}</div>}{" "}
      {isVerified ? (
        <button
          className="flex items-center gap-x-2 px-4 py-2 rounded-lg bg-rose-500 text-white font-bold capitalize"
          onClick={requestDeletion}
        >
          {isLoading && (
            <div className="w-5 h-5 bg-transparent border-2 rounded-full border-white animate-spin"></div>
          )}
          Account Deletion
        </button>
      ) : isOtpSent ? null : (
        <button
          className="flex items-center gap-x-2 px-4 py-2 bg-purple-500 rounded-lg bg-green/75 font-bold capitalize text-white cursor-pointer"
          onClick={sendOTP}
          disabled={!fields.email.length || isLoading}
        >
          {isLoading && (
            <div className="w-5 h-5 bg-transparent border-2 rounded-full border-white animate-spin"></div>
          )}
          Send OTP
        </button>
      )}
      <div className="mt-3">
        <label className="font-medium">
          How to delete Bartergram account? (In App)
        </label>
        <p>
          You can delete your account by going to the settings page and clicking
          on the delete account button. Once you confirm, your account will be
          deleted.
        </p>
      </div>
    </>
  );
};

export default DeleteAccount;
