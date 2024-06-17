import { axios } from "../../packages/axios";
import { DiscountCondition } from "../../packages/enums/DiscountCondition";
import { DiscountType } from "../../packages/enums/DiscountType";
import { ICoupon } from "../../packages/types/entity/ICoupon.";
import { MenuItem } from "../../packages/types/entity/MenuItem";
import { useNotification } from "./useNotification";
import { useRestroStore } from "./useRestroStore";
import { useStore } from "./useStore";

interface ICouponProps {
  codeType: "random" | "custom";
  code: string;
  condition: DiscountCondition;
  billAmount: string;
  combination: MenuItem[];
  discountType: DiscountType;
  giftItem: MenuItem | null;
  limit: string | undefined;
  upto: string;
  discount: string;
  activated: boolean;
  isPublic: boolean;
}
interface IUseCouponReturns {
  createCoupon: (couponProps: ICouponProps) => Promise<void>;
  toggleActive: (couponId: string) => Promise<boolean>;
  deleteCoupon: (couponId: string) => Promise<boolean>;
}

export const useCoupon = (): IUseCouponReturns => {
  const {
    state: { restaurant },
  } = useRestroStore();
  const { setNotification } = useNotification();
  const { dispatch } = useStore();
  return {
    createCoupon: async (couponProps) => {
      const {
        codeType,
        code,
        condition,
        billAmount,
        combination,
        discountType,
        giftItem,
        limit,
        upto,
        discount,
        activated,
        isPublic,
      } = couponProps;
      if (!restaurant) {
        return setNotification({
          type: "error",
          title: "Unexpected Error occured",
        });
      }
      if (codeType == "custom" && (code.length < 7 || code.length > 15)) {
        return setNotification({
          type: "error",
          title: "Invalid Code",
          description: "Code length must be between 7 to 15 characters",
        });
      }
      let newCoupon: ICoupon = {
        restroId: restaurant?._id,
        code: codeType == "random" ? "" : code,
        type: discountType,
        condition,
        activated,
        isPublic,
        limited: limit ? true : false,
      };

      if (newCoupon.limited && limit) {
        newCoupon.redemptions = parseInt(limit);
      }

      if (newCoupon.condition === DiscountCondition.AMOUNT) {
        newCoupon.billAmount = parseInt(billAmount);
      } else {
        if (combination.length === 0) {
          setNotification({
            type: "error",
            title: "Combinaion must have atleast one item",
          });
          return;
        }
        newCoupon.combination = combination.map((item) => item._id);
      }

      if (newCoupon.type === DiscountType.GIFT_ITEM) {
        if (!giftItem) {
          setNotification({
            type: "error",
            title: "You must add gift item",
          });
          return;
        }
        newCoupon.giftItemId = giftItem._id;
      } else {
        newCoupon.discount = parseInt(discount);
        if (newCoupon.type === DiscountType.PERCENTAGE) {
          newCoupon.upto = parseInt(upto);
        }
      }

      try {
        const res = await axios.post("/coupons/create", {
          isRandom: codeType === "random",
          coupon: newCoupon,
        });
        const { data } = res;
        if (data.success) {
          setNotification({
            type: "success",
            title: "Coupon Added",
            path: "/restaurant/dashboard/coupons",
          });
        } else {
          setNotification({
            type: "error",
            title: data.message,
          });
        }
      } catch (error) {
        setNotification({
          type: "error",
          title: "Unexpected Error",
        });
      }
    },
    toggleActive: async (couponId) => {
      try {
        const res = await axios.post("/coupons/restaurant/toogle", {
          couponId,
        });
        const { data } = res;
        if (data.success) {
          return true;
        }
        return false;
      } catch (error) {
        return false;
      }
    },
    deleteCoupon: async (couponId) => {
      try {
        const res = await axios.delete(
          `/coupons/restaurant/delete/${couponId}`
        );
        const { data } = res;
        if (data.success) {
          return true;
        }
        return false;
      } catch (error) {
        return false;
      }
    },
  };
};
