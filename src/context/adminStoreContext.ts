import { createContext } from "react";
import { IRestroStoreContext } from "../../packages/types/context/IRestroStoreContext";
import { IAdminStoreContext } from "../../packages/types/context/IAdminStoreContext";

export const AdminStoreContext = createContext<IAdminStoreContext>({
  state: {
    restaurants: null,
    loading: true,
  },
  dispatch: () => {},
});
