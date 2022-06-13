import { yupResolver } from "@hookform/resolvers/yup";
import yup from "../../../../../../shared/yupLocale";

const ProceduresModalSchema = yup.object().shape({
  code: yup.string().required().min(2).max(15),
  title: yup.string().required().max(30),
});

export const ProceduresModalResolver = yupResolver(ProceduresModalSchema);
