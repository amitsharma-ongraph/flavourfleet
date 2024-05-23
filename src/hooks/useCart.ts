import CartCheckoutModalBody from "@/components/Modals/CartCheckoutModalBody";
import { useModal } from "./useModal";
import { useStore } from "./useStore";
import { IUserPMenuItem } from "../../packages/types/entity/IUserPMenuItem";
import { axios } from "../../packages/axios";
import { useNotification } from "./useNotification";

interface IUseCartReturns {
  addToCart: (restaurantId: string, menuItem: IUserPMenuItem) => Promise<void>;
  removeFromCart: (restaurantId: string, menuItemId: string) => Promise<void>;
  showCart: () => void;
}

export const useCart = (): IUseCartReturns => {
  const { setModal } = useModal();
  const { dispatch } = useStore();
  const { setNotification } = useNotification();
  return {
    addToCart: async (restaurantId, menuItem) => {
      dispatch({
        type: "setLoadingState",
        data: {
          formLoading: true,
          appLoading: false,
        },
      });
      try {
        const res = await axios.post("/cart/add", {
          restaurantId,
          menuItem,
        });
        const { data } = res;
        if (!data.success) {
          setNotification({
            type: "error",
            title: res.data.message,
          });
        }
        dispatch({
          type: "addToCart",
          data: {
            restaurantId,
            menuItem,
          },
        });

        setTimeout(() => {
          dispatch({
            type: "setLoadingState",
            data: {
              formLoading: false,
              appLoading: false,
            },
          });
        }, 1200);
      } catch (error) {
        setNotification({
          type: "error",
          title: "Some error occured",
        });
      }
    },
    removeFromCart: async (restaurantId, menuItemId) => {
      dispatch({
        type: "setLoadingState",
        data: {
          formLoading: true,
          appLoading: false,
        },
      });
      try {
        const res = await axios.post("/cart/remove", {
          restaurantId,
          menuItemId,
        });
        const { data } = res;
        if (!data.success) {
          setNotification({
            type: "error",
            title: res.data.message,
          });
        }
        dispatch({
          type: "removeFromCart",
          data: {
            restaurantId,
            menuItemId,
          },
        });
        setTimeout(() => {
          dispatch({
            type: "setLoadingState",
            data: {
              formLoading: false,
              appLoading: false,
            },
          });
        }, 1200);
      } catch (error) {
        setNotification({
          type: "error",
          title: "Some error occured",
        });
      }
    },
    showCart: () => {
      setModal({
        title: "",
        ModalBody: CartCheckoutModalBody,
      });
    },
  };
};
