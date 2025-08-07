// utils/auth.ts
import { cookies } from "next/headers";

/**
 * ذخیره توکن در کوکی
 * @param token توکن JWT
 * @param rememberMe اگر true باشد، کوکی به مدت ۳۰ روز ذخیره می‌شود. در غیر این صورت، تا پایان سشن مرورگر معتبر است.
 */
export async function setToken(token: string, rememberMe: boolean) {
  const cookieStore = await cookies();

  cookieStore.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: rememberMe ? 60 * 60 * 24 * 30 : undefined, // 30 روز یا فقط تا بسته شدن مرورگر
  });
}

/**
 * دریافت توکن از کوکی
 * @returns مقدار توکن یا null اگر وجود نداشته باشد
 */
export async function getToken() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  return token ?? null;
}

/**
 * حذف توکن از کوکی
 */
export async function removeToken() {
  const cookieStore = await cookies();

  cookieStore.delete("token");
}
