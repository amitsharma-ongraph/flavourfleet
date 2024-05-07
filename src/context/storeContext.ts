import { createContext } from "react";
import { IStoreContext } from "../../packages/types/context/IStoreContext";

export const StoreContext = createContext<IStoreContext>({
  state: {
    user: undefined,
    modal: null,
    modalController: {
      loading: false,
    },
  },
  dispatch: () => {},
});
