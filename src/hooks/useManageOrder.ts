import { axios } from "../../packages/axios";
import { OrderStatus } from "../../packages/enums/OrderStatus";
import { useNotification } from "./useNotification";
import { useRestroStore } from "./useRestroStore";

interface IUseManageOrderReturns {
  changeStatus: (
    orderId: string,
    restroId: string,
    status: OrderStatus
  ) => Promise<void>;
}

export const useManageOrder = (): IUseManageOrderReturns => {
  const { dispatch } = useRestroStore();
  const { setNotification } = useNotification();
  return {
    changeStatus: async (orderId, restroId, status) => {
      try {
        const res = await axios.post("/order/change-status", {
          orderId,
          restroId,
          status,
        });
        const { data } = res;
        if (!data.success) {
          setNotification({
            type: "error",
            title: data.message,
          });
          return;
        }
        dispatch({
          type: "updateOrderStatus",
          data: {
            orderId,
            status: data.status,
            newTimeline: data.timeline,
          },
        });
        setNotification({
          type: "success",
          title: `Order ${status}`,
        });
      } catch (error) {
        setNotification({
          type: "error",
          title: "Error While Proccessing The Order",
        });
      }
    },
  };
};
