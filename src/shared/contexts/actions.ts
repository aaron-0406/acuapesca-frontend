export interface Action<TAction extends string = string, TPayload = unknown> {
  type: TAction;
  payload?: TPayload;
}
