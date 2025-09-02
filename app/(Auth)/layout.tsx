// app/(auth)/layout.tsx
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";

export default async function AuthLayout({ children }: { children: ReactNode }) {
  const cookieStore = await cookies(); // server-side
  const token = cookieStore.get("NW-AUTH")?.value;

  // اگر توکن وجود داره، یعنی کاربر لاگین هست → ری‌دایرکت کن
  if (token) {
    redirect("/"); // یا هر صفحه‌ای که میخوای
  }

  // اگه توکن نیست، layout اجازه میده محتوای children رندر بشه
  return <>{children}</>;
}
