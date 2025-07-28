import { Home } from "@/components/pages/home/Home";
import SiteInfo from "@/components/tests/UrlApiText";
import WooProducts from "@/components/tests/WooProducts";
import React from "react";


export default function Test() {
  return (
    <>
      <Home />
      <SiteInfo/>
      <WooProducts/>
    </>
  );
};
