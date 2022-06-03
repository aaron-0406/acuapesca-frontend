import React, { useContext, useEffect, useReducer } from "react";
import storage from "../utils/storage";
import {
  appReducer,
  AppState,
  appStateKey,
  initialAppState,
  ReducerActions,
} from "./appReducer";

type Dispatch = (action: ReducerActions) => void;

export const GeneralContext =
  React.createContext<{
    state: AppState;
    dispatch: Dispatch;
  } | null>(null);

export const StoreProvider = ({ children }: { children: JSX.Element }) => {
  const [state, dispatch] = useReducer(appReducer, initialAppState);

  useEffect(() => {
    if (state.auth.admin.id) {
      storage.set(appStateKey, state);
    }
  }, [state]);

  return (
    <GeneralContext.Provider value={{ state, dispatch }}>
      {children}
    </GeneralContext.Provider>
  );
};

export const useGeneralContext = () => {
  const context = useContext(GeneralContext);
  if (context === null) {
    throw new Error("useGeneralContext must be used within a StoreProvider");
  }
  return context;
};
