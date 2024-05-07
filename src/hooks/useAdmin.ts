import { axios } from "../../packages/axios";
import { useNotification } from "./useNotification";

interface IUseAdminReturns {
  approveRestro: (restroId: string) => void;
  rejectRestro: (restroId: string) => void;
}

export const useAdmin = (): IUseAdminReturns => {
  const { setNotification } = useNotification();
  return {
    approveRestro: async (restroId) => {
      const res = await axios.post("/admin/restaurant/accept", { restroId });
      const { data } = res;
      if (data.success) {
        setNotification({
          type: "success",
          title: "Restaurant approved",
        });
        return;
      }
      setNotification({
        type: "error",
        title: "Error in approval",
      });
    },
    rejectRestro: async (restroId) => {
      const res = await axios.post("/admin/restaurant/reject", { restroId });
      const { data } = res;
      if (data.success) {
        setNotification({
          type: "success",
          title: "Restaurant Rejected",
        });
        return;
      }
      setNotification({
        type: "error",
        title: "Error in rejection",
      });
    },
  };
};
