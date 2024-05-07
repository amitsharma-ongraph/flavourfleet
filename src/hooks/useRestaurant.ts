import { axios } from "../../packages/axios";
import { useImageUpload } from "./useImageUpload";
import { useNotification } from "./useNotification";
import { useStore } from "./useStore";

interface INewRestaurant {
  name: string;
  addressLine: string;
  city: string;
  country: string;
  zipCode: string;
  imageFile: File | null;
}

interface IUseRestaurantReturns {
  signUp: (restaurant: INewRestaurant) => void;
}

export const useRestaurant = (): IUseRestaurantReturns => {
  const { uploadRestroLogo } = useImageUpload();
  const { setNotification } = useNotification();
  const { state } = useStore();

  return {
    signUp: async (restaurant) => {
      try {
        const { name, addressLine, city, country, zipCode, imageFile } =
          restaurant;
        if (!imageFile) {
          setNotification({
            type: "error",
            title: "Image file not found",
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
          addressLine,
          city,
          country,
          zipCode,
          logoUrl: url,
          userId: state.user?.id,
        });
        console.log("image url--->", url);
      } catch (error) {}
    },
  };
};
