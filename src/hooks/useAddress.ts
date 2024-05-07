import { useRouter } from "next/router";
import { Notification } from "../../packages/types/common/Notification";
import { Address } from "../../packages/types/entity/Address";
import { useUser } from "./useUser";
import { axios } from "../../packages/axios";
import { useStore } from "./useStore";
import { useNotification } from "./useNotification";

interface IUseAddressReturns {
  PrimaryAddress: Address | null;
  addAddress: (address: Address) => Promise<Notification | void>;
  markAsPrimary: (addressId: string | undefined) => void;
}

export const useAddress = (): IUseAddressReturns => {
  const { user, authenticate } = useUser();
  const { push } = useRouter();
  const { dispatch } = useStore();
  const { setNotification } = useNotification();
  return {
    PrimaryAddress: null,
    addAddress: async (address) => {
      try {
        if (!user?.id) {
          push("/login");
          return {
            type: "error",
            title: "Please Login",
          };
        }
        const res = await axios.post("/user/add-address", {
          id: user.id,
          address: {
            ...address,
            isPrimary: user.addressList.length === 0,
          },
        });
        const { data } = res;
        console.log("login data", data);
        if (data.success) {
          dispatch({
            type: "setUser",
            data: {
              ...user,
              addressList: [
                ...user.addressList,
                { ...address, _id: data.addressId },
              ],
            },
          });
          return {
            type: "success",
            title: "Address Added Successfully",
          };
        } else if (!data.success) {
          return {
            type: "error",
            title: "Error while Adding the data",
            description: data.message,
          };
        }
      } catch (error) {
        return {
          type: "error",
          title: "unexpected error occured",
        };
      }
    },
    markAsPrimary: async (addressId) => {
      try {
        if (!addressId) {
          setNotification({
            type: "error",
            title: "Can't set this Address As primary at this moment",
          });
        }
        if (!user?.id) {
          push("/login");
          return;
        }
        console.log("address id", addressId);
        console.log("userId", user.id);
        const res = await axios.post("/user/address/mark-primary", {
          userId: user.id,
          addressId: addressId,
        });
        const { data } = res;
        if (data.success) {
          const addressList = user.addressList;
          const updatedList = addressList.map((address) => ({
            ...address,
            isPrimary: address._id?.toString() === addressId,
          }));

          dispatch({
            type: "setUser",
            data: {
              ...user,
              addressList: updatedList,
            },
          });

          return setNotification({
            type: "success",
            title: "Address set as primary",
          });
        }
        return setNotification({
          type: "error",
          title: "Can't set address as primary at this moment",
        });
      } catch (error) {
        return setNotification({
          type: "error",
          title: "Can't set address as primary at this moment",
        });
      }
    },
  };
};
