"use client";

import { redirect } from "next/navigation";
import { removeTokenCookie } from "./cookie";

export const logoutUser = () => {
  removeTokenCookie();
  // اگر صفحه لاگینت در مسیر /login هست:
  redirect("/login");
};
