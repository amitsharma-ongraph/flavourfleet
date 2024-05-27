import { axios } from "../../packages/axios";
import { Notification } from "../../packages/types/common/Notification";
import { MenuItem } from "../../packages/types/entity/MenuItem";
import { useImageUpload } from "./useImageUpload";
import { useNotification } from "./useNotification";
import { useRestroStore } from "./useRestroStore";
import { useMaps } from "./useMaps";
import { Address } from "../../packages/types/entity/Address";
import { useUser } from "./useUser";
import { useRouter } from "next/router";

interface INewRestaurant {
  name: string;
  imageFile: File | null;
  address: Address | null;
}

interface IMenuItemRequest {
  name: string;
  description: string;
  imageFile: File | undefined;
  price: number;
  groupName: string;
}
interface IUseRestaurantReturns {
  getMenuItemsByGroup: (menuGroup: string) => MenuItem[];
  getAllGroupNames: () => string[];
  addMenuGroup: (groupName: string) => Promise<Notification | void>;
  addCuisine: (cuisineName: string) => Promise<Notification | void>;
  addMenuItem: (menuItem: IMenuItemRequest) => Promise<Notification | void>;
  signUp: (restaurant: INewRestaurant) => void;
  resubmit: () => void;
  addOutlet: (address: Address) => Promise<void>;
}

export const useRestaurant = (): IUseRestaurantReturns => {
  const { user, authenticate } = useUser();
  const { push } = useRouter();
  const { uploadRestroLogo, uploadMenuItemImage } = useImageUpload();
  const { setNotification } = useNotification();
  const { state, dispatch } = useRestroStore();
  const { getCoordinates } = useMaps();
  const { restaurant } = state;

  const getAllGroupNames = () => {
    if (!restaurant) {
      return [];
    }
    return restaurant.menuGroups;
  };

  return {
    getMenuItemsByGroup: (menuGroup) => {
      if (!restaurant) {
        return [];
      }
      return restaurant.menuItems.filter(
        (menuItem) =>
          menuItem.groupName.toLowerCase() === menuGroup.toLowerCase()
      );
    },
    getAllGroupNames,
    addMenuGroup: async (groupName) => {
      try {
        if (!restaurant) {
          return {
            type: "error",
            title: "Error while fetching Restaruant Details",
          };
        }
        const res = await axios.post("/restaurant/add-menu-group", {
          groupName,
          restroId: state.restaurant?._id,
        });
        const { data } = res;
        if (data.success) {
          dispatch({
            type: "setRestaurant",
            data: {
              ...restaurant,
              menuGroups: [...restaurant?.menuGroups, groupName],
            },
          });
          return {
            type: "success",
            title: "Menu Group Added Succesfully",
          };
        }
        return {
          type: "error",
          title: "Error while adding the menu group",
        };
      } catch (error) {
        return {
          type: "error",
          title: "Error occured while adding the group",
        };
      }
    },
    addCuisine: async (cuisineName) => {
      try {
        if (!restaurant) {
          return {
            type: "error",
            title: "Error while fetching Restaruant Details",
          };
        }
        const res = await axios.post("/restaurant/add-cuisine", {
          cuisineName,
          restroId: state.restaurant?._id,
        });
        const { data } = res;
        if (data.success) {
          dispatch({
            type: "setRestaurant",
            data: {
              ...restaurant,
              cuisins: [...restaurant?.cuisins, cuisineName],
            },
          });
          return {
            type: "success",
            title: "Cuisine Added Succesfully",
          };
        }
        return {
          type: "error",
          title: "Error while adding the Cuisine",
        };
      } catch (error) {
        return {
          type: "error",
          title: "Error occured while adding the Cuisine",
        };
      }
    },

    addMenuItem: async (menuItem) => {
      try {
        if (!user?.id) {
          push("/login");
          setNotification({
            type: "error",
            title: "Please Login",
          });
          return;
        }

        if (!restaurant) {
          return {
            type: "error",
            title: "Error while accessing you restaurant info",
          };
        }
        const { name, description, price, imageFile, groupName } = menuItem;

        if (!imageFile) {
          setNotification({
            type: "error",
            title: "Image file not found",
          });
          return;
        }

        const url = await uploadMenuItemImage(
          imageFile,
          restaurant?.name || "common"
        );
        if (!url) {
          setNotification({
            type: "error",
            title: "Coudn't upload the image",
          });
        }

        const res = await axios.post("/restaurant/add-menuitem", {
          name,
          description,
          price,
          imageUrl: url,
          restroId: state.restaurant?._id,
          groupName,
        });
        const { data } = res;
        if (data.success === true) {
          dispatch({
            type: "setRestaurant",
            data: {
              ...restaurant,
              menuItems: [
                ...restaurant.menuItems,
                {
                  _id: data.menuItemId,
                  name,
                  price,
                  groupName,
                  ratings: "4.0",
                  totalReview: 0,
                  imageUrl: url,
                  description,
                  totalOrders: 0,
                },
              ],
            },
          });
          setNotification({
            type: "success",
            title: "Item Added Succefully",
          });
        } else {
          setNotification({
            type: "error",
            title: "Error while applying , please try after sometime",
          });
        }
      } catch (error) {
        setNotification({
          type: "error",
          title: "Error while adding the item",
        });
      }
    },
    signUp: async (restaurant) => {
      try {
        if (!user?.id) {
          push("/login");
          setNotification({
            type: "error",
            title: "Please Login",
          });
          return;
        }

        const { name, address, imageFile } = restaurant;
        if (!imageFile) {
          setNotification({
            type: "error",
            title: "Image file not found",
          });
          return;
        }

        if (!address) {
          setNotification({
            type: "error",
            title: "Please add an address first",
          });
          return;
        }

        const url = await uploadRestroLogo(imageFile);
        if (!url) {
          setNotification({
            type: "error",
            title: "Coudn't upload the image",
          });
        }

        const res = await axios.post("/restaurant/signup", {
          name,
          ...address,
          logoUrl: url,
          ownerId: user.id,
        });
        const { data } = res;
        if (data.success === true) {
          setNotification({
            type: "success",
            title: "Application submitted successfully",
            path: "/restaurant",
          });
        } else {
          setNotification({
            type: "error",
            title: "Error while applying , please try after sometime",
          });
        }
      } catch (error) {}
    },
    resubmit: async () => {
      try {
        const res = await axios.delete("/restaurant/delete");
        const { data } = res;
        if (data.success == true) {
          setNotification({
            type: "success",
            title: "You can resubmit your application",
            path: "/restaurant/welcome",
          });
          return;
        } else {
          setNotification({
            type: "error",
            title: "Can'nt resbumit application at this moment",
          });
        }
      } catch (error) {
        setNotification({
          type: "error",
          title: "Can'nt resbumit application at this moment",
        });
      }
    },
    addOutlet: async (address) => {
      try {
        if (!user?.id || !state.restaurant) {
          push("/login");
          setNotification({
            type: "error",
            title: "Please Login",
          });
          return;
        }
        const res = await axios.post("/restaurant/add-outlet", {
          id: state.restaurant._id,
          address: {
            ...address,
          },
        });
        const { data } = res;

        if (data.success) {
          dispatch({
            type: "setRestaurant",
            data: {
              ...state.restaurant.outlets,
              outlets: [
                ...state.restaurant.outlets,
                { ...address, _id: data.addressId },
              ],
            },
          });
          setNotification({
            type: "success",
            title: "Outlet Added Successfully",
            path: "/restaurant/dashboard/outlets",
          });
        } else if (!data.success) {
          setNotification({
            type: "error",
            title: "Error while Adding the data",
            description: data.message,
          });
        }
      } catch (error) {
        setNotification({
          type: "error",
          title: "unexpected error occured",
        });
      }
    },
  };
};
