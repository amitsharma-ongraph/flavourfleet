import { Address } from "./Address";

export interface User {
  email: string;
  id: string;
  name: string;
  contactNo: string;
  addressList: Address[];
}
