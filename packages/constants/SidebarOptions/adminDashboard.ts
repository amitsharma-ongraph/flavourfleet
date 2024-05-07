import { SidebarOptionProps } from "@/components/SideBarOption";
import {
  BiHourglass,
  BiLogOutCircle,
} from "react-icons/bi";

export const adminScrollOptions: SidebarOptionProps[] = [
  {
    icon: BiHourglass,
    children: "Restaurants",
    paths: ["/admin"],
  }
];

export const adminFixedOptions: SidebarOptionProps[] = [
  {
    icon: BiLogOutCircle,
    children: "Logout",
    paths: ["/logout"],
  },
];
