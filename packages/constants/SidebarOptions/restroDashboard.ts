import { SidebarOptionProps } from "@/components/SideBarOption";
import {
  BiDish,
  BiHomeHeart,
  BiLogOutCircle,
  BiMap,
  BiMoney,
  BiPackage,
  BiRestaurant,
  BiSearch,
  BiStore,
  BiUser,
} from "react-icons/bi";
import { FaBars, FaClipboardList, FaUtensils } from "react-icons/fa";
import { GiDesert } from "react-icons/gi";
import { IoMdRestaurant } from "react-icons/io";

export const restroScrollOptions: SidebarOptionProps[] = [
  {
    icon: IoMdRestaurant,
    children: "Restaurant Info",
    paths: ["/restaurant/dashboard"],
  },
  {
    icon: BiStore,
    children: "Outlets",
    paths: ["/restaurant/dashboard/outlets"],
  },
  {
    icon: FaUtensils,
    children: "Cuisins",
    paths: ["/restaurant/dashboard/cuisins"],
  },
  {
    icon: BiDish,
    children: "Menu Items",
    paths: ["/restaurant/dashboard/menu-items"],
  },
  {
    icon: FaClipboardList,
    children: "Orders",
    paths: ["/restaurant/dashboard/orders"],
  },
  {
    icon: BiMoney,
    children: "Payment Methods",
    paths: ["/restaurant/dashboard/payment"],
  },
];

export const restroFixedOptions: SidebarOptionProps[] = [
  {
    icon: BiLogOutCircle,
    children: "Logout",
    paths: ["/logout"],
  },
];
