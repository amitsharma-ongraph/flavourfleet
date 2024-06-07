import { axios } from "../../packages/axios";
import { Notification } from "../../packages/types/common/Notification";
import { IOrder } from "../../packages/types/entity/IOrder";
import { usePayment } from "./usePayment";
import { useStore } from "./useStore";
import { useUser } from "./useUser";

interface IUseOrderReturns {
  placeOrder: (
    restaurantId: string,
    userAddressId: string | undefined,
    note: string | null,
    price: number
  ) => Promise<Notification>;
}

export const useOrder = (): IUseOrderReturns => {
  const {
    dispatch,
    state: { cart, orders },
  } = useStore();
  const { handlePayment } = usePayment();
  const { verfifyContact } = useUser();
  return {
    placeOrder: async (restaurantId, userAddressId, note, price) => {
      const isContactVerified = await verfifyContact();
      if (!isContactVerified) {
        return {
          type: "error",
          title: "Please Verify Your contact",
          path: `/verify?redirect=${restaurantId}`,
        };
      }
      if (!userAddressId) {
        return {
          type: "error",
          title: "Coudnt fetche address",
        };
      }
      let signed = false;
      try {
        const res = await axios.post("/payment/create-order", {
          price: price * 100,
        });
        const { data } = res;
        if (data.success) {
          const res = await handlePayment(data.order);
          if (res && res.success == true) {
            signed = true;
          }
        }
      } catch (error) {
        return {
          type: "error",
          title: "Error while initiating the payment",
        };
      }
      if (signed == false) {
        return {
          type: "error",
          title: "payment failed",
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
          data: [data.order, ...orders],
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
