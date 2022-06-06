export interface IRolsForm {
  id?: number;
  name: string;
  code: string;
  tag_id: number;
}
export interface DataTypeRol {
  key: string;
  id: number;
  code: string;
  name: string;
  tag: string;
  tag_id: number;
}

export interface RolContext {
  loadingData: boolean;
  setLoadingData: Function;
  rol: IRolsForm;
  setRol: Function;
  rols: DataTypeRol[];
  setRols: Function;
  loading: boolean;
  setLoading: Function;
}
