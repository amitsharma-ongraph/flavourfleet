import { Action } from "../common/action";
import { State } from "../common/state";

export interface IStoreContext {
  state: State;
  dispatch: (action: Action) => void;
}
