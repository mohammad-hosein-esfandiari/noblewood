import API from "../interceptor/interceptor";


interface LoginInput {
  username: string;
  password: string;
  rememberMe?: boolean; // Optional, if you want to handle "remember me" functionality
}

export const loginUser = async (input: LoginInput) => {
  const response = await API.post("/auth/login", {
    username: input.username,
    password: input.password,
    rememberMe: input.rememberMe,
  });

  return response.data;
};