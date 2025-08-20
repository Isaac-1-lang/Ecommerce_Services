"use client";

import { useState } from "react";
import { FiKey, FiCopy, FiCheck, FiRefreshCw } from "react-icons/fi";

export default function AdminTokenGenerator() {
  const [generatedToken, setGeneratedToken] = useState<string>("");
  const [copied, setCopied] = useState(false);

  const generateToken = () => {
    // Generate a secure random token
    const token = Math.random().toString(36).substring(2, 15) + 
                  Math.random().toString(36).substring(2, 15) + 
                  Date.now().toString(36);
    setGeneratedToken(token);
    setCopied(false);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedToken);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy token:', err);
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <FiKey className="w-5 h-5 text-purple-600" />
        <h3 className="text-lg font-semibold text-gray-900">Employee Registration Token Generator</h3>
      </div>
      
      <p className="text-sm text-gray-600 mb-4">
        Generate a secure token for employee registration. Share this token with employees who need to register.
      </p>

      <div className="space-y-4">
        <button
          onClick={generateToken}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          <FiRefreshCw className="w-4 h-4" />
          Generate New Token
        </button>

        {generatedToken && (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-700 mb-1">Generated Token:</p>
                <p className="text-sm text-gray-900 font-mono break-all">{generatedToken}</p>
              </div>
              <button
                onClick={copyToClipboard}
                className="ml-3 p-2 text-gray-500 hover:text-gray-700 transition-colors"
                title="Copy to clipboard"
              >
                {copied ? (
                  <FiCheck className="w-4 h-4 text-green-600" />
                ) : (
                  <FiCopy className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
        )}

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <p className="text-xs text-blue-800">
            <strong>Note:</strong> This token is required for employee registration. Keep it secure and share it only with authorized employees.
          </p>
        </div>
      </div>
    </div>
  );
}
