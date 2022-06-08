import { yupResolver } from "@hookform/resolvers/yup";
import yup from "../../../../shared/yupLocale";

const UsersModalSchema = yup.object().shape({
  name: yup.string().required().min(5).max(150),
  lastname: yup.string().required().min(5).max(150),
  email: yup.string().required().email(),
  password: yup.string().required().min(5).max(150),
  dni: yup.string().required().min(8).max(8),
  address: yup.string().required().min(5).max(150),
});
const UsersModalSchemaEdit = yup.object().shape({
  name: yup.string().required().min(5).max(150),
  lastname: yup.string().required().min(5).max(150),
  email: yup.string().required().email(),
  password: yup.string().optional().min(5).max(150),
  dni: yup.string().required().min(8).max(8),
  address: yup.string().required().min(5).max(150),
});

export const UsersModalResolver = yupResolver(UsersModalSchema);
export const UsersModalResolverEdit = yupResolver(UsersModalSchemaEdit);
