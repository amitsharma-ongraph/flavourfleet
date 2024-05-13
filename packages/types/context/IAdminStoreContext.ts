import { AdminAction } from "../common/adminAction";
import { AdminState } from "../common/adminState";

export interface IAdminStoreContext {
  state: AdminState;
  dispatch: (action: AdminAction) => void;
}
