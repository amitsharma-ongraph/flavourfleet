import { RestroActionType } from "./restroActionType";

export interface RestroAction {
  type: RestroActionType;
  data: any;
}
