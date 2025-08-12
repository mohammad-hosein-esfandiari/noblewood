"use client";

import { useEffect } from "react";
import { toast, ToastPosition } from "react-hot-toast";

interface ErrorToastProps {
  message: string;
  position?: ToastPosition; // optional position prop
}

const ErrorToast: React.FC<ErrorToastProps> = ({ message, position = "bottom-center" }) => {
  useEffect(() => {
    if (message) {
      toast.error(message, { position, duration: Infinity });
    }
  }, [message, position]);

  return null;
};

export default ErrorToast;
