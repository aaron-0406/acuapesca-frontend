import {
  ActionTypes as LoginActionTypes,
  ClearMagicLinkAction,
  LoginAction,
  LogoutAction,
  MagicLinkAction,
} from "../../pages/Login/actions";
import { IAdmin } from "../types";
import storage from "../utils/storage";
import { getAuthToken } from "../utils/storage/auth";

export type ReducerActions =
  | LoginAction
  | MagicLinkAction
  | ClearMagicLinkAction
  | LogoutAction;

export interface IAuth {
  isAuthenticated: boolean;
  admin: IAdmin;
}

export interface AppState {
  auth: IAuth;
}

export const appStateKey = "app_state";

const defaultState: AppState = {
  auth: {
    isAuthenticated: false,
    admin: {
      id: 0,
      name: "",
      lastname: "",
      email: "",
      status: false,
      id_rango: 0,
      rango: "",
      dni: "",
      address: "",
      photo: "",
    },
  },
};

export const loadInitialState = (): AppState => {
  const token = getAuthToken();
  const loadedAppState = storage.get<AppState>(appStateKey);
  if (!token || !loadedAppState?.auth.admin) {
    return defaultState;
  }

  loadedAppState.auth.isAuthenticated = !!loadedAppState.auth.admin;

  return loadedAppState;
};

export const initialAppState: AppState = loadInitialState();

export const appReducer = (
  state: AppState = initialAppState,
  action: ReducerActions
): AppState => {
  switch (action.type) {
    case LoginActionTypes.Login: {
      const admin = action?.payload?.admin;
      return {
        ...state,
        auth: {
          ...state.auth,
          isAuthenticated: !!admin,
          admin,
        },
      };
    }
    case LoginActionTypes.Logout: {
      return defaultState;
    }
    default: {
      return state;
    }
  }
};
