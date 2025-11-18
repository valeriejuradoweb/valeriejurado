"use client"; // This line tells Next.js to treat this as a Client Component
import React from "react";
import { useState } from "react";
import IconMail from "@/components/IconMail";

interface CopyEmailButtonProps {
  email: string; // Email prop to pass the email address
  onCopyStateChange?: (isCopied: boolean) => void; // Callback for parent to handle message display
  showInlineMessage?: boolean; // Whether to show message inline (default: true for backward compatibility)
}

const CopyEmailButton: React.FC<CopyEmailButtonProps> = ({ 
  email, 
  onCopyStateChange,
  showInlineMessage = true 
}) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyClick = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setIsCopied(true);
      onCopyStateChange?.(true);
      // Reset the copied state after 4 seconds
      setTimeout(() => {
        setIsCopied(false);
        onCopyStateChange?.(false);
      }, 4000);
    } catch (error) {
      console.error("Failed to copy email address", error);
    }
  };

  return (
    <button
      onClick={handleCopyClick}
      aria-label="Copy email address"
      className="hover:opacity-85 transition-opacity duration-200 ease-in-out"
    >
      <IconMail />
      {showInlineMessage && (
        <div className="absolute text-sm pt-2">
          {isCopied ? (
            <span className="text-[#dedede]">Email copied to clipboard</span>
          ) : (
            <span className="text-gray-700"> </span>
          )}
        </div>
      )}
    </button>
  );
};

export default CopyEmailButton;
