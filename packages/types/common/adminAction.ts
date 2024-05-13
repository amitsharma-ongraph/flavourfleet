import { AdminActionType } from "./adminActionType";
import { RestroActionType } from "./restroActionType";

export interface AdminAction {
  type: AdminActionType;
  data: any;
}
