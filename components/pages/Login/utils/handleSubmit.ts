

import toast from "react-hot-toast";
import { InitialValuesType } from "./initialValues";
import { loginUser } from "@/utils/other/login";
import { setTokenCookie } from "@/utils/other/cookie";


export const handleSubmit = async (
  values: InitialValuesType,
  { setSubmitting, resetForm }: any ,redirect: (path: string) => void
) => {
  setSubmitting(true);
  try {
    const { result } = await loginUser({
      username: values.email,
      password: values.password,
      rememberMe: values.rememberMe,
    });

    console.log(result)
    toast.success("Login successfullll!");
    redirect("/");
  } catch (err: any) {
    console.log(err)
    toast.error(err.response?.data?.message || "❌ Failedddd to login", {
      duration: 3000,
    });
  } finally {
    setSubmitting(false);
  }
};