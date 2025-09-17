import { Toaster } from "react-hot-toast";
import { CartProvider } from "@/contexts/CartContext";
import AuthInitializer from "@/hooks/use-auth-initializer";
import React, { FC } from "react";
import Header from "../Header/Header";

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  return (
    <>
      {/* <CheckAuth/> */}
      <AuthInitializer />
      <CartProvider>
        <Toaster containerStyle={{ fontSize: "13px" }} />
        <Header />
        <main>{children}</main>
      </CartProvider>
    </>
  );
};
