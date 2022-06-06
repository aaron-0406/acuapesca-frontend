import React, { useState } from "react";
import { IRolsForm, RolContext, DataTypeRol } from "../types/types";

const initialStateRol: IRolsForm = {
  code: "",
  name: "",
  tag_id: 1,
};
export const RolCxt = React.createContext({} as RolContext);
export const RolsProvider = ({ children }: { children: JSX.Element }) => {
  const [rol, setRol] = useState<IRolsForm>(initialStateRol);
  const [rols, setRols] = useState<DataTypeRol[]>([]);
  const [loading, setLoading] = useState<boolean>(true); //Loading submit (create or edit)
  const [loadingData, setLoadingData] = useState<boolean>(false); //Loading list


  return (
    <RolCxt.Provider
      value={{
        loading,
        setLoading,
        rol,
        setRol,
        loadingData,
        setLoadingData,
        rols,
        setRols,
      }}
    >
      {children}
    </RolCxt.Provider>
  );
};
