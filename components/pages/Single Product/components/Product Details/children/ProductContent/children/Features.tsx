import { RotateCcw, Shield, Truck } from "lucide-react";
import React from "react";

export const Features = () => {
  return (
    <div className="flex items-center justify-center gap-4 flex-wrap mb-4 mt-4">
      {[
        { icon: <Shield className="w-5 h-5" />, text: "2 Year Warranty" },
        { icon: <Truck className="w-5 h-5" />, text: "Free Shipping" },
        { icon: <RotateCcw className="w-4 h-4" />, text: "30 Day Returns" },
      ].map((feature, index) => (
        <div key={index} className="flex items-center space-x-2 text-gray-600">
          <div className="text-amber-600">{feature.icon}</div>
          <span className="text-[12px] font-medium">{feature.text}</span>
        </div>
      ))}
    </div>
  );
};
