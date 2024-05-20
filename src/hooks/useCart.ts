import CartCheckoutModalBody from "@/components/Modals/CartCheckoutModalBody";
import { useModal } from "./useModal";
import { useStore } from "./useStore";
import { IUserPMenuItem } from "../../packages/types/entity/IUserPMenuItem";
import { axios } from "../../packages/axios";

interface IUseCartReturns {
  addToCart: (restaurantId: string, menuItem: IUserPMenuItem) => Promise<void>;
  removeFromCart: (restaurantId: string, menuItemId: string) => Promise<void>;
  showCart: (restoId: string) => void;
}

export const useCart = (): IUseCartReturns => {
  const { setModal } = useModal();
  const { dispatch } = useStore();

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
        const res=await axios.post("/cart/add",{
          restaurantId,
          menuItem
        })
      } catch (error) {
        
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
        const res=await axios.post("/cart/remove",{
          restaurantId,
          menuItemId
        })
      } catch (error) {
        
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
    },
    showCart: (restroId) => {
      setModal({
        title: "Order Summary",
        ModalBody: CartCheckoutModalBody,
      });
    },
  };
};
