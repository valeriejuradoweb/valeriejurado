"use client";

import { useState } from "react";
import CopyEmailButton from "@/components/CopyEmailButton";
import IconInsta from "@/components/IconInsta";

interface FooterButtonsProps {
  email: string;
}

export default function FooterButtons({ email }: FooterButtonsProps) {
  const [isCopied, setIsCopied] = useState(false);

  return (
    <>
      <div className="flex gap-10 justify-center items-center">
        <CopyEmailButton 
          email={email} 
          onCopyStateChange={setIsCopied}
          showInlineMessage={false}
        />
        <a
          href="https://www.instagram.com/valeriejurado/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:opacity-65 transition-opacity duration-200 ease-in-out"
          aria-label="Visit Instagram"
        >
          <IconInsta />
        </a>
      </div>
      {/* Centered message below buttons */}
      <div className="text-center min-h-[1.5rem]">
        {isCopied && (
          <span className="text-[#dedede] text-sm">Email copied to clipboard</span>
        )}
      </div>
    </>
  );
}

