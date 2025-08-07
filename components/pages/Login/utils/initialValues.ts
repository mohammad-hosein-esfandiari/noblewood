export interface InitialValuesType {
  email: string;
  password: string;
  rememberMe: boolean;
}

const initialValues: InitialValuesType = {
  email: "",
  password: "",
  rememberMe: false,
};

export default initialValues;
