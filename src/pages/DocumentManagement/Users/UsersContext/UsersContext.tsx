import React, { useEffect, useState } from "react";
import { getRols } from "../../../../shared/utils/services/rolsServices";
import { UserContext, DataTypeUser } from "../types/types";

export const UserCxt = React.createContext({} as UserContext);
export const UsersProvider = ({ children }: { children: JSX.Element }) => {
  const [users, setUsers] = useState<DataTypeUser[]>([]);
  const [rangos, setRangos] = useState<{ label: string; value: number }[]>([{ label: "Seleccione una opción" as string, value: 0 as number }]);
  const [loading, setLoading] = useState<boolean>(true); //Loading submit (create or edit)
  const getRangosData = async () => {
    const res = await getRols();
    const { data } = res;
    const { rols } = data;
    let newRangos = rols.map((rol: any) => {
      return { label: rol.name as string, value: rol.id as number };
    });
    setRangos(newRangos);
  };
  useEffect(() => {
    getRangosData();
    return () => setRangos([]);
  }, []);
  return (
    <UserCxt.Provider
      value={{
        loading,
        setLoading,
        users,
        setUsers,
        rangos,
        setRangos,
      }}
    >
      {children}
    </UserCxt.Provider>
  );
};
