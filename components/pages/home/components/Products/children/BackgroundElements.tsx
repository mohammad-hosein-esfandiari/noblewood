import React from "react";

export const BackgroundElements = () => {
  return (
    <>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-amber-300/20 to-yellow-200/20 rounded-full blur-3xl" />
      </div>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-amber-300/20 to-yellow-200/20 rounded-full blur-3xl" />
      </div>
    </>
  );
};
