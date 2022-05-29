import { Action } from "../../shared/contexts/actions";
import { IAdmin } from "../../shared/types";

export enum ActionTypes {
  Login = "login",
  MagicLinkEmail = "magicLinkEmail",
  ClearMagicLinkEmail = "clearMagicLinkEmail",
  Logout = "logout",
}

export interface LoginAction extends Action<ActionTypes.Login> {
  payload: {
    admin: IAdmin;
  };
}

export interface MagicLinkAction extends Action<ActionTypes.MagicLinkEmail> {
  payload: {
    email: string;
  };
}

export interface ClearMagicLinkAction
  extends Action<ActionTypes.ClearMagicLinkEmail> {}

export interface LogoutAction extends Action<ActionTypes.Logout> {}
