import { Address } from "../entity/Address";
import { ICart } from "../entity/ICart";
import { IUserPOrder } from "../entity/IUserPOrder";
import { User } from "../entity/User";
import { LoadingStates } from "./LoadingStates";
import { Modal } from "./modal";
import { ModalController } from "./modalController";
import { Nullable } from "./nullable";

export interface State {
  user: User | null | undefined;
  modal: Nullable<Modal>;
  modalController: ModalController;
  loadingStates: LoadingStates;
  cart: ICart;
  orders: IUserPOrder[];
  selectedLocation: Address | null;
  liveLocation: Address | null;
}
