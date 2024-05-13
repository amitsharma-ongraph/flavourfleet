import { FC, PropsWithChildren, useEffect, useReducer } from "react";
import { axios } from "../../packages/axios";
import { AdminState } from "../../packages/types/common/adminState";
import { AdminAction } from "../../packages/types/common/adminAction";
import { AdminStoreContext } from "@/context/adminStoreContext";

export const AdminStoreProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(
    (state: AdminState, action: AdminAction) => {
      switch (action.type) {
        case "setRestaurants":
          return {
            ...state,
            restaurants: action.data,
          };
        case "setAdminLoading":
          return {
            ...state,
            loading: action.data,
          };
        default:
          return state;
      }
    },
    {
      restaurants: null,
      loading: true,
    }
  );

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get("/admin/restaurants");
        const { data } = res;
        if (data.success) {
          dispatch({
            type: "setRestaurants",
            data: [...data.restroList],
          });

          setTimeout(() => {
            dispatch({
              type: "setAdminLoading",
              data: false,
            });
          }, 2000);
        }
      } catch (error) {}
    })();
  }, []);

  return (
    <AdminStoreContext.Provider value={{ state, dispatch }}>
      {children}
    </AdminStoreContext.Provider>
  );
};
