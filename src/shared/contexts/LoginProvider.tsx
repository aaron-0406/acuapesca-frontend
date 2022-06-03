import React, { useContext, useReducer } from "react";
import storage from "../utils/storage";
import { ActionTypes } from "../../pages/Login/actions";
import { ReducerActions } from "./appReducer";

export interface LoginState {
  email: string | null;
}

const loginInitialState = (): LoginState => ({
  email: storage.get<string>("email"),
});

type Dispatch = (action: ReducerActions) => void;

const LoginContext =
  React.createContext<{
    state: LoginState;
    dispatch: Dispatch;
  } | null>(null);

export const loginReducer = (
  state: LoginState = loginInitialState(),
  action: ReducerActions
): LoginState => {
  switch (action.type) {
    case ActionTypes.MagicLinkEmail: {
      storage.set("email", action.payload.email);
      return {
        ...state,
        email: action.payload.email,
      };
    }

    case ActionTypes.ClearMagicLinkEmail: {
      storage.remove("email");
      return {
        ...state,
        email: null,
      };
    }
    default: {
      return state;
    }
  }
};

export const LoginProvider = ({ children }: { children: JSX.Element }) => {
  const [state, dispatch] = useReducer(loginReducer, loginInitialState());
  return (
    <LoginContext.Provider value={{ state, dispatch }}>
      {children}
    </LoginContext.Provider>
  );
};

export const useLoginContext = () => {
  const context = useContext(LoginContext);
  if (context === null) {
    throw new Error("useLoginContext must be used within a LoginProvider");
  }
  return context;
};
