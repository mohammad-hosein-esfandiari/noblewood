// مثال Next.js API
import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({statusCode:406 , status:"success" , message: "Logged out" });
  response.cookies.set("NW-AUTH", "", { path: "/", maxAge: 0 });
  return response;
}
