import { createContext } from "react";
import { IStoreContext } from "../../packages/types/context/IStoreContext";

export const StoreContext = createContext<IStoreContext>({
  state: {
    user: undefined,
    modal: null,
    modalController: {
      loading: false,
    },
    loadingStates: {
      formLoading: false,
      appLoading: false,
    },
    cart: {},
    orders: [],
  },
  dispatch: () => {},
});
