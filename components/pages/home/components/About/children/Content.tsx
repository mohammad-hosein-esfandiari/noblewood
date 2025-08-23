import React from "react";
import { Label } from "./Content/Label";
import { Title } from "./Content/Title";
import { Description } from "./Content/Description";
import { Cards } from "./Content/Cards";

export const Content = () => {
  return (
    <div>
      <Label />
      <Title />
      <Description/>
      <Cards/>
    </div>
  );
};
