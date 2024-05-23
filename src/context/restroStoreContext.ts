import { createContext } from "react";
import { IRestroStoreContext } from "../../packages/types/context/IRestroStoreContext";

export const RestroStoreContext = createContext<IRestroStoreContext>({
  state: {
    restaurant: null,
    loading: true,
    orders: [],
  },
  dispatch: () => {},
});
