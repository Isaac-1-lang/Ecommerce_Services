"use client";

import { useState } from "react";
import { FiMail, FiX, FiRefreshCw } from "react-icons/fi";
import { useAuthStore } from "../features/auth/store";

interface EmailVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  email: string;
}

export default function EmailVerificationModal({ isOpen, onClose, email }: EmailVerificationModalProps) {
  const [isResending, setIsResending] = useState(false);
  const [resendMessage, setResendMessage] = useState<string | null>(null);
  const { resendVerification } = useAuthStore();

  const handleResendVerification = async () => {
    setIsResending(true);
    setResendMessage(null);
    try {
      await resendVerification(email);
      setResendMessage("Verification email sent successfully! Please check your inbox.");
    } catch (error) {
      setResendMessage(error instanceof Error ? error.message : "Failed to resend verification email");
    } finally {
      setIsResending(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-soft-lg max-w-md w-full p-6 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-600 transition-colors"
        >
          <FiX className="w-5 h-5" />
        </button>

        {/* Content */}
        <div className="text-center">
          <div className="mx-auto w-16 h-16 bg-highlight rounded-full flex items-center justify-center mb-4">
            <FiMail className="w-8 h-8 text-primary" />
          </div>
          
          <h3 className="text-xl font-bold text-neutral-800 mb-2">
            Verify Your Email
          </h3>
          
          <p className="text-neutral-600 mb-4">
            We&apos;ve sent a verification link to:
          </p>
          
          <p className="text-primary font-medium mb-6 break-all">
            {email}
          </p>
          
          <div className="bg-info-50 border border-info-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-info-700">
              Please check your email and click the verification link to activate your account. 
              You won&apos;t be able to sign in until you verify your email address.
            </p>
          </div>

          {/* Resend Section */}
          <div className="border-t border-neutral-200 pt-4">
            <p className="text-sm text-neutral-600 mb-3">
              Didn&apos;t receive the email?
            </p>
            
            <button
              onClick={handleResendVerification}
              disabled={isResending}
              className="w-full bg-primary hover:bg-primary-600 disabled:bg-neutral-300 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 disabled:cursor-not-allowed"
            >
              {isResending ? (
                <>
                  <FiRefreshCw className="w-4 h-4 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <FiRefreshCw className="w-4 h-4" />
                  Resend Verification Email
                </>
              )}
            </button>

            {resendMessage && (
              <div className={`mt-3 rounded-lg p-3 text-sm ${
                resendMessage.includes("successfully") 
                  ? "bg-success-50 border border-success-200 text-success-700"
                  : "bg-error-50 border border-error-200 text-error-700"
              }`}>
                {resendMessage}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="mt-6 space-y-3">
            <button
              onClick={onClose}
              className="w-full bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-medium py-2 px-4 rounded-lg transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
