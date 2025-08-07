"use client";
import React, { useState } from "react";
import { useField } from "formik";
import { Eye, EyeOff } from "lucide-react";

interface InputFieldProps {
  label?: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  icon?: React.ElementType;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  icon: Icon,
  type = "text",
  ...props
}) => {
  const [field, meta] = useField(props.name);
  const [showPassword, setShowPassword] = useState(false);

  const hasError = meta.touched && meta.error;
  const isPassword = type === "password";

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={props.name}
          className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}

      <div className="relative">
        {Icon && (
          <Icon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
        )}

        <input
          {...field}
          {...props}
          id={props.name}
          type={isPassword && !showPassword ? "password" : "text"}
          className={`w-full ${Icon ? "pl-10" : "pl-4"} ${
            isPassword ? "pr-10" : "pr-4"
          } py-3 border rounded-xl focus:ring-2 
            focus:ring-amber-500 focus:border-amber-500 bg-white/50 
            backdrop-blur-sm outline-none transition-all duration-300
            ${
              hasError
                ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                : "border-gray-300"
            }`}
        />

        {/* آیکون چشم برای پسورد */}
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}
      </div>
      <div className="mt-1 h-4 pl-2">
        {hasError && (
          <p className=" text-[11px] text-red-500">{meta.error}</p>
        )}
      </div>
    </div>
  );
};

export default InputField;
