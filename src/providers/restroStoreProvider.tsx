import { FC, PropsWithChildren, useEffect, useReducer } from "react";
import { useAuth } from "@/hooks/useAuth";
import { axios } from "../../packages/axios";
import { RestroState } from "../../packages/types/common/restroState";
import { RestroAction } from "../../packages/types/common/restroAction";
import { RestroStoreContext } from "@/context/restroStoreContext";

export const RestroStoreProvider: FC<PropsWithChildren> = ({ children }) => {
  const { userId } = useAuth();

  const [state, dispatch] = useReducer(
    (state: RestroState, action: RestroAction) => {
      switch (action.type) {
        case "setRestaurant":
          return {
            ...state,
            restaurant: action.data,
          };
        case "setRestroLoading":
          return {
            ...state,
            loading: action.data,
          };
        default:
          return state;
      }
    },
    {
      restaurant: null,
      loading: true,
    }
  );

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get("/restaurant/available");
        const { data } = res;
        if (data.success == true) {
          dispatch({
            type: "setRestaurant",
            data: {
              ...data.restaurant,
              ownerId: data.restaurant.ownerId._id,
            },
          });

          setTimeout(() => {
            dispatch({
              type: "setRestroLoading",
              data: false,
            });
          }, 2000);
        }
      } catch (error) {}
    })();
  }, [userId]);

  return (
    <RestroStoreContext.Provider value={{ state, dispatch }}>
      {children}
    </RestroStoreContext.Provider>
  );
};
