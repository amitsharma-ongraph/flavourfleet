import { SidebarOptionProps } from "@/components/SideBarOption";
import { BiHistory, BiHourglass, BiLogOutCircle } from "react-icons/bi";

export const adminScrollOptions: SidebarOptionProps[] = [
  {
    icon: BiHourglass,
    children: "Pending",
    paths: ["/admin"],
  },
  {
    icon: BiHistory,
    children: "History",
    paths: ["/admin/history"],
  },
];

export const adminFixedOptions: SidebarOptionProps[] = [
  {
    icon: BiLogOutCircle,
    children: "Logout",
    paths: ["/logout"],
  },
];
