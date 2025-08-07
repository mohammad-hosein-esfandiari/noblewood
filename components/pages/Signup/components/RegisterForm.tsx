"use client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { User, Mail, Lock } from "lucide-react";
import InputField from "@/components/global/Components/InputField/InputField";
import Link from "next/link";
import SignupSchema from "../utils/validationSchema";
import initialValues from "../utils/initialValues";
import { handleSubmit } from "../utils/submitHandler";

export default function RegisterForm() {
  return (
    <div className="space-y-8 flex flex-col flex-1 justify-center items-center relative z-10">
      <div
        className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/20 animate-fade-in-up"
        style={{ animationDelay: "0.2s" }}>
        <Formik
          initialValues={initialValues}
          validationSchema={SignupSchema}
          onSubmit={(values, actions) => handleSubmit(values, actions)}>
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <InputField
                  name="firstName"
                  placeholder="John"
                  label="First Name"
                  icon={User}
                />
                <InputField
                  name="lastName"
                  placeholder="Doe"
                  label="Last Name"
                  icon={User}
                />
              </div>

              <InputField
                name="email"
                type="email"
                placeholder="john@example.com"
                label="Email Address"
                icon={Mail}
              />
              <InputField
                name="password"
                type="password"
                placeholder="••••••••"
                label="Password"
                icon={Lock}
              />
              <InputField
                name="confirmPassword"
                type="password"
                placeholder="••••••••"
                label="Confirm Password"
                icon={Lock}
              />

              {/* Checkbox */}
              <div className="">
                <div className="flex items-center space-x-2">
                  <Field
                    type="checkbox"
                    name="acceptTerms"
                    className="w-4 h-4 text-amber-600 border-gray-300 rounded"
                  />
                  <span className="text-gray-700 text-sm">
                    I accept the{" "}
                    <Link
                      href="/terms"
                      className="text-amber-600 hover:underline">
                      Terms & Conditions
                    </Link>
                  </span>
                </div>
                <div className="text-red-500 text-right text-[12px] mt-1 h-4">
                  <ErrorMessage
                    name="acceptTerms"
                    component="div"
                    className=""
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-amber-600 to-amber-700 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:from-amber-700 hover:to-amber-800 transform hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none">
                {isSubmitting ? "Creating Account..." : "Create Account"}
              </button>
            </Form>
          )}
        </Formik>

        <div className="text-center mt-6">
          <p className="text-gray-600">
            Already have an account?{" "}
            <Link href="/login" className="text-amber-600 hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
