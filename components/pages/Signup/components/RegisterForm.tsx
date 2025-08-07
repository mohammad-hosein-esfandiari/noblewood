"use client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { User, Mail, Lock } from "lucide-react";
import InputField from "@/components/global/Components/InputField/InputField";
import Link from "next/link";
import { useState } from "react";

const SignupSchema = Yup.object({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Must contain at least one uppercase letter")
    .matches(/[a-z]/, "Must contain at least one lowercase letter")
    .matches(/[0-9]/, "Must contain at least one number")
    .matches(/[@$!%*?&]/, "Must contain at least one special character (@$!%*?&)"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm your password"),
  acceptTerms: Yup.boolean()
    .oneOf([true], "You must accept the Terms & Conditions"),
});

export default function RegisterForm() {
  const [serverMessage, setServerMessage] = useState<string | null>(null);

  return (
    <div className="space-y-8 flex flex-col flex-1 justify-center items-center relative z-10">
      <div
        className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/20 animate-fade-in-up"
        style={{ animationDelay: "0.2s" }}
      >
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
            acceptTerms: false,
          }}
          validationSchema={SignupSchema}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            setSubmitting(true);
            setServerMessage(null);

            try {
              const res = await fetch("/api/routes/signup", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  "X-Secret-Key": "1111",
                },
                body: JSON.stringify({
                  firstName: values.firstName,
                  lastName: values.lastName,
                  email: values.email,
                  password: values.password,
                }),
              });

              const data = await res.json();

              if (res.ok) {
                setServerMessage("✅ Account created successfully!");
                resetForm();
              } else {
                setServerMessage(`❌ ${data.message || "Failed to create account"}`);
              }
            } catch (err) {
              console.error("Signup error:", err);
              setServerMessage("❌ Network error, please try again later.");
            }

            setSubmitting(false);
          }}
        >
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
                    <Link href="/terms" className="text-amber-600 hover:underline">
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

              {serverMessage && (
                <div className="text-center text-sm mt-2">
                  {serverMessage}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-amber-600 to-amber-700 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:from-amber-700 hover:to-amber-800 transform hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
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
