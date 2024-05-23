import { axios } from "../../packages/axios";
import { Notification } from "../../packages/types/common/Notification";
import { IOrder } from "../../packages/types/entity/IOrder";
import { useStore } from "./useStore";

interface IUseOrderReturns {
  placeOrder: (
    restaurantId: string,
    userAddressId: string | undefined,
    note: string | null
  ) => Promise<Notification>;
}

export const useOrder = (): IUseOrderReturns => {
  const {
    dispatch,
    state: { cart, orders },
  } = useStore();
  return {
    placeOrder: async (restaurantId, userAddressId, note) => {
      if (!userAddressId) {
        return {
          type: "error",
          title: "Coudnt fetche address",
        };
      }
      try {
        const res = await axios.post("/order/place", {
          restaurantId,
          userAddressId,
          note,
        });
        const { data } = res;
        if (!data.success) {
          return {
            type: "error",
            title: data.message,
          };
        }
        const { [restaurantId]: _, ...rest } = cart;
        dispatch({
          type: "setCart",
          data: rest,
        });
        dispatch({
          type: "setOrders",
          data: [...orders, data.order],
        });
        return {
          type: "success",
          title: "Order Placed Successfully",
          path: "/profile/orders",
        };
      } catch (error) {
        return {
          type: "error",
          title: "unexpected error occured",
        };
      }
    },
  };
};
