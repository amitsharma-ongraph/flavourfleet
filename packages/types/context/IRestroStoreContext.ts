import { RestroAction } from "../common/restroAction";
import { RestroState } from "../common/restroState";

export interface IRestroStoreContext {
  state: RestroState;
  dispatch: (action: RestroAction) => void;
}
