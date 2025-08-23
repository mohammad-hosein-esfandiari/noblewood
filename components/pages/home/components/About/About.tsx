import React from "react";
import { Content } from "./children/Content";
import { Gallery } from "./children/Gallery";

export const About = () => {
  return (
    <section id="about" className="py-32 bg-white px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <Content />
          <Gallery />
        </div>
      </div>
    </section>
  );
};
