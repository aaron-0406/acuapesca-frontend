import { yupResolver } from "@hookform/resolvers/yup";
import yup from "../../../../shared/yupLocale";

const RolsModalSchema = yup.object().shape({
  code: yup.string().required().max(20),
  name: yup.string().required().min(5).max(150),
});

export const RolsModalResolver = yupResolver(RolsModalSchema);
