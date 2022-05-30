import React, { useContext, useState } from "react";

type LoaderStatuses = "IDLE" | "LOADING" | "SAVED" | "ERROR";

export interface IAutoLoaderContext {
  setStatus: (status: LoaderStatuses) => void;
  status: LoaderStatuses;
}

const AutoLoaderContext = React.createContext<IAutoLoaderContext | null>(null);

export const useAutoLoaderContext = (): IAutoLoaderContext => {
  const context = useContext(AutoLoaderContext);
  if (context === null) {
    throw new Error(
      "useAutoLoaderState must be used within a AutoLoaderProvider"
    );
  }
  return context;
};

export const AutoLoaderProvider = ({
  children,
}: {
  children: JSX.Element[] | JSX.Element;
}) => {
  const [status, setStatus] = useState<LoaderStatuses>("IDLE");

  const onHandleStatus = (updatedStatus: LoaderStatuses) => {
    setStatus(updatedStatus);

    if (updatedStatus === "SAVED") {
      setTimeout(() => setStatus("IDLE"), 2000);
    }
  };

  return (
    <AutoLoaderContext.Provider value={{ status, setStatus: onHandleStatus }}>
      {children}
    </AutoLoaderContext.Provider>
  );
};

export const withAutoLoaderContext = <T,>(
  Component: React.ComponentType<T>
): React.FC<T> => {
  return (props) => {
    return (
      <AutoLoaderProvider>
        <Component {...props} />
      </AutoLoaderProvider>
    );
  };
};
