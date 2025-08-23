import React from "react";
import { Label } from "./children/Label";
import { Title } from "./children/Title";
import { Description } from "./children/Description";
import { Cards } from "./children/Cards";

export const Contact = () => {
  return (
    <section
      id="contact"
      className="py-32 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-5xl mx-auto text-center relative z-10">
        <Label />
        <Title/>
        <Description/>
        <Cards/>
      </div>
    </section>
  );
};
