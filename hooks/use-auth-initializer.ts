
"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/store/auth";

const AuthInitializer: React.FC = () => {
  const refreshAuth = useAuthStore((state) => state.refreshAuth);

  useEffect(() => {
    void refreshAuth(); // ✅ void برای جلوگیری از warning async در useEffect
  }, [refreshAuth]);

  return null; // فقط برای initialize
};

export default AuthInitializer;
