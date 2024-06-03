import { Address } from "./Address";
import { MenuItem } from "./MenuItem";

export interface Restaurant {
  _id: string;
  ownerId: string;
  name: string;
  outlets: Address[];
  cuisins: string[];
  menuItems: MenuItem[];
  logoUrl: string;
  status: "Approved" | "Pending" | "Rejected";
  menuGroups: string[];
  isVeg?:boolean
}
