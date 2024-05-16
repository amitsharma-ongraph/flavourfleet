import { ICartItem } from "./ICartItem";

export interface ICart {
  [restaurantId: string]: ICartItem[];
}
