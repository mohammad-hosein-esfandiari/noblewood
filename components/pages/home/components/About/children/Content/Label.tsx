import { Award } from "lucide-react";
import React from "react";

export const Label = () => {
  return (
    <div className="flex items-center mb-6">
      <Award className="w-8 h-8 text-amber-500 mr-3" />
      <span className="text-amber-600 font-semibold tracking-wider uppercase text-sm">
        About NobleWood
      </span>
    </div>
  );
};
