import { Toaster } from "react-hot-toast";
import { CartProvider } from "@/contexts/CartContext";
import AuthInitializer from "@/hooks/use-auth-initializer";
import React, { FC } from "react";
import Header from "../Header/Header";
import { cookies } from "next/headers";

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: FC<MainLayoutProps> = async ({ children }) => {
  const cookie = await cookies()
  const cookieValue =  cookie.get("NW-AUTH")?.value
  return (
    <>
      {/* <CheckAuth/> */}
      <AuthInitializer cookie={cookieValue ? cookieValue : null} />
      <CartProvider>
        <Toaster containerStyle={{ fontSize: "13px" }} />
        <Header />
        <main>{children}</main>
      </CartProvider>
    </>
  );
};
