import { RcFile } from "antd/lib/upload";

export interface IProcessesForm {
  id?: number;
  name: string;
  code: string;
  status: boolean;
}

export interface IProceduresForm {
  id?: number;
  title: string;
  status: boolean;
  code: string;
  process_id: number;
}

export interface IDocumentForm {
  id?: number;
  code: string;
  version: number;
  effective_date: string;
  approval_date: string;
  title: string;
  name: string;
  nro_pages: number;
  procedure_id: number;
  file: RcFile;
  status: boolean;
  permisos: number[];
}
