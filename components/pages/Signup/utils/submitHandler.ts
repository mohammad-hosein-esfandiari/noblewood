// components/auth/submitHandler.ts
import API from "@/utils/interceptor/interceptor";
import toast from "react-hot-toast";
import { InitialValuesType } from "./initialValues";

export const handleSubmit = async (values: InitialValuesType, { setSubmitting, resetForm }: any) => {
  setSubmitting(true);
  try {
    const res = await API.post("/auth/signup", {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      password: values.password,
    });

    const data = res.data;

    if (data.statusCode === 201) {
      toast.success(data.message);
      resetForm();
    }
  } catch (err: any) {
    toast.error(err.response?.data?.message || "❌ Failed to create account", {
      duration: 3000,
    });
    
  } finally {
    setSubmitting(false);
  }
};
