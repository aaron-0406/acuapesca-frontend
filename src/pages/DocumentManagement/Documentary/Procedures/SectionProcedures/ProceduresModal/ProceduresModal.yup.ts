import { yupResolver } from "@hookform/resolvers/yup";
import yup from "../../../../../../shared/yupLocale";

const ProceduresModalSchema = yup.object().shape({
  code: yup.string().required().max(20),
  name: yup.string().required().min(5).max(150),
});

export const ProceduresModalResolver = yupResolver(ProceduresModalSchema);
