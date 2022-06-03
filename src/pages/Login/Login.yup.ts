import yup from "../../shared/yupLocale";
import { yupResolver } from "@hookform/resolvers/yup";

const LoginWithEmailSchema = yup.object().shape({
  email: yup.string().required().email(),
  password: yup.string().required(),
});

export const LoginWithEmailResolver = yupResolver(LoginWithEmailSchema);
