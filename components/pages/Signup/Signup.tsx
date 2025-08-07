import React from "react";
import Left from "./components/Left";
import RegisterForm from "./components/RegisterForm";

export default function Signup() {
  return (
    <div className="min-h-screen  bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 flex  items-center flex-col md:flex-row gap-4   relative overflow-hidden">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-center gap-8 w-full max-w-7xl py-8 px-4">
        <Left />
        <RegisterForm />
      </div>
    </div>
  );
}
