// app/(auth)/layout.tsx

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";

export default async function AuthLayout({ children }: { children: ReactNode }) {
  const cookieStore = await cookies(); // نه await و نه .then
  const token = cookieStore.get("NW-AUTH")?.value;
  if (token) {
    redirect("/"); // اگر توکن وجود داشته باشه، بفرست صفحه اصلی
  }
  return <>{children}</>;
}
