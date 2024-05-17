import CartCheckoutModalBody from "@/components/Modals/CartCheckoutModalBody";
import { useModal } from "./useModal";
import { useStore } from "./useStore";

interface IUseCartReturns {
  showCart: (restoId: string) => void;
}

export const useCart = (): IUseCartReturns => {
  const { setModal } = useModal();

  return {
    showCart: (restroId) => {
      setModal({
        title: "Order Summary",
        ModalBody: CartCheckoutModalBody,
      });
    },
  };
};
