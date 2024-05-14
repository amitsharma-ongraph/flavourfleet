import { User } from "../entity/User";
import { LoadingStates } from "./LoadingStates";
import { Modal } from "./modal";
import { ModalController } from "./modalController";
import { Nullable } from "./nullable";

export interface State {
  user: User | null | undefined;
  modal: Nullable<Modal>;
  modalController: ModalController;
  loadingStates:LoadingStates;
}
