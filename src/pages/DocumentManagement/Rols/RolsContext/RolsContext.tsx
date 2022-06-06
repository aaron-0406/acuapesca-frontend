import React, { useState } from "react";
import { IRolsForm, RolContext, DataTypeRol } from "../types/types";

export const RolCxt = React.createContext({} as RolContext);
export const RolsProvider = ({ children }: { children: JSX.Element }) => {
  const [rols, setRols] = useState<DataTypeRol[]>([]);
  const [loading, setLoading] = useState<boolean>(true); //Loading submit (create or edit)


  return (
    <RolCxt.Provider
      value={{
        loading,
        setLoading,
        rols,
        setRols,
      }}
    >
      {children}
    </RolCxt.Provider>
  );
};
