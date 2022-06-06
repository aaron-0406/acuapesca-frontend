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
