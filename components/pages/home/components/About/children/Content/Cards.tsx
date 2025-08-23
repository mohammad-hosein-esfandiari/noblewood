import { Award, Clock, Sparkles, Users } from "lucide-react";
import React from "react";

export const Cards = () => {
  return (
    <div className="grid grid-cols-2 gap-6 mb-8">
      {[
        {
          icon: <Clock className="w-6 h-6" />,
          number: "10+",
          label: "Years Experience",
        },
        {
          icon: <Users className="w-6 h-6" />,
          number: "5000+",
          label: "Happy Customers",
        },
        {
          icon: <Award className="w-6 h-6" />,
          number: "50+",
          label: "Awards Won",
        },
        {
          icon: <Sparkles className="w-6 h-6" />,
          number: "100%",
          label: "Satisfaction",
        },
      ].map((stat, index) => (
        <div
          key={index}
          className="text-center p-6 bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
          <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-amber-600 rounded-xl flex items-center justify-center mx-auto mb-3 text-white">
            {stat.icon}
          </div>
          <div className="text-3xl font-bold text-amber-700 mb-1">
            {stat.number}
          </div>
          <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
        </div>
      ))}
    </div>
  );
};
