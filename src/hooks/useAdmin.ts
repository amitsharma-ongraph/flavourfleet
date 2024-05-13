import { axios } from "../../packages/axios";
import { RestaurantApplication } from "../../packages/types/entity/RestaurantApplication";
import { User } from "../../packages/types/entity/User";
import { useAdminStore } from "./useAdminStore";
import { useNotification } from "./useNotification";

interface IUseAdminReturns {
  getApplications: () => RestaurantApplication[];
  getHistory: () => RestaurantApplication[];
  approveRestro: (restroId: string) => void;
  rejectRestro: (restroId: string) => void;
}

export const useAdmin = (): IUseAdminReturns => {
  const { setNotification } = useNotification();
  const { state, dispatch } = useAdminStore();
  const { restaurants } = state;
  return {
    getApplications: () => {
      if (!restaurants) {
        return [];
      }
      const pendingList = restaurants.filter(
        (restro) => restro.status === "Pending"
      );

      const applicattionList: RestaurantApplication[] = pendingList.map(
        (restro) => {
          //@ts-ignore
          const owner = restro.ownerId as User;
          return {
            _id: restro._id,
            name: restro.name,
            owner: {
              _id: owner?.id || "",
              name: owner?.name || "",
              email: owner?.email || "",
            },
            address: restro.outlets[0],
            logoUrl: restro.logoUrl,
          };
        }
      );

      return applicattionList;
    },
    getHistory: () => {
      if (!restaurants) {
        return [];
      }
      const pendingList = restaurants.filter(
        (restro) => restro.status !== "Pending"
      );

      const applicattionList: RestaurantApplication[] = pendingList.map(
        (restro) => {
          //@ts-ignore
          const owner = restro.ownerId as User;
          return {
            _id: restro._id,
            name: restro.name,
            owner: {
              _id: owner?.id || "",
              name: owner?.name || "",
              email: owner?.email || "",
            },
            address: restro.outlets[0],
            logoUrl: restro.logoUrl,
            status: restro.status,
          };
        }
      );

      return applicattionList;
    },
    approveRestro: async (restroId) => {
      const res = await axios.post("/admin/restaurant/accept", { restroId });
      const { data } = res;
      if (data.success) {
        dispatch({
          type: "setRestaurants",
          data: state.restaurants?.map((restro) => ({
            ...restro,
            status: restro._id === restroId ? "Approved" : "Pending",
          })),
        });
        setNotification({
          type: "success",
          title: "Restaurant approved",
        });
        return;
      }
      setNotification({
        type: "error",
        title: "Error in approval",
        path: "/admin/history",
      });
    },
    rejectRestro: async (restroId) => {
      const res = await axios.post("/admin/restaurant/reject", { restroId });
      const { data } = res;
      if (data.success) {
        dispatch({
          type: "setRestaurants",
          data: state.restaurants?.map((restro) => ({
            ...restro,
            status: restro._id === restroId ? "Rejected" : "Pending",
          })),
        });
        setNotification({
          type: "success",
          title: "Restaurant Rejected",
          path: "/admin/history",
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
