"use client"
import { Lock, Mail, TreePine } from "lucide-react";
import Link from "next/link";
import React from "react";
import Left from "../Signup/components/Left";
import { LoginForm } from "./components/LoginForm";
import { Container } from "@/components/global/Components/Container/Container";

export const Login = () => {
  return (
    <Container>

    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-[1024px] gap-4 md:gap-20 w-full space-y-8 relative z-10 flex flex-col md:flex-row items-center justify-center">
        <Left />
        <LoginForm/>
      </div>
    </div>
    </Container>
  );
};
