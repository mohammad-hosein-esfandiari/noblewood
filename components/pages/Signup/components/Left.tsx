import { Logo } from "@/components/global/Header/components/Logo";
import React from "react";

export default function Left() {
  return (
    <div className="flex flex-1 flex-col justify-center items-center">
      <div className="animate-fade-in-up">
        <Logo isScrolled={true} />
      </div>
      <div className="text-center animate-fade-in-up mt-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Create Your Account
        </h2>
        <p className="text-gray-600">
          Join NobleWood and discover premium wooden furniture
        </p>
      </div>
    </div>
  );
}
