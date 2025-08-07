"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Lock, Mail } from "lucide-react";
import InputField from "@/components/global/Components/InputField/InputField";
import initialValues from "../utils/initialValues";
import LoginSchema from "../utils/validationSchema";
import { handleSubmit } from "../utils/handleSubmit";

export const LoginForm = () => {
  const router = useRouter();
  
  return (
    <div
      className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/20 animate-fade-in-up flex-1 w-full"
      style={{ animationDelay: "0.2s" }}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={LoginSchema}
        onSubmit={(values, actions) => handleSubmit(values, actions, (path) => router.push(path))}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4">
            {/* Email */}
            <InputField
              name="email"
              type="email"
              placeholder="john@example.com"
              label="Email Address"
              icon={Mail}
            />

            {/* Password */}
            <InputField
              name="password"
              type="password"
              placeholder="••••••••"
              label="Password"
              icon={Lock}
            />

            {/* Remember Me & Forgot */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Field
                  id="rememberMe"
                  name="rememberMe"
                  type="checkbox"
                  className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="rememberMe"
                  className="ml-2 block text-sm text-gray-700"
                >
                  Remember me
                </label>
              </div>

              <Link
                href="/forgot-password"
                className="text-sm text-amber-600 hover:text-amber-700 font-medium transition-colors duration-200"
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-amber-600 to-amber-700 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:from-amber-700 hover:to-amber-800 transform hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </button>

            {/* Redirect to Signup */}
            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Don’t have an account?{" "}
                <Link
                  href="/signup"
                  className="text-amber-600 hover:text-amber-700 font-semibold transition-colors duration-200"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
