import { SidebarOptionProps } from "@/components/SideBarOption";
import {
  BiHomeHeart,
  BiLogOutCircle,
  BiMap,
  BiMoney,
  BiPackage,
  BiSearch,
  BiUser,
} from "react-icons/bi";

export const userScrollOptions: SidebarOptionProps[] = [
  {
    icon: BiUser,
    children: "Personal Info",
    paths: ["/profile"],
  },
  {
    icon: BiMap,
    children: "Address",
    paths: ["/profile/address"],
  },
  {
    icon: BiPackage,
    children: "Orders",
    paths: ["/profile/orders"],
  },
];

export const userFixedOptions: SidebarOptionProps[] = [
  {
    icon: BiLogOutCircle,
    children: "Logout",
    paths: ["/logout"],
  },
];
