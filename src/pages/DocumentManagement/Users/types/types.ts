export interface DataTypeUser {
  key: string;
  id: number;
  code: string;
  name: string;
  tag: string;
  tag_id: number;
}
export interface IUsersForm {
  id?: number;
  address: string;
  email: string;
  password: string;
  id_rango: number;
  name: string;
  lastname: string;
  dni: string;
  status: boolean;
}
export interface UserContext {
  users: DataTypeUser[];
  setUsers: Function;
  loading: boolean;
  setLoading: Function;
  rangos: { label: string; value: number }[];
  setRangos: Function;
}
