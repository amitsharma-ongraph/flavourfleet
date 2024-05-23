import { OrderStatus } from "../../enums/OrderStatus";
import { Address } from "./Address";
import { IBill } from "./IBill";
import { ICartItem } from "./ICartItem";

export interface IRestroPOrder {
  id: string;
  userAddress: { name: string; email: string } & Address;
  items: ICartItem[];
  bill: IBill;
  status: OrderStatus;
  note: string;
  dateTime: string;
  restroAddress: Address;
  restroId: string;
  timeline: {
    placed: string;
    accepted: string;
    preparing: string;
    ready: string;
    out_for_delivery: string;
    delivered: string;
    rejected: string;
  };
}
