import { CiDiscount1 } from "react-icons/ci";
import { IOfferCard } from "../types/card/IOfferCard";
import { BiGift } from "react-icons/bi";
import { RiBikeFill } from "react-icons/ri";

export const TestOffers: IOfferCard[] = [
  {
    title: "40% OFF up to ₹80",
    description: "use code HUNGRY80 | above ₹159",
    icon: CiDiscount1,
  },
  {
    title: "Free Cookie",
    description: "above ₹300 | no code required",
    icon: BiGift,
  },
  {
    title: "Free Delivery",
    description: "above ₹1000",
    icon: RiBikeFill,
  },
];
